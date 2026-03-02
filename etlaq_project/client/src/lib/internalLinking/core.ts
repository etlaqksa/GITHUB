import {
  cities,
  findCity,
  findServiceLanding,
  getCitySlug,
  getServiceSlug,
  type City,
  type ServiceLanding,
} from '@/data/seoLocations';
import {
  AR_CITY_ATTACHED_PREFIXES,
  DEFAULT_MAX_LINKS_PER_DEST,
  SERVICE_KEYWORD_ALIASES,
  type InternalLang,
  type ServiceKey,
} from './dictionaries';

export type LinkSegment =
  | { type: 'text'; value: string }
  | {
      type: 'link';
      value: string;
      href: string;
      title?: string;
      ariaLabel?: string;
    };

export type LinkifyOptions = {
  lang: InternalLang;
  /** If a city is mentioned in this paragraph, service links will route to that city. */
  cityContext?: City;
  /** If no city is mentioned in the paragraph, use this city for service links. Default = Riyadh. */
  fallbackCity?: City;
  /** Maximum number of links per destination for the whole page. */
  maxPerDestination?: number;
  /** Callback used to enforce page-level limits while avoiding re-counting on re-render. */
  allocate?: (href: string, allocationId: string) => boolean;
  /** Do not link the same destination more than once per paragraph. */
  paragraphDestinationsUsed?: Set<string>;
  /** Optional unique key for this paragraph/component instance, used in allocationId generation. */
  paragraphKey?: string;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Unicode-aware word boundary:
 * - JS \b is ASCII-centric; for Arabic we use Unicode property escapes.
 */
function buildWordBoundaryRegex(term: string, lang: InternalLang, flags: string = 'g') {
  const escaped = escapeRegExp(term);
  if (lang === 'en') {
    // Use \b for latin words; also allow matching acronyms (GPR/ERT/MASW) as whole tokens.
    return new RegExp(`\\b${escaped}\\b`, flags.includes('i') ? flags : flags + 'i');
  }
  // Arabic (and general unicode) boundary.
  // Negative lookbehind/ahead for unicode letters/numbers/underscore.
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, flags + 'u');
}

function normalizeHref(href: string) {
  return String(href || '').replace(/\/+$/, '');
}

function getDefaultRiyadh(): City {
  // Find by english slug; Arabic uses getCitySlug later.
  return findCity('riyadh') || cities[0];
}

type Match = {
  start: number;
  end: number;
  value: string;
  href: string;
  title?: string;
  ariaLabel?: string;
  priority: number;
};

function earliestCityMention(text: string, lang: InternalLang): { city: City; start: number; end: number; matchedText: string } | null {
  const candidates: Array<{ city: City; re: RegExp }> = [];

  for (const c of cities) {
    const base = lang === 'ar' ? c.ar : c.en;
    if (!base) continue;

    // Base token
    candidates.push({ city: c, re: buildWordBoundaryRegex(base, lang, 'g') });

    // Arabic attached prefixes: "بالرياض", "بجدة"...
    if (lang === 'ar') {
      for (const pref of AR_CITY_ATTACHED_PREFIXES) {
        const attached = `${pref}${base}`;
        candidates.push({ city: c, re: buildWordBoundaryRegex(attached, lang, 'g') });
      }

      // Also support arSlug with hyphens replaced by spaces (e.g., "المدينة المنورة")
      const arSlugSpaced = c.arSlug?.replace(/-/g, ' ');
      if (arSlugSpaced && arSlugSpaced !== base) {
        candidates.push({ city: c, re: buildWordBoundaryRegex(arSlugSpaced, lang, 'g') });
        for (const pref of AR_CITY_ATTACHED_PREFIXES) {
          candidates.push({ city: c, re: buildWordBoundaryRegex(`${pref}${arSlugSpaced}`, lang, 'g') });
        }
      }
    }
  }

  let best: { city: City; start: number; end: number; matchedText: string } | null = null;
  for (const cand of candidates) {
    cand.re.lastIndex = 0;
    const m = cand.re.exec(text);
    if (!m || typeof m.index !== 'number') continue;
    const start = m.index;
    const matchedText = m[0];
    const end = start + matchedText.length;
    if (!best || start < best.start) {
      best = { city: cand.city, start, end, matchedText };
    }
  }

  return best;
}

function serviceToLanding(serviceKey: ServiceKey): ServiceLanding | undefined {
  // serviceKey corresponds to ServiceLanding.slug values in seoLocations.
  // Our mapping uses those as canonical keys.
  const key = String(serviceKey);
  return findServiceLanding(key) || undefined;
}

function buildCityHref(city: City, lang: InternalLang) {
  const citySlug = getCitySlug(city, lang);
  return normalizeHref(`/locations/${citySlug}`);
}

function buildServiceHref(serviceKey: ServiceKey, city: City, lang: InternalLang) {
  const service = serviceToLanding(serviceKey);
  if (!service) return '';
  const citySlug = getCitySlug(city, lang);
  const serviceSlug = getServiceSlug(service, lang, city);
  return normalizeHref(`/locations/${citySlug}/${serviceSlug}`);
}

function buildServiceTitle(serviceKey: ServiceKey, lang: InternalLang) {
  const meta = SERVICE_KEYWORD_ALIASES.find((x) => x.serviceKey === serviceKey);
  if (!meta) return undefined;
  return lang === 'ar' ? meta.titleAr : meta.titleEn;
}

export function linkifyParagraph(text: string, opts: LinkifyOptions): LinkSegment[] {
  const lang = opts.lang;
  const maxPerDestination = opts.maxPerDestination ?? DEFAULT_MAX_LINKS_PER_DEST;
  const paragraphKey = opts.paragraphKey || 'p';

  if (!text || typeof text !== 'string') return [{ type: 'text', value: String(text || '') }];

  // Determine city context for service links.
  const mention = earliestCityMention(text, lang);
  const cityForServices = mention?.city || opts.cityContext || opts.fallbackCity || getDefaultRiyadh();

  const paragraphUsed = opts.paragraphDestinationsUsed || new Set<string>();

  const matches: Match[] = [];

  // 1) City linking
  for (const c of cities) {
    const base = lang === 'ar' ? c.ar : c.en;
    if (!base) continue;

    const cityHref = buildCityHref(c, lang);
    const cityTitle = lang === 'ar' ? `خدمات الشركة في ${c.ar}` : `Services in ${c.en}`;

    const pushMatches = (term: string) => {
      try {
        const re = buildWordBoundaryRegex(term, lang, 'g');
        let m: RegExpExecArray | null;
        re.lastIndex = 0;
        while ((m = re.exec(text))) {
          if (typeof m.index !== 'number') break;
          const start = m.index;
          const value = m[0];
          const end = start + value.length;
          matches.push({
            start,
            end,
            value,
            href: cityHref,
            title: cityTitle,
            ariaLabel: cityTitle,
            priority: 1,
          });
          // Safety: avoid infinite loops on zero-length matches
          if (re.lastIndex === m.index) re.lastIndex++;
        }
      } catch {
        // ignore invalid regex term
      }
    };

    pushMatches(base);

    if (lang === 'ar') {
      for (const pref of AR_CITY_ATTACHED_PREFIXES) pushMatches(`${pref}${base}`);
      const arSlugSpaced = c.arSlug?.replace(/-/g, ' ');
      if (arSlugSpaced && arSlugSpaced !== base) {
        pushMatches(arSlugSpaced);
        for (const pref of AR_CITY_ATTACHED_PREFIXES) pushMatches(`${pref}${arSlugSpaced}`);
      }
    }
  }

  // 2) Service linking
  for (const group of SERVICE_KEYWORD_ALIASES) {
    const terms = lang === 'ar' ? group.ar : group.en;
    const href = buildServiceHref(group.serviceKey, cityForServices, lang);
    if (!href) continue;

    const title = buildServiceTitle(group.serviceKey, lang);
    const ariaLabel = title ? `${title}` : undefined;

    for (const term of terms) {
      // A term like "GPR" should still be matched as whole token.
      const flags = lang === 'en' ? 'gi' : 'g';
      let re: RegExp;
      try {
        re = buildWordBoundaryRegex(term, lang, flags);
      } catch {
        continue;
      }

      let m: RegExpExecArray | null;
      re.lastIndex = 0;
      while ((m = re.exec(text))) {
        if (typeof m.index !== 'number') break;
        const start = m.index;
        const value = m[0];
        const end = start + value.length;
        matches.push({
          start,
          end,
          value,
          href,
          title,
          ariaLabel,
          priority: 2,
        });
        if (re.lastIndex === m.index) re.lastIndex++;
      }
    }
  }

  if (!matches.length) return [{ type: 'text', value: text }];

  // Sort by position, then prefer longer match and higher priority.
  matches.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    const lenA = a.end - a.start;
    const lenB = b.end - b.start;
    if (lenA !== lenB) return lenB - lenA;
    return b.priority - a.priority;
  });

  // Remove overlaps (keep the first best match for each span)
  const selected: Match[] = [];
  let cursor = 0;
  for (const m of matches) {
    if (m.start < cursor) continue;
    selected.push(m);
    cursor = m.end;
  }

  // Build segments
  const segments: LinkSegment[] = [];
  let last = 0;

  for (const m of selected) {
    if (m.start > last) {
      segments.push({ type: 'text', value: text.slice(last, m.start) });
    }

    const destKey = normalizeHref(m.href);

    // Anti-spam: only once per paragraph per destination
    if (paragraphUsed.has(destKey)) {
      segments.push({ type: 'text', value: text.slice(m.start, m.end) });
      last = m.end;
      continue;
    }

    // Page-level anti-spam (2-3 per page per destination)
    const allocationId = `${paragraphKey}:${destKey}:${m.start}`;
    if (opts.allocate) {
      const ok = opts.allocate(destKey, allocationId);
      if (!ok) {
        segments.push({ type: 'text', value: text.slice(m.start, m.end) });
        last = m.end;
        continue;
      }
    } else {
      // If no allocator is provided, we still enforce per-paragraph only.
      // maxPerDestination is ignored in this fallback.
      void maxPerDestination;
    }

    paragraphUsed.add(destKey);
    segments.push({
      type: 'link',
      value: text.slice(m.start, m.end),
      href: destKey,
      title: m.title,
      ariaLabel: m.ariaLabel,
    });

    last = m.end;
  }

  if (last < text.length) {
    segments.push({ type: 'text', value: text.slice(last) });
  }

  // Merge adjacent text segments
  const merged: LinkSegment[] = [];
  for (const s of segments) {
    const prev = merged[merged.length - 1];
    if (s.type === 'text' && prev && prev.type === 'text') {
      prev.value += s.value;
    } else {
      merged.push(s);
    }
  }

  return merged;
}
