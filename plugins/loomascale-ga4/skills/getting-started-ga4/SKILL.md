---
name: getting-started-ga4
description: Use on a first visit or setup recheck in the LoomaScale Google Analytics 4 plugin. Check access and show how sessions and key events changed this week.
---

# Getting started with Google Analytics 4 in LoomaScale

## Check connection and access

On this plugin’s `loomascale-ga4` connection, call `loomascale_list_data_sources` with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected. Use the Google Analytics 4 row with `tools_in_current_plugin: true`. A focused plugin normally returns `all_sources: false`. Other catalog rows are outside this menu.

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
