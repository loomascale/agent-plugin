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

Offer the other relevant questions as compact reply buttons. Bind each to its one-sentence prompt and carry the chosen merchant account, dates and metric into the next turn.

- **Review affected products** — Which product issues block the most offers for this destination and country, and which items should I fix first?
- **Check a feed upload** — What did Merchant Center report for the latest upload of the feed I choose, and which errors need attention?
- **Find products earning clicks** — Which products earned the most clicks from Shopping ads or free listings on the surface I choose?

Use [Merchant Center diagnostics and product management](../loomascale-gmc/SKILL.md) on selection. If a matching write tool and edit permission are verified, offer to preview an eligible product attribute correction for review. If the host can schedule reads of this source, offer a weekly product eligibility check. Perform investigations, edits and scheduling only after the user chooses them.

Use a faint LoomaScale blue tint for the snapshot when supported. Keep status and task rows unboxed. Prefer native reply buttons for tasks and link buttons for setup. If inline controls can only copy text, label the control **Copy question**. In text-only chat, use numbered replies and a clickable setup link. Omit duplicate actions.

## What can I learn by connecting more sources?

Show one compact, lightly tinted lavender card after the local tasks. If connecting this plugin’s source is the recommended step, put the card there instead and make that source’s row the primary setup button. Title it **What can I learn by connecting more sources?** If all are connected, use **What can I learn across my sources?** Add one question the full LoomaScale plugin can investigate, such as “Did Shopping clicks fall for products with Merchant Center disapprovals?” Use a pairing from the available catalog. Link the full plugin’s name to its returned listing for the current host when available.

Show every integration returned in `data_sources` once in the card, including connected sources and this plugin’s own source. Lead each link with its business question. Put the provider icon inside the link and the provider name and status in smaller text. Use two columns when they fit, or compact Markdown links in plain chat. Keep every row visible within the existing page budget.

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

Use the source’s returned `connect_url` verbatim for **Connect** (`not_connected`) or **Finish setup** (`needs_attention`). For **Connected · View** (`connected`) or **Check status** (`unknown`), open its dashboard card. For other sources the returned URL already opens that card, where the user can connect or install the full plugin if needed. For this plugin’s view-only links or a missing URL, use the matching card link above.

If inventory fails, label the known links **Check availability** and offer a retry. With a successful inventory, list only returned sources. Give a newly returned source a question based on its description and use its returned URL, falling back to `connections_url` if needed. Opening a row goes to the dashboard. Cross-source reporting takes place in the full plugin.
