---
name: getting-started-meta
description: Use on a first visit or setup recheck in the LoomaScale Meta Ads plugin. Show weekly Facebook and Instagram ad results and a useful next investigation.
---

# Getting started with Meta Ads in LoomaScale

## Check connection and access

On this plugin’s `loomascale-meta` connection, call `loomascale_list_data_sources` with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected. Use the Meta Ads row with `tools_in_current_plugin: true`. A focused plugin normally returns `all_sources: false`. Keep reporting and in-chat tasks scoped to this source. Save the full catalog for the dashboard links below.

Proceed with an active trial, the Free plan, a paid plan or legacy access. The Free plan (`readOnly: true`) never expires and allows reads within a weekly task allowance, so run the snapshot without asking the user to pay first, and offer changes as recommendations only. For a pending trial, tell the user before the first metered read that it starts the trial. With no connection, leave it pending. If a plan is required, show the returned plan link. If a check fails, offer sign-in or retry. Only start account discovery after verifying the provider connection and access. For any other state, show setup or a preview. An account cap can still allow previously used accounts.

For `not_connected`, offer **♾️ Connect Meta Ads** to see weekly Facebook and Instagram ad spend and results. Use the [Meta Ads icon](https://loomascale.com/icons/meta-icon.webp) inside the button, or the glyph in text chat. Use its returned `connect_url` verbatim, falling back to `connections_url` or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use **Reconnect** for `needs_attention` and **Recheck** for an unknown or unavailable status. Let the user open the link, then offer **Recheck setup** to refresh both checks.

## What changed in my Meta Ads?

Use `meta_list_ad_accounts` to resolve the intended business and its account IDs and currencies. Respect disabled or restricted accounts. Pass `ad_account_id` explicitly when reading insights.

Use `meta_get_insights` at `level: account` with explicit `since` and `until`, one totals read per window. Compare the last seven complete account-local days with the preceding seven. If the account time zone is unknown, anchor the dates to Meta’s `yesterday` preset with `time_increment: "1"` using the returned `dateStop`. If that date is unavailable, use a verified earlier period and label its dates, or ask for the reporting time zone. Show spend, clicks, reported purchases (or one consistently reported named outcome) and cost per that outcome. Keep the attribution basis consistent. If conversions are withheld, suppress the count and its cost.

Use current-week totals first. Show up to three distinct accounts with verified weekly spend and currency. Omit zero and unknown rows when a spender is available. Keep each account and currency separate. Compare one named or clearly in-scope spender immediately. For unrelated clients, reuse already verified weekly spend and let the user choose before reading historical totals. If checking new accounts could exceed the remaining allowance, ask which account to use before those reads. Stop after the first useful comparison. When all checked spend is verified zero, state it once. For cost per outcome divide period spend by the same period’s reported outcomes. Show a dash for a missing or zero denominator.

If scoped accounts lack reportable activity, one `meta_get_delivery_issues` summary for an eligible account can supply a current delivery finding. Otherwise state the actual limitation. Public Meta Ad Library research is a separate option when signed in with usable access and the tools exposed, even without a connected ad account. With a pending trial, put the trial-start notice beside that option. Ask for the competitor and country only on selection.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Open with one sentence about Meta Ads and one quiet line for connection and plan status. Mention a limit only if it affects the next step. Give roughly a quarter of the reply to the snapshot. Use a compact table and one plain-language observation grounded in the figures. Preserve the distinction between a verified zero and missing data. If discovery finds no reachable target or no usable data, give the specific limitation and a recovery action in place of the table.

Place one recommended button directly beneath the finding. If cost per purchase rose, offer **Find what drove up purchase costs**. If purchases fell, offer **Investigate the purchase decline**. With spend and no stronger signal, offer **Find ads spending without results**. A returned delivery issue points to **Check the delivery restriction**. When setup or access blocks the report, make the remedy primary.

Under **What else can I help you with?**, select three to five distinct suggestions, fewer when fewer are eligible. Use the snapshot, target type, available tools and permissions. Use delivery findings, the reported outcome and recent spend to rank choices. Public competitor research can also be offered with usable access and no ad account. Count the recommendation once. Include a mix of performance, diagnostics and management where relevant. A write option needs an exposed write tool and verified edit access. On a read-only plan offer a read-only review or recommendation. Use short button labels and one-line benefits. Bind each to a scoped request such as these:

- **Find spend with few results** — Which ads spent the most for the reported outcome, and which should I review first?
- **Spot creative fatigue** — Which ads show rising frequency and falling results, and which creative should I test next?
- **Investigate a delivery issue** — Which reported delivery restriction or pacing issue should I check first?
- **Check Pixel and server events** — Which Pixel or Conversions API diagnostics suggest a measurement issue worth verifying?
- **Explore competitors’ ads** — Which offers and calls to action appear in my competitor’s public Meta ads in my market?
- **Review an ad set budget** — Show the current budget for the ad set I choose and preview my proposed change.

Use [Meta Ads reporting and management](../loomascale-meta/SKILL.md) for selected tasks. Investigate or prepare changes only on selection. Keep the snapshot lightly tinted blue and the task rows unboxed.

## How do I schedule a weekly review?

When the assistant’s task scheduler can run this plugin for the verified Meta ad account, reserve one suggestion for **Schedule a weekly Meta Ads performance review**. Bind the button to this suggested reply, filling in the verified name and ad_account_id before display:

> Schedule a recurring weekly task for [Meta ad account name and ID]. Each week, use $loomascale-meta to compare the last seven complete account-local days with the preceding seven for spend, clicks, the same named outcome and cost per outcome, and flag the campaign change most worth reviewing, then send me a short summary.

Onboarding only displays this action. A click sends the scheduling request to the assistant. In plain chat, map a numbered reply to the same request. In a copy-only host, label the control **Copy scheduling request** and tell the user to paste it into the chat. On receipt, use the host’s native scheduler to create the recurring task. Reuse known preferences and ask once for any missing weekday, time, time zone or delivery details the scheduler needs. Save the read-only review instructions with the scoped ID and periods relative to each run. If an identical weekly task already exists, return its schedule. Confirm creation only after the scheduler succeeds and give its cadence and next run when returned. If recurring plugin access is unavailable, offer the review on demand.

## Go beyond Meta Ads

After the local actions, show one small lavender card titled **Go beyond Meta Ads**. Feature up to three relevant pairings from the catalog, with the two provider names, an icon and one question that needs both sources. Prefer a pairing that explains the snapshot or makes the next connection worthwhile. Use the examples below when the same business and scope can be compared.

- **Meta Ads + Google Analytics 4** — Which tagged Meta campaigns bring visitors who record key events on the website?
- **Meta Ads + Tag Manager** — Do the browser events configured in the published container match what Meta Pixel receives?
- **Meta Ads + TikTok Ads** — Are ad costs rising faster on Facebook and Instagram or on TikTok relative to each channel’s own results?

For two connected sources, make the question copyable for use in the full plugin. Label it **Ask in full plugin**. Use one **Explore the full LoomaScale plugin** link in the card footer for the current host when its listing is available. For a missing partner, use an icon link labeled **Connect [provider]** with its returned `connect_url` verbatim. Use **Finish setup** for `needs_attention` and **Check status** for `unknown`. Keep these comparisons as previews in this focused plugin. If its own source needs setup, keep its existing recovery or connect action primary and show at most one pairing as an example.

Keep **All integrations** as a collapsed control, or a follow-up reply in plain chat. On expansion, list every available source once with its individual dashboard link. If no relevant pair is available, show just this control. With a verified ad account, end with a separate **Run Meta Ads performance audit** action bound to “Use $loomascale-meta to audit this account for wasted spend, delivery issues and costly ads, and rank what I should review first.” Keep it secondary to the finding and unavailable while reporting is blocked.

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
