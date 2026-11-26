---
name: getting-started
description: Get started with the full LoomaScale plugin. On a first visit or setup recheck, show connected sources, plan access, a weekly snapshot and audit choices.
---

# Getting started with LoomaScale

Give a first-time user one answer about their business and a choice of what to investigate next. Run only the small read-only snapshot during onboarding. A user selecting an audit starts a separate request.

## What can this user access?

1. Call `loomascale_list_data_sources` with `{}` on the full plugin. Use the returned catalog, including preview availability. If `current_plugin.all_sources` is false, give the returned full-plugin installation link and stop. A connected login still needs a reachable account, property or container.
2. Call `loomascale_check_quota` with `{}`, even with no connections. Read plan, trial and allowance together. An active trial, a paid plan or unlimited legacy access can run the snapshot. With a pending trial, tell the user the snapshot starts their trial before the first metered call. If no source is connected, leave the trial pending and put the same notice beside any optional metered action. Free or ended-trial accounts can use explicitly reported remaining tasks. On paid plans, previously used ad accounts remain eligible even at the account cap.
3. If access is exhausted or unverified, show the returned recovery action or plan link and keep reporting choices as previews. If inventory fails, offer sign-in or a retry and the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Never turn unavailable data into a disconnected source or a zero. Refresh both checks when the user returns from setup.

## What changed this week?

With access and a connected source, immediately produce [one weekly snapshot](references/weekly-snapshot.md). Reuse a stated business or account. Otherwise prefer an ad account, then a GA4 property, then another reportable source. Use the menu order to break ties between sources. If several client accounts are plausible, offer a short account choice before reading figures. Pass explicit discovered IDs and leave the saved default alone. Skip the intake questionnaire.

## What should the user see?

Fit the **entire response into one to two desktop ChatGPT screens**. Aim for about 250–350 visible words, with shorter copy when setup is simple. Use compact rows or a two-column action menu. Keep expanded prompts out of the initial view when the host allows it.

1. **Orientation.** Use one sentence in everyday language, e.g. “LoomaScale shows where your ad budget went, what visitors did next and which tracking or product issues deserve a closer look.” Add one status line with connected sources and access.
2. **Your week.** Give roughly one quarter of the response to the snapshot. Show the account, dates, one small comparison table or chart and one factual takeaway. With no connected source, put the connection buttons here instead, explain what their first report will show, and offer **Recheck my connections**. When access blocks reporting, give the recovery action first.
3. **What would you like to check?** Use the [audit prompts and connection icons](references/action-menu.md) to offer one action per connected, tool-supported source and the public competitor research action when available. Lead with a task relevant to the snapshot. A short line can mention supported campaign drafts or changes the user can review and approve later.
4. **Compare across sources.** Offer up to three business questions from the same menu. Each names the sources it needs. When a useful pairing is one connection away, show what connecting it unlocks.
5. **Connect more sources.** Include every remaining `not_connected` source once, in the menu’s order, with its icon **inside** the link button and a short benefit. Use its returned `connect_url` verbatim, falling back to `connections_url`. Label `needs_attention` as **Finish setup** or **Reconnect**, and `unknown` as **Recheck**. Only the user opens a connection link. Omit empty groups and any connection buttons already shown.

Use native in-chat buttons that submit the mapped question or open the returned URL when supported. For hosts with an inline HTML surface, the [interactive menu template](assets/action-menu.html) provides expandable questions, copy controls and connection links. Its input format is in the [action menu reference](references/action-menu.md#how-should-the-controls-work). For text-only chat, use icon-labeled Markdown connection links and numbered audit questions with “Reply with a number to run it.” Resolve that reply to the exact prompt in this conversation. Render the menu once.
