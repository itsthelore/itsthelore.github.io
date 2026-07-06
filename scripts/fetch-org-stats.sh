#!/usr/bin/env bash
# Sums stargazers_count across every public repo in the itsthelore org and
# exposes it to mkdocs.yml's `extra.total_org_stars` via the TOTAL_ORG_STARS
# env var (mkdocs.yml reads it with the !ENV tag, default 0). In GitHub
# Actions, GITHUB_TOKEN gives a real count; without a token (local dev)
# this is skipped and the site falls back to hiding the stat entirely.
set -euo pipefail

ORG=itsthelore

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "GITHUB_TOKEN not set — skipping live star fetch (site will hide the stat)." >&2
  total=0
else
  total=$(GITHUB_TOKEN="$GITHUB_TOKEN" ORG="$ORG" python3 - <<'PYEOF'
import json
import os
import urllib.request

org = os.environ["ORG"]
token = os.environ["GITHUB_TOKEN"]
headers = {
    "Authorization": f"Bearer {token}",
    "Accept": "application/vnd.github+json",
    "User-Agent": "itsthelore-site-build",
}

total = 0
page = 1
while True:
    url = f"https://api.github.com/orgs/{org}/repos?per_page=100&page={page}&type=public"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        repos = json.load(resp)
    if not repos:
        break
    total += sum(r.get("stargazers_count", 0) for r in repos)
    if len(repos) < 100:
        break
    page += 1

print(total)
PYEOF
)
fi

echo "Total stars across $ORG's public repos: $total"

if [ -n "${GITHUB_ENV:-}" ]; then
  echo "TOTAL_ORG_STARS=$total" >> "$GITHUB_ENV"
fi
