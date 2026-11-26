# How do I compare the last two weeks?

Run one summary for one target. Use the [integration guide](../../loomascale/SKILL.md#resolve-accounts-once-and-carry-their-ids-forward) for discovery. Use a previously verified target or the only eligible target in the requested scope. Never sweep a portfolio to find a more interesting result.

Compare the seven complete calendar days ending yesterday in the source’s reporting time zone with the immediately preceding seven days. Pass explicit inclusive dates. Shift both windows back together when the source requires finalized data, and label the actual dates. Use one comparison call when supported, otherwise one totals read per window. Omit campaign, audience, page and creative breakdowns.

| Selected source | Smallest useful report |
| --- | --- |
| Google Ads | `gads_get_insights`, account level. Read cost, clicks and conversions. |
| Meta Ads | `meta_get_insights`, account level. Read spend, clicks and a single consistently reported outcome. Label purchases and cost per purchase when purchases are the available outcome. |
| TikTok Ads | `tiktok_get_performance`, one advertiser, `ACCOUNT` level and `TOTAL` granularity. Request spend, clicks and conversions. |
| LinkedIn Ads | `linkedin_get_insights`, account level, `metric_set="conversions"`, `compare_previous_period=true`. |
| Google Analytics 4 (GA4) | `ga4_run_report`, two date ranges, no breakdown. Show sessions and `keyEvents` (events marked as conversions). |
| Google Search Console | `gsc_compare_periods` with no dimensions. Compare organic clicks and impressions for two complete weeks of final data, normally ending three days ago in Pacific time. |
| Google Merchant Center | `gmc_query` on `product_performance_view`. Select only clicks and impressions with the date range in the filter for one aggregate per window. |
| Google Tag Manager | GTM has configuration data only. Use `gtm_get_container` for a current snapshot of the published version, tags and triggers. Label it “Published tracking setup” with its as-of date. If nothing is published, say so. |

For ads, show **spend, clicks, conversions and cost per conversion**. Divide period spend by period conversions, in the account currency. Use the same outcome and attribution basis in both windows. An unavailable outcome or a zero denominator gives “—” with a brief reason. Preserve an explicitly reported zero. If a tool flags withheld conversions, suppress dependent figures too.

Use four columns: **Metric**, **Previous 7 days**, **Last 7 days**, **Change**. Put actual date ranges in the caption and show a signed change in the metric’s units, or a percentage when the prior value is nonzero. Use one sentence to describe the largest useful movement. If a read fails, show available figures and the specific gap or next step. Stop here. Root causes, budget recommendations and cross-source comparisons belong to the action the user chooses next.
