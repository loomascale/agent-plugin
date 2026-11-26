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

Offer the other relevant questions as compact reply buttons. Bind each to its one-sentence prompt and carry the chosen ad account, dates and metric into the next turn.

- **Find ads spending without results** — Which Facebook or Instagram ads spent the most with few reported purchases, and which should I review first?
- **Spot creative fatigue** — Which ads show rising frequency and falling results, and which creative should I test next?
- **Explore competitors’ ads** — Which offers and calls to action does my competitor use in public Meta ads in my market, and which message could I test?

Use [Meta Ads reporting and management](../loomascale-meta/SKILL.md) for selected tasks. If a matching write tool and edit permission are verified, offer to preview an ad set budget change for review. If the host can schedule reads of this source, offer a weekly performance review. Perform investigations, edits and scheduling only after the user chooses them. With a verified ad account, end with a separate **Run Meta Ads performance audit** action bound to “Use $loomascale-meta to audit this account for wasted spend, delivery issues and costly ads, and rank what I should review first.” Keep it secondary to the finding and unavailable while reporting is blocked.

Use a faint LoomaScale blue tint for the snapshot when supported. Keep status and task rows unboxed. Prefer native reply buttons for tasks and link buttons for setup. If inline controls can only copy text, label the control **Copy question**. In text-only chat, use numbered replies and a clickable setup link. Omit duplicate actions.

## What can I learn by connecting more sources?

Show one compact, lightly tinted lavender card after the local tasks and before the final ads audit button. If connecting this plugin’s source is the recommended step, put the card there instead and make that source’s row the primary setup button. Title it **What can I learn by connecting more sources?** If all are connected, use **What can I learn across my sources?** Add one question the full LoomaScale plugin can investigate, such as “Do GA4 key events from Facebook and Instagram traffic rise when Meta ad spend rises?” Use a pairing from the available catalog. Link the full plugin’s name to its returned listing for the current host when available.

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
