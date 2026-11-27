# LinkedIn Ads MCP plugin by LoomaScale

`loomascale-linkedin` is a LinkedIn Ads MCP plugin for Cursor, Claude Code, Codex and Grok
Build. It connects to your LinkedIn ad accounts through LoomaScale. Use it to report
campaign and creative results, see which job titles, seniorities and industries your
leads come from, find spend without leads, and make campaign changes you preview and
approve.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/linkedin` and
ships skills that tell the model how to use its tools safely.

Choose the plugin's first suggested prompt or use `$getting-started-linkedin` to compare two weeks of LinkedIn ad spend and leads. See the [LinkedIn Ads getting-started skill](skills/getting-started-linkedin/SKILL.md).

## What it does

- LinkedIn Ads reports: impressions, clicks, CTR, spend, CPC, leads, conversions and cost per lead by account, campaign group, campaign or creative, compared with the previous period
- Professional demographics: results by job title, seniority, industry, company, job function, company size or country
- Waste audit: campaigns, creatives and audience segments that spent without leads or conversions, ranked by money lost
- Campaign detail: settings, targeting, creatives, review status and approximate audience size
- Preview, then apply, status, budget, bidding, targeting, end date, delivery and name changes you approve
- Daily budgets above your spend cap are refused; nothing is created or deleted

## Example prompts

- "How did my LinkedIn campaigns do over the last 30 days compared with the 30 days before?"
- "Which job titles and seniorities are my LinkedIn leads coming from, and which ones spend without leads?"
- "Where am I wasting money on LinkedIn Ads?"

## Install

You need a [LoomaScale](https://loomascale.com) account with LinkedIn Ads connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-linkedin@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-linkedin@loomascale
codex mcp login loomascale-linkedin
```

### How do I connect Cursor to LinkedIn Ads?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key or LinkedIn developer app is needed; connect
LinkedIn Ads in the LoomaScale dashboard to access your own ad accounts.

```json
{
  "mcpServers": {
    "loomascale-linkedin": {
      "url": "https://api.loomascale.com/mcp/linkedin"
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
| `loomascale-linkedin` | Audit and manage the user's connected LinkedIn Ads accounts with LoomaScale. |
| `getting-started-linkedin` | Check the LinkedIn Ads connection and compare two weeks of spend and leads. |

## Questions

### How accurate are the job title and industry breakdowns?

They are directional. LinkedIn reports demographic figures approximately and 12 to 24
hours late, hides values with fewer than 3 events, and gives no conversion value for
them. See LinkedIn's [ads reporting documentation](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/ads-reporting).

### Can it change my campaigns without asking?

No. Reports and audits are read-only. Every change is previewed first and runs only after
you approve it. Daily budgets above the spend cap you set in LoomaScale are refused.
Editing is rolling out by account; where it is not available yet, the assistant gives the
recommended change to make in LinkedIn Campaign Manager.

### Can it create campaigns or post to my company page?

No. It changes existing campaigns, campaign groups and creatives only. New campaigns,
creatives, conversion tracking and organic company page posts are done on LinkedIn.

### Do I need this if I already use the `loomascale` plugin?

No. The [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) includes the LinkedIn Ads tools plus Google Ads, Meta Ads and the other integrations. Use `loomascale-linkedin` when LinkedIn Ads is the only platform you work with.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/linkedin`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

Your LinkedIn, Google, Meta and TikTok connections live in the LoomaScale dashboard, not in
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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by LinkedIn,
Google, Meta or TikTok. [Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
