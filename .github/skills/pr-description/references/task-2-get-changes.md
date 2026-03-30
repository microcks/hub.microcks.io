# Task 2: Get Changes

Retrieve all git changes that will be included in the pull request. This task generates the diff, identifies the main branch, and extracts commit messages.

## Objectives

1. **Detect main branch** (main/master/develop)
2. **Generate comprehensive git diff** from merge-base
3. **Extract commit messages** for context
4. **Update context file** with changes
5. **Prepare for Task 3** to analyze modifications

## When to Use

Task 2 is invoked from Task 1 after GitHub issue information is retrieved. It runs automatically during the PR workflow.

## Prerequisites

- Completed Task 1 (GitHub issue information obtained)
- Working git repository in current directory
- Feature branch with committed changes
- Context file exists: `.copilot/pr-description-<id>.md`

## Step-by-Step Workflow

### Step 1: Detect Main Branch

Identify the main/primary branch using this priority:

**Priority 1: User-provided main branch**

- Check if user specified main branch in prompt (e.g., "main", "master", "develop")
- If provided, use it

**Priority 2: Project instructions**

- Check `.github/copilot-instructions.md` for `main_branch` or `default_branch` configuration
- Example: `mainBranch: "main"` or `defaultBranch: "develop"`
- If found, use it

**Priority 3: Git symbolic-ref detection**

```bash
git symbolic-ref refs/remotes/origin/HEAD | sed 's@^refs/remotes/origin/@@'
```

- This returns the default remote branch (e.g., "main")
- Most reliable automatic detection

**Priority 4: Common branch names**

```bash
# Try these in order
git branch -r | grep -E 'origin/(main|master|develop)$' | head -1 | sed 's@origin/@@'
```

- Check for: main → master → develop → trunk

**Priority 5: Ask user**

```
Could not auto-detect main branch. Please specify:
- "main"
- "master"
- "develop"
- Or other branch name
```

**Example detection logic**:

```bash
# Determine main branch
MAIN_BRANCH=""

# Try Priority 1 (from prompt)
if [ ! -z "$USER_PROVIDED_MAIN_BRANCH" ]; then
  MAIN_BRANCH=$USER_PROVIDED_MAIN_BRANCH
fi

# Try Priority 2 (project instructions)
if [ -z "$MAIN_BRANCH" ] && [ -f ".github/copilot-instructions.md" ]; then
  MAIN_BRANCH=$(grep -i "main_branch\|default_branch" .github/copilot-instructions.md | head -1 | sed 's/.*: "\(.*\)".*/\1/')
fi

# Try Priority 3 (git symbolic-ref)
if [ -z "$MAIN_BRANCH" ]; then
  MAIN_BRANCH=$(git symbolic-ref refs/remotes/origin/HEAD 2> /dev/null | sed 's@^refs/remotes/origin/@@')
fi

# Try Priority 4 (common names)
if [ -z "$MAIN_BRANCH" ]; then
  for branch in main master develop trunk; do
    if git rev-parse --verify "origin/$branch" > /dev/null 2>&1; then
      MAIN_BRANCH=$branch
      break
    fi
  done
fi

# Priority 5 (ask user)
if [ -z "$MAIN_BRANCH" ]; then
  MAIN_BRANCH="main" # final fallback or ask user
fi

echo "Main branch detected: $MAIN_BRANCH"
```

**Store in context**:

```markdown
### Main Branch

<detected_main_branch> (e.g., "main")
```

### Step 2: Get Current Branch Name

```bash
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"
```

**Validation**:

- Should NOT be the same as main branch (warn user if it is)
- Should contain meaningful branch name (feature/_, fix/_, etc.)

### Step 3: Generate Git Diff

Generate comprehensive diff from merge-base (common ancestor) to HEAD:

```bash
# Calculate merge-base (common ancestor between main and feature branch)
MERGE_BASE=$(git merge-base $MAIN_BRANCH $(git branch --show-current))

# Generate diff
git diff $MERGE_BASE $(git branch --show-current) > /tmp/pr-diff.txt

# Show diff (for context)
git diff $MERGE_BASE $(git branch --show-current)
```

**What this does**:

- `git merge-base main feature` = Find last commit common to both branches
- `git diff merge-base HEAD` = Show all changes from common ancestor to current branch
- This gives a clean diff of only the new changes, not cherry-picked commits

**Alternative (if merge-base fails)**:

```bash
git diff main..$(git branch --show-current)
```

**Diff Analysis**:

- Count files: `git diff $MERGE_BASE --name-only | wc -l`
- Modified files: `git diff $MERGE_BASE --name-only`
- Added lines: `git diff $MERGE_BASE --stat`

**Examples**:

```
# Clean repository
$ git diff $(git merge-base main feature) feature
diff --git a/src/auth.ts b/src/auth.ts
new file mode 100644
index 0000000..abc1234
--- /dev/null
+++ b/src/auth.ts
@@ -0,0 +1,50 @@
+export class AuthService {
+  ...
+}

# With deletions and renames
$ git diff $(git merge-base main feature) feature
diff --git a/src/old-file.ts b/src/old-file.ts
deleted file mode 100644
...
diff --git a/src/utils.ts b/src/utils-refactored.ts
similarity index 85%
rename from src/utils.ts
to src/utils-refactored.ts
...
```

**Store in context**:

```markdown
### Git Diff

<complete_git_diff_output or path_to_diff_file>

### Diff Statistics

- Files changed: <number>
- Lines added: <number>
- Lines deleted: <number>
```

### Step 4: Extract Commit Messages

Get all commit messages from feature branch not in main:

```bash
# Get commits on feature branch not in main
git log --oneline $MAIN_BRANCH..$(git branch --show-current)

# Full commit messages (for context)
git log --pretty=format:"%h %s%n%b" $MAIN_BRANCH..$(git branch --show-current)

# Another format: full log
git log --format="%H%n%an%n%ae%n%ai%n%s%n%b%n---" $MAIN_BRANCH..$(git branch --show-current)
```

**Extract from output**:

- **Commit hashes**: Short refs (e.g., abc1234)
- **Commit subjects**: First line of message (e.g., "Add authentication")
- **Commit bodies**: Full description text

**Example output**:

```
abc1234 Add user authentication
def5678 Add login form component
ghi9012 Update API interceptor for token refresh
jkl3456 Add unit tests for auth service

---
Full commits:

abc1234
John Doe
john@example.com
2026-02-11 07:30:00 +0100

Add user authentication

Implement JWT-based authentication with refresh token support.
- Added AuthService with login/logout methods
- Tokens stored in httpOnly cookies
- Automatic token refresh on expiration

---
def5678
John Doe
john@example.com
2026-02-11 07:25:00 +0100

Add login form component
...
```

**Store in context**:

```markdown
### Commits

<list_of_commits>

### Commit Summary

- Commit 1: <subject>
- Commit 2: <subject>
- ...
```

### Step 5: Verify Commits Are Present

Safety check:

```bash
# Verify there are commits to push
COMMIT_COUNT=$(git rev-list --count $MAIN_BRANCH..$(git branch --show-current))

if [ $COMMIT_COUNT -eq 0 ]; then
  echo "⚠️ WARNING: No commits found between $MAIN_BRANCH and current branch!"
  echo "Make sure you're on the correct feature branch with commits."
  exit 1
fi

echo "✅ Found $COMMIT_COUNT commits on feature branch"
```

### Step 6: Get File Statistics

Analyze which files changed:

```bash
# Files added, modified, deleted
git diff $MAIN_BRANCH --name-status

# Show file changes with line counts
git diff $MAIN_BRANCH --stat

# Just the file names
git diff $MAIN_BRANCH --name-only

# Group by type (added/modified/deleted)
echo "=== Added Files ==="
git diff $MAIN_BRANCH --name-only --diff-filter=A

echo "=== Modified Files ==="
git diff $MAIN_BRANCH --name-only --diff-filter=M

echo "=== Deleted Files ==="
git diff $MAIN_BRANCH --name-only --diff-filter=D
```

**Store in context**:

```markdown
### Files Changed

- **Added**: X files
- **Modified**: Y files
- **Deleted**: Z files

### File List

<list_of_changed_files_with_type>
```

### Step 7: Update Context File

Append changes information to the context file:

```markdown
---

## Task 2: Get Changes

### Main Branch
<main_branch_name>

### Current Branch
<feature_branch_name>

### Commits
<list_of_commits_with_subjects>

### Files Changed
- **Added**: <count>
- **Modified**: <count>
- **Deleted**: <count>

### File List
<complete_list>

### Git Diff
\`\`\`diff
<git_diff_output>
\`\`\`

### Diff Statistics
- Files changed: <number>
- Lines added: <number>
- Lines deleted: <number>

---

## Task 2 Status: ✅ COMPLETED

Changes retrieved. Ready for Task 3.
```

## Error Handling

| Issue                        | Solution                                                                     |
| ---------------------------- | ---------------------------------------------------------------------------- |
| Main branch not found        | Ask user to specify main branch name                                         |
| No commits on feature branch | Ensure you're on correct branch; create test commit if needed                |
| Merge-base fails             | Use `git diff main..HEAD` as fallback                                        |
| Diff too large               | Focus on file summaries; include diff path in context instead of full output |
| Git not available            | Install Git and try again                                                    |
| Not in git repository        | Run from root of git repository                                              |

## Context File Update Example

**Before** (from Task 1):

```markdown
# PR Generation Context - Issue #42

## Issue Information

**Issue**: 42
**URL**: https://github.com/myorg/myrepo/issues/42
**Repository**: myorg/myrepo

### Issue Title

Add user authentication using JWT tokens

### Issue Description

Implement JWT-based authentication...

---

## Task 1 Status: ✅ COMPLETED
```

**After** (Task 2 appends):

```markdown
# PR Generation Context - Issue #42

## Issue Information

[... same as above ...]

---

## Task 2: Get Changes

### Main Branch

main

### Current Branch

feature/auth

### Commits

- abc1234 Add user authentication
- def5678 Add login form component
- ghi9012 Update API interceptor

### Files Changed

- **Added**: 5
- **Modified**: 3
- **Deleted**: 0

### File List

- src/auth/AuthService.ts (added)
- src/auth/LoginForm.tsx (added)
- src/api/interceptor.ts (modified)
- ...

### Diff Statistics

- Files changed: 8
- Lines added: 342
- Lines deleted: 12

---

## Task 2 Status: ✅ COMPLETED
```

## Handoff to Task 3

Once Task 2 is complete:

**Pass to Task 3 with**:

- Context file path
- Issue number
- Main branch name
- Feature branch name
- Git diff (or path to diff)
- File changes summary

**Prompt for Task 3**:

```
"Now analyze the modifications and verify alignment with issue #<number> objective. Context file: .copilot/pr-description-<issue_number>.md"
```

## References

- [GitHub Access Priority Order](../references/github-access-priority.md)
- Git Documentation: `git merge-base`, `git diff`, `git log`
- [Pro Git Book - Git Basics](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository)
