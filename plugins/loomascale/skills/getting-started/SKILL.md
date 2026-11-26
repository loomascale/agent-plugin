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

Follow the [snapshot and fallback rules](references/weekly-snapshot.md) before composing the menu. In the intended business scope, try recent ad activity, then Google Analytics 4, Search Console, Merchant Center and Tag Manager. Empty ad results trigger the next connected source in the same turn. Stop once a small report supports one specific observation. An unchanged baseline, a gain or a verified eligibility issue can be useful. Skip tables made up of missing values.

## What should the user see?

Fit the complete response into one to two desktop chat screens (usually 250–350 visible words). Keep prompts behind their buttons. Use the [action menu](references/action-menu.md) for the labels, follow-up prompts, permissions and controls.

1. **Welcome to LoomaScale.** Give one sentence about what the user can learn. Keep plan and connection status on one unboxed, secondary line. Include allowance or billing details only when they affect the next action.
2. **Your business this week.** Give roughly a quarter of the space to the source, target, exact dates, compact figures and one sentence interpreting them. Use an as-of heading for current product or tracking status. Show at most three distinct ad accounts across the whole response, each with verified weekly spend and currency. With no usable figures, give the specific limitation in one line. With no connections, explain what connecting a source will reveal.
3. **Recommended next step.** Put one prominent button immediately below the finding. Use the [recommendation rules](references/action-menu.md#which-action-follows-from-the-finding) to bind it to a supported task for the observed metric and target. An account-wide access block takes priority and uses the returned recovery action. Otherwise, with no connections, use the first available source’s connection button.
4. **What can I learn across sources?** Put up to three available business questions in one softly tinted lavender panel near the recommendation. Name the sources beneath each. If a pairing lacks one source, explain its benefit beside that source’s connection link below.
5. **What else can I improve?** Show three to five outcome-led tasks when available, fewer when appropriate. Use compact rows with the platform name and icon as secondary information. Include public competitor research when available, even without an ad account. Make remaining supported tasks reachable via **More tasks**. Count the recommended action once.
6. **Manage and automate.** Use a short line or two with eligible examples from the action menu. Offer changes for review and recurring checks only when their respective capabilities are available.
7. **Connect more sources.** Show remaining `not_connected` sources once in the documented order. Put each provider icon inside its link button, add a short benefit and use its returned `connect_url` verbatim (fallback `connections_url`). Use **Finish setup** or **Reconnect** for `needs_attention` and **Recheck** for `unknown`. After setup, offer **Recheck my connections**.
8. **Full ads audit.** End with the separate [full audit action](references/action-menu.md#how-do-i-start-a-full-ads-performance-audit) when at least one reachable ad account is verified, including when another source supplied the insight. Present it as a secondary button. Keep it disabled with a recovery hint if reporting is blocked.

Omit empty groups and duplicate actions. Keep the page background neutral, text legible and setup links compact. Prefer native in-chat replies and link buttons. The [interactive HTML menu](assets/action-menu.html) supports copyable follow-ups and real setup links. In plain chat use numbered actions, icon-labeled links and the same order. Only the user opens connection links.
