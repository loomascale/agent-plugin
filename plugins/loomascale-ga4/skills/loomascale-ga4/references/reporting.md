# Google Analytics 4 report inputs and limitations

Use the live tool schema as the source of accepted parameters. These examples
apply to a property already discovered through `ga4_get_account_summaries`.

## Traffic, landing pages, key events and revenue

`ga4_run_report` requires `property_id`, `date_ranges` and `metrics`. Add compatible
`dimensions`, filters and ordering when a breakdown is needed. For traffic source
quality, use this shape, replacing the property placeholder with the verified ID:

```json
{
  "property_id": "<listed-property>",
  "date_ranges": [{"startDate": "30daysAgo", "endDate": "yesterday"}],
  "dimensions": ["sessionSourceMedium"],
  "metrics": ["sessions", "engagedSessions", "engagementRate", "keyEvents"],
  "order_bys": [{"metric": {"metricName": "sessions"}, "desc": true}],
  "limit": 25
}
```

For landing pages, use a compatible dimension such as `landingPagePlusQueryString`;
for revenue, use a supported metric such as `totalRevenue`. Revenue requires
appropriate data to have been collected. Use
`ga4_get_custom_dimensions_and_metrics` to discover registered custom API names.
This tool reads definitions; it does not create them.

Omit dimensions to obtain a property totals row under the intended filters. Users
can appear in several rows, and rates are not additive. Do not sum user counts,
average row rates without their denominators, or present a top-25 table as totals.

General and conversion reports return one page. `limit` defaults to 100 and caps
at 1,000; `offset` begins at zero. Compare `returnedRows` with `rowCount` and fetch
remaining pages when complete coverage is necessary. Preserve returned `metadata`,
including sampling and data-loss warnings. A capped report must be labeled partial.

## Realtime activity and events

`ga4_run_realtime_report` reads the last 30 minutes and accepts realtime metrics
and optional realtime dimensions. It takes no historical date range and no custom
metrics. Use separate reports for these two questions:

- Active users by country: `dimensions:["country"]`, `metrics:["activeUsers"]`.
- Events arriving now: `dimensions:["eventName"]`, `metrics:["eventCount"]`.

Do not combine `eventName` with user-scoped metrics such as `activeUsers`. Describe
the returned aggregate window; it is not an exact current visitor list or proof
that a particular browser fired a tag.

## Funnel completion and drop-off

For `ga4_run_funnel_report`, provide `property_id`, explicit `date_ranges` and ordered
`funnel_steps`, each using `{name,event}` or `{name,filterExpression}`. Use event
names established for the property. For a known ecommerce sequence:

```json
{
  "property_id": "<listed-property>",
  "date_ranges": [{"startDate": "30daysAgo", "endDate": "yesterday"}],
  "funnel_steps": [
    {"name": "Added to cart", "event": "add_to_cart"},
    {"name": "Purchased", "event": "purchase"}
  ],
  "funnel_breakdown": {"breakdownDimension": "deviceCategory"}
}
```

Separate users completing ordered steps from event totals. Explain relevant
open/closed funnel and step conditions from the actual request and response.
Do not invent an ecommerce funnel for a property that does not collect those events.

## Conversion attribution, cost and ROAS

`ga4_run_conversions_report` additionally requires `conversion_spec` and has its
own restricted vocabulary. For example, `sourceMedium` can be combined with
`allConversionsByConversionDate` and `returnOnAdSpendByConversionDate` when the
property supports those data. A specification of
`{"conversionActions":[],"attributionModel":"DATA_DRIVEN"}` requests all
conversion events under that model; `LAST_CLICK` is the other supported model.
Use only the fields accepted by the live schema.

Label conversion-date versus interaction-date metrics and the attribution model.
Check `ga4_list_google_ads_links` for existing links when relevant, but do not infer
access to Google Ads campaign reports from a link. GA4 attribution and advertising
platform attribution describe different measures; do not equate or add them.

Funnel and conversion reports, and property annotations, use Google's alpha API
surfaces. If Google refuses a report, explain its limitation; the refusal is not
evidence of zero users, conversions or revenue. Collected events, permissions,
thresholding, cardinality and processing delays can also affect available results.
