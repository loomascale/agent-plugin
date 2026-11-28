---
name: getting-started-gmc
description: Use on a first visit or setup recheck in the LoomaScale Google Merchant Center plugin. Show current Shopping eligibility and a product issue to review.
---

# Getting started with Google Merchant Center in LoomaScale

## Check connection and access

On this plugin’s `loomascale-gmc` connection, call `loomascale_list_data_sources` with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected. Use the Google Merchant Center row with `tools_in_current_plugin: true`. A focused plugin normally returns `all_sources: false`. Keep reporting and in-chat tasks scoped to this source. Save the full catalog for the dashboard links below.

Proceed with an active trial, the Free plan, a paid plan or legacy access. The Free plan (`readOnly: true`) never expires and allows reads within a weekly task allowance, so run the snapshot without asking the user to pay first, and offer changes as recommendations only. For a pending trial, tell the user before the first metered read that it starts the trial. With no connection, leave it pending. If a plan is required, show the returned plan link. If a check fails, offer sign-in or retry. Only start account discovery after verifying the provider connection and access. For any other state, show setup or a preview.

For `not_connected`, offer **🛍️ Connect Google Merchant Center** to check how many products are eligible for Shopping. Use the [Google Merchant Center icon](https://loomascale.com/icons/google-merchant-center-icon.svg) inside the button, or the glyph in text chat. Use its returned `connect_url` verbatim, falling back to `connections_url` or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use **Reconnect** for `needs_attention` and **Recheck** for an unknown or unavailable status. Let the user open the link, then offer **Recheck setup** to refresh both checks.

## Can my products appear in Google Shopping?

Discover merchant accounts with `gmc_list_accounts`. Use the intended merchant or sole eligible account with its numeric `account_id`. For an agency or multi-client account, resolve the relevant merchant or offer a compact choice before reading catalog data.

Call `gmc_get_account_health`. Pick one returned destination and country in scope. Caption a compact table **Product visibility now** with the merchant, market, destination and as-of date. Show the returned active, pending and disapproved counts. Mention one named issue and its reported impact if available. Destination and country totals may cover the same products. Current status alone cannot establish a weekly change.

If `productStatuses` is empty but `accountIssues` identifies a restriction, report its title, severity and returned destinations as the current finding. If neither yields a finding, try `gmc_query` on `product_performance_view` for clicks and impressions within one marketing method across the last two complete seven-day windows. Select `date`, `clicks` and `impressions`, filter by explicit dates and marketing method and compare periods only when coverage supports it. Otherwise report the verified current period or the read limitation.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Open with one sentence about Google Merchant Center and one quiet line for connection and plan status. Mention a limit only if it affects the next step. Give roughly a quarter of the reply to the snapshot. Use a compact table and one plain-language observation grounded in the figures. Preserve the distinction between a verified zero and missing data. If discovery finds no reachable target or no usable data, give the specific limitation and a recovery action in place of the table.

Place one recommended button directly beneath the finding. For an account restriction, offer **Review the account issue**. For a product disapproval, offer **Review affected products**. For a feed processing issue, offer **Check the latest feed upload**. If products are eligible, offer **Find the products earning clicks**. When setup or access blocks the report, make the remedy primary.

Under **What else can I help you with?**, select three to five distinct suggestions, fewer when fewer are eligible. Use the snapshot, target type, available tools and permissions. Match visibility issues to the affected market and destination. Where eligibility is healthy, favor product performance or feed quality. Count the recommendation once. Include a mix of performance, diagnostics and management where relevant. A write option needs an exposed write tool and verified edit access. On a read-only plan offer a read-only review or recommendation. Use short button labels and one-line benefits. Bind each to a scoped request such as these:

- **Fix product disapprovals** — Which issues block the most offers in this destination and country, and which items should I fix first?
- **Find feed processing errors** — What did the latest upload report for the feed I select, and which errors need action?
- **Find products earning clicks** — Which items earn the most clicks on the Shopping surface I choose?
- **Check my store settings** — Which account, website or shipping settings should I review for the reported issue?
- **Correct a product attribute** — Show the current value for the eligible offer I select and preview the proposed correction.

Use [Merchant Center diagnostics and product management](../loomascale-gmc/SKILL.md) on selection. Investigate or prepare changes only on selection. Keep the snapshot lightly tinted blue and the task rows unboxed.

## How do I schedule a weekly review?

When the assistant’s task scheduler can run this plugin for the verified Merchant Center account, reserve one suggestion for **Schedule a weekly product visibility review**. Bind the button to this suggested reply, filling in the verified name and account_id before display:

> Schedule a recurring weekly task for [Merchant Center account name and ID]. Each week, use $loomascale-gmc to report current active, pending and disapproved offers for the same destination and country, highlight the most consequential reported issue, and describe changes only when a comparable earlier snapshot is available, then send me a short summary.

Onboarding only displays this action. A click sends the scheduling request to the assistant. In plain chat, map a numbered reply to the same request. In a copy-only host, label the control **Copy scheduling request** and tell the user to paste it into the chat. On receipt, use the host’s native scheduler to create the recurring task. Reuse known preferences and ask once for any missing weekday, time, time zone or delivery details the scheduler needs. Save the read-only review instructions with the scoped ID and periods relative to each run. If an identical weekly task already exists, return its schedule. Confirm creation only after the scheduler succeeds and give its cadence and next run when returned. If recurring plugin access is unavailable, offer the review on demand.

## Go beyond Google Merchant Center

After the local actions, show one small lavender card titled **Go beyond Google Merchant Center**. Feature up to three relevant pairings from the catalog, with the two provider names, an icon and one question that needs both sources. Prefer a pairing that explains the snapshot or makes the next connection worthwhile. Use the examples below when the same business and scope can be compared.

- **Google Merchant Center + Google Ads** — Did Shopping clicks fall for offers that Merchant Center currently lists as disapproved?
- **Google Merchant Center + Google Analytics 4** — Which products earn free-listing clicks but few recorded purchases for matching item IDs?
- **Google Merchant Center + Search Console** — Which ineligible offers also have product pages with weak organic search visibility?

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
