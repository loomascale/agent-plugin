# LoomaScale MCP plugins for Cursor: Google Ads and Meta Ads

LoomaScale's Model Context Protocol (MCP) plugins connect Cursor, Claude Code, Codex,
Gemini CLI and Grok Build to advertising and marketing data. Use the main plugin for Google Ads
and Meta Ads audits, approved campaign changes and public competitor ad research,
or choose a focused plugin for Meta Ads, TikTok Ads or YouTube ads alone, analytics, tracking, organic search, product feeds or local business listings.

The hosted service supports Google Ads, Meta Ads (Facebook and Instagram), TikTok Ads, LinkedIn Ads,
Google Analytics 4, Google Tag Manager, Google Search Console and Google Merchant Center.
Google Business Profile is in early access (preview), so the connection may not be offered to every account yet.
Competitor research uses Google Ads Transparency Center and Meta Ad Library. Every
change is shown to you first and runs only after you approve it. Ad budgets are also
checked against a daily spend cap you set.

## Which LoomaScale MCP plugin should I install?

Install `loomascale` for Google Ads, Meta Ads and the other supported integrations
through one MCP connection. Choose a focused plugin when you only need Meta Ads, Meta Pixel and Conversions API checks, TikTok Ads, TikTok Pixel and Events API checks, LinkedIn Ads, YouTube ads, Google Ads
keyword research, competitor ad research, Google Analytics 4, Google Tag Manager, Google Search Console, SEO across Search Console and GA4, Google Merchant Center, or Google Business Profile.
The table links to each plugin's setup and examples.

| Plugin | MCP endpoint | Use it for |
|---|---|---|
| [Google Ads and Meta Ads MCP (`loomascale`)](plugins/loomascale) | `https://api.loomascale.com/mcp` | Google Ads and Meta Ads audits, campaign management and public competitor ad analysis; TikTok Ads reporting and budget changes; LinkedIn Ads, GA4, GTM, GSC, GMC and Google Business Profile analysis |
| [Meta Ads MCP (`loomascale-meta`)](plugins/loomascale-meta) | `https://api.loomascale.com/mcp/meta` | Facebook and Instagram ad audits, delivery and Meta Pixel diagnosis, Meta Ad Library research, approved campaign changes |
| [Meta Pixel MCP (`loomascale-metapixel`)](plugins/loomascale-metapixel) | `https://api.loomascale.com/mcp/metapixel` | Read-only Meta Pixel and Conversions API checks: event counts by browser and server, Event Match Quality and Meta's suggested fixes |
| [TikTok Ads MCP (`loomascale-tiktok`)](plugins/loomascale-tiktok) | `https://api.loomascale.com/mcp/tiktok` | TikTok Ads audits, video creative and audience analysis, delivery and ad review diagnosis, previewed changes and paused Smart+ campaigns |
| [TikTok Pixel MCP (`loomascale-tiktokpixel`)](plugins/loomascale-tiktokpixel) | `https://api.loomascale.com/mcp/tiktokpixel` | Read-only TikTok Pixel and Events API checks: event counts by browser and server, attributed events and TikTok's tracking diagnostics |
| [LinkedIn Ads MCP (`loomascale-linkedin`)](plugins/loomascale-linkedin) | `https://api.loomascale.com/mcp/linkedin` | LinkedIn Ads reports, leads by job title, seniority and industry, waste audits and previewed campaign changes |
| [Google Ads Keyword Planner MCP (`loomascale-keywords`)](plugins/loomascale-keywords) | `https://api.loomascale.com/mcp/keywords` | Read-only Google Ads keyword research: keyword ideas, search volume, bid ranges, campaign forecasts and ad group fit |
| [Google and Meta Ad Library MCP (`loomascale-adlibrary`)](plugins/loomascale-adlibrary) | `https://api.loomascale.com/mcp/adlibrary` | Read-only competitor ad research in the Google Ads Transparency Center and Meta Ad Library; no ad account needed |
| [YouTube Ads MCP (`loomascale-youtube`)](plugins/loomascale-youtube) | `https://api.loomascale.com/mcp/youtube` | YouTube ad reports by in-stream, in-feed and Shorts, video watch rates, wasted spend, paused Demand Gen launches and approved changes |
| [Google Analytics 4 MCP (`loomascale-ga4`)](plugins/loomascale-ga4) | `https://api.loomascale.com/mcp/ga4` | Google Analytics 4 traffic, conversion and funnel reports; key events and stream settings after a dry run |
| [Google Tag Manager MCP (`loomascale-gtm`)](plugins/loomascale-gtm) | `https://api.loomascale.com/mcp/gtm` | Google Tag Manager tracking audits, draft workspace fixes, publish only a version you confirm |
| [Google Search Console MCP (`loomascale-gsc`)](plugins/loomascale-gsc) | `https://api.loomascale.com/mcp/gsc` | Google Search Console clicks, keyword opportunities, indexing and sitemaps |
| [SEO MCP (`loomascale-seo`)](plugins/loomascale-seo) | `https://api.loomascale.com/mcp/seo` | SEO from your own Search Console and GA4 data: queries near page one, traffic drops, indexing and organic conversions |
| [Google Merchant Center MCP (`loomascale-gmc`)](plugins/loomascale-gmc) | `https://api.loomascale.com/mcp/gmc` | Google Merchant Center disapprovals, feed errors and product updates |
| [Google Business Profile MCP (`loomascale-gbp`)](plugins/loomascale-gbp) | `https://api.loomascale.com/mcp/gbp` | Early access: Google Business Profile local SEO performance, Google reviews with approved replies, and business listing updates |


## How do I get started with LoomaScale?

Start with the full plugin’s [getting-started skill](plugins/loomascale/skills/getting-started/SKILL.md).
It checks your connections and plan access, then shows one connected account’s
last seven days beside the previous seven when weekly data is available. Choose
a follow-up such as finding costly search terms, comparing ads with website
conversions, or researching competitors’ ads. If you’re new, connect a source
directly from the menu.

In Codex, use `$getting-started`. In Claude Code, Cursor or Grok Build, ask: "Help me get
started with LoomaScale for my business." See the
[getting-started guide](plugins/loomascale/README.md#how-do-i-get-started-with-loomascale)
for what to expect.

Each focused plugin’s first suggested prompt opens its own getting-started skill.
Meta Ads and TikTok Ads show weekly spend and results. Google Analytics 4 and
Search Console compare traffic across two weeks. Merchant Center shows current
product eligibility, and Tag Manager shows the published tracking setup. Business
Profile compares local visibility and customer actions and lists reviews without a reply.

## How can I analyze competitors' ads?

Install `loomascale` and use its
[competitor-ad-research skill](plugins/loomascale/skills/competitor-ad-research/SKILL.md)
to compare competitors' Google Ads and Meta Ads creatives, messaging, offers and disclosed
landing pages. Results include public ad-library links, dates and coverage limits.
LoomaScale sign-in is required; connecting your own ad account is unnecessary.
Public records do not reveal private budgets, conversions or ROAS.

Example: "Research example.com's Google ads in the US and compare its messaging with
the Meta ads from the competitor's official Page. Cite examples and explain any coverage limits."

See the [Google Ads and Meta Ads MCP guide](plugins/loomascale/README.md) for setup and more examples.

## Install

You need a [LoomaScale](https://loomascale.com) account. Public competitor ad research
does not require an ad-account connection. Connect the matching integration to inspect
or manage your own accounts. The 7-day free trial and the Free plan that
follows it both cover all plugins. The Free plan is read-only, with
1 advertising account and 1 property (GA4, Search Console, Merchant Center or Tag Manager)
per 30 days, and does not include competitor ad research.

### Claude Code

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale@loomascale
```

Then run `/mcp`, pick the server, and finish sign-in in the browser. Guides:
[Connect Claude Code to Google Ads](https://loomascale.com/connect-claude-code-to-google-ads),
[Connect Claude Code to Meta Ads](https://loomascale.com/connect-claude-code-to-meta-ads).

### Codex

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale@loomascale
codex mcp login loomascale
```

Guides: [Connect Codex to Google Ads](https://loomascale.com/connect-codex-to-google-ads),
[Connect Codex to Meta Ads](https://loomascale.com/connect-codex-to-meta-ads).

### How do I connect Cursor to Google Ads and Meta Ads?

Create or merge the following configuration in `.cursor/mcp.json` in your project.
For access across projects, use `~/.cursor/mcp.json` instead. Complete LoomaScale
sign-in in your browser when Cursor prompts you, then ask for a read-only account audit.
No API key is needed.

```json
{
  "mcpServers": {
    "loomascale": {
      "url": "https://api.loomascale.com/mcp"
    }
  }
}
```

For a focused connection, use its plugin ID and endpoint from the table above.
Manual MCP setup connects the hosted tools; a plugin installation also includes the
bundled workflow skills. See the [official Cursor MCP setup guide](https://cursor.com/docs/mcp).

### How do I connect Gemini CLI to Google Ads and Meta Ads?

Install the main `loomascale` plugin as a Gemini CLI extension. The extension adds the
hosted MCP server and the bundled workflow skills.

```text
gemini extensions install https://github.com/loomascale/agent-plugin
```

Restart Gemini CLI and run `/mcp auth loomascale`. Then finish LoomaScale sign-in in the
browser and ask for a read-only account audit. No API key is needed. Run
`gemini extensions update loomascale` to get new versions. Gemini CLI supports only the
main plugin, because it reads `gemini-extension.json` from the repository root. See the
[official Gemini CLI extensions guide](https://geminicli.com/docs/extensions/).

### Grok Build

Open `/plugin`, search for **LoomaScale**, and install.

### ChatGPT and Claude on the web

Use the published LoomaScale app instead:
[Connect ChatGPT to Google Ads](https://loomascale.com/connect-chatgpt-to-google-ads),
[Connect Claude to Google Ads](https://loomascale.com/connect-claude-to-google-ads).

## How does LoomaScale authentication work?

The plugins hold no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration. Your client finds the authorization server from the first `401`, registers
itself, opens the browser for consent and stores the token. You don't paste an API key
anywhere. Google, Meta, TikTok and LinkedIn are connected in the LoomaScale dashboard.

## Repository layout

```text
.claude-plugin/marketplace.json   Claude Code and Codex marketplace listing all plugins
.cursor-plugin/marketplace.json   Cursor marketplace listing all plugins
gemini-extension.json             Gemini CLI extension (main plugin only)
skills -> plugins/loomascale/skills  Skills for the Gemini CLI extension
scripts/validate-template.mjs     Cursor manifest and repository validator
scripts/validate-template.test.mjs Validation regression tests
scripts/schemas/                 Pinned official Cursor JSON schemas
plugins/<name>/
  .claude-plugin/plugin.json      Claude Code manifest
  .grok-plugin/plugin.json        Grok Build manifest
  .codex-plugin/plugin.json       Codex manifest
  .cursor-plugin/plugin.json      Cursor manifest
  .mcp.json                       MCP server (Claude Code, Grok Build)
  mcp.json                        MCP server (Codex, Cursor)
  skills/                         Agent Skills
  assets/                         logo
  README.md
```

Each plugin folder stands on its own, because clients install only that folder.

### How do I validate the Cursor publishing files?

From the repository root, install the validation dependencies and run both checks:

```sh
npm ci
npm run validate
npm test
```

The validator uses pinned copies of the [official Cursor JSON schemas](https://github.com/cursor/plugins/tree/main/schemas)
in `scripts/schemas/` and checks the plugin paths and bundled files. Validation runs
offline after dependencies are installed. You can also invoke it directly with
`node scripts/validate-template.mjs`.

## Questions

### Can the model spend money without asking?

No. Every budget change, status change, activation and campaign creation is shown to you
first. It runs only after you confirm it, and the server then checks it against your
daily spend cap. New campaigns are created paused.

### Do I need a Google Ads developer token or Meta app?

No. Sign in to LoomaScale once in the browser. LoomaScale holds the platform connections.

### Does it work with a Google Ads manager (MCC) account?

Yes. Connect a manager (MCC) account, then choose a client account your Google login can access and that is enabled in LoomaScale. Reports and changes target that client account.

## Who builds this

[LoomaScale](https://loomascale.com) is an AI operator for Google Ads and Meta Ads, built
by Andrii Pasika. [Privacy](https://loomascale.com/privacy),
[terms](https://loomascale.com/terms), [contact](https://loomascale.com/contact).
LoomaScale is an independent product, not affiliated with or endorsed by Google, Meta or
LinkedIn.

## Self-hosting

The open-source Google Ads and Meta Ads tools run against your own accounts:
[loomascale/ads-mcp](https://github.com/loomascale/ads-mcp).

## License

MIT. See [LICENSE](LICENSE).
