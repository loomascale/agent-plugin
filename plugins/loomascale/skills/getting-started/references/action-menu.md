# Which marketing task should I choose?

Use the live catalog and exposed tools to select rows. The source directory follows the LoomaScale dashboard’s default order for advertisers. Use actual popularity ranks if supplied. Append newly supported sources using the catalog description and a verified reporting capability.

## Which action follows from the finding?

Choose the most specific signal the snapshot verifies. Carry its source, dates, target and outcome into the follow-up prompt. Execute it only when selected. Use one primary action and remove duplicates from the remaining choices.

| Observed situation | Primary button | What selection requests |
| --- | --- | --- |
| A diagnostic identifies a tracking issue | Check my conversion tracking | Inspect the reported issue and propose a verification step. A fall in conversions alone is insufficient evidence of broken tracking. |
| Recorded conversions or GA4 key events fell | Investigate the conversion decline | Find the campaigns or landing pages that contributed most to the measured decline. |
| Comparable cost per conversion rose | Find out why conversions cost more | Compare spend and the same outcome at campaign level to identify the largest contributors. |
| Two ad platforms have verified activity | Compare my advertising channels | Compare changes within each channel for the same business and flag a budget question. |
| Recent ad spend with no stronger signal | Look for wasted ad spend | Find campaigns or ads with spend and few recorded outcomes for the selected account. |
| Website or search data supplies the finding | Investigate my website performance or Find missed search clicks | Use GA4 landing pages or Search Console queries to investigate the observed movement. |
| Product or tag status supplies the finding | Review affected products or Check my published tracking | Inspect the returned Merchant Center issue or GTM configuration and propose a next check. |
| No connected source, access blocked or unresolved scope | Connect my first source, Restore access or Choose an account | Open the returned setup or recovery link, or submit a scoped selection. Use the provider icon for connection links. |

## What can I improve with each source?

Choose distinct business questions even when a single source supplies several. For GA4, consider engagement, acquisition channels, funnel drop-off and event configuration. For ads, consider spend, creative performance, delivery and conversion tracking. For Search Console, consider indexing alongside organic traffic. For Merchant Center, consider feed processing alongside product visibility. For Tag Manager, consider unpublished changes alongside published tags. Use the matching integration guide and current permissions to decide which requests to offer.

Use the outcome as the visible action label. Put the provider name and icon on the secondary line. For a connected source, selection submits the one-sentence question. For a missing source, use **Connect {source}** and a few words about the outcome, such as “Find costly search terms.” The icon files live under `https://loomascale.com/icons/`. Use the glyph when images are unavailable.

| Daily action | Provider icon / glyph | Question to run on selection |
| --- | --- | --- |
| Find costly search terms | `google-ads-icon.webp` 📣 | Which Google Ads campaigns or search terms spent the most without a recorded conversion, and which should I review first? |
| Find ads consuming budget with few results | `meta-icon.webp` ♾️ | Which Meta ads on Facebook or Instagram cost the most per result, and which creative or placement should I test next? |
| Find videos that lose viewers early | `tiktok-ads-icon.svg` 🎵 | Which TikTok videos lose viewers early, and which hook should I retest given each ad’s spend and cost per conversion? |
| See what is driving lead costs | `linkedin-ads-icon.webp` 💼 | Which LinkedIn campaigns spent the most per recorded lead, and which should I review before assigning more budget? |
| Find where visits fail to convert | `google-analytics-icon.svg` 📊 | Which Google Analytics 4 landing pages attract the most sessions but record few key events, and which page should I improve first? |
| Check for missed or duplicate conversions | `google-tag-manager-icon.svg` 🏷️ | Which published Google Tag Manager tags or triggers could double-count or miss a conversion, and what should I test on the site? |
| Find searches that could bring more visits | `google-search-console-icon.webp` 🔎 | Which Google Search Console queries get many impressions but few clicks, and which page titles should I test first? |
| Find what is blocking product visibility | `google-merchant-center-icon.svg` 🛍️ | Which Google Merchant Center issues block products from appearing in Shopping, and which items should I fix first? |

Offer **See what competitors are advertising** when the public Google or Meta ad-library tools are available. The prompt is “Compare my competitor’s public ad offers and calls to action in my market, link to examples and suggest one message I could test.” Name the available libraries. This requires LoomaScale sign-in and usable access, even with zero ad accounts connected. Resolve the competitor and country after selection using [competitor ad research](../../competitor-ad-research/SKILL.md). Route a selected paid-media audit to [ads performance audit](../../ads-performance-audit/SKILL.md) scoped to the selected source and question. Route other single-source work to the [integration guide](../../loomascale/SKILL.md).

## What can I learn by comparing sources?

Give each choice a business-question title with the provider names and icons beneath it. Include the actual source names in the prompt. Enable a comparison only when all required tools and connections are usable. If a required read already failed or lacked comparable figures for this target and period, omit that comparison. Confirm the business and resource relationship on selection. With one missing source, put a short preview beside its connection link. With no connections, one example such as “Connect Google Ads and GA4 to see what visitors did after a paid click” is enough.

| Required sources | Button label | Question to run on selection |
| --- | --- | --- |
| Ads + GA4 | Which paid visits lead to key events? | Compare paid traffic with GA4 sessions and key events for the same business and identify where the trends diverge. |
| Two ad platforms | Where could my ad budget work harder? | Compare week-over-week spend and cost per named outcome by channel and flag one budget decision worth investigating. |
| Search Console + GA4 | Which search pages bring valuable visits? | Match organic landing pages across Search Console and GA4 and identify one page gaining search clicks but recording few key events. |
| Google Ads + Merchant Center | Could product issues explain lost clicks? | Compare Shopping delivery with eligibility issues for matching products and list the items worth fixing first. |
| Tag Manager + GA4 | Could my tracking be missing conversions? | Compare the published tag setup with recorded GA4 events and give me a short list of live checks for possible gaps or duplicates. |

Use [cross-source insights](../../cross-source-insights/SKILL.md) after the user chooses one. Keep each platform’s currency and attributed outcomes separate. For unlike outcomes, compare each platform’s change against its own baseline.

## What can I manage or check regularly?

Offer one or two concrete management examples only for a connected target with a matching exposed write tool and known edit permission. Examples include drafting a paused campaign, previewing a budget change, reviewing Google Ads negative keyword additions, marking a GA4 key event, drafting a GTM tag change or updating a Merchant Center product attribute. Use a short invitation such as **Preview a budget change**. Explain that the user reviews the proposed change before it is applied. Use the [integration workflow](../../loomascale/SKILL.md) on a later request. Onboarding makes no edits, dry runs or permission probes.

Offer **Schedule a weekly [subject] review** when the assistant’s scheduler can access the verified source. Fill in the subject, source, target name and ID, and the review instructions before binding the native suggested reply:

> Schedule a recurring weekly task for [source and target]. Each week, use LoomaScale to [read-only review instructions] and send me a short summary with one change worth investigating.

For ads, compare spend, clicks, the named outcome and cost per outcome over the latest two complete seven-day windows. For GA4, compare sessions, key events and acquisition channels. For Search Console, compare finalized clicks and impressions by page. For Merchant Center, report current eligibility and issues for the same destination and country. For Tag Manager, report the published version and tracking configuration. Compare current-state checks over time only when a comparable prior snapshot is available.

Display the suggestion during onboarding. A click or numbered reply asks the assistant to use its native scheduler to create the recurring task. Carry the scoped IDs and rolling review instructions into the saved task. Reuse known preferences and ask once for any missing weekday, time, time zone or delivery details required by the scheduler. Reuse an identical existing weekly task. Confirm creation only after the scheduler succeeds, with the cadence and next run when returned. In a copy-only host, use **Copy scheduling request** and explain that pasting it into chat starts setup. Without recurring plugin access, offer an on-demand review. Keep conditional alerts in **More tasks** only when scheduled evaluation and notifications are available.

## How do I start a full ads performance audit?

Use **Run full ads performance audit** as the final, secondary action for a verified ad account. The finding-specific recommendation stays beside the snapshot. Bind its suggested reply to the [Ads Performance Audit skill](../../ads-performance-audit/SKILL.md).

> Use $ads-performance-audit to audit my connected ad accounts for wasted spend and tracking issues, then rank the fixes I should review first.

Keep any account or client scope the user already chose. Start the audit only when the user selects the action or sends the prompt. In text-only chat, end with **Run full ads performance audit — reply “audit”** and map that reply to the same prompt.

## How should the controls work?

Place the primary action directly after the finding. Prefer native suggested replies bound to the full prompt. Present connected-source actions as compact rows with dividers, comparisons as related questions in one lightly tinted panel, and connection links as wrapping icon buttons. Keep the full-audit button standalone at the bottom. For more than five available business tasks, put the rest behind **More tasks**. In text chat, that reply reveals the remaining prompts. A plan-blocked choice is a preview with its prerequisite. A connected source whose tool is unavailable gets a short explanation.

When a host can display inline HTML but cannot send a follow-up, render a copy of the [action menu template](../assets/action-menu.html). Fill its `menu-data` with localized groups. Each has a `title` and an `items` array. Use `moreLabel` and `moreItems` for a disclosure. For a wholly collapsed source directory, set `items: []` and put its links in `moreItems`. Set `tone` to `cyan` for local actions, `lavender` for comparisons or `blue` for setup. Each item has a `label`, optional `hint` and optional `icons` (filename and fallback glyph). Use `prompt` to expand and copy, `href` to open the returned HTTPS link, or neither for a preview. For the weekly task set `prompt` to the complete scheduling request and `copyLabel` to the localized “Copy scheduling request”.

```json
[{"title":"Compare across sources","tone":"lavender","items":[{"label":"Which paid visits lead to key events?","hint":"Google Ads + GA4","icons":[["google-ads-icon.webp","📣"],["google-analytics-icon.svg","📊"]],"prompt":"Compare Google Ads traffic with GA4 sessions and key events for the same business and identify where the trends diverge."}]}]
```

Fill `recommended-action-data` with the one primary item (`label`, `hint`, and either a follow-up `prompt` or the returned `href` with optional `icons`). For a prompt, use the hint to explain that selection copies the request for pasting into the same chat. A link opens the returned destination.

Serialize as JSON and escape literal `<` as `\u003c` before embedding it. Keep account figures in the chat snapshot. The template opens questions for copying into the same chat and renders links with their provider icons. Keep the control labels “Copy question”, “Copied” and “Select and copy the question” in the user's language. If the host cannot render the template inline, use the numbered chat version directly.

For the HTML footer, fill the separate `ads-audit-data` element with an object containing `label`, `hint` and the full audit `prompt` above. Use “Run full ads performance audit” and the hint “Copy the request, then paste it into this chat to start the audit.” For a blocked audit, omit `prompt` and put the recovery step in `hint`. Leave the value `null` when there is no verified ad account. Apply the same JSON escaping and localization as for the menu.
