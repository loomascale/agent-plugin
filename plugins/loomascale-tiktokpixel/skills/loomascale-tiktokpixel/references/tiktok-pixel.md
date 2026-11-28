# TikTok Pixel checks

How to read what the TikTok Pixel plugin returns without over-claiming.

## Event counts

- `tiktok_get_pixel_events` counts events received per event type over at most 30 days
  per call (UTC days, default the last 7). Counts only: no event contents, no visitor data.
- `browserCount` came from the pixel on the page, `serverCount` from the Events API.
  Both counted for the same event can mean the site sends each event twice; TikTok
  deduplicates only events that share an `event_id`, which these counts do not show.
- `attributedCount` is how many TikTok matched to an ad. Low attribution next to a
  healthy total points at matching (missing email, phone or `ttclid`) or at traffic that
  did not come from TikTok, not at a broken pixel.
- `previewCount` is test events from TikTok's preview tool; leave them out of health
  judgements.
- A defined event with no activity received nothing in the window. Say so plainly; do not
  call the pixel broken unless the whole pixel is silent.

## Diagnostics

- `tiktok_get_adgroup_diagnostics` returns TikTok's findings as TikTok states them. Use
  `issue_categories: ["EVENT_TRACK"]` for tracking.
- No finding means TikTok detected no issue, not that tracking is correct.

## Ad groups and conversions

- An ad group's `pixelId` and `optimizationEvent` say which pixel and event its delivery
  depends on. A silent event under an ad group that optimizes for it is the most urgent
  finding.
- Conversions in `tiktok_get_performance` are attributed to ads under the account's
  attribution settings. They will not equal received pixel events; compare trends, not
  totals.

## Conversion drops

Compare the same days in both sources: if received events fell too, suspect tracking
(site change, tag removed, consent banner, Events API outage). If events held and
reported conversions fell, suspect delivery, attribution or audience changes instead.

## Fixes

Every fix happens outside this plugin: on the website or e-commerce platform, in a tag
manager, in the server integration that calls the Events API, or in TikTok Events
Manager. Give the step and where to make it.
