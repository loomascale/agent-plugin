# TikTok Ads MCP plugin by LoomaScale

`loomascale-tiktok` is a TikTok Ads MCP plugin for Cursor, Claude Code, Codex and Grok
Build. It connects to your TikTok ad accounts through LoomaScale to find wasted spend,
compare video creatives and audiences, diagnose delivery and ad review, and make
campaign changes you preview and approve.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/tiktok` and
ships skills that tell the model how to use its tools safely.

Choose the plugin’s first suggested prompt or use `$getting-started-tiktok` to compare two weeks of TikTok ad spend and conversions. See the [TikTok Ads getting-started skill](skills/getting-started-tiktok/SKILL.md).

## What it does

- TikTok Ads performance: spend, conversions and cost per conversion by campaign, ad group or ad
- Video creative analysis: hook rate, hold rate and completion rate by ad, video or Smart+ creative
- Audience breakdowns by age, gender, country, placement, platform, language, network or interest
- Delivery diagnosis: TikTok's ad group diagnostics, ad review reasons and creative fatigue (where TikTok enables it)
- TikTok Pixel event counts, browser and server, for up to 30 days (read-only; the [TikTok Pixel plugin](../loomascale-tiktokpixel) has these checks alone)
- Preview, then apply, status, budget, bid, targeting, schedule and name changes you approve
- Create paused Upgraded Smart+ website campaigns, ad groups and ads from your creative library
- Daily budgets above your spend cap are refused; nothing is deleted

## Example prompts

- "Audit my TikTok Ads for the last 30 days: which ad groups and ads spent money without conversions?"
- "Which of my TikTok videos hook and hold viewers best? Compare view rates and cost per conversion by video."
- "Why is my TikTok ad group not delivering? Check TikTok's diagnostics and ad review."

## Install

You need a [LoomaScale](https://loomascale.com) account with TikTok Ads connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-tiktok@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-tiktok@loomascale
codex mcp login loomascale-tiktok
```

### How do I connect Cursor to TikTok Ads?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key is needed; connect TikTok Ads in the
LoomaScale dashboard to access your own ad accounts.

```json
{
  "mcpServers": {
    "loomascale-tiktok": {
      "url": "https://api.loomascale.com/mcp/tiktok"
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
| `loomascale-tiktok` | Audit and manage the user's connected TikTok Ads accounts with LoomaScale. |

## Questions

### Can it change my campaigns without asking?

No. Reports and diagnostics are read-only. Every change is previewed first and runs
only after you approve it. Daily budgets above the spend cap you set in LoomaScale are
refused, and new Smart+ campaigns are always created paused.

### Can it delete campaigns or upload videos?

No. It pauses instead of deleting, and it builds ads only from videos already in your
TikTok creative library. Deletion and uploads happen in TikTok Ads Manager.

### Do I need this if I already use the `loomascale` plugin?

No. The [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) includes the TikTok Ads tools plus Google Ads, Meta Ads and the other integrations. Use `loomascale-tiktok` when TikTok Ads is the only platform you work with.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/tiktok`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

Your TikTok, Google, Meta and LinkedIn connections live in the LoomaScale dashboard, not in
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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by TikTok, Google,
Meta or LinkedIn. [Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
