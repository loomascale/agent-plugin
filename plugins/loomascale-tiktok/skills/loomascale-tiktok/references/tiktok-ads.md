# TikTok Ads tools

Shared with the all-in-one LoomaScale plugin's advertising reference; keep both in step.

## How do I audit TikTok Ads performance?

1. Find the advertiser ID with `tiktok_list_ad_accounts`. Use `tiktok_get_performance`
   to compare spend, conversions and cost per conversion by campaign, ad group or
   ad over the requested dates. For purchase ROAS, request `complete_payment_roas`
   when available.
2. Compare ads with `tiktok_get_creative_performance`, or set `group_by` to `VIDEO`
   to combine results for the same video across ads. Hook rate is 2-second views per
   impression, hold rate is 6-second views per impression and completion rate is
   full views per play. TikTok also counts some early engagements and completions of
   shorter videos as 6-second views. Use `tiktok_get_ad_creative` for the caption,
   call to action, landing page and temporary preview. For the counting rules, see
   [TikTok's video play metric definitions](https://ads.tiktok.com/resources/help/article/video-play?lang=en).
3. Request one `breakdown` at a time with `tiktok_get_audience_performance` (AGE,
   GENDER, COUNTRY, PLACEMENT, PLATFORM, LANGUAGE, NETWORK or INTEREST). Compare
   these directional results with targeting in `tiktok_get_adgroups` and the
   audiences in `tiktok_list_custom_audiences`.
4. For an Upgraded Smart+ ad, set `group_by` to `MATERIAL` in
   `tiktok_get_creative_performance` to compare the creatives inside it; narrow by
   one kind of ID at a time. `tiktok_get_creative_fatigue` returns TikTok's own
   daily fatigue flag and index for one ad over the past 60 days; TikTok enables it
   per ad account, so a refusal means the account does not have it.
5. Check tracking with `tiktok_get_pixel_events`: event counts per pixel, split
   into browser and server events, for up to 30 days (UTC). It returns counts
   only. `tiktok_get_ad_review` explains a rejection in TikTok's words for up to 20
   ads or ad groups.

## Which reporting details change the interpretation?

- TikTok uses `start_date`/`end_date` (YYYY-MM-DD, days in the ad account's time
  zone; default the last 30 days). `granularity` DAY spans at most 30 days, WEEK 180,
  MONTH and TOTAL 365. Metrics arrive under TikTok's own names; `null` means TikTok
  has no value, not zero. `conversion` is the ad group's optimisation event and
  `result` the objective's result, so do not equate either with another platform's
  conversion without checking the event. `hasMore:true` means the page is partial.
  Amounts are in the ad account's currency (`tiktok_get_ad_account`).
- Money inputs for budget tools are major units in the account currency.

## How should an authorized change be completed?

TikTok Ads changes are limited to existing objects: `tiktok_set_status` (ENABLED or
DISABLED; it cannot delete), `tiktok_update_budget` (the amount only; the budget
stays daily or lifetime, and an object with no budget of its own is refused),
`tiktok_update_bidding` (only the bid the ad group's strategy already uses),
`tiktok_rename_object`, `tiktok_update_adgroup_targeting` (each list passed replaces
the ad group's list for that criterion, so read it with `tiktok_get_adgroups` first
and pass the full list; omitted criteria stay as they are),
`tiktok_update_adgroup_schedule` (start, end, open-ended or not, and dayparting;
times are UTC) and `tiktok_set_creative_status` (enable or pause single creatives
inside an Upgraded Smart+ ad, by the `adMaterialIds` from the `MATERIAL` report).
Call each with `dry_run:true`, show the proposed change, and
repeat without it after approval. They work on manual, Smart+ and Upgraded Smart+
campaigns; an Upgraded Smart+ ad is addressed by its `smartPlusAdId`.

TikTok creation covers Upgraded Smart+ campaigns that send people to a website:
`tiktok_create_campaign` (objective `SALES` or `LEAD_GENERATION`; a budget here
makes the campaign hold it), `tiktok_create_adgroup` (`CONVERT` with a `pixel_id`
and `optimization_event` from `tiktok_get_pixel_events`, or `CLICK`; locations are
required; a budget only when the campaign holds none) and `tiktok_create_ad`
(videos and cover images from `tiktok_list_creative_assets`, an identity from
`tiktok_list_identities`, 1-5 ad texts, one call to action, one https landing
page). Everything is created paused and no argument changes that; enable with
`tiktok_set_status` only after approval. Nothing is uploaded, so a missing video
goes into the TikTok creative library first. TikTok refuses creation on ad accounts
it has not enabled for Upgraded Smart+. For app, catalog, TikTok Shop, search or
instant-form campaigns, recommend TikTok Ads Manager.
