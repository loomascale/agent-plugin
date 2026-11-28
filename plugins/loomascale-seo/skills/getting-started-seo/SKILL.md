---
name: getting-started-seo
description: Use on a first visit or setup recheck in the LoomaScale SEO plugin. Check the Search Console and GA4 connections, show the queries closest to page one and suggest an SEO question.
---

# Getting started with SEO in LoomaScale

## Check connection and access

On this plugin's `loomascale-seo` connection, call `loomascale_list_data_sources` with
`{}`, then `loomascale_get_user` with `{}`, even when a provider is disconnected. Use the
Google Search Console and Google Analytics 4 rows with `tools_in_current_plugin: true`. A
focused plugin normally returns `all_sources: false`. Keep in-chat tasks scoped to SEO.

Proceed with an active trial, the Free plan, a paid plan or legacy access. The Free plan
(`readOnly: true`) allows reads within a weekly task allowance, so run the snapshot without
asking the user to pay first. For a pending trial, tell the user before the first metered
read that it starts the trial. If a plan is required, show the returned plan link. If a
check fails, offer sign-in or retry.

Search Console is required. For `not_connected`, offer **🔎 Connect Google Search Console**
with its returned `connect_url` verbatim, falling back to `connections_url` or the
[LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use
**Reconnect** for `needs_attention` and **Recheck** for an unknown status.

GA4 is optional. When it is not connected, mention once, after the snapshot, that
connecting **📊 Google Analytics 4** with its returned `connect_url` adds what organic
visitors do on each page.

## Which searches can I win?

Call `gsc_list_sites` and reuse the intended property or the sole eligible one; pass
`site_url` exactly as listed. If several unrelated properties fit, ask which one.

Call `gsc_find_keyword_opportunities` with the default window and, when the brand name is
known, `exclude_queries_containing` with it. Show the top five striking-distance queries
in a compact table (query, position, impressions, clicks, potential extra clicks) and one
plain-language observation. Label potential clicks as an estimate. If the property has
too little data, say so and fall back to `gsc_compare_periods` totals.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Place one recommended button
beneath the snapshot: **Improve these pages** when opportunities exist, otherwise
**Why is my traffic flat?**. Then three to five short suggestions under **What else can I
help you with?**:

- **Find pages losing clicks** — Which pages lost the most organic clicks versus the period before?
- **Fix titles that under-earn** — Which page-one queries get far fewer clicks than their position should?
- **Check a page's indexing** — Index status, canonical and last crawl for a URL I choose.
- **Review sitemap errors** — Which sitemaps report errors or warnings?
- **Pages that rank but don't convert** — Organic clicks next to GA4 key events (needs GA4).

Use [SEO with Search Console and GA4](../loomascale-seo/SKILL.md) for selected tasks.
