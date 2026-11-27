---
name: getting-started-adlibrary
description: Use on a first visit or setup recheck in the LoomaScale Ad Library plugin. Check access, run one competitor ad lookup on Google and Meta and suggest a next research step.
---

# Getting started with Ad Library in LoomaScale

## Check access

On this plugin's `loomascale-adlibrary` connection, call `loomascale_get_user` with `{}`.
No ad account connection is needed: every tool here reads the public Google Ads
Transparency Center and Meta Ad Library. Keep in-chat tasks to competitor ad research.

Proceed with an active trial, a paid plan or legacy access. Competitor ad research is
not part of the Free plan: on the Free plan, say so and show the returned plan link
before any lookup. For a pending trial, tell the user before the first metered call that
it starts the trial. If the check fails, offer sign-in or retry.

## Who is the competitor?

Ask for one competitor's brand name or website and the country to research, unless
the user already gave them. Then run both lookups with a small `limit`:

- Google: with a website, call `gads_list_ad_library_ads` with `domain`; with only a
  name, find the advertiser with `gads_search_ad_library_advertisers` first.
- Meta: find the Page with `meta_search_ad_library_advertisers`, confirm the right one
  when several are plausible, then call `meta_list_ad_library_ads` with its `page_id`.

Show a compact table per platform: advertiser, format, first and last shown dates or
active status, and a short note on the message or offer where the listing has text.
Name the country and date scope once above each table. Add one plain-language
observation, such as the offer most of the ads repeat, with its denominator.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Place one recommended button
beneath the tables, then three to five short suggestions under **What else can I help
you with?**:

- **Read the top Google ads** — Open about five creatives for their headlines and text.
- **Compare two competitors** — Put their offers, calls to action and formats side by side.
- **Check another country** — Run the same lookup in a second market.
- **See EU reach** — Read who paid for a Meta ad and how many accounts it reached in the EU.
- **Find messaging gaps** — List angles none of the inspected ads use.

Use [competitor ad research](../loomascale-adlibrary/SKILL.md) for selected tasks.

## What this plugin cannot do

It reads public ad libraries only. It cannot show a competitor's budgets, spend,
targeting, bids or conversions, and it does not read or change the user's own ad
accounts. For that, say it needs the full LoomaScale plugin.
