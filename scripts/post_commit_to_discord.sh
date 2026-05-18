#!/usr/bin/env bash
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/_rg_shim.sh"

read_webhook_from_file() {
  local file="$1"
  [ -f "$file" ] || return 1
  rg -o 'DISCORD_COMMITS_WEBHOOK=("[^"]+"|[^[:space:]]+)' "$file" | head -1 | sed -E 's/.*=//; s/^"//; s/"$//'
}

# Try secrets + shell profiles (~/.secrets first — see feedback_discord_silent_hook_failure.md)
for f in "$HOME/.secrets" "$HOME/.zshrc" "$HOME/.zshenv" "$HOME/.zprofile" "$HOME/.bash_profile" "$HOME/.profile"; do
  [ -z "${DISCORD_COMMITS_WEBHOOK:-}" ] && DISCORD_COMMITS_WEBHOOK=$(read_webhook_from_file "$f" || true)
done

# Fallback: check project .env file (git hooks run from repo root)
if [ -z "${DISCORD_COMMITS_WEBHOOK:-}" ]; then
  PROJECT_ENV="$(git rev-parse --show-toplevel 2>/dev/null)/.env"
  [ -f "$PROJECT_ENV" ] && DISCORD_COMMITS_WEBHOOK=$(read_webhook_from_file "$PROJECT_ENV" || true)
fi

if [ -z "${DISCORD_COMMITS_WEBHOOK:-}" ]; then
  echo "DISCORD_COMMITS_WEBHOOK not set (add to ~/.zshrc or project .env)"; exit 1
fi

if [ $# -lt 1 ]; then
  echo "Usage: $0 <commit-ish> [context]"; exit 1
fi

COMMIT=$1
CONTEXT=${2:-Commit}
REPO=$(git rev-parse --show-toplevel | xargs basename)
BRANCH=$(git rev-parse --abbrev-ref HEAD)
AUTHOR_NAME=$(git log "$COMMIT" -1 --pretty=format:'%an')
COMMIT_SUBJECT=$(git log "$COMMIT" -1 --pretty=format:'%s')
COMMIT_HASH=$(git rev-parse --short "$COMMIT")
URL=$(git config --get remote.origin.url | sed -e 's/git@github.com:/https:\/\/github.com\//' -e 's/\.git$//')
COMMIT_URL="$URL/commit/$COMMIT_HASH"

# Export variables for Python script
export REPO BRANCH AUTHOR_NAME COMMIT_SUBJECT COMMIT_HASH COMMIT_URL DISCORD_COMMITS_WEBHOOK

# Build formatted message with proper field labels and line breaks
# Using Python to ensure proper JSON encoding
python3 - <<'PY'
import json
import subprocess
import os
import re

# Get environment variables
webhook = os.environ.get("DISCORD_COMMITS_WEBHOOK")
repo = os.environ.get("REPO")
branch = os.environ.get("BRANCH")
author_name = os.environ.get("AUTHOR_NAME")
commit_subject = os.environ.get("COMMIT_SUBJECT")
commit_hash = os.environ.get("COMMIT_HASH")
commit_url = os.environ.get("COMMIT_URL")

# Map GitHub handles to full names
author_map = {
    "imclab": "James Tunick",
    "jamestunick": "James Tunick",
    "Claude Sonnet 4.5": "Claude Sonnet 4.5",
}

if author_name in author_map:
    author_display = f"{author_map[author_name]} (@{author_name})"
elif author_name.lower() in author_map:
    author_display = f"{author_map[author_name.lower()]} (@{author_name})"
else:
    author_display = author_name

# --- gitmoji prefix from conventional-commit type --------------------
GITMOJI = {
    "feat": "✨", "fix": "🐛", "docs": "📝", "style": "💄",
    "refactor": "♻️", "perf": "⚡", "test": "✅", "chore": "🔧",
    "build": "📦", "ci": "👷", "revert": "⏪", "merge": "🔀",
    "wip": "🚧", "security": "🔒", "deps": "⬆️", "init": "🎉",
}
m = re.match(r'^([a-z]+)(?:\([^)]+\))?!?:\s*(.*)$', commit_subject)
ctype = m.group(1) if m else None
emoji = GITMOJI.get(ctype, "📌")
subject_display = commit_subject if (commit_subject.startswith(emoji) or commit_subject[:1] not in "abcdefghijklmnopqrstuvwxyz") else f"{emoji} {commit_subject}"

# --- diffstat: parent..commit -----------------------------------------
def sh(*args):
    r = subprocess.run(args, capture_output=True, text=True)
    return r.stdout.strip()

ns_total = sh("git", "diff", "--shortstat", f"{commit_hash}~1", commit_hash) or sh("git", "show", "--shortstat", "--format=", commit_hash)
files_n = ins_n = del_n = 0
mt = re.search(r'(\d+) files? changed', ns_total)
if mt: files_n = int(mt.group(1))
mi = re.search(r'(\d+) insertions?', ns_total); ins_n = int(mi.group(1)) if mi else 0
md = re.search(r'(\d+) deletions?', ns_total); del_n = int(md.group(1)) if md else 0

# top-5 changed files, each a tiny bar
ns = sh("git", "diff", "--numstat", f"{commit_hash}~1", commit_hash) or sh("git", "show", "--numstat", "--format=", commit_hash)
rows = []
for line in ns.splitlines():
    parts = line.split("\t")
    if len(parts) < 3: continue
    a, d, path = parts
    if a == "-" or d == "-":  # binary
        rows.append((0, 0, path, True)); continue
    rows.append((int(a), int(d), path, False))
rows.sort(key=lambda r: -(r[0] + r[1]))
top = rows[:5]
max_total = max((r[0] + r[1]) for r in top) if top else 1

def bar(adds, dels, max_total, width=10):
    total = adds + dels
    if total == 0 or max_total == 0:
        return "·" * width
    filled = max(1, round(width * total / max_total))
    g = round(filled * adds / total) if total else 0
    r = filled - g
    return "+" * g + "-" * r + "·" * (width - filled)

file_lines = []
for adds, dels, path, is_bin in top:
    short = path if len(path) <= 38 else "…" + path[-37:]
    if is_bin:
        file_lines.append(f"  {'·'*10}  {short}  (bin)")
    else:
        file_lines.append(f"  {bar(adds, dels, max_total)}  {short}  +{adds}/-{dels}")
more = f"  … {files_n - len(top)} more" if files_n > len(top) else ""

stat_block = f"```\n{files_n} files  +{ins_n}/-{del_n}\n" + "\n".join(file_lines)
if more: stat_block += "\n" + more
stat_block += "\n```"

content = (
    f"{emoji} **{ctype or 'commit'}** · `{repo}@{branch}` · `{commit_hash}`\n"
    f"{author_display} — {subject_display}\n"
    f"{stat_block}\n"
    f"🔗 {commit_url}"
)

# Create the JSON payload
payload = {"content": content}

# Send to Discord — surface HTTP code so /tmp/discord_post.log shows pass/fail
result = subprocess.run([
    "curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}",
    "-H", "Content-Type: application/json",
    "-d", json.dumps(payload),
    webhook
], capture_output=True, text=True)
print(f"[discord] commit={commit_hash} http={result.stdout.strip()} stderr={result.stderr.strip()}")
PY
