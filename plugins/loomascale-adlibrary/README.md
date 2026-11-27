# Google and Meta Ad Library MCP plugin by LoomaScale

`loomascale-adlibrary` is a competitor ad research MCP plugin for Cursor, Claude Code,
Codex and Grok Build. It reads the public Google Ads Transparency Center and Meta Ad
Library (formerly the Facebook Ad Library) through LoomaScale. Use it to find a competitor's advertiser or Facebook Page and
list the ads they run by country and date. You can read their headlines, text, images and
calls to action, and see the reach Meta discloses for ads delivered in the EU and UK. You
do not need an ad account, and the plugin is read-only.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/adlibrary` and
ships skills that tell the model how to use its tools.

Choose the plugin's first suggested prompt or use `$getting-started-adlibrary` to look up one competitor's Google and Meta ads. See the [Ad Library getting-started skill](skills/getting-started-adlibrary/SKILL.md).

## What it does

- Finds a competitor's Google Ads advertiser or Facebook Page by brand, company or Page name
- Lists the Google ads associated with a competitor website or advertiser for a country and date range, with format and first and last shown dates
- Lists a competitor's Facebook and Instagram ads in one country, with text, headline, call to action, links, carousel cards, images and videos
- Reads the headlines, descriptions, images and videos of the Google creatives you pick
- Reads the payer, selected audience and accounts reached that Meta publishes for ads delivered in the EU and UK
- Read-only public data: no budgets, spend, bids, targeting interests or conversions

## Example prompts

- "Show me the Google ads that run for allbirds.com in the United States over the last 30 days."
- "What ads is Gymshark running on Facebook and Instagram in the UK right now?"
- "Compare the offers and calls to action in the Meta ads of my two main competitors in Germany."

## Install

You need a [LoomaScale](https://loomascale.com) account on a trial or a paid plan; the
Free plan does not include competitor ad research ([plans](https://loomascale.com/pricing)).
No ad account needs to be connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-adlibrary@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-adlibrary@loomascale
codex mcp login loomascale-adlibrary
```

### How do I connect Cursor to the Google and Meta ad libraries?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key, Meta app or developer token is needed.

```json
{
  "mcpServers": {
    "loomascale-adlibrary": {
      "url": "https://api.loomascale.com/mcp/adlibrary"
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
| `loomascale-adlibrary` | Research competitors' public Google and Meta ads and compare their messaging, offers and formats. |
| `getting-started-adlibrary` | Check access and look up one competitor's Google and Meta ads. |

## Questions

### Do I need a Google Ads or Meta Ads account?

No. The tools read public ad libraries, not your accounts. You sign in to LoomaScale and
allow access; nothing else is connected. Each lookup counts as one task against your
LoomaScale allowance, and it never counts toward the ad-account allowance.

### Where does the data come from?

From Google's public [Ads Transparency Center](https://adstransparency.google.com/) and
Meta's public [Ad Library](https://www.facebook.com/ads/library/), retrieved through a
search data provider. The tools show what those libraries publish for a country and date
range; coverage and retention follow Google's and Meta's own rules.

### Can it show a competitor's spend or best-performing ads?

No. Public ad libraries do not reveal budgets, spend, bids, targeting interests or
conversions, and how long an ad has run does not prove it is profitable. For ads delivered
in the EU and UK, Meta publishes reach and the selected audience. An empty result does not
prove a competitor is not advertising.

### Can it change my campaigns?

No. Every tool is a read. To compare competitors with your own results or change your
campaigns, use the full plugin.

### Do I need this if I already use the `loomascale` plugin?

No. The [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) includes the same ad library tools plus your own accounts and the other integrations. Use `loomascale-adlibrary` when you only want competitor ad research.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token. The consent screen asks you
to sign in and allow access; it does not ask you to connect an ad account.

Network endpoints:

- `https://api.loomascale.com/mcp/adlibrary`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Google or Meta.
[Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
