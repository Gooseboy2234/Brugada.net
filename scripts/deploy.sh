#!/usr/bin/env bash
# Deploy the site to the Cloudflare Worker that serves brugada.net.
#
# The build generates dist/server/wrangler.json from vite.config.ts, and that
# generated file names the Worker after the starter template rather than after
# this site. It also omits workers_dev and preview_urls, which wrangler then
# defaults to ON, publishing a second copy of the whole site at
# brugada-net.fungoose41.workers.dev. Both are corrected here rather than by
# hand, so that a rebuild cannot quietly reintroduce either.
#
# Usage:
#   bash scripts/deploy.sh            deploy
#   bash scripts/deploy.sh --dry-run  build, patch, and check without uploading

set -euo pipefail
cd "$(dirname "$0")/.."

WORKER=brugada-net
DOMAINS=(brugada.net)
# www is a CNAME to the Cloudflare Tunnel that also carries ssh and compute, so
# it cannot become a custom domain without moving DNS. Claiming it as a Worker
# route leaves the tunnel alone; worker/index.ts redirects it to the apex.
ROUTES=('www.brugada.net/*')
CONFIG=dist/server/wrangler.json
DRY=""
[ "${1:-}" = "--dry-run" ] && DRY="--dry-run"

echo "== Rules =="
bash scripts/check-site-rules.sh

echo
echo "== Build =="
rm -rf dist
npm run build

echo
echo "== Patch generated Worker config =="
node - "$CONFIG" "$WORKER" <<'PATCH'
import { readFileSync, writeFileSync } from "node:fs";
const [file, name] = process.argv.slice(2);
const cfg = JSON.parse(readFileSync(file, "utf8"));
cfg.name = name;
cfg.topLevelName = name;
// One canonical host. A second copy of the site on a workers.dev subdomain is
// duplicate content that a search engine can index in place of the real one.
cfg.workers_dev = false;
cfg.preview_urls = false;
// Without this, Workers Assets strips the .html extension with a 307 redirect,
// so every manuscript URL in the sitemap resolves through a temporary redirect
// instead of serving directly. The only .html assets here are the manuscripts.
cfg.assets = { ...cfg.assets, html_handling: "none" };
writeFileSync(file, JSON.stringify(cfg, null, 2));
console.log(`  name=${cfg.name} workers_dev=${cfg.workers_dev} preview_urls=${cfg.preview_urls}`);
PATCH

echo
echo "== Deploy =="
TRIGGER_ARGS=()
for d in "${DOMAINS[@]}"; do TRIGGER_ARGS+=(--domains "$d"); done
for r in "${ROUTES[@]}"; do TRIGGER_ARGS+=(--routes "$r"); done

WRANGLER_LOG_PATH=.wrangler/deploy-run.log \
  npx wrangler deploy \
    --config "$CONFIG" \
    --name "$WORKER" \
    "${TRIGGER_ARGS[@]}" \
    --message "brugada.net rebuild: $(git rev-parse --short HEAD)" \
    $DRY
