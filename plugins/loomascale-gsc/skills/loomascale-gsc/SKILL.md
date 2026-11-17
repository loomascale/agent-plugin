---
name: loomascale-gsc
description: Analyze the user's connected Google Search Console (GSC) properties with LoomaScale. Use for SEO reports, organic traffic drops, search queries, keyword opportunities, low click-through rate (CTR), average position, URL indexing status and sitemap errors, and to submit, resubmit or remove a sitemap or add or remove a property when the user asks. Do not invoke for general SEO definitions, live rank tracking, website crawling, requesting indexing, or Google Ads and Google Analytics reports.
---

# Google Search Console with LoomaScale

Answer SEO and organic search questions with evidence from the user's connected
Google Search Console (GSC) account: traffic changes, keyword and page opportunities,
low CTR, indexing status and sitemap errors, plus the sitemap and property changes
the user asks for. This package connects to
`https://api.loomascale.com/mcp/gsc`. Inspect
available tool descriptions and input schemas; a client may add a namespace to
the tool names used here.

## Resolve the property

Reuse a property already verified in the conversation. Otherwise call
`gsc_list_sites` and pass `site_url` exactly as listed (`sc-domain:example.com` or a
URL-prefix property). It can be omitted when exactly one property is reachable. If
several fit and the task does not identify one, ask which to use.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| Which properties can I access? | `gsc_list_sites` |
| Why did organic traffic change? | `gsc_compare_periods` |
| Which queries or pages should I improve first? | `gsc_find_keyword_opportunities`, `gsc_find_page_opportunities` |
| Clicks, impressions, CTR or position by query, page, country, device or date | `gsc_query_search_analytics` |
| Is this URL indexed, and which canonical did Google pick? | `gsc_inspect_url` |
| Were my sitemaps processed? | `gsc_list_sitemaps` |
| Submit or resubmit a sitemap | `gsc_submit_sitemap` |
| Remove a submitted sitemap | `gsc_delete_sitemap` |
| Add a property to the user's Search Console | `gsc_add_property` |
| Remove a property from the user's Search Console | `gsc_remove_property` |

Read [Search Console tools](references/search-console.md) for date windows,
filters, pagination and coverage limits.

## Change Search Console only when asked

Reports and diagnosis change nothing. Use a write tool only when the user asks for
that change in the conversation; a finding such as a sitemap error is a reason to
suggest a fix, not to make it.

- `gsc_submit_sitemap`: submit a sitemap URL that already exists on the site, or
  resubmit one after its errors are fixed. Success means Google accepted the
  submission, not that it crawled or indexed the pages; check later with
  `gsc_list_sitemaps`.
- `gsc_delete_sitemap`: name the sitemap and get the user's approval first. It
  removes only the submission, not the file or any page from Google Search. A
  sitemap that is not in the submitted list returns `no_change`.
- `gsc_add_property`: never guess between `sc-domain:example.com` (Domain property)
  and `https://example.com/` (URL-prefix property); ask the user when they give a
  bare domain. Report the `permissionLevel` it returns: an added property stays
  unverified, and cannot be read or changed, until the user verifies ownership in
  Search Console.
- `gsc_remove_property`: call it first without `confirm` (a dry run), tell the user
  what would be removed, and call again with `confirm:true` only after they confirm
  in this conversation. It removes the property from this login's list only, not
  the website, its search data or other users' access.

Writes need Google's full Search Console permission (`webmasters`). If a write tool
says the connection lacks it, pass on the reconnect link it returns.

Nothing requests indexing: Google has no public API for it on normal pages. Say so
when asked, offer `gsc_inspect_url` for the stored index status, and point to URL
Inspection in Search Console to request indexing. No tool changes the website's
content or other Search Console settings.

## Handle access and helper tools accurately

- If authorization is missing, expired or lacks a permission, use the link the
  tool returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
  A refusal that names the user's role is Google judging the login's access, not
  something reconnecting fixes.
- For a usage-limit refusal, call `loomascale_check_quota` once and explain the
  allowance or reset it reports. A usage allowance is not an ad budget.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it
  only when the user asks to send a feature request.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which
  are connected, and which this plugin has tools for. Use it when the user asks
  about other platforms or connecting another service. It is free and connects
  nothing: give the user the link it returns, and say plainly when a source
  needs the full LoomaScale plugin.

## Return a result the user can assess

Name the property and exact dates (Pacific time). Say whether recent partial days are included. Separate observed changes from possible causes, and label click potential as an estimate.
