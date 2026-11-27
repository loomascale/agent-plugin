# LinkedIn Ads tools

This guide keeps the same reporting rules as the LinkedIn section of the all-in-one LoomaScale plugin's advertising reference. When one changes, change the other.

## How do I report LinkedIn Ads performance?

1. Find the ad account with `linkedin_list_ad_accounts`. Accounts LinkedIn lists as
   not active or as test accounts are returned separately.
2. Use `linkedin_get_insights` at `account`, `campaign_group`, `campaign` or
   `creative` level. Every row has impressions, clicks, CTR, spend, CPC and CPM;
   `metric_set` adds `core`, `conversions`, `leads`, `video` or `engagement` metrics.
   `time_increment` is `all`, `daily` or `monthly`. `compare_previous_period:true`
   reads the window just before and adds deltas. Follow `nextCursor` for more rows.
3. Dates are UTC. Pass a `date_preset`, or `since` and `until` together.
4. Lead metrics come from LinkedIn Lead Gen Forms; conversions come from the
   conversion tracking set up in Campaign Manager. Name which one a figure is.

## How do I read professional demographics?

`linkedin_analyze_demographics` breaks one ad account down by `pivot`: `job_title`,
`seniority`, `industry`, `company`, `job_function`, `company_size` or `country`, sorted
by spend, impressions, clicks or leads. LinkedIn reports these figures approximately
and with a delay of 12 to 24 hours. It hides values with fewer than 3 events and keeps
only the top values per creative and day. Conversion value is missing. Demographic
subtotals need not equal campaign totals. Treat results as directional, and never
assign entity-level qualified leads to a demographic.

## How do I find wasted spend?

`linkedin_audit_wasted_spend` covers the last 30 days and ranks findings by money lost:

- campaigns spending without leads or conversions
- days in a row with spend and no results
- creatives whose CTR is under half the campaign median
- demographic segments taking a quarter or more of the spend without a result
- spend that jumped or fell while results per unit of spend got worse
- spend in campaigns whose group is not active

It audits a few accounts per call. Follow `nextCursor` and drill into a finding with
`linkedin_get_insights` or `linkedin_analyze_demographics`.

## What can be changed, and how?

Every change applies to one existing object, takes `dry_run`, and needs the user's
approval first:

| Change | Tool |
| --- | --- |
| Pause or resume a campaign, campaign group or creative | `linkedin_set_status` |
| Daily or total budget | `linkedin_update_budget` |
| Optimization target, bid strategy and bid | `linkedin_update_bidding` |
| Add, remove or replace targeting by facet | `linkedin_update_campaign_targeting` |
| End date | `linkedin_update_campaign_schedule` |
| Audience Expansion, LinkedIn Audience Network, creative rotation | `linkedin_update_campaign_delivery` |
| Name | `linkedin_rename_object` |

A daily budget cannot exceed the user's spend cap, and LinkedIn may spend up to 150%
of a daily budget on one day. Pausing or resuming a campaign group affects every
campaign in it. Resolve targeting URNs with `linkedin_search_targeting_entities` and
check the size with `linkedin_get_audience_count` before applying a targeting change.
Creating campaigns or creatives, conversion tracking and Insight Tag setup are done in
LinkedIn Campaign Manager.
