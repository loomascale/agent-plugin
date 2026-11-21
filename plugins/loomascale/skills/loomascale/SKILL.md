---
name: loomascale
description: Work with connected LoomaScale integrations for Google Ads, Meta Ads (Facebook Ads and Instagram Ads), TikTok Ads, LinkedIn Ads, Google Analytics 4 (GA4), Google Tag Manager (GTM), Google Search Console (GSC) and Google Merchant Center (GMC). Use to discover accounts, audit performance or tracking, research keywords, diagnose organic search or shopping issues, carry out requested Google Ads or Meta Ads campaign changes and TikTok Ads status, budget and bid changes, and manage GA4 key events, event rules, enhanced measurement, data redaction and web streams after a dry run and approval. Use cross-source-insights for detailed performance and attribution analysis. Also use for Meta Pixel (Facebook Pixel) event activity, Event Match Quality and Conversions API diagnostics.
---

# LoomaScale integration workflows

LoomaScale connects advertising, analytics, organic search, shopping and tracking
data through its MCP tools. Use the smallest relevant set of integrations to
answer the question or complete the requested action. Google Ads and Meta Ads
support campaign changes; TikTok Ads supports reporting plus pausing or enabling,
budget, bid and rename changes on existing objects (it creates and deletes
nothing); LinkedIn Ads provides read-only reporting and diagnosis.
Search Console reports and, when the user asks, submits or removes a sitemap
(`gsc_submit_sitemap`, `gsc_delete_sitemap`) and adds or removes a property
(`gsc_add_property`, `gsc_remove_property` with `confirm:true` after the user
confirms); it cannot request indexing. GA4 reports and, after a dry run and the user's approval,
changes key events, event rules, enhanced measurement, data redaction and web streams.
Merchant Center reports and, when the user asks, changes
account settings, business information, the website, feed settings and product
attributes (`gmc_update_*`, `gmc_create_data_source`, `gmc_insert_product_input`,
`gmc_fetch_data_source`, `gmc_claim_homepage`); it never deletes products, feeds or
policies. Tag Manager accepts draft changes to
tags, triggers, variables and built-in variables in a workspace the user names,
saves a workspace as a container version, and publishes only the version the user
names after they confirm it in chat (`gtm_publish_version` with `confirm:true`).

## Start with the user's task

For first-use orientation, "what can LoomaScale do for my business?" or next steps
after an initial audit, use [getting-started](../getting-started/SKILL.md) to connect
the user's goals and daily work to a first insight and repeatable workflows.
Keep already defined reports and changes in their task-specific workflow.

Identify the intended result: a report, diagnosis, recommendation, campaign draft
or authorized change. Reuse the conversation's accounts, dates and business goal.
Discover only the resources needed; do not run an account-wide audit for a narrow
question. Ask only for a missing choice that materially affects the result, such
as which of several client accounts to change.

For public competitor ads, use
[competitor-ad-research](../competitor-ad-research/SKILL.md). Its advertiser lookup,
ad-library tools and date defaults differ from connected-account reporting; it
does not require the user's Google Ads or Meta Ads connection.

Inspect the available tool descriptions and input schemas before calling them.
Names below are the server's tool names; a client may add a namespace prefix.
Live schemas and permissions take precedence over examples in this skill. Do not
invent tools, arguments or access to an integration that the client does not expose.

## Which integration answers the question?

| Integration and purpose | Discover the target | Begin with |
|---|---|---|
| Google Ads: paid search, Shopping, Performance Max, keywords, budgets and delivery | `gads_list_ad_accounts` | `gads_get_insights`, `gads_list_campaigns`, `gads_list_search_terms`; `gads_check_pacing` for today's delivery |
| Meta Ads: Facebook/Instagram campaigns, creatives, audiences and delivery | `meta_list_ad_accounts` | `meta_get_insights`, `meta_list_campaigns`, `meta_list_ads`, `meta_get_delivery_issues` |
| Public competitor ads: Google Ads, Facebook and Instagram creatives, offers and destinations | Public advertiser or Meta Page lookup; no own-account discovery | [Competitor ad research](../competitor-ad-research/SKILL.md) |
| Meta Pixel (Facebook Pixel): received events, Event Match Quality and Conversions API health (read-only) | `meta_list_ad_accounts`, then `meta_list_datasets` | `meta_list_datasets` for 1-7 days of event counts; `meta_get_dataset_quality` for match quality and diagnostics |
| TikTok Ads: campaigns, ad groups, ads, video creative performance, audiences and delivery diagnosis | `tiktok_list_ad_accounts` | `tiktok_get_performance`, `tiktok_get_campaigns`, `tiktok_get_creative_performance`, `tiktok_get_adgroup_diagnostics`; changes with `tiktok_set_status`, `tiktok_update_budget`, `tiktok_update_bidding`, `tiktok_rename_object` (`dry_run:true` first) |
| LinkedIn Ads: B2B campaign results, leads and professional demographics | `linkedin_list_ad_accounts` | `linkedin_get_insights`, `linkedin_list_campaigns`, `linkedin_analyze_demographics` |
| Google Analytics 4 (GA4): traffic, business events, revenue, funnels and tracking settings | `ga4_get_account_summaries` | `ga4_get_property_details`, then the appropriate report; `ga4_get_tracking_configuration` before requested changes, then the relevant configuration tool with `dry_run:true` |
| Google Search Console (GSC): organic queries, pages, search visibility and indexing | `gsc_list_sites` | `gsc_compare_periods`, `gsc_query_search_analytics`, opportunity tools or `gsc_inspect_url`; changes with `gsc_submit_sitemap`, `gsc_delete_sitemap`, `gsc_add_property`, `gsc_remove_property` (dry run, then `confirm:true`) |
| Google Merchant Center (GMC): product eligibility, account issues, shopping performance, account and feed settings | `gmc_list_accounts` | `gmc_get_account_health`, then `gmc_query`; settings with `gmc_get_account_settings`, feeds with `gmc_list_data_sources` / `gmc_get_data_source`, one product with `gmc_get_product`, commercial settings with `gmc_get_shipping_settings` / `gmc_list_return_policies`; changes with `gmc_update_account`, `gmc_update_business_info`, `gmc_update_homepage` (dry run, then `confirm:true`), `gmc_claim_homepage`, `gmc_update_data_source`, `gmc_fetch_data_source`, `gmc_create_data_source`, `gmc_update_autofeed_settings`, `gmc_update_product_input`, `gmc_insert_product_input` |
| Google Tag Manager (GTM): published tracking configuration, pending changes, draft fixes, versions and publishing | `gtm_list_containers` | `gtm_get_container`, `gtm_audit_tracking`, `gtm_list_workspaces`, `gtm_get_workspace_status`; draft fixes with `gtm_create_tag`, `gtm_update_tag`, `gtm_create_trigger`, `gtm_update_trigger`, `gtm_create_variable`, `gtm_update_variable`, `gtm_enable_built_in_variables`, `gtm_delete_entity` (an unreferenced tag, trigger or variable), `gtm_create_workspace`; release with `gtm_sync_workspace` (when behind live), `gtm_create_version`, then `gtm_publish_version` after the user confirms |

Read only the guide needed for the task:

- [Advertising workflows](references/advertising.md): paid performance, keyword
  research, creative review, Meta Pixel (Facebook Pixel) diagnostics, campaign
  creation and authorized changes.
- [Measurement, search and commerce](references/measurement-and-commerce.md): GA4
  report selection and approved configuration changes, Search Console diagnostics,
  Merchant Center MCQL and GTM audits.
- [Cross-source insights](../cross-source-insights/SKILL.md): explain changing
  results, compare channels, diagnose attribution and ground every custom Google
  Ads GAQL query in live metadata. This can also answer a single-source question.

## Resolve accounts once and carry their IDs forward

Use explicit discovered targets on subsequent calls. Preserve IDs as strings.

| Integration | Target argument and form |
|---|---|
| Google Ads | `customer_id`: serving client ID, digits without dashes; a manager/MCC holds no campaigns |
| Meta Ads | `ad_account_id`: discovered `act_...` account ID; check returned manage access before changes |
| TikTok Ads | `advertiser_id`: discovered advertiser ID (digits); `tiktok_get_performance` takes `advertiser_ids`, up to 20 |
| LinkedIn Ads | `ad_account_id`: discovered numeric account ID |
| GA4 | `property_id`: property number or `properties/<number>` |
| Search Console | `site_url`: exact `sc-domain:example.com` or URL-prefix property, preserving its slash |
| Merchant Center | `account_id`: numeric standalone/sub-account ID; an advanced account itself has no reports |
| Tag Manager | `container`: discovered `GTM-...` ID or API resource path |

Do not call `gads_select_account`, `meta_select_account` or
`linkedin_select_account` merely to scope a report: they change a persistent
default shared across chats. Use them only when changing that default is the task.
Respect resources switched off in the dashboard; do not bypass a disabled target
with an alternate ID. A partial discovery result is not proof that no accounts exist.

For "what is connected?", start with `loomascale_list_data_sources`. It returns
supported sources, connection states, links and whether their tools are available
in the current plugin. A recorded login does not establish resource access; use
relevant per-integration discovery tools when account details are needed. An empty
resource list or absent tool does not establish that a dashboard connection is
missing. Distinguish disconnected, disabled, inaccessible, still-discovering and
unavailable states using the evidence returned.

## Keep reads efficient and results comparable

For historical analysis without a supplied period, use the last 30 complete days
and a preceding equal-length comparison, stating the dates. For Search Console,
use its finalized window (normally ending three Pacific days ago); for a direct
cross-source comparison use that same end date for the other reports. Honor
explicit dates, today's pacing requests and realtime questions. Read each tool's
date schema instead of copying arguments across platforms.

Start with totals, then investigate material changes. Parallelize independent
reads only after resolving their targets. Fetch required pages or disclose partial
coverage; never present a row-limited ranking as an exhaustive account total.
Keep currencies and attribution definitions distinct. Platform conversions, GA4
outcomes and organic search clicks are different measures. The cross-source guide
provides the matching and aggregation rules when combining them.

## Complete changes within the user's authorization

Analysis and recommendations do not authorize campaign changes. For a requested
change, read current state, resolve the precise target and budget/currency, use
the narrowest supported write, and read back the resulting state. Honor existing
explicit authorization; do not ask again for the same scope. Prepare any required
reviewable proposal before asking for a missing decision.

Campaign and ad creation tools create paused objects; activation is a separate
step within the user's authorized scope. Existing-object edits and Meta experiment
creation can affect live delivery immediately. Follow the advertising guide for
targeting defaults, budget ownership, preview flags and safe recovery. Do not
assume a daily budget cap guarantees total spend across campaigns.

## Recover from blocked or incomplete work

- Missing or expired connection: use the tool's connect/reconnect link, or the
  [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
  A team member needs their own upstream login. Continue useful authorized reads.
- Missing tool or access: state the unavailable capability and provide supported
  partial findings. Do not repeatedly call an unavailable tool.
- Which sources exist or are connected: `loomascale_list_data_sources` lists
  every supported source and its connection state. It is free and connects
  nothing; give the user the link it returns.
- Plan/trial limit: call `loomascale_check_quota` once and explain the reported
  allowance/reset. Its quota is not an ad budget or account balance.
- Permission or budget-cap refusal: explain the exact blocker; do not switch
  accounts, raise caps or shrink the requested action to evade it.
- Invalid read: use the error and schema to make one evidenced correction, then
  report the remaining limitation. For GAQL follow the stricter metadata preflight.
- Timed-out or partially failed write: reconcile current objects and returned IDs
  before retrying. Repeating a create can duplicate campaigns, ads or experiments.

## Return an actionable result

Lead with the answer or completed action. Give the account/property, exact dates,
evidence and material limitations needed to assess it. For changes, include object
IDs, verified resulting status/budget and anything still blocked. Distinguish a
saved configuration from actual ad delivery or a tag firing in a browser. For
read-only integrations, give specific fixes and where the user must apply them;
do not claim to have edited feeds, requested indexing or published GTM changes.
