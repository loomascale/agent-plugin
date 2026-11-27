---
name: getting-started-youtube
description: Use on a first visit or setup recheck in the LoomaScale YouTube Ads plugin. Check the Google Ads connection, show last week's YouTube ad results and suggest a placement or waste question.
---

# Getting started with YouTube Ads in LoomaScale

## Check connection and access

On this plugin's `loomascale-youtube` connection, call `loomascale_list_data_sources`
with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected.
Use the Google Ads row with `tools_in_current_plugin: true`: YouTube ads run in Google
Ads, so there is no separate YouTube connection. A focused plugin normally returns
`all_sources: false`. Keep in-chat tasks scoped to YouTube ads.

Proceed with an active trial, the Free plan, a paid plan or legacy access. The Free plan
(`readOnly: true`) allows reads within a weekly task allowance, so run the snapshot
without asking the user to pay first and offer changes as recommendations only. For a
pending trial, tell the user before the first metered read that it starts the trial. If
a plan is required, show the returned plan link. If a check fails, offer sign-in or retry.

For `not_connected`, offer **▶️ Connect Google Ads** to see YouTube ad results. Use the
returned `connect_url` verbatim, falling back to `connections_url` or the
[LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use
**Reconnect** for `needs_attention` and **Recheck** for an unknown status.

## How did my YouTube ads do this week?

Call `gads_list_ad_accounts` and pick the account for the business; ask when several
unrelated ones are reachable. Call `gads_list_campaigns` and keep campaigns of type
`DEMAND_GEN` or `VIDEO`. If there are none, say so and offer to launch a paused Demand
Gen campaign from a video already on YouTube.

Otherwise call `gads_get_insights` with `level: campaign`, `date_preset: LAST_7_DAYS` and
`include_video_metrics: true`, then the same for the seven days before. Show spend, views,
view rate, cost per view and conversions per YouTube campaign with the change against the
week before, in the account currency. Add one plain-language observation grounded in the
figures.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Place one recommended button
beneath the snapshot: **Find wasted video spend** when spend rose without conversions,
otherwise **Compare in-stream, in-feed and Shorts**. Then three to five short suggestions
under **What else can I help you with?**:

- **Compare in-stream, in-feed and Shorts** — Which YouTube surface earns the best results?
- **Find wasted video spend** — Rank campaigns, audiences and locations spending without conversions.
- **See which videos hold viewers** — Compare watch-through rates for each video ad.
- **Launch a Demand Gen campaign** — Preview a paused video campaign from a YouTube video.
- **Review a campaign budget** — Show the current budget and preview a change I choose.

Use [YouTube ads reporting and management](../loomascale-youtube/SKILL.md) for selected
tasks. Offer a change only when the plan allows it.
