---
name: getting-started
description: Get started with LoomaScale or find useful next steps after a first audit. Use when the user asks what LoomaScale can do for their business, how to get value from connected marketing data, what to do next, or which other sources to connect. Tailor a first insight and repeatable daily or weekly workflows to their goals and work frustrations. Use the task-specific skills for an already defined report or change.
---

# Getting started with LoomaScale

Help the user turn advertising and marketing data into decisions that support their
business. Show what they can accomplish now, demonstrate one useful result, and
leave them with a reason to return after today's issue is resolved. Personalize
the explanation around their work; avoid a feature tour or a comprehensive audit.
Onboarding is read-only and does not authorize account or campaign changes.

## Understand the business without an intake form

Reuse what the conversation already establishes: what the business sells, whom it
serves, the user's role, the outcome they want, and work that is difficult or
repetitive. An agency may need client reporting; a shop may need more purchases;
a service business may need qualified enquiries. Treat these as possibilities,
not facts inferred from an account name.

If that context is missing, ask one short question combining the business and its
main frustration. For example: "What do you sell, and what would help most right
now: more sales or qualified leads, less wasted ad spend, or less time reporting?"
Use the user's language and explain unfamiliar metrics. Do not repeat questions
already answered. While waiting, discover connections and give a brief explanation
of what the available sources could help them decide. Keep any suggestions
provisional until their goal is known.

For a returning user, start with their previous finding or fix. Explain the next
business question it enables: whether the fix improved results, what else limits
growth, or how to notice a recurrence. Skip introductory material they know.

## Find what is connected and usable

Inspect the available tool schemas; client prefixes may differ. Call
`loomascale_list_data_sources` with `{}` once, or reuse its recent result from this
conversation. This free, read-only inventory returns the supported sources,
connection states and connection links. Use the returned catalog rather than a
fixed list: availability can differ by user.

- `connected` means a recorded provider login, not proof that a particular
  account, property or container is accessible. `connected_logins_count` counts
  logins, not accounts.
- `not_connected` identifies a possible additional connection. Recommend it only
  when it helps the user's goal and they use that service, or make that condition
  explicit.
- `needs_attention` and `unknown` need the returned explanation or a relevant
  discovery read. Do not label either as disconnected or turn an error into zero.
- `tools_in_current_plugin: false` means the current plugin cannot use that
  source, even if connected. Explain the scope and use the returned `full_plugin`
  installation links when relevant; reconnecting does not expand plugin scope.

Use returned `connect_url` and `connections_url` values unchanged. If inventory is
unavailable, use only relevant exposed discovery tools and explain that the full
connection state is unverified. An absent tool or empty account list does not
prove a dashboard connection is missing. The fallback is the
[LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).

Summarize the sources useful for this user's goal. Do not dump every account or
collect data from every connected platform just to demonstrate breadth.

## Demonstrate one useful result

Choose the smallest read that informs the user's main decision, normally from
one source or two clearly related sources. Discover only those resources using
the [integration workflow](../loomascale/SKILL.md). Pass explicit target IDs;
never use `*_select_account` during onboarding, because that changes a default
shared across chats. If several businesses or client accounts are plausible,
resolve the target before reading their performance. Do not choose the first or
lowest-ID account arbitrarily.

Use [cross-source-insights](../cross-source-insights/SKILL.md) for reporting dates,
comparisons, source matching and evidence rules. Unless the user supplies dates,
use the last 30 complete days against the preceding equal period; honor each
source's freshness and time zone. Start with a summary, then make a focused
drill-down only if needed. Stop when one decision has enough evidence; onboarding
does not need an account-wide audit.

Explain the finding in business terms, its source and dates, the next action to
consider, and how to measure whether that action helps. Keep observed facts,
hypotheses and possible upside separate. If nothing material is wrong, show a
useful baseline or opportunity rather than manufacturing a problem. Sparse data,
missing business events, permission errors or plan limits are limitations, not
evidence of poor performance. Follow the integration workflow's recovery guidance.

Keep ad-platform attributed conversions separate from GA4 outcomes; neither
proves profit or lead quality. Do not sum them into unique sales or promise growth,
savings or hours saved without evidence. Use known targets when available; do not
invent a target CPA, margin, budget or conversion event.

## Make the ongoing value concrete

Select about three jobs that match the user's goal and available evidence,
including something beyond fixing today's issue. Use this table as a menu, not
as a checklist to display or execute in full.

Make the path from insight to action clear. When relevant, explain that the user
can also ask LoomaScale to draft a campaign, research keywords, develop ad copy,
or carry out supported Google Ads and Meta Ads campaign changes after review and
approval. Mention supported analytics or tracking configuration changes only when
they help this user's problem. Show a practical loop: identify an opportunity,
review a proposed change, apply it when requested, then measure the same outcome.
The getting-started session itself remains read-only.

| Daily work or business problem | Useful LoomaScale workflow | Why return? |
|---|---|---|
| Manually checking ads and spend | Review pacing, delivery and the largest spend changes in the active ad platform | A brief daily check identifies exceptions worth investigating. |
| Not knowing why sales or enquiries changed | Compare relevant ad results with GA4 business events and landing-page or funnel changes | A weekly review helps choose the next improvement and check its effect. |
| Paying for traffic that does not convert | Review search terms or creative performance, then relevant GA4 outcomes where linked | Revisit exclusions, creative tests and budget proposals as new evidence arrives. |
| Visitors leaving without buying or enquiring | Examine GA4 landing pages, devices and ordered funnel steps | Prioritize a site experiment and compare the same outcome after it runs. |
| Conflicting reports or unreliable tracking | Compare conversion definitions, GA4 and relevant GTM configuration; use Meta Pixel/Conversions API diagnostics for Meta | Recheck after tracking or site changes; configuration alone cannot prove live tag firing. |
| Organic traffic or visibility declining | Use Search Console queries, pages and indexing, with GA4 outcomes when available | Review page and query opportunities and measure subsequent changes. |
| Shopping products losing visibility | Review Merchant Center product eligibility and feed issues, plus related Google Ads evidence | Recheck product issues and whether affected products regain delivery. |
| Running out of campaign or creative ideas | Research public Google and Meta ads using the competitor research skill | Develop a testable offer or message hypothesis, then evaluate the user's own results. |
| Client reporting taking too long | Reuse a scoped performance brief for the selected client's sources, goals and dates | Repeat weekly with consistent definitions, results and next actions. |

For each selected job, provide a ready-to-send prompt tailored to the known
business, named target and metric, a useful cadence or trigger, and the decision
the result supports. Prefer "Compare qualified-enquiry events for [known property]
with the previous week and explain the biggest change" to "Ask me for insights."
Use only events actually identified; a lead event does not establish lead quality.
Make unresolved names or choices explicit instead of inventing them.

For a business with little history or no campaigns, focus on supported preparation:
keyword opportunities when Google Ads is available, public competitor messaging,
a measurement baseline or a campaign proposal. Do not invent performance or
recommend launching paid campaigns without understanding the user's goal and
budget. For public ads, use
[competitor-ad-research](../competitor-ad-research/SKILL.md); LoomaScale sign-in is
required, but connecting the user's own ad account is not. Resolve the competitor
and market before research. Public libraries reveal messaging, not competitor ROAS.

## Recommend additional sources by the question they unlock

Suggest at most one or two relevant sources from the returned catalog. Tie each
to a current blind spot and ask whether the user already uses it if unknown:

- Ads without GA4: connect an existing GA4 property to investigate what visitors
  do after arriving, beyond the ad platform's attributed results.
- GA4 without the relevant ad source: connect that ad platform to examine spend,
  delivery and campaign context alongside site outcomes.
- Organic acquisition: Search Console adds search queries, visibility and indexing;
  GA4 adds on-site behavior and outcomes.
- A shop with Shopping/feed problems: Merchant Center adds product eligibility
  and feed diagnostics; use verified relationships before linking these to ads.
- Tracking discrepancies: GTM adds configuration evidence when the site uses it;
  Meta Ads includes available Pixel/dataset diagnostics without a separate source.

These are conditional examples, not reasons to connect everything. A useful
existing connection is enough to start. Do not present an irrelevant missing
source as a blocker. If a desired service is absent from the catalog, distinguish
unsupported native connections from sources merely not connected. Do not promise
CRM, store, payment, profit or lead-quality data that the catalog and exposed
tools do not support. User-supplied exports can add context only when the current
environment can actually read them.

With no usable connections, explain a relevant first workflow and link to its
connection path. Offer public competitor research if its tools and sign-in are
available; do not insist on an ad-account connection for that task. If tools or
access block a first result, state the exact next step and what can happen once
it is resolved. Do not claim the analysis ran.

## Leave a clear next step

Keep the personalized brief compact, usually around 400–600 words after business
context is established: how LoomaScale helps their goal, what the connected sources
show now, the selected repeatable jobs and prompts, and any useful extra connection.
Adapt the length to the user's preference; do not make an unresolved clarification
turn into a full report. When blocked on a connection or account choice, give the
smallest useful orientation and next step; defer the full set of jobs and prompts.

Finish with one recommended next action and a specific return prompt: what to
check, when or after which change, and which outcome to compare. After a fix,
include checking its effect as well as the next improvement opportunity. Cadences
are suggestions for the user to run; do not claim background monitoring, scheduled
reports or notifications unless a supported host tool actually creates them after
the user requests it. Discovery does not authorize connections, writes or schedules.
Route later requested changes through the integration workflow and its approvals;
TikTok Ads changes are limited to status, budget, bid and name on existing objects;
LinkedIn Ads remains reporting-only.
