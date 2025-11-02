import os, re, yaml, textwrap

ROOT = "."
CONTENT_DIRS = ["_posts", "_pages", "pages", "blog", "docs", "."]  # tweak if needed
VALID_EXT = (".md", ".markdown", ".html")

frontmatter_regex = re.compile(r"^---\n(.*?)\n---\n(.*)$", re.DOTALL)

def extract(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    m = frontmatter_regex.match(content)
    fm = {}
    body = content
    if m:
        try:
            fm = yaml.safe_load(m.group(1)) or {}
        except Exception:
            fm = {}
        body = m.group(2).strip()
    snippet = body.replace("\n", " ")
    snippet = re.sub(r"\s+", " ", snippet)[:200]
    return fm, snippet

def should_include(path):
    if not path.endswith(VALID_EXT):
        return False
    # ignore typical junk
    if any(s in path for s in ["_site", ".git", "node_modules", ".jekyll-cache"]):
        return False
    return True

items = []

for cdir in CONTENT_DIRS:
    base = os.path.join(ROOT, cdir)
    if not os.path.exists(base):
        continue
    for root, dirs, files in os.walk(base):
        # skip build dirs
        dirs[:] = [d for d in dirs if d not in (".git", "_site", ".jekyll-cache", "node_modules")]
        for fname in files:
            full = os.path.join(root, fname)
            rel = os.path.relpath(full, ROOT)
            if should_include(rel):
                fm, snip = extract(full)
                items.append((rel, fm, snip))

# print as markdown
print("# Repo content summary\n")
for rel, fm, snip in sorted(items, key=lambda x: x[0]):
    title = fm.get("title") or fm.get("name") or ""
    layout = fm.get("layout") or ""
    permalink = fm.get("permalink") or ""
    tags = fm.get("tags") or []
    if isinstance(tags, str):
        tags = [tags]
    print(f"## {rel}")
    if title: print(f"- **title:** {title}")
    if layout: print(f"- **layout:** {layout}")
    if permalink: print(f"- **permalink:** {permalink}")
    if tags: print(f"- **tags:** {', '.join(tags)}")
    print(f"- **preview:** {snip}...")
    print()
