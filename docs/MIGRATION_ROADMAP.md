# React Migration Roadmap - hub.microcks.io

**Project Type:** Open Source  
**Timeline:** 8-12 weeks  
**Current Status:** Phase 1 Complete ✅ (~20% complete)  
**Last Updated:** January 30, 2026

---

## 📋 Overview

This roadmap breaks down the React migration into manageable tasks suitable for an open-source project with part-time contributors. Each task includes:
- **Dependencies** - What must be completed first
- **Estimated Effort** - Time for part-time contributor
- **Priority** - Critical, High, Medium, Low
- **Can Parallelize** - Whether multiple people can work on it simultaneously

### Timeline Assumptions
- Contributors work **10-15 hours/week** (evenings/weekends)
- Code reviews take **2-3 days**
- Multiple contributors can work in parallel on independent tasks
- Testing is done alongside development (not at the end)

---

## 🎯 Phases Overview

```
Phase 1: Foundation Cleanup           ████████████ ✅ COMPLETE
Phase 2: CSS Token System             ████████░░░░ (3 weeks)
Phase 3: Core UI Components           ████████████ (3 weeks)
Phase 4: Custom Hooks & Services      ████████░░░░ (2 weeks)
Phase 5: Feature Components           ████████░░░░ (2 weeks)
Phase 6: Page Implementations         ████████████ (3 weeks)
Phase 7: Testing & Quality            ████████░░░░ (2 weeks)
Phase 8: Final Polish & Documentation ████░░░░░░░░ (1 week)
                                      ─────────────────────
                                      Total: 12-14 weeks
```

---

## Phase 1: Foundation Cleanup & Setup ✅ COMPLETE

**Duration:** Completed  
**Goal:** Set up proper tooling and CSS foundation  
**Status:** ✅ All critical tasks completed
**Blocking:** ALL other phases depend on this

**⚠️ Strategic Decisions Made:**
- **Tailwind Removal Postponed:** Delayed until all components are migrated to ensure app remains functional
- **Types via Orval:** Using auto-generated types from OpenAPI instead of manual type definitions
- **YAGNI Approach:** Dependencies (like Markdown libs) will be installed only when needed
- **Incremental CSS Tokens:** Creating tokens progressively during component migration for easier code review

---

### Task 1.1: Remove Tailwind Ecosystem ⏸️ POSTPONED

**Issue Title:** `[Phase 1] Remove Tailwind CSS and related dependencies`

**Status:** ⏸️ **POSTPONED TO END OF MIGRATION**

**Rationale:** 
To ensure the application remains functional throughout the migration, Tailwind CSS will be kept alongside the new CSS system until all components are migrated. This allows for:
- Incremental migration without breaking existing functionality
- Testing new components in production while old ones still work
- Easier rollback if issues are discovered
- Reduced risk and better developer experience

**Description:**
Remove all Tailwind CSS dependencies and configuration files after all components have been migrated to the custom CSS system.

**Dependencies:** ALL component migrations must be complete first

**Effort:** 8-10 hours

**Priority:** 🟡 MEDIUM - Will be done at the end

**Can Parallelize:** ❌ No - Must be done last

**Tasks:**
- [ ] Verify all components use CSS Modules (no Tailwind classes remaining)
- [ ] Uninstall npm packages:
  ```bash
  npm uninstall tailwindcss tailwind-merge tw-animate-css
  npm uninstall @tailwindcss/postcss class-variance-authority
  ```
- [ ] Remove Radix UI dependencies if no longer needed:
  ```bash
  npm uninstall @radix-ui/react-navigation-menu @radix-ui/react-slot
  ```
- [ ] Delete `postcss.config.js`
- [ ] Delete `components.json` (ShadCN config)
- [ ] Delete `react/src/assets/css/theme-tailwind.old.css`
- [ ] Delete `src/lib/utils.ts` (twMerge-based) if it exists
- [ ] Update `package.json` scripts if needed
- [ ] Verify build still works without errors
- [ ] Run full test suite
- [ ] Commit with message: `chore: remove Tailwind CSS ecosystem`

**Acceptance Criteria:**
- ✅ No Tailwind packages in `package.json`
- ✅ No Tailwind config files present
- ✅ Build completes without errors
- ✅ No import errors for removed packages
- ✅ All visual regression tests pass

**Files to Modify:**
- `react/package.json`
- Delete: `postcss.config.js`
- Delete: `components.json`
- Delete: `react/src/assets/css/theme-tailwind.old.css`
- Delete: `src/lib/utils.ts` (if exists)

---

### Task 1.2: Install Required Dependencies ⏸️ POSTPONED (YAGNI)

**Issue Title:** `[Phase 1] Install dependencies as needed`

**Status:** ⏸️ **POSTPONED - YAGNI Approach Adopted**

**Rationale:**
Following the YAGNI (You Ain't Gonna Need It) principle, dependencies will be installed only when actually needed. This provides several benefits:
- ✅ Avoids maintaining unnecessary dependencies
- ✅ Allows evaluating alternative libraries when the need arises
- ✅ Keeps `package.json` lean and focused
- ✅ Reduces security attack surface (fewer dependencies = fewer potential vulnerabilities)
- ✅ Prevents package bloat

**Description:**
Install dependencies incrementally as they become necessary during component migration.

**Dependencies:** None - done on-demand

**Effort:** 1 hour per dependency batch

**Priority:** 🟡 MEDIUM - Install when needed

**Can Parallelize:** ✅ Yes - Can be done anytime

**Potential Future Dependencies (to evaluate when needed):**
- **Markdown rendering:** 
  - Option A: `marked` + `dompurify`
  - Option B: `react-markdown`
  - Option C: `micromark`
  - Decision: Evaluate alternatives when Markdown rendering is needed
- **Other:** To be determined based on migration needs

**Tasks:**
- [ ] Create a dependency evaluation checklist when adding new packages
- [ ] Document the rationale for each dependency choice
- [ ] Prefer native solutions when possible
- [ ] Evaluate at least 2 alternatives before choosing a library

**Acceptance Criteria:**
- ✅ Dependencies are only added when there's a clear, immediate need
- ✅ Each dependency choice is documented
- ✅ No unused dependencies in `package.json`
- ✅ Security audit passes for all new dependencies

**Files to Modify:**
- `react/package.json` (when dependencies are added)

---

### Task 1.3: Create Project Structure for Styles ✅ COMPLETE

**Issue Title:** `[Phase 1] Create CSS directory structure with tokens`

**Status:** ✅ **COMPLETED**

**Description:**
Set up the directory structure for the CSS token system and global styles using vanilla CSS (not SCSS) and CSS Custom Properties.

**Implementation Details:**
- ✅ Using vanilla CSS instead of SCSS for simplicity
- ✅ CSS Custom Properties (CSS variables) for tokens
- ✅ CSS Modules for component-level styles
- ✅ Modern CSS reset included
- ✅ Incremental approach: tokens created as needed during component migration

**Dependencies:** None

**Effort:** 3-4 hours (completed)

**Priority:** 🔴 CRITICAL - Foundation for all styling

**Can Parallelize:** ❌ No

**Tasks:**
- [x] Create directory structure in `react/src/assets/css/`:
  ```
  react/src/assets/css/
  ├── tokens/
  │   ├── colors.css ✅ Created
  │   ├── spacing.css (to be created as needed)
  │   ├── typography.css (to be created as needed)
  │   ├── breakpoints.css (to be created as needed)
  │   └── index.css (to be created when needed)
  ├── base/
  │   ├── reset.css ✅ Existing (modern CSS reset)
  │   ├── typography.css (to be created as needed)
  │   └── layout.css (to be created as needed)
  ├── utils/
  │   ├── responsive.css (to be created as needed)
  │   └── flexbox.css (to be created as needed)
  └── index.ts ✅ Created (imports global styles)
  ```
- [x] Create `tokens/colors.css` with CSS Custom Properties using `@property`
- [x] Keep existing `base/reset.css` (modern CSS reset - already present)
- [x] Create `index.ts` to import global styles
- [x] Rename old Tailwind theme to `theme-tailwind.old.css`
- [x] Verify imports work without errors
- [x] Commit completed

**Acceptance Criteria:**
- ✅ Base directory structure created
- ✅ CSS Custom Properties defined in `tokens/colors.css`
- ✅ Import structure works via `index.ts`
- ✅ No build errors
- ✅ Foundation ready for incremental token creation
- ✅ Modern CSS reset in place

**Files Created:**
- `react/src/assets/css/tokens/colors.css` ✅
- `react/src/assets/css/base/reset.css` ✅ (already existed)
- `react/src/assets/css/index.ts` ✅
- Other token files will be created incrementally as needed

**Files Modified:**
- `react/src/assets/css/theme.css` → renamed to `theme-tailwind.old.css`

**Note:** Additional token files (spacing, typography, breakpoints, etc.) will be created progressively during component migration to facilitate code review and maintain focused PRs.

---

### Task 1.4: Create Types Directory Structure ✅ RESOLVED VIA ORVAL

**Issue Title:** `[Phase 1] Use Orval for automatic type generation from OpenAPI`

**Status:** ✅ **COMPLETED - BETTER SOLUTION IMPLEMENTED**

**Description:**
Instead of manually creating and maintaining type definitions, the project now uses **Orval** to automatically generate TypeScript types and fetch functions from the OpenAPI specification.

**Solution Implemented:**
- ✅ **Orval configuration** set up to generate types from `api/microcks-hub-openapi-v1.0.yaml`
- ✅ **Auto-generated types** in `react/.api/microcksHub/index.ts`
- ✅ **Single source of truth**: OpenAPI spec drives both backend and frontend types
- ✅ **No manual maintenance** required for types
- ✅ **Always in sync** with API specification

**Dependencies:** None - alternative approach

**Effort:** Already completed (better than manual approach)

**Priority:** 🟢 RESOLVED - Better solution in place

**Can Parallelize:** N/A - Already done

**Benefits of Orval Approach:**
- ✅ Types automatically generated from OpenAPI spec
- ✅ Fetch functions generated alongside types
- ✅ Single source of truth for API contracts
- ✅ No manual type maintenance or drift
- ✅ API changes automatically reflected in types
- ✅ Better developer experience

**Generated Types (from OpenAPI):**
- `APIPackage`
- `APIVersion`
- `Category`
- `Contract`
- `Link`
- `Maintainer`
- And all other API-related types

**Tasks:**
- [x] Orval configured in project
- [x] Types generated in `react/.api/microcksHub/index.ts`
- [x] OpenAPI spec available at `api/microcks-hub-openapi-v1.0.yaml`
- [x] Fetch helper integrated
- [x] Type generation script available (e.g., `npm run generate:api`)

**Acceptance Criteria:**
- ✅ All API types auto-generated from OpenAPI
- ✅ Types available in `react/.api/microcksHub/`
- ✅ No manual type definitions needed
- ✅ No TypeScript errors
- ✅ Types match OpenAPI specification exactly

**Files Created (auto-generated):**
- `react/.api/microcksHub/index.ts` ✅

**Files to Update (when API changes):**
- Run: `npm run generate:api` to regenerate types from OpenAPI

**Note:** This approach is superior to manual type definitions as it ensures API and frontend are always in sync with zero manual effort.

---

### Task 1.5: Update Build Configuration ✅ ALREADY IN PLACE

**Issue Title:** `[Phase 1] Verify Rsbuild configuration for CSS Modules`

**Status:** ✅ **ALREADY CONFIGURED**

**Description:**
Rsbuild configuration is already properly set up with CSS Modules support, Stylelint, source maps, and build optimization.

**Dependencies:** None - already exists

**Effort:** 0 hours (verification only)

**Priority:** 🟢 COMPLETE - Already configured

**Can Parallelize:** N/A

**Current Configuration (in `react/rsbuild.config.ts`):**
- ✅ **CSS Modules**: Native support enabled (no additional config needed)
- ✅ **Stylelint Plugin**: Configured for CSS/SCSS validation
  - Extensions: `['css', 'scss', 'sass']`
  - Fails on error in production
  - Context: `src`
- ✅ **Source Maps**: 
  - Development: `cheap-module-source-map`
  - Production: Configurable via `DISABLE_SOURCE_MAP`
  - CSS source maps enabled
- ✅ **ESLint Plugin**: Configured for code quality
- ✅ **Build Optimization**: 
  - Output path: `dist`
  - Public assets copied from `public/`
  - Asset prefix configurable via `PUBLIC_URL`
- ✅ **Dev Server**: 
  - Port: 3000 (configurable via `PORT`)
  - Auto-open browser (configurable via `BROWSER`)

**Tasks:**
- [x] Configuration already in place
- [x] CSS Modules work out of the box
- [x] Stylelint validates CSS files
- [x] Source maps configured for dev and prod
- [x] Build optimization configured
- [x] No additional configuration needed

**Acceptance Criteria:**
- ✅ CSS files compile correctly
- ✅ CSS Modules work properly (native support)
- ✅ Source maps available in dev mode
- ✅ Build output is optimized
- ✅ Dev server runs without issues
- ✅ Stylelint validates CSS on build

**Files Already Configured:**
- `react/rsbuild.config.ts` ✅

**Note:** No changes needed. Rsbuild natively supports CSS Modules and the current configuration already includes all necessary optimizations and tooling.

---

## Phase 1 Summary ✅ COMPLETE

**Total Duration:** Completed ahead of schedule  
**Total Tasks:** 5  
**Tasks Completed:** 3 ✅  
**Tasks Postponed:** 2 ⏸️ (strategic decisions)

**Completion Status:**
- ✅ Task 1.3: CSS structure and tokens foundation created
- ✅ Task 1.4: Types via Orval (better solution than manual)
- ✅ Task 1.5: Build configuration verified (already optimal)
- ⏸️ Task 1.1: Tailwind removal postponed to end of migration
- ⏸️ Task 1.2: Dependencies postponed (YAGNI approach)

**End State Achieved:**
- ✅ **CSS Foundation**: Base structure with `tokens/colors.css` and modern reset
- ✅ **Type Safety**: Auto-generated types from OpenAPI via Orval
- ✅ **Build Tooling**: Rsbuild configured with CSS Modules, Stylelint, source maps
- ✅ **Incremental Strategy**: Tokens and dependencies added as needed
- ✅ **Functional App**: Tailwind coexists with new CSS system during migration
- ✅ **Clean Architecture**: CSS Custom Properties, CSS Modules for components

**Strategic Decisions Made:**
1. **Tailwind Coexistence**: Keeping Tailwind until all components migrated (risk mitigation)
2. **Orval for Types**: Auto-generation from OpenAPI (better than manual maintenance)
3. **YAGNI Dependencies**: Install only when needed (lean dependency tree)
4. **Incremental Tokens**: Create CSS tokens progressively (easier code review)
5. **Vanilla CSS**: Using modern CSS instead of SCSS (simpler, native)

**Key Benefits:**
- 🎯 Lower risk: App stays functional during migration
- 🚀 Better DX: Types auto-sync with API changes
- 🔒 More secure: Fewer dependencies to maintain
- 📦 Lighter bundle: Only essential packages
- 👁️ Easier reviews: Incremental changes in small PRs

**Ready to Proceed to Phase 2:** CSS Token System Implementation & Component Migration

---

## Phase 2: CSS Token System Implementation

**Duration:** 3 weeks  
**Goal:** Implement complete CSS token system for theming  
**Blocking:** All component styling depends on this

### Task 2.1: Implement Color Tokens 🔴 CRITICAL

**Issue Title:** `[Phase 2] Implement CSS color token system`

**Description:**
Create comprehensive color token system with primary, semantic, and component-specific colors.

**Dependencies:** Task 1.3 (SCSS structure created)

**Effort:** 8-10 hours

**Priority:** 🔴 CRITICAL - Foundation for all component styling

**Can Parallelize:** ❌ No - Other token tasks depend on this pattern

**Tasks:**
- [ ] Implement `src/styles/tokens/colors.scss`:
  - Primary colors (50-900 scale)
  - Semantic colors (text, background, border)
  - State colors (success, warning, error, info)
  - Component-specific colors
- [ ] Follow migration plan color structure
- [ ] Use CSS Custom Properties (`:root`)
- [ ] Add dark mode support (optional but recommended)
- [ ] Document color usage in comments
- [ ] Test colors in browser dev tools
- [ ] Commit with message: `feat: implement color token system`

**Acceptance Criteria:**
- ✅ All color tokens defined
- ✅ CSS variables available globally
- ✅ Colors follow consistent naming convention
- ✅ Documentation comments included
- ✅ Testable in browser

**Files to Modify:**
- `src/styles/tokens/colors.scss`
- `src/styles/tokens/index.scss` (import colors)

**Reference:**
See REACT_MIGRATION_PLAN.md "CSS Tokens Architecture" section for structure.

---

### Task 2.2: Implement Spacing Tokens 🔴 CRITICAL

**Issue Title:** `[Phase 2] Implement CSS spacing token system`

**Description:**
Create spacing token system based on 4px/8px grid for consistent layouts.

**Dependencies:** Task 2.1 (Color tokens - for pattern reference)

**Effort:** 6-8 hours

**Priority:** 🔴 CRITICAL - All layouts need spacing

**Can Parallelize:** ⚠️ Partial - Can start after 2.1 is merged

**Tasks:**
- [ ] Implement `src/styles/tokens/spacing.scss`:
  - Base spacing unit (4px system)
  - Spacing scale (xxs to xxxl)
  - Layout-specific spacing (container, section, component gaps)
- [ ] Use `calc()` for derived values
- [ ] Document usage patterns
- [ ] Test with example component
- [ ] Commit with message: `feat: implement spacing token system`

**Acceptance Criteria:**
- ✅ Spacing scale complete (xxs to xxxl)
- ✅ Consistent with 4px/8px grid
- ✅ Layout tokens included
- ✅ CSS variables work correctly

**Files to Modify:**
- `src/styles/tokens/spacing.scss`
- `src/styles/tokens/index.scss` (import spacing)

---

### Task 2.3: Implement Typography Tokens 🔴 CRITICAL

**Issue Title:** `[Phase 2] Implement CSS typography token system`

**Description:**
Create typography token system with font families, sizes, weights, and line heights.

**Dependencies:** Task 2.1 (Color tokens - for pattern reference)

**Effort:** 8-10 hours

**Priority:** 🔴 CRITICAL - All text needs typography

**Can Parallelize:** ✅ Yes - Can work parallel with Task 2.2

**Tasks:**
- [ ] Implement `src/styles/tokens/typography.scss`:
  - Font families (base, mono)
  - Font sizes (xs to 5xl)
  - Font weights (light to bold)
  - Line heights (tight, normal, relaxed)
  - Letter spacing
- [ ] Use rem units for accessibility
- [ ] Add fallback font stacks
- [ ] Document usage guidelines
- [ ] Commit with message: `feat: implement typography token system`

**Acceptance Criteria:**
- ✅ Complete typography scale
- ✅ Accessible font sizing (rem-based)
- ✅ System font fallbacks
- ✅ All variables work correctly

**Files to Modify:**
- `src/styles/tokens/typography.scss`
- `src/styles/tokens/index.scss` (import typography)

---

### Task 2.4: Implement Breakpoint Tokens 🟠 HIGH

**Issue Title:** `[Phase 2] Implement CSS breakpoint token system and responsive mixins`

**Description:**
Create breakpoint tokens and SCSS mixins for responsive design.

**Dependencies:** Task 2.2 or 2.3 (To learn token pattern)

**Effort:** 6-8 hours

**Priority:** 🟠 HIGH - Responsive design foundation

**Can Parallelize:** ✅ Yes - Independent of other tokens

**Tasks:**
- [ ] Implement `src/styles/tokens/breakpoints.scss`:
  - Breakpoint values (xs, sm, md, lg, xl, xxl)
  - Container max-widths
- [ ] Implement `src/styles/mixins/responsive.scss`:
  - `@mixin respond-to($breakpoint)` mixin
  - Mobile-first approach
  - Usage examples in comments
- [ ] Test responsive mixins
- [ ] Document usage patterns
- [ ] Commit with message: `feat: implement breakpoint tokens and responsive mixins`

**Acceptance Criteria:**
- ✅ All breakpoints defined
- ✅ Responsive mixin works correctly
- ✅ Mobile-first approach
- ✅ Examples provided

**Files to Modify:**
- `src/styles/tokens/breakpoints.scss`
- `src/styles/tokens/index.scss` (import breakpoints)
- `src/styles/mixins/responsive.scss`

---

### Task 2.5: Implement Base Typography Styles 🟠 HIGH

**Issue Title:** `[Phase 2] Implement base typography styles`

**Description:**
Create base typography styles using the typography tokens.

**Dependencies:** Task 2.3 (Typography tokens must exist)

**Effort:** 5-6 hours

**Priority:** 🟠 HIGH - Foundation for all text

**Can Parallelize:** ❌ No - Depends on Task 2.3

**Tasks:**
- [ ] Implement `src/styles/base/typography.scss`:
  - Body text styles using tokens
  - Heading styles (h1-h6) using tokens
  - Paragraph, list, link styles
  - Code and pre styles
- [ ] Apply tokens from typography.scss
- [ ] Ensure good readability
- [ ] Test in browser
- [ ] Commit with message: `feat: implement base typography styles`

**Acceptance Criteria:**
- ✅ All HTML text elements styled
- ✅ Uses typography tokens
- ✅ Good readability and hierarchy
- ✅ Works across browsers

**Files to Modify:**
- `src/styles/base/typography.scss`

---

### Task 2.6: Implement Base Layout Styles 🟠 HIGH

**Issue Title:** `[Phase 2] Implement base layout styles`

**Description:**
Create base layout utilities and container styles using spacing tokens.

**Dependencies:** Task 2.2 (Spacing tokens must exist)

**Effort:** 5-6 hours

**Priority:** 🟠 HIGH - Layout foundation

**Can Parallelize:** ⚠️ Can overlap with Task 2.5

**Tasks:**
- [ ] Implement `src/styles/base/layout.scss`:
  - Container styles using spacing tokens
  - Max-width constraints
  - Padding utilities
  - Common layout patterns
- [ ] Use spacing tokens throughout
- [ ] Create reusable layout classes
- [ ] Test responsiveness
- [ ] Commit with message: `feat: implement base layout styles`

**Acceptance Criteria:**
- ✅ Container styles defined
- ✅ Uses spacing tokens
- ✅ Responsive behavior works
- ✅ Reusable patterns established

**Files to Modify:**
- `src/styles/base/layout.scss`

---

### Task 2.7: Implement Flexbox Mixins 🟡 MEDIUM

**Issue Title:** `[Phase 2] Create flexbox utility mixins`

**Description:**
Create SCSS mixins for common flexbox patterns to reduce code duplication.

**Dependencies:** None (independent utility task)

**Effort:** 4-5 hours

**Priority:** 🟡 MEDIUM - Developer convenience

**Can Parallelize:** ✅ Yes - Can be done anytime during Phase 2

**Tasks:**
- [ ] Implement `src/styles/mixins/flexbox.scss`:
  - Flex center mixin
  - Flex space-between mixin
  - Flex column mixin
  - Gap utilities
- [ ] Add usage examples in comments
- [ ] Test mixins in example components
- [ ] Document patterns
- [ ] Commit with message: `feat: add flexbox utility mixins`

**Acceptance Criteria:**
- ✅ Common flexbox patterns covered
- ✅ Easy to use and understand
- ✅ Examples provided
- ✅ Reduces code duplication

**Files to Modify:**
- `src/styles/mixins/flexbox.scss`

---

### Task 2.8: Create Global Styles Entry Point 🔴 CRITICAL

**Issue Title:** `[Phase 2] Implement global styles entry point`

**Description:**
Create the main global.scss file that ties everything together.

**Dependencies:** Tasks 2.1-2.6 (All tokens and base styles)

**Effort:** 3-4 hours

**Priority:** 🔴 CRITICAL - Activates all tokens

**Can Parallelize:** ❌ No - Depends on other tasks

**Tasks:**
- [ ] Implement `src/styles/global.scss`:
  - Import all token files
  - Import all base styles
  - Import mixins
  - Add any global overrides
  - Set box-sizing, normalize styles
- [ ] Update `src/assets/css/index.ts`:
  - Import global.scss instead of theme.css
  - Ensure proper import order
- [ ] Test full token system in browser
- [ ] Verify all tokens accessible
- [ ] Commit with message: `feat: implement global styles entry point`

**Acceptance Criteria:**
- ✅ All tokens imported and active
- ✅ Base styles applied globally
- ✅ No conflicts or errors
- ✅ All CSS variables available in browser

**Files to Modify:**
- `src/styles/global.scss`
- `src/assets/css/index.ts`

---

### Task 2.9: Update Header Component to Use Tokens 🟠 HIGH

**Issue Title:** `[Phase 2] Refactor Header component to use CSS tokens`

**Description:**
Update the existing Header CSS Module to use new token system (proof of concept).

**Dependencies:** Task 2.8 (Global styles active)

**Effort:** 4-5 hours

**Priority:** 🟠 HIGH - Validates token system works

**Can Parallelize:** ❌ No - Needs tokens to be ready

**Tasks:**
- [ ] Update `src/App/Layout/Header/Header.module.css`:
  - Replace hardcoded colors with color tokens
  - Replace hardcoded spacing with spacing tokens
  - Replace complex calc patterns with token values
  - Simplify CSS using new tokens
- [ ] Test Header appearance matches original
- [ ] Verify responsive behavior
- [ ] Document token usage
- [ ] Commit with message: `refactor: update Header to use CSS tokens`

**Example transformation:**
```scss
/* Before */
background-color: var(--color-slate-900);
height: calc(80 / var(--base-font-size) * 1rem);

/* After */
background-color: var(--color-background-dark);
height: var(--header-height);
```

**Acceptance Criteria:**
- ✅ Header uses only tokens (no hardcoded values)
- ✅ Visual appearance unchanged
- ✅ Simplified CSS
- ✅ Token system validated

**Files to Modify:**
- `src/App/Layout/Header/Header.module.css`

---

### Task 2.10: Create Token Documentation 🟡 MEDIUM

**Issue Title:** `[Phase 2] Document CSS token system usage`

**Description:**
Create documentation for the CSS token system to help contributors.

**Dependencies:** Task 2.8 (Token system complete)

**Effort:** 3-4 hours

**Priority:** 🟡 MEDIUM - Important for contributors

**Can Parallelize:** ⚠️ Can start during Phase 2 end

**Tasks:**
- [ ] Create `docs/CSS_TOKENS.md`:
  - Overview of token system
  - How to use tokens in components
  - Color palette reference
  - Spacing scale reference
  - Typography scale reference
  - Example component using tokens
  - How to customize theme
- [ ] Add inline comments to token files
- [ ] Create visual reference (optional)
- [ ] Commit with message: `docs: add CSS token system documentation`

**Acceptance Criteria:**
- ✅ Comprehensive documentation
- ✅ Examples provided
- ✅ Easy for contributors to understand
- ✅ Theme customization explained

**Files to Create:**
- `docs/CSS_TOKENS.md`

**Files to Modify:**
- All token files (add better comments)

---

## Phase 2 Summary

**Total Duration:** 3 weeks  
**Total Tasks:** 10  
**Parallelizable:** Tasks 2.2 & 2.3 can run parallel, Task 2.4 & 2.7 can run anytime  
**Critical Path:** 2.1 → 2.2/2.3 → 2.5/2.6 → 2.8 → 2.9

**End State:**
- ✅ Complete CSS token system
- ✅ All design tokens defined (colors, spacing, typography, breakpoints)
- ✅ Base styles implemented
- ✅ Utility mixins created
- ✅ Header component validates system works
- ✅ Documentation for contributors

**Ready to Proceed to Phase 3:** Core UI Components Implementation

---

## Phase 3: Core UI Components Implementation

**Duration:** 3 weeks  
**Goal:** Build custom UI primitive components replacing ShadCN components  
**Blocking:** All feature components and pages depend on these

### Task 3.1: Delete Old ShadCN Components 🔴 CRITICAL

**Issue Title:** `[Phase 3] Remove ShadCN UI components directory`

**Description:**
Remove all existing ShadCN-based UI components to prevent confusion and imports.

**Dependencies:** Task 2.8 (Token system ready - so we can rebuild)

**Effort:** 2-3 hours

**Priority:** 🔴 CRITICAL - Prevents accidentally using old components

**Can Parallelize:** ❌ No - Must be done before building new components

**Tasks:**
- [ ] Delete entire `src/components/ui/` directory
- [ ] Search and remove all imports from old UI components in:
  - `src/components/HubSection.tsx`
  - `src/pages/Home/Home.tsx`
  - Any other files importing from `@/components/ui/`
- [ ] Temporarily replace with placeholder divs or comments
- [ ] Verify build still works (will have visual issues - OK)
- [ ] Commit with message: `chore: remove ShadCN UI components`

**Acceptance Criteria:**
- ✅ `src/components/ui/` directory deleted
- ✅ No imports from old UI components
- ✅ Build completes without errors
- ✅ Ready for clean component rebuild

**Files to Delete:**
- `src/components/ui/` (entire directory)

**Files to Modify:**
- `src/components/HubSection.tsx` (remove imports, add temporary placeholders)
- `src/pages/Home/Home.tsx` (remove imports)

---

### Task 3.2: Create Button Component 🔴 CRITICAL

**Issue Title:** `[Phase 3] Implement custom Button component`

**Description:**
Create a custom Button component with variants, sizes, and states using CSS tokens.

**Dependencies:** Task 3.1 (Old components removed)

**Effort:** 10-12 hours

**Priority:** 🔴 CRITICAL - Most widely used component

**Can Parallelize:** ❌ No - Sets pattern for other components

**Tasks:**
- [ ] Create `src/components/Button/` directory
- [ ] Create `Button.tsx`:
  - Props: variant, size, disabled, children, onClick, etc.
  - Variants: primary, secondary, ghost, link
  - Sizes: sm, md, lg
  - Forward ref support
  - Accessible (ARIA attributes)
- [ ] Create `Button.module.scss`:
  - Use CSS tokens exclusively
  - Define variant styles
  - Define size styles
  - Hover, focus, active, disabled states
  - Keyboard focus styles
- [ ] Create `Button.test.tsx`:
  - Test rendering with different variants
  - Test sizes
  - Test disabled state
  - Test onClick handler
  - Test accessibility
- [ ] Create `index.ts` for clean exports
- [ ] Update Storybook/documentation (optional)
- [ ] Commit with message: `feat: add custom Button component`

**Acceptance Criteria:**
- ✅ Button works with all variants and sizes
- ✅ Uses CSS tokens (no hardcoded values)
- ✅ Accessible (keyboard nav, ARIA)
- ✅ 80%+ test coverage
- ✅ Looks visually appealing

**Files to Create:**
- `src/components/Button/Button.tsx`
- `src/components/Button/Button.module.scss`
- `src/components/Button/Button.test.tsx`
- `src/components/Button/index.ts`

---

### Task 3.3: Create Input Component 🔴 CRITICAL

**Issue Title:** `[Phase 3] Implement custom Input component`

**Description:**
Create a custom Input component with label, error states, and variants.

**Dependencies:** Task 3.2 (Button component - to learn pattern)

**Effort:** 10-12 hours

**Priority:** 🔴 CRITICAL - Needed for search and forms

**Can Parallelize:** ⚠️ Can start in parallel with Button if multiple contributors

**Tasks:**
- [ ] Create `src/components/Input/` directory
- [ ] Create `Input.tsx`:
  - Props: type, label, placeholder, value, onChange, error, disabled, etc.
  - Variants: text, search, email, etc.
  - Label support
  - Error message display
  - Forward ref support
  - Accessible (label association, ARIA)
- [ ] Create `Input.module.scss`:
  - Use CSS tokens
  - Normal, focus, error, disabled states
  - Label styling
  - Error message styling
- [ ] Create `Input.test.tsx`:
  - Test rendering
  - Test onChange handler
  - Test error states
  - Test accessibility
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add custom Input component`

**Acceptance Criteria:**
- ✅ Input works with all states
- ✅ Uses CSS tokens
- ✅ Accessible
- ✅ 80%+ test coverage
- ✅ Error states clear and visible

**Files to Create:**
- `src/components/Input/Input.tsx`
- `src/components/Input/Input.module.scss`
- `src/components/Input/Input.test.tsx`
- `src/components/Input/index.ts`

---

### Task 3.4: Create Checkbox Component 🟠 HIGH

**Issue Title:** `[Phase 3] Implement custom Checkbox component`

**Description:**
Create a custom Checkbox component for filter panels.

**Dependencies:** Task 3.2 (Button pattern established)

**Effort:** 8-10 hours

**Priority:** 🟠 HIGH - Needed for filters

**Can Parallelize:** ✅ Yes - Can work parallel with Input

**Tasks:**
- [ ] Create `src/components/Checkbox/` directory
- [ ] Create `Checkbox.tsx`:
  - Props: checked, onChange, label, disabled, etc.
  - Controlled component
  - Label association
  - Accessible (ARIA, keyboard nav)
- [ ] Create `Checkbox.module.scss`:
  - Custom checkbox styling (not native)
  - Use CSS tokens
  - Checked, unchecked, disabled states
  - Focus styles
- [ ] Create `Checkbox.test.tsx`:
  - Test checking/unchecking
  - Test disabled state
  - Test accessibility
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add custom Checkbox component`

**Acceptance Criteria:**
- ✅ Checkbox works correctly
- ✅ Custom styling (not browser default)
- ✅ Uses CSS tokens
- ✅ Accessible
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/Checkbox/Checkbox.tsx`
- `src/components/Checkbox/Checkbox.module.scss`
- `src/components/Checkbox/Checkbox.test.tsx`
- `src/components/Checkbox/index.ts`

---

### Task 3.5: Create Modal Component 🟠 HIGH

**Issue Title:** `[Phase 3] Implement custom Modal component`

**Description:**
Create a custom Modal/Dialog component for popups and instructions.

**Dependencies:** Task 3.2 (Button component - used in modal)

**Effort:** 12-15 hours

**Priority:** 🟠 HIGH - Needed for API version page

**Can Parallelize:** ✅ Yes - Independent component

**Tasks:**
- [ ] Create `src/components/Modal/` directory
- [ ] Create `Modal.tsx`:
  - Props: isOpen, onClose, title, children, etc.
  - Backdrop with click-outside to close
  - ESC key to close
  - Focus trap (focus stays in modal)
  - Scroll lock on body
  - Accessible (ARIA role="dialog", aria-labelledby)
- [ ] Create `Modal.module.scss`:
  - Overlay/backdrop styling
  - Modal container styling
  - Header, body, footer sections
  - Use CSS tokens
  - Responsive sizing
  - Animations (fade in/out)
- [ ] Create `Modal.test.tsx`:
  - Test open/close
  - Test ESC key
  - Test click outside
  - Test accessibility
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add custom Modal component`

**Acceptance Criteria:**
- ✅ Modal opens/closes correctly
- ✅ Click outside closes modal
- ✅ ESC key closes modal
- ✅ Focus trapped inside modal
- ✅ Accessible (ARIA, keyboard nav)
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/Modal/Modal.tsx`
- `src/components/Modal/Modal.module.scss`
- `src/components/Modal/Modal.test.tsx`
- `src/components/Modal/index.ts`

---

### Task 3.6: Create Tooltip Component 🟡 MEDIUM

**Issue Title:** `[Phase 3] Implement custom Tooltip component`

**Description:**
Create a custom Tooltip component for hover hints.

**Dependencies:** Task 3.2 (Component pattern established)

**Effort:** 10-12 hours

**Priority:** 🟡 MEDIUM - Nice to have for UX

**Can Parallelize:** ✅ Yes - Independent component

**Tasks:**
- [ ] Create `src/components/Tooltip/` directory
- [ ] Create `Tooltip.tsx`:
  - Props: content, children, position, delay, etc.
  - Positions: top, bottom, left, right
  - Show on hover and focus
  - Hide on mouse leave and blur
  - Position calculation
  - Accessible (aria-describedby)
- [ ] Create `Tooltip.module.scss`:
  - Tooltip container styling
  - Arrow/pointer styling
  - Position variants
  - Use CSS tokens
  - Fade in/out animation
- [ ] Create `Tooltip.test.tsx`:
  - Test show/hide on hover
  - Test show/hide on focus
  - Test positions
  - Test accessibility
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add custom Tooltip component`

**Acceptance Criteria:**
- ✅ Tooltip shows on hover/focus
- ✅ Tooltip hides correctly
- ✅ Positions work correctly
- ✅ Accessible
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/Tooltip/Tooltip.tsx`
- `src/components/Tooltip/Tooltip.module.scss`
- `src/components/Tooltip/Tooltip.test.tsx`
- `src/components/Tooltip/index.ts`

---

### Task 3.7: Create Card Component 🟠 HIGH

**Issue Title:** `[Phase 3] Implement custom Card component`

**Description:**
Create a unified Card component to replace fragmented ShadCN card components.

**Dependencies:** Task 3.2 (Component pattern established)

**Effort:** 8-10 hours

**Priority:** 🟠 HIGH - Used in package listings

**Can Parallelize:** ✅ Yes - Independent component

**Tasks:**
- [ ] Create `src/components/Card/` directory
- [ ] Create `Card.tsx`:
  - Single unified component (not split into 5+ files)
  - Props: header, children, footer, image, etc.
  - Slots for header, content, footer
  - Hover effects
  - Link wrapper support
- [ ] Create `Card.module.scss`:
  - Card container styling
  - Header, content, footer sections
  - Image/thumbnail styling
  - Hover effects
  - Use CSS tokens
  - Responsive layout
- [ ] Create `Card.test.tsx`:
  - Test rendering sections
  - Test hover behavior
  - Test with/without sections
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add custom Card component`

**Acceptance Criteria:**
- ✅ Unified card component (not fragmented)
- ✅ Flexible layout with sections
- ✅ Uses CSS tokens
- ✅ Hover effects work
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/Card/Card.tsx`
- `src/components/Card/Card.module.scss`
- `src/components/Card/Card.test.tsx`
- `src/components/Card/index.ts`

---

## Phase 3 Summary

**Total Duration:** 3 weeks  
**Total Tasks:** 7  
**Parallelizable:** Tasks 3.3-3.7 can run in parallel after 3.2 establishes pattern  
**Critical Path:** 3.1 → 3.2 → (3.3, 3.4, 3.5, 3.6, 3.7 parallel)

**End State:**
- ✅ All ShadCN components removed
- ✅ Custom Button component (variants, sizes, states)
- ✅ Custom Input component (with label, error states)
- ✅ Custom Checkbox component
- ✅ Custom Modal component (accessible, keyboard nav)
- ✅ Custom Tooltip component
- ✅ Custom Card component (unified)
- ✅ All components use CSS tokens
- ✅ 80%+ test coverage for all components
- ✅ Accessible (ARIA, keyboard navigation)

**Ready to Proceed to Phase 4:** Custom Hooks & Services Implementation

---

## Phase 4: Custom Hooks & Services Implementation

**Duration:** 2 weeks  
**Goal:** Create custom hooks and complete service layer for data management  
**Blocking:** Pages and feature components depend on these

### Task 4.1: Complete Package Service API 🔴 CRITICAL

**Issue Title:** `[Phase 4] Complete packages service with all API endpoints`

**Description:**
Add missing API endpoint functions to the packages service.

**Dependencies:** Task 1.4 (Types defined)

**Effort:** 6-8 hours

**Priority:** 🔴 CRITICAL - All data fetching depends on this

**Can Parallelize:** ❌ No - Foundation for all hooks

**Tasks:**
- [ ] Update `src/services/package.services.ts`:
  - Move hardcoded API URL to environment config
  - Add `getPackage(name: string)` function
  - Add `getLatestAPIVersions(packageName: string)` function
  - Add `getAPIVersion(packageName: string, apiVersionName: string)` function
- [ ] Create `src/config/environment.ts`:
  - API base URL from env variables
  - Environment-specific config
- [ ] Import types from `src/types/package.types.ts`
- [ ] Improve error handling with proper error types
- [ ] Add JSDoc comments for all functions
- [ ] Test all endpoints manually
- [ ] Commit with message: `feat: complete packages service API`

**Acceptance Criteria:**
- ✅ All 4 API functions implemented
- ✅ API URL configurable via environment
- ✅ Proper TypeScript typing
- ✅ Error handling implemented
- ✅ JSDoc documentation

**Files to Modify:**
- `src/services/package.services.ts`

**Files to Create:**
- `src/config/environment.ts`

---

### Task 4.2: Create usePackages Hook 🔴 CRITICAL

**Issue Title:** `[Phase 4] Implement usePackages custom hook`

**Description:**
Create a custom hook for fetching all packages with loading and error states.

**Dependencies:** Task 4.1 (Service API complete)

**Effort:** 5-6 hours

**Priority:** 🔴 CRITICAL - Used by HomePage

**Can Parallelize:** ❌ No - Sets pattern for other hooks

**Tasks:**
- [ ] Create `src/hooks/` directory
- [ ] Create `usePackages.ts`:
  - Fetch packages on mount
  - Return: `{ packages, isLoading, error, refetch }`
  - Handle loading state
  - Handle error state
  - Optional: Add caching/stale-while-revalidate
- [ ] Add proper TypeScript types
- [ ] Create `usePackages.test.ts`:
  - Test loading state
  - Test success state
  - Test error state
  - Test refetch function
- [ ] Commit with message: `feat: add usePackages hook`

**Acceptance Criteria:**
- ✅ Hook fetches packages correctly
- ✅ Loading and error states work
- ✅ Properly typed
- ✅ 80%+ test coverage
- ✅ Follows React hooks best practices

**Files to Create:**
- `src/hooks/usePackages.ts`
- `src/hooks/usePackages.test.ts`

---

### Task 4.3: Create usePackage Hook 🟠 HIGH

**Issue Title:** `[Phase 4] Implement usePackage custom hook`

**Description:**
Create a custom hook for fetching a single package with its API versions.

**Dependencies:** Task 4.2 (Hook pattern established)

**Effort:** 5-6 hours

**Priority:** 🟠 HIGH - Used by PackagePage

**Can Parallelize:** ⚠️ Can start in parallel if multiple contributors

**Tasks:**
- [ ] Create `usePackage.ts`:
  - Accept packageId parameter
  - Fetch package and API versions in parallel
  - Return: `{ package, apiVersions, isLoading, error }`
  - Handle not found case
- [ ] Add proper TypeScript types
- [ ] Create `usePackage.test.ts`:
  - Test successful fetch
  - Test loading state
  - Test error handling
  - Test not found case
- [ ] Commit with message: `feat: add usePackage hook`

**Acceptance Criteria:**
- ✅ Hook fetches package data correctly
- ✅ Parallel fetching works
- ✅ Properly typed
- ✅ 80%+ test coverage

**Files to Create:**
- `src/hooks/usePackage.ts`
- `src/hooks/usePackage.test.ts`

---

### Task 4.4: Create useAPIVersion Hook 🟠 HIGH

**Issue Title:** `[Phase 4] Implement useAPIVersion custom hook`

**Description:**
Create a custom hook for fetching API version details.

**Dependencies:** Task 4.2 (Hook pattern established)

**Effort:** 5-6 hours

**Priority:** 🟠 HIGH - Used by APIVersionPage

**Can Parallelize:** ✅ Yes - Can work parallel with 4.3

**Tasks:**
- [ ] Create `useAPIVersion.ts`:
  - Accept packageId and apiVersionId parameters
  - Fetch package and API version data
  - Return: `{ package, apiVersion, isLoading, error }`
- [ ] Add proper TypeScript types
- [ ] Create `useAPIVersion.test.ts`:
  - Test successful fetch
  - Test loading and error states
  - Mock API responses
- [ ] Commit with message: `feat: add useAPIVersion hook`

**Acceptance Criteria:**
- ✅ Hook fetches API version correctly
- ✅ Properly typed
- ✅ 80%+ test coverage

**Files to Create:**
- `src/hooks/useAPIVersion.ts`
- `src/hooks/useAPIVersion.test.ts`

---

### Task 4.5: Create useDocumentation Hook 🟡 MEDIUM

**Issue Title:** `[Phase 4] Implement useDocumentation custom hook`

**Description:**
Create a custom hook for loading Markdown documentation files.

**Dependencies:** Task 4.2 (Hook pattern established)

**Effort:** 4-5 hours

**Priority:** 🟡 MEDIUM - Used by DocumentationPage

**Can Parallelize:** ✅ Yes - Independent hook

**Tasks:**
- [ ] Create `useDocumentation.ts`:
  - Accept page name parameter
  - Fetch markdown file from `/documentation/:page.md`
  - Return: `{ content, isLoading, error }`
  - Handle 404 errors gracefully
- [ ] Add proper TypeScript types
- [ ] Create `useDocumentation.test.ts`:
  - Test successful fetch
  - Test 404 handling
  - Test error states
- [ ] Commit with message: `feat: add useDocumentation hook`

**Acceptance Criteria:**
- ✅ Hook loads markdown files
- ✅ 404 handled gracefully
- ✅ Properly typed
- ✅ 80%+ test coverage

**Files to Create:**
- `src/hooks/useDocumentation.ts`
- `src/hooks/useDocumentation.test.ts`

---

### Task 4.6: Create useFilters Hook 🟠 HIGH

**Issue Title:** `[Phase 4] Implement useFilters custom hook`

**Description:**
Create a custom hook for filtering packages by category, provider, and search query.

**Dependencies:** Task 4.2 (Hook pattern established)

**Effort:** 6-8 hours

**Priority:** 🟠 HIGH - Used by HomePage filters

**Can Parallelize:** ✅ Yes - Independent logic hook

**Tasks:**
- [ ] Create `useFilters.ts`:
  - Accept packages, searchQuery, selectedCategory, selectedProviders
  - Apply filters using useMemo
  - Return filtered packages array
  - Optimize with proper memoization
- [ ] Implement filter logic:
  - Search: name, description, provider
  - Category: exact match
  - Provider: array includes
- [ ] Create `useFilters.test.ts`:
  - Test search filtering
  - Test category filtering
  - Test provider filtering
  - Test combined filters
  - Test memoization
- [ ] Commit with message: `feat: add useFilters hook`

**Acceptance Criteria:**
- ✅ All filter types work correctly
- ✅ Memoization prevents unnecessary recalculations
- ✅ Properly typed
- ✅ 80%+ test coverage

**Files to Create:**
- `src/hooks/useFilters.ts`
- `src/hooks/useFilters.test.ts`

---

### Task 4.7: Create useScrollEffect Hook 🟡 MEDIUM

**Issue Title:** `[Phase 4] Implement useScrollEffect custom hook`

**Description:**
Create a custom hook for detecting scroll position (for header styling).

**Dependencies:** None (independent utility hook)

**Effort:** 3-4 hours

**Priority:** 🟡 MEDIUM - Nice to have for header

**Can Parallelize:** ✅ Yes - Independent utility

**Tasks:**
- [ ] Create `useScrollEffect.ts`:
  - Accept threshold parameter (default 30px)
  - Return isScrolled boolean
  - Add/remove scroll event listener
  - Cleanup on unmount
  - Debounce for performance (optional)
- [ ] Create `useScrollEffect.test.ts`:
  - Test scroll detection
  - Test threshold
  - Test cleanup
- [ ] Commit with message: `feat: add useScrollEffect hook`

**Acceptance Criteria:**
- ✅ Detects scroll correctly
- ✅ Cleanup prevents memory leaks
- ✅ Properly typed
- ✅ 80%+ test coverage

**Files to Create:**
- `src/hooks/useScrollEffect.ts`
- `src/hooks/useScrollEffect.test.ts`

---

### Task 4.8: Create useCopyToClipboard Hook 🟡 MEDIUM

**Issue Title:** `[Phase 4] Implement useCopyToClipboard custom hook`

**Description:**
Create a custom hook for copying text to clipboard with feedback.

**Dependencies:** None (independent utility hook)

**Effort:** 3-4 hours

**Priority:** 🟡 MEDIUM - Used by APIVersionPage

**Can Parallelize:** ✅ Yes - Independent utility

**Tasks:**
- [ ] Create `useCopyToClipboard.ts`:
  - Use navigator.clipboard API
  - Return: `{ copy, isCopied }`
  - isCopied: true for 2 seconds after copy
  - Handle copy errors
  - Fallback for older browsers (optional)
- [ ] Create `useCopyToClipboard.test.ts`:
  - Test copy function
  - Test isCopied state
  - Test timeout reset
  - Mock clipboard API
- [ ] Commit with message: `feat: add useCopyToClipboard hook`

**Acceptance Criteria:**
- ✅ Copies text to clipboard
- ✅ Feedback state works correctly
- ✅ Properly typed
- ✅ 80%+ test coverage

**Files to Create:**
- `src/hooks/useCopyToClipboard.ts`
- `src/hooks/useCopyToClipboard.test.ts`

---

### Task 4.9: Create Utility Functions 🟠 HIGH

**Issue Title:** `[Phase 4] Implement utility functions (markdown, sanitize, providers)`

**Description:**
Create utility functions for markdown rendering, HTML sanitization, and provider name cleanup.

**Dependencies:** Task 1.2 (marked & dompurify installed)

**Effort:** 6-8 hours

**Priority:** 🟠 HIGH - Used by multiple components

**Can Parallelize:** ✅ Yes - Independent utilities

**Tasks:**
- [ ] Create `src/utils/` directory
- [ ] Create `markdown.ts`:
  - Configure marked with options (tables, links, etc.)
  - Configure DOMPurify with allowed tags
  - Export `markdownToHtml(markdown: string): string`
  - Add JSDoc comments
- [ ] Create `providerUtils.ts`:
  - `sanitizeProviderName(provider: string): string`
  - `extractProviders(packages: APIPackage[]): string[]`
  - `extractCategories(packages: APIPackage[]): string[]`
- [ ] Create tests for all utilities:
  - `markdown.test.ts`
  - `providerUtils.test.ts`
- [ ] Commit with message: `feat: add utility functions`

**Acceptance Criteria:**
- ✅ Markdown rendering works with sanitization
- ✅ Provider name cleanup works
- ✅ Extract functions work correctly
- ✅ 80%+ test coverage

**Files to Create:**
- `src/utils/markdown.ts`
- `src/utils/markdown.test.ts`
- `src/utils/providerUtils.ts`
- `src/utils/providerUtils.test.ts`

---

## Phase 4 Summary

**Total Duration:** 2 weeks  
**Total Tasks:** 9  
**Parallelizable:** Tasks 4.3-4.9 can run mostly in parallel after 4.1-4.2  
**Critical Path:** 4.1 → 4.2 → (4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9 parallel)

**End State:**
- ✅ Complete packages service (all 4 endpoints)
- ✅ All data fetching hooks (usePackages, usePackage, useAPIVersion, useDocumentation)
- ✅ UI interaction hooks (useFilters, useScrollEffect, useCopyToClipboard)
- ✅ Utility functions (markdown, provider utils)
- ✅ Environment configuration
- ✅ 80%+ test coverage for all hooks and utils

**Ready to Proceed to Phase 5:** Feature Components Implementation

---

## Phase 5: Feature Components Implementation

**Duration:** 2 weeks  
**Goal:** Build higher-level feature components (FilterPanel, PackageCard, SearchBar, etc.)  
**Blocking:** Pages depend on these components

### Task 5.1: Create SearchBar Component 🔴 CRITICAL

**Issue Title:** `[Phase 5] Implement SearchBar component`

**Description:**
Create SearchBar component to be used in Header (currently in HubSection).

**Dependencies:** Task 3.3 (Input component)

**Effort:** 6-8 hours

**Priority:** 🔴 CRITICAL - Core navigation feature

**Can Parallelize:** ❌ No - Will be used by Header update

**Tasks:**
- [ ] Create `src/components/SearchBar/` directory
- [ ] Create `SearchBar.tsx`:
  - Props: value, onChange, onClear, placeholder
  - Use Input component internally
  - Search icon
  - Clear button (X) when value exists
  - Keyboard navigation (ESC to clear)
- [ ] Create `SearchBar.module.scss`:
  - Search icon positioning
  - Clear button styling
  - Use CSS tokens
  - Responsive width
- [ ] Create `SearchBar.test.tsx`:
  - Test search input
  - Test clear button
  - Test ESC key
  - Test onChange callback
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add SearchBar component`

**Acceptance Criteria:**
- ✅ SearchBar works correctly
- ✅ Clear button appears/disappears appropriately
- ✅ Uses CSS tokens
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/SearchBar/SearchBar.tsx`
- `src/components/SearchBar/SearchBar.module.scss`
- `src/components/SearchBar/SearchBar.test.tsx`
- `src/components/SearchBar/index.ts`

---

### Task 5.2: Create FilterPanel Component 🔴 CRITICAL

**Issue Title:** `[Phase 5] Implement FilterPanel component`

**Description:**
Extract filter panel from HubSection into separate component.

**Dependencies:** Task 3.4 (Checkbox component)

**Effort:** 10-12 hours

**Priority:** 🔴 CRITICAL - Used by HomePage

**Can Parallelize:** ✅ Yes - Can work parallel with SearchBar

**Tasks:**
- [ ] Create `src/components/FilterPanel/` directory
- [ ] Create `FilterPanel.tsx`:
  - Props: categories, providers, selected values, onChange handlers
  - Category filters (single selection)
  - Provider filters (multiple selection)
  - "Show more" for providers
  - Use Checkbox component
  - Clear filters option
- [ ] Create `FilterPanel.module.scss`:
  - Filter sections styling
  - Checkbox lists
  - Show more button
  - Use CSS tokens
  - Responsive layout
- [ ] Create `FilterPanel.test.tsx`:
  - Test category selection
  - Test provider selection
  - Test show more functionality
  - Test clear filters
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add FilterPanel component`

**Acceptance Criteria:**
- ✅ Filters work correctly
- ✅ Show more expands provider list
- ✅ Uses CSS tokens
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/FilterPanel/FilterPanel.tsx`
- `src/components/FilterPanel/FilterPanel.module.scss`
- `src/components/FilterPanel/FilterPanel.test.tsx`
- `src/components/FilterPanel/index.ts`

---

### Task 5.3: Create PackageCard Component 🔴 CRITICAL

**Issue Title:** `[Phase 5] Implement PackageCard component`

**Description:**
Create PackageCard component for package listings.

**Dependencies:** Task 3.7 (Card component)

**Effort:** 8-10 hours

**Priority:** 🔴 CRITICAL - Used by HomePage

**Can Parallelize:** ✅ Yes - Can work parallel with other components

**Tasks:**
- [ ] Create `src/components/PackageCard/` directory
- [ ] Create `PackageCard.tsx`:
  - Props: package data
  - Use Card component internally
  - Package thumbnail
  - Package name and provider
  - Short description
  - Link to package details
  - Hover effects
- [ ] Create `PackageCard.module.scss`:
  - Card layout
  - Image styling
  - Text truncation
  - Hover effects
  - Use CSS tokens
- [ ] Create `PackageCard.test.tsx`:
  - Test rendering
  - Test link navigation
  - Test hover effects
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add PackageCard component`

**Acceptance Criteria:**
- ✅ Card displays package info correctly
- ✅ Link navigation works
- ✅ Uses CSS tokens
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/PackageCard/PackageCard.tsx`
- `src/components/PackageCard/PackageCard.module.scss`
- `src/components/PackageCard/PackageCard.test.tsx`
- `src/components/PackageCard/index.ts`

---

### Task 5.4: Create Breadcrumb Component 🟠 HIGH

**Issue Title:** `[Phase 5] Implement Breadcrumb component`

**Description:**
Create Breadcrumb component for navigation.

**Dependencies:** None (uses basic elements)

**Effort:** 5-6 hours

**Priority:** 🟠 HIGH - Used by multiple pages

**Can Parallelize:** ✅ Yes - Independent component

**Tasks:**
- [ ] Create `src/components/Breadcrumb/` directory
- [ ] Create `Breadcrumb.tsx`:
  - Props: items array with { label, path? }
  - Render breadcrumb trail
  - Active item (no link)
  - Separator between items
  - Accessible (aria-label="breadcrumbs")
- [ ] Create `Breadcrumb.module.scss`:
  - Breadcrumb styling
  - Link and active item styles
  - Separator styling
  - Use CSS tokens
- [ ] Create `Breadcrumb.test.tsx`:
  - Test rendering items
  - Test links and active item
  - Test accessibility
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add Breadcrumb component`

**Acceptance Criteria:**
- ✅ Breadcrumb renders correctly
- ✅ Links work for all but active item
- ✅ Accessible
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/Breadcrumb/Breadcrumb.tsx`
- `src/components/Breadcrumb/Breadcrumb.module.scss`
- `src/components/Breadcrumb/Breadcrumb.test.tsx`
- `src/components/Breadcrumb/index.ts`

---

### Task 5.5: Create MarkdownRenderer Component 🟠 HIGH

**Issue Title:** `[Phase 5] Implement MarkdownRenderer component`

**Description:**
Create component for rendering sanitized Markdown content.

**Dependencies:** Task 4.9 (markdown utils)

**Effort:** 5-6 hours

**Priority:** 🟠 HIGH - Used by multiple pages

**Can Parallelize:** ✅ Yes - Independent component

**Tasks:**
- [ ] Create `src/components/MarkdownRenderer/` directory
- [ ] Create `MarkdownRenderer.tsx`:
  - Props: content (markdown string)
  - Use markdownToHtml utility
  - Render using dangerouslySetInnerHTML (sanitized)
  - Handle empty content
- [ ] Create `MarkdownRenderer.module.scss`:
  - Markdown content styling
  - Headings, paragraphs, lists
  - Code blocks
  - Tables
  - Links
  - Use CSS tokens
- [ ] Create `MarkdownRenderer.test.tsx`:
  - Test markdown rendering
  - Test sanitization
  - Test empty content
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add MarkdownRenderer component`

**Acceptance Criteria:**
- ✅ Renders markdown correctly
- ✅ Content is sanitized
- ✅ Well-styled output
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/MarkdownRenderer/MarkdownRenderer.tsx`
- `src/components/MarkdownRenderer/MarkdownRenderer.module.scss`
- `src/components/MarkdownRenderer/MarkdownRenderer.test.tsx`
- `src/components/MarkdownRenderer/index.ts`

---

### Task 5.6: Create CopyToClipboard Component 🟡 MEDIUM

**Issue Title:** `[Phase 5] Implement CopyToClipboard component`

**Description:**
Create component for copying text with visual feedback.

**Dependencies:** Task 4.8 (useCopyToClipboard hook), Task 3.2 (Button), Task 3.6 (Tooltip)

**Effort:** 5-6 hours

**Priority:** 🟡 MEDIUM - Nice to have for UX

**Can Parallelize:** ✅ Yes - Independent component

**Tasks:**
- [ ] Create `src/components/CopyToClipboard/` directory
- [ ] Create `CopyToClipboard.tsx`:
  - Props: text to copy, children
  - Use useCopyToClipboard hook
  - Use Button and Tooltip components
  - Show "Copied!" feedback
  - Copy icon that changes on click
- [ ] Create `CopyToClipboard.module.scss`:
  - Button styling
  - Icon styling
  - Use CSS tokens
- [ ] Create `CopyToClipboard.test.tsx`:
  - Test copy functionality
  - Test feedback display
  - Test tooltip
- [ ] Create `index.ts`
- [ ] Commit with message: `feat: add CopyToClipboard component`

**Acceptance Criteria:**
- ✅ Copies text correctly
- ✅ Visual feedback works
- ✅ Uses CSS tokens
- ✅ 80%+ test coverage

**Files to Create:**
- `src/components/CopyToClipboard/CopyToClipboard.tsx`
- `src/components/CopyToClipboard/CopyToClipboard.module.scss`
- `src/components/CopyToClipboard/CopyToClipboard.test.tsx`
- `src/components/CopyToClipboard/index.ts`

---

### Task 5.7: Update Header with SearchBar 🟠 HIGH

**Issue Title:** `[Phase 5] Add SearchBar to Header component`

**Description:**
Integrate SearchBar into Header component and add scroll effect.

**Dependencies:** Task 5.1 (SearchBar), Task 4.7 (useScrollEffect)

**Effort:** 4-5 hours

**Priority:** 🟠 HIGH - Completes header functionality

**Can Parallelize:** ❌ No - Depends on SearchBar

**Tasks:**
- [ ] Update `src/App/Layout/Header/Header.tsx`:
  - Add SearchBar component
  - Use useScrollEffect hook
  - Apply 'scrolled' class on scroll
  - Connect search to HomePage state (via URL params or context)
- [ ] Update `Header.module.scss`:
  - Add scrolled state styles
  - SearchBar positioning
  - Responsive layout adjustments
- [ ] Update `Header.test.tsx`:
  - Test scroll effect
  - Test SearchBar integration
- [ ] Commit with message: `feat: add SearchBar and scroll effect to Header`

**Acceptance Criteria:**
- ✅ SearchBar in header works
- ✅ Scroll effect applies correctly
- ✅ Responsive layout
- ✅ Tests updated

**Files to Modify:**
- `src/App/Layout/Header/Header.tsx`
- `src/App/Layout/Header/Header.module.scss`
- `src/App/Layout/Header/Header.test.tsx`

---

### Task 5.8: Refactor HubSection Component 🔴 CRITICAL

**Issue Title:** `[Phase 5] Refactor HubSection to use new components`

**Description:**
Refactor HubSection to use FilterPanel, PackageCard, and remove Tailwind.

**Dependencies:** Tasks 5.2, 5.3 (FilterPanel, PackageCard)

**Effort:** 8-10 hours

**Priority:** 🔴 CRITICAL - Core HomePage component

**Can Parallelize:** ❌ No - Depends on other feature components

**Tasks:**
- [ ] Update `src/components/HubSection.tsx`:
  - Remove all Tailwind classes
  - Use FilterPanel component
  - Use PackageCard component
  - Move search to Header (remove from here)
  - Use custom hooks (usePackages, useFilters)
  - Simplify to orchestration component
- [ ] Create `HubSection.module.scss`:
  - Layout styling
  - Grid for package cards
  - Use CSS tokens
  - Responsive layout
- [ ] Update/create `HubSection.test.tsx`:
  - Test component orchestration
  - Test data flow
  - Mock hooks
- [ ] Commit with message: `refactor: refactor HubSection with custom components`

**Acceptance Criteria:**
- ✅ No Tailwind classes
- ✅ Uses new components
- ✅ Simplified orchestration
- ✅ 80%+ test coverage

**Files to Modify:**
- `src/components/HubSection.tsx`

**Files to Create:**
- `src/components/HubSection.module.scss`
- `src/components/HubSection.test.tsx` (if doesn't exist)

---

## Phase 5 Summary

**Total Duration:** 2 weeks  
**Total Tasks:** 8  
**Parallelizable:** Tasks 5.2-5.6 can run mostly in parallel  
**Critical Path:** 5.1 → 5.7, (5.2, 5.3) → 5.8

**End State:**
- ✅ SearchBar component (in Header)
- ✅ FilterPanel component
- ✅ PackageCard component
- ✅ Breadcrumb component
- ✅ MarkdownRenderer component
- ✅ CopyToClipboard component
- ✅ Header updated with search and scroll effect
- ✅ HubSection refactored (no Tailwind, uses new components)
- ✅ All components use CSS tokens
- ✅ 80%+ test coverage

**Ready to Proceed to Phase 6:** Page Implementations

---

## Phase 6: Page Implementations

**Duration:** 3 weeks  
**Goal:** Complete all 4 pages with full functionality  
**Blocking:** Final testing depends on pages

### Task 6.1: Complete HomePage 🔴 CRITICAL

**Issue Title:** `[Phase 6] Complete HomePage implementation`

**Description:**
Finalize HomePage with all features and remove Tailwind.

**Dependencies:** Task 5.8 (HubSection refactored)

**Effort:** 6-8 hours

**Priority:** 🔴 CRITICAL - Main entry point

**Can Parallelize:** ❌ No - Foundation page

**Tasks:**
- [ ] Update `src/pages/Home/Home.tsx`:
  - Remove all Tailwind classes
  - Clean up hero section
  - Use HubSection component
  - Connect to search in Header via URL params
  - Handle query param sync
- [ ] Create `Home.module.scss`:
  - Hero section styling
  - Background gradients (no Tailwind)
  - Use CSS tokens
  - Responsive layout
- [ ] Create/update `Home.test.tsx`:
  - Test rendering
  - Test HubSection integration
  - Test search param handling
- [ ] Commit with message: `feat: complete HomePage implementation`

**Acceptance Criteria:**
- ✅ No Tailwind classes
- ✅ Fully functional with search and filters
- ✅ Uses CSS tokens
- ✅ 80%+ test coverage

**Files to Modify:**
- `src/pages/Home/Home.tsx`

**Files to Create:**
- `src/pages/Home/Home.module.scss`
- `src/pages/Home/Home.test.tsx`

---

### Task 6.2: Implement PackagePage 🔴 CRITICAL

**Issue Title:** `[Phase 6] Implement PackagePage with full functionality`

**Description:**
Implement complete PackagePage from stub to full functionality.

**Dependencies:** Task 4.3 (usePackage hook), Task 5.4 (Breadcrumb), Task 5.5 (MarkdownRenderer)

**Effort:** 12-15 hours

**Priority:** 🔴 CRITICAL - Core feature page

**Can Parallelize:** ⚠️ Can start in parallel with 6.1 if multiple contributors

**Tasks:**
- [ ] Update `src/pages/Package/Package.tsx`:
  - Use usePackage hook
  - Display package details (name, description, metadata)
  - Display API versions list
  - Use MarkdownRenderer for long description
  - Use Breadcrumb component
  - Handle loading and error states
  - Link to API version pages
- [ ] Create `Package.module.scss`:
  - Page layout (sidebar + main content)
  - Package header section
  - API version list styling
  - Use CSS tokens
  - Responsive layout
- [ ] Create `Package.test.tsx`:
  - Test data fetching
  - Test rendering package info
  - Test API version list
  - Test loading/error states
  - Mock hooks
- [ ] Commit with message: `feat: implement PackagePage`

**Acceptance Criteria:**
- ✅ Complete functionality from Angular version
- ✅ All package details displayed
- ✅ API versions listed correctly
- ✅ Markdown rendering works
- ✅ Uses CSS tokens
- ✅ 80%+ test coverage

**Files to Modify:**
- `src/pages/Package/Package.tsx`

**Files to Create:**
- `src/pages/Package/Package.module.scss`
- `src/pages/Package/Package.test.tsx`

---

### Task 6.3: Implement APIVersionPage 🔴 CRITICAL

**Issue Title:** `[Phase 6] Implement APIVersionPage with full functionality`

**Description:**
Implement complete APIVersionPage from stub to full functionality.

**Dependencies:** Task 4.4 (useAPIVersion hook), Task 5.5 (MarkdownRenderer), Task 5.6 (CopyToClipboard), Task 3.5 (Modal)

**Effort:** 15-18 hours

**Priority:** 🔴 CRITICAL - Core feature page

**Can Parallelize:** ✅ Yes - Can work parallel with 6.2

**Tasks:**
- [ ] Update `src/pages/APIVersion/APIVersion.tsx`:
  - Use useAPIVersion hook
  - Display API version details
  - Display capability level badge
  - Display contracts section
  - Display links section
  - Display maintainers section
  - Use CopyToClipboard for import commands
  - Use Modal for installation instructions
  - Use MarkdownRenderer for description
  - Handle loading and error states
- [ ] Create `APIVersion.module.scss`:
  - Page layout
  - Header with API info and badge
  - Sections (contracts, links, maintainers)
  - Command display styling
  - Use CSS tokens
  - Responsive layout
- [ ] Create `APIVersion.test.tsx`:
  - Test data fetching
  - Test all sections render
  - Test copy to clipboard
  - Test modal open/close
  - Mock hooks
- [ ] Commit with message: `feat: implement APIVersionPage`

**Acceptance Criteria:**
- ✅ Complete functionality from Angular version
- ✅ All sections displayed correctly
- ✅ Copy to clipboard works
- ✅ Modal works
- ✅ Uses CSS tokens
- ✅ 80%+ test coverage

**Files to Modify:**
- `src/pages/APIVersion/APIVersion.tsx`

**Files to Create:**
- `src/pages/APIVersion/APIVersion.module.scss`
- `src/pages/APIVersion/APIVersion.test.tsx`

---

### Task 6.4: Implement DocumentationPage 🟠 HIGH

**Issue Title:** `[Phase 6] Implement DocumentationPage with markdown rendering`

**Description:**
Implement complete DocumentationPage from stub to full functionality.

**Dependencies:** Task 4.5 (useDocumentation hook), Task 5.5 (MarkdownRenderer)

**Effort:** 6-8 hours

**Priority:** 🟠 HIGH - Documentation access

**Can Parallelize:** ✅ Yes - Independent page

**Tasks:**
- [ ] Update `src/pages/Doc/Doc.tsx`:
  - Use useDocumentation hook
  - Load markdown file based on route param
  - Generate title from page name
  - Use MarkdownRenderer
  - Handle loading and error states
  - Handle 404 gracefully
- [ ] Create `Doc.module.scss`:
  - Page layout
  - Title styling
  - Content container
  - Use CSS tokens
  - Responsive layout
- [ ] Create `Doc.test.tsx`:
  - Test markdown loading
  - Test title generation
  - Test 404 handling
  - Mock hook
- [ ] Commit with message: `feat: implement DocumentationPage`

**Acceptance Criteria:**
- ✅ Loads and renders markdown files
- ✅ Title generated correctly
- ✅ 404 handled gracefully
- ✅ Uses CSS tokens
- ✅ 80%+ test coverage

**Files to Modify:**
- `src/pages/Doc/Doc.tsx`

**Files to Create:**
- `src/pages/Doc/Doc.module.scss`
- `src/pages/Doc/Doc.test.tsx`

---

### Task 6.5: Update Footer Component 🟡 MEDIUM

**Issue Title:** `[Phase 6] Refactor Footer component with CSS Module`

**Description:**
Update Footer to use CSS Module instead of Tailwind.

**Dependencies:** Task 2.8 (Token system ready)

**Effort:** 4-5 hours

**Priority:** 🟡 MEDIUM - Visual consistency

**Can Parallelize:** ✅ Yes - Independent task

**Tasks:**
- [ ] Update `src/components/Footer.tsx`:
  - Remove all Tailwind classes
  - Clean up structure
  - Add proper semantic HTML
  - Uncomment social icons (or add icon component)
- [ ] Create `Footer.module.scss`:
  - Footer layout
  - Section styling
  - Link styling
  - Social icons
  - Use CSS tokens
  - Responsive layout
- [ ] Create/update `Footer.test.tsx`:
  - Test rendering
  - Test links
  - Test sections
- [ ] Commit with message: `refactor: update Footer with CSS Module`

**Acceptance Criteria:**
- ✅ No Tailwind classes
- ✅ Uses CSS tokens
- ✅ Well-structured and accessible
- ✅ 80%+ test coverage

**Files to Modify:**
- `src/components/Footer.tsx`

**Files to Create:**
- `src/components/Footer.module.scss`
- `src/components/Footer.test.tsx` (if doesn't exist)

---

## Phase 6 Summary

**Total Duration:** 3 weeks  
**Total Tasks:** 5  
**Parallelizable:** Tasks 6.2, 6.3, 6.4, 6.5 can run mostly in parallel  
**Critical Path:** 6.1 → (6.2, 6.3, 6.4 parallel)

**End State:**
- ✅ HomePage fully functional (no Tailwind)
- ✅ PackagePage implemented (all features)
- ✅ APIVersionPage implemented (all features)
- ✅ DocumentationPage implemented (markdown rendering)
- ✅ Footer updated (no Tailwind)
- ✅ All pages use CSS tokens
- ✅ Feature parity with Angular version
- ✅ 80%+ test coverage for all pages

**Ready to Proceed to Phase 7:** Testing & Quality Assurance

---

## Phase 7: Testing & Quality Assurance

**Duration:** 2 weeks  
**Goal:** Achieve 80%+ coverage, E2E tests, accessibility audit  
**Blocking:** Production deployment depends on quality gates

### Task 7.1: Achieve 80%+ Unit Test Coverage 🔴 CRITICAL

**Issue Title:** `[Phase 7] Achieve 80%+ unit test coverage`

**Description:**
Fill any gaps in unit test coverage to reach 80%+ across the codebase.

**Dependencies:** All previous tasks (components, hooks, pages exist)

**Effort:** 15-20 hours

**Priority:** 🔴 CRITICAL - Quality gate

**Can Parallelize:** ✅ Yes - Multiple people can test different areas

**Tasks:**
- [ ] Run coverage report: `npm run test -- --coverage`
- [ ] Identify uncovered code
- [ ] Write missing tests for:
  - Components with <80% coverage
  - Hooks with <80% coverage
  - Utilities with <80% coverage
  - Pages with <80% coverage
- [ ] Focus on critical paths first
- [ ] Test edge cases and error scenarios
- [ ] Commit with message: `test: improve test coverage to 80%+`

**Acceptance Criteria:**
- ✅ Overall coverage ≥ 80%
- ✅ Line coverage ≥ 80%
- ✅ Branch coverage ≥ 75%
- ✅ Function coverage ≥ 80%
- ✅ All critical paths tested

**Files to Modify:**
- Various test files across codebase

---

### Task 7.2: Write Integration Tests 🟠 HIGH

**Issue Title:** `[Phase 7] Write integration tests for key user flows`

**Description:**
Write integration tests that test multiple components working together.

**Dependencies:** Task 7.1 (Understanding of test patterns)

**Effort:** 10-12 hours

**Priority:** 🟠 HIGH - User flow validation

**Can Parallelize:** ✅ Yes - Different flows can be tested in parallel

**Tasks:**
- [ ] Create `tests/integration/` directory (if doesn't exist)
- [ ] Write integration test for HomePage:
  - Load packages
  - Apply filters
  - Search packages
  - Navigate to package
- [ ] Write integration test for PackagePage:
  - Load package details
  - Display API versions
  - Navigate to API version
- [ ] Write integration test for APIVersionPage:
  - Load API version
  - Copy to clipboard
  - Open modal
- [ ] Mock API responses
- [ ] Commit with message: `test: add integration tests for key flows`

**Acceptance Criteria:**
- ✅ Main user flows covered
- ✅ Tests pass consistently
- ✅ Mock data realistic
- ✅ Clear test descriptions

**Files to Create:**
- `tests/integration/HomePage.integration.test.tsx`
- `tests/integration/PackagePage.integration.test.tsx`
- `tests/integration/APIVersionPage.integration.test.tsx`

---

### Task 7.3: Write E2E Tests 🟠 HIGH

**Issue Title:** `[Phase 7] Write E2E tests with Playwright`

**Description:**
Write end-to-end tests that test the full application flow in a browser.

**Dependencies:** All pages implemented

**Effort:** 12-15 hours

**Priority:** 🟠 HIGH - Final validation

**Can Parallelize:** ✅ Yes - Different scenarios can be tested in parallel

**Tasks:**
- [ ] Set up Playwright (if not already done)
- [ ] Write E2E test: Homepage to Package to API Version
  - Navigate to homepage
  - Search for package
  - Click on package card
  - Verify package details
  - Click on API version
  - Verify API version details
  - Test copy to clipboard
- [ ] Write E2E test: Documentation pages
  - Navigate to doc page
  - Verify markdown rendering
  - Test navigation
- [ ] Write E2E test: Filters
  - Apply category filter
  - Apply provider filter
  - Clear filters
- [ ] Commit with message: `test: add E2E tests with Playwright`

**Acceptance Criteria:**
- ✅ Critical user journeys tested
- ✅ Tests run in CI
- ✅ Tests pass consistently
- ✅ Clear failure messages

**Files to Create:**
- `tests/e2e/navigation.spec.ts`
- `tests/e2e/filters.spec.ts`
- `tests/e2e/documentation.spec.ts`

---

### Task 7.4: Accessibility Audit & Fixes 🔴 CRITICAL

**Issue Title:** `[Phase 7] Conduct accessibility audit and fix issues`

**Description:**
Run accessibility checks and fix any WCAG 2.1 Level AA violations.

**Dependencies:** All pages and components complete

**Effort:** 10-12 hours

**Priority:** 🔴 CRITICAL - Compliance requirement

**Can Parallelize:** ⚠️ Partial - Audit first, then parallel fixes

**Tasks:**
- [ ] Install axe DevTools or similar
- [ ] Run accessibility audit on all pages:
  - HomePage
  - PackagePage
  - APIVersionPage
  - DocumentationPage
- [ ] Document violations
- [ ] Fix issues:
  - Missing ARIA labels
  - Insufficient color contrast
  - Missing alt text
  - Keyboard navigation issues
  - Focus management
- [ ] Re-run audit to verify fixes
- [ ] Add axe tests to test suite
- [ ] Commit with message: `a11y: fix accessibility violations (WCAG 2.1 AA)`

**Acceptance Criteria:**
- ✅ No WCAG 2.1 Level AA violations
- ✅ Keyboard navigation works throughout
- ✅ Screen reader compatible
- ✅ Color contrast meets standards
- ✅ Automated a11y tests added

**Files to Modify:**
- Various component and page files

---

### Task 7.5: Performance Optimization 🟡 MEDIUM

**Issue Title:** `[Phase 7] Optimize application performance`

**Description:**
Analyze and optimize application performance (bundle size, load time, runtime).

**Dependencies:** All features complete

**Effort:** 8-10 hours

**Priority:** 🟡 MEDIUM - User experience

**Can Parallelize:** ⚠️ After analysis, fixes can be parallel

**Tasks:**
- [ ] Run Lighthouse audit
- [ ] Analyze bundle size with webpack-bundle-analyzer
- [ ] Optimize images (compression, lazy loading)
- [ ] Code splitting for pages
- [ ] Lazy load components where appropriate
- [ ] Memoize expensive computations
- [ ] Optimize re-renders (React.memo where needed)
- [ ] Verify bundle size < 200KB gzipped
- [ ] Achieve Lighthouse score > 90
- [ ] Commit with message: `perf: optimize application performance`

**Acceptance Criteria:**
- ✅ Bundle size < 200KB gzipped
- ✅ Lighthouse score > 90
- ✅ Time to Interactive < 3s
- ✅ No unnecessary re-renders
- ✅ Images optimized

**Files to Modify:**
- Various component files
- `rsbuild.config.ts` (code splitting)

---

### Task 7.6: Cross-Browser Testing 🟡 MEDIUM

**Issue Title:** `[Phase 7] Test application across major browsers`

**Description:**
Test application functionality and appearance across major browsers.

**Dependencies:** All features complete

**Effort:** 6-8 hours

**Priority:** 🟡 MEDIUM - Compatibility

**Can Parallelize:** ✅ Yes - Different browsers can be tested in parallel

**Tasks:**
- [ ] Test on Chrome (latest)
- [ ] Test on Firefox (latest)
- [ ] Test on Safari (latest)
- [ ] Test on Edge (latest)
- [ ] Test on mobile browsers (iOS Safari, Chrome Mobile)
- [ ] Document any browser-specific issues
- [ ] Fix compatibility issues
- [ ] Add browser-specific CSS if needed
- [ ] Commit with message: `fix: resolve cross-browser compatibility issues`

**Acceptance Criteria:**
- ✅ Works on all major browsers
- ✅ Visual consistency across browsers
- ✅ No JavaScript errors
- ✅ Mobile responsive

**Files to Modify:**
- CSS files (browser-specific fixes if needed)
- Component files (polyfills if needed)

---

## Phase 7 Summary

**Total Duration:** 2 weeks  
**Total Tasks:** 6  
**Parallelizable:** Most tasks can run in parallel after initial setup  
**Critical Path:** 7.1 → 7.4 (coverage and accessibility are blockers)

**End State:**
- ✅ 80%+ test coverage (unit tests)
- ✅ Integration tests for key flows
- ✅ E2E tests with Playwright
- ✅ WCAG 2.1 Level AA compliant
- ✅ Performance optimized (Lighthouse > 90)
- ✅ Cross-browser compatible
- ✅ Ready for production deployment

**Ready to Proceed to Phase 8:** Final Polish & Documentation

---

## Phase 8: Final Polish & Documentation

**Duration:** 1 week  
**Goal:** Documentation, final cleanup, deployment preparation  
**Blocking:** Production launch

### Task 8.1: Create Component Documentation 🟠 HIGH

**Issue Title:** `[Phase 8] Document all components and their usage`

**Description:**
Create comprehensive documentation for all components.

**Dependencies:** All components complete

**Effort:** 8-10 hours

**Priority:** 🟠 HIGH - Contributor onboarding

**Can Parallelize:** ✅ Yes - Different sections can be documented in parallel

**Tasks:**
- [ ] Create `docs/COMPONENTS.md`:
  - Overview of component library
  - Link to each component
- [ ] Document each component:
  - Props and their types
  - Usage examples
  - CSS tokens used
  - Accessibility features
- [ ] Add prop-types or TypeScript prop documentation
- [ ] Include screenshots (optional but nice)
- [ ] Commit with message: `docs: add component documentation`

**Acceptance Criteria:**
- ✅ All components documented
- ✅ Props clearly explained
- ✅ Usage examples provided
- ✅ Easy for contributors to understand

**Files to Create:**
- `docs/COMPONENTS.md`
- Component-specific docs (if separate files)

---

### Task 8.2: Update README and Contributing Guide 🟠 HIGH

**Issue Title:** `[Phase 8] Update README and CONTRIBUTING.md`

**Description:**
Update project documentation with React migration information.

**Dependencies:** Migration complete

**Effort:** 4-5 hours

**Priority:** 🟠 HIGH - Project documentation

**Can Parallelize:** ⚠️ Can work with 8.1

**Tasks:**
- [ ] Update `README.md`:
  - Update tech stack (React instead of Angular)
  - Update setup instructions
  - Update build commands
  - Add link to component documentation
  - Add link to CSS token documentation
- [ ] Update `CONTRIBUTING.md`:
  - Development workflow
  - Code style guide
  - How to use CSS tokens
  - How to create components
  - Testing requirements
  - PR guidelines
- [ ] Commit with message: `docs: update README and contributing guide`

**Acceptance Criteria:**
- ✅ README reflects current state
- ✅ Setup instructions accurate
- ✅ Contributing guide helpful
- ✅ Clear and well-formatted

**Files to Modify:**
- `README.md`
- `CONTRIBUTING.md`

---

### Task 8.3: Create Analytics Context 🟡 MEDIUM

**Issue Title:** `[Phase 8] Implement Google Analytics integration`

**Description:**
Create analytics context for tracking page views and events.

**Dependencies:** None (can be done anytime)

**Effort:** 4-5 hours

**Priority:** 🟡 MEDIUM - Tracking

**Can Parallelize:** ✅ Yes - Independent feature

**Tasks:**
- [ ] Create `src/context/AnalyticsContext.tsx`:
  - Google Analytics gtag integration
  - Track page views on route change
  - Provide trackEvent function
  - Only track in production
- [ ] Update `src/App/App.tsx`:
  - Wrap app with AnalyticsProvider
- [ ] Add Google Analytics script to index.html
- [ ] Test tracking in browser
- [ ] Commit with message: `feat: add Google Analytics integration`

**Acceptance Criteria:**
- ✅ Page views tracked automatically
- ✅ Event tracking available
- ✅ Only tracks in production
- ✅ Privacy-conscious implementation

**Files to Create:**
- `src/context/AnalyticsContext.tsx`

**Files to Modify:**
- `src/App/App.tsx`
- `index.html` (GA script)

---

### Task 8.4: Final Code Cleanup 🟡 MEDIUM

**Issue Title:** `[Phase 8] Final code cleanup and consistency check`

**Description:**
Final pass to ensure code consistency, remove dead code, and clean up.

**Dependencies:** All features complete

**Effort:** 6-8 hours

**Priority:** 🟡 MEDIUM - Code quality

**Can Parallelize:** ✅ Yes - Different areas can be cleaned in parallel

**Tasks:**
- [ ] Run linter and fix all issues
- [ ] Remove console.logs and debug code
- [ ] Remove commented-out code
- [ ] Verify all files have license headers
- [ ] Check for unused imports
- [ ] Check for unused variables
- [ ] Ensure consistent naming conventions
- [ ] Format all files with Prettier
- [ ] Commit with message: `chore: final code cleanup`

**Acceptance Criteria:**
- ✅ No linter errors
- ✅ No console.logs
- ✅ No commented code
- ✅ Consistent formatting
- ✅ Clean codebase

**Files to Modify:**
- Various files across codebase

---

### Task 8.5: Create Migration Completion Report 🟠 HIGH

**Issue Title:** `[Phase 8] Document migration completion and lessons learned`

**Description:**
Create final report documenting the migration process and outcomes.

**Dependencies:** Migration complete

**Effort:** 3-4 hours

**Priority:** 🟠 HIGH - Project documentation

**Can Parallelize:** ✅ Yes - Can work alongside other tasks

**Tasks:**
- [ ] Create `docs/MIGRATION_COMPLETE.md`:
  - Summary of what was accomplished
  - Metrics (before/after)
    - Bundle size comparison
    - Performance comparison
    - Test coverage
  - Lessons learned
  - Known issues (if any)
  - Future improvements
- [ ] Update project milestones
- [ ] Close migration-related issues
- [ ] Commit with message: `docs: add migration completion report`

**Acceptance Criteria:**
- ✅ Comprehensive summary
- ✅ Metrics documented
- ✅ Lessons learned captured
- ✅ Clear and informative

**Files to Create:**
- `docs/MIGRATION_COMPLETE.md`

---

### Task 8.6: Deployment Configuration 🔴 CRITICAL

**Issue Title:** `[Phase 8] Configure production deployment`

**Description:**
Set up production build configuration and deployment process.

**Dependencies:** All features complete and tested

**Effort:** 4-5 hours

**Priority:** 🔴 CRITICAL - Production readiness

**Can Parallelize:** ❌ No - Final step

**Tasks:**
- [ ] Verify production build works: `npm run build`
- [ ] Set up environment variables for production
- [ ] Configure API URLs for production
- [ ] Set up CI/CD pipeline (if not already done)
- [ ] Create deployment documentation
- [ ] Test production build locally
- [ ] Deploy to staging environment
- [ ] Verify staging works correctly
- [ ] Commit with message: `chore: configure production deployment`

**Acceptance Criteria:**
- ✅ Production build successful
- ✅ Environment variables configured
- ✅ Staging deployment works
- ✅ Deployment documented
- ✅ Ready for production

**Files to Modify:**
- `rsbuild.config.ts` (production config)
- `src/config/environment.ts` (production URLs)
- CI/CD configuration files

**Files to Create:**
- `docs/DEPLOYMENT.md`

---

## Phase 8 Summary

**Total Duration:** 1 week  
**Total Tasks:** 6  
**Parallelizable:** Most tasks except 8.6 which is final  
**Critical Path:** (8.1, 8.2, 8.3, 8.4, 8.5 parallel) → 8.6

**End State:**
- ✅ Complete component documentation
- ✅ Updated README and contributing guide
- ✅ Google Analytics integrated
- ✅ Codebase clean and consistent
- ✅ Migration completion report
- ✅ Production deployment ready
- ✅ **MIGRATION COMPLETE!** 🎉

---

## 🎯 Final Summary

### Total Effort

**Timeline:** 12-14 weeks (open-source pace)  
**Total Tasks:** 73 tasks across 8 phases  
**Estimated Hours:** 450-550 hours total

### Phases Recap

| Phase | Duration | Tasks | Key Deliverables |
|-------|----------|-------|------------------|
| Phase 1 | 2 weeks | 5 | Foundation cleanup, SCSS setup |
| Phase 2 | 3 weeks | 10 | Complete CSS token system |
| Phase 3 | 3 weeks | 7 | Custom UI components |
| Phase 4 | 2 weeks | 9 | Hooks, services, utilities |
| Phase 5 | 2 weeks | 8 | Feature components |
| Phase 6 | 3 weeks | 5 | All pages implemented |
| Phase 7 | 2 weeks | 6 | Testing, quality, performance |
| Phase 8 | 1 week | 6 | Documentation, deployment |
| **Total** | **~14 weeks** | **73** | **Complete migration** |

### Success Metrics Achieved

- ✅ **0% Tailwind** - Completely removed
- ✅ **100% Custom CSS** - With token system
- ✅ **80%+ Test Coverage** - All code types
- ✅ **WCAG 2.1 Level AA** - Fully accessible
- ✅ **Lighthouse > 90** - Performance optimized
- ✅ **Feature Parity** - All Angular features migrated
- ✅ **Easy Theming** - CSS tokens enable quick customization

### What Was Built

1. **CSS Token System** - Complete design system with colors, spacing, typography, breakpoints
2. **7 Core UI Components** - Button, Input, Checkbox, Modal, Tooltip, Card, and more
3. **8 Feature Components** - SearchBar, FilterPanel, PackageCard, Breadcrumb, etc.
4. **8 Custom Hooks** - Data fetching, UI interactions, utilities
5. **4 Complete Pages** - Home, Package, APIVersion, Documentation
6. **Complete Service Layer** - API integration with proper typing
7. **Utility Functions** - Markdown, sanitization, provider utils
8. **Comprehensive Tests** - Unit, integration, E2E
9. **Full Documentation** - Components, tokens, contributing guide

### Ready for Production

The React application is now:
- ✅ Feature-complete
- ✅ Well-tested
- ✅ Accessible
- ✅ Performant
- ✅ Documented
- ✅ Themeable
- ✅ Maintainable

---

## 📝 Notes for Implementation

### For Project Maintainers

1. **Create GitHub Issues** - Use each task as a GitHub issue template
2. **Label Appropriately** - Use priority labels (critical, high, medium, low)
3. **Assign Milestones** - Group tasks by phase
4. **Track Progress** - Use GitHub Projects board
5. **Code Reviews** - Require review for all PRs (2-3 day turnaround)
6. **Testing Gate** - No merge without tests
7. **Documentation Gate** - No merge without documentation updates

### For Contributors

1. **Pick Tasks Marked as Parallelizable** - Multiple people can work simultaneously
2. **Follow the Dependencies** - Don't start tasks that depend on incomplete work
3. **Use CSS Tokens** - Never hardcode colors, spacing, etc.
4. **Write Tests** - Aim for 80%+ coverage on your code
5. **Follow Patterns** - Look at existing components for consistency
6. **Ask for Help** - Don't struggle alone, ask in discussions
7. **Document As You Go** - Update docs with your changes

### Issue Template Format

```markdown
## Description
[Task description from roadmap]

## Dependencies
- [ ] Task X.Y must be complete

## Effort Estimate
X-Y hours

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Files to Create/Modify
- `path/to/file1.ts`
- `path/to/file2.scss`

## Related Documentation
- Link to migration plan section
- Link to relevant docs
```

---

**Roadmap Created:** November 4, 2025  
**Status:** Ready for Implementation  
**Next Step:** Create GitHub issues from tasks and begin Phase 1

🚀 **Let's build an amazing React application!**

