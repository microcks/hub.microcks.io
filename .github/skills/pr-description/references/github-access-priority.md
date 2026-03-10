# GitHub Access Priority Order

This document defines the priority order for accessing GitHub when reading issues or creating pull requests. Use this order to maximize compatibility and reliability.

## Priority Order (Highest to Lowest)

### 1. GitHub MCP Server (PRIORITY)

**When to use**: GitHub MCP server is available and configured

**Tools available**:

- `github/get_file_contents` - Read file contents from repository
- `github/search_repositories` - Search repositories
- `github/create_pull_request` - Create pull requests
- And other GitHub-related tools

**Advantages**:

- Native integration, best performance
- No additional CLI dependencies
- Token scoped to repository

**Disadvantage**: Requires MCP server to be available

**Example usage**:

```javascript
// Use MCP tool
github /
  get_file_contents({
    owner: 'owner-name',
    repo: 'repo-name',
    path: 'file-path',
  });

github /
  create_pull_request({
    owner: 'owner-name',
    repo: 'repo-name',
    title: 'PR title',
    body: 'PR description',
    head: 'feature-branch',
    base: 'main',
  });
```

---

### 2. GitHub CLI (`gh`)

**When to use**: MCP not available, but `gh` is installed and authenticated

**Commands**:

- `gh issue view <number>` - Read issue details
- `gh pr create` - Create pull request
- `gh pr list` - List pull requests
- `gh auth status` - Check authentication status

**Advantages**:

- Widely installed and used
- User-friendly, clear output
- Works in most environments

**Verification**:

```bash
gh --version
gh auth status
```

**Example usage**:

```bash
# Read issue
gh issue view 123 --json title,body,labels

# Create PR
gh pr create \
  --title "Fix user authentication bug" \
  --body "$(cat pr-description.md)" \
  --base main \
  --head feature/fix-auth

# Check authentication
gh auth status
```

**If not authenticated**:

```bash
gh auth login
```

---

### 3. GitHub REST API (FALLBACK)

**When to use**: Neither MCP nor `gh` available, but `GITHUB_TOKEN` environment variable is set

**Endpoints**:

- `GET /repos/{owner}/{repo}/issues/{issue_number}` - Read issue details
- `POST /repos/{owner}/{repo}/pulls` - Create pull request

**Advantages**:

- Always available with a valid token
- Works everywhere curl/http tools are available

**Requirements**:

- `GITHUB_TOKEN` environment variable must be set
- Token must have `repo` scope (read + write permissions)

**Verification**:

```bash
echo $GITHUB_TOKEN
# Should output your token
```

**Example usage**:

```bash
# Read issue
curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/owner/repo/issues/123 | jq .

# Create PR
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/owner/repo/pulls \
  -d '{
    "title": "PR title",
    "body": "PR description",
    "head": "feature-branch",
    "base": "main"
  }'
```

---

## Implementation Pattern

When accessing GitHub in a task, follow this pattern:

```markdown
## Accessing GitHub Content

Try these methods in order:

1. **Try GitHub MCP Server**
   - Check if MCP tools are available
   - Use `github/get_file_contents` or `github/create_pull_request`
   - If successful, return result

2. **Fall back to GitHub CLI (`gh`)**
   - Verify `gh` is installed: `gh --version`
   - Verify authentication: `gh auth status`
   - Use `gh issue view`, `gh pr create`, etc.
   - If successful, return result

3. **Fall back to GitHub REST API**
   - Verify token exists: `echo $GITHUB_TOKEN`
   - Use `curl` with Bearer token
   - Parse JSON response
   - Return result

4. **If all fail**
   - Inform user of failure reason
   - Ask for manual input or authentication
   - Do not proceed without confirmation
```

---

## Troubleshooting

| Issue                             | Solution                                              |
| --------------------------------- | ----------------------------------------------------- |
| "MCP server not available"        | Fall back to `gh` CLI or REST API                     |
| "`gh` not installed"              | Use `which gh` to verify; fall back to API            |
| "`gh` not authenticated"          | Run `gh auth login` and retry                         |
| "`GITHUB_TOKEN` not set"          | User must set token in environment                    |
| API call fails (401 Unauthorized) | Token is invalid or expired; ask user to authenticate |
| API call fails (403 Forbidden)    | Token lacks required scopes; check `repo` scope       |
| API call fails (404 Not Found)    | Issue/PR number incorrect or repository doesn't exist |

---

## Security Notes

- Never hardcode tokens in scripts or files
- Always use environment variables (`GITHUB_TOKEN`, `GITHUB_API_TOKEN`)
- Tokens should have minimal required scope (`repo` for read/write)
- Rotate tokens regularly
- If a token is exposed, regenerate it immediately in GitHub settings

---

## Environment Setup

### Set GitHub Token (for REST API fallback)

**Temporary** (current session only):

```bash
export GITHUB_TOKEN="ghp_your_token_here"
```

**Permanent** (add to shell profile):

```bash
# Add to ~/.bashrc, ~/.zshrc, or equivalent
export GITHUB_TOKEN="ghp_your_token_here"
```

**Using GitHub CLI** (recommended):

```bash
gh auth login
# Follows interactive prompt
# Token is securely stored by `gh`
```

---

## Related Documentation

- [GitHub MCP Server Tools](https://github.com/github/mcp-server-github)
- [GitHub CLI Documentation](https://cli.github.com/manual/)
- [GitHub REST API Reference](https://docs.github.com/en/rest)
- [Creating GitHub Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)
