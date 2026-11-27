#!/usr/bin/env bash
# Builds dist/<plugin>.zip for platform.openai.com -> Plugins -> "Create draft from ZIP".
# The OpenAI portal requires the existing plugin's app ID as the name, while Codex
# installs from this repo require plugin.json name == marketplace entry name ("loomascale").
# So the repo keeps "loomascale" and only the uploaded loomascale.zip carries the app ID.
# Sliced plugins (loomascale-*) are zipped as-is, keeping their repo name.
set -euo pipefail

APP_ID="app-6a6a442345f88191b23be1e01237d551"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$ROOT/dist"

for dir in "$ROOT"/plugins/*/; do
  name="$(basename "$dir")"
  [ -f "$dir/.codex-plugin/plugin.json" ] || continue

  cp -R "$ROOT/plugins/$name" "$STAGE/$name"
  find "$STAGE/$name" -name .DS_Store -delete

  if [ "$name" = "loomascale" ]; then
    # Rename every manifest of the all-in plugin (root plugin.json and .*-plugin/plugin.json).
    node -e '
const fs = require("fs");
const [id, ...files] = process.argv.slice(1);
for (const file of files) {
  const m = JSON.parse(fs.readFileSync(file, "utf8"));
  m.name = id;
  fs.writeFileSync(file, JSON.stringify(m, null, 2) + "\n");
}
' "$APP_ID" $(find "$STAGE/$name" -maxdepth 2 -name plugin.json)
    label="$APP_ID"
  else
    label="$name"
  fi

  rm -f "$ROOT/dist/$name.zip"
  (cd "$STAGE" && zip -qr "$ROOT/dist/$name.zip" "$name")
  echo "Built $ROOT/dist/$name.zip (name: $label)"
done
