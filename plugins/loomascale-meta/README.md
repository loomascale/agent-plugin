# Meta Ads (Facebook and Instagram Ads) MCP plugin by LoomaScale

`loomascale-meta` is a Meta Ads MCP plugin for Cursor, Claude Code, Codex and Grok
Build. It connects to your Facebook Ads and Instagram Ads accounts through LoomaScale
to find wasted spend, diagnose delivery and Meta Pixel issues, research competitor
ads in the Meta Ad Library, and make campaign changes you approve.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/meta` and
ships skills that tell the model how to use its tools safely.

Choose the plugin’s first suggested prompt or use `$getting-started-meta` to compare two weeks of Facebook and Instagram ad spend and results. See the [Meta Ads getting-started skill](skills/getting-started-meta/SKILL.md).

## What it does

- Meta Ads performance: spend, results, CPA and ROAS by campaign, ad set, ad, placement, age or gender
- Wasted spend: ad sets and ads spending without results
- Delivery diagnosis: account status, delivery issues, rejected ads and today's pacing
- Creative review: ad copy, previews and signs of fatigue
- Meta Pixel and Conversions API health: received events and Event Match Quality (read-only)
- Public competitor ads from the Meta Ad Library across Facebook and Instagram
- Create paused campaigns, ad sets and ads; activate only after you approve the budget
- Change budgets, status, targeting and bidding on request, checked against your daily spend cap
- Manage custom audiences, A/B tests and lift studies; delete paused objects you name

## Example prompts

- "Audit my Meta Ads for the last 30 days: which ad sets and ads spent money without results?"
- "Why did my Facebook ads CPA go up this week? Compare it with last week by campaign and placement."
- "Show my competitor's active Facebook and Instagram ads from the Meta Ad Library."

## Install

You need a [LoomaScale](https://loomascale.com) account with Meta Ads connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-meta@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-meta@loomascale
codex mcp login loomascale-meta
```

### How do I connect Cursor to Meta Ads?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key is needed; connect Meta Ads in the
LoomaScale dashboard to access your own ad accounts.

```json
{
  "mcpServers": {
    "loomascale-meta": {
      "url": "https://api.loomascale.com/mcp/meta"
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
| `loomascale-meta` | Audit and manage the user's connected Meta Ads (Facebook Ads and Instagram Ads) accounts with LoomaScale. |

## Questions

### Can it change my campaigns without asking?

No. Audits, reports and Ad Library research are read-only. Every change needs your
approval. New campaigns are created paused, and activations and budget changes are
checked against the daily spend cap you set in LoomaScale.

### Does it need access to my competitor's ad account?

No. Competitor research reads the public Meta Ad Library. It shows copy, media and
landing pages, not a competitor's spend or results.

### Do I need this if I already use the `loomascale` plugin?

No. The [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) includes the Meta Ads tools plus Google Ads and the other integrations. Use `loomascale-meta` when Meta Ads is the only platform you work with.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/meta`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

Your Meta, Google, TikTok and LinkedIn connections live in the LoomaScale dashboard, not in
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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Meta, Google or
LinkedIn. [Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
