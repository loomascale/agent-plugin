# LoomaScale agent plugins for Google Ads, Meta Ads and marketing data

LoomaScale plugins connect Claude Code, Codex and Grok Build to your Google Ads,
Meta Ads, LinkedIn Ads, Google Analytics 4, Google Tag Manager, Google Search Console
and Google Merchant Center accounts through one hosted MCP server. Every change is shown
to you first and runs only after you approve it. Ad budgets are also checked against a
daily spend cap you set.

## Plugins

| Plugin | MCP endpoint | Use it for |
|---|---|---|
| [`loomascale`](plugins/loomascale) | `https://api.loomascale.com/mcp` | Everything: Google Ads and Meta Ads audits and campaign management, LinkedIn Ads, GA4, GTM, GSC and GMC analysis |
| [`loomascale-ga4`](plugins/loomascale-ga4) | `https://api.loomascale.com/mcp/ga4` | Google Analytics 4 traffic, conversion and funnel reports; key events and stream settings after a dry run |
| [`loomascale-gtm`](plugins/loomascale-gtm) | `https://api.loomascale.com/mcp/gtm` | Google Tag Manager tracking audits, draft workspace fixes, publish only a version you confirm |
| [`loomascale-gsc`](plugins/loomascale-gsc) | `https://api.loomascale.com/mcp/gsc` | Google Search Console clicks, keyword opportunities, indexing and sitemaps |
| [`loomascale-gmc`](plugins/loomascale-gmc) | `https://api.loomascale.com/mcp/gmc` | Google Merchant Center disapprovals, feed errors and product updates |

Install `loomascale` if you want everything in one place. Install a single-integration
plugin if you only work with that one product.

## Install

You need a [LoomaScale](https://loomascale.com) account with the matching integration
connected. The free trial covers all plugins.

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

### Grok Build

Open `/plugin`, search for **LoomaScale**, and install.

### ChatGPT and Claude on the web

Use the published LoomaScale app instead:
[Connect ChatGPT to Google Ads](https://loomascale.com/connect-chatgpt-to-google-ads),
[Connect Claude to Google Ads](https://loomascale.com/connect-claude-to-google-ads).

## Authentication

The plugins hold no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration. Your client finds the authorization server from the first `401`, registers
itself, opens the browser for consent and stores the token. You don't paste an API key
anywhere. Google, Meta and LinkedIn are connected in the LoomaScale dashboard.

## Repository layout

```text
.claude-plugin/marketplace.json   Claude Code and Codex marketplace listing all plugins
plugins/<name>/
  .claude-plugin/plugin.json      Claude Code manifest
  .grok-plugin/plugin.json        Grok Build manifest
  .codex-plugin/plugin.json       Codex manifest
  .mcp.json                       MCP server (Claude Code, Grok Build)
  mcp.json                        MCP server (Codex)
  skills/                         Agent Skills
  assets/                         logo
  README.md
```

Each plugin folder stands on its own, because clients install only that folder.

## Questions

### Can the model spend money without asking?

No. Every budget change, status change, activation and campaign creation is shown to you
first. It runs only after you confirm it, and the server then checks it against your
daily spend cap. New campaigns are created paused.

### Do I need a Google Ads developer token or Meta app?

No. Sign in to LoomaScale once in the browser. LoomaScale holds the platform connections.

### Does it work with a Google Ads manager (MCC) account?

Yes. The connection reaches every client account under the manager account you pick.

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
