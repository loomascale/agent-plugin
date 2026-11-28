---
name: getting-started-ga4
description: Use on a first visit or setup recheck in the LoomaScale Google Analytics 4 plugin. Check access and show how sessions and key events changed this week.
---

# Getting started with Google Analytics 4 in LoomaScale

## Check connection and access

On this plugin’s `loomascale-ga4` connection, call `loomascale_list_data_sources` with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected. Use the Google Analytics 4 row with `tools_in_current_plugin: true`. A focused plugin normally returns `all_sources: false`. Keep reporting and in-chat tasks scoped to this source. Save the full catalog for the dashboard links below.

Proceed with an active trial, the Free plan, a paid plan or legacy access. The Free plan (`readOnly: true`) never expires and allows reads within a weekly task allowance, so run the snapshot without asking the user to pay first, and offer changes as recommendations only. For a pending trial, tell the user before the first metered read that it starts the trial. With no connection, leave it pending. If a plan is required, show the returned plan link. If a check fails, offer sign-in or retry. Only start account discovery after verifying the provider connection and access. For any other state, show setup or a preview.

For `not_connected`, offer **📊 Connect Google Analytics 4** to see which visits lead to key events. Use the [Google Analytics 4 icon](https://loomascale.com/icons/google-analytics-icon.svg) inside the button, or the glyph in text chat. Use its returned `connect_url` verbatim, falling back to `connections_url` or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use **Reconnect** for `needs_attention` and **Recheck** for an unknown or unavailable status. Let the user open the link, then offer **Recheck setup** to refresh both checks.

## What changed on my website?

Discover properties with `ga4_get_account_summaries`. Reuse the intended `property_id`, or use the only eligible property. If several unrelated properties fit, offer a compact choice and resume on selection.

Read the time zone with `ga4_get_property_details` if needed. Call `ga4_run_report` once with two explicit `date_ranges`, no dimensions, and metrics `sessions` and `keyEvents`. Compare the last seven complete property-local days with the preceding seven. Show both ranges, counts and changes. Key events count occurrences. A percentage of sessions that converted requires its own metric.

If historical rows are empty, try `ga4_get_tracking_configuration` once for a verified current key-event setting. Label the result as of today. A configured event alone says nothing about how often it occurs.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Open with one sentence about Google Analytics 4 and one quiet line for connection and plan status. Mention a limit only if it affects the next step. Give roughly a quarter of the reply to the snapshot. Use a compact table and one plain-language observation grounded in the figures. Preserve the distinction between a verified zero and missing data. If discovery finds no reachable target or no usable data, give the specific limitation and a recovery action in place of the table.

Place one recommended button directly beneath the finding. If sessions rose while key events fell, offer **Investigate the drop in key events**. For a traffic swing, offer **See which channels changed**. For a configuration-only finding, offer **Review my key events**. When setup or access blocks the report, make the remedy primary.

Under **What else can I help you with?**, select three to five distinct suggestions, fewer when fewer are eligible. Use the snapshot, target type, available tools and permissions. Use website and landing-page wording for web streams, screen and event wording for app streams, and neutral wording if stream type is unknown. Count the recommendation once. Include a mix of performance, diagnostics and management where relevant. A write option needs an exposed write tool and verified edit access. On a read-only plan offer a read-only review or recommendation. Use short button labels and one-line benefits. Bind each to a scoped request such as these:

- **Understand website or app performance** — Which changes in traffic, engagement and key events stand out between these two weeks?
- **Find valuable acquisition channels** — Which sources bring engaged sessions and the most recorded key events?
- **Find where visitors drop off** — For the steps I choose, where do visitors leave the funnel most often?
- **Check my analytics setup** — Which stream settings or key-event definitions should I verify to explain the events I see?
- **Manage events and conversions** — Show my current key events and preview marking the event I choose before applying a change.

Use [GA4 insights](../ga4-insights/SKILL.md) for selected investigations and [GA4 reporting and settings](../loomascale-ga4/SKILL.md) for settings. Investigate or prepare changes only on selection. Keep the snapshot lightly tinted blue and the task rows unboxed.

## How do I schedule a weekly review?

When the assistant’s task scheduler can run this plugin for the verified GA4 property, reserve one suggestion for **Schedule a weekly website performance review**. For an app stream, label it **Schedule a weekly app performance review**. Bind the button to this suggested reply, filling in the verified name and property_id before display:

> Schedule a recurring weekly task for [GA4 property name and ID]. Each week, use $loomascale-ga4 to compare the last seven complete property-local days with the preceding seven for sessions and key events, identify which acquisition channels changed most and flag one change worth investigating, then send me a short summary.

Onboarding only displays this action. A click sends the scheduling request to the assistant. In plain chat, map a numbered reply to the same request. In a copy-only host, label the control **Copy scheduling request** and tell the user to paste it into the chat. On receipt, use the host’s native scheduler to create the recurring task. Reuse known preferences and ask once for any missing weekday, time, time zone or delivery details the scheduler needs. Save the read-only review instructions with the scoped ID and periods relative to each run. If an identical weekly task already exists, return its schedule. Confirm creation only after the scheduler succeeds and give its cadence and next run when returned. If recurring plugin access is unavailable, offer the review on demand.

## Go beyond Google Analytics 4

After the local actions, show one small lavender card titled **Go beyond Google Analytics 4**. Feature up to three relevant pairings from the catalog, with the two provider names, an icon and one question that needs both sources. Prefer a pairing that explains the snapshot or makes the next connection worthwhile. Use the examples below when the same business and scope can be compared.

- **Google Analytics 4 + Google Ads** — Which campaigns spend money on visits that record few GA4 key events?
- **Google Analytics 4 + Meta Ads** — Which tagged Facebook or Instagram campaigns bring visitors who go on to convert?
- **Google Analytics 4 + Search Console** — Which organic landing pages gain search clicks and also record key events?
- **Google Analytics 4 + Tag Manager** — Do the published event tags match the key events this property is set up to record?

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
