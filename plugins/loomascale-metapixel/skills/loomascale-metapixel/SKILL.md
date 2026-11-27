---
name: loomascale-metapixel
description: Check the Meta Pixel and Conversions API of the user's connected Meta ad accounts with LoomaScale. Use for whether a pixel (dataset) fires, browser versus server event counts, Event Match Quality, match key and CAPI coverage, deduplication, Meta's dataset diagnostics, custom conversions, which ad sets optimize for a pixel event, and conversion drops that may be tracking problems. Read-only. Do not invoke for changing campaigns, installing the pixel, Google Analytics or other ad platforms.
---

# Meta Pixel and Conversions API with LoomaScale

Answer Meta tracking questions with evidence from the user's connected Meta ad accounts.
This package connects to `https://api.loomascale.com/mcp/metapixel`. Inspect available
tool descriptions and input schemas; a client may add a namespace to the tool names
used here. Live schemas take precedence over this guide.

Meta calls a pixel a dataset; the same `dataset_id` receives browser (pixel) events and
server (Conversions API) events.

## Resolve the ad account and dataset

Reuse an ad account already verified in the conversation. Otherwise call
`meta_list_ad_accounts` and pass `ad_account_id` on every call; ask which one when
several are reachable and none is named. Then call `meta_list_datasets` without
`dataset_id` to find the account's datasets, and confirm the one the user means.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| Which pixels does the account use? Are they firing? | `meta_list_datasets` |
| Which events arrive, from browser or server? | `meta_list_datasets` with `dataset_id`, `days` and `event_source` |
| Why is Event Match Quality low? Is CAPI working? | `meta_get_dataset_quality` with `dataset_id` |
| Which ad sets optimize for this pixel event? | `meta_list_campaigns`, then `meta_get_adset` (`promoted_object`) |
| Did reported conversions drop? | `meta_get_insights` for this and the previous period |
| Which audiences depend on the pixel? | `meta_list_audiences` |
| What changed before the drop? | `meta_get_activity_log` |

Read [Meta Pixel checks](references/meta-pixel.md) for how to read the counts, EMQ and
deduplication without over-claiming.

## Stay read-only

No tool here changes Meta, installs a pixel or sends events. Give fixes as steps for the
user's website, tag manager or Meta Events Manager. For changes to campaigns, say they
need the Meta Ads or full LoomaScale plugin.

## Handle access and helper tools accurately

- If authorization is missing or Meta Ads is not connected, use the link the tool
  returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
- For a plan or trial refusal, call `loomascale_get_user` once and explain the plan,
  trial, task or account allowance it reports. Weekly tasks used up: give the reset date
  from the message. Never retry a refusal.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it only when
  the user asks to send a feature request.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which are
  connected, and which this plugin has tools for. It connects nothing: give the link it
  returns, and say plainly when a source needs the full LoomaScale plugin.

## Return a result the user can assess

Name the ad account, dataset and time window. Separate received events from attributed
conversions. Quote Meta's own diagnostic text and say which fix matters most first.
