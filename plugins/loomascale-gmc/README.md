# Google Merchant Center (GMC) MCP plugin by LoomaScale

`loomascale-gmc` is a Google Merchant Center (GMC) MCP plugin for Cursor, Claude Code,
Codex and Grok Build. It connects to your Merchant Center accounts through LoomaScale
to diagnose product disapprovals and feed errors, review Google Shopping performance,
and make requested changes to eligible product data and feed settings.
It also includes the Google Ads, Meta Ads, TikTok Ads and LinkedIn Ads tools and the
other Google sources, with Merchant Center offered first when you connect.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/gmc` and
ships skills that tell the model how to use its tools safely.

Choose the plugin’s first suggested prompt or use `$getting-started-gmc` to see current product eligibility by destination and country. See the [Google Merchant Center getting-started skill](skills/getting-started-gmc/SKILL.md).

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

### How do I connect Cursor to Google Merchant Center?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key is needed; connect Google Merchant Center in
the LoomaScale dashboard to access your own accounts.

```json
{
  "mcpServers": {
    "loomascale-gmc": {
      "url": "https://api.loomascale.com/mcp/gmc"
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
| `loomascale-gmc` | Diagnose the user's connected Google Merchant Center (GMC) account with LoomaScale. |

## Questions

### Can it change my products without asking?

No. Diagnostics and performance reports are read-only. Product, feed and account changes require your approval. Product attribute updates are limited to eligible API data sources.

### Do I need this if I already use the `loomascale` plugin?

No. `loomascale-gmc` carries nearly the same tools as the [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale): Merchant Center plus Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, GA4 and the other Google sources. The difference is setup: Merchant Center is the first source it offers to connect. Install one or the other, not both.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/gmc`: MCP server (Streamable HTTP)
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
