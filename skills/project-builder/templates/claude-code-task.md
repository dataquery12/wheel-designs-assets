# Claude Code Task Template

This is the prompt passed to `claude --permission-mode bypassPermissions --print`.
Replace all `<placeholders>` before use.

---

```
You are building a software project from scratch. Follow these steps exactly and in order.

Project directory: <projectPath>
Spec file: <projectPath>/PROJECT_SPEC.md

## Step 1: Read the spec
Read PROJECT_SPEC.md. Understand the project requirements, tech stack, features, and constraints.

## Step 2: Write PLAN.md
Break the work into 4–8 phases. Each phase must be:
- Independently completable (working state after each phase)
- Concrete enough to implement without ambiguity
- Committed to git when done

Format:
```
# Plan: <project name>

## Phase 1: <name>
<what to build — be specific>

## Phase 2: <name>
<what to build>

...
```

## Step 3: Initialize PROJECT_STATE.json
After writing PLAN.md, write PROJECT_STATE.json with all phases listed:

```json
{
  "project": "<name>",
  "projectPath": "<projectPath>",
  "status": "implementing",
  "lastActivity": "<current ISO timestamp>",
  "currentPhase": 1,
  "phases": [
    {"id": 1, "name": "<phase 1 name>", "status": "in_progress"},
    {"id": 2, "name": "<phase 2 name>", "status": "pending"},
    ...
  ]
}
```

## Step 4: Implement each phase in order

For each phase:

1. Write the code, create files, install dependencies — do the actual work
2. Verify it works (run tests, check compilation, start the server briefly if applicable)
3. Update PROJECT_STATE.json:
   - Set the completed phase status to "done"
   - Increment currentPhase
   - Update lastActivity to the current ISO timestamp
   - Set next phase status to "in_progress"
4. Commit: `git add -A && git commit -m "phase <N>: <phase name>"`

IMPORTANT: Update PROJECT_STATE.json after EVERY phase, even if interrupted.
This is how progress is tracked and how the build can be resumed.

## Step 5: Finalize

When ALL phases are done:
1. Update PROJECT_STATE.json: set status to "complete", update lastActivity
2. Write a brief CLAUDE.md in the project root documenting:
   - What was built
   - How to run / develop it
   - Key architecture decisions
3. Final commit: `git add -A && git commit -m "complete: project build finished"`

## Rules
- Stay inside <projectPath>. Do not read or write outside this directory.
- If you hit an error installing a dependency or running a command, try to fix it before moving on.
- If a phase is too large, split it — but update PLAN.md and PROJECT_STATE.json to reflect the split.
- Do not skip phases or mark them done without actually implementing them.
```
