# Google Tag Manager (GTM) MCP plugin by LoomaScale

`loomascale-gtm` is a Google Tag Manager (GTM) MCP plugin for Cursor, Claude Code,
Codex and Grok Build. It connects to your GTM containers through LoomaScale to audit
conversion tracking, review GA4 and Google Ads tags, and draft workspace fixes.
Publishing runs only for the exact container version you confirm.
It also includes the Google Ads, Meta Ads, TikTok Ads and LinkedIn Ads tools and the
other Google sources, with Tag Manager offered first when you connect.

The plugin connects your AI assistant to the LoomaScale MCP server at `https://api.loomascale.com/mcp/gtm` and
ships skills that tell the model how to use its tools safely.

Choose the plugin’s first suggested prompt or use `$getting-started-gtm` to see the published version, tags and triggers in your container. See the [Google Tag Manager getting-started skill](skills/getting-started-gtm/SKILL.md).

## What it does

- Audit Google Tag Manager conversion tracking in the published container or a named draft workspace
- Find paused tags, missing firing triggers and possible duplicate GA4 configuration or Google tags
- Review marketing-tag consent settings, legacy Universal Analytics tags and unused triggers or variables
- Cross-check website conversion tags against Google Ads conversion actions when that account is connected
- Inspect tags, triggers, variables, workspaces, unpublished changes and container version history
- Create and edit GA4 event, Google tag and Google Ads conversion tags in a workspace you choose
- Create, update and delete supported draft entities; enable built-in variables and sync a workspace
- Save a workspace as a named container version without publishing
- Preview the difference from the live version, then publish only the exact version you confirm

## Example prompts

- "Audit my Google Tag Manager conversion tracking for paused tags, missing triggers and possible duplicate Google tags."
- "Create a GA4 generate_lead event tag in my GTM Default Workspace. Ask me which trigger to use. Do not publish."
- "Show unpublished changes in my GTM workspace and compare a saved version with the live container. Do not publish."

## Install

You need a [LoomaScale](https://loomascale.com) account with Google Tag Manager connected.

Claude Code:

```text
/plugin marketplace add loomascale/agent-plugin
/plugin install loomascale-gtm@loomascale
```

Codex CLI:

```text
codex plugin marketplace add loomascale/agent-plugin
codex plugin add loomascale-gtm@loomascale
codex mcp login loomascale-gtm
```

### How do I connect Cursor to Google Tag Manager?

Create or merge this configuration in your project's `.cursor/mcp.json`, or use
`~/.cursor/mcp.json` for access across projects. Complete LoomaScale sign-in in your
browser when Cursor prompts you. No API key is needed; connect Google Tag Manager in
the LoomaScale dashboard to access your own containers.

```json
{
  "mcpServers": {
    "loomascale-gtm": {
      "url": "https://api.loomascale.com/mcp/gtm"
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
| `loomascale-gtm` | Audit the user's connected Google Tag Manager (GTM) conversion tracking with LoomaScale. |

## Questions

### Can it publish to my live container without asking?

No. Edits go into a workspace you choose. Publishing shows the difference from the live version and runs only for the exact version you confirm.

### Do I need this if I already use the `loomascale` plugin?

No. `loomascale-gtm` carries nearly the same tools as the [all-in-one Google Ads and Meta Ads MCP plugin](../loomascale): Tag Manager plus Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads, GA4 and the other Google sources. The difference is setup: Tag Manager is the first source it offers to connect. Install one or the other, not both.

## How does authentication work?

The plugin holds no credentials. The server uses OAuth 2.1 with PKCE and dynamic client
registration: the client finds the authorization server from the first `401`, registers
itself, opens the browser for consent, and stores the token.

Network endpoints:

- `https://api.loomascale.com/mcp/gtm`: MCP server (Streamable HTTP)
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
