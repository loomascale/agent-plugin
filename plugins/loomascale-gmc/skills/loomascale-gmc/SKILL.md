---
name: loomascale-gmc
description: Diagnose the user's connected Google Merchant Center (GMC) account with LoomaScale. Use for Google Shopping products not showing, product disapprovals, product feed diagnostics and errors, account health, Shopping ads and free listings performance, and requested changes to eligible settings, feeds or product data. Shipping and return policies are read-only. Do not invoke for general Shopping definitions, deleting products, approving products or managing ad campaigns.
---

# Google Merchant Center with LoomaScale

Answer product feed, disapproval and Google Shopping performance questions with
evidence from the user's connected Google Merchant Center (GMC) account. This
package connects to `https://api.loomascale.com/mcp/gmc`. Inspect available tool
descriptions and input schemas; a client may add a namespace to the tool names
used here.

## Resolve the account

Reuse an account already verified in the conversation. Otherwise call
`gmc_list_accounts` and pass the numeric `account_id`; it can be omitted when exactly
one account is reachable. Never substitute a Google Ads customer ID or a GA4
property ID.

## Choose the tool that answers the question

| Question | Tool |
| --- | --- |
| Which accounts can I access, and what are their settings? | `gmc_list_accounts`, `gmc_get_account_settings` |
| Why aren't my products showing? | `gmc_get_account_health`, then `gmc_query` on `product_view` |
| Which products earn clicks? | `gmc_query` on `product_performance_view` |
| Are my feeds working? | `gmc_list_data_sources`, `gmc_get_data_source` |
| What does one product look like, and can it be patched? | `gmc_get_product` |
| Shipping and return policies | `gmc_get_shipping_settings`, `gmc_list_return_policies` |

Read [Merchant Center tools](references/merchant-center.md) for MCQL, health
counts, and the exact rules for each change.

## Change the account only on the user's word

Keep diagnosis read-only. Never change anything as a side effect of an analysis.
Read current settings first, propose the exact change, and apply it only after
the user agrees. Website changes are a dry run until called with `confirm:true`
for the URL the user confirmed. Product writes are processed asynchronously:
report them as submitted and verify with `gmc_get_product` later. Nothing
deletes a product, feed, policy or claim; no tool takes a feed password.

## Handle access and helper tools accurately

- If authorization is missing, expired or lacks a permission, use the link the
  tool returns or the [LoomaScale connections dashboard](https://loomascale.com/dashboard/connections).
  A refusal that names the user's role is Google judging the login's access, not
  something reconnecting fixes.
- For a plan or trial refusal, call `loomascale_get_user` once and explain the
  plan, trial, task or account allowance it reports. That allowance is not an ad budget.
- On the Free plan (`readOnly: true` in `loomascale_get_user`) only reads work.
  Use read tools and offer a change as a recommendation, not as an action you
  can run. Never retry a Free plan refusal:
  - A change refused because the plan is read-only: give the finding and the
    recommended change, say that applying it needs a paid plan, and give the
    dashboard link from the refusal.
  - Weekly tasks used up: give the reset date from the message.
  - Account or property allowance reached: say which account was refused
    and when the allowance resets, as the message states. Listing or selecting accounts and reusing a
    counted account spend nothing.
- `loomascale_request_feature` sends a message to the LoomaScale team. Call it
  only when the user asks to send a feature request.
- `loomascale_list_data_sources` lists every source LoomaScale supports, which
  are connected, and which this plugin has tools for. Use it when the user asks
  about other platforms or connecting another service. It is free and connects
  nothing: give the user the link it returns, and say plainly when a source
  needs the full LoomaScale plugin.

## Return a result the user can assess

Name the account, destination and country. Keep per-destination counts separate. Claim a change only after the tool reports success, and say when Google still has to process it.
