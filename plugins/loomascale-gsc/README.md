# Google Search Console (GSC) plugin by LoomaScale

`loomascale-gsc` is an agent plugin that connects Claude Code and Codex to your Google Search Console (GSC) properties through LoomaScale.

Google Search Console (GSC) SEO analysis: compare organic search traffic, find keyword opportunities and low-CTR pages, and check URL indexing and sitemaps. Submit sitemaps and manage properties when you ask.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/gsc` and
ships skills that tell the model how to use its tools safely.

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

Cursor: until the Cursor Marketplace listing is live, add `https://api.loomascale.com/mcp/gsc`
in **Cursor Settings → MCP → Add new MCP server**.

On first use, the client opens LoomaScale sign-in in your browser. Approve access there.
No API key is needed.

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

No. The all-in [`loomascale`](../loomascale) plugin includes the Search Console tools plus Google Ads, Meta Ads and the other integrations. Use `loomascale-gsc` when Search Console is the only product you work with.

## Authentication and network

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/gsc`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

Your Google, Meta and LinkedIn connections live in the LoomaScale dashboard, not in
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

Part of [LoomaScale agent plugins](https://github.com/loomascale/agent-plugin), built by
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Google, Meta or
LinkedIn. [Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
