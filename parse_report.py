import json
from pathlib import Path

def parse_report(path):
    p = Path(path)
    if not p.exists():
        print(f"File {path} does not exist.")
        return
        
    try:
        data = json.loads(p.read_text(encoding='utf-8', errors='ignore'))
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        return
        
    print("\n" + "="*50)
    print(f"  LOCAL LIGHTHOUSE AUDIT SUMMARY: {p.name.upper()}")
    print("="*50)
    
    categories = data.get('categories', {})
    for cid, cat in categories.items():
        score = cat.get('score')
        score_pct = int(score * 100) if score is not None else "N/A"
        print(f"  {cat.get('title', cid)}: {score_pct}%")
        
    audits = data.get('audits', {})
    
    print("\n  CORE WEB VITALS:")
    metrics = [
        ('first-contentful-paint', 'FCP'),
        ('largest-contentful-paint', 'LCP'),
        ('total-blocking-time', 'TBT'),
        ('cumulative-layout-shift', 'CLS'),
        ('speed-index', 'Speed Index'),
        ('interactive', 'TTI')
    ]
    for key, label in metrics:
        aud = audits.get(key, {})
        val = aud.get('displayValue', 'N/A')
        print(f"    - {label}: {val}")
        
    print("\n  FAILING AUDITS (score < 0.90):")
    failing_count = 0
    for aid, aud in audits.items():
        score = aud.get('score')
        if score is not None and score < 0.9:
            display_val = aud.get('displayValue', '')
            title = aud.get('title', aid)
            print(f"    * [{int(score*100)}%] {title}: {display_val}")
            failing_count += 1
            if failing_count >= 15:
                print("    * ... (showing first 15 failing audits)")
                break

if __name__ == "__main__":
    parse_report("local-preview-report.json")
