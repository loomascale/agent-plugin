# LoomaScale advertising workflows

Use this guide for Google Ads, Meta Ads (Facebook and Instagram), TikTok Ads and
LinkedIn Ads.
For connected-account work, resolve the advertiser with its discovery tool and
pass the explicit account ID. For public competitor ads, follow
[competitor ad research](../../competitor-ad-research/SKILL.md): it uses public
advertiser/Page IDs and does not require access to the competitor's ad account.
Use the current tool schema for parameters, supported campaign types and limits.

## How should paid performance be reviewed?

| User task | Smallest useful sequence |
|---|---|
| Find paid-spend waste | Google: `gads_audit_portfolio` scoped to requested accounts, then relevant search terms/ads; Meta: `meta_get_insights` with campaign/ad detail; TikTok: `tiktok_get_performance` at ADGROUP and AD level, then `tiktok_get_creative_performance` and `tiktok_get_adgroup_diagnostics` for the spenders without conversions; LinkedIn: `linkedin_audit_wasted_spend`. Check each audit's actual reporting window. |
| Explain a CPA/ROAS change | Relevant platform insights for totals and comparison, then the largest changing campaigns/segments; use the [cross-source skill](../../cross-source-insights/SKILL.md) for GA4 outcomes and attribution. |
| Diagnose no delivery | Google: `gads_check_pacing`, `gads_check_billing`, campaign/ad status; Meta: `meta_get_delivery_issues`, `meta_check_pacing`, then affected objects; TikTok: `deliveryStatus` from `tiktok_get_campaigns` / `tiktok_get_adgroups` / `tiktok_get_ads` (review rejections appear there), then `tiktok_get_adgroup_diagnostics`. Check parent status and eligibility. |
| Research Google Ads keywords | `gads_keyword_ideas` for suggestions and volume/bid estimates; review `gads_list_keywords` and `gads_list_search_terms` for the existing account. The ideas tool returns its first page only. |
| Review creative fatigue | Meta ad-level insights and `meta_list_ads`, then `meta_list_creatives`/`meta_get_ad_preview` for identified objects. Frequency and declining results suggest a test, not proof of fatigue. |
| Review TikTok video creatives | `tiktok_get_creative_performance` (per ad, or `group_by:"VIDEO"`) for 2-second and 6-second view rates, completion and cost per conversion; `tiktok_get_ad_creative` for the caption, call to action, landing page and a temporary preview link. A weak `hookRate` points at the opening, a strong hook with weak conversions at the offer or landing page. |
| See who TikTok spend reaches | `tiktok_get_audience_performance` with one `breakdown` per call (AGE, GENDER, COUNTRY, PLACEMENT, PLATFORM, LANGUAGE, NETWORK, INTEREST); compare with the targeting in `tiktok_get_adgroups` and the audiences in `tiktok_list_custom_audiences`. Segments are directional. |
| Review B2B lead quality | `linkedin_get_insights` with `metric_set="leads"` for entity-level lead metrics, then `linkedin_analyze_demographics` for the requested industry/seniority breakdown. Demographics expose leads/conversions, not qualified leads; do not assign entity-level `qualifiedLeads` to industries. CRM evidence is needed for qualified pipeline by industry. |

For any `gads_query`, first follow the [metadata preflight](../../cross-source-insights/SKILL.md#ground-every-custom-google-ads-query).
Do not guess GAQL fields or use the query tool as a write endpoint.

## Which reporting details change the interpretation?

- Google Ads standard insights use `since`/`until` and uppercase presets; some
  portfolio tools use `start_date`/`end_date`. Reports follow the account time zone.
- Meta uses `since`/`until` and lowercase presets. `time_increment` is a string
  such as `"1"`, `"7"`, `"monthly"` or `"all_days"`. Pair `platform_position`
  with `publisher_platform` for placement analysis. Inspect action types/windows
  before labeling a count as purchases or leads.
- TikTok uses `start_date`/`end_date` (YYYY-MM-DD, days in the ad account's time
  zone; default the last 30 days). `granularity` DAY spans at most 30 days, WEEK 180,
  MONTH and TOTAL 365. Metrics arrive under TikTok's own names; `null` means TikTok
  has no value, not zero. `conversion` is the ad group's optimisation event and
  `result` the objective's result, so do not equate either with another platform's
  conversion without checking the event. `hasMore:true` means the page is partial.
  Amounts are in the ad account's currency (`tiktok_get_ad_account`).
- LinkedIn uses UTC; supply `since` and `until` together. `metric_set` selects
  core, conversions, leads, video or engagement metrics; `time_increment` is
  `all`, `daily` or `monthly`. Demographics can be delayed, approximate, suppressed
  and limited to top values; demographic subtotals need not equal campaign totals.
- Money inputs for budget tools are major units in the account currency. Follow
  each response's units: raw Google GAQL costs use micros, typed costs need not.

## How can I check Meta Pixel (Facebook Pixel) and Conversions API health?

These checks read the connected Meta ad account's accessible datasets/pixels;
they do not install pixels, send events or change tracking settings.

1. Call `meta_list_datasets` to discover datasets/pixels, last received event
   times and custom conversion rules. Reuse the intended `dataset_id`.
2. Call `meta_list_datasets` with that ID for received event counts over the
   last 1-7 days (default 7). Compare `event_source: "WEB_ONLY"` for browser
   Pixel events with `event_source: "SERVER_ONLY"` for Conversions API events.
   Omit the filter for both. These counts cannot cover an older reporting period.
3. Call `meta_get_dataset_quality` with that ID for Meta's per-event Event Match
   Quality (EMQ), match-key coverage, diagnostics and available browser/server
   coverage, deduplication-key, upload-delay and value/currency feedback.
4. Distinguish permission limits and absent server data from zero events or poor
   quality. Different browser/server counts alone do not prove duplication;
   inspect deduplication feedback. Received events do not establish attributed
   conversions or prove that every page's Pixel fires correctly.

## How should an authorized campaign change be completed?

1. Read the current target and affected parents/siblings. Resolve exact IDs,
   requested values and the account currency. Use an existing authorization when
   it covers the action; ask only for a material unresolved choice.
2. Select the narrowest tool. A copy edit, budget change, targeting edit and status
   change are different actions. Preserve omitted settings and inspect whether an
   array replaces the entire existing list before sending it.
3. Execute the authorized change. Treat edits to running objects as immediate.
   Respect upstream manage permission and server caps; do not invent a `dry_run`
   or `confirmed` argument on tools that lack it.
4. Read the target back with the appropriate campaign/ad/keyword/asset-group tools.
   Report resulting configuration and status. Check policy, parent status and
   delivery issues before saying it is serving. Reconcile an uncertain write before
   retrying; creations are not safely repeatable by default.

### Create or launch campaigns

Google: use `gads_create_campaign` for Search,
`gads_create_shopping_campaign` for Standard Shopping or
`gads_create_pmax_campaign` for Performance Max.
Check the current schema rather than assuming every campaign type is supported.
Resolve intended locations with `gads_find_locations` and include the intended
language settings where supported. Omitting location targeting defaults to
worldwide; Search also defaults to all languages. Removing the final criterion
can expand reach. Resolve this scope before creating or editing targeting.
Geographic targets can include people interested in a location as well as those
present there. Search creation does not expose a location-presence option; if
the user's request requires presence-only reach, use
`gads_update_campaign_targeting` on the paused campaign and verify the setting
before any authorized activation.

Meta: use `meta_create_campaign` for the supported full campaign flow, or
`meta_create_campaign_only` → `meta_create_adset` → `meta_create_ad` for an
intentional staged build. Resolve identity with `meta_list_pages` and, for
Instagram identity, `meta_list_instagram_accounts`. Check `meta_list_datasets`
for website conversion campaigns and select the intended event; for a low Event
Match Quality or a Conversions API question, read `meta_get_dataset_quality` and
compare `meta_list_datasets` counts with `event_source` WEB_ONLY vs SERVER_ONLY
(different counts do not prove duplication — check its dedupe feedback). Inspect existing
creatives before uploading or recreating media.

These campaign/ad creation flows create paused objects. Use
`gads_activate_campaign`/`meta_activate_campaign` for campaigns created through
this server. `meta_activate_campaign` previews first (`confirmed:false`); show the
budget and call with `confirmed:true` only after the user approves. Activation must be covered by the user's instruction; a request for
a draft ends at a verified paused configuration. For existing objects use
`gads_set_status` (`ENABLED`/`PAUSED`) or `meta_set_status` (`ACTIVE`/`PAUSED`).

An enabled child under a paused parent will not serve. A saved active status also
does not prove impressions have begun. New ads can await platform review.

### Change budgets or targeting

Google campaign daily budget: `gads_update_budget`; first establish whether it is
shared or a total budget. Shared budgets use `gads_update_shared_budget`: read all
affected campaigns before editing the shared amount or membership. The invoiced
account-level total cap uses `gads_update_account_budget`, with its own cap; it
is not a campaign daily budget.

Meta: determine whether the campaign or ad set owns the daily budget, then use
`meta_update_budget`. Do not convert a lifetime budget into a daily budget by
guessing. Daily caps are validation limits on supported daily amounts; they are
not a guarantee of actual daily spend, a portfolio ceiling or a universal guard
for lifetime-budget objects. Reallocation needs a current read of both sides and
verification of both writes; a multi-call change is not atomic.

For Meta targeting, inspect `meta_get_adset` or `meta_list_campaigns` with
targeting included; resolve region/city keys through `meta_find_locations`.
Exact lists and add/remove operations have different replacement semantics.
Preserve unrelated targeting and note that a change can restart learning.

### Boost a post, run an experiment or remove an object

- `meta_boost_instagram_post`: preview with `confirmed=false`, inspect the
  resolved post/identity/ad set, then use `confirmed=true` within the authorized
  scope. Creation returns a paused ad; activation remains separate.
- `meta_create_ab_test` and `meta_create_lift_study` can alter live audience
  allocation immediately. Do not apply the paused-campaign assumption to
  experiments. `meta_end_ab_test` retains results; `meta_cancel_ab_test` deletes
  the study and its results, after a `confirmed:false` preview and the user's approval. Use the action the user requested.
- Prefer a reversible pause when the task is to stop serving. If deletion was
  requested, inspect current objects and the tool's prerequisites. Removal tools
  can require paused status and exact-name confirmation, such as
  `gads_remove_campaign.confirm_campaign_name` or `meta_delete_object.confirm_name`.
  A campaign deletion can cascade to children. Respect the existing authorized
  scope and explain any tool refusal.

TikTok Ads changes are limited to existing objects: `tiktok_set_status` (ENABLED or
DISABLED; it cannot delete), `tiktok_update_budget` (the amount only; the budget
stays daily or lifetime, and an object with no budget of its own is refused),
`tiktok_update_bidding` (only the bid the ad group's strategy already uses) and
`tiktok_rename_object`. Call each with `dry_run:true`, show the proposed change, and
repeat without it after approval. They work on manual, Smart+ and Upgraded Smart+
campaigns; an Upgraded Smart+ ad is addressed by its `smartPlusAdId`. There is no
TikTok campaign, ad group or ad creation: recommend it for TikTok Ads Manager.

LinkedIn Ads has no campaign-management tools in LoomaScale. Return a concrete
recommended change with the affected account/campaign; do not claim execution.
