import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { validateCursorManifest } from "./validate-template.mjs";

const marketplace = () => ({
  name: "loomascale",
  owner: { name: "LoomaScale", email: "support@example.com" },
  metadata: { description: "Marketing tools", version: "1.0.0" },
  plugins: [{ name: "loomascale", source: "./plugins/loomascale" }],
});

test("accepts supported discovery fields in the plugin manifest", () => {
  assert.deepEqual(validateCursorManifest("plugin", {
    name: "loomascale",
    displayName: "Google Ads & Meta Ads MCP by LoomaScale",
    description: "Audit campaigns and research public competitor ads.",
    version: "1.2.1",
    author: { name: "LoomaScale", email: "support@example.com" },
    publisher: "LoomaScale",
    homepage: "https://loomascale.com",
    repository: "https://github.com/loomascale/agent-plugin",
    license: "MIT",
    logo: "assets/logo.png",
    keywords: ["google ads mcp", "meta ads mcp"],
    category: "Marketing",
    tags: ["mcp", "ppc"],
    minClientVersions: { cursor: "3.13.0" },
  }), []);
  assert.deepEqual(validateCursorManifest("marketplace", marketplace()), []);
});

for (const [name, mutate] of [
  ["top-level description", (value) => { value.description = "Unsupported"; }],
  ["owner.url", (value) => { value.owner.url = "https://loomascale.com"; }],
  ["entry displayName", (value) => { value.plugins[0].displayName = "LoomaScale"; }],
  ["object source", (value) => { value.plugins[0].source = { path: "./plugins/loomascale" }; }],
]) {
  test(`rejects unsupported marketplace ${name}`, () => {
    const value = marketplace();
    mutate(value);
    assert.ok(validateCursorManifest("marketplace", value).length > 0);
  });
}

test("rejects unsupported plugin author.url and unknown fields", () => {
  const errors = validateCursorManifest("plugin", {
    name: "loomascale",
    author: { name: "LoomaScale", url: "https://loomascale.com" },
    seoDescription: "Unsupported field",
  });
  assert.ok(errors.some((error) => error.includes('"url"')));
  assert.ok(errors.some((error) => error.includes('"seoDescription"')));
});

for (const value of [
  { name: "loomascale", keywords: "google ads" },
  { name: "loomascale", keywords: [7] },
  { name: "loomascale", description: 7 },
  { name: "LoomaScale" },
  null,
]) {
  test(`rejects invalid plugin shape ${JSON.stringify(value)}`, () => {
    assert.ok(validateCursorManifest("plugin", value).length > 0);
  });
}

test("checks URI and email formats", () => {
  assert.ok(validateCursorManifest("plugin", {
    name: "loomascale", homepage: "not a URL",
  }).some((error) => error.includes("uri")));
  const value = marketplace();
  value.owner.email = "invalid-email";
  assert.ok(validateCursorManifest("marketplace", value).some((error) => error.includes("email")));
});

test("validates minClientVersions against Cursor's semver constraint", () => {
  assert.deepEqual(validateCursorManifest("plugin", {
    name: "loomascale", minClientVersions: { cursor: "3.13.0", grokbot: "never" },
  }), []);
  assert.ok(validateCursorManifest("plugin", {
    name: "loomascale", minClientVersions: { cursor: "latest" },
  }).length > 0);
});

test("vendored schemas match the pinned official snapshots", async () => {
  for (const [kind, expected] of [
    ["marketplace", "50c85058bf329588401fd2fc93180a574fa64abbb6c2606400febfb6f4d094e8"],
    ["plugin", "31db124b1c7e43c22abb13ebf7e7c74556482e480fd492b80638d815c85b96b1"],
  ]) {
    const bytes = await readFile(new URL(`./schemas/${kind}.schema.json`, import.meta.url));
    assert.equal(createHash("sha256").update(bytes).digest("hex"), expected);
  }
});

test("CLI resolves the repository from its script path", () => {
  const result = spawnSync(process.execPath, [fileURLToPath(new URL("./validate-template.mjs", import.meta.url))], {
    cwd: tmpdir(), encoding: "utf8",
  });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /Validation passed/);
});
