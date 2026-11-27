# Meta Ads competitor research

Research public Meta Ad Library ads across Facebook and Instagram using the advertiser
Page identity. A public library record is separate from an ad in a managed account.

## How is the advertiser Page found?

Call `meta_search_ad_library_advertisers` with `query` (brand, company, Page name or
Instagram handle), optional `country` and a small `limit` (default 10, maximum 25).
Compare returned `pageId`, `name`, `profileUrl`, `pageAlias`, linked Instagram handle,
category and verification evidence. A website alone is not an exact Meta advertiser
selector. Resolve its brand or official social profile instead of treating a domain
text search as proof of ownership.

Reuse a known public Page ID, or the numeric `view_all_page_id` in an Ad Library
advertiser link. Do not pass a vanity username, Instagram handle or `act_...` account
ID to the ad listing. Keep regional Pages and unrelated namesakes separately attributed.

## How are ads and creatives read?

Call `meta_list_ad_library_ads` with `page_id` and `country`. It takes singular
arguments, not `page_ids` or `countries`. It accepts a Page ID or an Ad Library
advertiser link. `search_terms` alone searches ad text across advertisers; with a
Page it narrows that Page's ads. A keyword match does not identify the brand that
paid for the ad, or a keyword the advertiser targeted.

Optional filters are `active_status`, `publisher_platforms`, `media_type`,
`delivered_from`, `delivered_to` and `limit`; use the live enums. The default is
15 records, maximum 50, with `active_status: ACTIVE` and no date window. Include
old ads that remain active. For a past period, request `active_status: ALL` and
explicit inclusive delivery bounds; these are delivery dates, not launch dates.
Do not add unsupported `ad_type` or `languages` arguments.

The listing already includes copy, CTAs, destinations, cards and available media.
Preserve carousel order and each card's text, image/video and destination. Keep
dynamic placeholders such as `{{product.name}}` intact. Review `effectiveQuery`,
`scope`, `coverage`, `warnings` and truncation before comparing results. Pass the
returned `nextCursor` as `cursor` unchanged; other arguments can be omitted when
continuing this Meta search.

## When are ad details useful?

Call `meta_get_ad_library_ad` only when regional transparency is relevant, using
`ad_reference` with a returned `adReference` unchanged. It accepts neither a raw
archive ID nor a public link. Do not decode or fabricate the reference. The creative
is already in the listing; this is not a required second call to read its copy.

Details can expose EU/UK reach and selected audience disclosures, plus payer or
beneficiary information where available. Preserve each disclosure's regional scope
and whole-run period. They do not establish impressions, commercial spend, results
or interest targeting. `found: false` or an empty `transparency` list can be normal.
Use returned coverage for market/category retention limits; do not promise global
historical coverage. Meta describes these distinctions in its
[Ad Library API documentation](https://www.facebook.com/ads/library/api/).
