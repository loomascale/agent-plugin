---
name: loomascale-ga4
description: Analyze and configure the user's connected Google Analytics 4 (GA4) properties with LoomaScale. Use for property discovery, traffic, engagement, revenue, realtime, funnels and attribution reports, or to manage key events, event create/edit rules, enhanced measurement, data redaction and web streams. Reporting is read-only; configuration writes require a dry run and explicit approval. Do not invoke for general analytics definitions, installing tracking or changing ad campaigns.
---

# Google Analytics 4 reporting and settings with LoomaScale

Use the user's connected Google Analytics 4 properties to answer reporting
questions and make requested tracking configuration changes. This package connects
to `https://api.loomascale.com/mcp/ga4`. Reporting reads Analytics data and settings;
configuration tools manage key events, event rules, enhanced measurement, data
redaction and web streams under the rules below. This package cannot install
tracking or edit campaigns, and it never deletes a property or stream.

## Resolve the property and reporting context

Reuse an already verified property from the conversation. Otherwise call
`ga4_get_account_summaries` to discover reachable accounts and properties. Use
`property_id` as the listed number or `properties/<number>`; never substitute a
Google Ads customer ID or a `G-...` measurement ID. Respect disabled properties.
If several properties fit and the task does not identify one, ask which to use.

Read `ga4_get_property_details` for the property's time zone and currency before
interpreting historical dates or money. Honor the user's period. If none is given,
use the last 30 complete days in that time zone; add a preceding equal-length
comparison when investigating a change. State the exact dates. Realtime questions
use their own last-30-minute window instead.

Inspect available tool descriptions and input schemas. Names here are the
server's tool names; a client may add a namespace. Live schemas and access
permissions determine supported inputs and reports.

## Choose the report that answers the question

| Question | Tool |
| --- | --- |
| Which GA4 accounts and properties can I access? | `ga4_get_account_summaries` |
| What time zone and currency does this property use? | `ga4_get_property_details` |
| Which sources, landing pages or devices bring traffic, key events or revenue? | `ga4_run_report` |
| What activity or events appeared in the last 30 minutes? | `ga4_run_realtime_report` |
| Where do users leave an ordered series of events? | `ga4_run_funnel_report` |
| What conversions, cost or ROAS does GA4 attribute? | `ga4_run_conversions_report` |
| What custom dimensions and metrics are registered? | `ga4_get_custom_dimensions_and_metrics` |
| What dated property annotations might explain a change? | `ga4_list_property_annotations` |
| Which Google Ads accounts are already linked? | `ga4_list_google_ads_links` |

Read [report inputs and limitations](references/reporting.md) for report shapes,
pagination, realtime compatibility, funnel steps and attribution. For a diagnosis
of changing results or a prioritized interpretation, use
[GA4 insights](../ga4-insights/SKILL.md).

## Handle an explicitly requested configuration change

Keep reporting read-only. Never change settings as a side effect of an analysis.
Use `ga4_get_tracking_configuration` to inspect current settings and discover
stream, key event and rule IDs before changing existing configuration.

| Requested change | Tools |
| --- | --- |
| Mark, update or unmark a key event (conversion) | `ga4_mark_key_event`, `ga4_update_key_event`, `ga4_unmark_key_event` |
| Create, update or delete an event create rule | `ga4_create_event_rule`, `ga4_update_event_rule`, `ga4_delete_event_rule` |
| Create, update, delete or reorder event edit rules | `ga4_create_event_edit_rule`, `ga4_update_event_edit_rule`, `ga4_delete_event_edit_rule`, `ga4_reorder_event_edit_rules` |
| Change enhanced measurement | `ga4_update_enhanced_measurement` |
| Change email or URL query-parameter redaction | `ga4_update_data_redaction` |
| Create or update a web data stream | `ga4_create_web_stream`, `ga4_update_web_stream` |

Event rules apply to future incoming events;
creating a rule does not emit an event immediately or rewrite historical data.
Creating a stream does not install a website tag.

Use only tools available to the connected account and their live schemas.
Before a write, show the exact property, stream or rule and proposed changes
using `dry_run=true`, then obtain the user's approval of those changes. Apply
only the approved change and report the verified result. Writes require Google's
`analytics.edit` permission and a Google login allowed to edit the property.
Older read-only connections must reconnect GA4 and grant the requested permissions.
If a required tool or permission remains unavailable, explain the limitation and
direct the user to the relevant Google Analytics setting instead.

## Handle access and helper tools accurately

- If authorization is missing or expired, use the connection link returned by the
  tool or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
  A missing property can reflect the Google login's permissions or a disabled
  property; an empty report is not proof that tracking is absent.
- For a usage-limit refusal, call `loomascale_check_quota` once and explain the
  allowance or reset it actually reports. A usage allowance is not an ad budget.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it
  only when the user asks to send a feature request; a reporting question does
  not authorize sending a message. Do not claim every helper is read-only.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which
  are connected, and which this plugin has tools for. Use it when the user asks
  about other platforms or connecting another service. It is free and connects
  nothing: give the user the link it returns, and say plainly when a source
  needs the full LoomaScale plugin.
- For an invalid report, use the returned error and current schema to correct a
  supported input. Explain remaining permission, API or data limitations instead
  of repeatedly retrying the same refusal or inventing zero results.

## Return a result the user can assess

Give the answer, property, exact dates, time zone and currency where relevant.
Keep observed results separate from hypotheses. Include material sampling,
thresholding, pagination and attribution limits returned by the API. Recommend
specific next steps for configuration changes. Claim a settings change only
after an approved write succeeds; do not claim to have verified live tag firing.
