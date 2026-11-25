# LoomaScale read-only tool map

Verified against the LoomaScale MCP tool catalog on 2026-11-24. Treat these as *capability examples*, not dependencies: use the current tool catalog exposed by the host, and skip inaccessible tools without inventing results. Tool prefixes/names can vary by host or distribution.

## Discovery / reporting scope

| Question | Available tools |
| --- | --- |
| Which integrations are connected? | `loomascale_list_data_sources` |
| Which ad accounts can be read? | `gads_list_ad_accounts`, `meta_list_ad_accounts`, `tiktok_list_ad_accounts`, `linkedin_list_ad_accounts` |
| Which GA4, GTM, GSC, GMC resources exist? | `ga4_get_account_summaries`, `gtm_list_containers`, `gsc_list_sites`, `gmc_list_accounts` |
| Which Meta datasets exist? | `meta_list_datasets` |

Pass explicit account/property IDs on data reads. Avoid `*_select_account` when not needed: selection mutates a shared default and can affect concurrent sessions. Filter out manager-only accounts and disabled/test accounts unless relevant.

## Baseline / comparisons

| Platform | Main reports | Details |
| --- | --- | --- |
| Google Ads | `gads_get_insights`, `gads_compare_accounts`, `gads_list_campaigns` | Account/campaign/ad group/ad/keyword; device/hour/network; optional impression share |
| Meta Ads | `meta_get_insights`, `meta_compare_accounts`, `meta_list_campaigns` | Account/campaign/ad set/ad; placement/device/age/gender/country; daily time increment |
| TikTok Ads | `tiktok_get_performance`, `tiktok_get_campaigns` | Account/campaign/ad group/ad; daily/weekly/monthly trends, pagination |
| LinkedIn Ads | `linkedin_get_insights`, `linkedin_list_campaigns` | Account/group/campaign/creative; previous-period comparison and daily trend |
| GA4 | `ga4_run_report`, `ga4_run_conversions_report`, `ga4_run_funnel_report` | Date-range comparisons, traffic/event/funnel breakdowns |

For Google Ads custom reporting, use `gads_query` (GAQL); inspect fields with `gads_get_resource_metadata` when uncertain. Prefer typed tools. `gads_compare_accounts` and `meta_compare_accounts` cover **up to 25 accounts per call** and flag truncation/skips; they do not prove that all reachable accounts were read.

## Investigation / evidence

| Investigation | Relevant tools |
| --- | --- |
| Google portfolio waste | `gads_audit_portfolio` (up to 15 accounts), `gads_list_search_terms`, `gads_get_insights`, `gads_list_ads`, `gads_list_keywords`, `gads_get_geo_insights`, `gads_get_audience_insights`, `gads_check_pacing` |
| Meta weak delivery / ads | `meta_get_insights`, `meta_list_ads`, `meta_list_creatives`, `meta_get_delivery_issues`, `meta_check_pacing`, `meta_list_audiences` |
| TikTok diagnostics | `tiktok_get_adgroup_diagnostics`, `tiktok_get_creative_fatigue`, `tiktok_get_creative_performance`, `tiktok_get_ad_review`, `tiktok_get_performance` |
| LinkedIn waste / audience | `linkedin_audit_wasted_spend` (up to 5 accounts), `linkedin_get_insights`, `linkedin_analyze_demographics`, `linkedin_list_creatives` |
| Google conversion setup | `gads_list_conversion_actions` |
| GA4 tracking setup | `ga4_get_tracking_configuration`, `ga4_run_report`, `ga4_run_realtime_report` |
| GTM tags / audit | `gtm_audit_tracking`, `gtm_list_tags`, `gtm_list_triggers_variables`, `gtm_list_versions` |
| Meta Pixel / CAPI | `meta_list_datasets`, `meta_get_dataset_quality` |
| TikTok Pixel | `tiktok_get_pixel_events` |
| Organic landing-page context, if relevant | `gsc_compare_periods`, `gsc_query_search_analytics`, `gsc_find_page_opportunities` |
| Merchant feed issues, if relevant | `gmc_get_account_health`, `gmc_query` |

The existing `gads_audit_portfolio`, `linkedin_audit_wasted_spend`, and `gtm_audit_tracking` return useful scoped findings; treat them as leads to verify, not a replacement for stages 2–5. LinkedIn's audit defaults to its own last-30-days window; disclose a different window if it cannot be aligned with the requested period.

## Output and API traps

- **Pagination/truncation:** `gads_get_insights` and `gads_list_search_terms` cap rows; `gads_query` defaults to `LIMIT 100` and caps at 1,000; `ga4_run_report` pages by `offset`; TikTok reports `hasMore` and `page`; portfolio tools may report `truncated` / `skipped`. Check all flags before declaring rankings exhaustive.
- **Money:** typed Google Ads/Meta/TikTok/LinkedIn metrics generally return account-currency major units. `gads_query` returns `metrics.cost_micros` (divide by 1,000,000). Google/Meta portfolio comparators return `*MinorUnits` and `*UsdCents`: preserve their units and convert by the currency's ISO exponent; do not casually divide every minor-unit field by 100.
- **Percentages:** Google Ads typed CTR is a 0–1 ratio; Meta CTR and TikTok CTR are typically percentages. Normalize before charting or comparing.
- **Conversion semantics:** Meta breakdowns can omit conversion metrics (see `conversionMetricsUnavailable`); LinkedIn can flag unavailable conversion metrics; TikTok can return null metrics. Omitted does not mean zero. Conversion attribution across ad platforms and GA4 differs.
- **Time and freshness:** TikTok day-level data is limited to 30 days; Meta event counts in `meta_list_datasets` cover up to 7 days; TikTok pixel event window is up to 30 days. Ad account, GA4, GSC and LinkedIn reporting time zones may differ.
- **Optional business context:** Use Search Console or Merchant Center for relevant landing-page/Shopping diagnostics, not as substitute ad-conversion evidence. Public ad-library tools may be used for creative comparisons if explicitly relevant, never as proof of competitor performance.
