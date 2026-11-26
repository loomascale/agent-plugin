# Which marketing task should I choose?

Use the live catalog and exposed tools to select rows. The order below follows the LoomaScale dashboard’s default for advertisers. Use actual popularity ranks if supplied. Do not describe the default order as measured usage. Append newly supported sources using the catalog description and a verified reporting capability.

## What can I audit with each source?

For a connected source, the action submits the one-sentence question. For a missing source, use **Connect {source}** and a few words about the outcome, such as “Find costly search terms.” The icon files live under `https://loomascale.com/icons/`. Use the glyph when images are unavailable.

| Daily action | Provider icon / glyph | Question to run on selection |
| --- | --- | --- |
| Run Google Ads waste audit | `google-ads-icon.webp` 📣 | Which Google Ads campaigns or search terms spent the most without a recorded conversion, and which should I review first? |
| Run Meta Ads waste audit | `meta-icon.webp` ♾️ | Which Meta ads on Facebook or Instagram cost the most per result, and which creative or placement should I test next? |
| Audit TikTok video ads | `tiktok-ads-icon.svg` 🎵 | Which TikTok videos lose viewers early, and which hook should I retest given each ad’s spend and cost per conversion? |
| Audit LinkedIn lead costs | `linkedin-ads-icon.webp` 💼 | Which LinkedIn campaigns spent the most per recorded lead, and which should I review before assigning more budget? |
| Find GA4 landing-page opportunities | `google-analytics-icon.svg` 📊 | Which Google Analytics 4 landing pages attract the most sessions but record few key events, and which page should I improve first? |
| Audit Google Tag Manager tracking | `google-tag-manager-icon.svg` 🏷️ | Which published Google Tag Manager tags or triggers could double-count or miss a conversion, and what should I test on the site? |
| Find Google Search Console opportunities | `google-search-console-icon.webp` 🔎 | Which Google Search Console queries get many impressions but few clicks, and which page titles should I test first? |
| Audit Google Merchant Center products | `google-merchant-center-icon.svg` 🛍️ | Which Google Merchant Center issues block products from appearing in Shopping, and which items should I fix first? |

Offer **Research competitors’ ads** when the public Google or Meta ad-library tools are available. The prompt is “Compare my competitor’s public ad offers and calls to action in my market, link to examples and suggest one message I could test.” Name the available libraries. This requires LoomaScale sign-in and usable access, even with zero ad accounts connected. Resolve the competitor and country after selection using [competitor ad research](../../competitor-ad-research/SKILL.md). Route a selected paid-media audit to [ads performance audit](../../ads-performance-audit/SKILL.md) scoped to the selected source and question. Route other single-source work to the [integration guide](../../loomascale/SKILL.md).

## What can I learn by comparing sources?

Give each choice a business-question title, both provider icons and a second line naming the sources. Include both actual source names in the submitted prompt so it makes sense on its own. Enable the action when both sources have usable tools and connections. Verify the business and resource relationship before comparing data on selection. If a relationship is unknown, ask then. With one missing source, use a short preview pointing to its existing connection button. With no connections, one example such as “Connect Google Ads and GA4 to see what visitors did after a paid click” is enough.

| Required sources | Button label | Question to run on selection |
| --- | --- | --- |
| Ads + GA4 | What happened after the click? | Compare paid traffic with GA4 sessions and key events for the same business and identify where the trends diverge. |
| Two ad platforms | Where is spend becoming less efficient? | Compare week-over-week spend and cost per named outcome by channel and flag one budget decision worth investigating. |
| Search Console + GA4 | Which search pages bring valuable visits? | Match organic landing pages across Search Console and GA4 and identify one page gaining search clicks but recording few key events. |
| Google Ads + Merchant Center | Could product issues explain lost clicks? | Compare Shopping delivery with eligibility issues for matching products and list the items worth fixing first. |
| Tag Manager + GA4 | Can I trust my conversion tracking? | Compare the published tag setup with recorded GA4 events and give me a short list of live checks for possible gaps or duplicates. |

Use [cross-source insights](../../cross-source-insights/SKILL.md) after the user chooses one. Keep each platform’s currency and attributed outcomes separate. For unlike outcomes, compare each platform’s change against its own baseline.

## How should the controls work?

Prefer native suggested replies bound to the full prompt. Use normal link buttons for connections, even on a host that also submits prompts. A plan-blocked choice is a preview with its prerequisite. A connected source whose tool is unavailable gets a short explanation.

When a host can display inline HTML but cannot send a follow-up, render a copy of the [action menu template](../assets/action-menu.html). Fill its `menu-data` element with a JSON array of groups, using the user’s language. Each group has a `title` and `items`. Each item has a `label`, optional `hint`, optional `icons` (pairs of filename and fallback glyph), and **one** of `prompt` (expand and copy), `href` (open the actual returned HTTPS link), or neither (informational preview). For example:

```json
[{"title":"Compare across sources","items":[{"label":"What happened after the click?","hint":"Google Ads + GA4","icons":[["google-ads-icon.webp","📣"],["google-analytics-icon.svg","📊"]],"prompt":"Compare Google Ads traffic with GA4 sessions and key events for the same business and identify where the trends diverge."}]}]
```

Serialize as JSON and escape literal `<` as `\u003c` before embedding it. Keep account figures in the chat snapshot. The template opens questions for copying into the same chat and renders links with their provider icons. Keep the control labels “Copy question”, “Copied” and “Select and copy the question” in the user's language. If the host cannot render the template inline, use the numbered chat version directly.
