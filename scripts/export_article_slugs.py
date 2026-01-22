#!/usr/bin/env python3
"""
Export all article slugs (and titles) into a CSV ready to fill with manual image URLs.

Reads:   client/src/data/articles.ts
Writes:  docs/article_image_links.csv   (overwrite)
         docs/article_slugs.csv         (reference list)

Usage:
  python scripts/export_article_slugs.py
"""

import csv
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ARTICLES_TS = ROOT / "client" / "src" / "data" / "articles.ts"
OUT_DIR = ROOT / "docs"
OUT_LINKS = OUT_DIR / "article_image_links.csv"
OUT_SLUGS = OUT_DIR / "article_slugs.csv"

# Attempt to extract slug + titleAr + titleEn from object literals.
OBJ_RE = re.compile(
    r"\{[\s\S]*?slug:\s*'(?P<slug>[^']+)'[\s\S]*?titleAr:\s*'(?P<titleAr>[^']*)'[\s\S]*?titleEn:\s*'(?P<titleEn>[^']*)'[\s\S]*?\}",
    re.MULTILINE
)

SLUG_RE = re.compile(r"slug:\s*'([^']+)'")

def parse_articles(text: str):
    items = []
    for m in OBJ_RE.finditer(text):
        items.append((m.group("slug").strip(), m.group("titleAr").strip(), m.group("titleEn").strip()))
    if items:
        return items

    # Fallback: slug-only
    slugs = []
    for m in SLUG_RE.finditer(text):
        s = m.group(1).strip()
        if s not in slugs:
            slugs.append(s)
    return [(s, "", "") for s in slugs]

def main():
    if not ARTICLES_TS.exists():
        print(f"Could not find: {ARTICLES_TS}", file=sys.stderr)
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    text = ARTICLES_TS.read_text(encoding="utf-8", errors="ignore")
    items = parse_articles(text)

    # 1) CSV ready to fill (manual links)
    with OUT_LINKS.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["slug", "hero_url", "card_url"])
        for slug, _ar, _en in items:
            w.writerow([slug, "", ""])

    # 2) Reference list with titles
    with OUT_SLUGS.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["slug", "title_ar", "title_en"])
        for slug, ar, en in items:
            w.writerow([slug, ar, en])

    print("Done. Generated:")
    print("-", OUT_LINKS.relative_to(ROOT))
    print("-", OUT_SLUGS.relative_to(ROOT))
    print("\nNext step:")
    print("1) Open docs/article_image_links.csv")
    print("2) Paste your image links into hero_url and/or card_url")
    print("3) Run: python scripts/fetch_article_images.py")

if __name__ == "__main__":
    main()
