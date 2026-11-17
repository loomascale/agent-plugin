# LoomaScale measurement and commerce workflows

Use this reference for Google Analytics 4 (GA4), Google Search Console, Google Merchant Center,
and Google Tag Manager. Search Console also submits or removes sitemaps and adds or removes
properties on request; GA4 also changes key events, event rules, enhanced
measurement, data redaction and web streams after the user approves a dry run; Merchant Center also
changes settings, feeds and product attributes on request; Tag Manager also edits a draft
workspace the user names, saves versions and publishes a version the user confirms. Use
tools available in the session; do not infer access from another Google connection.

## Choose the right account and evidence

| Integration | Discover once | Argument to reuse |
| --- | --- | --- |
| GA4 | `ga4_get_account_summaries` | `property_id`: listed number or `properties/<number>` |
| Search Console | `gsc_list_sites` | `site_url`: listed `sc-domain:example.com` or URL-prefix property |
| Merchant Center | `gmc_list_accounts` | `account_id`: listed numeric Merchant Center account ID |
| Tag Manager | `gtm_list_containers` | `container`: listed public `GTM-…` ID, name, or API path |

Search Console, Merchant Center, and Tag Manager can omit the target argument when exactly
one target is reachable. GA4 requires `property_id`. Reuse a verified target throughout a task;
Google Ads customer IDs, GA4 property IDs, and Merchant Center account IDs are different resources.

## GA4: traffic, attribution, funnels, or now

Call `ga4_get_property_details` with `property_id` for the property's time zone and currency;
report dates use that zone. Read `ga4_list_property_annotations` before explaining a change.

| User intent | Tool and scope |
| --- | --- |
| Traffic, engagement, landing pages, key events, revenue | `ga4_run_report`: `property_id`, `date_ranges`, `metrics`; optional `dimensions`, filters, and ordering |
| Ad cost, attributed conversions, ROAS | `ga4_run_conversions_report`: additionally requires `conversion_spec`; use its restricted dimension/metric vocabulary |
| Ordered steps and drop-off | `ga4_run_funnel_report`: `funnel_steps` of `{name,event}` or `{name,filterExpression}`; provide `date_ranges` and an optional `funnel_breakdown` |
| Activity in the last 30 minutes | `ga4_run_realtime_report`: `property_id`, realtime `metrics`, optional realtime `dimensions`; no date range or custom metrics |

For "Which sources bring engaged visits?", call `ga4_run_report`:

```json
{"property_id":"<listed-property>","date_ranges":[{"startDate":"30daysAgo","endDate":"yesterday"}],"dimensions":["sessionSourceMedium"],"metrics":["sessions","engagedSessions","engagementRate"],"order_bys":[{"metric":{"metricName":"sessions"},"desc":true}],"limit":25}
```

For attribution, use names from the conversions tool schema, such as `sourceMedium`
with `allConversionsByConversionDate` and `returnOnAdSpendByConversionDate`;
`conversion_spec` can be `{"conversionActions":[],"attributionModel":"DATA_DRIVEN"}`
for all conversion events. `LAST_CLICK` is the other supported model. Keep
conversion-date and interaction-date metrics explicitly labeled. Conversions and
funnel reports use Google's Data API alpha surface; handle an API refusal as a
limitation, not evidence of zero conversions.

For "Where does checkout lose users?", use known event names in an ordered
`funnel_steps` list, such as `add_to_cart` then `purchase`, with
`funnel_breakdown:{"breakdownDimension":"deviceCategory"}`. Separate event totals
from users completing ordered steps. For "Are events arriving now?", request
`dimensions:["eventName"]`, `metrics:["eventCount"]` from the realtime tool.

General and conversions reports return one page: `limit` defaults to 100, caps at 1,000,
and `offset` starts at zero. Compare `returnedRows` with `rowCount` before claiming complete
coverage. Preserve `metadata` sampling and data-loss warnings. Omit dimensions for a totals
row; avoid summing users or rates across rows.
Use `ga4_get_custom_dimensions_and_metrics` for this property's custom API names. Before
matching Google Ads campaigns, inspect `ga4_list_google_ads_links` and use customer/campaign
IDs, such as `sessionGoogleAdsCustomerId` and `sessionGoogleAdsCampaignId`. GA4 uses different
conversion attribution from Google Ads and Meta; keep each source's results labeled.

## GA4: changing tracking settings

GA4 configuration writes require Google's `analytics.edit` permission and a Google
login allowed to edit the property. Older read-only connections must reconnect
Google Analytics and grant the requested permissions. Use the connection link
returned by a tool or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
An edit-role refusal requires changing the login's property access in Google Analytics.

Read `ga4_get_tracking_configuration` with the verified `property_id` to inspect
current settings and discover key event, stream and rule IDs. Pass `stream_id` to
inspect one web stream fully; preserve section errors and incomplete coverage.

| Requested change | Tools |
| --- | --- |
| Mark, update or unmark a key event (conversion) | `ga4_mark_key_event`, `ga4_update_key_event`, `ga4_unmark_key_event` |
| Create, update or delete an event create rule | `ga4_create_event_rule`, `ga4_update_event_rule`, `ga4_delete_event_rule` |
| Create, update, delete or reorder event edit rules | `ga4_create_event_edit_rule`, `ga4_update_event_edit_rule`, `ga4_delete_event_edit_rule`, `ga4_reorder_event_edit_rules` |
| Change enhanced measurement | `ga4_update_enhanced_measurement` |
| Change email or URL query-parameter redaction | `ga4_update_data_redaction` |
| Create or update a web data stream | `ga4_create_web_stream`, `ga4_update_web_stream` |

For every write, first call the tool with `dry_run:true`, show the exact property,
stream or rule and proposed field changes, and obtain the user's approval. Then
apply only the approved change and report the returned verification result.
Reporting and investigations never authorize a settings change by themselves.
Event rules affect future incoming events; they do not emit events immediately or
rewrite historical data. A new web stream does not install a tag. These tools
cannot delete properties or streams, install website tracking or publish GTM changes.

## Search Console: finalized organic search evidence

The default reporting window is 28 days ending three days ago in Pacific time
(`America/Los_Angeles`), with finalized data. Use `start_date` and `end_date`
(`YYYY-MM-DD` or relative dates). The general query's `data_state:"all"` includes
recent partial days; label them explicitly. The backend rejects starts older than
the supported 16-month history. These are organic search results.

- "Why did organic traffic fall?" → `gsc_compare_periods` without dimensions for
  totals, then with `dimensions:["page"]` or `["query"]` to locate losses. The
  previous window defaults to the same length immediately before the current one;
  provide both `previous_start_date` and `previous_end_date` for another comparison.
- "What should we improve first?" → `gsc_find_page_opportunities`, then
  `gsc_find_keyword_opportunities` with `page` set to a selected URL and
  `exclude_queries_containing` for brand terms. Their `potentialClicks` is an
  estimate from a typical CTR curve, not Google's forecast.
- "Why is this page absent?" → `gsc_inspect_url` with `url` or `urls`, followed by
  `gsc_list_sitemaps` if sitemap discovery or processing is relevant. Inspection
  reads Google's stored index status, canonical, and last crawl; it neither runs a
  live page test nor requests indexing. Inspect at most 10 URLs per call.

Search Console changes happen only when the user asks for them:

- `gsc_submit_sitemap` submits or resubmits an existing sitemap URL. Success means
  Google accepted it, not that pages were crawled or indexed; check with
  `gsc_list_sitemaps` later.
- `gsc_delete_sitemap` removes a submission (not the file or any page from Search).
  Name the sitemap and get approval first; an unsubmitted sitemap returns `no_change`.
- `gsc_add_property` takes the exact form, `sc-domain:example.com` or
  `https://example.com/`; ask the user rather than guess. Report the returned
  `permissionLevel`: the property stays unverified until the user verifies it in
  Search Console.
- `gsc_remove_property` is a dry run by default; call with `confirm:true` only after
  the user confirms. It removes the property from this login's list only.

Writes need the `webmasters` permission; when a tool says it is missing, give the
user its reconnect link. Requesting indexing is not possible (Google has no public
API for normal pages): point to URL Inspection in Search Console.

For "Which mobile queries reach this page?", call `gsc_query_search_analytics`:

```json
{"site_url":"<listed-property>","dimensions":["query"],"filters":[{"dimension":"page","operator":"equals","expression":"https://example.com/pricing"},{"dimension":"device","operator":"equals","expression":"MOBILE"}],"row_limit":100}
```

Replace the example URL with the user's URL inside the selected property. Filters
are ANDed. `search_type` defaults to `web`; Discover and Google News do not support
a query dimension. `row_limit` defaults to 100 and caps at 5,000; continue with
`start_row = startRow + returnedRows`. Query `totals` cover returned rows only.
Comparisons with dimensions and opportunity tools read up to 10,000 rows per
underlying query; describe coverage and do not call their sums whole-site totals.
Use a separate query without dimensions when whole-property totals are needed,
preserving the intended filters and aggregation.

## Merchant Center: health before product performance

For "Why aren't my products showing?", call `gmc_get_account_health` first, then `gmc_query`
on `product_view` for affected products. Health accepts optional `reporting_context` such as
`SHOPPING_ADS` or `FREE_LISTINGS` and a two-letter `country` such as `US`. Keep destination/country
counts separate: health totals sum those rows and do not establish a unique product count.

Pass disapproval MCQL as `query` with the verified `account_id`:

```sql
SELECT id, offer_id, title, aggregated_reporting_context_status, item_issues FROM product_view WHERE aggregated_reporting_context_status = 'NOT_ELIGIBLE_OR_DISAPPROVED' LIMIT 50
```

For "Which products earn paid clicks?", specify the performance view and surface:
```sql
SELECT offer_id, title, clicks, impressions, click_through_rate FROM product_performance_view WHERE date DURING LAST_30_DAYS AND marketing_method = 'ADS' ORDER BY clicks DESC LIMIT 50
```

`product_view` describes the current catalog and takes no date range; `product_performance_view`
requires a date filter. `marketing_method` distinguishes `ADS` from `ORGANIC`; its conversion
metrics cover free listings only. Do not use them as paid conversion totals. Price benchmarks
and Market Insights reports may require Market Insights to be enabled in Merchant Center.

Read `gmc_query`'s embedded view/field catalog before constructing another query:
its markers identify fields required in SELECT/WHERE or allowed only in WHERE.
MCQL uses one SELECT and one view with AND conditions; do not use joins, OR or
semicolons. Select a metric before filtering it; order by a selected field. The
default LIMIT is 100, maximum 1,000. Inspect returned `query` and `truncated`;
there is no paging argument, so narrow filters when coverage is capped. Fields
return in camelCase; money is `{amountMicros,currencyCode}`, divided by 1,000,000.
## Merchant Center: changing settings, feeds and products

Read before writing, and name the account explicitly when the login reaches more than one.

1. `gmc_get_account_settings` first: it shows the current account name, language, time zone,
   business address, customer-service contact, website and claim status, autofeed state and
   the connected login's role. Account, business-info, website and autofeed changes need
   `ADMIN`; product and feed changes need `STANDARD` or `ADMIN`. A refused change names the
   role; reconnecting never helps.
2. Account settings → `gmc_update_account` (`account_name`, `language_code`, `time_zone`,
   `adult_content`). Business address and customer service → `gmc_update_business_info`
   (address fields merge into the current address; `customer_service_phone` in E.164 form).
   The account's own verified phone is read-only through the API.
3. Website → `gmc_update_homepage` with `uri`: the default call is a dry run that reports the
   current site and claim; call again with `confirm:true` only after the user confirmed the
   exact URL. Then `gmc_claim_homepage` (default `overwrite:false`); a verification refusal
   means the site must be verified for that Google login first. Pass `overwrite:true` only
   when the user explicitly asked to move the claim from their other Merchant Center account;
   that call is a dry run, and `overwrite:true` + `confirm:true` takes the claim only after the
   user approved it. `gmc_update_autofeed_settings` is a dry run too until `confirm:true`.
4. Feeds → `gmc_list_data_sources` shows every source with `input` (API, FILE, UI, AUTOFEED),
   `writable` and `fetchable`. `gmc_update_data_source` changes a fetched file's or Google
   Sheet's schedule and URL (`fetch_*` arguments) and any source's `display_name`; a fetch
   login (username/password) is set in Merchant Center, never passed here;
   `gmc_fetch_data_source` is "Fetch now" for fetched sources; `gmc_get_data_source` shows the
   latest processed file and its row issues afterwards. Feed rules, labels, countries and
   destinations are not changed by any tool.
5. Product attributes → `gmc_get_product` (by `product_id` `contentLanguage~feedLabel~offerId`
   or by `offer_id` + `content_language` + `feed_label`) shows `patchable`. Only a product
   whose data source is an API source can be patched: `gmc_update_product_input` with the
   attributes to change (`link`, `title`, `price` + `currency`, `availability`, …). A product
   from a file, sheet, shop connection or the UI is refused with the source-of-truth
   explanation — tell the user to change it where the feed comes from, or offer the
   supplemental path: `gmc_create_data_source` (`kind: supplemental`), the user links it to
   the primary source in Merchant Center, then `gmc_insert_product_input` with the same
   `offer_id`, `content_language` and `feed_label` and only the overriding attributes.
   Both product writes are dry runs unless `confirm: true`: the first call returns current →
   proposed values and changes nothing. Show them to the user (price and availability go live
   in Shopping ads once processed) and repeat the call with `confirm: true` only after the
   user approves those exact values.
   Every product write is processed asynchronously: report it as submitted and verify with
   `gmc_get_product` a few minutes later, never as "live now".
6. Shipping (`gmc_get_shipping_settings`) and return policies (`gmc_list_return_policies`)
   are read-only; changes are made in Merchant Center.

Nothing deletes a product, feed, policy or claim. No tool takes or shows a feed password.

## Tag Manager: published configuration and unpublished work

For "Is conversion tracking configured correctly?" →
`gtm_audit_tracking`, then `gtm_list_tags` and `gtm_list_triggers_variables` for
specific findings. The audit can cross-check connected Google Ads website
conversion actions using `google_ads_account_id`; imported GA4, offline, call,
and app conversions are not expected as website tags. `skip_google_ads:true`
limits the audit to the container. `scope:"workspace"` with `workspace` audits a
draft instead of the published version (use it after draft fixes to show what
the live version will look like). Each finding carries `id` (stable across runs
and renames), `confidence` (confirmed / likely / unverified) and `categories`
(draft / review / external / info); quote the confidence when it is not
confirmed, and never propose deleting an "unused" trigger or variable while
`evidenceComplete` is false. A conversion action is `UNRESOLVED`, not missing,
when a variable-driven tag might send to it.

For "Is the fix live?", read `gtm_get_container` and `gtm_get_workspace_status`.
Container, tag, and trigger reads describe the published version unless `workspace`
names a draft on `gtm_list_tags` / `gtm_list_triggers_variables`, which then read that
workspace's own entities (answer carries `scope`, `workspaceName`, `complete`); workspace status
describes unpublished changes and merge conflicts. Live versions are cached for
10 minutes: use `fresh:true` on a live-version read after the user publishes.
Check `liveVersionId` and `fromCache`. Workspace status reads three workspaces by
default, at most 10 through `max_workspaces`; the audit reads up to three when
`include_workspaces` is true. State `workspacesRead` versus `workspaceCount`.

Use `gtm_list_versions` for names, history and which version is live (`live:true`);
Google supplies no publish timestamps in this list. `gtm_list_workspaces` names the
container's workspaces; `gtm_list_triggers_variables` also lists the enabled built-in
variables.
Configuration findings do not prove runtime firing, consent behavior, or page installation.
A missing tag may be installed directly or in another container; variable-derived conversion
IDs/labels may be unevaluable. Recommend page/runtime verification for those gaps.
The read tools cannot edit or publish a container.

### Tag Manager: fixing what the audit found (drafts, versions, publishing)

The Tag Manager connect asks Google for reading, editing, versions and publishing in
one consent. A tool that needs a permission the stored grant lacks (the user unticked
it, or connected before it was asked for) says so: tell the user to reconnect Google Tag
Manager on the connections page with every box ticked. A refusal that names the user's
role ("role denied") is Google judging the login's container permission, fixed under
Admin > User management in Tag Manager, not by reconnecting.

Every edit needs `workspace`: the existing workspace the user chose. Call
`gtm_list_workspaces`, ask which one, and never pick one yourself; `gtm_create_workspace`
only when the user asks for a new one by name (a free container holds three). When
`gtm_get_workspace_status` or `gtm_create_version` says the workspace is behind the live
version or has merge conflicts, run `gtm_sync_workspace` (Tag Manager's Update: merges the
latest version in, keeps the draft's edits). Conflicts it reports — the same entity changed
on both sides, with the differing fields named — are resolved only by the user in Tag
Manager; never suggest keeping the workspace copy blindly, that overwrites what someone
else published. A draft goes live in two separate steps, each on the user's word: `gtm_create_version` saves the
workspace as a named version (nothing live yet; say so, give the `workspaceUrl` or
version link, recommend Preview), then `gtm_publish_version` with `confirm:false` shows
what would replace the live version, and only after the user explicitly confirms that
version id do you call it with `confirm:true`. Never publish without that confirmation,
never publish "the latest" without naming the id, and report the `liveVersionIdAfter`
and `verified` fields from the answer, not the call's success. Keep the previous live
id in the conversation: a rollback is publishing it again.

Triggers on clicks, forms, scrolling or video need Google's built-in variables enabled
(`{{Click URL}}`, `{{Form ID}}`, …): check `builtInVariables` in
`gtm_list_triggers_variables` and enable missing ones with
`gtm_enable_built_in_variables` before creating the trigger.

Typical sequence for a missing Google Ads conversion: `gads_list_conversion_actions`
for the conversion id and label, `gtm_create_trigger` for the thank-you page
(`PAGEVIEW` with a `Page URL contains` condition) unless a suitable trigger exists, then
`gtm_create_tag` with `type: GOOGLE_ADS_CONVERSION`. For a tag that never fires, fix its
trigger with `gtm_update_trigger` (`conditions`) or reattach it with `gtm_update_tag`
(`firing_triggers`). For a duplicate GA4 configuration or Google tag, pause the extra
one with `gtm_update_tag` (`paused: true`). To remove a draft tag, trigger or variable
for good (a test entity, a duplicate the user wants gone), confirm it with the user and
call `gtm_delete_entity` (`entity_type` + `entity`); it refuses anything still referenced
or built in, and the deletion goes live only with a published version. Tag kinds created
or edited: GA4 event, Google tag, Google Ads conversion; variable kinds: constant, data
layer, URL, cookie, JavaScript variable, lookup table. Custom HTML and custom
JavaScript are not offered: say so and leave those to the user.
