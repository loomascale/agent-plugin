---
name: getting-started-linkedin
description: Use on a first visit or setup recheck in the LoomaScale LinkedIn Ads plugin. Check the LinkedIn Ads connection, show weekly spend and leads and suggest a demographic or waste question.
---

# Getting started with LinkedIn Ads in LoomaScale

## Check connection and access

On this plugin's `loomascale-linkedin` connection, call `loomascale_list_data_sources`
with `{}`, then `loomascale_get_user` with `{}`, even when the provider is disconnected.
Use the LinkedIn Ads row with `tools_in_current_plugin: true`. A focused plugin normally
returns `all_sources: false`. Keep in-chat tasks scoped to LinkedIn Ads.

Proceed with an active trial, the Free plan, a paid plan or legacy access. The Free plan
(`readOnly: true`) allows reads within a weekly task allowance, so run the snapshot
without asking the user to pay first and offer changes as recommendations only. For a
pending trial, tell the user before the first metered read that it starts the trial. If
a plan is required, show the returned plan link. If a check fails, offer sign-in or retry.

For `not_connected`, offer **💼 Connect LinkedIn Ads** to see weekly spend and leads. Use
the returned `connect_url` verbatim, falling back to `connections_url` or the
[LoomaScale connections dashboard](https://loomascale.com/dashboard/connections). Use
**Reconnect** for `needs_attention` and **Recheck** for an unknown status.

## What changed in my LinkedIn Ads?

Call `linkedin_list_ad_accounts` and pick the account for the business; ask when several
unrelated ones are reachable. Call `linkedin_get_insights` with `level: account`,
`metric_set: leads`, the last seven complete UTC days as `since` and `until`, and
`compare_previous_period: true`. Show spend, clicks, leads and cost per lead with the
change against the week before, in the account currency. Show a dash where there are no
leads. Add one plain-language observation grounded in the figures.

## Help the user choose a next step

Keep the reply within one to two desktop chat screens. Place one recommended button
beneath the snapshot: **Find spend without leads** when cost per lead rose or leads fell,
otherwise **See who my leads are**. Then three to five short suggestions under **What
else can I help you with?**:

- **See who my leads are** — Break leads and spend down by job title and seniority.
- **Find spend without leads** — Rank campaigns and audiences that spent with nothing to show.
- **Compare creatives** — Which ads earn the best CTR and cost per lead in each campaign?
- **Check industries and company sizes** — Where does the budget go, and where do leads come from?
- **Review a campaign budget** — Show the current budget and preview a change I choose.

Use [LinkedIn Ads reporting and management](../loomascale-linkedin/SKILL.md) for selected
tasks. Offer a change only when a change tool is listed and the plan allows it.
