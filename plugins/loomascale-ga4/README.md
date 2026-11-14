# Google Analytics 4 (GA4) plugin by LoomaScale

`loomascale-ga4` is an agent plugin that connects Claude Code and Codex to your Google Analytics 4 (GA4) properties through LoomaScale.

Analyze Google Analytics 4 (GA4) traffic, conversions, revenue and funnels with LoomaScale. Manage key events, event rules, enhanced measurement, data redaction and web streams after a dry run and your approval.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/ga4` and
ships skills that tell the model how to use its tools safely.

## What it does

- Google Analytics 4 account and property discovery
- Website traffic, source/medium, channels, users, sessions and engagement reports
- Landing page, event, key event and ecommerce revenue analysis
- Period comparisons to investigate traffic and conversion changes
- Ordered event funnels, completion rates and drop-offs by device
- Realtime activity and event reports for the last 30 minutes
- Conversion attribution, ad cost and ROAS reporting where available in GA4
- Property time zone, currency, custom dimensions, custom metrics, annotations and Google Ads link inspection
- Key event, event rule, enhanced measurement, data redaction and web stream changes, each approved after a dry run

## Example prompts

- "Show my Google Analytics website traffic and most popular pages for the last seven complete days."
- "Compare my GA4 traffic sources, key events and revenue for the last 30 complete days with the previous 30."
- "Preview marking generate_lead as a GA4 key event counted once per session. Show a dry run for approval; do not apply it."

## Install

You need a [LoomaScale](https://loomascale.com) account with Google Analytics connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-ga4@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-ga4@loomascale
codex mcp login loomascale-ga4
```

On first use, the client opens LoomaScale sign-in in your browser. Approve access there.
No API key is needed.

## Skills

| Skill | What it covers |
|---|---|
| `ga4-insights` | Explain changes in the user's Google Analytics 4 (GA4) traffic, engagement, key events, revenue and funnel performance using connected LoomaScale reports. |
| `loomascale-ga4` | Analyze and configure the user's connected Google Analytics 4 (GA4) properties with LoomaScale. |

## Questions

### Can it change my GA4 settings without asking?

No. Reports never change settings. Key event, event rule, enhanced measurement, data redaction and web stream changes start with a dry run that shows the exact change, and apply only after you approve it. It cannot install tags or delete properties.

### Do I need this if I already use the `loomascale` plugin?

No. The all-in [`loomascale`](../loomascale) plugin includes every GA4 tool plus Google Ads, Meta Ads and the other integrations. Use `loomascale-ga4` when GA4 is the only product you work with.

## Authentication and network

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/ga4`: MCP server (Streamable HTTP)
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
