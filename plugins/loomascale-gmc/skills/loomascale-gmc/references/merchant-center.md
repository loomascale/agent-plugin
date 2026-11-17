# Google Merchant Center tools

Shared with the all-in-one LoomaScale plugin's measurement reference; keep both in step.

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
