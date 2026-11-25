# Investigation and evidence rules

Load this reference for stages 3–5. Use business objectives and actual report volume; the checks below are diagnostic branches, not a checklist to mechanically run on every small account.

## Investigate by hypothesis

| Signal | First drill-down | Challenge the hypothesis |
| --- | --- | --- |
| Spend with zero attributed results | Google search terms/campaigns; Meta ad sets/ads; TikTok ad groups/ads; LinkedIn campaigns | Check materiality, lag, conversion tracking, goals and prospecting role before calling it waste |
| CPA/CPL or ROAS deterioration | Compare spend, conversion volume/value, CTR, CPC and conversion rate for matched periods | Distinguish higher traffic cost from lower post-click conversion; check recent incomplete attribution |
| Spend spike / low delivery | Budgets, pacing, status, policy approval, impression share, bid restrictions | A budget-limited campaign is not automatically a candidate for increasing spend |
| Poor ad or creative performance | Compare ads within a comparable campaign, creative, placement and time range | Avoid conclusions from small samples; creative fatigue needs trend or platform diagnosis |
| Low-quality traffic | Google search terms and match types; platform placements, geography, device, demographics | Never infer irrelevance solely from zero conversions; confirm the advertiser's product/customer intent |
| Reported conversions disagree | Account conversion definitions, GA4 key events, GTM live tags, Meta Pixel/CAPI, TikTok Pixel | Test attribution models/windows, time zones, clicks vs sessions, duplicate firing, imported or offline events |
| E-commerce delivery concern | Google Merchant Center health and product approval data | Feed disapproval is not itself evidence of poor onsite conversion rate |

## Conversion-reconciliation method

1. Define the exact outcome (e.g., successful lead, qualified lead, completed purchase) and map each platform's action/event to it using **IDs and configuration**, not matching names alone.
2. For each platform, record reporting period, attribution window/model, event source, event counting method, status, and whether the metric includes view-through or modeled conversions.
3. Inspect GA4 event counts and rules, GTM published-version tags/triggers, Meta Pixel/CAPI diagnostics, and TikTok Pixel event receipts only where connected. Account for different windows and event definitions. Prefer a table with rows `Google Ads / Meta Ads / TikTok / LinkedIn / GA4 / GTM` and columns `mapped event`, `observed evidence`, `health`, `confidence`, `gap/next check`.
4. Classify each discrepancy as `configuration confirmed`, `likely configuration issue`, `likely attribution difference`, `inconclusive`, or `not checked`. A configured GTM tag is not proof of receipt; absent data from one inspected GTM container is not proof the site has no other implementation.
5. Prefer a simple verification plan: test an end-to-end conversion, inspect debug/realtime event receipt, compare source IDs, then review results after attribution lag. Never claim a live end-to-end test occurred unless tools actually confirmed it.

## Prioritization and evidence

Use business impact, trend magnitude, fixability, and evidence reliability. Prefer 3–7 important findings over dozens of marginal warnings. A finding should contain:

- **Observation:** entity name plus ID, platform/account, dates, metric values, and comparison period; if a list is truncated label it as sampled.
- **Interpretation:** what likely explains the change, with alternatives. Do not present hypothesis as fact.
- **Priority and confidence:** high/medium/low and confirmed/likely/inconclusive, justified by the evidence rather than invented statistical certainty.
- **Action:** specific review or experiment, clear human approval for any prospective write, estimated effect only where assumptions are defensible.
- **Verification:** which metric, date window, comparison or test would indicate success.

Do not double-count overlapping waste: a costly search term already belongs to a campaign whose spend might also be flagged. Do not add conversions reported independently by multiple ad platforms; the same customer may be attributed in several systems. Keep incompatible currencies separate unless a known dated conversion rate or a tool-provided converted figure exists. For ROAS, distinguish tracked conversion value from actual profit or incremental revenue. Never call observed spend without conversions guaranteed recoverable savings.

## Optional deeper checks

- For lead generation, assess qualified-lead signals where present; form submits and booked calls are not automatically equivalent.
- For e-commerce, investigate purchase value, product approval and landing-page funnel only where data supports the connection.
- For accounts with limited history, low volume, disabled campaigns or unusable tracking, prioritize measurement readiness and hypotheses rather than confidently ordering optimization changes.
- For a very large portfolio, show the coverage count and a triaged high-exposure subset. Disclose remaining accounts and recommend a narrower audit or batching.
