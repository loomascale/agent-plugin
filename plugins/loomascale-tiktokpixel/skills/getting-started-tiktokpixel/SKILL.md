---
name: getting-started-tiktokpixel
description: Use on a first visit or setup recheck in the LoomaScale TikTok Pixel plugin. Check the TikTok Ads connection, show whether the pixel and Events API are receiving events and suggest a tracking question.
---

# Getting started with TikTok Pixel in LoomaScale

## Check connection and access

On this plugin's `loomascale-tiktokpixel` connection, call `loomascale_list_data_sources`
with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected.
Use the TikTok Ads row with `tools_in_current_plugin: true`. A focused plugin normally
returns `all_sources: false`. Keep in-chat tasks scoped to TikTok tracking.

Proceed with an active trial, the Free plan, a paid plan or legacy access: every tool here
is a read. For a pending trial, tell the user before the first metered read that it
starts the trial. If a plan is required, show the returned plan link. If a check fails,
offer sign-in or retry.

For `not_connected`, offer **📈 Connect TikTok Ads** to check the pixel. Use the returned
`connect_url` verbatim, falling back to `connections_url` or the
[LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use
**Reconnect** for `needs_attention` and **Recheck** for an unknown status.

## Is my pixel healthy?

Call `tiktok_list_ad_accounts` and pick the account for the business; ask when several
unrelated ones are reachable. Call `tiktok_get_pixel_events` with that `advertiser_id`
for the last 7 days and pick the pixel with the most events; say so if none received any.

Show a short table of the main events (Complete Payment, Submit Form, Add to Cart, or the
ones present) with browser, server and attributed counts. Add one plain-language
observation, such as purchases arriving only from the browser.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Place one recommended button
beneath the snapshot: **Is TikTok flagging my tracking?** when events arrive, otherwise
**Why is my pixel silent?**. Then three to five short suggestions under **What else can I
help you with?**:

- **Is TikTok flagging my tracking?** — TikTok's EVENT_TRACK diagnostics for your ad groups.
- **Why is there no server data?** — What the Events API needs, and where to set it up.
- **Which ad groups use this pixel?** — Ad groups and the event each optimizes for.
- **Did tracking break?** — Compare reported conversions with received events week over week.
- **Review website audiences** — Audiences built from site traffic.

Use [TikTok Pixel and Events API checks](../loomascale-tiktokpixel/SKILL.md) for
selected tasks.
