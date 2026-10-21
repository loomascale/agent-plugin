---
name: loomascale
description: How to work with a user's Google Ads and Meta Ads accounts through the LoomaScale MCP server. Use whenever the user asks about their ad accounts, campaigns, ad spend, keywords, search terms, budgets, conversions, pacing or ad creative, or wants to create or change anything in Google Ads or Meta Ads. Covers connecting, picking the right account, the read-first rule, what the spend cap refuses, and when to check the plan allowance.
license: MIT
metadata:
  author: loomascale
  version: "1.0.0"
---

# LoomaScale

LoomaScale is a remote MCP server (`https://api.loomascale.com/mcp`) that reads and
changes real Google Ads and Meta Ads accounts. Every tool runs against the user's live
account, so the money is real. Read this once before using any `google_*`, `meta_*` or
`ga4_*` tool.

## Connecting

1. The first tool call triggers OAuth in the client. The user signs in to LoomaScale
   in the browser and approves. Nothing to configure in the plugin.
2. If a tool answers that no ad account is connected, send the user to the dashboard:
   https://ai.loomascale.com/dashboard/connections — they connect Google Ads or Meta
   Ads there, then return. Step-by-step guides:
   - https://ai.loomascale.com/connect-claude-code-to-google-ads
   - https://ai.loomascale.com/connect-claude-code-to-meta-ads
   - https://ai.loomascale.com/connect-codex-to-google-ads
   - https://ai.loomascale.com/connect-codex-to-meta-ads
   - https://ai.loomascale.com/connect-claude-to-google-ads
   - https://ai.loomascale.com/connect-claude-to-meta-ads
   - https://ai.loomascale.com/connect-chatgpt-to-google-ads
   - https://ai.loomascale.com/connect-chatgpt-to-meta-ads
3. If a tool answers that the plan allowance or trial has run out, call
   `loomascale_check_quota` (always free) and relay the answer; the user upgrades at
   https://ai.loomascale.com/pricing.

## Which account

- Start with `google_list_ad_accounts` or `meta_list_ad_accounts` when you do not know
  which account to use. Manager (MCC) accounts hold no campaigns; work in the client
  account under them.
- With more than one account reachable, every write needs an explicit account. Use
  `google_select_account` / `meta_select_account` once, or pass the account id the
  tool asks for. Never guess an account for a write.
- Report money in the account's own currency, as the tools return it.

## Read first, change only on confirmation

- Default to read-only tools. Answer with numbers, then recommend.
- Before any write (`*_create_*`, `*_update_*`, `*_set_status`, `*_activate_campaign`,
  `*_remove_*`, `*_delete_*`, `*_add_keywords`): show the exact change, old and new
  values, and wait for the user to confirm in their own words. One confirmation covers
  one change set, not a session.
- Campaigns are created paused. Activation is a separate tool and needs its own
  confirmation. Only campaigns created through LoomaScale can be activated through it.
- Budget changes, campaign creation and activation are checked against a daily spend
  cap the user set in the LoomaScale dashboard. A refusal is final: do not retry with
  a smaller number to get under it, tell the user and let them raise the cap
  themselves.
- Say plainly what you could not verify. Do not invent metrics a tool did not return.

## Tool families

| Prefix | Platform | Reads | Writes |
|---|---|---|---|
| `google_*` | Google Ads | campaigns, ads, keywords, search terms, insights, pacing, billing, conversion actions, asset groups, keyword ideas, GAQL `google_query` | budgets, bidding, status, targeting, keywords, ads, campaigns (Search, PMax), conversion actions, sitelinks, shared lists |
| `meta_*` | Meta Ads (Facebook, Instagram) | campaigns, ad sets (`meta_get_adset`), ads, insights, pacing, drafts, audiences, creatives, previews | budgets, status, targeting, bidding, campaigns, ad sets, creatives, ads, audiences, A/B tests |
| `ga4_*` | Google Analytics 4 (preview, not every account) | reports, realtime, funnels, conversions | none |
| `loomascale_check_quota` | plan allowance | free, never counts | |

Google: `google_get_insights` for performance over a date range, `google_check_pacing`
for today against budget, `google_list_search_terms` for what people actually typed.
Meta: `meta_get_insights`, `meta_check_pacing`, `meta_list_ads` (frequency, CTR, cost
per result per ad).

## Ad-hoc Google Ads queries

Typed tools first: `google_get_insights`, `google_list_campaigns`, `google_list_ads`,
`google_list_keywords`, `google_list_search_terms`. `google_query` (read-only GAQL) is
for breakdowns they lack: device by day of week, impression share lost to rank, ad
approval status, network by month.

- Before the first `google_query` on a resource in a conversation, call
  `google_get_resource_metadata` for it (`campaign`, `ad_group`, `ad_group_ad`,
  `keyword_view`, `search_term_view`, `geographic_view`, `campaign_budget`,
  `conversion_action`, `asset_group`; `resource=segments` or `resource=metrics` for
  those; `contains=` to narrow). A guessed field name costs a rejected query.
- Write the query in snake_case (`metrics.cost_micros`); rows come back camelCase
  (`metrics.costMicros`). Money is in micros: divide by 1,000,000.
- A query without LIMIT gets one; large limits are lowered.
- Rejected query: fetch the metadata, fix the field, retry once. Do not loop.

## Task skills in this plugin

`waste-audit`, `performance-review`, `budget-pacing`, `launch-campaign`,
`conversion-tracking-audit`, `scheduled-checks`. Each has the working prompt and the
tools behind it. More ready-made prompts: https://ai.loomascale.com/dashboard/prompts
