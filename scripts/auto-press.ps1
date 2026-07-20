# Southern Cross Press - daily morning paper launcher (headless, subscription auth)
# Invoked daily 6:47 by Windows Task Scheduler. Runs `claude -p` which researches
# today's themed article, appends to articles.json via add-issue.mjs and git pushes.
# Publication ends 2026-09-19 (the prompt self-terminates after that date).
# Stop:  Unregister-ScheduledTask -TaskName 'TravelPressDaily' -Confirm:$false
# NOTE: keep THIS file ASCII-only (PS 5.1 misreads BOM-less UTF-8 with Japanese).
#       The Japanese prompt lives in press-prompt.txt, read back as UTF-8 below.
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$repo       = 'C:\Users\kanedomi\Desktop\Claude\travel-itinerary'
$log        = Join-Path $repo 'scripts\auto-press.log'
$promptFile = Join-Path $repo 'scripts\press-prompt.txt'
Set-Location $repo

$prompt = Get-Content -Raw -Encoding UTF8 $promptFile

"==== $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') START ====" | Out-File -FilePath $log -Append -Encoding utf8
& claude -p $prompt --model sonnet --permission-mode acceptEdits `
  --allowedTools 'WebSearch' 'WebFetch' 'Read' 'Write' 'Bash(node:*)' 'Bash(git:*)' 'Bash(curl:*)' `
  --output-format text 2>&1 | Out-File -FilePath $log -Append -Encoding utf8
# Publish safety net (owner-approved 2026-07-20): the agent sometimes ends without
# completing step 8 (publish) and issues pile up unseen. If validated commits are
# left unpublished, finish the pre-approved daily publication mechanically.
# cmd /c avoids PS 5.1 wrapping git's stderr progress into ErrorRecords.
$ahead = cmd /c "git rev-list --count origin/main..main 2>nul"
if ($ahead -match '^[0-9]+$' -and [int]$ahead -gt 0) {
  "SAFETY-NET: publishing $ahead remaining commit(s)." | Out-File -FilePath $log -Append -Encoding utf8
  cmd /c "git push origin main 2>&1" | Out-File -FilePath $log -Append -Encoding utf8
}
"==== $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') END (exit=$LASTEXITCODE) ====" | Out-File -FilePath $log -Append -Encoding utf8
