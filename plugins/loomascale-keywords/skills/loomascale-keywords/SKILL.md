---
name: loomascale-keywords
description: Research Google Ads keywords with LoomaScale's Keyword Planner tools. Use for keyword ideas from seed keywords, a landing page or a website, search volume and seasonality of a keyword list, competition and top-of-page bid ranges, cost and click forecasts for a planned Search campaign, and which existing ad group a keyword fits. Do not invoke for adding keywords, changing campaigns or bids, organic SEO rankings or other ad platforms.
---

# Google Ads keyword research with LoomaScale

Answer keyword questions with Google Keyword Planner data from the user's connected
Google Ads account. This package connects to `https://api.loomascale.com/mcp/keywords`.
Inspect available tool descriptions and input schemas; a client may add a namespace
to the tool names used here. Live schemas take precedence over this guide.

## Resolve the account

Reuse an account already verified in the conversation. Otherwise call
`gads_list_ad_accounts` and pass the chosen account as `customer_id` on every call.
When the user reaches more than one client account and none is named, ask which
business the research is for.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| Which keywords should I target? | `gads_keyword_ideas` from keywords, a page URL or a site |
| How many searches does my list get? Is it seasonal? | `gads_keyword_historical_metrics` |
| What would a campaign with these keywords cost? | `gads_keyword_forecast_metrics` |
| Which ad group does each keyword belong in? | `gads_keyword_ad_group_themes`, ad group IDs from `gads_list_campaigns` |
| What is the ID of a city, region or country? | `gads_find_locations` |

Read [Keyword Planner tools](references/keyword-planner.md) for the limits and how to
read each result.

## Keep it read-only

No tool here changes the Google Ads account. When the user wants to add keywords,
build a campaign or change bids, give the researched list and say that the change is
made in Google Ads or with the full LoomaScale plugin.

## Handle access and helper tools accurately

- If authorization is missing or Google Ads is not connected, use the link the tool
  returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
- For a plan or trial refusal, call `loomascale_get_user` once and explain the plan,
  trial, task or account allowance it reports. That allowance is not an ad budget.
  Weekly tasks used up: give the reset date from the message. Never retry a refusal.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it only
  when the user asks to send a feature request.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which are
  connected, and which this plugin has tools for. Use it when the user asks about
  other platforms. It connects nothing: give the link it returns and say when a
  source needs the full LoomaScale plugin.

## Return a result the user can assess

Name the account, locations, language, network and date range behind the numbers.
Give bids and forecasts in the account currency. Treat volumes as Google's rounded
averages and forecasts as estimates, not guarantees.
