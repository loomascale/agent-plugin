---
name: getting-started
description: Get started with the full LoomaScale plugin. On a first visit or setup recheck, show one verified marketing insight and an action the user can take next.
---

# Getting started with LoomaScale

Give a first-time user one answer about their business and a choice of what to investigate next. Onboarding reads summaries only. Investigations, edits and recurring checks start with a separate user request.

## What can this user access?

1. Call `loomascale_list_data_sources` with `{}` on the full plugin. Use the returned catalog, including preview availability. If `current_plugin.all_sources` is false, give the returned full-plugin installation link and stop. A connected login still needs a reachable account, property or container.
2. Call `loomascale_get_user` with `{}`, even with no connections. If the host exposes its plan lookup under a different name, use that read-only lookup and honor the returned entitlement. An active trial, the Free plan, a paid plan or legacy access can run the snapshot. The Free plan (`readOnly: true`) never expires and allows reads within a weekly task allowance, so run the snapshot without asking the user to pay first, and offer changes as recommendations only. With a pending trial, explain before the first metered read that it starts the trial. With no connections, leave it pending and put the notice beside optional metered actions. If the service requires a plan, give its dashboard link. On the Free plan and paid plans, previously used accounts remain eligible even at the account cap.
3. If access is exhausted or unverified, show the returned recovery action or plan link and keep reporting choices as previews. If inventory fails, offer sign-in or a retry and the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Never turn unavailable data into a disconnected source or a zero. Refresh both checks when the user returns from setup.

## What did the connected data show?

Follow the [snapshot and fallback rules](references/weekly-snapshot.md) before composing the menu. In the intended business scope, try recent ad activity, then Google Analytics 4, Search Console, Merchant Center, Tag Manager and Google Business Profile (early access, when the catalog offers it). Empty ad results trigger the next connected source in the same turn. Stop once a small report supports one specific observation. An unchanged baseline, a gain or a verified eligibility issue can be useful. Skip tables made up of missing values.

## What should the user see?

Fit the complete response into one to two desktop chat screens (usually 250–350 visible words). Keep prompts behind their buttons. Use the [action menu](references/action-menu.md) for the labels, follow-up prompts, permissions and controls.

1. **Welcome to LoomaScale.** Give one sentence about what the user can learn. Keep plan and connection status on one unboxed, secondary line. Include allowance or billing details only when they affect the next action.
2. **Your business this week.** Give roughly a quarter of the space to the source, target, exact dates, compact figures and one sentence interpreting them. Use an as-of heading for current product or tracking status. Show at most three distinct ad accounts across the whole response, each with verified weekly spend and currency. With no usable figures, give the specific limitation in one line. With no connections, explain what connecting a source will reveal.
3. **Recommended next step.** Put one prominent button immediately below the finding. Use the [recommendation rules](references/action-menu.md#which-action-follows-from-the-finding) to bind it to a supported task for the observed metric and target. An account-wide access block takes priority and uses the returned recovery action. Otherwise, with no connections, use the first available source’s connection button.
4. **What can I learn across sources?** Feature up to three questions that need two sources for the same business in one lightly tinted lavender panel. A ready pair submits a comparison request. For a pair missing one connection, show the question with that provider’s setup link. Rank pairs by the snapshot and the user’s stated goal.
5. **What else can I improve?** Select three to five distinct suggestions across performance, acquisition, measurement, management and recurring work, fewer if eligibility is limited. Use the observed data, type of resource, permissions and available tools. Show a short benefit on each row, count the recommendation once and put remaining choices under **More tasks**. Include public competitor research when available, even without an ad account.
6. **Weekly review.** Reserve one of those suggestions for a source-specific weekly review when the assistant can schedule recurring reads of a verified target. Bind its click to the [recurring task request](references/action-menu.md#what-can-i-manage-or-check-regularly).
7. **All integrations.** Keep the remaining provider links in a collapsed list, or reveal them on a follow-up reply in plain chat. Keep the primary setup link visible when nothing is connected. Put the provider icon inside each link, describe the benefit and use the returned `connect_url` for setup (fallback `connections_url`). Use **Finish setup** for `needs_attention`, **Check status** for `unknown`, and **Recheck my connections** after setup.
8. **Full ads audit.** End with the separate [full audit action](references/action-menu.md#how-do-i-start-a-full-ads-performance-audit) when at least one reachable ad account is verified, including when another source supplied the insight. Present it as a secondary button. Keep it disabled with a recovery hint if reporting is blocked.

Omit empty groups and duplicate actions. Keep the page background neutral, text legible and setup links compact. Prefer native in-chat replies and link buttons. The [interactive HTML menu template](assets/action-menu-template.md) supports copyable follow-ups and real setup links. In plain chat use numbered actions, icon-labeled links and the same order. Only the user opens connection links.
