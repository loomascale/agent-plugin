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

Offer the other relevant questions as compact reply buttons. Bind each to its one-sentence prompt and carry the chosen property, dates and metric into the next turn.

- **Find where visits fail to convert** — Which landing pages brought in the most sessions but recorded few key events, and which page should I review first?
- **Explain a traffic change** — Which sources and mediums contributed most to the change in sessions between these two weeks?
- **Find a funnel drop-off** — For the steps I choose, where do visitors leave the funnel most often?

Use [GA4 insights](../ga4-insights/SKILL.md) for selected investigations and [GA4 reporting and settings](../loomascale-ga4/SKILL.md) for settings. If a matching write tool and edit permission are verified, offer to preview marking a named event as a key event for review. If the host can schedule reads of this source, offer a weekly performance review. Perform investigations, edits and scheduling only after the user chooses them.

Use a faint LoomaScale blue tint for the snapshot when supported. Keep status and task rows unboxed. Prefer native reply buttons for tasks and link buttons for setup. If inline controls can only copy text, label the control **Copy question**. In text-only chat, use numbered replies and a clickable setup link. Omit duplicate actions.

## What can I learn by connecting more sources?

Show one compact, lightly tinted lavender card after the local tasks. If connecting this plugin’s source is the recommended step, put the card there instead and make that source’s row the primary setup button. Title it **What can I learn by connecting more sources?** If all are connected, use **What can I learn across my sources?** Add one question the full LoomaScale plugin can investigate, such as “Which Google Ads campaigns bring visitors who go on to convert in GA4?” Use a pairing from the available catalog. Link the full plugin’s name to its returned listing for the current host when available.

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
