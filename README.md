# LoomaScale: Google Ads and Meta Ads agent plugin

LoomaScale is an agent plugin that lets Claude Code, Codex, ChatGPT, Cursor, VS Code and
GitHub Copilot read and manage your Google Ads and Meta Ads accounts through one MCP
server, with a spend cap the model cannot talk its way past. It uses the portable
[Agent Plugins](https://agent-plugins.org) format, so one repository installs in every
client that reads `plugin.json`, Kiro, Hermes, OpenClaw and OpenHands included.

It connects your assistant to the LoomaScale MCP server (`https://api.loomascale.com/mcp`)
(over 100 tools across Google Ads, Meta Ads and Google Analytics 4) and ships seven
skills that tell the model how to audit, review, pace, launch and monitor ad accounts
without spending money it was not told to spend.

## What it does

- **Waste audit**: search terms that convert nothing, ad sets spending without results,
  placements that burn budget, ranked by money lost.
- **Performance review**: this period against the last, what moved, why, and a short
  ranked plan.
- **Budget pacing**: today's and month-to-date delivery against budget, reallocation and
  scaling proposals, "why are my ads not showing".
- **Launch a campaign**: keyword research, Search and Performance Max on Google, campaign
  + ad set + ad on Meta, all created paused, with a pre-launch checklist before
  activation.
- **Conversion tracking audit**: duplicate and wrong-primary actions, counting type,
  values, lookback windows, campaign-specific goals.
- **Scheduled checks**: conversion drops, CPA and CPC spikes, ROAS falls, tracking that
  silently broke, creative fatigue; reports only when something is actually unusual.

Every write (budget, status, activation, creation) is shown to you first and waits for
your confirmation, then checked server-side against a daily spend cap you set in the
LoomaScale dashboard. Campaigns are created paused; the tools cannot create a live one.

## Install

You need a LoomaScale account with at least one ad account connected:
[ai.loomascale.com](https://ai.loomascale.com). The free trial covers everything below.

### Claude Code

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale@loomascale
```

Then `/mcp`, pick `loomascale`, and finish the sign-in in the browser. Guides:
[Connect Claude to Google Ads](https://ai.loomascale.com/connect-claude-to-google-ads),
[Connect Claude to Meta Ads](https://ai.loomascale.com/connect-claude-to-meta-ads),
and the walkthrough at [Google Ads + Claude](https://ai.loomascale.com/google-ads-claude).

### VS Code and GitHub Copilot

Command Palette, **Chat: Install Plugin From Source**, paste
`https://github.com/loomascale/agent-plugin`. In a Copilot session:
`/plugin install loomascale/agent-plugin`.

### Cursor

Teams: Dashboard, **Plugins & MCPs**, **Add Marketplace**, **Import from Repo**, paste
the repository URL; then install from **Customize**.

### Codex and ChatGPT

Codex CLI: run `codex`, then `/plugins`, install from a marketplace that lists this
repository, and start a new session. ChatGPT: the published LoomaScale app is in the
Plugins tab. Guides:
[Connect ChatGPT to Google Ads](https://ai.loomascale.com/connect-chatgpt-to-google-ads),
[Connect ChatGPT to Meta Ads](https://ai.loomascale.com/connect-chatgpt-to-meta-ads),
and the walkthrough at [Google Ads + ChatGPT](https://ai.loomascale.com/google-ads-chatgpt).

### Kiro, Hermes, OpenClaw, OpenHands and others

Point the client at this repository or a clone of it. The plugin needs only the files
at the root: `plugin.json`, `mcp.json`, `skills/`.

## Authentication

The server is OAuth 2.1 with dynamic client registration and PKCE. Your client
discovers the authorization server from a `401` on the first call, registers itself,
opens the browser for consent, and stores the token. There is nothing to paste into a
config file and no API key in this repository.

## Layout

```text
plugin.json              portable manifest (Agent Plugins 1.0.0) + com.openai interface
mcp.json                 streamable-http server entry
skills/                  seven Agent Skills, one directory each
.claude-plugin/          Claude Code manifest and single-plugin marketplace
.mcp.json                Claude Code MCP entry
.codex-plugin/           Codex compatibility overlay
assets/                  logo
```

## Skills

| Skill | Use when |
|---|---|
| `loomascale` | any ad-account question: connecting, account choice, read-first and spend-cap rules |
| `waste-audit` | "where am I wasting money", negatives, placements, bad CPA or ROAS |
| `performance-review` | "how are my ads doing", what changed, action plan, weak ads, creative winners |
| `budget-pacing` | pacing, over/underspend, reallocation, scaling, ads not showing |
| `launch-campaign` | first campaign, keyword research, PMax, lead-gen, pre-launch checklist |
| `conversion-tracking-audit` | conversion actions, counting, values, PMax audit, account health |
| `scheduled-checks` | alerts, daily or weekly monitoring, routines and automations |

## Questions

### Can the model spend money without asking?

No. Every budget change, status change, activation and campaign creation is shown to
you first and runs only after you confirm it, and the server then checks it against
the daily spend cap you set. Campaigns are always created paused.

### Which ad platforms does it support?

Google Ads (Search, Performance Max, keywords, conversion actions, sitelinks) and Meta
Ads (Facebook and Instagram campaigns, ad sets, ads, audiences, A/B tests). Google
Analytics 4 reads are in preview.

### Do I need an API key or developer token?

No. The plugin holds no credentials. Sign in to LoomaScale once in the browser; the
client stores an OAuth token. Google Ads and Meta Ads are connected in the LoomaScale
dashboard, not in the plugin.

### Does it work with a Google Ads manager (MCC) account?

Yes. The connection reaches every client account under the manager account you pick,
and `google_audit_portfolio` audits all of them in one call.

## Who builds this

[LoomaScale](https://ai.loomascale.com) is an AI operator for Google Ads and Meta Ads
built by Andrii Pasika; the tools behind this plugin have created and managed live
campaigns from ChatGPT and Claude since 2026. [Privacy](https://ai.loomascale.com/privacy),
[terms](https://ai.loomascale.com/terms), [contact](https://ai.loomascale.com/contact).

## Self-hosting

The same tools, MIT licensed, run against your own accounts:
[loomascale/ads-mcp](https://github.com/loomascale/ads-mcp). Change `mcp.json` to point
at your server.

## License

MIT. See [LICENSE](LICENSE).
