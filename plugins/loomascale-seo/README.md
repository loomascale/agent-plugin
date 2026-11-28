# SEO MCP plugin by LoomaScale

`loomascale-seo` is an SEO MCP plugin, an SEO tool inside Cursor, Claude Code, Codex and
Grok Build. It answers SEO questions from your own Google Search Console data, plus Google Analytics 4
(GA4) when you connect it, through LoomaScale. Use it to find the queries closest to page
one, explain organic traffic drops, check indexing and sitemaps, and see which pages that
rank actually convert.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/seo` and
ships skills that tell the model how to use its tools.

Choose the plugin's first suggested prompt or use `$getting-started-seo` to see the queries closest to page one. See the [SEO getting-started skill](skills/getting-started-seo/SKILL.md).

## What it does

- Ranks queries in positions 4 to 20 by the clicks a top-3 position would add, with brand terms excluded
- Finds page-one queries and pages whose titles earn fewer clicks than their position should
- Compares organic clicks, impressions, CTR and position between two periods by query, page, country and device
- Inspects a URL's stored index status, the canonical Google chose and its last crawl
- Reports sitemap processing and errors, and submits or removes a sitemap when you ask
- With GA4 connected: organic sessions, engagement and key events by landing page
- Never edits your website or GA4 settings, and cannot request indexing (Google has no API for it)

## Example prompts

- "Which of my Google queries are closest to the top 3, and which pages should I improve first?"
- "Which of my pages lost the most Google clicks this month, and why?"
- "Which pages get organic traffic from Google but no conversions in GA4?"

## Install

You need a [LoomaScale](https://loomascale.com) account with Google Search Console
connected. Connect Google Analytics 4 as well for the conversion questions.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-seo@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-seo@loomascale
codex mcp login loomascale-seo
```

### How do I connect Cursor to my SEO data?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key, service account or Google Cloud project is
needed; connect Search Console and GA4 in the LoomaScale dashboard.

```json
{
  "mcpServers": {
    "loomascale-seo": {
      "url": "https://api.loomascale.com/mcp/seo"
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
| `loomascale-seo` | SEO answers from the user's Search Console and GA4 data with LoomaScale. |
| `getting-started-seo` | Check the connections and show the queries closest to page one. |

## Questions

### What is a striking-distance keyword?

A striking-distance keyword is a query your site already ranks for at an average position
of about 4 to 20, with real impressions. Moving it into the top 3 usually adds more clicks
than chasing a new keyword. The plugin ranks these queries by the extra clicks a top-3
position would bring, using Search Console's own impressions and typical click-through
rates by position.

### Why do Search Console clicks and GA4 sessions differ?

A Search Console click is counted by Google when someone clicks your result. A GA4 session
is counted only if your analytics tag loads and the visitor allows it, and GA4's organic
channel also includes other search engines. The plugin shows both and compares pages by
rank and ratio, not by total. See how Google
[counts clicks, impressions and position](https://support.google.com/webmasters/answer/7042828).

### Can it request indexing or change my site?

No. Google offers no public API to request indexing of normal pages, so the plugin reports
the stored index status and points you to URL Inspection in Search Console. It never
edits your website or GA4 settings. Its only changes are Search Console sitemaps and
properties, and only when you ask.

### Do I need this if I already use `loomascale-gsc`, `loomascale-ga4` or `loomascale`?

Not necessarily. The [Google Search Console plugin](../loomascale-gsc) covers Search Console
alone, the [Google Analytics 4 plugin](../loomascale-ga4) covers GA4 alone, including its
configuration, and the [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale)
covers everything. Use `loomascale-seo` when you want both SEO sources in one assistant,
without ad platforms or GA4 configuration tools.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/seo`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

Your Search Console and GA4 connections live in the LoomaScale dashboard, not in this plugin.

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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Google.
[Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
