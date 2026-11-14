---
name: loomascale-gtm
description: Audit the user's connected Google Tag Manager (GTM) conversion tracking with LoomaScale. Use for GA4 and Google Ads tag setup, paused tags, missing triggers, possible duplicate Google tags, data layer variables, workspace drafts, container versions and confirmed publishing. Checks configuration, not live website firing. Do not invoke for general Tag Manager definitions, analytics traffic reports, installing the container snippet or changing ad campaigns.
---

# Google Tag Manager: conversion tracking audits and drafts with LoomaScale

Use the user's connected Google Tag Manager (GTM) containers to answer conversion
tracking questions with configuration evidence: GA4 and Google Ads tags, paused
tags, missing triggers and possible duplicate Google tags. Draft fixes only when
the user asks. Configuration findings do not establish live website firing.
This package connects to `https://api.loomascale.com/mcp/gtm`. It reads
containers, edits a draft workspace the user names, saves versions, and
publishes only a version the user confirms. It cannot install the container
snippet on a website, resolve merge conflicts, change GA4 or ad accounts, or
delete containers.

## Resolve the container

Reuse a container already verified in the conversation. Otherwise call
`gtm_list_containers`. Pass `container` as the listed public `GTM-…` ID, name or
API path; it can be omitted when exactly one container is reachable. If several
fit and the task does not identify one, ask which to use. Never substitute a GA4
measurement ID (`G-…`) or a Google Ads customer ID.

Inspect available tool descriptions and input schemas. Names here are the
server's tool names; a client may add a namespace.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| Which accounts and containers can I access? | `gtm_list_containers`, `gtm_get_container` |
| Is conversion tracking set up correctly? | `gtm_audit_tracking` |
| Which tags exist and what firing triggers are configured? | `gtm_list_tags` |
| Which triggers and variables exist? | `gtm_list_triggers_variables` |
| Which workspaces exist, and what is waiting unpublished? | `gtm_list_workspaces`, `gtm_get_workspace_status` |
| Which version is live, and what came before? | `gtm_list_versions` |

Read [Tag Manager tools](references/tag-manager.md) for audit findings, the
draft → version → publish sequence, permissions and refusals.

## Change a container only on the user's word

Keep audits read-only. Never edit as a side effect of an analysis.

- Every edit needs `workspace`: an existing workspace the user chose. Call
  `gtm_list_workspaces` and ask; create one with `gtm_create_workspace` only when
  the user asks for a new one by name.
- Draft edits (`gtm_create_*`, `gtm_update_*`, `gtm_delete_entity`,
  `gtm_enable_built_in_variables`) are NOT live. Say so after each one.
- When the workspace is behind the live version, run `gtm_sync_workspace`.
  Merge conflicts it reports are resolved by the user in Tag Manager.
- `gtm_create_version` saves the workspace as a named version; nothing goes live.
- `gtm_publish_version` with `confirm:false` shows what would replace the live
  version. Call it with `confirm:true` only after the user explicitly confirms
  that version id. Report `liveVersionIdAfter` and `verified` from the answer and
  keep the previous live id: a rollback is publishing it again.

## Handle access and helper tools accurately

- If authorization is missing, expired or lacks a permission, use the link the
  tool returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections)
  and ask the user to reconnect Google Tag Manager with every box ticked. A
  "role denied" refusal is the login's container permission in Tag Manager.
- For a usage-limit refusal, call `loomascale_check_quota` once and explain the
  allowance or reset it reports. A usage allowance is not an ad budget.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it
  only when the user asks to send a feature request.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which
  are connected, and which this plugin has tools for. Use it when the user asks
  about other platforms or connecting another service. It is free and connects
  nothing: give the user the link it returns, and say plainly when a source
  needs the full LoomaScale plugin.

## Return a result the user can assess

Name the container, workspace and version involved. Quote audit confidence when
it is not confirmed. Separate what is live from what is drafted. Claim a change
only after the tool reports success, and never claim to have verified live tag
firing on the website; recommend Tag Manager Preview for that.
