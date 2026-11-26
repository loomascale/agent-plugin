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

Offer the other relevant questions as compact reply buttons. Bind each to its one-sentence prompt and carry the chosen container, dates and metric into the next turn.

- **Check for missed or duplicate conversions** — Which published tags or triggers could miss or double-count a conversion, and what should I test on my website?
- **See what is waiting to go live** — Which changes or conflicts in the workspace I choose should I review before creating a version?
- **Review paused tracking tags** — Which tags in the published version are paused, and which conversion events were they configured to send?

Use [Tag Manager audits and drafts](../loomascale-gtm/SKILL.md) on selection. Scope a tracking audit to this container with `skip_google_ads:true`. If a matching write tool and edit permission are verified, offer to prepare a tag change in a workspace the user names for review. If the host can schedule reads of this source, offer a weekly published configuration check. Perform investigations, edits and scheduling only after the user chooses them.

Use a faint LoomaScale blue tint for the snapshot when supported. Keep status and task rows unboxed. Prefer native reply buttons for tasks and link buttons for setup. If inline controls can only copy text, label the control **Copy question**. In text-only chat, use numbered replies and a clickable setup link. Omit duplicate actions.

## What can I learn by connecting more sources?

Show one compact, lightly tinted lavender card after the local tasks. If connecting this plugin’s source is the recommended step, put the card there instead and make that source’s row the primary setup button. Title it **What can I learn by connecting more sources?** If all are connected, use **What can I learn across my sources?** Add one question the full LoomaScale plugin can investigate, such as “Do the conversion tags published in Tag Manager correspond to events recorded in GA4?” Use a pairing from the available catalog. Link the full plugin’s name to its returned listing for the current host when available.

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
