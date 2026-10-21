---
name: budget-pacing
description: Check today's and month-to-date budget pacing in Google Ads or Meta Ads, find campaigns capped while hitting goal or unable to spend, propose budget reallocation or where the next budget should go, and diagnose campaigns that are not serving. Use when the user asks about pacing, overspend, underspend, budget-limited campaigns, reallocating or scaling budget, or why ads are not showing. Budget changes only on explicit confirmation and within the spend cap.
license: MIT
metadata:
  author: loomascale
  version: "1.0.0"
---

# Budget pacing

## Google Ads

Tools: `google_check_pacing` (today against daily budget), `google_list_campaigns`,
`google_get_insights` (30 days, impression share lost to budget vs rank),
`google_check_billing` (can the account spend at all). Write: `google_update_budget`.

Today:

> Check today's Google Ads pacing. Show which campaigns are over-pacing against their
> daily budget and which have zero delivery, and explain what each case most likely
> means. Tell me which ones need action today and which are fine to leave alone.

Month-to-date (the plugin's third suggested prompt):

> Check budget pacing across all my active Google Ads campaigns. Compare month-to-date
> spend, today's delivery, current daily budgets and performance. Flag campaigns
> constrained by budget while meeting their CPA or ROAS goals, and campaigns
> consistently failing to use the budget they already have. Tell me what needs
> attention and why. Do not make any changes. If everything is pacing normally, say so
> rather than finding something to report.

Reallocation: keep the total daily budget unchanged unless told otherwise. Money moves
toward campaigns losing impression share to budget while meeting CPA/ROAS, away from
campaigns missing goal. Show current and proposed daily budget per campaign and what
each move buys. List the `google_update_budget` calls and wait for confirmation.

Scaling ("where should the next 20% go"): separate share lost to budget (more money
buys more impressions) from share lost to rank (it does not). Rank opportunities with
expected impact and the risk of each.

Not serving at all, top down: account status and billing (`google_check_billing`),
campaign eligibility and the reasons Google gives, ad approval (`google_list_ads`),
today's delivery. Name the single most likely blocker. A campaign with unspent budget
and no clicks is usually the Max CPC limit, not the budget: check bidding
(`google_update_campaign_bidding` to fix, after confirmation).

## Meta Ads

Tools: `meta_check_pacing`, `meta_list_campaigns`, `meta_get_insights`,
`meta_list_ads`, `meta_list_ad_accounts`. Write: `meta_update_budget`.

> Check today's delivery in my Meta Ads account against the daily budgets on every
> active campaign and ad set. Tell me which are on pace, which are underspending and
> which have already hit their cap. Where something is off pace, say whether the cause
> is the budget, the size of the audience or the schedule. Keep it short and do not
> change anything.

Rebalance: compare campaigns and ad sets by spend, results, cost per result and budget
utilisation; raise and lower with the total unchanged; flag anything in the learning
phase, where a budget change resets learning. Scaling: raise nothing more than 20% in
one step. Ask before changing any budget.

Not delivering, top down: ad account status, whether this connection can manage it,
spending limit; campaign and ad set status, schedule, budget; ad review status; today's
delivery against budgets.

## Rules

- A spend-cap refusal on `*_update_budget` is final. Report it; do not retry smaller.
- Budgets sit at campaign or ad set level on Meta; say which one you are changing.
- Pacing is in the account's currency and time zone.
