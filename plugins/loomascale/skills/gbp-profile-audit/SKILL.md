---
name: gbp-profile-audit
description: Audit a connected Google Business Profile (GBP) location with LoomaScale for incomplete or outdated details and rank the optimization opportunities. Use when asked to audit a business listing, check whether a profile is complete, review categories, attributes, hours, description, phone or website link, or find what to fix first for local SEO. Read-only until the user approves a specific change. Early access (preview).
---

# Google Business Profile audit

Find what is missing or outdated in one Business Profile location and rank the
fixes. The audit is read-only. Google Business Profile is in early access (preview)
on LoomaScale and may not be offered to every account yet; if the `gbp_*` tools are
absent, say so and stop.

Read [Business Profile tools](../loomascale/references/business-profile.md) for
arguments, paging and the change rules.

## 1. Resolve the location

Reuse a location verified in the conversation. Otherwise call `gbp_list_locations`
(`gbp_list_accounts` first when several accounts are reachable). With several
locations, ask which one to audit, or audit up to five the user names and report
each separately. Pass the numeric `location_id` on every call.

## 2. Read the current profile

1. `gbp_get_location` for name, description, address, phones, website, categories,
   regular and special hours, service area, services, open status and metadata.
2. `gbp_get_location_attributes` for the attributes set today.
3. `gbp_list_available_attributes` for the attributes this category and country allow.
4. `gbp_list_categories` with the location's `region_code` and `language_code` and a
   `search` term, only when the current categories look incomplete or too broad.
5. Optional context: `gbp_get_performance` for the last 30 days and
   `gbp_list_search_keywords` for the last three full months, to rank gaps by the
   demand the profile already receives.

## 3. Check completeness

Mark each item present, missing, outdated or not applicable, with the value returned.

| Area | What to check |
| --- | --- |
| Description | Present, specific to the business, and consistent with the services and categories. |
| Contact | Primary phone and website link present. Note whether the link carries UTM parameters for Google Analytics 4. |
| Hours | Regular hours for every open day; special hours for upcoming public holidays; open status. |
| Categories | A primary category that names the core service, plus relevant additional categories. |
| Attributes | Allowed attributes that are unset, and set values that contradict the profile. |
| Services and service area | Present where the business type uses them. |
| Profile state | `metadata` showing pending edits or a Google update; a suspended or disabled location. |

Judge only what the tools return. A field the tool does not return is not checked,
not missing. Do not infer facts about the business (holiday hours, services,
accessibility) that the user has not stated; ask for them.

## 4. Rank the opportunities

Order findings by likely effect on customers: wrong or missing hours, phone and
website first; then the primary category; then description, additional categories
and attributes. Use the search keywords to support a category or description
suggestion, keeping a privacy threshold as "fewer than N". Label each finding as
observed fact, recommendation or hypothesis. No profile change guarantees a higher
position in local results.

## 5. Report and offer changes

Lead with a one-line verdict and a table of findings with the current value, the
proposed value and the reason. State the location and the date of the audit.
End with up to three changes worth making first.

Do not change anything during the audit. When the user picks a change, follow the
dry run and approval rule in the reference: run the write tool without `confirm`,
show current and proposed values, and set `confirm: true` only after the user
approved that exact change. When the write tools are not exposed or the plan is
read-only, give the exact value to enter in Google Business Profile.
