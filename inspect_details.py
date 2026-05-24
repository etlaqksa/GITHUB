import json

with open("local-preview-report.json", "r", encoding="utf-8") as f:
    data = json.load(f)

audits = data.get("audits", {})

keys = [
    'mainthread-work-breakdown',
    'render-blocking-insight',
    'network-dependency-tree-insight',
    'forced-reflow-insight',
    'largest-contentful-paint-element',
    'lcp-breakdown-insight'
]

for k in keys:
    print("\n" + "="*60)
    print(f"AUDIT: {k}")
    print("="*60)
    a = audits.get(k, {})
    if not a:
        print("Not found")
        continue
    print("Score:", a.get("score"))
    print("Display Value:", a.get("displayValue"))
    print("Details:")
    details = a.get("details", {})
    if "items" in details:
        for item in details["items"][:10]:
            print(json.dumps(item, indent=2, ensure_ascii=False))
    else:
        print(json.dumps(details, indent=2, ensure_ascii=False))
