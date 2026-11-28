# TikTok Pixel MCP plugin by LoomaScale

`loomascale-tiktokpixel` is a TikTok Pixel and Events API MCP plugin for Cursor, Claude
Code, Codex and Grok Build. It reads the pixels of your connected TikTok ad accounts
through LoomaScale. Use it to check whether your pixel receives events, compare browser
and server (Events API) events, read TikTok's tracking diagnostics, and see which ad
groups depend on each event. It is read-only.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/tiktokpixel` and
ships skills that tell the model how to use its tools.

Choose the plugin's first suggested prompt or use `$getting-started-tiktokpixel` to see whether your pixel and Events API are receiving events. See the [TikTok Pixel getting-started skill](skills/getting-started-tiktokpixel/SKILL.md).

## What it does

- Lists the pixels of your TikTok ad account, how each was set up and the events each defines
- Counts each event received over up to 30 days, split into browser (pixel) and server (Events API) events, with how many TikTok attributed to ads
- Reports TikTok's own EVENT_TRACK diagnostics for your ad groups, such as a pixel with no activity in 7 days
- Shows which ad groups track with each pixel and which event they optimize for, and which pixel an ad tracks with
- Compares reported conversions and cost per conversion with the events the pixel received
- Read-only: installs nothing, sends no events and changes nothing in TikTok

## Example prompts

- "Is my TikTok pixel still receiving events, and which ones did it get this week?"
- "Is my TikTok pixel getting events from the Events API, or only from the browser?"
- "My TikTok conversions dropped yesterday. Is it tracking or the ads?"

## Install

You need a [LoomaScale](https://loomascale.com) account with TikTok Ads connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-tiktokpixel@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-tiktokpixel@loomascale
codex mcp login loomascale-tiktokpixel
```

### How do I connect Cursor to my TikTok Pixel?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key, access token or TikTok developer app is
needed; connect TikTok Ads in the LoomaScale dashboard to access your own ad accounts.

```json
{
  "mcpServers": {
    "loomascale-tiktokpixel": {
      "url": "https://api.loomascale.com/mcp/tiktokpixel"
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
| `loomascale-tiktokpixel` | Check the TikTok Pixel and Events API of the user's TikTok ad accounts with LoomaScale. |
| `getting-started-tiktokpixel` | Check the TikTok Ads connection and whether the pixel and Events API receive events. |

## Questions

### What is the difference between the TikTok Pixel and the Events API?

The TikTok Pixel sends events from the visitor's browser; the Events API sends them from
your server. TikTok records both under one pixel and deduplicates events that share an
event ID. The plugin counts each source separately. See TikTok's
[Events API help article](https://ads.tiktok.com/resources/help/article/events-api).

### Why do pixel events and reported conversions differ?

Pixel events count everything the site sent. Conversions in TikTok reports are only the
events TikTok attributed to an ad under your attribution settings. The plugin shows both,
so you can tell a tracking drop from a delivery drop.

### Can it fix or install my pixel?

No. It is read-only. Pixel code, Events API integrations and tags are changed on your
website, e-commerce platform or tag manager, and pixel settings in TikTok Events Manager.
The assistant tells you what to change and where.

### Do I need this if I already use the `loomascale-tiktok` or `loomascale` plugin?

No. The [TikTok Ads plugin](../loomascale-tiktok) and the [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale) include the same pixel checks plus campaign management. Use `loomascale-tiktokpixel` when you only check tracking, or want an assistant that cannot change campaigns.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/tiktokpixel`: MCP server (Streamable HTTP)
- `https://api.loomascale.com/oauth/authorize`, `/oauth/token`, `/oauth/register`: OAuth 2.1 and dynamic client registration
- `https://api.loomascale.com/.well-known/oauth-authorization-server` and `/.well-known/oauth-protected-resource`: discovery metadata
- `https://loomascale.com/oauth-consent`: sign-in and consent screen

Your TikTok Ads connection lives in the LoomaScale dashboard, not in this plugin.

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
[LoomaScale](https://loomascale.com). LoomaScale is an independent product, not affiliated with or endorsed by TikTok.
[Privacy](https://loomascale.com/privacy), [terms](https://loomascale.com/terms),
[contact](https://loomascale.com/contact). MIT licensed.
