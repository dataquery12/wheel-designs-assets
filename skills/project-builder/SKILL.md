---
name: project-builder
description: "Build complete development projects end-to-end using Claude Code. Use when: user describes a project they want built, says 'create a project / app / tool', 'develop X', 'build me Y'. Handles: requirements gathering, planning, full implementation via Claude Code sub-agent, auto-monitoring and resume on interruption. NOT for: simple one-file scripts, quick fixes, tasks under 15 minutes."
---

# Project Builder

Orchestrates full software project development: gather requirements → spawn Claude Code via sub-agent → monitor progress → auto-resume on interruption.

## Workflow Overview

| Step | Who | What |
|------|-----|-------|
| 1. Gather | openclaw | Structured conversation to collect requirements |
| 2. Prepare | openclaw | Write PROJECT_SPEC.md, init PROJECT_STATE.json, create dir |
| 3. Spawn | openclaw | `sessions_spawn` a sub-agent to run Claude Code |
| 4. Monitor | sub-agent | Run Claude Code in background, poll until done |
| 5. Watchdog | cron | Check every 15 min, auto-resume if stalled |
| 6. Complete | openclaw | Announce result, clean up cron |

---

## Step 1: Gather Requirements

Ask the user these questions. Batch them in one message. Skip any already answered.

- **Project name** — short slug, becomes the directory name (e.g. `my-api`)
- **Project path** — where to create it (default: `~/projects/<name>`)
- **Description** — what it does and who uses it
- **Tech stack** — preferred language/framework, or "up to Claude Code"
- **Key features** — top 1–5 must-haves for v1
- **Constraints** — anything hard: no external APIs, must use SQLite, specific port, etc.

Keep it brief. If the user gave enough context, skip straight to Step 2.

---

## Step 2: Prepare Project Files

Create the project directory, then write these two files.

### PROJECT_SPEC.md

```markdown
# Project Spec: <name>

## Overview
<1–2 sentence description>

## Tech Stack
<stack, or "Claude Code to decide based on requirements">

## Features (v1)
- <feature 1>
- <feature 2>
- <feature 3>

## Constraints
<hard requirements, or "none">

## Success Criteria
<what "done" looks like — runnable app, passing tests, specific endpoints, etc.>
```

### PROJECT_STATE.json (initial)

```json
{
  "project": "<name>",
  "projectPath": "<absolute path>",
  "status": "starting",
  "lastActivity": "<ISO timestamp>",
  "currentPhase": 0,
  "phases": [],
  "subagentSessionKey": null,
  "watchdogCronName": null
}
```

Then initialize git:
```bash
cd <projectPath> && git init && git add . && git commit -m "init: project scaffold"
```

---

## Step 3: Spawn the Builder Sub-Agent

Use `sessions_spawn` to start the build. The sub-agent will run Claude Code and monitor it until completion.

```
sessions_spawn(
  task: "<sub-agent task — see template in templates/subagent-task.md>",
  label: "build-<project-name>",
  agentId: "build-coordinator",
  runTimeoutSeconds: 7200
)
```

After spawning:
- Save `childSessionKey` to `PROJECT_STATE.json` → `subagentSessionKey`
- Tell the user the build has started

**Building the sub-agent task prompt:**
Replace all `<placeholders>` with real values from the gathered requirements.
The full template is in `templates/subagent-task.md`.

---

## Step 4: Set Up Watchdog Cron

Immediately after spawning the sub-agent, register a watchdog cron job to catch stalls or crashes.

**Key flags:**
- `--light-context`: prevents AGENTS.md from being injected, so the agent won't follow "session start" instructions to load SOUL.md, USER.md, memory files — saves significant tokens.
- No `--agent`: runs under main agent, so `--announce` automatically delivers to the last place the user talked (correct channel routing without needing to specify it explicitly).

```bash
openclaw cron add \
  --name "watchdog-<project-name>" \
  --every "15m" \
  --session isolated \
  --light-context \
  --message "Watchdog check for project: <project-name>

Project path: <projectPath>
State file: <projectPath>/PROJECT_STATE.json
Watchdog cron name: watchdog-<project-name>

Steps:
1. Read PROJECT_STATE.json.
2. If 'status' is 'complete': remove this cron job with 'openclaw cron rm watchdog-<project-name>', then reply HEARTBEAT_OK.
3. If 'lastActivity' timestamp is less than 20 minutes ago: reply HEARTBEAT_OK (still active).
4. If 'lastActivity' is more than 20 minutes ago AND status is not 'complete':
   - The build has stalled. Resume it.
   - Read PLAN.md to identify the first phase where status != 'done'.
   - Update PROJECT_STATE.json: set lastActivity to now.
   - Spawn a resume sub-agent:
     sessions_spawn(
       task: 'Resume building <project-name>. Project is at <projectPath>. Read PLAN.md and PROJECT_STATE.json. Find the first phase that is not done. Continue implementation from that phase. After each phase completes, update PROJECT_STATE.json (phase status to done, update currentPhase and lastActivity). When all phases done, set status to complete in PROJECT_STATE.json.',
       label: 'resume-<project-name>',
       agentId: 'build-coordinator',
       runTimeoutSeconds: 7200
     )
   - Announce: 'Build stalled, resumed from phase <N>.'
5. Otherwise reply HEARTBEAT_OK." \
  --announce
  --channel last
```

Save the cron job name to `PROJECT_STATE.json` → `watchdogCronName`.

---

## Step 5: Tell the User

After spawning and setting up the watchdog, send one message:

```
Building <project-name> at <projectPath>.

Claude Code is now running. I'll check in every 15 minutes and auto-resume if anything stalls.

You can ask me "how's <project-name> going?" any time.
```

---

## Checking Progress (when user asks)

1. Read `PROJECT_STATE.json`
2. Report: completed phases / total, current phase name, last activity time
3. Optionally check `sessions_list` to see if the sub-agent session is still active

Example response:
```
<project-name>: Phase 3/6 complete (last activity 8 min ago).
Currently implementing: <phase name>.
```

---

## Completion

When the sub-agent announces completion (or you detect `status: "complete"` in PROJECT_STATE.json):

1. Remove the watchdog: `openclaw cron rm watchdog-<project-name>`
2. Update `PROJECT_STATE.json` → `watchdogCronName: null`
3. Tell the user:
   - What was built
   - Where it is
   - How to run it (if Claude Code noted this in PROJECT_STATE.json or PLAN.md)

---

## Manual Resume

If the user asks to resume a stalled project, or you detect it's stalled:

1. Read `PROJECT_STATE.json` and `PLAN.md`
2. Find first phase where `status != "done"`
3. `sessions_spawn` with the resume task (same as watchdog resume prompt above)
4. Update `PROJECT_STATE.json` → `lastActivity` to now

---

## Gotchas

- **Claude Code command**: Use `--permission-mode bypassPermissions --print`, NOT `--dangerously-skip-permissions` with PTY. PTY causes Claude Code to exit after the confirmation dialog.
- **Background mode**: Always `bash workdir:<path> background:true command:"claude ..."`. Never foreground — it blocks the sub-agent.
- **PROJECT_STATE.json**: Claude Code must be explicitly instructed to update this after every phase. It won't do it without being told.
- **Prompt escaping**: If the Claude Code prompt contains quotes, write it to a temp file first: `echo '<prompt>' > /tmp/task-<name>.md` then `claude --permission-mode bypassPermissions --print "$(cat /tmp/task-<name>.md)"`.
- **Stale threshold**: 20 minutes. Complex phases can take 10–15 min. Don't resume too eagerly.
- **Sub-agent timeout**: `runTimeoutSeconds: 7200` (2 hours) for large projects. Smaller projects: `3600`.
- **Never build in ~/.openclaw/**: Tell Claude Code to stay in the project directory. It should not wander into the workspace.
- **Git init required**: Claude Code works best in a git repo. Always `git init` before spawning.
