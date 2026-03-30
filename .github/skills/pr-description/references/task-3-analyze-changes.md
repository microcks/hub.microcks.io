# Task 3: Analyze Changes

Analyze the git modifications and verify that they align with the GitHub issue objective. This task identifies the type of changes, affected architecture layers, and any potential scope misalignment.

## Objectives

1. **Analyze change types** (bug fix, feature, refactoring, etc.)
2. **Identify architecture layers** affected (domain, application, infrastructure, presentation)
3. **Verify alignment** with GitHub issue objective
4. **Detect scope issues** (scope creep, missing features, unexpected changes)
5. **Update context file** with analysis
6. **Prepare for Task 4** with all analysis results

## When to Use

Task 3 is invoked from Task 2 after git changes are retrieved. It analyzes the diff against the issue objective.

## Prerequisites

- Completed Task 1 (GitHub issue information)
- Completed Task 2 (Git changes retrieved)
- Context file exists: `.copilot/pr-description-<id>.md`
- Knowledge of project architecture (Clean Architecture layers)

## Step-by-Step Workflow

### Step 1: Identify Type of Change

Analyze the git diff to determine the type of change:

**Possible types** (based on issue labels + diff analysis):

1. **🐛 Bug Fix** (non-breaking change that fixes an issue)
   - Indicators: Issue labeled "bug", error handling, bug reproduction steps
   - Diff shows: Small targeted changes, usually in single component/function
   - Example: Fixing authentication timeout, correcting validation logic

2. **✨ New Feature** (non-breaking change that adds functionality)
   - Indicators: Issue labeled "feature" or "enhancement", new files/classes
   - Diff shows: New files, new methods, new routes/endpoints
   - Example: Adding JWT authentication, new UI component, new API endpoint

3. **💥 Breaking Change** (fix or feature causing existing functionality to break)
   - Indicators: Issue labeled "breaking-change", API signature changes
   - Diff shows: Removed/renamed public methods, removed routes/endpoints
   - Example: Changing function signature, removing deprecated API

4. **🔨 Refactoring** (code change that doesn't fix bug or add feature)
   - Indicators: No issue description about functionality, code improvement focus
   - Diff shows: File renames, code reorganization, method extraction
   - Example: Extracting utility functions, renaming classes, code cleanup

5. **📝 Documentation Update**
   - Indicators: Only markdown/doc files changed
   - Diff shows: Only .md files, README, contributing guidelines
   - Example: Adding API documentation, updating README

6. **🧪 Test Update**
   - Indicators: Only test files added/modified
   - Diff shows: Only test files in **tests**, .test.ts, .spec.ts
   - Example: Improving test coverage, adding E2E tests

7. **🎨 UI/UX Change**
   - Indicators: Component files, styling files changed
   - Diff shows: .tsx/.jsx files, CSS/SCSS files modified
   - Example: New button component, styling improvements

8. **⚡ Performance Improvement**
   - Indicators: Memoization, caching, optimization techniques
   - Diff shows: useMemo, useCallback, React.memo, algorithm optimization
   - Example: Memoizing expensive computation, reducing render calls

9. **♿ Accessibility Improvement**
   - Indicators: ARIA attributes, semantic HTML, keyboard navigation
   - Diff shows: aria-_, role=_, keyboard event handlers
   - Example: Adding aria-labels, improving screen reader support

**Detection logic**:

```
if issue_has_label("bug") OR diff_shows_error_handling:
  type = "Bug Fix"
else if issue_has_label("feature") OR diff_shows_new_files:
  type = "New Feature"
else if issue_has_label("breaking-change") OR diff_shows_removed_methods:
  type = "Breaking Change"
else if diff_only_has_refactored_code:
  type = "Refactoring"
else if diff_only_has_markdown:
  type = "Documentation"
else if diff_only_has_test_files:
  type = "Test Update"
else if diff_has_component_or_style_files:
  type = "UI/UX Change"
else if diff_shows_optimization:
  type = "Performance Improvement"
else if diff_has_accessibility_changes:
  type = "Accessibility Improvement"
```

**Store in context**:

```markdown
### Change Type(s)

- [x] Bug Fix
- [ ] Feature
- [ ] Breaking Change
- [ ] Refactoring
- [ ] Documentation
- [ ] Tests
- [ ] UI/UX
- [ ] Performance
- [ ] Accessibility
```

### Step 2: Identify Architecture Layers Affected

Using Clean Architecture principles, identify which layers are affected:

**Domain Layer** (entities, value objects, business logic):

- Indicators: Files in domain/, entities/, aggregates/, value-objects/
- Changes affect: Business rules, domain logic, invariants
- Example: Creating User aggregate, adding business validation

**Application Layer** (use cases, ports/interfaces, DTOs):

- Indicators: Files in application/, use-cases/, services/
- Changes affect: Orchestration, use case logic, application flow
- Example: Creating authentication use case, implementing ports

**Infrastructure Layer** (repositories, adapters, external services):

- Indicators: Files in infrastructure/, repositories/, adapters/
- Changes affect: Database access, external API calls, implementation details
- Example: Creating UserRepository, implementing EmailService adapter

**Presentation Layer** (UI components, views, controllers):

- Indicators: Files in presentation/, ui/, components/, pages/
- Changes affect: User interface, routing, UI state management
- Example: Creating LoginForm component, adding route

**Detection logic**:

```
for each changed_file:
  if file_path contains "domain" or "entities" or "aggregates":
    affected_layers.add("Domain")
  if file_path contains "application" or "use-cases" or "services" or "ports":
    affected_layers.add("Application")
  if file_path contains "infrastructure" or "repositories" or "adapters":
    affected_layers.add("Infrastructure")
  if file_path contains "presentation" or "ui" or "components" or "pages" or "views":
    affected_layers.add("Presentation")
```

**Store in context**:

```markdown
### Architecture Layers Affected

- [ ] Domain (entities, value objects, business logic)
- [x] Application (use cases, ports/interfaces)
- [x] Infrastructure (repositories, adapters, external services)
- [x] Presentation (UI components, views, controllers)

### Layer Details

**Application**: Created AuthService use case, implemented login flow
**Infrastructure**: Added JWT token repository, implemented refresh token adapter
**Presentation**: Created LoginForm and LogoutButton components
```

### Step 3: Verify Alignment with Issue Objective

Compare the issue objective/acceptance criteria with actual changes:

**Issue Objective** (from Task 1 context):

- Title: What was supposed to be built
- Description: Why it matters
- Acceptance criteria: What defines "done"
- Labels: Type of work

**Actual changes** (from Task 2 context):

- Files changed: What was actually modified
- Commits: Summary of work done
- Diff content: Detailed changes

**Alignment check**:

**✅ Fully Aligned**:

- All acceptance criteria addressed in changes
- No unexpected modifications
- Scope matches issue description
- Result: User can proceed confidently

**⚠️ Partially Aligned**:

- Some acceptance criteria addressed, but not all
- Additional features beyond issue scope (scope creep)
- Some expected changes missing
- Result: Document differences, ask user to confirm

**❌ Misaligned**:

- Changes do NOT address issue objective
- Completely different scope
- Critical acceptance criteria not implemented
- Result: Warn user, suggest reviewing changes

**Verification steps**:

1. **Extract acceptance criteria** from issue:

   ```
   Issue has acceptance criteria:
   - [ ] Feature 1
   - [ ] Feature 2
   - [ ] Feature 3
   ```

2. **Check each criterion** against changes:

   ```
   Feature 1:
     - Mentioned in commits? YES
     - Files changed for it? YES (3 files)
     - Fully implemented? YES ✅

   Feature 2:
     - Mentioned in commits? NO
     - Files changed for it? NO
     - Fully implemented? NO ❌
   ```

3. **Detect scope creep**:

   ```
   Issue scope: Authentication
   Changes include:
   - JWT authentication ✅ (in scope)
   - Refresh token rotation ✅ (in scope)
   - 2FA implementation ⚠️ (out of scope)
   - Permission system ❌ (out of scope)
   ```

4. **Summarize alignment**:
   ```
   ✅ All core acceptance criteria addressed
   ⚠️ Additional features: [list]
   ❌ Missing features: [list]
   ```

**Store in context**:

```markdown
### Alignment Verification

**Issue Objective**: Add user authentication using JWT tokens

**Acceptance Criteria Coverage**:

- [x] Users can log in with email/password
- [x] JWT tokens issued with 1-hour expiration
- [x] Refresh tokens for 7-day sessions
- [x] Tokens stored in httpOnly cookies
- [ ] ~~Logout clears sessions~~ (Note: Not fully in changes)

**Additional Changes (Scope Creep)**:

- "Remember me" checkbox functionality (not in issue)

**Verdict**: ⚠️ PARTIALLY ALIGNED

- Core authentication implemented
- One acceptance criterion incomplete
- Additional UX feature added (acceptable)

**Recommendation**: User should verify "Remember me" is acceptable addition
```

### Step 4: Identify Key Changes

Extract the most important modifications for PR description:

**Key changes** are those that:

- Implement major acceptance criteria
- Significantly impact user experience
- Add/remove major functionality
- Change system architecture

**Extraction method**:

```
for each file in changes:
  if file is NEW or file_has_LARGE_diff:
    extract file_purpose and key_additions
  if file is MODIFIED:
    extract key_modifications
  if file is DELETED:
    extract deleted_functionality
```

**Example extraction**:

```
Key Changes:
1. **AuthService.ts** (new, 50 lines)
   - Implements JWT-based login/logout
   - Handles token refresh automatically
   - Securely stores tokens in httpOnly cookies

2. **LoginForm.tsx** (new, 80 lines)
   - User-friendly login form
   - Email and password validation
   - Error message display with accessibility

3. **API interceptor** (modified, +30 lines)
   - Automatic token refresh on 401
   - Transparent to consumers

4. **Session state** (new, 30 lines)
   - React Context for authenticated user
   - Single source of truth for session
```

**Store in context**:

```markdown
### Key Changes

1. <change_1>
2. <change_2>
3. <change_3>
```

### Step 5: Analyze Testing Requirements

Determine what tests should be present:

**Test types** to look for:

- Unit tests: Individual functions/methods
- Integration tests: Multiple components together
- Component tests: React components
- E2E tests: Full user workflows
- Manual testing: User actions

**Analysis**:

```
for each changed_file:
  if is_domain_logic:
    should_have_unit_tests
  if is_service:
    should_have_unit_and_integration_tests
  if is_component:
    should_have_component_tests
  if is_public_api:
    should_have_integration_tests
```

**Store in context**:

```markdown
### Test Coverage Assessment

- [x] Unit tests for AuthService
- [x] Integration tests for login flow
- [x] Component tests for LoginForm
- [ ] E2E tests for complete auth workflow
- [ ] Manual testing steps documented

### Test Summary

AuthService has comprehensive unit tests covering:

- Login success/failure cases
- Token refresh logic
- Session persistence

LoginForm has component tests for:

- Form submission
- Validation
- Error display
```

### Step 6: Update Context File

Append analysis to the context file:

```markdown
---

## Task 3: Analyze Changes

### Change Type(s)
- [x] New Feature
- [ ] Bug Fix
- [ ] Breaking Change
- [ ] Refactoring

### Architecture Layers Affected
- [x] Application
- [x] Infrastructure
- [x] Presentation

### Key Changes
1. AuthService with JWT authentication
2. LoginForm component with validation
3. API token refresh interceptor

### Alignment Verification
**Verdict**: ✅ FULLY ALIGNED
- All acceptance criteria addressed
- No critical missing features
- No unexpected scope creep

### Test Coverage
- [x] Unit tests present
- [x] Integration tests present
- [x] Component tests present

---

## Task 3 Status: ✅ COMPLETED

Analysis complete. Ready for Task 4.
```

## Error Handling

| Issue                         | Solution                                                |
| ----------------------------- | ------------------------------------------------------- |
| Cannot determine change type  | Ask user or classify based on most prominent change     |
| Unclear if aligned with issue | Document specific mismatches; ask user for confirmation |
| Multiple change types         | Check all applicable boxes; indicate primary type       |
| No test files found           | Note in context; ask user if tests were added manually  |
| Missing critical feature      | Warn user before proceeding to Task 4                   |

## Handoff to Task 4

Once Task 3 is complete:

**Pass to Task 4 with**:

- Context file path
- Issue number
- Change type(s)
- Architecture layers
- Alignment verdict
- Key changes summary
- Test coverage assessment

**Prompt for Task 4**:

```
"Now generate the PR description. Find the PR template, fill all sections with the analysis results, display for review, and create the PR. Context file: .copilot/pr-description-<issue_number>.md"
```

## References

- Clean Architecture: Domain, Application, Infrastructure, Presentation layers
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- Project structure documentation: `project-context.md`
