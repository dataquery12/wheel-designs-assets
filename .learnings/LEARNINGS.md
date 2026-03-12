## [LRN-20260311-001] correction

**Logged**: 2026-03-11T13:20:24Z
**Priority**: high
**Status**: pending
**Area**: config

### Summary
Project-builder completion flow was not fully executed: watchdog cron remained and user did not receive watchdog notification status.

### Details
In `test_python` build flow, I attempted to remove watchdog by name and got `{ok:true, removed:false}` but I still sent completion update without verifying cron removal and state-file cleanup. This violated the skill's completion checklist.

### Suggested Action
Always verify completion checklist with explicit post-checks:
1) `openclaw cron list` to confirm watchdog is gone.
2) Ensure `PROJECT_STATE.json` has `watchdogCronName: null`.
3) Include run instructions in completion message.

### Metadata
- Source: user_feedback
- Related Files: /Users/vv/projects/test_python/PROJECT_STATE.json
- Tags: project-builder, cron, completion-checklist
- Pattern-Key: project-builder.completion.verify-watchdog-removal
- Recurrence-Count: 1
- First-Seen: 2026-03-11
- Last-Seen: 2026-03-11

---
## [LRN-20260311-001] correction

**Logged**: 2026-03-11T14:21:30Z
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
Cron delivery requires an explicit delivery.channel in multi-channel setups; defaults may not resolve for isolated sessions.

### Details
User referenced docs: delivery defaults to announce, and delivery.channel can be "last" or specific channel. The cron run failed because delivery.channel wasn't set; in multi-channel environments, isolated jobs can’t infer the last channel.

### Suggested Action
When creating cron jobs with announce delivery, set delivery.channel=last or an explicit channel to avoid failures in multi-channel configs.

### Metadata
- Source: user_feedback
- Related Files: 
- Tags: cron, delivery, multi-channel

---
