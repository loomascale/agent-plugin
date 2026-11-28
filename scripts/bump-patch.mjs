#!/usr/bin/env node
// Bumps the patch version of every plugin manifest under plugins/*/ (plugin.json and
// .antigravity-plugin / .claude-plugin / .codex-plugin / .cursor-plugin / .grok-plugin), plus the per-plugin
// entries in .claude-plugin/marketplace.json and the root gemini-extension.json. Each file is bumped from its own current
// version (manifests are allowed to drift), and only the version string is rewritten so
// formatting stays intact.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestDirs = ["", ".antigravity-plugin", ".claude-plugin", ".codex-plugin", ".cursor-plugin", ".grok-plugin"];
const VERSION_RE = /("version"\s*:\s*")(\d+)\.(\d+)\.(\d+)(")/g;

const files = [];
for (const plugin of fs.readdirSync(path.join(root, "plugins"), { withFileTypes: true })) {
  if (!plugin.isDirectory()) continue;
  for (const dir of manifestDirs) {
    const file = path.join(root, "plugins", plugin.name, dir, "plugin.json");
    if (fs.existsSync(file)) files.push(file);
  }
}
files.push(path.join(root, ".claude-plugin", "marketplace.json"));
files.push(path.join(root, "gemini-extension.json"));

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const changes = [];
  const out = src.replace(VERSION_RE, (_, pre, major, minor, patch, post) => {
    const next = `${major}.${minor}.${Number(patch) + 1}`;
    changes.push(`${major}.${minor}.${patch} -> ${next}`);
    return `${pre}${next}${post}`;
  });
  if (!changes.length) continue;
  fs.writeFileSync(file, out);
  console.log(`${path.relative(root, file)}: ${changes.join(", ")}`);
}
