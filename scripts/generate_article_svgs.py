import os, re, hashlib, random

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ARTICLES_PATH = os.path.join(ROOT, 'client', 'src', 'data', 'articles.ts')
HERO_DIR = os.path.join(ROOT, 'client', 'public', 'article-images', 'hero')
CARD_DIR = os.path.join(ROOT, 'client', 'public', 'article-images', 'card')

os.makedirs(HERO_DIR, exist_ok=True)
os.makedirs(CARD_DIR, exist_ok=True)

text = open(ARTICLES_PATH, 'r', encoding='utf-8').read()
# capture slug and titles (Arabic/English)
entries = []
for m in re.finditer(r"\{\s*id:\s*(\d+),[\s\S]*?title:\s*(?:\"([^\"]+)\"|'([^']+)'),[\s\S]*?titleEn:\s*(?:\"([^\"]+)\"|'([^']+)'),[\s\S]*?slug:\s*\"([^\"]+)\"", text):
    _id=int(m.group(1))
    title=(m.group(2) or m.group(3) or '').strip()
    titleEn=(m.group(4) or m.group(5) or '').strip()
    slug=m.group(6).strip()
    entries.append((_id, slug, title, titleEn))

# fallback: our generator uses JSON strings, so slug lines are ... slug: "..."
if len(entries) < 50:
    entries=[]
    for m in re.finditer(r"id:\s*(\d+),[\s\S]*?title:\s*\"([^\"]+)\",[\s\S]*?titleEn:\s*\"([^\"]+)\",[\s\S]*?slug:\s*\"([^\"]+)\"", text):
        entries.append((int(m.group(1)), m.group(4), m.group(2), m.group(3)))

# --- theme detection

def detect_theme(slug: str, title: str) -> str:
    s=(slug+' '+title).lower()
    if any(k in s for k in ['gpr','radar','geophys','ert','seismic','geophysical','جيوفي','رادار','مقاومة','تصوير']):
        return 'geophysical'
    if any(k in s for k in ['cavity','void','sinkhole','karst','تجويف','تكهف','كارست','فراغ','هبوط فجائي']):
        return 'cavity'
    if any(k in s for k in ['crack','تشق','شقوق','cracks']):
        return 'cracks'
    if any(k in s for k in ['settlement','هبوط','differential']):
        return 'settlement'
    if any(k in s for k in ['water','leak','moist','مياه','تسرب','رطوبة','خزان']):
        return 'water'
    if any(k in s for k in ['monitor','instrument','مراقبة','قياس']):
        return 'monitoring'
    if any(k in s for k in ['resin','polyurethane','urethane','راتنج','بوليمر']):
        return 'resin'
    if any(k in s for k in ['cement','microfine','أسمنت','ملاط','ميكروفاين']):
        return 'cement'
    if any(k in s for k in ['foundation','raft','pile','أساس','لبشة','خوازيق']):
        return 'foundation'
    return 'grouting'

PALETTES = {
    'grouting': ('#0b2b3a', '#0f766e'),
    'cavity': ('#1b0b3a', '#6d28d9'),
    'geophysical': ('#063f2c', '#16a34a'),
    'cracks': ('#3a0b0b', '#f97316'),
    'settlement': ('#2d1a04', '#f59e0b'),
    'water': ('#06224a', '#2563eb'),
    'monitoring': ('#111827', '#334155'),
    'resin': ('#0f172a', '#38bdf8'),
    'cement': ('#0b1020', '#94a3b8'),
    'foundation': ('#1f2937', '#eab308'),
}

# --- simple icons as SVG groups

def icon(theme: str, seed: int) -> str:
    rnd=random.Random(seed)
    stroke='rgba(255,255,255,0.92)'
    sw=6
    if theme=='geophysical':
        # radar waves + antenna
        return f"""
        <g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
          <path d="M160 520 L260 420 L360 520"/>
          <path d="M260 420 L260 360"/>
          <circle cx="260" cy="340" r="14" fill="{stroke}" stroke="none"/>
          <path d="M260 340 m-70 0 a70 70 0 1 1 140 0" opacity="0.55"/>
          <path d="M260 340 m-120 0 a120 120 0 1 1 240 0" opacity="0.38"/>
          <path d="M260 340 m-170 0 a170 170 0 1 1 340 0" opacity="0.22"/>
        </g>
        """
    if theme=='cavity':
        # ground layers + void
        return f"""
        <g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
          <path d="M120 520 C200 470, 320 560, 420 510" opacity="0.65"/>
          <path d="M120 570 C210 520, 320 610, 420 560" opacity="0.45"/>
          <ellipse cx="300" cy="520" rx="70" ry="38"/>
          <path d="M265 520 C280 545, 320 545, 335 520" opacity="0.7"/>
        </g>
        """
    if theme in ['cracks','settlement']:
        # building + crack + arrow
        return f"""
        <g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
          <rect x="160" y="340" width="220" height="220" rx="22"/>
          <path d="M220 560 V340" opacity="0.35"/>
          <path d="M320 560 V340" opacity="0.35"/>
          <path d="M270 360 L250 420 L290 470 L260 520"/>
          <path d="M420 560 L520 560"/>
          <path d="M520 560 L500 540"/>
          <path d="M520 560 L500 580"/>
        </g>
        """
    if theme=='water':
        # droplet + layers
        return f"""
        <g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
          <path d="M260 350 C260 350, 200 430, 200 480 C200 530, 228 560, 260 560 C292 560, 320 530, 320 480 C320 430, 260 350, 260 350 Z"/>
          <path d="M140 600 C220 560, 320 640, 420 600" opacity="0.45"/>
          <path d="M140 650 C220 610, 320 690, 420 650" opacity="0.25"/>
        </g>
        """
    if theme=='monitoring':
        # chart + points
        return f"""
        <g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
          <rect x="150" y="360" width="300" height="200" rx="18" opacity="0.8"/>
          <path d="M190 520 L250 470 L300 495 L370 430 L430 455"/>
          <circle cx="190" cy="520" r="8" fill="{stroke}" stroke="none"/>
          <circle cx="250" cy="470" r="8" fill="{stroke}" stroke="none"/>
          <circle cx="300" cy="495" r="8" fill="{stroke}" stroke="none"/>
          <circle cx="370" cy="430" r="8" fill="{stroke}" stroke="none"/>
          <circle cx="430" cy="455" r="8" fill="{stroke}" stroke="none"/>
        </g>
        """
    if theme=='resin':
        # nozzle + flow
        return f"""
        <g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
          <path d="M170 420 H340"/>
          <path d="M340 400 V440"/>
          <path d="M340 420 H430"/>
          <path d="M430 420 C470 420, 500 450, 500 490 C500 530, 470 560, 430 560"/>
          <path d="M430 560 H260"/>
          <path d="M260 560 C230 560, 210 540, 210 510" opacity="0.55"/>
        </g>
        """
    if theme=='cement':
        # cement bag + grains
        return f"""
        <g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
          <path d="M190 360 H360 L330 560 H220 Z"/>
          <path d="M210 420 H340" opacity="0.4"/>
          <circle cx="420" cy="440" r="10" fill="{stroke}" stroke="none" opacity="0.7"/>
          <circle cx="460" cy="480" r="8" fill="{stroke}" stroke="none" opacity="0.6"/>
          <circle cx="430" cy="520" r="6" fill="{stroke}" stroke="none" opacity="0.5"/>
        </g>
        """
    if theme=='foundation':
        # raft + piles
        return f"""
        <g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
          <rect x="160" y="380" width="320" height="80" rx="16"/>
          <path d="M210 460 V580"/>
          <path d="M270 460 V580"/>
          <path d="M330 460 V580"/>
          <path d="M390 460 V580"/>
          <path d="M170 580 H490" opacity="0.35"/>
        </g>
        """
    # default grouting: drill + grout
    return f"""
    <g fill="none" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
      <path d="M220 340 V520"/>
      <path d="M190 360 H250"/>
      <path d="M190 500 H250"/>
      <path d="M220 520 C220 560, 260 600, 310 600" opacity="0.85"/>
      <path d="M310 600 C360 600, 400 560, 400 520" opacity="0.6"/>
      <path d="M400 520 C400 475, 360 450, 320 450" opacity="0.45"/>
    </g>
    """


def svg_doc(width: int, height: int, bg0: str, bg1: str, title: str, subtitle: str, theme: str, seed: int, kind: str) -> str:
    # kind: hero or card for slightly different layout
    pad = 80 if kind=='hero' else 64
    icon_x = 80 if kind=='hero' else 70
    icon_y = 220 if kind=='hero' else 170
    text_x = 720 if kind=='hero' else 590
    title_size = 54 if kind=='hero' else 42
    sub_size = 24 if kind=='hero' else 20

    safe_title = title.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    safe_sub = subtitle.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

    return f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{bg0}"/>
      <stop offset="1" stop-color="{bg1}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.2" cy="0.2" r="0.9">
      <stop offset="0" stop-color="rgba(255,255,255,0.22)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse" opacity="0.25">
      <circle cx="2" cy="2" r="1.2" fill="rgba(255,255,255,0.35)"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect width="100%" height="100%" fill="url(#dots)"/>

  <rect x="{pad}" y="{pad}" width="{width-2*pad}" height="{height-2*pad}" rx="{36 if kind=='hero' else 32}" fill="rgba(0,0,0,0.22)" stroke="rgba(255,255,255,0.12)"/>

  <g transform="translate({icon_x},{icon_y})">
    {icon(theme, seed)}
  </g>

  <text x="{text_x}" y="{pad+70}" fill="rgba(255,255,255,0.78)" font-size="18" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">ETLAQ • Technical Library</text>
  <text x="{text_x}" y="{pad+150}" fill="white" font-size="{title_size}" font-weight="700" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" lengthAdjust="spacingAndGlyphs" textLength="{width-text_x-pad}">{safe_title}</text>
  <text x="{text_x}" y="{pad+190}" fill="rgba(255,255,255,0.88)" font-size="{sub_size}" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">{safe_sub}</text>

  <text x="{pad}" y="{height-pad+10}" fill="rgba(255,255,255,0.62)" font-size="16" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">etlaqksa.com</text>
</svg>
"""


def write_svgs():
    for _id, slug, title_ar, title_en in entries:
        theme = detect_theme(slug, (title_en or title_ar))
        bg0, bg1 = PALETTES.get(theme, PALETTES['grouting'])
        seed = int(hashlib.md5(slug.encode('utf-8')).hexdigest()[:8], 16)
        subtitle = (title_ar[:46] + '…') if len(title_ar) > 46 else title_ar
        # use English title as main, Arabic as subtitle (readable + relevant)
        hero = svg_doc(1600, 900, bg0, bg1, title_en[:54], subtitle, theme, seed, 'hero')
        card = svg_doc(1200, 675, bg0, bg1, title_en[:46], subtitle, theme, seed, 'card')
        with open(os.path.join(HERO_DIR, f"{slug}.svg"), 'w', encoding='utf-8') as f:
            f.write(hero)
        with open(os.path.join(CARD_DIR, f"{slug}.svg"), 'w', encoding='utf-8') as f:
            f.write(card)


if __name__ == '__main__':
    if not entries:
        raise SystemExit('No articles parsed from articles.ts')
    write_svgs()
    print(f"✅ Generated {len(entries)} hero SVGs and {len(entries)} card SVGs")
