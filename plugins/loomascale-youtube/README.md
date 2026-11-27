# YouTube Ads MCP plugin by LoomaScale

`loomascale-youtube` is a YouTube Ads MCP plugin for Cursor, Claude Code, Codex and Grok
Build. YouTube ads run in Google Ads, so the plugin connects to your Google Ads accounts
through LoomaScale. Use it to report video ad results by in-stream, in-feed and Shorts,
see which video ads hold viewers, find spend without conversions, launch paused Demand
Gen video campaigns, and make changes you preview and approve.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/youtube` and
ships skills that tell the model how to use its tools safely.

Choose the plugin's first suggested prompt or use `$getting-started-youtube` to compare two weeks of YouTube ad results. See the [YouTube Ads getting-started skill](skills/getting-started-youtube/SKILL.md).

## What it does

- YouTube ad reports: spend, impressions, views, view rate, cost per view, clicks and conversions by account, campaign, ad group or ad, for any date range
- YouTube surfaces: Demand Gen results split by in-stream, in-feed and Shorts
- Watch-through: the 25%, 50%, 75% and 100% watch rates of each video ad
- Waste and pacing: campaigns, audiences and locations that spend without conversions, and today's spend against daily budgets
- Demand Gen launches: a new video campaign from videos already on YouTube, created paused until you activate it
- Preview, then apply, status, budget, bidding, ad group targeting and YouTube channel changes you approve
- Daily budgets above your spend cap are refused

## Example prompts

- "How did my YouTube ads do over the last 30 days, split by in-stream, in-feed and Shorts?"
- "Which of my YouTube video ads keep viewers watching to the end?"
- "Create a paused Demand Gen campaign for my YouTube video with a $10 daily budget in the United States."

## Install

You need a [LoomaScale](https://loomascale.com) account with Google Ads connected. There
is no separate YouTube connection.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-youtube@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-youtube@loomascale
codex mcp login loomascale-youtube
```

### How do I connect Cursor to YouTube Ads?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key or Google Ads developer token is needed;
connect Google Ads in the LoomaScale dashboard to access your own accounts.

```json
{
  "mcpServers": {
    "loomascale-youtube": {
      "url": "https://api.loomascale.com/mcp/youtube"
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
| `loomascale-youtube` | Report and manage YouTube ads in the user's Google Ads accounts with LoomaScale. |
| `getting-started-youtube` | Check the Google Ads connection and compare two weeks of YouTube ad results. |

## Questions

### Which YouTube campaigns does it cover?

Demand Gen campaigns, which serve on YouTube in-stream, in-feed and Shorts, and classic
Video campaigns. Both are reported. Classic Video campaigns can only be changed in the
Google Ads interface, so for those the assistant recommends the change to make there. See
Google's [Demand Gen campaigns overview](https://support.google.com/google-ads/answer/13695777).

### Are views the same as YouTube channel views?

No. Views, view rate and cost per view are ad views as Google Ads counts them. Organic
channel views, subscribers and watch time live in YouTube Studio, which this plugin does
not read.

### Can it change my campaigns without asking?

No. Reports and audits are read-only. Every change is previewed first and runs only after
you approve it. New campaigns, ad groups and ads are created paused. Daily budgets above
the spend cap you set in LoomaScale are refused.

### Can it upload videos?

No. Ads use videos already on YouTube. Uploading and editing videos is done in YouTube
Studio.

### Do I need this if I already use the `loomascale` plugin?

No. The [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) includes the same YouTube tools plus Search, Performance Max, Shopping, Meta Ads and the other integrations. Use `loomascale-youtube` when YouTube ads are all you work on.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/youtube`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

Your Google Ads connection lives in the LoomaScale dashboard, not in this plugin.

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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Google or
YouTube. [Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
