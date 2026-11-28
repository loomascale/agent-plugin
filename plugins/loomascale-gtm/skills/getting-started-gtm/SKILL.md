---
name: getting-started-gtm
description: Use on a first visit or setup recheck in the LoomaScale Google Tag Manager plugin. Show the published container’s tracking configuration and a next check.
---

# Getting started with Google Tag Manager in LoomaScale

## Check connection and access

On this plugin’s `loomascale-gtm` connection, call `loomascale_list_data_sources` with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected. Use the Google Tag Manager row with `tools_in_current_plugin: true`. A focused plugin normally returns `all_sources: false`. Keep reporting and in-chat tasks scoped to this source. Save the full catalog for the dashboard links below.

Proceed with an active trial, the Free plan, a paid plan or legacy access. The Free plan (`readOnly: true`) never expires and allows reads within a weekly task allowance, so run the snapshot without asking the user to pay first, and offer changes as recommendations only. For a pending trial, tell the user before the first metered read that it starts the trial. With no connection, leave it pending. If a plan is required, show the returned plan link. If a check fails, offer sign-in or retry. Only start account discovery after verifying the provider connection and access. For any other state, show setup or a preview.

For `not_connected`, offer **🏷️ Connect Google Tag Manager** to see which tracking tags are published. Use the [Google Tag Manager icon](https://loomascale.com/icons/google-tag-manager-icon.svg) inside the button, or the glyph in text chat. Use its returned `connect_url` verbatim, falling back to `connections_url` or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use **Reconnect** for `needs_attention` and **Recheck** for an unknown or unavailable status. Let the user open the link, then offer **Recheck setup** to refresh both checks.

## What tracking is published?

Discover containers with `gtm_list_containers`. Pass the intended container’s returned `path` as `container`. Use the sole result automatically only when `accountsStillDiscovering` is zero. With ambiguous or incomplete discovery, offer the visible choices or a recheck and resume on selection.

Read `gtm_get_container` once. Caption the snapshot **Published tracking setup**, with the container, as-of date and `liveVersionId`. Show returned `tagCount`, `triggerCount` and `pausedTagCount`. Describe what is configured. A paused tag may be intentional, and published configuration cannot establish whether a tag fired on the website.

If the service confirms there is no published version, say so and offer to inspect a named draft. If the live read fails without establishing publication state, report that limitation. Do not use empty counters as evidence of an unpublished container or invent weekly conversion metrics.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Open with one sentence about Google Tag Manager and one quiet line for connection and plan status. Mention a limit only if it affects the next step. Give roughly a quarter of the reply to the snapshot. Use a compact table and one plain-language observation grounded in the figures. Preserve the distinction between a verified zero and missing data. If discovery finds no reachable target or no usable data, give the specific limitation and a recovery action in place of the table.

Place one recommended button directly beneath the finding. For paused tags, offer **Review paused tracking tags**. For a published container without a stronger signal, offer **Check for missing or duplicate tracking**. For an unpublished container, offer **Review a draft workspace**. When setup or access blocks the report, make the remedy primary.

Under **What else can I help you with?**, select three to five distinct suggestions, fewer when fewer are eligible. Use the snapshot, target type, available tools and permissions. Use published-version and paused-tag tasks for a live container. When only a draft exists, prioritize workspace and version questions. Count the recommendation once. Include a mix of performance, diagnostics and management where relevant. A write option needs an exposed write tool and verified edit access. On a read-only plan offer a read-only review or recommendation. Use short button labels and one-line benefits. Bind each to a scoped request such as these:

- **Check for missed or duplicate conversions** — Which published tags or triggers could miss or double-count a conversion, and what should I test?
- **Review paused tags** — Which paused tags were configured to measure business events I care about?
- **Inspect unpublished changes** — Which changes or conflicts in the workspace I choose should I review before creating a version?
- **See which version went live** — Which container version is published and how does it relate to the recent version history?
- **Prepare a tracking fix** — In the workspace I name, preview the smallest tag or trigger change that addresses the issue.

Use [Tag Manager audits and drafts](../loomascale-gtm/SKILL.md) on selection. Scope a tracking audit to this container with `skip_google_ads:true`. Investigate or prepare changes only on selection. Keep the snapshot lightly tinted blue and the task rows unboxed.

## How do I schedule a weekly review?

When the assistant’s task scheduler can run this plugin for the verified Tag Manager container, reserve one suggestion for **Schedule a weekly published tracking review**. Bind the button to this suggested reply, filling in the verified name and container path before display:

> Schedule a recurring weekly task for [Tag Manager container name and ID]. Each week, use $loomascale-gtm to read the published version, tag, trigger and paused-tag counts, flag one setup item worth checking, and describe changes only if a comparable prior version or snapshot is available, then send me a short summary.

Onboarding only displays this action. A click sends the scheduling request to the assistant. In plain chat, map a numbered reply to the same request. In a copy-only host, label the control **Copy scheduling request** and tell the user to paste it into the chat. On receipt, use the host’s native scheduler to create the recurring task. Reuse known preferences and ask once for any missing weekday, time, time zone or delivery details the scheduler needs. Save the read-only review instructions with the scoped ID and periods relative to each run. If an identical weekly task already exists, return its schedule. Confirm creation only after the scheduler succeeds and give its cadence and next run when returned. If recurring plugin access is unavailable, offer the review on demand.

## Go beyond Google Tag Manager

After the local actions, show one small lavender card titled **Go beyond Google Tag Manager**. Feature up to three relevant pairings from the catalog, with the two provider names, an icon and one question that needs both sources. Prefer a pairing that explains the snapshot or makes the next connection worthwhile. Use the examples below when the same business and scope can be compared.

- **Google Tag Manager + Google Analytics 4** — Which GA4 key events have a corresponding tag in the published container?
- **Google Tag Manager + Google Ads** — Which website conversion actions have matching published tags and triggers?
- **Google Tag Manager + Meta Ads** — Do the configured browser events line up with the events Meta Pixel reports receiving?

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
