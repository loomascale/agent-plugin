---
name: waste-audit
description: Find wasted ad spend in a Google Ads or Meta Ads account over the last 30 days and rank the findings by money lost. Use when the user asks where they are wasting money, wants a waste audit, asks about search terms to block, negative keywords, ad sets spending without results, placements that waste budget, or asks to diagnose a bad CPA or ROAS. Read-only until the user approves a change.
license: MIT
metadata:
  author: loomascale
  version: "1.0.0"
---

# Waste audit

The free-tier headline task. Produce three ranked findings, each with the metrics that
prove it, one sentence on why it matters, the exact change, a monthly saving estimate,
and which single change is safest first. Change nothing without confirmation.

## Google Ads

Tools: `google_list_campaigns`, `google_get_insights`, `google_list_search_terms`,
`google_list_keywords`. Portfolio (manager account, many clients):
`google_list_ad_accounts`, `google_audit_portfolio`, `google_compare_accounts` — one
portfolio call, not one call per client.

Prompt that works as written:

> Audit my Google Ads account for wasted spend over the last 30 days. Look across
> campaigns, ad groups, keywords and search terms, and check three things in
> particular: search terms that cost money without converting, budget going to campaigns
> and ad groups that produce no conversions, and daily budgets spent on delivery that
> never turns into results. Report the three most important findings, ranked by how much
> money each one is losing me. For each finding show the supporting metrics, explain in
> one sentence why it matters, and give the exact change you recommend. Then estimate
> how much I could save per month by fixing all three, and tell me which single change
> is the safest one to make first. Do not change anything in my account without asking
> me first.

Where to look, in order:

1. `google_list_search_terms` (30 days): terms with spend and zero conversions. Group by
   intent; separate clearly irrelevant from unproven-but-plausible. Do not propose
   blocking converting or high-intent variants. Recommend exact negatives with match
   type and whether they belong at campaign or ad group level. Applying them is
   `google_add_keywords` with negative keywords, after confirmation.
2. `google_get_insights` by campaign and ad group: spend with no conversions, CPA far
   above the account's norm. Take conversion delay into account before calling a recent
   campaign a failure.
3. Daily budgets fully spent on delivery with no results (`google_check_pacing`
   confirms today's delivery).

Worst CPA / ROAS diagnosis: add `google_list_ads`. Separate causes: traffic quality
(search terms), bids, conversion rate, budget, ad relevance. State confidence per cause.

## Meta Ads

Tools: `meta_list_campaigns`, `meta_get_insights`, `meta_list_ads`, `meta_check_pacing`.

> Audit my Meta Ads account for wasted spend over the last 30 days. Look across
> campaigns, ad sets and individual ads, and check three things in particular: ad sets
> that spend without producing results, ads whose frequency has climbed while
> performance fell, and budget going to campaigns delivering far above my usual cost
> per result. Report the three most important findings, ranked by how much money each
> one is losing me. [...] Do not change anything in my account without asking me first.

Where to look:

1. Ad sets with real spend and no results. For each: spend, campaign, how long running,
   what the ads look like; is it audience, creative or offer. Flag ad sets still in the
   learning phase as "too early to judge" rather than waste.
2. Creative fatigue: frequency climbing while CTR falls and cost per result rises.
3. Placement breakdown (`meta_get_insights` with placement breakdown): placements with a
   meaningful share of spend at a cost per result far worse than account average. Say
   what excluding them costs in reach.

Pausing is `meta_set_status`; only after the user names what to pause.

## Output

Lead with the ranked findings, not with the method. If the account is clean, say so
instead of manufacturing a finding.
