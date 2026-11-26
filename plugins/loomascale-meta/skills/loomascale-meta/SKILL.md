---
name: loomascale-meta
description: Audit and manage the user's connected Meta Ads (Facebook Ads and Instagram Ads) accounts with LoomaScale. Use for wasted spend, CPA or ROAS changes, delivery issues, pacing, creative fatigue, Meta Pixel and Conversions API health, custom audiences, A/B tests, public competitor ads in the Meta Ad Library, and requested campaign, ad set or ad changes. Do not invoke for Google Ads, organic post writing, payments or general advertising definitions.
---

# Meta Ads with LoomaScale

Answer Meta Ads questions with evidence from the user's connected ad accounts.
This package connects to `https://api.loomascale.com/mcp/meta`. Inspect available
tool descriptions and input schemas; a client may add a namespace to the tool
names used here. Live schemas take precedence over this guide.

## Resolve the ad account

Reuse an account already verified in the conversation. Otherwise call
`meta_list_ad_accounts` and pass the explicit `act_…` ID. When the user reaches
more than one account, ask which one before a change. An account that is not
`ACTIVE` reports Meta's disable reason: explain it rather than retrying.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| How are my campaigns doing? Where is spend wasted? | `meta_get_insights` at campaign, ad set or ad level; `meta_list_campaigns` for structure |
| Why are ads not delivering? | `meta_get_delivery_issues`, `meta_check_pacing`, then the affected objects |
| Is a creative tired? | Ad-level `meta_get_insights`, `meta_list_ads`, then `meta_list_creatives` / `meta_get_ad_preview` |
| Is my Pixel or Conversions API working? | `meta_list_datasets`, `meta_get_dataset_quality` |
| How do my accounts compare? | `meta_compare_accounts` |
| What are competitors running? | `meta_search_ad_library_advertisers`, then `meta_list_ad_library_ads` |
| Who changed what? | `meta_get_activity_log` |

Read [Meta Ads tools](references/meta-ads.md) for reporting parameters, Pixel
checks, Ad Library research and the rules for each change.

## Change the account only on the user's word

Keep audits read-only. Never change anything as a side effect of an analysis.
Read the current target first, propose the exact change, and apply it only
after the user agrees. Creation tools make paused objects;
`meta_activate_campaign` previews first (`confirmed:false`) and runs with
`confirmed:true` only after the user approves the budget. Budget changes and
activations are checked against the user's daily spend cap. Edits to running
objects take effect immediately. Deletion needs a paused object and its exact
name (`meta_delete_object.confirm_name`); prefer pausing when the goal is to
stop spend.

## Handle access and helper tools accurately

- If authorization is missing, expired or lacks a permission, use the link the
  tool returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
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

Name the ad account, date range and currency. Say which action type you counted
as a result. Claim a change only after the tool reports success, read it back,
and say when Meta review or a paused parent still stops delivery.
