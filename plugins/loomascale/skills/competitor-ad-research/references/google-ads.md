# Google Ads competitor research

Use Google's public Ads Transparency Center through the available LoomaScale tools.
These records describe public creatives, not a competitor's private Google Ads account.

## How is the advertiser identified?

When a website is known, call `gads_list_ad_library_ads` with `domain` and skip
advertiser discovery. A hostname or website URL is accepted. A domain search can
include agencies, resellers and affiliates; attribute each ad to its returned advertiser.

For a company name, call `gads_search_ad_library_advertisers` with `query`, optional
`country` and a small `limit` (default 10). Use returned `advertiserId` values, not
guessed IDs. Distinguish advertiser registration country from the market researched.
Clarify genuinely ambiguous candidates. Select one advertiser with `advertiser_id`
when the research is about that entity's ads rather than every ad associated with
a website. Pass `domain` or `advertiser_id`, not both. The latter accepts a public
AR identifier or a Transparency Center advertiser URL, not a Google Ads customer ID.

## How are creatives and copy read?

Call `gads_list_ad_library_ads` with the selector and `country`. Optional filters
are `platform`, `ad_format`, `start_date`, `end_date` and `limit`. Read their enums
from the live schema. The default is 25 records over the last 30 complete UTC days;
honor explicit dates. Report the dates returned in `effectiveQuery`.

The listing returns creative IDs, advertiser attribution, formats, observed dates
and library/preview links. It does not return ad text. For selected examples call
`gads_get_ad_library_ad` with their returned `advertiser_id` and `creative_id`.
It takes no `country` argument. Preserve each pair: a creative ID alone is not the
complete lookup. Review returned `variants`, `regions`, `found`, `coverage` and
`warnings`; rendered variants are examples, not a complete responsive-ad asset list.

Continue a listing by passing `nextCursor` as `cursor`, with the same effective
selector and filters. Use the dates returned by the previous call so relative
defaults cannot change across days. An expired or unavailable continuation limits
coverage; report it rather than guessing a new provider token.

## How should the evidence be interpreted?

First/last shown dates are observations, not proof of uninterrupted delivery or
current activity. Detail regions and variants may describe a broader period than
the listing's date window; do not claim every variant ran in that window. Keep
preview URLs, visible URLs and disclosed landing pages separate.

If the public-library tools are unavailable, say that this connection cannot retrieve
the Google competitor evidence and continue any supported part of the task. Own-account
`gads_query`, Keyword Planner suggestions and restricted Auction Insights metrics do
not replace observed competitor creatives.

Google explains the source and regional disclosures in its
[Ads Transparency Center documentation](https://support.google.com/adspolicy/answer/13733850?hl=en).
Use the tool's returned coverage for the data actually retrieved.
