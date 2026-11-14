---
name: ga4-insights
description: Explain changes in the user's Google Analytics 4 (GA4) traffic, engagement, key events, revenue and funnel performance using connected LoomaScale reports. Use for period comparisons, source/medium and landing page analysis, funnel drop-off investigations and GA4 attribution questions. Use loomascale-ga4 for property discovery and individual reports.
---

# Google Analytics 4 insights with LoomaScale

Turn the user's GA4 reporting question into evidence, likely explanations and
practical next steps. Use [GA4 reporting and settings](../loomascale-ga4/SKILL.md) to resolve
the property, time zone, currency and compatible report inputs. Reports are
read-only. Key events, event rules, enhanced measurement, data redaction and web
streams can be changed under that skill's explicit request, dry run and approval
rules. This endpoint has
no advertising, Search Console or Tag Manager tools.

## Establish the comparison

Reuse the user's business goal, chosen property and date range. For an unspecified
historical comparison, use the last 30 complete property-local days against the
preceding 30 and state both windows. Honor a request for today or realtime instead
of forcing it into a historical comparison. Flag incomplete periods.

Read totals before selecting breakdowns. Choose the few metrics that answer the
question: sessions and engaged sessions for traffic quality, key events for
configured business outcomes, revenue for monetization, and ordered funnel users
for completion. Keep metric definitions and report filters consistent across
windows. Read `ga4_list_property_annotations` when investigating a dated change;
an annotation is context, not proof of the cause.

## Locate the drivers

For a traffic or revenue change, examine source/medium, channel, landing page and
device as relevant. Rank segments by their absolute contribution to the change,
then show percentage changes with their base counts. Use aggregate property
totals as the denominator; a row-limited report may not cover all segments.

For a conversion decline, distinguish fewer visits from a lower observed outcome
rate. For a checkout question, use ordered steps for events the property actually
collects, then compare completion and abandonment across devices. Realtime event
activity can support an investigation but cannot prove the whole tracking setup
works correctly.

Read [analysis patterns](references/analysis-guide.md) when calculating changes,
interpreting rates, diagnosing funnel losses or explaining attribution differences.

## Explain the result without overstating it

Separate observed changes from possible explanations and say what would test a
hypothesis. Do not claim causation, deduplicated sales, broken tag firing or a
specific campaign's spend from GA4 evidence alone. If the user supplies another
platform's figures, label their source and align dates, currency and attribution
before comparing them. Do not imply this plugin fetched that other source.

Lead with the answer, followed by the segments and numbers that support it. Give
specific next steps, their supporting evidence and any verification still needed.
State material sampling, thresholding, pagination, processing and alpha API limits.
Keep analysis read-only. For an explicitly requested settings change, follow the
configuration rules in [GA4 reporting and settings](../loomascale-ga4/SKILL.md); if the needed
tool or permission is unavailable, explain where to apply it in Google Analytics.
Website tracking installation must be done elsewhere.
