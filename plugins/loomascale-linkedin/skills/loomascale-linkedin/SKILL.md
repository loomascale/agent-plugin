---
name: loomascale-linkedin
description: Audit and manage the user's connected LinkedIn Ads accounts with LoomaScale. Use for campaign and creative performance, cost per lead, lead and conversion trends, professional demographics (job title, seniority, industry, company, job function, company size, country), wasted spend, and requested status, budget, bidding, targeting, schedule, delivery or name changes on existing campaigns, campaign groups and creatives. Do not invoke for organic LinkedIn posts, company pages, creating campaigns or other ad platforms.
---

# LinkedIn Ads with LoomaScale

Answer LinkedIn Ads questions with evidence from the user's connected ad accounts.
This package connects to `https://api.loomascale.com/mcp/linkedin`. Inspect available
tool descriptions and input schemas; a client may add a namespace to the tool names
used here. Live schemas take precedence over this guide.

## Resolve the ad account

Reuse an ad account already verified in the conversation. Otherwise call
`linkedin_list_ad_accounts` and pass `ad_account_id` (id or name) on every call. When
the user reaches more than one and none is named, ask which one before a change.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| How are campaigns or creatives doing? Did it change? | `linkedin_get_insights` with `level`, `metric_set` and `compare_previous_period` |
| Which job titles, seniorities or industries respond? | `linkedin_analyze_demographics`, one `pivot` at a time |
| Where am I wasting money? | `linkedin_audit_wasted_spend` |
| What campaigns exist, and are they serving? | `linkedin_list_campaigns` |
| How is one campaign set up? | `linkedin_get_campaign` |
| Which ads are serving or held in review? | `linkedin_list_creatives` |
| How big is an audience? | `linkedin_search_targeting_entities`, then `linkedin_get_audience_count` |

Read [LinkedIn Ads tools](references/linkedin-ads.md) for reporting windows,
demographic limits and the rules for each change.

## Change the account only on the user's word

Keep audits read-only. Never change anything as a side effect of an analysis. Every
change tool takes `dry_run:true`: call it first, show the proposed change, and repeat
without it only after the user approves. Daily budgets above the user's spend cap are
refused. No tool creates or deletes campaigns, groups or creatives.

The detail reads and change tools are rolling out by account. When they are not in the
tool list, give a concrete recommended change for the named campaign and say it is made
in LinkedIn Campaign Manager; never claim a change ran.

## Handle access and helper tools accurately

- If authorization is missing or LinkedIn Ads is not connected, use the link the tool
  returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
  A change that needs edit permission asks the user to reconnect LinkedIn Ads.
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

Name the ad account, date range (UTC) and currency. Say whether a figure is leads,
conversions or both. Call demographic results directional. Claim a change only after
the tool reports success.
