# Report and UI blueprint

Load this reference in stage 6. Use whatever **native** tables, charting and interactive controls the current assistant actually supports. Never require a particular assistant, UI framework, image generator, browser, custom API, or a LoomaScale dashboard backend. Never show illustrative values as account results.

## Required report sections

1. **Executive summary:** one paragraph with the main outcome, period, number of accounts checked and 1–3 priorities.
2. **Scope & coverage:** connection/source status; accessible vs checked accounts; date windows, time zones, currency, goal definition; skipped/partial reads.
3. **Performance:** current/prior totals and meaningful changes per platform/account, with conversion-definition footnotes.
4. **Findings:** prioritized, evidence-backed opportunities with affected entities, observed spend/results, likely cause, confidence and recommended action.
5. **Measurement:** cross-source event/attribution mapping, tracking-health status, discrepancies and what remains unverified.
6. **Action plan:** quick wins, deeper investigations, experiments, owner/approval needed, and verification metrics.
7. **Limitations:** unavailable conversions, mismatched windows, missing links, pagination, sampling and incomplete APIs.

## Build these dashboard elements when supported by real data

| Component | Suggested UI | Data requirements / fallback |
| --- | --- | --- |
| **Audit overview** | KPI scorecards for spend, results, CPA/CPL, tracked value/ROAS and relative change | Show only valid same-definition values. Never combine mixed currencies or platform-attributed conversions as unique outcomes. Fallback: metric table. |
| **Spend and outcome trends** | Daily spend line and separate conversions/leads/value line (or clearly labeled distinct axes) comparing current vs previous windows | Use a consistent calendar and per-platform definitions. Fallback: day/week comparison table. |
| **Channel/account performance** | Sortable table or small multiples per platform, with spend, outcomes, CPA/ROAS, deltas and coverage flags | Avoid stacked conversions across platforms; identify account currency. Fallback: Markdown table. |
| **Spend-at-risk investigation** | Ranked horizontal bars/table for high-spend zero-result entities; filter by platform, account, campaign and confidence | Label "potential waste" or "spend with zero attributed results," not proven waste. Do not total overlapping entities. |
| **Priority findings** | Severity-prioritized finding cards with amount, evidence, confidence, recommended action, and an expandable "why / verify" panel | Drill-down must link to returned entity IDs or evidence actually available. Fallback: structured numbered findings. |
| **Tracking & attribution health** | Event mapping/reconciliation matrix: platform → event/action → GA4/GTM/pixel evidence, with health and caveats | Statuses: confirmed, likely, inconclusive, unavailable; never infer live firing from configuration alone. |
| **Action plan** | Ordered checklist with expected effect (if supported), effort, required approval and verification signal | Do not include actionable mutation controls unless separately authorized and actually functional. |

For genuinely interactive UI, offer useful filters (date, platform, account, severity) and expandable findings **only if they work**; otherwise use static tables. Keep charts readable, show units and date labels, allow "not available" values, and accompany them with a textual interpretation. If the assistant cannot build dashboards, provide the same information in prose and Markdown tables rather than requesting new tools.

## Compact example of finding presentation

**High priority — Google Ads search term [actual term and ID/context]**  
*Evidence:* [spend in account currency] and [attributed conversions] in [exact dates], versus [comparison if available].  
*Assessment:* Potentially inefficient; tracking/lag checked [result]. Confidence: [level].  
*Recommended action:* [review query intent or test negative], **not executed**.  
*Verify:* [search-term conversion rate and spend after the test, same conversion action/window].

Populate brackets only from retrieved evidence; otherwise omit or mark unavailable.
