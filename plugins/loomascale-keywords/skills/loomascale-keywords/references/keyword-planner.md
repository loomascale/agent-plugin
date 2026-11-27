# Google Ads Keyword Planner tools

Shared with the all-in-one LoomaScale plugin's advertising reference; keep both in step.
This plugin is read-only. None of its tools creates a keyword plan, a campaign or a keyword.

## How do I research and forecast Google Ads keywords?

1. Discover keywords with `gads_keyword_ideas`, seeded from keywords, a page URL
   or a whole site. Each idea carries average monthly searches, competition and
   top-of-page bid estimates; follow `nextCursor` for more ideas. Resolve
   locations with `gads_find_locations` and never guess geo or language IDs.
2. Check a list you already have with `gads_keyword_historical_metrics`: up to
   10,000 keywords per call, with searches per month for up to about four years
   for seasonality. Google merges near-duplicates into one row and lists them as
   `closeVariants`, so count that row once. A null volume means no data, not
   zero. Skip this call for keywords whose metrics the ideas tool already returned.
3. Estimate a Search campaign before launch with `gads_keyword_forecast_metrics`:
   keywords with match types, locations, languages, one bidding strategy and
   future dates. It returns one campaign-level estimate: cost, plus clicks and
   average CPC (manual CPC, maximize clicks) or conversions and average CPA
   (maximize conversions). It forecasts no impressions, CTR or per-keyword
   figures. Call it once per budget to compare scenarios and present the result
   as an estimate, not a guarantee. Money amounts are in the account's currency.
4. Place new keywords into existing ad groups with `gads_keyword_ad_group_themes`:
   get candidate ad group IDs from `gads_list_campaigns` with `include_ad_groups`,
   pass them with the keywords, and review the suggested ad group and match type
   for each keyword. Unusable ad groups are not enabled or sit in a campaign that
   is neither enabled nor paused; unmatched keywords may need a new ad group.

## Which account does the data come from?

Keyword Planner answers through one Google Ads account. List accounts with
`gads_list_ad_accounts` and pass the chosen one as `customer_id` on every call.
Manager (MCC) accounts hold no campaigns; pick a client account under them for
ad group themes. Search volume and bid estimates do not depend on the account's
own campaigns.

## What can this plugin not do?

It cannot add keywords, create or edit campaigns and ad groups, or change bids.
Say so plainly when asked, and point to the full LoomaScale plugin or Google Ads
for those changes.
