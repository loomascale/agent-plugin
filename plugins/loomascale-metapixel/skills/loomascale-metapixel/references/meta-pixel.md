# Meta Pixel checks

## Datasets and event counts

- `meta_list_datasets` without `dataset_id` lists the datasets (pixels) the ad account
  can use, with when each last received an event, and the account's custom conversions
  with their rules. A dataset whose last event is days old has likely stopped firing.
- With `dataset_id`, it counts each event (PageView, Lead, Purchase, …) received over the
  last `days` days, 1 to 7. Meta keeps no older counts.
- `event_source: "WEB_ONLY"` counts browser (pixel) events, `"SERVER_ONLY"` Conversions API
  events; omit it for both. Run both to compare.

Received events are not attributed conversions. A Purchase count in the dataset and the
purchases `meta_get_insights` reports for campaigns will differ because of attribution
windows, consent and deduplication.

## Event Match Quality and CAPI health

`meta_get_dataset_quality` returns, per web event:

- the EMQ score (0 to 10) and the coverage of each match key (email, phone, IP, user
  agent, fbp, fbc, …)
- Meta's diagnostics, with affected event counts and suggested fixes
- how many browser events have a matching server event (CAPI coverage)
- deduplication key coverage, upload frequency and delay, and value or currency issues

Events without server data omit the server blocks. Different browser and server counts
alone do not prove duplication; read the deduplication feedback. Lead with the
diagnostic that affects the most events, usually missing match keys or missing
`event_id` for deduplication.

## Linking tracking to campaigns

- `meta_get_adset` shows the ad set's `promoted_object`: the pixel and conversion event it
  optimizes for. An ad set optimizing for an event the dataset no longer receives cannot
  learn.
- `meta_get_insights` with `level` and a date range shows reported results; compare the
  same length of time before. A sudden drop in every campaign at once points at tracking
  rather than ads.
- `meta_list_audiences` shows website custom audiences; they shrink when the pixel stops.
- `meta_get_activity_log` shows account changes around the date of a drop.

## Fixes are made elsewhere

This plugin cannot change tracking. Point the user to Meta Events Manager for dataset
settings and test events, to their website or e-commerce platform for the pixel code
and CAPI integration, and to their tag manager for tags.
