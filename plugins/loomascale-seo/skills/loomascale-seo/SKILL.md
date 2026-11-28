---
name: loomascale-seo
description: Improve SEO with the user's connected Google Search Console and Google Analytics 4 data through LoomaScale. Use for queries close to page one, low click-through rate, organic traffic drops, which pages gain or lose clicks, URL indexing and canonical status, sitemap errors and submissions, and what organic visitors do and convert on by landing page. Do not invoke for writing content, crawling a website, live rank tracking, requesting indexing, keyword search volume, or paid ads.
---

# SEO with Search Console and GA4 in LoomaScale

Answer SEO questions with evidence from the user's own Google Search Console (GSC) data,
and from Google Analytics 4 (GA4) when it is connected. This package connects to
`https://api.loomascale.com/mcp/seo`. Inspect available tool descriptions and input
schemas; a client may add a namespace to the tool names used here. Live schemas take
precedence over this guide.

## Resolve the property

Search Console: reuse a property already verified in the conversation, or call
`gsc_list_sites` and pass `site_url` exactly as listed (`sc-domain:example.com` or a
URL-prefix property). GA4: call `ga4_get_account_summaries` and pass `property_id`. Match
the two by the site's domain, and ask when several fit.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| Which queries or pages should I improve first? | `gsc_find_keyword_opportunities`, `gsc_find_page_opportunities` |
| Why did organic traffic change? | `gsc_compare_periods` |
| Clicks, impressions, CTR or position by query, page, country, device or date | `gsc_query_search_analytics` |
| Is this URL indexed, and which canonical did Google pick? | `gsc_inspect_url` |
| Were my sitemaps processed? Submit or remove one | `gsc_list_sitemaps`, `gsc_submit_sitemap`, `gsc_delete_sitemap` |
| Add or remove a Search Console property | `gsc_add_property`, `gsc_remove_property` |
| What do organic visitors do on each landing page? | `ga4_run_report` filtered to organic search |
| Which organic pages drive key events or revenue? | `ga4_run_report`, `ga4_run_conversions_report` |
| Did a site change line up with the drop? | `ga4_list_property_annotations` |

Read [SEO reporting](references/seo-reporting.md) for the GA4 organic filter, how to join
the two sources by page, and what not to over-claim.

## Change Search Console only when asked

Reports change nothing. Use `gsc_submit_sitemap`, `gsc_delete_sitemap`,
`gsc_add_property` or `gsc_remove_property` only when the user asks for that change in the
conversation. Name the sitemap or property and get approval before removing anything;
call `gsc_remove_property` first without `confirm` and again with `confirm:true` only after
the user confirms. No tool here changes GA4, the website or its content.

Nothing requests indexing: Google has no public API for it on normal pages. Offer
`gsc_inspect_url` for the stored status and point to URL Inspection in Search Console.

## Handle access and helper tools accurately

- If authorization is missing or a source is not connected, use the link the tool
  returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
  GA4 questions need GA4 connected; say so and answer from Search Console alone when
  possible.
- For a plan or trial refusal, call `loomascale_get_user` once and explain the plan,
  trial, task or account allowance it reports. On the Free plan (`readOnly: true`) only
  reads work: offer a sitemap or property change as a recommendation. Never retry a
  refusal.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it only when
  the user asks to send a feature request.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which are
  connected, and which this plugin has tools for. It connects nothing: give the link it
  returns, and say plainly when a source needs the full LoomaScale plugin.

## Return a result the user can assess

Name the property and exact dates (Search Console counts in Pacific time). Say whether
recent partial days are included. Separate observed changes from possible causes, and
label click potential as an estimate.
