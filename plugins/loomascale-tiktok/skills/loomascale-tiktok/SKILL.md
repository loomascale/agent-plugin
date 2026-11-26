---
name: loomascale-tiktok
description: Audit and manage the user's connected TikTok Ads accounts with LoomaScale. Use for wasted spend, cost per conversion or ROAS changes, video creative performance (hook, hold and completion rates), Smart+ creatives, audience breakdowns, delivery diagnostics, ad review rejections, creative fatigue, TikTok Pixel events, and requested status, budget, bid, targeting, schedule or name changes, or paused Smart+ website campaigns. Do not invoke for organic TikTok content, deleting objects, payments or other ad platforms.
---

# TikTok Ads with LoomaScale

Answer TikTok Ads questions with evidence from the user's connected ad accounts.
This package connects to `https://api.loomascale.com/mcp/tiktok`. Inspect available
tool descriptions and input schemas; a client may add a namespace to the tool
names used here. Live schemas take precedence over this guide.

## Resolve the advertiser

Reuse an advertiser already verified in the conversation. Otherwise call
`tiktok_list_ad_accounts` and pass the explicit advertiser ID. When the user
reaches more than one, ask which one before a change. `tiktok_get_ad_account`
gives the currency, time zone and account status.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| How are campaigns doing? Where is spend wasted? | `tiktok_get_performance` at CAMPAIGN, ADGROUP or AD level |
| Which videos hook and hold viewers? | `tiktok_get_creative_performance` (`group_by` AD, VIDEO or MATERIAL) |
| Who responds? | `tiktok_get_audience_performance`, one `breakdown` at a time |
| Why is an ad group not delivering? | `tiktok_get_adgroup_diagnostics`, delivery status from `tiktok_get_adgroups` / `tiktok_get_ads` |
| Why was an ad rejected? | `tiktok_get_ad_review` |
| Is a creative tired? | `tiktok_get_creative_fatigue` |
| Is the pixel receiving events? | `tiktok_get_pixel_events` |

Read [TikTok Ads tools](references/tiktok-ads.md) for metric definitions,
reporting windows and the rules for each change.

## Change the account only on the user's word

Keep audits read-only. Never change anything as a side effect of an analysis.
Every change tool takes `dry_run:true`: call it first, show the proposed change,
and repeat without it only after the user approves. Daily budgets above the
user's spend cap are refused. Creation tools always create paused objects;
enable them with `tiktok_set_status` only after approval. No tool deletes
anything or uploads media.

## Handle access and helper tools accurately

- If authorization is missing or the connection has no advertiser, use the link
  the tool returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
- For a plan or trial refusal, call `loomascale_get_user` once and explain the
  plan, trial, task or account allowance it reports. That allowance is not an ad budget.
- On the Free plan (`readOnly: true` in `loomascale_get_user`) only reads work.
  Use read tools and offer a change as a recommendation, not as an action you
  can run. Never retry a Free plan refusal:
  - A change refused because the plan is read-only: give the finding and the
    recommended change, say that applying it needs a paid plan, and give the
    dashboard link from the refusal.
  - Weekly tasks used up: give the reset date from the message.
  - Account or property allowance reached: say which account was refused
    and when the allowance resets, as the message states. Listing or selecting accounts and reusing a
    counted account spend nothing.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it
  only when the user asks to send a feature request.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which
  are connected, and which this plugin has tools for. Use it when the user asks
  about other platforms or connecting another service. It is free and connects
  nothing: give the user the link it returns, and say plainly when a source
  needs the full LoomaScale plugin.

## Return a result the user can assess

Name the advertiser, date range and currency. Say which event counts as a
conversion. Claim a change only after the tool reports success, and say when
TikTok review or a disabled parent still stops delivery.
