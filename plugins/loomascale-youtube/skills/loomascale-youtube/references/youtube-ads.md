# YouTube ads tools

## Which campaigns are YouTube campaigns

`gads_list_campaigns` returns each campaign's `type`. Treat `DEMAND_GEN` and `VIDEO` as
YouTube campaigns. Demand Gen also serves on Discover, Gmail and Display unless its ad
group channels are limited to YouTube; `include_ad_groups` shows the channel choice.

Classic `VIDEO` campaigns are read-only outside the Google Ads interface. Report them,
and give a recommended change to make in Google Ads instead of calling a write tool.

## Reporting

`gads_get_insights` reports spend, impressions, clicks, CTR, average CPC, conversions and
conversion value. Use `date_preset` or `since`/`until`. To compare periods, run the same
call for the previous range of equal length.

- `include_video_metrics: true` adds TrueView views, view rate (views over impressions),
  average cost per view and the 25/50/75/100% watch rates. These are ad views as Google
  defines them, not organic YouTube views. Keyword and bidding strategy levels have none.
- `segments: ["ad_sub_network_type"]` splits Demand Gen rows by YouTube surface:
  `YOUTUBE_INSTREAM`, `YOUTUBE_INFEED`, `YOUTUBE_SHORTS`, or `UNSEGMENTED` off YouTube.
  Keyword-level rows cannot be split this way.
- `segments: ["network"]` splits by network (YOUTUBE, DISCOVER, GMAIL, CONTENT, ...).
- `level: ad` with video metrics shows which video ads hold viewers. A steep drop between
  the 25% and 50% rates usually points at the opening seconds of the video.

`gads_get_audience_insights` and `gads_get_geo_insights` rank audiences and locations by
spend. Rank waste by spend with no conversions, and call a small sample directional.

## Launching a Demand Gen video campaign

1. Find location ids with `gads_find_locations` when the user gives place names.
2. Call `gads_create_demand_gen_campaign` with `validate_only: true`: name, daily budget,
   bidding strategy, locations, languages, `channel_strategy`, and a video ad built from
   `youtube_video_ids` of videos already on YouTube, with headlines, descriptions,
   business name, logo and final URL. Show the preview.
3. Repeat without `validate_only` after the user approves. Budget, campaign, ad group and
   ad are created in one all-or-nothing request, with the campaign PAUSED.
4. Activate with `gads_activate_campaign` only when the user asks.

Use `gads_create_demand_gen_ad_group` and `gads_create_demand_gen_ad` to add to an
existing Demand Gen campaign; new ad groups and ads are PAUSED. There is a daily limit on new
campaigns. Uploading or editing videos is done in YouTube Studio.

## Changes to existing campaigns

- `gads_set_status`: pause or enable a campaign, ad group or ad. Enabling re-checks the
  campaign budget against the spend cap.
- `gads_update_budget`: change a campaign's daily budget, within the spend cap.
- `gads_update_campaign_bidding`: switch bidding strategy or set a target.
- `gads_update_demand_gen_ad_group_targeting`: Demand Gen locations, languages, audience
  and optimized targeting live on each ad group, not on the campaign.
- `gads_update_demand_gen_ad_group_channels`: choose YouTube, Discover, Gmail and Display
  channels per ad group.

To change an existing Demand Gen ad, create a paused replacement and switch the two with
`gads_set_status`.
