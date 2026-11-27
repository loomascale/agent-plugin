# OpenAI plugin manifest limits

The OpenAI plugin portal (platform.openai.com -> Plugins) validates every
`plugins/*/.codex-plugin/plugin.json` on upload. Other agent manifests (`.claude-plugin`,
`.cursor-plugin`, `.grok-plugin`) are not subject to these limits.

- **`interface.capabilities`: each entry must be 120 characters or fewer.** Over the limit, the
  upload fails with "Enter valid capabilities of 120 characters or fewer." Shorten the wording;
  do not drop a claim or keyword to fit. Check every plugin before building:

  ```bash
  for f in plugins/*/.codex-plugin/plugin.json; do
    node -e 'const m=require("./"+process.argv[1]);for(const c of m.interface.capabilities||[])if(c.length>120)console.log(process.argv[1],c.length,c)' "$f"
  done
  ```

- **`keywords`: at most 25 entries.**
- **Every keyword should appear in a capability.** Capabilities are what the directory shows,
  so a keyword with no matching capability is a claim the listing does not support. Do not add
  a keyword for something no skill covers.
- **The OpenAI zip must not contain the root `plugins/<name>/plugin.json`** (the
  agent-plugins.org manifest). It declares no MCP, and the portal rejects the upload with
  "This package omits the plugin's existing MCP". `scripts/build-openai-zip.sh` strips it; keep
  it that way.

Capabilities, keywords and descriptions are public copy: finish changes with the
`SEO-GEO-AEO-Skill` audit (see the global instructions).
