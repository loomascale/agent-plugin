---
name: conversion-tracking-audit
description: Audit and fix Google Ads conversion tracking and account setup, and health-check a Meta Ads setup. Use when the user asks whether their conversion tracking is right, about duplicate or wrong primary conversion actions, counting type (every vs one), conversion values, lookback windows, making a campaign optimize for one conversion, a Performance Max audit, or which accounts and Pages the connection can reach. Setting changes only on explicit confirmation.
license: MIT
metadata:
  author: loomascale
  version: "1.0.0"
---

# Conversion tracking and setup audit

Wrong measurement poisons Smart Bidding, so this comes before any bidding or budget
advice. Audit first, then apply only the settings the user approves.

## Google Ads

Tools: `google_list_conversion_actions`, `google_update_conversion_action`,
`google_update_campaign_conversion_goals`, `google_update_campaign_bidding`,
`google_list_campaigns`, `google_list_asset_groups`, `google_get_insights`,
`google_list_ad_accounts`, `google_check_billing`.

> Audit my Google Ads conversion tracking. For every conversion action, look at its
> category, type, whether it is primary, its counting type, attribution model, value
> settings and lookback windows, together with how many conversions it actually
> recorded in the last 30 days. Tell me which actions look duplicated, which are marked
> primary when they should not be, which are missing value data or use a flat default
> value, and which primary actions have stopped firing. Explain what each problem does
> to Smart Bidding and what I should verify or change. Then fix the settings I approve.

Counting type: a purchase counted once per click hides repeat orders; a lead form
counted every time inflates the count and the bidding built on it. Recommend the right
setting per action and what it changes in reported numbers.

Imported from Google Analytics: counting type cannot be changed from Google Ads. Say so
and point to where in GA4 to change it. Conversion actions owned by another account
(cross-account) are also refused; explain rather than retry.

Optimize one campaign for one conversion: show account goals and the campaign's own
goals, which actions are ignored because their goal is not biddable; set
campaign-specific goals (`google_update_campaign_conversion_goals`) and switch bidding
to Maximize conversions (`google_update_campaign_bidding`); explain what to watch in
the first two weeks.

Performance Max audit: per asset group spend and conversions, assets and search themes,
weak ad strength, missing asset types, low-rated assets, off-target themes, groups
competing with each other.

Account reach: list accounts with name, customer id, currency, time zone; mark manager
accounts; say which cannot serve and why (`google_check_billing`); say which account is
the default.

## Meta Ads

Tools: `meta_list_ad_accounts`, `meta_list_pages`, `meta_list_campaigns`,
`meta_check_pacing`, `meta_list_datasets` (pixels and datasets).

> Give me a health check on my Meta Ads setup. List the ad accounts this connection
> reaches and say which of them I can actually manage, confirm which Facebook Page my
> ads run from, then review how my campaigns are structured: how many are active, what
> objectives they use, whether budgets sit at campaign or ad set level, and whether
> anything is running that I have forgotten about. Point out what looks like a setup
> mistake rather than a performance problem, and tell me what to fix first. Do not
> change anything.

## Rules

- Show the current value and the proposed value for every setting before changing it.
- One confirmation per change set. List the exact `google_update_conversion_action`
  calls first.
- After a change, say what the user will see differently in reports from now on.
