---
name: getting-started-gsc
description: Use on a first visit or setup recheck in the LoomaScale Google Search Console plugin. Compare organic clicks and impressions and suggest a search question.
---

# Getting started with Google Search Console in LoomaScale

## Check connection and access

On this plugin’s `loomascale-gsc` connection, call `loomascale_list_data_sources` with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected. Use the Google Search Console row with `tools_in_current_plugin: true`. A focused plugin normally returns `all_sources: false`. Keep reporting and in-chat tasks scoped to this source. Save the full catalog for the dashboard links below.

Proceed with an active trial, the Free plan, a paid plan or legacy access. The Free plan (`readOnly: true`) never expires and allows reads within a weekly task allowance, so run the snapshot without asking the user to pay first, and offer changes as recommendations only. For a pending trial, tell the user before the first metered read that it starts the trial. With no connection, leave it pending. If a plan is required, show the returned plan link. If a check fails, offer sign-in or retry. Only start account discovery after verifying the provider connection and access. For any other state, show setup or a preview.

For `not_connected`, offer **🔎 Connect Google Search Console** to see how often search impressions turn into visits. Use the [Google Search Console icon](https://loomascale.com/icons/google-search-console-icon.webp) inside the button, or the glyph in text chat. Use its returned `connect_url` verbatim, falling back to `connections_url` or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use **Reconnect** for `needs_attention` and **Recheck** for an unknown or unavailable status. Let the user open the link, then offer **Recheck setup** to refresh both checks.

## How did my site do in Google Search?

Discover properties with `gsc_list_sites`. Reuse the intended property or the sole eligible one. Pass `site_url` exactly as listed, including `sc-domain:` or the full URL prefix. If several unrelated properties fit, offer a property choice and resume on selection.

Call `gsc_compare_periods` once without dimensions for whole-property totals. Set `start_date`, `end_date`, `previous_start_date` and `previous_end_date` for two adjacent seven-day periods of final data, normally ending three days ago in Pacific time. Show both ranges, organic clicks and impressions. If useful, compute click-through rate from total clicks divided by impressions and express its change in percentage points.

If `rowsCompared` is zero, the computed totals cannot establish activity. In that case or when no usable figures are returned, try `gsc_list_sitemaps` once and report one returned processing status or error count as of today. Distinguish a successfully read empty sitemap list from failure to read it.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Open with one sentence about Google Search Console and one quiet line for connection and plan status. Mention a limit only if it affects the next step. Give roughly a quarter of the reply to the snapshot. Use a compact table and one plain-language observation grounded in the figures. Preserve the distinction between a verified zero and missing data. If discovery finds no reachable target or no usable data, give the specific limitation and a recovery action in place of the table.

Place one recommended button directly beneath the finding. If clicks fell, offer **Find the pages that lost clicks**. If impressions grew faster than clicks, offer **Find searches we could win**. A sitemap error points to **Review sitemap errors**. When setup or access blocks the report, make the remedy primary.

Under **What else can I help you with?**, select three to five distinct suggestions, fewer when fewer are eligible. Use the snapshot, target type, available tools and permissions. Use page and query tasks for performance changes, and inspection or sitemap tasks for reported coverage issues. Count the recommendation once. Include a mix of performance, diagnostics and management where relevant. A write option needs an exposed write tool and verified edit access. On a read-only plan offer a read-only review or recommendation. Use short button labels and one-line benefits. Bind each to a scoped request such as these:

- **Find pages losing clicks** — Which pages contributed most to the change in organic clicks between these two periods?
- **Win more clicks from search** — Which high-impression queries earn few clicks, and which page titles should I test?
- **Check why a page is missing** — For the URL I choose, what index status, canonical URL and last crawl does Google report?
- **Find sitemap errors** — Which submitted sitemaps report errors or warnings that could affect discovery?
- **Submit a corrected sitemap** — Review the sitemap URL and property I select and prepare its submission for my approval.

Use [Search Console reporting and sitemap management](../loomascale-gsc/SKILL.md) on selection. Investigate or prepare changes only on selection. Keep the snapshot lightly tinted blue and the task rows unboxed.

## How do I schedule a weekly review?

When the assistant’s task scheduler can run this plugin for the verified Search Console property, reserve one suggestion for **Schedule a weekly organic search review**. Bind the button to this suggested reply, filling in the verified name and site_url before display:

> Schedule a recurring weekly task for [Search Console property name and ID]. Each week, use $loomascale-gsc to compare the latest seven finalized days of organic clicks and impressions with the preceding seven, identify the pages or queries with the largest changes and flag one follow-up, then send me a short summary.

Onboarding only displays this action. A click sends the scheduling request to the assistant. In plain chat, map a numbered reply to the same request. In a copy-only host, label the control **Copy scheduling request** and tell the user to paste it into the chat. On receipt, use the host’s native scheduler to create the recurring task. Reuse known preferences and ask once for any missing weekday, time, time zone or delivery details the scheduler needs. Save the read-only review instructions with the scoped ID and periods relative to each run. If an identical weekly task already exists, return its schedule. Confirm creation only after the scheduler succeeds and give its cadence and next run when returned. If recurring plugin access is unavailable, offer the review on demand.

## Go beyond Google Search Console

After the local actions, show one small lavender card titled **Go beyond Google Search Console**. Feature up to three relevant pairings from the catalog, with the two provider names, an icon and one question that needs both sources. Prefer a pairing that explains the snapshot or makes the next connection worthwhile. Use the examples below when the same business and scope can be compared.

- **Google Search Console + Google Analytics 4** — Which pages gain organic clicks but record few key events from organic visitors?
- **Google Search Console + Google Ads** — Where do paid search terms overlap with queries that already bring organic clicks?
- **Google Search Console + Merchant Center** — Which product pages get organic impressions while their matching offers are ineligible for free listings?

For two connected sources, make the question copyable for use in the full plugin. Label it **Ask in full plugin**. Use one **Explore the full LoomaScale plugin** link in the card footer for the current host when its listing is available. For a missing partner, use an icon link labeled **Connect [provider]** with its returned `connect_url` verbatim. Use **Finish setup** for `needs_attention` and **Check status** for `unknown`. Keep these comparisons as previews in this focused plugin. If its own source needs setup, keep its existing recovery or connect action primary and show at most one pairing as an example.

Keep **All integrations** as a collapsed control, or a follow-up reply in plain chat. On expansion, list every available source once with its individual dashboard link. If no relevant pair is available, show just this control.

### What does All integrations open?

Use the returned `data_sources` for availability and status. Label a new source by the benefit in its catalog description. Use the returned `connect_url` for setup. For a connected or unknown source, open its provider card with **Connected · View** or **Check status**. The links below are the dashboard destinations when a source-specific URL is missing or the current source needs a view-only link. Fall back to `connections_url` for a new source. If inventory fails, offer a retry and show the known links under **Check availability** on expansion.

| Business question and dashboard destination | Provider |
| --- | --- |
| [Which search terms cost money but bring no recorded conversions?](https://loomascale.com/dashboard/connections?source=google_ads) | 📣 Google Ads |
| [Which Facebook or Instagram ads cost the most per result?](https://loomascale.com/dashboard/connections?source=meta_ads) | ♾️ Meta Ads |
| [Which videos lose viewers in the first seconds?](https://loomascale.com/dashboard/connections?source=tiktok_ads) | 🎵 TikTok Ads |
| [Which campaigns drive up my cost per lead?](https://loomascale.com/dashboard/connections?source=linkedin_ads) | 💼 LinkedIn Ads |
| [Which landing pages get visits that rarely convert?](https://loomascale.com/dashboard/connections?source=ga4) | 📊 Google Analytics 4 |
| [Could my tracking miss or double-count conversions?](https://loomascale.com/dashboard/connections?source=tag_manager) | 🏷️ Google Tag Manager |
| [Which searches show my site but earn few clicks?](https://loomascale.com/dashboard/connections?source=search_console) | 🔎 Google Search Console |
| [What keeps my products from appearing in Shopping?](https://loomascale.com/dashboard/connections?source=merchant_center) | 🛍️ Google Merchant Center |
| [How do local customers find and contact my business?](https://loomascale.com/dashboard/connections?source=business_profile) | 📍 Google Business Profile (early access) |
