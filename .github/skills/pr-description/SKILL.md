---
name: pr-description
description: Generate and create pull requests on GitHub following the project template. Use when asked to "generate a PR", "create a PR", "open a pull request", "create pull request", "write PR description", or "fill PR template". Autonomous workflow that only asks questions when critical info is missing.
---

# Pull Request Description Generator

Automatically generate comprehensive pull request descriptions following the project's PR template. Performs structured analysis of git changes, aligns with GitHub issue objectives, and creates production-ready PR descriptions.

## Workflow

### 1) Gather GitHub issue context

**Objective**: Retrieve linked GitHub issue to understand PR objective, or proceed without issue if user confirms.

**Steps**:

- Check user prompt for issue number, URL, or "fixes #123" pattern
- If found: fetch issue via GitHub MCP → `gh` CLI → REST API (see `references/github-access-priority.md`)
- If NOT found but seems issue-related: ask user for issue link
- If user confirms no issue: proceed with user-provided objective

**Output**: Create context file `.copilot/pr-description-<id>.md` with:

```markdown
## Objective

[Issue title and description OR user-provided objective]

## Issue Link

[URL or "No issue"]
```

**Edge cases**:

- **Multiple issue references**: Use first one, note others in "Related Issues"
- **Private repo access**: If GitHub access fails, ask user to provide issue summary manually
- **Ambiguous context**: If unclear whether issue exists, ask: "Is this PR related to a GitHub issue?"

**Load detailed instructions**: `references/task-1-get-issue.md`

---

### 2) Retrieve git changes

**Objective**: Detect target branch, generate diff, extract commit messages.

**Steps**:

1. **Detect main branch** (priority order):
   - User-specified in prompt
   - Project instructions (`.github/copilot-instructions.md`)
   - Git symbolic-ref: `git symbolic-ref refs/remotes/origin/HEAD`
   - Common names: `main` → `master` → `develop`
   - **Last resort**: ask user

2. **Generate diff**:
   - Current branch: `git rev-parse --abbrev-ref HEAD`
   - Merge base: `git merge-base HEAD origin/<main-branch>`
   - Diff: `git diff <merge-base>..HEAD --stat` and full diff
   - Changed files: `git diff <merge-base>..HEAD --name-status`

3. **Extract commits**:
   - Commit log: `git log <merge-base>..HEAD --pretty=format:'%s%n%b'`
   - Authors: `git log <merge-base>..HEAD --format='%an'`

**Append to context file**:

```markdown
## Changes Summary

- **Branch**: feature/xyz → main
- **Files changed**: X files (+YYY, -ZZZ)
- **Commits**: N commits

## Commit Messages

[List of commit subjects and bodies]

## Changed Files

[List with change type: A/M/D]

## Full Diff

[Complete git diff output]
```

**Edge cases**:

- **No commits**: Current branch = main branch → inform user
- **Large diff (>1000 lines)**: Warn user, summarize by module
- **Unpushed changes**: Include both committed and staged changes

**Load detailed instructions**: `references/task-2-get-changes.md`

---

### 3) Analyze changes

**Objective**: Quick coherence check between changes and objective. Not a full code review—just verify alignment and classify change type.

**⚠️ CRITICAL: This step is MANDATORY and must ALWAYS display results to user before proceeding to step 4.**

**Steps**:

1. **Identify change type**:
   - Bug Fix, Feature, Refactoring, Documentation, Performance, Security, Tests, CI/Build, Dependencies

2. **Identify architecture layers** (if code changes):
   - Domain (entities, value objects, business rules)
   - Application (use cases, services, DTOs)
   - Infrastructure (database, API clients, external services)
   - Presentation (UI components, API routes, templates)

3. **Quick alignment check**:
   - Compare objective vs actual changes
   - Examples:
     - **Objective**: Add data export feature
     - **Changes**: Only CSS refactoring → ❌ **NOT ALIGNED**
     - **Objective**: Fix login bug
     - **Changes**: Auth service + tests → ✅ **ALIGNED**

4. **Flag concerns** (if any):
   - Scope creep (many unrelated changes)
   - Missing tests for new features
   - Breaking changes without migration plan

**MANDATORY: Display analysis summary to user**:

```
---
## 🔍 Change Analysis

**Objective**: [User's stated objective from step 1]

**Changes Made**: [Brief summary - e.g., "7 files modified: skill workflow refactored, reference docs added"]

**Change Type**: [Primary type from list above]

**Architecture Layers**: [List layers OR "Documentation/Tooling only"]

**Compliance**: ✅ Changes align with objective
OR
**Compliance**: ⚠️ NOT ALIGNED

[If NOT ALIGNED, show checklist:]
Missing/Concerns:
- [ ] Expected feature X not implemented
- [ ] Tests missing for new functionality
- [ ] Unrelated changes (scope creep)

---
```

**Rules**:

- ✅ **ALWAYS show this summary** before step 4 (even if aligned)
- ✅ If aligned: proceed automatically to step 4
- ⚠️ If NOT aligned: ask user "Proceed anyway?" before step 4

**Load detailed instructions**: `references/task-3-analyze-changes.md`

---

### 4) Generate and create PR

**Objective**: Find PR template, fill all sections with analysis, present for review, create PR on GitHub.

**Steps**:

1. **Find PR template** (priority):
   - Project: `.github/PULL_REQUEST_TEMPLATE.md`
   - Organization: `https://github.com/<org>/.github/blob/main/.github/PULL_REQUEST_TEMPLATE.md`
   - Bundled: `template/PULL_REQUEST_TEMPLATE.md`

2. **Fill template sections**:
   - **Title**: Follow conventional commits: `type(scope): description`
   - **Summary**: 2-3 sentences from objective + changes
   - **Related Issue**: Link or "No issue"
   - **Type of Change**: Check appropriate boxes
   - **Key Changes**: Bullet list from changed files
   - **Testing**: Describe verification steps
   - **Impact/Migration**: Note breaking changes or DB migrations
   - **Checklist**: Mark completed items
   - **Additional Notes**: Reviewer context ONLY (⚠️ **NEVER** include: commit hashes, file counts, stats, or `.copilot/pr-description-*.md` path)

3. **Present for review**:

   ```markdown
   ## Generated PR Description

   [Full PR description with all filled sections]

   ---

   **Next steps**:

   1. Review description above
   2. Say "Create PR" to create on GitHub
   3. Say "Edit [section]" to modify specific part
   4. Say "Show text" for copy/paste
   ```

4. **Create PR on GitHub** (when user confirms):
   - Priority: GitHub MCP → `gh pr create` → REST API (see `references/github-access-priority.md`)
   - Use current branch → target main branch
   - Return PR URL

**Load detailed instructions**: `references/task-4-generate-pr.md`

---

## Autonomous Behavior

**Only ask questions when critical info is missing**:

- ✅ Ask: GitHub issue link (if ambiguous)
- ✅ Ask: Main branch name (if auto-detection fails)
- ✅ Ask: Confirmation before creating PR on GitHub
- ✅ Ask: Confirmation if changes NOT aligned with objective

**Don't ask**:

- ❌ "Should I analyze changes?" → Just do it
- ❌ "Should I proceed to next step?" → Execute workflow automatically
- ❌ "What should the PR title be?" → Generate from commits/issue

---

## Resources

### references/

| File                        | Purpose                                               |
| --------------------------- | ----------------------------------------------------- |
| `github-access-priority.md` | GitHub access methods (MCP → gh → API) with examples  |
| `task-1-get-issue.md`       | Detailed issue retrieval logic and edge cases         |
| `task-2-get-changes.md`     | Complete git change detection and diff generation     |
| `task-3-analyze-changes.md` | Change type classification and alignment verification |
| `task-4-generate-pr.md`     | Template search, section filling, PR creation methods |

### template/

| File                       | Purpose                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| `PULL_REQUEST_TEMPLATE.md` | Bundled fallback PR template (used if no project template found) |
