---
name: loomascale-tiktokpixel
description: Check the TikTok Pixel and Events API of the user's connected TikTok ad accounts with LoomaScale. Use for whether a pixel receives events, browser versus server (Events API) event counts, attributed events, the events a pixel defines, TikTok's EVENT_TRACK diagnostics, which ad groups track with a pixel and optimize for an event, and conversion drops that may be tracking problems. Read-only. Do not invoke for changing campaigns, installing the pixel, Meta, Google Analytics or other ad platforms.
---

# TikTok Pixel and Events API with LoomaScale

Answer TikTok tracking questions with evidence from the user's connected TikTok ad
accounts. This package connects to `https://api.loomascale.com/mcp/tiktokpixel`. Inspect
available tool descriptions and input schemas; a client may add a namespace to the tool
names used here. Live schemas take precedence over this guide.

One TikTok pixel receives both browser (pixel) events and server (Events API) events.

## Resolve the ad account and pixel

Reuse an ad account already verified in the conversation. Otherwise call
`tiktok_list_ad_accounts` and pass `advertiser_id` on every call; ask which one when
several are reachable and none is named. Then call `tiktok_get_pixel_events` without
`pixel_id` to find the account's pixels, and confirm the one the user means.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| Which pixels does the account have? Which events do they define? | `tiktok_get_pixel_events` |
| Which events arrive, from browser or server? | `tiktok_get_pixel_events` with `pixel_id`, `start_date` and `end_date` |
| Is TikTok flagging the tracking? | `tiktok_get_adgroup_diagnostics` (EVENT_TRACK findings) |
| Which ad groups track with this pixel, and for which event? | `tiktok_get_adgroups` (`pixelId`, `optimizationEvent`) |
| Which pixel does an ad track with? | `tiktok_get_ad_creative` |
| Did reported conversions drop? | `tiktok_get_performance` for this and the previous period |
| Which audiences come from site traffic? | `tiktok_list_custom_audiences` |
| Account time zone and currency | `tiktok_get_ad_account` |

Read [TikTok Pixel checks](references/tiktok-pixel.md) for how to read the counts and
diagnostics without over-claiming.

## Stay read-only

No tool here changes TikTok, installs a pixel or sends events. Give fixes as steps for
the user's website, tag manager or TikTok Events Manager. For changes to campaigns, say
they need the TikTok Ads or full LoomaScale plugin.

## Handle access and helper tools accurately

- If authorization is missing or TikTok Ads is not connected, use the link the tool
  returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
- For a plan or trial refusal, call `loomascale_get_user` once and explain the plan,
  trial, task or account allowance it reports. Weekly tasks used up: give the reset date
  from the message. Never retry a refusal.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it only when
  the user asks to send a feature request.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which are
  connected, and which this plugin has tools for. It connects nothing: give the link it
  returns, and say plainly when a source needs the full LoomaScale plugin.

## Return a result the user can assess

Name the ad account, pixel and time window (UTC). Separate received events from
attributed events and from conversions TikTok reports on ads. Quote TikTok's diagnostic
text and say which fix matters most first.
