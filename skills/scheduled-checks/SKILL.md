---
name: scheduled-checks
description: Run a recurring Google Ads or Meta Ads check and report only when something is genuinely wrong, such as a conversion drop, CPA or CPC spike, ROAS fall, spend with no conversions, broken conversion tracking, wasted search-term spend, a campaign that stopped serving, delivery stalls or creative fatigue. Use when the user asks to be alerted, to monitor an account, to check something daily or weekly, or when a scheduled job, routine or automation invokes this plugin. Never changes anything.
license: MIT
metadata:
  author: loomascale
  version: "1.0.0"
---

# Scheduled checks

One check, one verdict. Notify only when the deviation is larger than normal noise;
otherwise reply with one line saying all is normal. Read-only, always.

## How to schedule

Scheduling lives in the client, not in LoomaScale: a Claude Code routine or `/loop`,
a Codex automation, a ChatGPT scheduled task, a cron that runs the assistant. Give the
job one of the prompts below with the frequency filled in ("Every morning at 9",
"Every Monday"). Each run authenticates with the same LoomaScale login; the first run
must happen interactively so OAuth can complete.

## Judging "unusual"

- Baseline: the entity's own history (previous weeks), not an industry number.
- Account for day-of-week patterns, traffic volume, spend, conversion delay and
  bidding learning periods before calling something a problem.
- Name the campaigns, ad groups or ad sets that contribute most, when it started, the
  likely cause, and whether action is needed now.
- Intentionally paused campaigns and a campaign temporarily without a conversion are
  not alerts.

## Google Ads checks

Tools per check:

| Check | Tools |
|---|---|
| Conversions dropped | `google_get_insights`, `google_list_campaigns` |
| CPA spike | `google_get_insights`, `google_list_campaigns`, `google_list_keywords` |
| ROAS fell | `google_get_insights`, `google_list_campaigns` |
| Spend without conversions | `google_get_insights`, `google_list_campaigns`, `google_check_pacing` |
| Tracking broke (clicks continue, conversions vanish) | `google_list_conversion_actions`, `google_get_insights`, `google_list_campaigns` |
| Wasted search-term spend | `google_list_search_terms`, `google_get_insights` |
| CPC spike | `google_get_insights`, `google_list_keywords`, `google_get_geo_insights` |
| Campaign stopped serving | `google_list_campaigns`, `google_get_insights`, `google_check_pacing`, `google_check_billing`, `google_list_ads` |
| Budget pacing | `google_check_pacing`, `google_list_campaigns`, `google_get_insights` |
| Bidding health | `google_list_campaigns`, `google_get_insights` |

Example (conversion drop):

> Every morning, check my Google Ads conversion performance. Compare recent conversions
> with the campaign's normal historical performance, accounting for typical day-of-week
> patterns, traffic volume, spend and conversion delay. Notify me only if conversions
> have dropped dramatically or unusually enough that it may indicate a meaningful
> performance problem. If you notify me, explain how large the drop is, identify which
> campaigns and ad groups contributed most, mention likely causes if they can be
> determined, and tell me whether immediate action is recommended. Do not notify me
> about normal fluctuations.

Tracking broke: distinguish a real decline from a tracking issue; avoid false alarms
from normal conversion delay. Wasted search terms: report total wasted spend and the
worst terms with spend each; suggest negatives; apply nothing.

## Meta Ads checks

| Check | Tools |
|---|---|
| Cost per result spike | `meta_get_insights`, `meta_list_campaigns` |
| Ad set spends without results | `meta_get_insights`, `meta_list_campaigns`, `meta_check_pacing` |
| ROAS drop | `meta_get_insights`, `meta_list_campaigns` |
| Delivery stall | `meta_check_pacing`, `meta_list_campaigns`, `meta_list_ads` |
| Creative fatigue | `meta_get_insights`, `meta_list_ads` |
| Budget pacing | `meta_check_pacing`, `meta_list_campaigns` |

Creative fatigue: for each active ad set compare frequency, CTR, CPM and cost per
result over the last two weeks with the two before; flag frequency up while CTR down
and cost up; rank by spend behind it; name the ads.

## Report format

When alerting: what moved, by how much against baseline, since when, which entities,
likely cause, recommended next step, what could not be verified. When not: "Checked
<scope> for <period>: nothing unusual." Nothing else.
