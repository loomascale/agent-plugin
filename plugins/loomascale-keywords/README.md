# Google Ads Keyword Planner MCP plugin by LoomaScale

`loomascale-keywords` is a Google Ads Keyword Planner MCP plugin for Cursor, Claude Code,
Codex and Grok Build. It uses Keyword Planner data from your own Google Ads account,
through LoomaScale, to find keyword ideas, check search volume and bid ranges, forecast a
Search campaign's cost and clicks, and match keywords to your ad groups. It is read-only.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/keywords` and
ships skills that tell the model how to use its tools.

For why an assistant needs Keyword Planner data instead of guessing volumes, read [Google Ads keyword research with ChatGPT](https://loomascale.com/blog/google-ads-keyword-research-with-chatgpt).

Choose the plugin’s first suggested prompt or use `$getting-started-keywords` to check your Google Ads connection and run a first keyword idea search. See the [Keyword Planner getting-started skill](skills/getting-started-keywords/SKILL.md).

## What it does

- Keyword ideas from seed keywords, a landing page or a whole website, with average monthly searches, competition and top-of-page bid ranges
- Search volume, monthly trend, competition and bid ranges for a keyword list you already have, up to 10,000 keywords per call
- Forecast cost, clicks, conversions and average CPC or CPA for a proposed Search campaign before you create it
- Which of your existing ad groups each keyword belongs in, with the match type to use
- Results narrowed by location, language and search network
- Read-only: creates no keyword plans, adds no keywords and changes nothing in your account

## Example prompts

- "Find keyword ideas for \"emergency plumber\" in Chicago with monthly search volume and bid ranges."
- "How seasonal are these keywords over the last four years: ski rental, snowboard lessons, lift tickets?"
- "Forecast cost and clicks next month for my keyword list with Maximize Clicks and a $20 daily budget."

## Install

You need a [LoomaScale](https://loomascale.com) account with Google Ads connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-keywords@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-keywords@loomascale
codex mcp login loomascale-keywords
```

### How do I connect Cursor to Google Ads Keyword Planner?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key or developer token is needed; connect Google
Ads in the LoomaScale dashboard to use your own account.

```json
{
  "mcpServers": {
    "loomascale-keywords": {
      "url": "https://api.loomascale.com/mcp/keywords"
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
| `loomascale-keywords` | Research Google Ads keywords with Keyword Planner data. |
| `getting-started-keywords` | Check the Google Ads connection and run a first keyword idea search. |

## Questions

### Does it need its own Google Ads API access?

No. LoomaScale calls Google's Keyword Planner service with your connected Google Ads
account. You need a Google Ads account, not a developer token.

### Can it add keywords or change my campaigns?

No. Every tool is a read. It creates no keyword plans, adds no keywords and changes no
campaigns, ad groups or bids. Make those changes in Google Ads or with the full plugin.

### How accurate are the forecasts?

They are Google's estimates for the keywords, locations, budget and dates you give, not a
guarantee. Search volumes are Google's rounded monthly averages.

### Do I need this if I already use the `loomascale` plugin?

No. The [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) includes the same Keyword Planner tools plus campaign management and the other integrations. Use `loomascale-keywords` when you only want keyword research.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/keywords`: MCP server (Streamable HTTP)
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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Google.
[Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
