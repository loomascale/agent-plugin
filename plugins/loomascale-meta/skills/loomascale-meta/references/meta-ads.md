# Meta Ads tools

Shared with the all-in-one LoomaScale plugin's advertising and competitor-research
references; keep them in step.

## Which reporting details change the interpretation?

- `meta_get_insights` uses `since`/`until` and lowercase presets. `time_increment`
  is a string such as `"1"`, `"7"`, `"monthly"` or `"all_days"`.
- Pair `platform_position` with `publisher_platform` for placement analysis.
- Inspect action types and attribution windows before labeling a count as
  purchases or leads.
- Money inputs for budget tools are major units in the account currency.

| User task | Smallest useful sequence |
|---|---|
| Find wasted spend | `meta_get_insights` at ad set and ad level; flag spenders without results |
| Explain a CPA or ROAS change | Account totals for both periods, then the largest changing campaigns, placements or audiences |
| Diagnose no delivery | `meta_get_delivery_issues`, `meta_check_pacing`, then the affected objects and their parents |
| Review creative fatigue | Ad-level insights and `meta_list_ads`, then `meta_list_creatives` / `meta_get_ad_preview`. Rising frequency with falling results suggests a test, not proof of fatigue |

## How can I check Meta Pixel and Conversions API health?

These checks read the account's datasets. They do not install pixels, send
events or change tracking settings.

1. `meta_list_datasets` finds datasets/pixels, last received event times and
   custom conversion rules. Reuse the intended `dataset_id`.
2. `meta_list_datasets` with that ID returns received event counts over the
   last 1-7 days. `event_source: "WEB_ONLY"` is browser Pixel events,
   `"SERVER_ONLY"` is Conversions API events; omit it for both.
3. `meta_get_dataset_quality` returns Event Match Quality, match-key coverage,
   deduplication and upload-delay feedback.
4. Different browser and server counts alone do not prove duplication; read the
   deduplication feedback. Received events are not attributed conversions.

## How are public competitor ads researched?

1. `meta_search_ad_library_advertisers` with a brand, Page name or Instagram
   handle returns public Pages. Compare `pageId`, name, linked Instagram handle
   and verification before choosing one. A website is not a Page selector.
2. `meta_list_ad_library_ads` with `page_id` and `country` (singular arguments)
   returns copy, media, calls to action and destinations. Defaults: 15 records,
   active ads only. For a past period pass `active_status: ALL` and delivery
   bounds. Pass `nextCursor` back as `cursor` unchanged.
3. `meta_get_ad_library_ad` with a returned `adReference` adds EU/UK reach and
   payer disclosures. It is not needed to read the creative.

Library records do not establish impressions, spend, results or targeting.

## How should an authorized change be completed?

1. Read the current target and its parents. Resolve exact IDs, values and the
   account currency.
2. Pick the narrowest tool; preserve omitted settings.
3. Execute, then read the target back and report the resulting status.

### Create or launch

`meta_create_campaign` builds campaign, ad set and ad in one call;
`meta_create_campaign_only` → `meta_create_adset` → `meta_create_ad` builds in
stages. Resolve identity with `meta_list_pages` and `meta_list_instagram_accounts`,
locations with `meta_find_locations`, and for a website conversion campaign the
event with `meta_list_datasets`. Everything is created paused.
`meta_activate_campaign` previews with `confirmed:false`; call with
`confirmed:true` only after the user approves the budget. For existing objects
use `meta_set_status` (`ACTIVE`/`PAUSED`). An active child under a paused
parent does not serve, and new ads can await Meta review.

### Budgets, targeting and bidding

Find whether the campaign or the ad set owns the budget, then `meta_update_budget`.
Do not convert a lifetime budget into a daily one. The spend cap validates daily
amounts; it does not guarantee actual daily spend. For targeting read
`meta_get_adset` first and use `meta_update_adset_targeting`; exact lists and
add/remove operations replace differently. `meta_update_adset_bidding` changes
the bid strategy or amount. A change can restart learning.

### Audiences, experiments, boosts and removal

- Custom audiences: `meta_list_audiences`, `meta_create_audience`,
  `meta_update_audience`, `meta_update_audience_users`, `meta_delete_audience`.
- `meta_create_ab_test` and `meta_create_lift_study` can change live audience
  allocation at once. `meta_end_ab_test` keeps results; `meta_cancel_ab_test`
  deletes the study and its results after a `confirmed:false` preview.
- `meta_boost_instagram_post`: preview with `confirmed:false`, then
  `confirmed:true`. It creates a paused ad.
- `meta_delete_object` needs a paused campaign, ad set or ad (or an unused
  creative) and `confirm_name`. Deleting a campaign deletes its children.
