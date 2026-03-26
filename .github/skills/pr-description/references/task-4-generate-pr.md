# Task 4: Generate PR Description

Generate the complete pull request description by finding the PR template, filling all sections with the analysis from previous tasks, presenting for review, and creating the PR on GitHub.

## Objectives

1. **Find PR template** (project → org → bundled)
2. **Fill all template sections** with comprehensive information
3. **Generate PR title** from issue title or commits
4. **Present to user** for review before creation
5. **Create PR on GitHub** (using MCP → gh → API priority)
6. **Return PR URL** to user

## When to Use

Task 4 is the final step, invoked from Task 3 after changes are analyzed. It creates the actual pull request.

## Prerequisites

- Completed Task 1 (GitHub issue information)
- Completed Task 2 (Git changes retrieved)
- Completed Task 3 (Changes analyzed)
- Context file exists: `.copilot/pr-description-<id>.md`
- Repository owner and name known
- Feature branch ready to push

## Step-by-Step Workflow

### Step 1: Find PR Template

Search for the PR template in this order (per project specifications):

**Priority 1: Project PR Template**

```bash
# Check for project's .github/PULL_REQUEST_TEMPLATE.md
if [ -f ".github/PULL_REQUEST_TEMPLATE.md" ]; then
  echo "✅ Found project PR template"
  PR_TEMPLATE_PATH=".github/PULL_REQUEST_TEMPLATE.md"
fi
```

Expected location: `.github/PULL_REQUEST_TEMPLATE.md` in the repository root

**Priority 2: Organization Default Template**

If project template not found, check org's default template:

```bash
# Get repository owner
REPO_OWNER=$(git config --get remote.origin.url | sed 's/.*:\([^/]*\)\/.*/\1/')

# Check org's .github repository
# URL: https://github.com/<org>/.github/blob/main/PULL_REQUEST_TEMPLATE.md
# This requires reading from GitHub
```

Using GitHub API:

```bash
# Read org PR template
curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/$REPO_OWNER/.github/contents/PULL_REQUEST_TEMPLATE.md \
  | jq -r '.content' | base64 -d > /tmp/org-pr-template.md
```

**Priority 3: Bundled Fallback Template**

If neither found, use the skill's bundled template:

```bash
PR_TEMPLATE_PATH="./template/PULL_REQUEST_TEMPLATE.md"
```

Expected location: `.github/skills/pr-description/template/PULL_REQUEST_TEMPLATE.md`

**Template Detection Logic**:

```bash
find_pr_template() {
  # Try project template
  if [ -f ".github/PULL_REQUEST_TEMPLATE.md" ]; then
    echo ".github/PULL_REQUEST_TEMPLATE.md"
    return 0
  fi

  # Try org template (requires GitHub access)
  REPO_OWNER=$(git config --get remote.origin.url | sed 's/.*:\([^/]*\)\/.*\.git/\1/')
  if try_read_org_template "$REPO_OWNER"; then
    return 0
  fi

  # Fall back to bundled template
  echo "./template/PULL_REQUEST_TEMPLATE.md"
  return 0
}

PR_TEMPLATE=$(find_pr_template)
echo "Using PR template: $PR_TEMPLATE"
```

**Store in context**:

```markdown
### PR Template Used

- Source: <project|org|bundled>
- Path: <path_to_template>
```

### Step 2: Generate PR Title

Create a descriptive PR title:

**Source 1: GitHub Issue Title** (preferred)

```
Use the issue title directly if it's descriptive enough

Example:
Issue: "Add user authentication using JWT tokens"
PR Title: "Add user authentication using JWT tokens"
```

**Source 2: Commit Summary** (fallback)

```
Use first commit message if issue title too generic

First commit: "Add user authentication"
PR Title: "Add user authentication"
```

**Source 3: Generated** (if both unclear)

```
Generate from change analysis

Changes: New feature, auth service
Generated: "Add authentication service implementation"
```

**Title Format Rules**:

- Start with action verb: Add, Fix, Update, Refactor, Improve
- Be specific about what changed
- Keep under 72 characters (GitHub standard)
- Follow conventional commits: `type(scope): message`

**Example**:

```
Good titles:
- "Add JWT authentication service"
- "Fix user session timeout bug"
- "Refactor authentication interceptor"
- "feat(auth): implement JWT refresh token rotation"

Bad titles:
- "Changes"
- "Update"
- "Fixed stuff"
- "New feature implementation #42"
```

**Store in context**:

```markdown
### PR Title

<generated_pr_title>
```

### Step 3: Fill Template Sections

For each section in the PR template, fill with comprehensive information:

#### Section: Description

**Format**:

- Start with verb: "Add", "Fix", "Update"
- Explain what changed and why
- Reference issue objective
- Keep to 3-4 sentences

**Content**:

```markdown
## Description

Add user authentication using JWT tokens and refresh token rotation. This enables secure API access and persistent user sessions. Users can now log in with email/password credentials and maintain authenticated sessions with automatic token refresh.
```

**Data sources**:

- Issue objective (from Task 1)
- Key changes (from Task 3)
- Architecture impact (from Task 3)

#### Section: Related Issue

**Format**:

```markdown
## Related Issue

Closes #<issue_number>
```

**Data source**: Issue number from Task 1

#### Section: Type of Change

**Format**: Check boxes matching analysis

```markdown
## Type of Change

- [ ] 🐛 Bug fix (non-breaking change which fixes an issue)
- [x] ✨ New feature (non-breaking change which adds functionality)
- [ ] 💥 Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] 🔨 Refactoring (code change that neither fixes a bug nor adds a feature)
- [ ] 📝 Documentation update
- [ ] 🧪 Test update
- [x] 🎨 UI/UX change
- [ ] ⚡ Performance improvement
- [ ] ♿ Accessibility improvement
```

**Data source**: Change types from Task 3

#### Section: Changes Made

**Format**: Bullet points of major changes

```markdown
## Changes Made

- Implement JWT authentication service with token refresh logic
- Add LoginForm component with email/password validation
- Create secure API interceptor for automatic token refresh
- Add user session state management with React Context
- Implement protected route wrapper for authenticated pages
- Add "Remember me" functionality with secure token storage
```

**Data source**: Key changes from Task 3

#### Section: Architecture Layer(s) Affected

**Format**: Check boxes for affected layers

```markdown
## Architecture Layer(s) Affected

- [ ] Domain (entities, value objects, domain logic)
- [x] Application (use cases, ports/interfaces)
- [x] Infrastructure (repositories, adapters, external services)
- [x] Presentation (UI components, views, controllers)
```

**Data source**: Architecture layers from Task 3

#### Section: Testing

**Format**:

- Test coverage checklist
- Manual testing steps

```markdown
## Testing

### Test Coverage

- [x] Unit tests added for AuthService and token refresh logic
- [x] Integration tests for login/logout flows
- [x] Component tests for LoginForm with validation
- [ ] E2E tests for complete authentication flow

### Manual Testing

1. Navigate to /login page
2. Enter valid credentials
3. Verify successful login and redirect
4. Refresh page and verify session persists
5. Log out and verify session cleared
6. Test invalid credentials error message
```

**Data source**:

- Test coverage from Task 3
- Git diff analysis (test files present)
- Commit messages (testing references)

#### Section: Accessibility (if UI changes)

**Format**: Checklist of accessibility items

```markdown
## Accessibility

- [x] Keyboard navigation tested (Tab, Enter, Escape)
- [x] Screen reader tested with VoiceOver
- [x] WCAG AA contrast verified (4.5:1 minimum)
- [x] Touch targets >= 44x44px
- [x] ARIA labels added for interactive elements
```

**Condition**: Only if PR includes UI/component changes

**Data source**: Diff analysis, accessibility improvements from Task 3

#### Section: Screenshots/Videos (if UI changes)

**Format**:

```markdown
## Screenshots / Videos

### Before

<!-- No login functionality existed -->

### After

<!-- Screenshot of login form -->
```

**Condition**: Only if PR includes UI/UX changes

**Note**: Placeholder for user to add later

#### Section: Browser/Device Testing (if UI changes)

**Format**: Tested environments checklist

```markdown
## Browser/Device Testing

- [x] Chrome (Desktop) - v120
- [x] Firefox (Desktop) - v121
- [x] Safari (Desktop) - v17
- [x] Mobile Safari (iOS 17)
- [x] Mobile Chrome (Android 14)
```

**Condition**: Only if PR includes UI/UX changes

#### Section: Performance Impact

**Format**:

```markdown
## Performance Impact

- [x] No significant performance impact
- [ ] Performance improved
- [ ] Performance regression

Initial page load increased by ~15KB (gzipped) due to auth library.
```

**Data source**:

- Diff analysis (new dependencies?)
- Architecture changes (added layers?)
- Estimated impact from changes

#### Section: Breaking Changes

**Format**:

```markdown
## Breaking Changes

- [x] No breaking changes
- [ ] Breaking changes (describe below)

If breaking changes exist, detail migration steps for users/developers.
```

**Data source**: Breaking changes analysis from Task 3

#### Section: Checklist

**Format**: Standard quality checks

```markdown
## Checklist

- [x] Code follows the project's style guidelines
- [x] Self-review of code performed
- [x] Comments added for complex logic
- [x] Documentation updated
- [x] No new warnings or errors introduced
- [ ] Tests added or updated
- [ ] Dependent changes merged (if applicable)
```

**Note**: Generic checklist, user may need to verify

#### Section: Additional Notes

**Format**: Free-form context for reviewers

**✅ INCLUDE (useful context)**:

```markdown
## Additional Notes

- Backend API must support JWT refresh tokens
- Token expiration: 1 hour, refresh token valid 7 days
- Security: tokens stored in httpOnly cookies
- Consider adding 2FA in future iteration

**Alignment Verification**: ✅ All acceptance criteria from issue #42 implemented.
```

**Data source**:

- Alignment verdict from Task 3
- Technical decisions requiring reviewer awareness
- Migration notes or deployment steps
- Security/performance considerations

**⚠️ DO NOT include (redundant or internal data)**:

```markdown
## Additional Notes

❌ BAD - Do NOT write this:

- Commits: 2 (023f5dd, 0c389d1)
- Files changed: 7 files (2515 insertions, 471 deletions)
- Context file created: .copilot/pr-description-1234.md

✅ GOOD - Write this instead:

- Breaking change: API endpoint `/users` renamed to `/accounts`
- Migration: Run `npm run migrate:users` before deployment
- Alignment: ✅ All requirements from issue #42 implemented
```

**Explicit prohibitions**:

- ❌ **NO commit list or commit hashes** (already visible in git history)
- ❌ **NO file counts or insertion/deletion stats** (already in Files tab)
- ❌ **NO context file path** `.copilot/pr-description-*.md` (internal workflow file)
- ❌ **NO full diff** (reviewers can see in Files tab)
- ❌ **NO duplicate info** already in other sections

### Step 4: Complete All Sections

Create the full PR description by combining:

1. Template structure
2. Filled sections with data from Tasks 1-3
3. Proper markdown formatting
4. Accessibility compliance (WCAG)

**Final PR description structure**:

```markdown
# [PR Title]

## Description

[description]

## Related Issue

[issue number]

## Type of Change

[checked boxes]

## Changes Made

[bullet list]

## Architecture Layer(s) Affected

[checked boxes]

## Testing

[test info]

## Accessibility

[if UI changes]

## Screenshots / Videos

[if UI changes]

## Browser/Device Testing

[if UI changes]

## Performance Impact

[performance assessment]

## Breaking Changes

[if applicable]

## Checklist

[standard checks]

## Additional Notes

[reviewer context]
```

### Step 5: Present to User for Review

Display the generated PR description:

```markdown
✅ PR Description Generated

---

[FULL PR DESCRIPTION]

---

Review the description above. Does everything look correct?
Would you like me to create this pull request on GitHub now?

Options:

1. Yes, create the PR
2. No, show me the text for manual creation
3. Edit specific section (describe which)
```

**Allow user to**:

- Review the complete description
- Request edits to specific sections
- Confirm creation or request manual options

### Step 6: Create Pull Request on GitHub

After user confirms, create the PR using priority order from [GitHub Access Priority](../references/github-access-priority.md):

#### Method 1: GitHub MCP Server

```javascript
// Use GitHub MCP create_pull_request tool
create_pull_request({
  owner: 'repository-owner',
  repo: 'repository-name',
  title: 'PR title from issue',
  body: 'Complete PR description',
  head: 'feature-branch-name',
  base: 'main-branch',
});
```

**Check for success**:

- Look for PR number and URL in response
- If successful, proceed to **Step 7**
- If fails, fall back to **Method 2**

#### Method 2: GitHub CLI (`gh`)

```bash
# Create PR using gh CLI
gh pr create \
  --title "PR title" \
  --body "$(cat /tmp/pr-description.md)" \
  --base main \
  --head feature-branch \
  --repo owner/repo

# Output example:
# https://github.com/owner/repo/pull/456
```

**Verification**:

```bash
# Verify gh is installed
gh --version

# Verify authentication
gh auth status
```

**Check for success**:

- Look for PR URL in output (https://github.com/.../pull/NNN)
- If successful, proceed to **Step 7**
- If fails, fall back to **Method 3**

#### Method 3: GitHub REST API

```bash
# Save PR description to file
cat > /tmp/pr-description.json << EOF
{
  "title": "PR title",
  "body": "Complete PR description",
  "head": "feature-branch",
  "base": "main"
}
EOF

# Create PR via API
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/repos/OWNER/REPO/pulls \
  -d @/tmp/pr-description.json

# Output example:
# {
#   "id": 123456789,
#   "number": 456,
#   "html_url": "https://github.com/owner/repo/pull/456",
#   ...
# }
```

**Verification**:

```bash
# Verify token is set
echo $GITHUB_TOKEN

# Check token permissions
curl -s -H "Authorization: Bearer $GITHUB_TOKEN" \
  https://api.github.com/user | jq .
```

**Check for success**:

- Look for `html_url` in JSON response
- Extract PR number and URL
- If successful, proceed to **Step 7**
- If all fail, inform user and provide manual option

### Step 7: Return PR URL

Display success message with PR details:

```markdown
✅ Pull Request Created!

PR #<number>: <title>
URL: https://github.com/<owner>/<repo>/pull/<number>

The PR has been created and is ready for review.
```

**Store in context**:

```markdown
### PR Creation Result

- Status: ✅ SUCCESS
- PR Number: #<number>
- PR URL: https://github.com/<owner>/<repo>/pull/<number>
- Created at: <timestamp>
```

### Step 8: If Creation Fails

If all methods fail:

```markdown
❌ Could not create pull request automatically

Reason: [specific error message]

You can create the PR manually:

1. Go to: https://github.com/<owner>/<repo>
2. Click "New Pull Request"
3. Select base: main, compare: feature-branch
4. Copy and paste the description below:

---

[FULL PR DESCRIPTION TEXT]

---
```

Provide the description text for manual creation.

## Error Handling

| Issue                                | Solution                                           |
| ------------------------------------ | -------------------------------------------------- |
| PR template not found                | Use bundled fallback template                      |
| MCP server unavailable               | Fall back to `gh` CLI or API                       |
| `gh` not installed                   | Use REST API with GITHUB_TOKEN                     |
| `gh` not authenticated               | Run `gh auth login`                                |
| GITHUB_TOKEN not set                 | Inform user and use manual option                  |
| API returns 401 Unauthorized         | Token invalid/expired; ask user to re-authenticate |
| API returns 403 Forbidden            | Token lacks `repo` scope                           |
| API returns 422 Unprocessable Entity | PR might already exist or branch invalid           |
| Network timeout                      | Retry up to 2 times; offer manual option           |

## Complete Workflow Example

**User flow**:

1. Skill loads with user request: "Generate a PR"
2. Task 1 gets issue #42 details
3. Task 2 retrieves git diff
4. Task 3 analyzes changes
5. Task 4 generates PR description and displays it
6. User reviews and confirms
7. PR created on GitHub: `https://github.com/myorg/myrepo/pull/456`

**Context file progression**:

- After Task 1: Issue info added
- After Task 2: Changes info added
- After Task 3: Analysis results added
- After Task 4: PR creation result added

## Final Context File Example

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

## Task 2: Get Changes

### Main Branch

main

### Commits

- abc1234 Add user authentication
- def5678 Add login form

---

## Task 3: Analyze Changes

### Change Type(s)

- [x] New Feature

### Alignment Verification

**Verdict**: ✅ FULLY ALIGNED

---

## Task 4: Generate PR

### PR Title

Add user authentication using JWT tokens

### PR Description

[FULL PR DESCRIPTION]

### PR Creation Result

- Status: ✅ SUCCESS
- PR Number: #456
- PR URL: https://github.com/myorg/myrepo/pull/456
- Created at: 2026-02-11T07:30:00Z

---

## Workflow Status: ✅ COMPLETED
```

## References

- [GitHub Access Priority Order](../references/github-access-priority.md)
- [GitHub CLI PR Create](https://cli.github.com/manual/gh_pr_create)
- [GitHub REST API - Create Pull Request](https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request)
- Project PR Template: `.github/PULL_REQUEST_TEMPLATE.md`
- [Conventional Commits](https://www.conventionalcommits.org/)
