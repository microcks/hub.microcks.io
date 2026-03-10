# Task 1: Get GitHub Issue

Retrieve GitHub issue information to determine the pull request objective. This task serves as the starting point for the PR generation workflow.

## Objectives

1. **Get GitHub issue link** from user or extract from context
2. **Read issue details** from GitHub (title, description, acceptance criteria, labels)
3. **Extract key information** for PR context
4. **Create/initialize context file** to share data with subsequent tasks
5. **Prepare for Task 2** by handing off with all issue information

## When to Use

This task is always the first step in the PR generation workflow. Activate it when:

- User wants to generate a PR description
- GitHub issue link is available or can be obtained from user

## Prerequisites

- Working git repository in current directory
- Optional: GitHub issue link (if not provided, will ask user)
- Optional: Authentication to GitHub (for reading private issues)

## Step-by-Step Workflow

### Step 1: Determine GitHub Issue Link

**If user provided issue link**: Extract and validate it

**If issue link not provided**: Ask user

```
Prompt: "What is the GitHub issue link for this PR? (e.g., https://github.com/owner/repo/issues/123 or just #123)"

Accepted formats:
- Full URL: https://github.com/owner/repo/issues/123
- Short format: #123
- Just number: 123
```

**Validate the issue link**:

- If full URL: Extract owner, repo, and issue number
- If short format (#123): Extract issue number, get owner/repo from git remote
- If just number: Use current repository and issue number

**Extracted information**:

- `issue_number`: Numeric ID (e.g., 123)
- `issue_url`: Full GitHub URL (e.g., https://github.com/owner/repo/issues/123)
- `repo_owner`: Repository owner name
- `repo_name`: Repository name

### Step 2: Read GitHub Issue Details

Follow the priority order from [GitHub Access Priority](../references/github-access-priority.md):

#### Method 1: Try GitHub MCP Server

```bash
# Use MCP tool to get issue details
# Tool: github/get_issue_details or similar
# Input: owner, repo, issue_number
# Output: title, body, labels, state, etc.
```

If successful: Parse and continue to **Step 3**

#### Method 2: Fall back to GitHub CLI (`gh`)

```bash
# Verify gh is installed and authenticated
gh --version
gh auth status

# Get issue details as JSON
gh issue view \
  \
  title,body,labels,state,createdAt,url < issue_number > --repo < owner > / < repo > --json
```

If successful: Parse JSON output and continue to **Step 3**

#### Method 3: Fall back to GitHub REST API

```bash
# Verify token is set
echo $GITHUB_TOKEN

# Fetch issue details
curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/<owner>/<repo>/issues/<issue_number> | jq .
```

If successful: Parse JSON and continue to **Step 3**

#### If all methods fail:

Inform user:

```
Could not read GitHub issue. Reasons might include:
- Invalid issue URL/number
- No authentication to private repository
- Network connectivity issue

Would you like to provide issue details manually?
```

### Step 3: Extract Issue Information

From the issue data, extract:

**Required**:

- `issue_title`: The issue title (e.g., "Add user authentication")
- `issue_description`: Full issue body/description
- `issue_number`: The issue number (e.g., 123)
- `repo_owner`: Repository owner
- `repo_name`: Repository name

**Optional but useful**:

- `issue_labels`: Array of labels (e.g., ["bug", "feature", "enhancement"])
- `issue_state`: Issue state (open/closed)
- `issue_url`: Full GitHub URL

**Extract from description**:

- `acceptance_criteria`: Look for sections like "Acceptance Criteria", "Requirements", "Definition of Done"
- If not explicitly marked, use full description as context

### Step 4: Determine Repository Details

If not already determined from issue URL:

```bash
# Get repository owner and name from git remote
git remote -v | grep origin | head -1 | awk '{print $2}' | sed 's/.*:\(.*\)\/\(.*\)\.git.*/\1 \2/'

# Or use git config
git config --get remote.origin.url
```

Extract:

- `repo_owner`: GitHub organization or user (e.g., "owner-name")
- `repo_name`: Repository name (e.g., "repo-name")

### Step 5: Create/Initialize Context File

Create a shared markdown file to accumulate data through all tasks:

**File path**: `.copilot/pr-description-<issue_number>.md`

**File structure**:

```markdown
# PR Generation Context - Issue #<issue_number>

## Issue Information

**Issue**: <issue_number>
**URL**: <issue_url>
**Repository**: <repo_owner>/<repo_name>

### Issue Title

<issue_title>

### Issue Description

<issue_description>

### Acceptance Criteria

<acceptance_criteria or full description>

### Labels

<list of labels with formatting>

---

## Task 1 Status: ✅ COMPLETED

Context initialized. Ready for Task 2.
```

**Example**:

```markdown
# PR Generation Context - Issue #42

## Issue Information

**Issue**: 42
**URL**: https://github.com/myorg/myrepo/issues/42
**Repository**: myorg/myrepo

### Issue Title

Add user authentication using JWT tokens

### Issue Description

Implement JWT-based authentication to enable secure API access and persistent user sessions. Users should be able to log in with email/password credentials and maintain authenticated sessions with automatic token refresh.

### Acceptance Criteria

- [ ] Users can log in with email and password
- [ ] JWT tokens are issued with 1-hour expiration
- [ ] Refresh tokens enable 7-day persistent sessions
- [ ] Tokens are stored securely (httpOnly cookies, no localStorage)
- [ ] Logout clears all tokens and sessions

### Labels

- `enhancement` (blue)
- `priority-high` (red)
- `auth` (cyan)

---

## Task 1 Status: ✅ COMPLETED

Context initialized. Ready for Task 2.
```

### Step 6: Verify and Summarize

Display to user what was found:

```
✅ GitHub Issue Retrieved

Issue #<number>: <title>
Repository: <owner>/<repo>

Description:
<first 2-3 lines of issue description>

Labels: <comma-separated labels>

Acceptance Criteria:
<bullet points or paragraph summary>

---
Context file created: .copilot/pr-description-<issue_number>.md
Ready to proceed to Task 2: Get Changes
```

## Error Handling

| Issue                    | Solution                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Issue not found (404)    | Verify issue number and repository; check permissions                                |
| Cannot authenticate      | Run `gh auth login` or set `GITHUB_TOKEN` environment variable                       |
| Invalid issue URL format | Ask user to provide correct format: #123 or https://github.com/owner/repo/issues/123 |
| Issue is closed          | Warn user but proceed (PRs can still reference closed issues)                        |
| No issue description     | Use issue title as context; ask user for additional context                          |
| Network timeout          | Retry up to 2 times; inform user if persistent                                       |

## Handoff to Task 2

Once Task 1 is complete:

**Pass to Task 2 with**:

- Issue number
- Issue title
- Issue description
- Issue labels
- Repository owner and name
- Path to context file

**Prompt for Task 2**:

```
"Now retrieve the git changes for issue #<number>. Generate diff, detect main branch, and extract commit messages. Context file: .copilot/pr-description-<issue_number>.md"
```

## Troubleshooting

**GitHub MCP server not available**:

- Verify MCP is configured in your environment
- Fall back to `gh` CLI or REST API

**`gh` command not found**:

- Install GitHub CLI: https://cli.github.com/
- Or use REST API with `GITHUB_TOKEN`

**`gh` not authenticated**:

- Run: `gh auth login`
- Interactively follow prompts

**Cannot read private issue**:

- Verify authentication with `gh auth status`
- Ensure token has `repo` scope
- Ask user to verify they have access

## References

- [GitHub Access Priority Order](../references/github-access-priority.md)
- [GitHub CLI Issue View](https://cli.github.com/manual/gh_issue_view)
- [GitHub REST API - Get Issue](https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28#get-an-issue)
