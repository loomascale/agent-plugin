# Tag Manager tools: audit, drafts, versions and publishing

Based on the all-in-one LoomaScale measurement reference; this package exposes only
`gtm_*` tools and LoomaScale helpers, so keep its workflows within that scope.

## Tag Manager: published configuration and unpublished work

For "Is conversion tracking configured correctly?" →
`gtm_audit_tracking`, then `gtm_list_tags` and `gtm_list_triggers_variables` for
specific findings. The audit can cross-check connected Google Ads website
conversion actions using `google_ads_account_id`; imported GA4, offline, call,
and app conversions are not expected as website tags. `skip_google_ads:true`
limits the audit to the container. `scope:"workspace"` with `workspace` audits a
draft instead of the published version (use it after draft fixes to show what
the live version will look like). Each finding carries `id` (stable across runs
and renames), `confidence` (confirmed / likely / unverified) and `categories`
(draft / review / external / info); quote the confidence when it is not
confirmed, and never propose deleting an "unused" trigger or variable while
`evidenceComplete` is false. A conversion action is `UNRESOLVED`, not missing,
when a variable-driven tag might send to it.

For "Is the fix live?", read `gtm_get_container` and `gtm_get_workspace_status`.
Container, tag, and trigger reads describe the published version unless `workspace`
names a draft on `gtm_list_tags` / `gtm_list_triggers_variables`, which then read that
workspace's own entities (answer carries `scope`, `workspaceName`, `complete`); workspace status
describes unpublished changes and merge conflicts. Live versions are cached for
10 minutes: use `fresh:true` on a live-version read after the user publishes.
Check `liveVersionId` and `fromCache`. Workspace status reads three workspaces by
default, at most 10 through `max_workspaces`; the audit reads up to three when
`include_workspaces` is true. State `workspacesRead` versus `workspaceCount`.

Use `gtm_list_versions` for names, history and which version is live (`live:true`);
Google supplies no publish timestamps in this list. `gtm_list_workspaces` names the
container's workspaces; `gtm_list_triggers_variables` also lists the enabled built-in
variables.
Configuration findings do not prove runtime firing, consent behavior, or page installation.
A missing tag may be installed directly or in another container; variable-derived conversion
IDs/labels may be unevaluable. Recommend page/runtime verification for those gaps.
The read tools cannot edit or publish a container.

### Tag Manager: fixing what the audit found (drafts, versions, publishing)

The Tag Manager connect asks Google for reading, editing, versions and publishing in
one consent. A tool that needs a permission the stored grant lacks (the user unticked
it, or connected before it was asked for) says so: tell the user to reconnect Google Tag
Manager on the connections page with every box ticked. A refusal that names the user's
role ("role denied") is Google judging the login's container permission, fixed under
Admin > User management in Tag Manager, not by reconnecting.

Every edit needs `workspace`: the existing workspace the user chose. Call
`gtm_list_workspaces`, ask which one, and never pick one yourself; `gtm_create_workspace`
only when the user asks for a new one by name (a free container holds three). When
`gtm_get_workspace_status` or `gtm_create_version` says the workspace is behind the live
version or has merge conflicts, run `gtm_sync_workspace` (Tag Manager's Update: merges the
latest version in, keeps the draft's edits). Conflicts it reports — the same entity changed
on both sides, with the differing fields named — are resolved only by the user in Tag
Manager; never suggest keeping the workspace copy blindly, that overwrites what someone
else published. A draft goes live in two separate steps, each on the user's word: `gtm_create_version` saves the
workspace as a named version (nothing live yet; say so, give the `workspaceUrl` or
version link, recommend Preview), then `gtm_publish_version` with `confirm:false` shows
what would replace the live version, and only after the user explicitly confirms that
version id do you call it with `confirm:true`. Never publish without that confirmation,
never publish "the latest" without naming the id, and report the `liveVersionIdAfter`
and `verified` fields from the answer, not the call's success. Keep the previous live
id in the conversation: a rollback is publishing it again.

Triggers on clicks, forms, scrolling or video need Google's built-in variables enabled
(`{{Click URL}}`, `{{Form ID}}`, …): check `builtInVariables` in
`gtm_list_triggers_variables` and enable missing ones with
`gtm_enable_built_in_variables` before creating the trigger.

Typical sequence for a missing Google Ads conversion: use `gtm_audit_tracking`
with the already-connected Google Ads account to read `conversionTrackingId` and
the action's `conversionLabel`. If the account is not connected, ask the user for
the ID and label from their Google Ads conversion setup; this package does not
expose `gads_*` tools. Then use `gtm_create_trigger` for the thank-you page
(`PAGEVIEW` with a `Page URL contains` condition) unless a suitable trigger exists, then
`gtm_create_tag` with `type: GOOGLE_ADS_CONVERSION`. For a tag that never fires, fix its
trigger with `gtm_update_trigger` (`conditions`) or reattach it with `gtm_update_tag`
(`firing_triggers`). For a duplicate GA4 configuration or Google tag, pause the extra
one with `gtm_update_tag` (`paused: true`). To remove a draft tag, trigger or variable
for good (a test entity, a duplicate the user wants gone), confirm it with the user and
call `gtm_delete_entity` (`entity_type` + `entity`); it refuses anything still referenced
or built in, and the deletion goes live only with a published version. Tag kinds created
or edited: GA4 event, Google tag, Google Ads conversion; variable kinds: constant, data
layer, URL, cookie, JavaScript variable, lookup table. Custom HTML and custom
JavaScript are not offered: say so and leave those to the user.
