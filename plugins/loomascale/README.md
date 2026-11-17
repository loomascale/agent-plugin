# Google Ads by LoomaScale

`loomascale` is an agent plugin that connects Claude Code, Codex and Grok Build to your Google Ads, Meta Ads, LinkedIn Ads, Google Analytics 4, Google Tag Manager, Google Search Console and Google Merchant Center accounts through one LoomaScale MCP server.

Audit and manage Google Ads with LoomaScale: campaigns, keywords, search terms, budgets and conversion tracking. Also supports Meta Ads and marketing data.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp` and
ships skills that tell the model how to use its tools safely.

## What it does

- Audit Google Ads campaigns, search terms and conversion tracking; find wasted spend and negative keywords
- Manage Google Ads Search, Shopping and Performance Max campaigns, ads, keywords, bids and budgets after approval
- Research Google Ads keyword ideas, search volume, competition and bid estimates
- Research competitors' public Google Ads and Meta Ads creatives, offers and disclosed destinations with [competitor-ad-research](skills/competitor-ad-research/SKILL.md)
- Meta Ads audits, creative performance and campaign management for Facebook Ads and Instagram Ads
- Meta Pixel (Facebook Pixel) event activity, Event Match Quality and Conversions API diagnostics (read-only)
- LinkedIn Ads performance and demographics reporting
- Google Analytics 4 (GA4) traffic, conversion and funnel analysis
- Google Search Console (GSC) search analytics, URL indexing inspection, and sitemap and property management on request
- Google Merchant Center (GMC) product issues and performance reporting
- Google Tag Manager (GTM) tracking audits
- Cross-source performance analysis, attribution diagnostics and budget recommendations

## Example prompts

- "Audit my Google Ads for wasted spend, search terms and conversion tracking issues. Rank fixes without making changes."
- "Find negative keyword opportunities in my Google Ads search terms. Explain each recommendation. Keep it read-only."
- "Draft a Google Ads Search campaign with keyword ideas and ad copy. Show the plan for approval before creating anything."
- "Research example.com's Google ads in the US and compare its messaging with the Meta ads from the competitor's official Page. Cite examples and explain any coverage limits."

## Competitor ad research skill

[Competitor ad research](skills/competitor-ad-research/SKILL.md) finds public Google
Ads and Meta Ads (Facebook and Instagram) advertisers, reads selected ad creatives
and compares messaging, offers, calls to action and disclosed landing pages.
It reports source dates and coverage, rather than estimating private campaign
budgets, conversions or ROAS. Public research needs LoomaScale sign-in, without
connecting your own Google Ads or Meta Ads account. Available tools depend on the
client's current connection.

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

On first use, the client opens LoomaScale sign-in in your browser. Approve access there.
No API key is needed.

## Skills

| Skill | What it covers |
|---|---|
| `cross-source-insights` | Explain marketing performance using relevant connected Google Ads, Meta Ads (Facebook Ads and Instagram Ads), LinkedIn Ads, Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Search Console (GSC) and Google Merchant Center (GMC) evidence. |
| `loomascale` | Work with connected LoomaScale integrations for Google Ads, Meta Ads (Facebook Ads and Instagram Ads), LinkedIn Ads, Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Search Console (GSC) and Google Merchant Center (GMC). |

## Questions

### Can the model spend money without asking?

No. Every budget change, status change, activation and campaign creation is shown to you first and runs only after you confirm it. The server then checks it against the daily spend cap you set in LoomaScale. New campaigns are created paused.

### Should I install this or a single-integration plugin?

Install `loomascale` if you work across ads and analytics: it covers every integration on one connection. The single-integration plugins ([GA4](../loomascale-ga4), [GTM](../loomascale-gtm), [Search Console](../loomascale-gsc), [Merchant Center](../loomascale-gmc)) expose only that product's tools, which keeps the model focused when you need nothing else.

## Authentication and network

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp`: MCP server (Streamable HTTP)
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
