import json

with open("local-preview-report.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print("="*60)
print("MAIN THREAD WORK BREAKDOWN:")
print("="*60)
a = data.get("audits", {}).get("mainthread-work-breakdown", {})
details = a.get("details", {})
for item in details.get("items", []):
    print(f"  - {item.get('groupLabel', item.get('group'))}: {item.get('duration')} ms")

print("\n" + "="*60)
print("TOP LONG TASKS:")
print("="*60)
# Let's list individual tasks that take a lot of time
tasks_audit = data.get("audits", {}).get("main-thread-tasks", {})
tasks_details = tasks_audit.get("details", {})
long_tasks = []
for item in tasks_details.get("items", []):
    dur = item.get("duration", 0)
    if dur > 50:
        long_tasks.append((dur, item.get("startTime")))
long_tasks.sort(reverse=True)
for dur, start in long_tasks[:10]:
    print(f"  - Task taking {dur:.2f} ms starting at {start:.2f} ms")
