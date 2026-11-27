# Meta Pixel MCP plugin by LoomaScale

`loomascale-metapixel` is a Meta Pixel and Conversions API MCP plugin for Cursor, Claude
Code, Codex and Grok Build. It reads the pixels (datasets) of your connected Meta ad
accounts through LoomaScale. Use it to check whether your pixel fires, compare browser and
server events, find out why Event Match Quality is low, and see which ad sets depend on
each event. It is read-only.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/metapixel` and
ships skills that tell the model how to use its tools.

Choose the plugin's first suggested prompt or use `$getting-started-metapixel` to see whether your pixel and Conversions API are receiving events. See the [Meta Pixel getting-started skill](skills/getting-started-metapixel/SKILL.md).

## What it does

- Lists the pixels (datasets) your ad account can use, when each last received an event, and your custom conversions
- Counts PageView, Lead, Purchase and other events over the last seven days, split into browser (pixel) and server (Conversions API) events
- Reads Event Match Quality per web event, match key coverage, CAPI coverage, deduplication and upload delay
- Reports Meta's own dataset diagnostics with affected event counts and suggested fixes
- Shows which ad sets optimize for each pixel event, which website audiences use it, and how reported conversions changed
- Read-only: installs nothing, sends no events and changes nothing in Meta

## Example prompts

- "Is my Meta Pixel still firing, and which events did it get this week?"
- "Why is my Event Match Quality low, and is my Conversions API set up correctly?"
- "My Meta conversions dropped yesterday. Is it tracking or the ads?"

## Install

You need a [LoomaScale](https://loomascale.com) account with Meta Ads connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-metapixel@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-metapixel@loomascale
codex mcp login loomascale-metapixel
```

### How do I connect Cursor to my Meta Pixel?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key, access token or Meta app is needed; connect
Meta Ads in the LoomaScale dashboard to access your own ad accounts.

```json
{
  "mcpServers": {
    "loomascale-metapixel": {
      "url": "https://api.loomascale.com/mcp/metapixel"
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
| `loomascale-metapixel` | Check the Meta Pixel and Conversions API of the user's Meta ad accounts with LoomaScale. |
| `getting-started-metapixel` | Check the Meta Ads connection and whether the pixel and Conversions API receive events. |

## Questions

### What is the difference between the Meta Pixel and the Conversions API?

The Meta Pixel sends events from the visitor's browser; the Conversions API (CAPI) sends
them from your server. Meta stores both in one dataset and deduplicates events that share
an event ID. The plugin counts each source separately. See Meta's
[Conversions API documentation](https://developers.facebook.com/docs/marketing-api/conversions-api).

### What is Event Match Quality?

Event Match Quality (EMQ) is Meta's 0 to 10 score for how well the customer details sent
with an event match Meta accounts. The plugin shows the score for each web event, which
match keys are missing and Meta's suggested fixes. See Meta's
[Event Match Quality help page](https://www.facebook.com/business/help/765081237991954).

### Can it fix or install my pixel?

No. It is read-only. Pixel code, CAPI integrations and tags are changed on your website,
e-commerce platform or tag manager, and dataset settings in Meta Events Manager. The
assistant tells you what to change and where.

### Do I need this if I already use the `loomascale-meta` or `loomascale` plugin?

No. The [Meta Ads plugin](../loomascale-meta) and the [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) include the same pixel checks plus campaign management. Use `loomascale-metapixel` when you only check tracking, or want an assistant that cannot change campaigns.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/metapixel`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

Your Meta Ads connection lives in the LoomaScale dashboard, not in this plugin.

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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by Meta.
[Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
