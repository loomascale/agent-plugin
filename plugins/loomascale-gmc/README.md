# Google Merchant Center (GMC) plugin by LoomaScale

`loomascale-gmc` is an agent plugin that connects Claude Code and Codex to your Google Merchant Center (GMC) accounts through LoomaScale.

Diagnose Google Merchant Center (GMC) product disapprovals and feed errors. Review Google Shopping and free listings performance, then update eligible product data and feed settings on request.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/gmc` and
ships skills that tell the model how to use its tools safely.

## What it does

- Merchant Center diagnostics: account issues and product disapprovals by destination and country
- Disapproved, pending and active products with Google's item issues and help links
- Google Shopping ads and free listings clicks, impressions and CTR by product
- Product feed audits: data sources, fetch schedules, processing status and row errors
- Shipping settings and return policies (read-only)
- Account settings, business information, website claim and autofeed changes on request
- Change feed schedules, fetch eligible sources and create API product feeds on request
- Update titles, prices, availability and other product attributes on eligible API sources
- Create supplemental feeds; linking to a primary source is completed in Merchant Center

## Example prompts

- "Why are my Google Shopping products disapproved? Check my Merchant Center diagnostics and prioritize the issues."
- "Audit my Merchant Center product feeds for processing errors and failed fetches. Don't change anything."
- "Which products get the most clicks from Google Shopping ads and free listings in my Merchant Center account?"

## Install

You need a [LoomaScale](https://loomascale.com) account with Google Merchant Center connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-gmc@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-gmc@loomascale
codex mcp login loomascale-gmc
```

On first use, the client opens LoomaScale sign-in in your browser. Approve access there.
No API key is needed.

## Skills

| Skill | What it covers |
|---|---|
| `loomascale-gmc` | Diagnose the user's connected Google Merchant Center (GMC) account with LoomaScale. |

## Questions

### Can it change my products without asking?

No. Diagnostics and performance reports are read-only. Product, feed and account changes run only when you ask for them, and only on eligible API data sources.

### Do I need this if I already use the `loomascale` plugin?

No. The all-in [`loomascale`](../loomascale) plugin includes the Merchant Center tools plus Google Ads, Meta Ads and the other integrations. Use `loomascale-gmc` when Merchant Center is the only product you work with.

## Authentication and network

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/gmc`: MCP server (Streamable HTTP)
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
.mcp.json                    MCP server (Claude Code, Grok Build)
mcp.json                     MCP server (Codex)
skills/                      Agent Skills
assets/                      logo
```

Part of [LoomaScale agent plugins](https://github.com/loomascale/agent-plugin), built by
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Google, Meta or
LinkedIn. [Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
