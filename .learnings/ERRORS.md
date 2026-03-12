## [ERR-20260310-001] openclaw-cron-list

**Logged**: 2026-03-10T19:10:30+08:00
**Priority**: low
**Status**: pending
**Area**: infra

### Summary
Used `openclaw cron ls` which is not a valid subcommand.

### Error
```
error: unknown command 'ls'
(Did you mean list?)
```

### Context
- Command: `openclaw cron ls`
- Intended: list existing cron jobs

### Suggested Fix
Use `openclaw cron list`.

### Metadata
- Reproducible: yes
- Related Files: (none)

---
## [ERR-20260311-001] openclaw-logs-tail

**Logged**: 2026-03-11T07:42:30Z
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
Used unsupported --tail flag with `openclaw logs`

### Error
```
error: unknown option '--tail'
```

### Context
- Command attempted: `openclaw logs --tail 200`
- Goal: fetch recent OpenClaw logs

### Suggested Fix
Use `openclaw logs --help` to find supported options (likely `--follow` or `--lines` if available).

### Metadata
- Reproducible: yes
- Related Files: none

---
## [ERR-20260311-001] python_command_not_found

**Logged**: 2026-03-11T19:56:00+08:00
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
`python` command not found when trying to update PROJECT_STATE.json

### Error
```
zsh:1: command not found: python
```

### Context
- Command/operation attempted: python - <<'PY' ...
- Environment: macOS zsh

### Suggested Fix
Use `python3` instead of `python`.

### Metadata
- Reproducible: yes
- Related Files: /Users/vv/Desktop/social-marketer/PROJECT_STATE.json

---
## [ERR-20260311-002] rg_not_found

**Logged**: 2026-03-11T19:57:00+08:00
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
`rg` (ripgrep) not available in shell for searching

### Error
```
zsh:1: command not found: rg
```

### Context
- Command/operation attempted: rg -n "playwright|selenium|browser|puppeteer" -S src web
- Environment: macOS zsh

### Suggested Fix
Use `grep -R` or install ripgrep.

### Metadata
- Reproducible: yes
- Related Files: src, web

---
## [ERR-20260311-001] python_command_not_found

**Logged**: 2026-03-11T13:53:30Z
**Priority**: medium
**Status**: pending
**Area**: infra

### Summary
`python` command not found; need to use `python3` on this host.

### Error
```
zsh:1: command not found: python
```

### Context
- Command attempted: python - <<'PY' ...
- Environment: macOS host (Mac mini)

### Suggested Fix
Use `python3` instead of `python` for scripts.

### Metadata
- Reproducible: yes
- Related Files: /Users/vv/projects/test_2/PROJECT_STATE.json
- See Also: 

---
## [ERR-20260311-001] sessions_spawn

**Logged**: 2026-03-11T14:11:21Z
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
sessions_spawn failed because agentId 'build-coordinator' is not allowed

### Error
```
agentId is not allowed for sessions_spawn (allowed: none)
```

### Context
- Command/operation attempted: sessions_spawn with agentId 'build-coordinator'
- Triggered during watchdog resume for project test_2

### Suggested Fix
- Check allowed agentIds (agents_list or config) and use a permitted agentId, or omit agentId if default is configured.

### Metadata
- Reproducible: unknown
- Related Files: /Users/vv/projects/test_2/PROJECT_STATE.json
- See Also: 

---
## [ERR-20260311-002] openclaw_cron_add_flag

**Logged**: 2026-03-11T14:22:30Z
**Priority**: low
**Status**: pending
**Area**: infra

### Summary
Used invalid flag `--delivery-channel` for `openclaw cron add`.

### Error
```
error: unknown option '--delivery-channel'
```

### Context
- Command: openclaw cron add ... --delivery-channel last

### Suggested Fix
Use `--channel last` (see `openclaw cron add --help`).

### Metadata
- Reproducible: yes
- Related Files: 
- See Also: 

---
## [ERR-20260312-001] feishu_bitable_create_record

**Logged**: 2026-03-12T06:25:14Z
**Priority**: high
**Status**: pending
**Area**: config

### Summary
Attempt to create records in a Feishu Bitable via feishu_bitable_create_record failed with HTTP 403 despite successful metadata and read access.

### Error
```
Request failed with status code 403
```

### Context
- Operation attempted: create multiple demand records in Feishu Bitable
- Target app_token: QTYnbNHJoaTIePsf8O5cJkQ4nhe
- Target table_id: tblhsRKK0ONZx5yD
- Read operations succeeded: feishu_bitable_get_meta, feishu_bitable_list_fields, feishu_bitable_list_records
- Write operations failed: feishu_bitable_create_record

### Suggested Fix
Check whether the current Feishu app/account has write permission for this Bitable/table, record creation scope, or whether the table is shared read-only to the current integration.

### Metadata
- Reproducible: yes
- Related Files: /Users/vv/.openclaw/workspace/.learnings/ERRORS.md

---
