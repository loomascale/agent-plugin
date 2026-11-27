---
name: getting-started-metapixel
description: Use on a first visit or setup recheck in the LoomaScale Meta Pixel plugin. Check the Meta Ads connection, show whether the pixel and Conversions API are receiving events and suggest a tracking question.
---

# Getting started with Meta Pixel in LoomaScale

## Check connection and access

On this plugin's `loomascale-metapixel` connection, call `loomascale_list_data_sources`
with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected.
Use the Meta Ads row with `tools_in_current_plugin: true`. A focused plugin normally
returns `all_sources: false`. Keep in-chat tasks scoped to Meta tracking.

Proceed with an active trial, the Free plan, a paid plan or legacy access: every tool here
is a read. For a pending trial, tell the user before the first metered read that it
starts the trial. If a plan is required, show the returned plan link. If a check fails,
offer sign-in or retry.

For `not_connected`, offer **📈 Connect Meta Ads** to check the pixel. Use the returned
`connect_url` verbatim, falling back to `connections_url` or the
[LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use
**Reconnect** for `needs_attention` and **Recheck** for an unknown status.

## Is my pixel healthy?

Call `meta_list_ad_accounts` and pick the account for the business; ask when several
unrelated ones are reachable. Call `meta_list_datasets` and pick the dataset that
received an event most recently; say so if none has. Then call `meta_list_datasets` with
that `dataset_id`, `days: 7` and `event_source: "WEB_ONLY"`, and again with
`"SERVER_ONLY"`.

Show a short table of the main events (PageView, Lead, Purchase, or the ones present) with
browser and server counts, and when the dataset last received an event. Add one
plain-language observation, such as purchases arriving only from the browser.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Place one recommended button
beneath the snapshot: **Check Event Match Quality** when server events arrive, otherwise
**Why is there no server data?**. Then three to five short suggestions under **What else
can I help you with?**:

- **Check Event Match Quality** — Which match keys are missing, and what does Meta suggest?
- **Why is there no server data?** — What the Conversions API needs, and where to set it up.
- **Which ad sets use this pixel?** — Ad sets optimizing for each event.
- **Did tracking break?** — Compare reported conversions with the week before and recent changes.
- **Review custom conversions** — List the rules and the events they depend on.

Use [Meta Pixel and Conversions API checks](../loomascale-metapixel/SKILL.md) for
selected tasks.
