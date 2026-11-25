---
name: ads-performance-audit
description: Run a deep, read-only audit of connected advertising accounts using LoomaScale MCP tools. Use when asked to audit ad performance, find wasted spend, compare reporting periods, diagnose weak campaigns or creatives, investigate conversion tracking discrepancies, or recommend prioritized improvements. Cover Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads and relevant GA4, Tag Manager, Search Console or Merchant Center data when accessible. Execute six evidence-led stages and create a clear report with dashboard-style visualizations when the host assistant supports them.
---

# Ads Performance Audit

Deliver a real, evidence-backed investigation, not a superficial metrics summary. Use the assistant's reasoning and available **read-only** LoomaScale tools; do not require any particular assistant, rendering framework, or new backend audit API.

## Operating rules

- **Execute all six stages in order.** A one-call audit or performance summary is only a starting point. If a stage cannot be completed, record what was attempted and why; continue with the remaining stages.
- Discover the tools actually exposed in this session. Consult [tool-map.md](references/tool-map.md) for verified capabilities and limits, but do not assume every tool is installed or named identically. Prefer focused typed reporting tools over raw queries; use raw queries for uncovered questions.
- Keep the audit read-only. Do not pause ads, change budgets, add negatives, modify tracking, authorize accounts, publish GTM, or send feature requests. Recommend changes for separate approval instead.
- Default to the **last 30 complete days ending yesterday**, compared with the immediately preceding 30 days. Honor a user-specified period. Use explicit dates when possible; disclose platform time zones, incomplete days, attribution lag, and incompatible reporting windows.
- Use the accounts specified by the user; otherwise discover the connected accounts. If there are multiple unrelated clients or a very large portfolio, establish a manageable scope before deep inspection. If explicitly asked to audit a portfolio, batch within tool limits, report exclusions, and never imply all accounts were covered when they were not.
- Preserve source, account/entity IDs, metric definition, date range, and currency for quantitative findings. Distinguish **zero**, **missing**, **not comparable**, and **not checked**. Track pagination and truncation. Never combine different currencies or overlapping waste buckets into a fabricated total.

## Six-stage workflow

### 1. Discover sources and scope

1. Check available LoomaScale integrations and their connection status; list accessible ad accounts and relevant GA4 properties, GTM containers, Meta datasets, TikTok pixels, Search Console properties, and Merchant Center accounts as applicable; render connect button with a link to connect unconnected integrations if such link returned by loomascale.
2. Identify the business outcome (purchase, lead, booked call, etc.), primary conversion actions, active accounts, currencies, reporting time zones, and likely website/property mappings. Do not infer a mapping solely from similar names.
3. Record which integrations are connected, inaccessible, or absent. Ask for clarification only when an ambiguous account, conversion goal, or mapping would materially change the audit; otherwise proceed with clearly stated assumptions.

### 2. Establish the baseline

1. Read current and previous-period performance at the account and campaign levels: spend, impressions, clicks, CTR, CPC, relevant conversions/leads, conversion value, CPA/CPL and ROAS when meaningful and actually available.
2. Retrieve daily trends and identify meaningful changes in spend, conversion rate, CPA/CPL, ROAS, delivery, and outcome volume. Compare equal windows and distinguish changes caused by volume from efficiency changes.
3. Segment by platform, account, and the most material campaigns. Do not add platform-attributed conversions together as unique customers. Mark unavailable or incompatible conversion definitions explicitly.

### 3. Investigate underperformance

1. Start with available scoped waste-audit helpers, then **verify and deepen** their findings with campaign/ad group/ad-level reports. Do not stop at the helper's top findings.
2. Examine the highest-exposure anomalies first: spend with no attributed results, deterioration versus the prior period, costly search terms, inefficient ads/creatives, weak placements or audiences, pacing, delivery blocks, disapprovals, and budget/rank constraints.
3. Branch by platform using [investigation-guide.md](references/investigation-guide.md). Drill into search terms for Google Ads; ad sets, creatives, frequency and placement for Meta; ad groups, creative fatigue and delivery diagnostics for TikTok; campaigns, creatives and demographic breakdowns for LinkedIn.
4. Separate observed facts from suspected causes. Treat "spend with zero reported conversions" as **potential waste / spend at risk**, not proof of preventable loss. Consider sample size, business goals, conversion lag and tracking before proposing action.

### 4. Validate measurement and cross-source differences

1. Inspect conversion action/goals in ad platforms and their available tracking evidence: GA4 event counts/configuration, GTM **published** tags and triggers, Meta dataset/Pixel and CAPI quality, and TikTok pixel events as applicable.
2. Create a source-to-event mapping for each important outcome; compare counts only where the event, attribution model/window, date range and reporting time zone are sufficiently aligned. Explain plausible causes of disagreement before labeling tracking broken.
3. Where the tools support it, run tracking diagnostics and confirm notable flags against source-level data. GTM configuration alone does not prove a tag actually fired or that a form submission succeeded. Classify issues as confirmed, likely, unresolved, or unavailable.
4. If GA4, GTM or pixel data is unconnected, **still complete this stage** with the available platform-side checks and document the missing validation.

### 5. Rank actionable findings

1. Build a deduplicated list of findings, ordered by business impact and evidence strength rather than a generic count of warnings. Follow [investigation-guide.md](references/investigation-guide.md) for units and confidence rules.
2. For every material finding include: **priority**, affected platform/account/entity, observed evidence with period and currency, comparison/baseline, interpretation and alternative explanations, confidence, recommended action, and how to verify improvement.
3. Distinguish observed spend exposure from hypothetical savings; quantify projected impact only with explicit assumptions. Avoid summing overlapping findings or inferring incremental revenue from ROAS differences.
4. Separate quick wins, tracking repairs, and experiments; flag changes that require human review, especially exclusions, budget changes and tracking publications.

### 6. Deliver a decision-ready report

1. Present **Executive summary → Scope & data coverage → Baseline & period comparison → Ranked findings → Tracking reconciliation → Prioritized action plan → Limitations**. Include at least the top three evidence-backed findings when the data supports them; otherwise explain the shortfall.
2. Offer both an account-level overview and entity-level evidence so recommendations can be checked. Report attempted-but-unavailable checks, skipped accounts, pagination limits and unresolved hypotheses.
3. **When the host supports charts, tables, interactive dashboards or other useful native UI**, build the audit dashboard components described in [report-ui.md](references/report-ui.md), populated only with observed data. Use native capabilities; never assume a particular UI API exists. If unavailable, render equivalent labeled Markdown tables and concise text instead. The textual conclusion must stand alone.
4. End with the 1–3 highest-value next actions and the measurements that would confirm success. Do not execute any account changes as part of this audit.

## Final self-check

Before returning the report, verify: six stages attempted; current and comparison periods covered; every metric has provenance; major anomalies investigated beyond a single summary tool; tracking limitations explicit; findings are evidence-linked and nonduplicative; any charts are accurate and supported by real data; no write operation occurred.
