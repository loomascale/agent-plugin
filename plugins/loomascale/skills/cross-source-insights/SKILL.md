---
name: cross-source-insights
description: Explain marketing performance using relevant connected Google Ads, Meta Ads (Facebook Ads and Instagram Ads), TikTok Ads, LinkedIn Ads, Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Search Console (GSC) and Google Merchant Center (GMC) evidence. Compare TikTok Ads spend and reported conversions with GA4 outcomes using verified campaign IDs or UTM tags. Use for changing results, wasted spend, budget priorities, organic traffic, shopping eligibility, tracking, landing pages and funnels, including single-source questions. Grounds custom Google Ads queries in live metadata. Use the loomascale skill for account setup and campaign changes. Also use Meta Pixel (Facebook Pixel) events, Event Match Quality and Conversions API diagnostics to investigate tracking gaps.
---

# LoomaScale cross-source insights

Use LoomaScale to connect advertising delivery and cost to on-site behavior and
business outcomes, organic visibility, product eligibility and tracking configuration.
Answer the user's question with evidence, likely drivers and practical next steps.
The user's instructions take precedence
over this skill's workflow defaults; live tool schemas and server permissions
determine supported operations.

For public competitor creatives, offers and messaging, use
[competitor-ad-research](../competitor-ad-research/SKILL.md). Keep public observations
separate from the user's connected-account performance metrics.

## Scope the question and choose sources

Identify the decision, business outcome, period and relevant accounts. Reuse the
conversation's context. If the period is unspecified, use the last 30 complete
days and the preceding equal-length period, stating the dates. When Search Console
is needed, use its finalized end date (normally three Pacific days ago) for a
direct cross-source comparison, or label differing windows explicitly. Ask only
when an unresolved business/account/property choice would materially change the answer;
continue independent reads while that choice is pending.

Choose sources by what they can explain, not simply because they are connected:

| Question | Evidence to combine when available |
|---|---|
| Why did leads, sales or ROAS change? | Relevant ad platforms' spend, delivery and reported outcomes; GA4 traffic, business events and revenue; then the largest changing campaign, device, geography or landing-page segments. |
| Where is spend being wasted? | Ad costs, search terms or creative performance; GA4 engagement and matching business outcomes. Distinguish poor traffic from on-site drop-off and missing measurement. |
| Which channel or campaign deserves budget? | Comparable ad costs and GA4 outcomes, current delivery/pacing and data volume. Treat platform-attributed results as a separate view. |
| Why do reports disagree? | Platform conversion definitions and attribution settings where exposed; GA4 event definitions, attribution, property settings and Google Ads links. |
| Where does the funnel break? | GA4 landing-page, device and ordered funnel reports; relevant ad campaign/source context. |
| Why did organic traffic fall, or which pages deserve work? | Search Console query/page changes and indexing evidence; GA4 organic landing-page behavior and business outcomes. Keep paid results separate. |
| Why did Shopping or Performance Max results decline? | Google Ads delivery and product performance where supported; Merchant Center account health, product issues and paid/free-listing performance. Verify the merchant relationship before attributing a campaign change to feed issues. |
| Is tracking configuration causing the discrepancy? | Relevant Google Ads conversion actions, Meta Pixel (Facebook Pixel) datasets/events, Event Match Quality and Conversions API diagnostics, GA4 events/property context and GTM's published tags, triggers, variables and pending workspace changes. Configuration alone does not prove runtime behavior. |

For concrete diagnostic patterns and join rules, read
[the analysis guide](references/analysis-guide.md) when combining sources.
For standalone GA4, Search Console, Merchant Center or Tag Manager procedures,
read the [measurement and commerce guide](../loomascale/references/measurement-and-commerce.md)
only for the relevant integration.

## Discover accounts and establish comparable data

- Discover only relevant connections with `gads_list_ad_accounts`,
  `meta_list_ad_accounts`, `tiktok_list_ad_accounts`, `linkedin_list_ad_accounts` and
  `ga4_get_account_summaries`; use `gsc_list_sites`, `gmc_list_accounts` or
  `gtm_list_containers` when their evidence is relevant and available. Use explicit
  account/property/site/container IDs on subsequent reads. Google manager accounts
  contain client accounts; query the relevant client.
  Respect dashboard resource switches. Do not use `*_select_account` to scope
  analysis: it changes a persistent default shared across chats.
- Before comparing GA4 with ads, call `ga4_get_property_details` for time zone and
  currency. Use `ga4_list_google_ads_links` to verify the Google Ads relationship;
  a matching account or property name alone is insufficient.
- Align inclusive date boundaries, time zones, currencies, conversion definitions
  and reporting grain. When daily boundaries cannot be reconciled, say so. Keep
  currencies separate unless an evidenced conversion basis is available.
- Prefer typed tools: `gads_get_insights`, `gads_list_search_terms`,
  `gads_list_ads`, `meta_get_insights`, `meta_list_ads`, `tiktok_get_performance`,
  `tiktok_get_creative_performance`, `linkedin_get_insights` and
  `linkedin_analyze_demographics`, as relevant. Inspect their current schemas
  for available breakdowns, date formats and account arguments.
- For GA4, use `ga4_run_report` for traffic, engagement and site outcomes;
  `ga4_run_funnel_report` for ordered steps; `ga4_run_conversions_report` for its
  supported attribution/ROAS metrics and dimensions. Its schema differs from
  ordinary reports. Use `ga4_get_custom_dimensions_and_metrics` for property-specific
  fields. Read current tool definitions; do not invent GA4 tools or field names.

## Ground every custom Google Ads query

Prefer a typed read when it answers the question. Before **every** `gads_query`,
complete this preflight; never send a speculative query to discover the schema:

1. Read the advertised `gads_query` input schema. Its arguments are `query`
   (one GAQL SELECT string) and optional `customer_id`. Do not pass SQL-style
   `fields`, `resource`, `filters`, `date_range` or `gaql` arguments to this tool.
2. Call `gads_get_resource_metadata` for the intended `FROM` resource before
   constructing the query. Its arguments are `resource` and optional `contains`
   and `limit`; it has no `customer_id` argument. Use `resource="metrics"` and
   `resource="segments"` to look up those field families separately. Look up
   attributed fields under their own resource too, such as `campaign` fields
   used in a view query. Reuse metadata already returned in this conversation
   only when it covers the same resource and every field about to be used.
3. Verify every SELECT, WHERE and ORDER BY field against returned names,
   `selectable`, `filterable`, `sortable`, data types and `enumValues`. A truncated
   metadata response is incomplete: narrow `contains` to the missing field.
   Metadata confirms field definitions, **not** compatibility of every field
   combination or whether every resource accepts date segments. If compatibility
   is uncertain, consult the current Google Ads field documentation when available
   or choose a supported typed read or narrower query; never promise validity from
   metadata alone.
4. Write GAQL with snake_case paths and a bounded LIMIT. Use the question's exact
   dates only on resources supporting the date segment. GAQL is not SQL: no JOIN,
   OR, SQL functions, or parenthesized boolean expressions. Use supported IN
   filters or separate queries. Send only schema-supported JSON arguments.
5. Interpret returned camelCase paths, the actual returned query and `truncated`
   flag. Convert `costMicros` to currency units by dividing by 1,000,000; do not
   apply that conversion to already-denominated costs from typed tools.

If a query fails validation, inspect the error, refresh metadata for the implicated
fields, and correct the query only when supported by that evidence. Retry once;
otherwise use a typed read or explain the precise missing evidence. If metadata
cannot be obtained, do not fall back to guessed GAQL.

## Diagnose before recommending

Start with totals and the comparison period, then drill into the largest changes.
Trace the relevant chain: spend → impressions → clicks → sessions → business
events → revenue. Clicks and sessions are different measures; a gap is a diagnostic
signal, not proof of tracking failure. Define the business event instead of treating
every GA4 key event as a lead or sale.

Join only on verified keys and at a compatible grain. Keep platform-attributed and
GA4-attributed conversions/revenue separate; never add them together as unique
business results. Do not sum platform conversions across channels as deduplicated
leads. Recompute aggregate ratios from totals, and label zero-denominator ratios
as unavailable. Never silently turn missing rows, errors or `(not set)` into zero.

Check paging and coverage before claiming totals: GA4 `rowCount`/`returnedRows`
and `offset`, Google Ads/Merchant Center query `truncated`, Search Console
`returnedRows`/`startRow` and other tools' limits. Search Console query `totals`
summarize the returned rows; use a separate ungrouped report for property totals.
Fetch remaining needed rows or report partial coverage. Preserve sampling, thresholding,
freshness or data-loss warnings. Recent conversion lag and small samples limit
conclusions. Distinguish observations, plausible explanations and tests that could
confirm them; correlation does not establish causation.

## Deliver an answer the user can act on

Lead with the answer to the decision. Include only the comparisons that support it,
then rank the likely drivers by measured contribution where possible. For each
material finding, identify its source/account/property, dates, metric definition
and relevant filter; use returned report links when available, never invent links.
Show absolute changes with relative changes, and percentage-point changes for
rates. Explain conflicts between sources rather than choosing a convenient number.

Recommend actions tied to the evidence and a way to measure their effect. Separate
observed facts from hypotheses and conditional upside estimates. If a missing
connection blocks a conclusion, explain which question that source would resolve
and provide the supported partial answer. Users manage connections in the
[LoomaScale dashboard](https://loomascale.com/dashboard/connections).

Analysis does not authorize changes to ads. This workflow uses read-only tools;
present proposed budget, campaign or tracking changes for the user's decision.
Honor existing explicit authorization for any separately requested action, its
tool's permissions and the configured spend cap; use the
[LoomaScale workflow skill](../loomascale/SKILL.md) for execution.
TikTok Ads changes (status, budget, bid, targeting, schedule, rename, paused campaign creation) and LinkedIn Ads, which is
read-only, follow the same rule; Search Console, GA4, Merchant Center and
Tag Manager changes belong to the loomascale skill and happen only on request.
If a plan/trial limit blocks a read, use `loomascale_check_quota` and
report the limitation without retry loops.
