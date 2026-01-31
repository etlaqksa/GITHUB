#!/usr/bin/env python3
"""Download + generate article images locally.

Why this exists:
- Vite serves static files from client/public
- We want lightweight repo zips: do not bundle many large JPGs
- External placeholder sources can rate-limit or be unavailable (503/429)

This script:
1) Reads slugs + EN titles from client/src/data/articles.ts
2) Tries to download a 16:9 image (hero) for each slug
3) Creates 2 WebP variants:
   - hero 1600x900
   - card 960x540
4) If download fails, generates a clean placeholder image locally so the site always has images.
"""

import csv
import os
import re
import sys
import time
import urllib.parse
from pathlib import Path

import requests
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ARTICLES_TS = ROOT / "client" / "src" / "data" / "articles.ts"

OUT_BASE = ROOT / "client" / "public" / "article-images"
ORIG = OUT_BASE / "original"
CARD = OUT_BASE / "card"
HERO = OUT_BASE / "hero"

CARD_SIZE = (960, 540)     # 16:9
HERO_SIZE = (1600, 900)    # 16:9

TIMEOUT = 25
MAX_RETRIES = 5

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0 Safari/537.36"
)

def ensure_dirs():
    for p in (ORIG, CARD, HERO):
        p.mkdir(parents=True, exist_ok=True)

def slugify(s: str) -> str:
    s = s.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s or "article"

def parse_articles(ts_path: Path):
    """Extract (slug, title_en, category_en) from articles.ts.
    It's a TS file; we do a tolerant regex-based parse.
    """
    text = ts_path.read_text(encoding="utf-8", errors="ignore")
    # Find objects that contain slug + titleEn + categoryEn (best-effort)
    # slug: '...'
    # titleEn: '...'
    # categoryEn: '...'
    obj_re = re.compile(
        r"\{[^\}]*?slug\s*:\s*['\"](?P<slug>[^'\"]+)['\"][^\}]*?titleEn\s*:\s*['\"](?P<title>[^'\"]+)['\"][^\}]*?(?:categoryEn\s*:\s*['\"](?P<cat>[^'\"]+)['\"])?",
        re.DOTALL,
    )
    items = []
    for m in obj_re.finditer(text):
        items.append((m.group("slug"), m.group("title"), m.group("cat") or ""))
    # Deduplicate by slug
    seen = set()
    out = []
    for slug, title, cat in items:
        if slug in seen:
            continue
        seen.add(slug)
        out.append((slug, title, cat))
    return out

def pick_query(title_en: str, category_en: str) -> str:
    base = category_en.strip() or "geotechnical engineering"
    # keep it short to avoid weird queries
    title_words = " ".join(re.findall(r"[A-Za-z]+", title_en)[:6])
    query = f"{base}, {title_words}, construction, engineering"
    return query.strip(" ,")

def try_download(url: str, dest: Path) -> (bool, str):
    headers = {"User-Agent": UA, "Accept": "image/avif,image/webp,image/*,*/*"}
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            r = requests.get(url, headers=headers, timeout=TIMEOUT, allow_redirects=True)
            if r.status_code == 200 and r.content and len(r.content) > 10_000:
                dest.write_bytes(r.content)
                return True, "ok"
            # Common temporary failures: 503, 429, 5xx
            msg = f"http {r.status_code}"
        except Exception as e:
            msg = str(e)

        # Backoff
        sleep_s = min(2 ** attempt, 20)
        time.sleep(sleep_s)
    return False, msg

def generate_placeholder(dest: Path, title: str, size=(1600, 900)):
    """Generate a clean, professional-ish placeholder without external services."""
    w, h = size
    img = Image.new("RGB", (w, h), (18, 24, 38))  # dark slate
    draw = ImageDraw.Draw(img)

    # Simple diagonal accents
    for i in range(0, w, 80):
        draw.line([(i, 0), (0, i)], fill=(32, 48, 72), width=6)

    # Title card
    pad = int(min(w, h) * 0.08)
    box = (pad, pad, w - pad, h - pad)
    draw.rounded_rectangle(box, radius=36, fill=(255, 255, 255), outline=(230, 230, 230), width=3)

    # Pick font
    font = None
    try:
        # DejaVu is common on many systems; fallback to default
        font = ImageFont.truetype("DejaVuSans.ttf", 54)
        font_small = ImageFont.truetype("DejaVuSans.ttf", 28)
    except Exception:
        font = ImageFont.load_default()
        font_small = ImageFont.load_default()

    # Wrap title
    max_chars = 36
    words = title.strip().split()
    lines = []
    cur = ""
    for w0 in words:
        if len(cur) + len(w0) + 1 <= max_chars:
            cur = (cur + " " + w0).strip()
        else:
            if cur:
                lines.append(cur)
            cur = w0
    if cur:
        lines.append(cur)
    lines = lines[:4]

    # Draw text centered
    y = pad + 90
    for ln in lines:
        bbox = draw.textbbox((0, 0), ln, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
        x = (w - tw) // 2
        draw.text((x, y), ln, fill=(15, 23, 42), font=font)
        y += th + 18

    hint = "ETLAQ KSA • Technical Article"
    hb = draw.textbbox((0, 0), hint, font=font_small)
    hx = (w - (hb[2]-hb[0])) // 2
    draw.text((hx, h - pad - 70), hint, fill=(55, 65, 81), font=font_small)

    img.save(dest, format="JPEG", quality=90, optimize=True)

def make_variants(orig_path: Path, slug: str, card_path: Path | None = None):
    img = Image.open(orig_path).convert("RGB")

    # Hero
    hero = img.copy()
    hero.thumbnail(HERO_SIZE, Image.Resampling.LANCZOS)
    # If the thumbnail isn't exact, pad/crop to exact 16:9
    hero = center_crop_to(hero, HERO_SIZE)
    hero.save(HERO / f"{slug}.webp", format="WEBP", quality=82, method=6)

    # Card
    card_src = Image.open(card_path or orig_path).convert("RGB")
    card = card_src.copy()
    card.thumbnail(CARD_SIZE, Image.Resampling.LANCZOS)
    card = center_crop_to(card, CARD_SIZE)
    card.save(CARD / f"{slug}.webp", format="WEBP", quality=80, method=6)

def center_crop_to(img: Image.Image, size):
    tw, th = size
    w, h = img.size
    # If smaller, upscale a bit (rare) to avoid black bars
    if w < tw or h < th:
        scale = max(tw / w, th / h)
        img = img.resize((int(w * scale + 0.5), int(h * scale + 0.5)), Image.Resampling.LANCZOS)
        w, h = img.size
    left = (w - tw) // 2
    top = (h - th) // 2
    return img.crop((left, top, left + tw, top + th))


def load_manual_image_links(csv_path: Path):
    """Load optional manual image URLs.

    CSV format (UTF-8):
    - slug (required)
    - hero_url (optional)
    - card_url (optional)
    - image_url / url (optional): if provided and hero_url/card_url missing, used for both.

    Returns: dict[slug] = {"hero_url": str|None, "card_url": str|None, "image_url": str|None}
    """
    if not csv_path or not csv_path.exists():
        return {}

    links = {}
    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            return {}
        # normalize fieldnames
        field_map = {name.strip().lower(): name for name in reader.fieldnames}
        def get(row, *keys):
            for k in keys:
                src = field_map.get(k)
                if src and row.get(src) is not None:
                    v = str(row.get(src)).strip()
                    if v:
                        return v
            return None

        for row in reader:
            slug = get(row, "slug")
            if not slug:
                continue
            hero_url = get(row, "hero_url", "hero")
            card_url = get(row, "card_url", "card")
            image_url = get(row, "image_url", "url", "image")
            if image_url:
                hero_url = hero_url or image_url
                card_url = card_url or image_url
            links[slug] = {"hero_url": hero_url, "card_url": card_url, "image_url": image_url}
    return links


def main():
    ensure_dirs()
    if not ARTICLES_TS.exists():
        print(f"Could not find: {ARTICLES_TS}", file=sys.stderr)
        sys.exit(1)

    items = parse_articles(ARTICLES_TS)

    # Optional manual image links CSV (preferred): docs/article_image_links.csv
    manual_csv = ROOT / "docs" / "article_image_links.csv"
    manual_links = load_manual_image_links(manual_csv)
    if not items:
        print("No articles found in articles.ts", file=sys.stderr)
        sys.exit(1)

    manifest_path = ROOT / "docs" / "article_images_manifest.csv"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)

    # Primary (can be rate limited sometimes)
    def unsplash_source(query: str) -> str:
        return "https://source.unsplash.com/1600x900/?" + urllib.parse.quote(query)

    # Fallback that usually works without keys
    def picsum_source(seed: str) -> str:
        return f"https://picsum.photos/seed/{urllib.parse.quote(seed)}/1600/900"

    with manifest_path.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["slug", "title_en", "category_en", "query_used", "source", "status", "detail"])

        for slug, title_en, cat_en in items:
            query = pick_query(title_en, cat_en)
            orig_path = ORIG / f"{slug}.jpg"

            # Skip if already generated
            if (HERO / f"{slug}.webp").exists() and (CARD / f"{slug}.webp").exists():
                w.writerow([slug, title_en, cat_en, query, "local", "skipped", "already exists"])
                continue


            # Manual CSV override (docs/article_image_links.csv)
            manual = manual_links.get(slug)
            if manual and (manual.get("hero_url") or manual.get("card_url")):
                hero_url = manual.get("hero_url") or manual.get("card_url")
                card_url = manual.get("card_url") or hero_url
                tmp_card = ORIG / f"{slug}__card.jpg"

                okm, dm = try_download(hero_url, orig_path)
                if okm:
                    # If card URL differs, try downloading a separate source for the card crop
                    card_path = None
                    if card_url and card_url != hero_url:
                        okc, dc = try_download(card_url, tmp_card)
                        if okc:
                            card_path = tmp_card
                        else:
                            # fallback to hero source for card
                            if tmp_card.exists():
                                tmp_card.unlink(missing_ok=True)

                    make_variants(orig_path, slug, card_path=card_path)
                    if tmp_card.exists():
                        tmp_card.unlink(missing_ok=True)

                    w.writerow([slug, title_en, cat_en, query, "manual_csv", "downloaded", f"hero:{hero_url} | card:{card_url}"])
                    print(f"✓ {slug} (manual)")
                    continue
                else:
                    w.writerow([slug, title_en, cat_en, query, "manual_csv", "failed", f"hero:{hero_url} => {dm}"])

            # Try Unsplash Source
            src1 = unsplash_source(query)
            ok, detail = try_download(src1, orig_path)
            if ok:
                make_variants(orig_path, slug)
                w.writerow([slug, title_en, cat_en, query, src1, "downloaded", "ok"])
                print(f"✓ {slug} (unsplash)")
                continue

            # Try Picsum fallback
            src2 = picsum_source(slug)
            ok2, detail2 = try_download(src2, orig_path)
            if ok2:
                make_variants(orig_path, slug)
                w.writerow([slug, title_en, cat_en, query, src2, "downloaded", "fallback picsum"])
                print(f"✓ {slug} (picsum)")
                continue

            # Generate local placeholder
            generate_placeholder(orig_path, title_en, size=HERO_SIZE)
            make_variants(orig_path, slug)
            w.writerow([slug, title_en, cat_en, query, "generated", "placeholder", f"unsplash:{detail} | picsum:{detail2}"])
            print(f"! {slug} (placeholder)", file=sys.stderr)

    print("\nDone. Outputs:")
    print("- client/public/article-images/hero/<slug>.webp")
    print("- client/public/article-images/card/<slug>.webp")
    print("Manifest:", manifest_path)

if __name__ == "__main__":
    main()
