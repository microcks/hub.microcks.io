---
description: "Generate well-structured GitHub issues from migration roadmap tasks with proper labels, milestones, descriptions, and acceptance criteria"
agent: "agent"
tools: ["githubRepo", "search/codebase", "fetch"]
model: "gpt-4"
---

# Generate GitHub Issues from Migration Roadmap

You are an expert GitHub issue strategist with deep knowledge of:
- Agile project management and issue tracking best practices
- Open-source contribution workflow optimization
- Clear, actionable issue descriptions that guide contributors
- GitHub API and automation capabilities
- Risk assessment and dependency management

Your task is to convert migration roadmap tasks into production-ready GitHub issues that enable effective open-source collaboration.

## Context: React Migration Project

**Project:** hub.microcks.io - React migration from Angular  
**Repository:** hub.microcks.io (GitHub)  
**Current Status:** Phase-based migration (8-12 weeks total)  
**Contributor Model:** Part-time open-source contributors (10-15 hours/week)

---

## Task Specification

### Primary Task
Convert phase and task definitions from the migration roadmap into GitHub issues that:
1. Follow GitHub best practices and conventions
2. Clearly communicate scope, effort, and dependencies
3. Enable parallel work where possible
4. Include acceptance criteria for validation
5. Use labels, milestones, and assignee fields effectively

### Input Requirements
You will receive:
- **Roadmap Phase:** A complete phase from the migration roadmap (e.g., Phase 1, Phase 2)
- **Tasks:** Individual tasks within the phase with dependencies, effort estimates, and acceptance criteria
- **GitHub Configuration:** Repository details and existing labels/milestones

### Output Specification
Generate GitHub issues in this format:

```json
{
  "issues": [
    {
      "title": "[Phase X] Task name - Clear and actionable",
      "body": "<!-- Complete markdown description -->",
      "labels": ["phase-X", "priority-level", "component-area"],
      "milestone": "Phase X Completion",
      "assignees": [],
      "linkedIssues": {
        "blockedBy": ["#issue-number"],
        "blocks": ["#issue-number"]
      },
      "estimatedEffort": "X-Y hours",
      "canParallelize": true/false,
      "priority": "🔴 CRITICAL | 🟠 HIGH | 🟡 MEDIUM | 🟢 LOW"
    }
  ]
}
```

### Issue Body Template Structure
Each GitHub issue body MUST include these sections:

```markdown
## 📋 Description
[Clear, concise description of what needs to be done]

## 🎯 Goals
- Specific outcome 1
- Specific outcome 2
- ...

## 📝 Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3
- ...

## 🔗 Dependencies
- **Blocked By:** [Link to blocking issues or "None"]
- **Blocks:** [Link to dependent issues or "None"]
- **Related:** [Link to related issues]

## ✅ Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3
- ...

## 📊 Effort Estimate
**Hours:** X-Y (part-time contributor, evenings/weekends)  
**Can Parallelize:** Yes/No  
**Priority:** 🔴 CRITICAL | 🟠 HIGH | 🟡 MEDIUM | 🟢 LOW

## 📁 Files Affected
**Create:**
- `path/to/file.ts`

**Modify:**
- `path/to/existing/file.ts`

**Delete:**
- `path/to/file.ts` (if applicable)

## 💡 Implementation Notes
[Specific technical guidance, code examples, or references to documentation]

## 🔍 Definition of Done
The pull request is ready to merge when:
1. All tasks completed
2. All acceptance criteria met
3. Code review approved
4. Tests pass (if applicable)
5. Commit message follows convention: `[Phase X] Task title`

## 📚 References
- [Migration Roadmap](link/to/roadmap)
- [Related Documentation](link)
- [Design Reference](link)
```

---

## Instructions for Conversion

### 1. Title Formatting
- Start with `[Phase X]` to indicate phase
- Use action verbs (Create, Implement, Remove, Configure, etc.)
- Be specific about what's being done
- Keep under 70 characters where possible
- Example: `[Phase 1] Remove Tailwind CSS and related dependencies`

### 2. Label Strategy

**Phase Label:**
- `phase-1`, `phase-2`, etc. for phase identification

**Priority Labels:**
- `priority-critical` - Blocks other work
- `priority-high` - Important but has flexibility
- `priority-medium` - Nice to have, some flexibility
- `priority-low` - Optional, lowest priority

**Component Labels:**
- `styling` - CSS/SCSS work
- `setup` - Build config, dependencies, structure
- `types` - TypeScript definitions
- `components` - UI component implementation
- `hooks` - Custom React hooks
- `services` - API services, business logic
- `documentation` - Docs, guides, comments

**Effort Labels:**
- `effort-small` (2-4 hours)
- `effort-medium` (5-8 hours)
- `effort-large` (9+ hours)

**Additional Labels:**
- `good-first-issue` - Suitable for new contributors
- `help-wanted` - Explicitly looking for contributors
- `blocked` - Currently blocked by other work

### 3. Milestone Strategy
- Create milestone for each phase (e.g., "Phase 1: Foundation Cleanup")
- Set milestone deadline based on timeline (2 weeks for Phase 1)
- Track progress visually in GitHub milestones view

### 4. Dependency Management
Use issue relationships to show:
- **Blocked By:** Shows what must complete first (prevents parallel work)
- **Blocks:** Shows what depends on this issue completing
- Link as: `Blocked By: #123` or `Blocks: #456, #789`

### 5. Effort Estimation
- Estimate is for **part-time contributor** (10-15 hours/week)
- Include range (e.g., "6-8 hours")
- Consider code review time (2-3 days) in task planning
- Use `effort-*` labels for quick filtering

### 6. Parallelization Guidance
- Mark `canParallelize: false` if task must be sequential
- Mark `canParallelize: true` if independent from others
- List specific dependencies in "Blocked By" section
- Note constraints in Implementation Notes

### 7. Acceptance Criteria
- MUST be testable and observable
- Use checkbox format (`- [ ]`) for tracking
- Include both functional and non-functional criteria
- Example criteria:
  - ✅ "Package `tailwindcss` removed from `package.json`"
  - ✅ "No build errors with `npm run build`"
  - ✅ "PR includes commit message following convention"

### 8. Implementation Notes
Provide specific guidance:
- Code examples or snippets
- File paths and naming conventions
- Links to design specifications or documentation
- Common pitfalls to avoid
- Tools or commands to use
- Testing strategies

---

## Quality Standards

### Issue Description Quality
✅ **Clear:** Can a new contributor understand exactly what to do?  
✅ **Specific:** Are file paths, commands, and outputs specified?  
✅ **Bounded:** Is the scope clear and not too large?  
✅ **Actionable:** Can work start immediately without clarification?  
✅ **Validatable:** Can completion be objectively verified?

### Checklist for Each Issue
- [ ] Title is clear and action-oriented
- [ ] Description explains WHY and WHAT
- [ ] Tasks are specific and checkbox-friendly
- [ ] Dependencies are clearly documented
- [ ] Acceptance criteria are testable
- [ ] Effort estimate is reasonable for part-time contributor
- [ ] All relevant files listed
- [ ] Implementation notes provide useful guidance
- [ ] Labels are appropriate and consistent
- [ ] Milestone is set correctly
- [ ] No ambiguity or unclear requirements

---

## Execution Workflow

### Step 1: Validate Input
- Confirm roadmap phase/tasks are provided
- Verify repository information available
- Check GitHub labels exist (create if needed)

### Step 2: Convert Tasks to Issues
For each task in the phase:
1. Create clear, descriptive title
2. Write comprehensive body using template
3. Assign appropriate labels
4. Calculate realistic effort estimates
5. Identify blocking dependencies
6. Define specific acceptance criteria

### Step 3: Build Issue Network
- Map all dependency relationships
- Ensure blocked/blocks links are correct
- Identify parallelizable tasks
- Create task ordering plan

### Step 4: Output Specification
Generate structured JSON with:
- All issue metadata
- Complete markdown bodies
- Dependency relationships
- Implementation guidance

### Step 5: Validation
Verify:
- All acceptance criteria are testable
- No circular dependencies
- Effort estimates are realistic
- Each issue can be assigned to one person
- Titles follow naming convention
- Labels are consistent

---

## Best Practices for Open Source

### Contributor Experience
- Reduce entry barriers with clear instructions
- Provide code examples and references
- Link to relevant documentation
- Mark good-first-issues for newcomers
- Include implementation notes, not just requirements

### Dependency Management
- Clearly mark blocking issues
- Suggest alternative work if current task blocked
- Group related issues in milestones
- Show critical path in project board

### Estimation Accuracy
- Base estimates on actual part-time contribution rates
- Account for review/feedback cycles
- Include time for testing and refinement
- Build in buffer for learning curve

### Async Collaboration
- Write as if communicating async
- Over-document rather than under-document
- Include links, examples, and references
- Anticipate follow-up questions
- Provide context from earlier decisions

---

## Common Pitfalls to Avoid

❌ **Too Vague:** "Update styling" (What? How?)  
✅ **Better:** "Convert Button component from Tailwind to CSS Modules with specific classes"

❌ **Too Large:** Single issue covering entire phase  
✅ **Better:** Individual issues for each logical task

❌ **Missing Dependencies:** Issue requires prior work but doesn't mention it  
✅ **Better:** Clearly state "Blocked By: #123"

❌ **Unclear Effort:** "Small effort" without hours  
✅ **Better:** "Estimated 4-6 hours for part-time contributor"

❌ **Unmeasurable Criteria:** "Make it better"  
✅ **Better:** "CSS variables compile without errors, viewable in browser DevTools"

---

## Output Format

Return issues as:
1. **Structured JSON** with all metadata
2. **Ready-to-Use Markdown** bodies for copy/paste
3. **Dependency Map** showing relationships
4. **Label Checklist** for repository setup
5. **Milestone Plan** with timeline

The output should be directly usable to create issues via GitHub API or manual creation.

---

## Next Steps

Please provide:
1. **Phase Number & Name** (e.g., "Phase 1: Foundation Cleanup")
2. **Roadmap Source** (point to migration roadmap or provide tasks)
3. **GitHub Repository** (owner/repo for links)
4. **Existing Labels** (any custom labels already in use)
5. **Timeline** (deadline for this phase completion)

I will then generate complete, production-ready GitHub issues following this specification.

