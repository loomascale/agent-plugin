# Google Search Console (GSC) MCP plugin by LoomaScale

`loomascale-gsc` is a Google Search Console (GSC) MCP plugin for Cursor, Claude Code,
Codex and Grok Build. It connects to your Search Console properties through LoomaScale
to compare organic traffic, find keyword opportunities and low-CTR pages, inspect
indexing status, and make requested sitemap and property changes.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/gsc` and
ships skills that tell the model how to use its tools safely.

Choose the plugin’s first suggested prompt or use `$getting-started-gsc` to compare two finalized weeks of organic clicks and impressions. See the [Google Search Console getting-started skill](skills/getting-started-gsc/SKILL.md).

## What it does

- Google Search Console property discovery with access and verification status
- SEO reports: clicks, impressions, CTR and average keyword position by query, page, country, device and date
- Organic traffic comparisons to identify pages and queries gaining or losing clicks
- Keyword opportunities near top search positions, with brand terms excluded
- Low-CTR pages with high impressions and estimated click potential
- URL Inspection: stored indexing status, Google-selected canonical and last crawl
- Sitemap status: last download, processing, errors and warnings
- Sitemap submission, resubmission and removal, on request
- Add a Search Console property, or remove one after you confirm it
- No indexing requests: Google offers no public API for them on normal pages

## Example prompts

- "Compare my Google Search Console traffic over the last 28 days with the previous 28. Which pages lost clicks?"
- "Find non-brand keywords with high impressions and low CTR in my Search Console data."
- "Is my homepage indexed in Google? Check its canonical URL and my sitemap errors in Search Console."
- "Resubmit my sitemap in Search Console now that its errors are fixed."

## Install

You need a [LoomaScale](https://loomascale.com) account with Google Search Console connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-gsc@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-gsc@loomascale
codex mcp login loomascale-gsc
```

### How do I connect Cursor to Google Search Console?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key is needed; connect Google Search Console in
the LoomaScale dashboard to access your own properties.

```json
{
  "mcpServers": {
    "loomascale-gsc": {
      "url": "https://api.loomascale.com/mcp/gsc"
    }
  }
}
```

Manual MCP setup connects the hosted tools; a plugin installation also includes the
bundled workflow skills. See the [official Cursor MCP setup guide](https://cursor.com/docs/mcp).

For Claude Code and Codex, complete browser sign-in when the client prompts you.

## Skills

| Skill | What it covers |
|---|---|
| `loomascale-gsc` | Analyze the user's connected Google Search Console (GSC) properties with LoomaScale. |

## Questions

### Can it change my Search Console settings?

Only when you ask. It can submit, resubmit or remove a sitemap, add a property to your Search Console account, and remove a property after you confirm it (a dry run comes first). An added property stays unverified until you verify it in Search Console. These changes need the full Search Console permission (`webmasters`) on your connection; if it is missing, the tool asks you to reconnect.

### Can it request indexing for a page?

No. Google has no public API to request indexing of a normal page. The plugin can inspect a URL's stored index status; request indexing from URL Inspection in Search Console. It also never changes your website's content.

### Do I need this if I already use the `loomascale` plugin?

No. The [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) includes the Search Console tools plus Google Ads, Meta Ads and the other integrations. Use `loomascale-gsc` when Search Console is the only product you work with.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/gsc`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

Your Google, Meta, TikTok and LinkedIn connections live in the LoomaScale dashboard, not in
this plugin. Changes run only after you approve them.

## Files

```text
.claude-plugin/plugin.json   Claude Code manifest
.grok-plugin/plugin.json     Grok Build manifest
.codex-plugin/plugin.json    Codex manifest
.cursor-plugin/plugin.json   Cursor manifest
.mcp.json                    MCP server (Claude Code, Grok Build)
mcp.json                     MCP server (Codex, Cursor)
skills/                      Agent Skills
assets/                      logo
```

Part of [LoomaScale MCP plugins for Cursor and other AI assistants](https://github.com/loomascale/agent-plugin), built by
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Google, Meta or
LinkedIn. [Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
