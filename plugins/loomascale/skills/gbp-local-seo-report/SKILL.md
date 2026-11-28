---
name: gbp-local-seo-report
description: Report local SEO performance for a connected Google Business Profile (GBP) with LoomaScale. Compare Google Search and Maps impressions, calls, direction requests, website clicks and other customer actions period over period, and list the search keywords that showed the profile. Use for local visibility reports, monthly local SEO reports, multi-location comparisons and questions about why calls or direction requests changed. Read-only. Early access (preview).
---

# Local SEO report

Show how visible a business is on Google Search and Maps, what customers did, and
how both changed against an earlier period. The report is read-only. Google
Business Profile is in early access (preview) on LoomaScale and may not be offered
to every account yet; if the `gbp_*` tools are absent, say so and stop.

Read [Business Profile tools](../loomascale/references/business-profile.md) for
metrics, keyword thresholds and paging.

## 1. Scope

Resolve the locations with `gbp_list_locations`. One performance call takes up to
20 `location_ids`; batch a larger set and say which locations were covered. Without
a stated period, use the last 30 days ending yesterday and the 30 days before them.
Honor the user's dates and keep both periods the same length.

## 2. Read both periods

There is no compare tool. Call `gbp_get_performance` once per period with explicit
`start_date` and `end_date`, then compute the change. Each location returns its own
result or error; report a failed location as unavailable, not as zero. If the latest
days return no values, shorten or shift both periods together and label the dates.

Group the metrics:

| Group | Metrics |
| --- | --- |
| Visibility on Search | `BUSINESS_IMPRESSIONS_DESKTOP_SEARCH`, `BUSINESS_IMPRESSIONS_MOBILE_SEARCH` |
| Visibility on Maps | `BUSINESS_IMPRESSIONS_DESKTOP_MAPS`, `BUSINESS_IMPRESSIONS_MOBILE_MAPS` |
| Customer actions | `CALL_CLICKS`, `BUSINESS_DIRECTION_REQUESTS`, `WEBSITE_CLICKS`, `MESSAGING_CLICKS`, `BUSINESS_BOOKINGS`, `BUSINESS_FOOD_MENU_CLICKS` |

Leave out an action that does not apply to the business instead of showing zero.

## 3. Add the search keywords

Call `gbp_list_search_keywords` for the full months that overlap the report
(`start_month`, `end_month` as `YYYY-MM`). Keyword data is monthly only, so label
its months separately from the daily report dates. Show an exact `impressions`
count as a number and a privacy `threshold` as "fewer than N". Never add thresholds
to a total. These are the terms that showed this profile, not market search volume
and not a ranking position.

## 4. Interpret

- Compute an action rate as actions divided by total impressions for each period,
  and give its change in percentage points.
- Separate a visibility change (impressions) from an engagement change (actions per
  impression), and Search from Maps, desktop from mobile.
- Use the daily series to place a change on specific dates, and
  `gbp_get_location` to check for an edit, changed hours or a pending Google update
  that could explain it. Call these explanations hypotheses unless the data shows them.
- For several locations, rank by absolute change and flag the outliers.

Small numbers move a lot in percentage terms; show absolute values beside every
percentage. Correlation with a profile edit does not prove cause.

## 5. Deliver

Lead with the answer: up, down or flat, and where. Then a table with **Metric**,
**Previous period**, **Current period** and **Change**, the top search keywords, and
up to three next steps tied to the figures. State the location, both date ranges
and any uncovered location or day.

Offer follow-ups without running them: [gbp-profile-audit](../gbp-profile-audit/SKILL.md)
for listing gaps, [gbp-review-management](../gbp-review-management/SKILL.md) for
reviews, and [cross-source insights](../cross-source-insights/SKILL.md) to set the
keywords beside Google Ads search terms or Search Console queries, or website
clicks beside Google Analytics 4 sessions from a UTM-tagged profile link.
