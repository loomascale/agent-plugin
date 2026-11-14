# Google Analytics 4 analysis patterns

## What drove a traffic or revenue change?

Read `ga4_run_report` without dimensions for both periods, then request a useful
breakdown with the same dates, filters and metric definitions. For each segment,
calculate absolute change as current minus previous. Percentage change is
`(current - previous) / previous * 100`; when the previous value is zero, show
the counts and label the segment new rather than returning an infinite percentage.

Rank by the absolute losses or gains relevant to the user's question. A small
segment with a large percentage change may explain little of the overall result.
If the breakdown is paginated, collect the required pages or label the coverage.
Do not sum distinct-user rows to recreate property totals.

## Did traffic volume or conversion efficiency change?

Inspect sessions, engaged sessions, key events and revenue together where
compatible. Name the exact metric or ratio used. `keyEvents / sessions` measures
key events per session; it is not automatically a session conversion rate because
a session may contain several key events. When a rate metric is needed, use a
compatible GA4 session or user key-event-rate metric from the current schema.

Compare rates in percentage points: a move from 4% to 3% is a decline of one
percentage point and a relative decline of 25%. Use compatible totals and
denominators instead of averaging row rates. Keep source scope consistent:
first-user acquisition and session acquisition answer different questions.

## Where should I investigate funnel drop-off first?

Use `ga4_run_funnel_report` with established events in their intended order.
Compare step users, completion and abandonment, then use a relevant breakdown
such as device category. Event totals from a general report cannot show that the
same users completed steps in sequence.

Prioritize substantial losses, consider base counts and describe the step
conditions. A high abandonment rate is an observed behavior, not proof of a broken
checkout. Suggest checking the affected experience and event instrumentation;
this integration cannot inspect the browser or install tracking. Keep the
investigation read-only; settings-tool access does not authorize a
settings change during analysis.

## Why do GA4 and another platform disagree?

Use `ga4_run_conversions_report` for supported attribution questions. Preserve its
chosen model, date basis and conversion specification. Review
`ga4_list_google_ads_links` for link context when relevant. An existing link does
not supply access to advertising-platform reports through this endpoint.

If the user supplies other platform results, compare definitions before values:
time zone, date range, currency, attribution window and model, event versus key
event definitions, and conversion date versus interaction date. Consent,
processing delays and collection differences are hypotheses unless supported by
additional evidence. Never sum platform conversions and GA4 outcomes as unique
sales, and do not calculate ROAS from mismatched revenue and spend.

## What limits confidence in the answer?

Preserve returned sampling, thresholding and data-loss metadata. Distinguish no
data, zero observed results and a refused request. Realtime is an aggregate
last-30-minute report, not a continuous monitor. Funnel and conversion reports
use alpha APIs and may be unavailable for a property or request. Explain how any
partial coverage affects the particular conclusion.
