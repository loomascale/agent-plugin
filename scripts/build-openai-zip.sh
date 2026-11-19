#!/usr/bin/env bash
# Builds dist/loomascale.zip for platform.openai.com -> Plugins -> "Create draft from ZIP".
# The OpenAI portal requires the existing plugin's app ID as the name, while Codex
# installs from this repo require plugin.json name == marketplace entry name ("loomascale").
# So the repo keeps "loomascale" and only the uploaded ZIP carries the app ID.
set -euo pipefail

APP_ID="app-6a6a442345f88191b23be1e01237d551"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

cp -R "$ROOT/plugins/loomascale" "$STAGE/loomascale"
find "$STAGE" -name .DS_Store -delete

node -e '
const fs = require("fs");
const [file, id] = process.argv.slice(1);
const m = JSON.parse(fs.readFileSync(file, "utf8"));
m.name = id;
fs.writeFileSync(file, JSON.stringify(m, null, 2) + "\n");
' "$STAGE/loomascale/.codex-plugin/plugin.json" "$APP_ID"

mkdir -p "$ROOT/dist"
rm -f "$ROOT/dist/loomascale.zip"
(cd "$STAGE" && zip -qr "$ROOT/dist/loomascale.zip" loomascale)
echo "Built $ROOT/dist/loomascale.zip (name: $APP_ID)"
