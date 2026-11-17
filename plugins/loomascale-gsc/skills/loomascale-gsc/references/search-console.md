# Google Search Console tools

Shared with the all-in-one LoomaScale plugin's measurement reference; keep both in step.

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
