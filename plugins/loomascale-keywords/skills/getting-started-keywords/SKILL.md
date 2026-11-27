---
name: getting-started-keywords
description: Use on a first visit or setup recheck in the LoomaScale Keyword Planner plugin. Check the Google Ads connection, run one keyword idea search and suggest a next research step.
---

# Getting started with Keyword Planner in LoomaScale

## Check connection and access

On this plugin's `loomascale-keywords` connection, call `loomascale_list_data_sources`
with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected.
Use the Google Ads row with `tools_in_current_plugin: true`. A focused plugin normally
returns `all_sources: false`. Keep in-chat tasks to keyword research.

Proceed with an active trial, the Free plan, a paid plan or legacy access. Every tool
here is a read, so the Free plan (`readOnly: true`) can run them within its weekly task
allowance. For a pending trial, tell the user before the first metered call that it
starts the trial. If a plan is required, show the returned plan link. If a check fails,
offer sign-in or retry.

For `not_connected`, offer **📣 Connect Google Ads** to research keywords with Keyword
Planner data. Use the returned `connect_url` verbatim, falling back to `connections_url`
or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
Use **Reconnect** for `needs_attention` and **Recheck** for an unknown status. Let the
user open the link, then offer **Recheck setup** to refresh both checks.

## Which keywords fit my business?

Call `gads_list_ad_accounts` and pick the client account for the business; ask when
several unrelated ones are reachable. Pass it as `customer_id` from then on.

Ask for one seed: the website, a landing page or two to five keywords, plus the
country or city. Resolve the place with `gads_find_locations`. Call
`gads_keyword_ideas` with a small `limit` (about 20). Show a compact table of keyword,
average monthly searches, competition and low and high top-of-page bid, with the
location, language and currency named once above it. Add one plain-language
observation, such as which terms combine high volume with lower bids.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Place one recommended button
beneath the table, then three to five short suggestions under **What else can I help
you with?**:

- **Check volume for my list** — Paste the keywords you already use and see search volume and seasonality.
- **Forecast a campaign** — Estimate cost and clicks for these keywords with your daily budget.
- **Match keywords to ad groups** — See which existing ad group each new keyword belongs in.
- **Try another location** — Compare the same ideas in a second country or city.
- **More ideas from my website** — Seed ideas from the whole site instead of one page.

Use [Keyword Planner research](../loomascale-keywords/SKILL.md) for selected tasks.

## What this plugin cannot do

It researches and forecasts only. When the user wants to add the keywords, create a
campaign or change bids, say that it is done in Google Ads or with the full LoomaScale
plugin, and offer the researched list in a copyable form.
