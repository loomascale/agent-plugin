# Google Ads, Meta Ads and TikTok Ads MCP plugin by LoomaScale

LoomaScale is a Google Ads, Meta Ads and TikTok Ads MCP plugin for Cursor, Claude
Code, Codex and Grok Build. Audit your campaigns, compare video ad performance and
review budget changes before you approve them. Competitor research covers public
Google, Facebook and Instagram ads.

The same connection also covers LinkedIn Ads, Google Analytics 4, Google Tag Manager,
Google Search Console and Google Merchant Center for marketing analysis and supported
account changes.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp` and
ships skills that tell the model how to use its tools safely.

## What can I do with LoomaScale in Cursor?

- Audit Google Ads campaigns, search terms and conversion tracking; find wasted spend and negative keywords
- Manage Google Ads Search, Shopping and Performance Max campaigns, ads, keywords, bids and budgets after approval
- Research Google Ads keyword ideas, search volume, competition and bid estimates
- Analyze competitors' public Google Ads and Meta Ads creatives, messaging, offers and disclosed landing pages with [competitor-ad-research](skills/competitor-ad-research/SKILL.md)
- Meta Ads audits, creative performance and campaign management for Facebook Ads and Instagram Ads
- Meta Pixel (Facebook Pixel) event activity, Event Match Quality and Conversions API diagnostics (read-only)
- Audit TikTok Ads campaigns, compare video creatives and audiences, and preview budget or bid changes
- LinkedIn Ads performance and demographics reporting
- Google Analytics 4 (GA4) traffic, conversion and funnel analysis
- Google Search Console (GSC) search analytics, URL indexing inspection, and sitemap and property management on request
- Google Merchant Center (GMC) product issues and performance reporting
- Google Tag Manager (GTM) tracking audits
- Cross-source performance analysis, attribution diagnostics and budget recommendations

## What can I do with the TikTok Ads MCP plugin?

Connect your TikTok Ads account in LoomaScale to compare spend and cost per
conversion by campaign, ad group or ad. Reports cover manual and Smart+ campaigns,
including purchase return on ad spend (ROAS) where available. Compare 2-second
views, 6-second views and completion rates by video, or see how spend varies by
age, country or placement.

You can pause, resume or rename existing campaigns, ad groups and ads, change a
campaign or ad group budget, and adjust bids on eligible ad groups. You preview
and approve each edit. Create new campaigns in TikTok Ads Manager. For the reports
and metric definitions, see the [TikTok Ads reporting workflow](skills/loomascale/references/advertising.md#how-do-i-audit-tiktok-ads-performance).

## How do I get started with LoomaScale?

Use [getting-started](skills/getting-started/SKILL.md) to find practical ways
LoomaScale can help your business. The skill checks connected sources, learns your
goal and daily challenges, and runs a focused read when the target and access are
clear. You get a first insight, tailored prompts for useful daily or weekly work,
and a next step beyond the initial audit. It also suggests relevant sources you
already use that could answer questions your current connections cannot.

For example, a shop could review product issues and purchase funnel changes; a
service business could investigate enquiry trends; an agency could repeat a
client performance brief. Suggestions depend on your connected data and goals.
Getting started does not change campaigns, settings or connections, or schedule
background work.

In Codex, invoke `$getting-started`, or use the first suggested prompt. In Claude
Code, Cursor or Grok Build, ask: "Help me get started with LoomaScale for my business."

## Example prompts

- "Use $getting-started to tailor a first insight, repeatable workflows and useful data connections to my business goals and daily challenges. Keep it read-only."
- "Find negative keyword opportunities in my Google Ads search terms. Explain each recommendation. Keep it read-only."
- "Draft a Google Ads Search campaign with keyword ideas and ad copy. Show the plan for approval before creating anything."
- "Research example.com's Google ads in the US and compare its messaging with the Meta ads from the competitor's official Page. Cite examples and explain any coverage limits."
- "Analyze this competitor's active Facebook and Instagram ads in the UK. Compare offers and calls to action, with source links."

## How can I analyze competitors' ads?

Use [competitor-ad-research](skills/competitor-ad-research/SKILL.md) to find advertisers
in Google Ads Transparency Center and Meta Ad Library (Facebook and Instagram).
Compare public ad creatives, messaging, offers, calls to action and disclosed landing
pages. Results include source links, dates and coverage limits. Sign in to LoomaScale;
you do not need to connect your own ad account.

Public ad records do not reveal private campaign budgets, conversions or ROAS.
Available tools and historical coverage depend on the client's current connection
and the public library. The skill includes separate guides for
[Google Ads competitor research](skills/competitor-ad-research/references/google-ads.md)
and [Meta Ads competitor research](skills/competitor-ad-research/references/meta-ads.md).

In Codex, invoke `$competitor-ad-research` with the competitor and market, or ask
the research question directly. The plugin also includes
[integration workflows](skills/loomascale/SKILL.md) for your own accounts and
[cross-source insights](skills/cross-source-insights/SKILL.md) for performance analysis.

## Install

You need a [LoomaScale](https://loomascale.com) account. Public competitor ad research
does not require an ad-account connection. Connect the relevant ad account or data
source when you want to inspect or manage your own resources.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale@loomascale
codex mcp login loomascale
```

Grok Build: open `/plugin`, search for **LoomaScale**, and install.

### How do I connect Cursor to Google Ads, Meta Ads and TikTok Ads?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key is needed. Connect your ad accounts in
LoomaScale for account audits and campaign management; public competitor research
needs only LoomaScale sign-in.

```json
{
  "mcpServers": {
    "loomascale": {
      "url": "https://api.loomascale.com/mcp"
    }
  }
}
```

Manual MCP setup connects the hosted tools; a plugin installation also includes the
bundled workflow skills. See the [official Cursor MCP setup guide](https://cursor.com/docs/mcp).

For Claude Code, Codex and Grok Build, complete browser sign-in when the client prompts you.

## Skills

| Skill | What it covers |
|---|---|
| [`getting-started`](skills/getting-started/SKILL.md) | Turn business goals and daily challenges into a first insight, repeatable workflows, tailored prompts and relevant connection suggestions. |
| [`competitor-ad-research`](skills/competitor-ad-research/SKILL.md) | Analyze competitors' public Google Ads and Meta Ads creatives, messaging, offers, calls to action and disclosed landing pages, with source links and coverage limits. |
| `cross-source-insights` | Explain marketing performance using relevant connected Google Ads, Meta Ads (Facebook Ads and Instagram Ads), TikTok Ads, LinkedIn Ads, Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Search Console (GSC) and Google Merchant Center (GMC) evidence. |
| `loomascale` | Work with connected LoomaScale integrations for Google Ads, Meta Ads (Facebook Ads and Instagram Ads), TikTok Ads, LinkedIn Ads, Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Search Console (GSC) and Google Merchant Center (GMC). |

## Questions

### Can the model spend money without asking?

No. You approve budget changes, status changes, activations and campaign creation
before they run. LoomaScale checks daily budgets against the cap you set. New
Google Ads and Meta Ads campaigns start paused.

### Should I install this or a single-integration plugin?

Install `loomascale` if you work across ads and analytics: it covers every integration on one connection. The single-integration plugins ([Google Analytics 4](../loomascale-ga4), [Google Tag Manager](../loomascale-gtm), [Google Search Console](../loomascale-gsc), [Google Merchant Center](../loomascale-gmc)) expose only that product's tools, which keeps the model focused when you need nothing else.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp`: MCP server (Streamable HTTP)
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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Google, Meta, TikTok or
LinkedIn. [Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
