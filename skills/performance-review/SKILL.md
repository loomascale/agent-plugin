---
name: performance-review
description: Review Google Ads or Meta Ads performance over a period, explain what changed and why, and give a prioritized action plan. Use when the user asks how their ads are doing, what changed, why conversions or ROAS moved, for a weekly or monthly review, the biggest opportunities, weak ads or creative winners, or a 7-day or 30-day action plan. Read-only.
license: MIT
metadata:
  author: loomascale
  version: "1.0.0"
---

# Performance review

Answer with numbers for the period and the period before it, name what moved and the
most likely cause, then a short ranked plan. No changes.

## Google Ads

Tools: `google_get_insights` (both periods), `google_list_campaigns`,
`google_list_keywords`, `google_list_search_terms`, `google_list_ads`,
`google_check_pacing`. Geography: `google_get_geo_insights`. Device, day-of-week or
network drill-downs: `google_query`, after `google_get_resource_metadata` for the
resource (see the `loomascale` skill).

Default review (the plugin's first suggested prompt):

> Review my ad performance for the last 7 days. Show spend, results, trends, and the
> top 3 issues. Don't make any changes.

What changed (30 vs previous 30):

> Explain the biggest performance changes in my Google Ads account over the last 30
> days compared with the previous 30 days. Identify what drove the changes in spend,
> conversions, CPA, ROAS, CTR, CPC and conversion rate, and drill into the campaigns, ad
> groups or keywords responsible. Separate likely causes from correlations and show the
> evidence behind each conclusion.

Recent-change check (14 vs previous 14): account for bidding learning periods and
conversion delay before saying something hurt. Tell the user whether to investigate,
undo a change, or wait. If nothing meaningful moved, say so.

Action plan:

> Act like a senior Google Ads performance marketer reviewing this account. Give me a
> prioritized action plan for the next 7 days, ranked by expected impact and effort. For
> every action show the problem, the supporting data, the change you recommend, the
> expected result and your confidence level. Focus on actions that could materially
> affect revenue or wasted spend rather than minor optimizations.

Weak ads (`google_list_ads` + insights): weak CTR or conversion rate against comparable
ads in the same ad group, policy or approval problems. Draft replacement headlines and
descriptions; apply to the same ad (`google_update_ad`) only after confirmation, or
create a second ad paused (`google_create_ad`) when a test reads better than a rewrite.

Performance Max: `google_list_asset_groups` for per-group spend, assets, ad strength,
search themes; flag low-rated assets and groups competing with each other.

## Meta Ads

Tools: `meta_get_insights`, `meta_list_campaigns`, `meta_list_ads`, `meta_check_pacing`.

> Compare the last 7 days in my Meta Ads account with the 7 days before. Show spend,
> results, cost per result, CPM, CTR and frequency for both periods at account level,
> then for every campaign that moved. Name the campaigns and ad sets responsible for the
> biggest changes in each direction, and for each say whether the cause was cost,
> conversion rate, delivery volume or creative that fatigued. End with the single thing
> most worth my attention this week. Do not change anything.

Creative winners: rank ads by results and cost per result, ignore ads with too little
spend to judge, say what the winners share (format, hook, offer, length). Draft two or
three variants; create nothing (`meta_create_ad`) until approved.

30-day plan: order by impact, state evidence, expected outcome, risk, time to know;
mark what is safe now versus needs a test. Short beats long.

## Rules

- Compare like with like: same length periods, same day-of-week mix where possible.
- Name the entity (campaign, ad set, keyword) behind every movement.
- Separate cause from correlation and say how confident you are.
