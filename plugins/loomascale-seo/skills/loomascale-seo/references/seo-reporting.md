# SEO reporting with Search Console and GA4

## Organic visitors in GA4

Filter `ga4_run_report` to organic search with `dimension_filter` on
`sessionDefaultChannelGroup` equal to `Organic Search`. A landing-page report:

```json
{
  "property_id": "<listed-property>",
  "date_ranges": [{"startDate": "28daysAgo", "endDate": "yesterday"}],
  "dimensions": ["landingPagePlusQueryString"],
  "metrics": ["sessions", "engagementRate", "keyEvents"],
  "dimension_filter": {"filter": {"fieldName": "sessionDefaultChannelGroup", "stringFilter": {"matchType": "EXACT", "value": "Organic Search"}}},
  "order_bys": [{"metric": {"metricName": "sessions"}, "desc": true}],
  "limit": 50
}
```

`Organic Search` covers every search engine, not only Google. Use `ga4_get_custom_dimensions_and_metrics`
for registered custom names. Reports return one page: compare `returnedRows` with
`rowCount` and label a capped table as partial.

## Joining the two sources by page

Search Console reports full URLs (`https://example.com/pricing`); GA4 reports paths
(`/pricing`, with a query string in `landingPagePlusQueryString`). Match on the path, drop
query strings and trailing slashes, and say which pages could not be matched.

The numbers will not agree: a Search Console click is not a GA4 session (consent banners,
blocked scripts, redirects and other search engines all differ). Compare ranks and
ratios, not totals.

## Opportunities

- `gsc_find_keyword_opportunities` returns striking-distance queries (average position 4
  to 20) and low-CTR page-one queries. Potential clicks are an estimate from typical CTR by
  position. Exclude the brand name: brand queries rank first and are not opportunities.
- `gsc_find_page_opportunities` does the same per page.
- Average position is an impression-weighted average, not a live rank.

## Traffic drops

Use `gsc_compare_periods` with adjacent periods of final data (ending three days ago). If
clicks fell with impressions, demand or rankings fell; if clicks fell while impressions
held, look at CTR, titles and SERP features. Check `ga4_list_property_annotations` and
`gsc_inspect_url` on the top losing pages before naming a cause.
