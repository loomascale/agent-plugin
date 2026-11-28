# How do I compare the last two weeks?

Use the [integration guide](../../loomascale/SKILL.md#resolve-accounts-once-and-carry-their-ids-forward) to discover accessible reporting accounts in the requested scope. Resolve one target for the full two-week report.

Compare the seven complete calendar days ending yesterday in the source’s reporting time zone with the immediately preceding seven days. Pass explicit inclusive dates. Shift both windows back together when the source requires finalized data, and label the actual dates.

## How do I find one useful observation?

Reuse fresh results for the same target, dates and metric. After the two setup checks, allow at most six summary reads plus one discovery read per source attempted. Skip unavailable or out-of-scope sources. When ad reads return no usable result twice and another source is connected, move on. Reserve reads for eligible fallbacks. Do not probe additional sources after the first useful observation.

Use the table below in order. For ads, compare a verified spender in scope with the prior week. For GA4, compare sessions and key events. For Search Console, compare organic clicks and impressions. For Merchant Center, report a verified product eligibility issue or healthy counts within one destination and country. For Tag Manager, describe the published configuration. For Google Business Profile, compare local impressions and customer actions. If a source returns only empty rows, an access error or figures too incomplete to support a finding, continue in the same turn. A source-specific failure does not establish a global plan block.

Prefer two comparable periods. If a prior period is unavailable, a verified current-period finding can stand alone (for example, spend and zero *reported* purchases). Two equal, usable periods support a stable baseline. Two empty responses support neither zero activity nor a trend. If every eligible source fails or the read budget ends, give the known scope and one recovery action. Never render a table of “No data” rows.

## Which ad accounts should appear?

- Use each distinct platform/account ID once. Read account-level totals for the last seven complete days, with currency. Reuse those totals for the snapshot. Batch in the reporting tool where supported. An enabled account or lifetime spend does not establish activity this week.
- If several verified spenders are already available, show **at most three** with name, platform, weekly spend and currency. Leave out zero and unknown amounts whenever a spender is available. Sort comparable amounts within currency. Describe partial coverage accurately. Stop looking for more accounts once there is a useful finding.
- Use the named account or one clearly in scope for the two-week comparison. If several unrelated clients require a choice, lead with a verified observation from the current totals and give up to three **View report** rows with explicit IDs and dates. On selection, fetch only the missing figures. Never combine clients or currencies.
- If all checked accounts have confirmed zero spend, state the checked scope once and try the next connected source. A verified fall from prior spend to zero can itself be the finding. Show individual zero rows only on a scoped request for them. Missing spend is unavailable and never enters the picker.

## Which totals should I read?

For the selected account use one comparison call when supported, otherwise one totals read per window. Omit campaign, audience, page and creative breakdowns.

| Source, in fallback order | Smallest useful report |
| --- | --- |
| Google Ads | `gads_get_insights`, account level. Read cost, clicks and conversions. |
| Meta Ads | `meta_get_insights`, account level. Read spend, clicks and a single consistently reported outcome. Label purchases and cost per purchase when purchases are the available outcome. |
| TikTok Ads | `tiktok_get_performance`, one advertiser, `ACCOUNT` level and `TOTAL` granularity. Request spend, clicks and conversions. |
| LinkedIn Ads | `linkedin_get_insights`, account level, `metric_set="conversions"`, `compare_previous_period=true`. |
| Google Analytics 4 (GA4) | `ga4_run_report`, two date ranges, no breakdown. Show sessions and `keyEvents` (events marked as conversions). |
| Google Search Console | `gsc_compare_periods` with no dimensions. Compare organic clicks and impressions for two complete weeks of final data, normally ending three days ago in Pacific time. |
| Google Merchant Center | `gmc_get_account_health`. Use a returned destination/country and its active, pending or disapproved product counts or a named issue. Label it “Product visibility now” with its as-of date. Avoid summing overlapping destinations or implying a weekly change. |
| Google Tag Manager | GTM has configuration data only. Use `gtm_get_container` for a current snapshot of the published version, tags and triggers. Label it “Published tracking setup” with its as-of date. If nothing is published, say so. |
| Google Business Profile (early access) | `gbp_get_performance` for one location, called once per window because there is no compare tool. Show Search impressions, Maps impressions, calls, direction requests and website clicks. If the latest days return no values, shift both windows back together and label the dates. Skip this source when the catalog does not offer it to the user. |

For ads, show **spend, clicks, conversions and cost per conversion**. Divide period spend by period conversions, in the account currency. Use the same outcome and attribution basis in both windows. An unavailable outcome or a zero denominator gives “—” with a brief reason. Preserve an explicitly reported zero. If a tool flags withheld conversions, suppress dependent figures too.

For comparable periods use **Metric**, **Previous 7 days**, **Last 7 days** and **Change**. For a current-state finding, use the actual status and count. Put actual date ranges in the caption and show a signed change in the metric’s units, or a percentage when the prior value is nonzero. Tie one plain-language observation to the figures, such as traffic rising while recorded key events fell. Keep sessions distinct from visitors and key-event counts distinct from the share of sessions that converted. Stop here. Root causes, budget recommendations and cross-source comparisons belong to the action the user chooses next.
