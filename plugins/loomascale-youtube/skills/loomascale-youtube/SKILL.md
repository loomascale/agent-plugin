---
name: loomascale-youtube
description: Report and manage the user's YouTube ads in their connected Google Ads accounts with LoomaScale. Use for YouTube and Demand Gen campaign results, views, view rate, cost per view, watch-through, results by YouTube surface (in-stream, in-feed, Shorts), wasted video spend, pacing, launching a paused Demand Gen video campaign, and requested status, budget, bidding, ad group targeting or channel changes. Do not invoke for organic YouTube channel analytics, uploading videos, Search keywords, Shopping, Performance Max or other ad platforms.
---

# YouTube Ads with LoomaScale

Answer YouTube ads questions with evidence from the user's connected Google Ads accounts.
This package connects to `https://api.loomascale.com/mcp/youtube`. Inspect available
tool descriptions and input schemas; a client may add a namespace to the tool names
used here. Live schemas take precedence over this guide.

YouTube ads have no connection of their own: they are Google Ads campaigns. Demand Gen
campaigns serve on YouTube in-stream, in-feed and Shorts (and on Discover, Gmail and
Display unless their channels exclude those). Classic Video campaigns are reported here
but can only be changed in the Google Ads interface.

## Resolve the account

Reuse an account already verified in the conversation. Otherwise call
`gads_list_ad_accounts`; when the user reaches more than one and none is named, ask which
one before a change. Pass `customer_id` on every call, or set a default with
`gads_select_account` when the user asks.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| Which campaigns run on YouTube? | `gads_list_campaigns` (campaign `type` DEMAND_GEN or VIDEO) |
| How did they do? Did it change? | `gads_get_insights` with `include_video_metrics: true`, then the previous period |
| Which YouTube surface works? | `gads_get_insights` with `segments: ["ad_sub_network_type"]` |
| Which video ads hold viewers? | `gads_get_insights` with `level: ad` and `include_video_metrics: true` |
| What does an ad say and link to? | `gads_list_ads` |
| Which audiences or locations waste money? | `gads_get_audience_insights`, `gads_get_geo_insights` |
| Is today's spend on track? | `gads_check_pacing` |

Read [YouTube ads tools](references/youtube-ads.md) for metric definitions, the Demand
Gen launch steps and the limits of each change.

## Change the account only on the user's word

Keep reports and audits read-only. Never change anything as a side effect of an analysis.
Show the exact change and wait for approval before every write. The Demand Gen tools take
`validate_only: true`: run that first and show the preview. New campaigns and ads are
created PAUSED; activate a campaign with `gads_activate_campaign` only when the user asks.
Daily budgets above the user's spend cap are refused.

## Handle access and helper tools accurately

- If authorization is missing or Google Ads is not connected, use the link the tool
  returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
- For a plan or trial refusal, call `loomascale_get_user` once and explain the plan,
  trial, task or account allowance it reports. That allowance is not an ad budget.
- On the Free plan (`readOnly: true` in `loomascale_get_user`) only reads work. Offer a
  change as a recommendation and give the dashboard link from the refusal. Weekly tasks
  used up: give the reset date from the message. Never retry a refusal.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it only when
  the user asks to send a feature request.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which are
  connected, and which this plugin has tools for. It connects nothing: give the link it
  returns, and say plainly when a source needs the full LoomaScale plugin.

## Return a result the user can assess

Name the account, date range and currency. Say that views are ad views as Google counts
them, not organic channel views. Claim a change only after the tool reports success.
