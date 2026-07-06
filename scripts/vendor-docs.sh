#!/usr/bin/env bash
# Implements the vendor contract from rac-core's ADR-101: sparse-checkout
# each source repo's docs/ at build time, never commit the result.
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
vendor_dir="$root/.vendor"
docs_dir="$root/docs"

vendor_repo() {
  local slug="$1" repo="$2" ref="$3" path="$4"
  local checkout_dir="$vendor_dir/$slug"
  local target_dir="$docs_dir/$slug"

  echo "Vendoring $repo#$ref:$path -> docs/$slug"

  rm -rf "$checkout_dir"
  mkdir -p "$checkout_dir"
  git -C "$checkout_dir" init -q
  git -C "$checkout_dir" remote add origin "$repo"
  git -C "$checkout_dir" sparse-checkout set --no-cone "$path"
  git -C "$checkout_dir" fetch --depth 1 origin "$ref"
  git -C "$checkout_dir" checkout -q FETCH_HEAD

  rm -rf "$target_dir"
  mkdir -p "$target_dir"
  cp -r "$checkout_dir/$path/." "$target_dir/"
}

vendor_repo rac-core https://github.com/itsthelore/rac-core.git main docs

# The org root (docs/index.md) already carries its own splash hero; strip
# the vendored rac-core home's template/hide frontmatter so it renders as a
# normal nav page ("Overview") instead of a second, mislinked splash.
python3 - "$docs_dir/rac-core/index.md" <<'PYEOF'
import re, sys

path = sys.argv[1]
text = open(path, encoding="utf-8").read()
text = re.sub(r"^---\n.*?\n---\n", "", text, count=1, flags=re.DOTALL)
open(path, "w", encoding="utf-8").write(text)
PYEOF
