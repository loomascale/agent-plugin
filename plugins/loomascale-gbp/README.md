# Google Business Profile (GBP) MCP plugin by LoomaScale

`loomascale-gbp` is a Google Business Profile (GBP, formerly Google My Business) MCP
plugin for Cursor, Claude Code, Codex and Grok Build. It connects to your Business
Profile locations through LoomaScale to analyze local SEO performance on Google Search
and Maps, read and answer Google reviews, and update your business listing after you
approve each change.

Google Business Profile is in early access (preview) on LoomaScale. The connection may
not be offered to every account yet, and profile changes are in a separate write preview.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/gbp` and
ships skills that tell the model how to use its tools safely.

Choose the plugin’s first suggested prompt or use `$getting-started-gbp` to see your local visibility, customer actions and reviews with the biggest opportunities to improve them. See the [Google Business Profile getting-started skill](skills/getting-started-gbp/SKILL.md).

## What it does

- Google Business Profile (GBP, formerly Google My Business or GMB): accounts, locations and full profile details
- Local SEO performance: Google Search and Maps impressions, calls, direction requests and website clicks by day
- Google Maps SEO reports: compare two periods of visibility and customer actions across up to 20 locations
- Local search keywords: the monthly search terms that showed your profile, with Google's privacy thresholds
- Google reviews: ratings, comments and owner replies across locations, with average rating and review count
- Review management: draft a personal reply to each review and publish it only after you approve the exact text
- Reputation management: find unanswered and low-rated reviews and recurring themes in customer feedback
- Business listing audit: missing description, hours, categories, attributes, phone or website link
- Update description, website, phones, hours, categories and attributes after a dry run and your approval

## Example prompts

- "Use $getting-started-gbp to analyze my Google Business Profile and show me the biggest opportunities to improve my local visibility."
- "Show my recent Google reviews that have no owner reply and draft a reply to each. Don't publish anything until I approve."
- "Compare my Google Business Profile impressions, calls and direction requests for the last 30 days with the 30 days before."

## Install

You need a [LoomaScale](https://loomascale.com) account with Google Business Profile
connected. During early access the connection may not be offered to your account yet.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-gbp@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-gbp@loomascale
codex mcp login loomascale-gbp
```

### How do I connect Cursor to Google Business Profile?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key is needed; connect Google Business Profile in
the [LoomaScale dashboard](https://loomascale.com/dashboard/connections?source=business_profile)
to access your own locations.

```json
{
  "mcpServers": {
    "loomascale-gbp": {
      "url": "https://api.loomascale.com/mcp/gbp"
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
| [`getting-started-gbp`](skills/getting-started-gbp/SKILL.md) | Check the connection, show local visibility, customer actions and reviews, and rank the biggest opportunities. |
| [`loomascale-gbp`](skills/loomascale-gbp/SKILL.md) | Analyze local performance, search keywords and reviews, draft replies and make approved profile changes. |

## Questions

### Can it reply to reviews or change my profile without asking?

No. Reports and review analysis are read-only. Every reply and profile change starts as a dry run that shows the current value and the proposed value. It is applied only after you approve that exact change in the conversation. There is no automatic reply.

### How do I compare two periods?

Ask for both periods. Google's performance data has no built-in comparison, so the assistant reads each period and calculates the change in impressions, calls, direction requests and website clicks.

### Are the search keywords exact?

Not always. Google reports an exact impression count for some search terms and a privacy threshold ("fewer than" a given number) for others. The plugin keeps a threshold as a threshold. The keywords are the terms that showed your own profile, not market search volume or ranking positions.

### How do I see Business Profile visits in Google Analytics 4?

Add UTM parameters to the website link on your profile, for example `?utm_source=google&utm_medium=organic&utm_campaign=gbp`. Google Analytics 4 (GA4) can then separate profile clicks from other Google organic visits. The assistant can preview that link change for your approval.

### What can't it do?

It does not create, verify or delete locations, change the business name or address, or delete reviews. Changes are refused on suspended or disabled locations. It cannot guarantee a higher position in local search results.

### Do I need this if I already use the `loomascale` plugin?

No. The [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) includes the Business Profile tools plus Google Ads, Meta Ads and the other integrations. Use `loomascale-gbp` when Google Business Profile is the only product you work with. For organic search results of your website rather than your business listing, use the [Google Search Console plugin](../loomascale-gsc) or the [SEO plugin](../loomascale-seo).

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/gbp`: MCP server (Streamable HTTP)
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
