// Netlify Function: Gemini-powered Q&A for ETLAQ Smart Assistant
// Endpoint: /.netlify/functions/gemini-assistant
//
// IMPORTANT: Store your key in Netlify env vars (Site settings -> Environment variables):
//   GEMINI_API_KEY = <your key>
// Optional:
//   GEMINI_MODEL = gemini-2.5-flash-lite
//
// This function intentionally returns ONLY site-internal links (from an allowlist)
// to prevent hallucinated URLs.

const DEFAULT_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "";

const ALLOWED_LINKS = [
  { id: "services", ar: "خدماتنا", en: "Services", href: "/services" },
  { id: "grouting", ar: "حقن التربة", en: "Soil Grouting", href: "/services/grouting" },
  { id: "cavity", ar: "كشف التكهفات", en: "Cavity Probing", href: "/services/cavity" },
  { id: "geophysical", ar: "الجيوفيزياء", en: "Geophysical Solutions", href: "/services/geophysical" },
  { id: "request", ar: "اطلب الخدمة", en: "Request Service", href: "/request-service" },
  { id: "contact", ar: "تواصل معنا", en: "Contact", href: "/contact" },
  { id: "blog", ar: "الموسوعة", en: "Knowledge Base", href: "/blog" },
  { id: "projects", ar: "مشاريعنا", en: "Projects", href: "/projects" },
  { id: "about", ar: "من نحن", en: "About", href: "/about" },
];

function json(statusCode, obj, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
    body: JSON.stringify(obj),
  };
}

function clampText(s, max) {
  const t = String(s || "").trim();
  if (!t) return "";
  return t.length > max ? t.slice(0, max) : t;
}

// Super-light in-memory rate limiter (best-effort).
// Netlify functions are stateless across cold starts; this mainly prevents bursts on warm instances.
const RL = new Map(); // ip -> {count, resetAt}
function rateLimit(ip, limit = 40, windowMs = 60_000) {
  const now = Date.now();
  const key = ip || "unknown";
  const cur = RL.get(key);
  if (!cur || cur.resetAt <= now) {
    RL.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetAt: now + windowMs };
  }
  if (cur.count >= limit) {
    return { ok: false, remaining: 0, resetAt: cur.resetAt };
  }
  cur.count += 1;
  RL.set(key, cur);
  return { ok: true, remaining: limit - cur.count, resetAt: cur.resetAt };
}

function buildSystemInstruction(language) {
  const isAr = language === "ar";
  const linksList = ALLOWED_LINKS.map((l) => `- ${isAr ? l.ar : l.en}: ${l.href}`).join("\n");

  return `
You are the website assistant for "ETLAQ Distinguished Company" (Saudi Arabia) specializing in:
- Soil grouting and foundation strengthening
- Cavity probing (cavity detection)
- Geophysical solutions (GPR / ERT / MASW)

Your job: answer visitor questions briefly and professionally, and ALWAYS propose next steps using site links.

Rules:
1) Reply in ${isAr ? "Arabic" : "English"}.
2) Be concise (4-10 lines). Use bullets if helpful.
3) Do NOT invent phone numbers, emails, addresses, prices, guarantees, or project claims.
4) If the user needs a site visit, quote, or diagnosis: recommend contacting ETLAQ and/or requesting service.
5) You MUST ONLY return internal links from the allowlist below. Never output other URLs.
6) If you are unsure, say so and direct the user to contact/request service.

Allowlisted links:
${linksList}

Return STRICT JSON matching the schema (no markdown, no extra keys).
`.trim();
}

function responseSchema() {
  return {
    type: "OBJECT",
    properties: {
      answer: { type: "STRING", description: "The assistant reply text." },
      links: {
        type: "ARRAY",
        minItems: 0,
        maxItems: 4,
        items: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            href: { type: "STRING" },
          },
          required: ["title", "href"],
        },
      },
      cta: { type: "STRING", description: "Optional short CTA line." },
    },
    required: ["answer", "links"],
  };
}

async function callGemini({ question, language }) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    DEFAULT_MODEL,
  )}:generateContent?key=${encodeURIComponent(API_KEY)}`;

  const body = {
    systemInstruction: {
      role: "system",
      parts: [{ text: buildSystemInstruction(language) }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: question }],
      },
    ],
    generationConfig: {
      temperature: 0.2,
      topP: 0.9,
      maxOutputTokens: 650,
      responseMimeType: "application/json",
      responseSchema: responseSchema(),
    },
  };

  const resp = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const raw = await resp.text();
  if (!resp.ok) {
    let msg = raw;
    try {
      const j = JSON.parse(raw);
      msg = j?.error?.message || j?.message || raw;
    } catch {
      /* ignore */
    }
    const err = new Error(msg);
    err.status = resp.status;
    throw err;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return { answer: raw, links: [] };
  }

  const text =
    data?.candidates?.[0]?.content?.parts?.map((p) => p.text).filter(Boolean).join("") ||
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "";

  // Expect JSON text in `text`
  try {
    const out = JSON.parse(text);
    return out;
  } catch {
    return { answer: text || "", links: [] };
  }
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return json(405, { error: "Method not allowed" }, { Allow: "POST" });
    }

    if (!API_KEY) {
      return json(500, {
        error:
          "Missing GEMINI_API_KEY. Add it in Netlify -> Site settings -> Environment variables.",
      });
    }

    const ip =
      event.headers["x-nf-client-connection-ip"] ||
      event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      "";

    const rl = rateLimit(ip, 40, 60_000);
    if (!rl.ok) {
      return json(429, {
        error: "Rate limit exceeded. Please try again shortly.",
      });
    }

    let payload = {};
    try {
      payload = JSON.parse(event.body || "{}");
    } catch {
      payload = {};
    }

    const language = payload.language === "en" ? "en" : "ar";
    const question = clampText(payload.question, 800);

    if (!question) {
      return json(400, { error: "Empty question" });
    }

    const result = await callGemini({ question, language });

    // Final safety: filter links to allowlist only
    const allowSet = new Set(ALLOWED_LINKS.map((l) => l.href));
    const links = Array.isArray(result.links) ? result.links : [];
    const filteredLinks = links
      .filter((l) => l && typeof l.href === "string" && allowSet.has(l.href))
      .slice(0, 4)
      .map((l) => ({ title: String(l.title || "").slice(0, 80), href: l.href }));

    const answer = String(result.answer || "").trim();
    const cta = String(result.cta || "").trim();

    return json(200, {
      answer: answer || (language === "ar" ? "تم." : "Done."),
      links: filteredLinks,
      cta: cta || "",
    });
  } catch (e) {
    const status = e?.status || 500;
    const msg =
      typeof e?.message === "string"
        ? e.message
        : "Unexpected error";
    return json(status, { error: msg });
  }
};
