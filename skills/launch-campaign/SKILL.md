---
name: launch-campaign
description: Plan, draft and launch a Google Ads Search or Performance Max campaign, or a Meta Ads campaign, created paused for review. Use when the user wants to start advertising, research keywords, pick a campaign type, build a first campaign, draft a lead-gen campaign, add a second ad to test, review Meta drafts, or run a pre-launch checklist before activating. Nothing goes live without a separate, explicit activation confirmation.
license: MIT
metadata:
  author: loomascale
  version: "1.0.0"
---

# Launch a campaign

Order of work: measurement, research, plan, confirm, create paused, read back,
checklist, confirm again, activate. Never skip the two confirmations.

## Google Ads

Tools: `google_keyword_ideas`, `google_list_conversion_actions`, `google_find_locations`,
`google_create_campaign` (Search), `google_create_pmax_campaign`,
`google_update_campaign_targeting`, `google_list_asset_groups`, `google_list_campaigns`,
`google_check_pacing`, `google_activate_campaign`.

Campaign type: ask what they sell, who buys, what a customer is worth; look up real
search volume before recommending. Be explicit: you can research, plan and build Search
and Performance Max campaigns in the account; Shopping is planned here and created in
the Google Ads interface.

Keyword research (`google_keyword_ideas`): monthly volume, competition, low and high
top-of-page bid per idea; group by intent; separate ready-to-buy from researching; flag
keywords expensive against customer value; finish with the starting set and match types.

Search campaign:

> Build my first Google Ads Search campaign and leave it paused so I can review
> everything before it spends anything. Start by researching keywords and showing me the
> list. Then draft the campaign: ad group structure, keywords with match types,
> responsive search ad headlines and descriptions, the daily budget I give you, and the
> locations and languages to target — never leave it running worldwide by default. Show
> me the complete plan and wait for my confirmation before you create anything. Once it
> exists, tell me what to check before I activate it.

Lead-gen variant: first show conversion actions, which are primary, which have recorded
conversions, so a submitted form is counted before any spend.

Performance Max: start with conversion actions that have actually recorded conversions
(PMax has nothing to learn from without them). Write headlines, long headlines,
descriptions, business name; ask for a 1.91:1 landscape image, a 1:1 square image and a
1:1 logo at minimum; add search themes, locations and languages. After creation read the
asset group back (`google_list_asset_groups`) and list what to fix.

Pre-launch checklist:

> Verify that conversion tracking exists and is recording, that the right actions are
> marked primary, that the campaign targets the locations and languages I intend rather
> than defaulting to worldwide, and that its budget and bidding settings make sense
> together. List everything that would waste money or go unmeasured if I turned it on
> today, ordered by how badly it would hurt, and tell me what to fix first.

Activation (`google_activate_campaign`): only campaigns created through LoomaScale,
only after the checklist, only on a fresh confirmation. Checked against the spend cap.

## Meta Ads

Tools: `meta_list_pages`, `meta_find_locations`, `meta_create_campaign` (campaign + ad
set + ad, paused), `meta_create_ad`, `meta_list_drafts`, `meta_list_campaigns`,
`meta_list_ads`, `meta_check_pacing`, `meta_activate_campaign`.

Ask for objective, daily budget and landing page first. Draft: objective; ad set
locations, age range, schedule; the Facebook Page it runs from; ad copy, headline, call
to action. Show the plan, wait, create paused, confirm it is paused.

Second ad to test: pick the ad set most worth testing, show the running ad with
metrics, draft one variant that changes a single thing (hook, image direction or CTA),
say what the test tells them and how much spend it needs. Create paused after approval.

Drafts queue (`meta_list_drafts`): list what each unpublished change would do, flag
anything unintended or that starts spending immediately. You cannot publish or edit
drafts; the user does that in Ads Manager.

Pre-launch: objective, ad set budget, schedule and targeting, the Page, the ads, whether
the account can spend; what would waste money in the first 48 hours; what day one
should look like. Then ask for confirmation and activate; say what to look at after 24
hours.

## Rules

- Campaigns are created paused; the tools have no way to create them live.
- Never default to worldwide targeting. Confirm locations with `*_find_locations`.
- Daily budget comes from the user. Do not pick one for them.
