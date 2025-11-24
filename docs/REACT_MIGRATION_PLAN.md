# Angular to React Migration Plan - hub.microcks.io

## 📋 Executive Summary

**Source Framework:** Angular 8.2.14  
**Target Framework:** React 18+  
**Migration Type:** Complete rewrite  
**Styling Approach:** Custom CSS/SCSS with CSS Custom Properties (CSS Tokens)  
**Timeline Estimate:** 6-8 weeks  
**Complexity:** Medium-High

---

## 🎯 Migration Objectives

### Primary Goals
1. ✅ Modernize the tech stack (Angular 8 → React 18+)
2. ✅ Remove heavy dependencies (jQuery, Bootstrap JS)
3. ✅ Implement custom UI components (no external UI libraries)
4. ✅ Create themeable architecture with CSS tokens
5. ✅ Improve performance and bundle size
6. ✅ Maintain feature parity with Angular version

### Key Requirements
- **Custom Components:** All UI components built in-house
- **Styling:** Pure CSS/SCSS with CSS Custom Properties
- **Themeable:** Easy theme customization via CSS tokens
- **No CSS Frameworks:** No Tailwind, Bootstrap CSS, etc.
- **Modern Tooling:** Vite/Webpack 5, ESLint, Vitest

---

## 🏗️ Target Architecture

### Proposed Project Structure

```
react/
├── public/
│   ├── logos/
│   └── favicon.ico
├── src/
│   ├── main.tsx                    # Application entry point
│   ├── App.tsx                     # Root component
│   ├── routes/                     # Route definitions
│   │   └── index.tsx
│   ├── pages/                      # Page components
│   │   ├── HomePage/
│   │   │   ├── HomePage.tsx
│   │   │   ├── HomePage.module.scss
│   │   │   └── index.ts
│   │   ├── PackagePage/
│   │   │   ├── PackagePage.tsx
│   │   │   ├── PackagePage.module.scss
│   │   │   └── index.ts
│   │   ├── APIVersionPage/
│   │   │   ├── APIVersionPage.tsx
│   │   │   ├── APIVersionPage.module.scss
│   │   │   └── index.ts
│   │   └── DocumentationPage/
│   │       ├── DocumentationPage.tsx
│   │       ├── DocumentationPage.module.scss
│   │       └── index.ts
│   ├── components/                 # Reusable components
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   ├── Header.module.scss
│   │   │   └── index.ts
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   ├── Footer.module.scss
│   │   │   └── index.ts
│   │   ├── SearchBar/
│   │   ├── FilterPanel/
│   │   ├── PackageCard/
│   │   ├── Breadcrumb/
│   │   ├── Modal/
│   │   ├── Tooltip/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Checkbox/
│   │   └── CopyToClipboard/
│   ├── hooks/                      # Custom React hooks
│   │   ├── usePackages.ts
│   │   ├── useSearch.ts
│   │   ├── useFilters.ts
│   │   ├── useScrollEffect.ts
│   │   ├── useCopyToClipboard.ts
│   │   └── useAnalytics.ts
│   ├── services/                   # API services
│   │   ├── api.ts                  # API client configuration
│   │   └── packagesService.ts      # Package-related API calls
│   ├── types/                      # TypeScript type definitions
│   │   ├── package.types.ts
│   │   └── index.ts
│   ├── utils/                      # Utility functions
│   │   ├── markdown.ts
│   │   ├── sanitize.ts
│   │   ├── providerUtils.ts
│   │   └── routing.ts
│   ├── styles/                     # Global styles
│   │   ├── tokens/                 # CSS Custom Properties
│   │   │   ├── colors.scss
│   │   │   ├── spacing.scss
│   │   │   ├── typography.scss
│   │   │   ├── breakpoints.scss
│   │   │   └── index.scss
│   │   ├── base/                   # Base styles
│   │   │   ├── reset.scss
│   │   │   ├── typography.scss
│   │   │   └── layout.scss
│   │   ├── mixins/                 # SCSS mixins
│   │   │   ├── responsive.scss
│   │   │   ├── flexbox.scss
│   │   │   └── animations.scss
│   │   └── global.scss             # Global stylesheet
│   ├── context/                    # React Context providers
│   │   ├── ThemeContext.tsx
│   │   └── AnalyticsContext.tsx
│   └── config/                     # Configuration files
│       ├── environment.ts
│       └── constants.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── package.json
├── tsconfig.json
├── vite.config.ts                  # or webpack.config.js
├── vitest.config.ts
└── .eslintrc.js
```

---

## 🎨 CSS Tokens Architecture

### Design Token System

#### File: `src/styles/tokens/colors.scss`

```scss
:root {
  /* Primary Colors */
  --color-primary-50: #e3f2fd;
  --color-primary-100: #bbdefb;
  --color-primary-200: #90caf9;
  --color-primary-300: #64b5f6;
  --color-primary-400: #42a5f5;
  --color-primary-500: #2196f3;
  --color-primary-600: #1e88e5;
  --color-primary-700: #1976d2;
  --color-primary-800: #1565c0;
  --color-primary-900: #0d47a1;

  /* Semantic Colors */
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-text-disabled: #bdbdbd;
  --color-background-primary: #ffffff;
  --color-background-secondary: #f5f5f5;
  --color-background-dark: #263238;
  --color-border: #e0e0e0;
  --color-divider: #bdbdbd;

  /* State Colors */
  --color-success: #4caf50;
  --color-warning: #ff9800;
  --color-error: #f44336;
  --color-info: #2196f3;

  /* Component Specific */
  --color-header-bg: var(--color-background-dark);
  --color-header-text: #ffffff;
  --color-footer-bg: var(--color-background-dark);
  --color-card-bg: var(--color-background-primary);
  --color-card-border: var(--color-border);
  --color-card-hover-border: var(--color-primary-500);
}
```

#### File: `src/styles/tokens/spacing.scss`

```scss
:root {
  /* Base Spacing Unit (4px system) */
  --spacing-unit: 4px;
  
  /* Spacing Scale */
  --spacing-xxs: calc(var(--spacing-unit) * 1);   /* 4px */
  --spacing-xs: calc(var(--spacing-unit) * 2);    /* 8px */
  --spacing-sm: calc(var(--spacing-unit) * 3);    /* 12px */
  --spacing-md: calc(var(--spacing-unit) * 4);    /* 16px */
  --spacing-lg: calc(var(--spacing-unit) * 6);    /* 24px */
  --spacing-xl: calc(var(--spacing-unit) * 8);    /* 32px */
  --spacing-xxl: calc(var(--spacing-unit) * 12);  /* 48px */
  --spacing-xxxl: calc(var(--spacing-unit) * 16); /* 64px */

  /* Layout Spacing */
  --container-padding: var(--spacing-lg);
  --section-spacing: var(--spacing-xxl);
  --component-gap: var(--spacing-md);
}
```

#### File: `src/styles/tokens/typography.scss`

```scss
:root {
  /* Font Families */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                      'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif;
  --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;

  /* Font Sizes */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */
  --font-size-5xl: 3rem;      /* 48px */

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
}
```

#### File: `src/styles/tokens/breakpoints.scss`

```scss
:root {
  /* Breakpoint Values */
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;

  /* Container Max Widths */
  --container-sm: 540px;
  --container-md: 720px;
  --container-lg: 960px;
  --container-xl: 1140px;
  --container-xxl: 1320px;
}

/* SCSS Breakpoint Mixins */
@mixin respond-to($breakpoint) {
  @if $breakpoint == 'sm' {
    @media (min-width: 576px) { @content; }
  }
  @if $breakpoint == 'md' {
    @media (min-width: 768px) { @content; }
  }
  @if $breakpoint == 'lg' {
    @media (min-width: 992px) { @content; }
  }
  @if $breakpoint == 'xl' {
    @media (min-width: 1200px) { @content; }
  }
  @if $breakpoint == 'xxl' {
    @media (min-width: 1400px) { @content; }
  }
}
```

### Theme Customization Example

Users can easily customize the theme by overriding CSS tokens:

```scss
/* custom-theme.scss */
:root {
  /* Override primary color */
  --color-primary-500: #9c27b0;  /* Purple theme */
  --color-primary-600: #8e24aa;
  --color-primary-700: #7b1fa2;
  
  /* Override spacing for denser layout */
  --spacing-unit: 3px;
  
  /* Override typography */
  --font-family-base: 'Inter', sans-serif;
}
```

---

## 📦 Dependency Migration Map

### Angular → React Equivalents

| Angular Package | React Alternative | Purpose |
|----------------|-------------------|---------|
| `@angular/core` | `react` + `react-dom` | Core framework |
| `@angular/router` | `react-router-dom` v6+ | Routing |
| `@angular/forms` | Custom hooks / `react-hook-form` | Form handling |
| `@angular/common` | Built-in / Custom utilities | Common utilities |
| `rxjs` | Custom hooks / `useSWR` / `React Query` (optional) | Data fetching |
| `zone.js` | Not needed | Change detection |

### UI Dependencies to Remove

| Current | Action | Reason |
|---------|--------|--------|
| `bootstrap` | Remove | Building custom components |
| `ngx-bootstrap` | Remove | Angular-specific |
| `jquery` | Remove | Not needed in React |
| `popper.js` | Remove | Building custom tooltips |

### Dependencies to Keep/Replace

| Current | React Equivalent | Notes |
|---------|------------------|-------|
| `showdown` | `marked` or `react-markdown` | Markdown parsing |
| `sanitize-html` | `dompurify` | HTML sanitization |
| `copy-to-clipboard` | `navigator.clipboard` API | Native browser API |
| `font-awesome` | `react-icons` or SVG icons | Icon system |

### New Dependencies to Add

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "marked": "^11.0.0",
    "dompurify": "^3.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "typescript": "^5.3.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/dompurify": "^3.0.0",
    "eslint": "^8.55.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "sass": "^1.69.0",
    "playwright": "^1.40.0"
  }
}
```

---

## 🔄 Component Migration Strategy

### Phase 1: Foundation Components (Week 1-2)

#### 1.1 Layout Components

**Priority: CRITICAL**

##### App Component
```tsx
// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppRoutes } from './routes';

export function App() {
  return (
    <BrowserRouter>
      <AnalyticsProvider>
        <div className="mh-page">
          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AnalyticsProvider>
    </BrowserRouter>
  );
}
```

##### Header Component
```tsx
// src/components/Header/Header.tsx
import { useState, useEffect } from 'react';
import { SearchBar } from '../SearchBar';
import styles from './Header.module.scss';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/logos/hub-microcks.svg" alt="Hub Microcks" />
        </div>
        <SearchBar />
        <nav className={styles.nav}>
          {/* Navigation items */}
        </nav>
      </div>
    </header>
  );
}
```

##### Footer Component
```tsx
// src/components/Footer/Footer.tsx
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} Microcks.io</p>
        {/* Footer content */}
      </div>
    </footer>
  );
}
```

#### 1.2 UI Primitives

Build these custom components:

1. **Button Component**
   - Variants: primary, secondary, text
   - Sizes: sm, md, lg
   - States: default, hover, active, disabled

2. **Input Component**
   - Text input with label
   - Search input variant
   - Error state handling

3. **Checkbox Component**
   - Custom styled checkbox
   - Label support
   - Controlled component

4. **Modal Component**
   - Accessible dialog
   - Backdrop with click-outside
   - Focus trap
   - ESC key support

5. **Tooltip Component**
   - Position calculation
   - Hover/focus triggers
   - Accessible (aria-describedby)

---

### Phase 2: Page Components (Week 3-4)

#### 2.1 HomePage Migration

**Angular:** `home.page.ts`  
**React:** `src/pages/HomePage/HomePage.tsx`

```tsx
// src/pages/HomePage/HomePage.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePackages } from '../../hooks/usePackages';
import { FilterPanel } from '../../components/FilterPanel';
import { PackageCard } from '../../components/PackageCard';
import styles from './HomePage.module.scss';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const { packages, isLoading, error } = usePackages();

  const filteredPackages = useFilteredPackages(
    packages,
    searchQuery,
    selectedCategory,
    selectedProviders
  );

  useEffect(() => {
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading packages</div>;

  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <div className={styles.container}>
          <h1>Welcome to Hub Microcks.io</h1>
          <p>Discover and share API mocks for Microcks</p>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.container}>
          <FilterPanel
            categories={extractCategories(packages)}
            providers={extractProviders(packages)}
            selectedCategory={selectedCategory}
            selectedProviders={selectedProviders}
            onCategoryChange={setSelectedCategory}
            onProvidersChange={setSelectedProviders}
          />
          
          <div className={styles.packages}>
            <div className={styles.toolbar}>
              <span>{filteredPackages.length} Packages</span>
            </div>
            
            <div className={styles.grid}>
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.name} package={pkg} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### 2.2 PackagePage Migration

**Angular:** `package.page.ts`  
**React:** `src/pages/PackagePage/PackagePage.tsx`

```tsx
// src/pages/PackagePage/PackagePage.tsx
import { useParams } from 'react-router-dom';
import { usePackage } from '../../hooks/usePackage';
import { Breadcrumb } from '../../components/Breadcrumb';
import { MarkdownRenderer } from '../../components/MarkdownRenderer';
import { APIVersionList } from '../../components/APIVersionList';
import styles from './PackagePage.module.scss';

export function PackagePage() {
  const { packageId } = useParams<{ packageId: string }>();
  const { package: pkg, apiVersions, isLoading } = usePackage(packageId!);

  if (isLoading || !pkg) return <div>Loading...</div>;

  return (
    <div className={styles.packagePage}>
      <div className={styles.header}>
        <div className={styles.container}>
          <img src={pkg.thumbUrl} alt={pkg.displayName} />
          <div>
            <h1>{pkg.displayName}</h1>
            <p>{pkg.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.container}>
          <Breadcrumb items={[
            { label: 'Home', path: '/' },
            { label: pkg.displayName }
          ]} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <h2>Available APIs</h2>
            <APIVersionList versions={apiVersions} packageId={packageId!} />
          </aside>
          
          <div className={styles.main}>
            <MarkdownRenderer content={pkg.longDescription} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### 2.3 APIVersionPage Migration

**Angular:** `apiVersion.page.ts`  
**React:** `src/pages/APIVersionPage/APIVersionPage.tsx`

```tsx
// src/pages/APIVersionPage/APIVersionPage.tsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAPIVersion } from '../../hooks/useAPIVersion';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { Modal } from '../../components/Modal';
import { Tooltip } from '../../components/Tooltip';
import styles from './APIVersionPage.module.scss';

export function APIVersionPage() {
  const { packageId, apiVersionId } = useParams();
  const { apiVersion, isLoading } = useAPIVersion(packageId!, apiVersionId!);
  const { copy, isCopied } = useCopyToClipboard();
  const [showModal, setShowModal] = useState(false);

  if (isLoading || !apiVersion) return <div>Loading...</div>;

  const guiCommand = `microcks import ${apiVersion.contracts[0]?.url}`;
  const cliCommand = `microcks-cli import ${apiVersion.contracts[0]?.url}`;

  return (
    <div className={styles.apiVersionPage}>
      {/* Header */}
      <div className={styles.header}>
        <img src={apiVersion.thumbUrl} alt={apiVersion.displayName} />
        <div className={styles.info}>
          <h1>{apiVersion.displayName}</h1>
          <span className={styles.version}>v{apiVersion.version}</span>
          <img 
            src={getCapabilityIcon(apiVersion.capabilityLevel)} 
            alt={apiVersion.capabilityLevel}
            className={styles.capability}
          />
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <MarkdownRenderer content={apiVersion.description} />

        {/* Contracts */}
        <section className={styles.contracts}>
          <h2>Contracts</h2>
          {apiVersion.contracts.map(contract => (
            <div key={contract.type} className={styles.contract}>
              <span>{contract.type}</span>
              <a href={contract.url} target="_blank" rel="noopener">
                {contract.url}
              </a>
            </div>
          ))}
        </section>

        {/* Import Commands */}
        <section className={styles.commands}>
          <h2>Import to Microcks</h2>
          <div className={styles.command}>
            <code>{guiCommand}</code>
            <Tooltip content={isCopied ? 'Copied!' : 'Copy to clipboard'}>
              <button onClick={() => copy(guiCommand)}>
                {isCopied ? '✓' : '📋'}
              </button>
            </Tooltip>
          </div>
        </section>

        {/* Maintainers */}
        <section className={styles.maintainers}>
          <h2>Maintainers</h2>
          {apiVersion.maintainers.map(m => (
            <div key={m.email}>
              {m.name} - <a href={`mailto:${m.email}`}>{m.email}</a>
            </div>
          ))}
        </section>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {/* Installation instructions */}
      </Modal>
    </div>
  );
}
```

#### 2.4 DocumentationPage Migration

**Angular:** `doc.page.ts`  
**React:** `src/pages/DocumentationPage/DocumentationPage.tsx`

```tsx
// src/pages/DocumentationPage/DocumentationPage.tsx
import { useParams } from 'react-router-dom';
import { useDocumentation } from '../../hooks/useDocumentation';
import { MarkdownRenderer } from '../../components/MarkdownRenderer';
import styles from './DocumentationPage.module.scss';

export function DocumentationPage() {
  const { page } = useParams<{ page: string }>();
  const { content, isLoading } = useDocumentation(page!);

  const title = page
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={styles.documentationPage}>
      <div className={styles.container}>
        <h1>{title}</h1>
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
```

---

### Phase 3: Custom Hooks (Week 3-4)

#### 3.1 Data Fetching Hooks

```tsx
// src/hooks/usePackages.ts
import { useState, useEffect } from 'react';
import { packagesService } from '../services/packagesService';
import type { APIPackage } from '../types';

export function usePackages() {
  const [packages, setPackages] = useState<APIPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    packagesService.getPackages()
      .then(setPackages)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  return { packages, isLoading, error };
}
```

```tsx
// src/hooks/usePackage.ts
import { useState, useEffect } from 'react';
import { packagesService } from '../services/packagesService';
import type { APIPackage, APIVersion } from '../types';

export function usePackage(packageId: string) {
  const [pkg, setPkg] = useState<APIPackage | null>(null);
  const [apiVersions, setApiVersions] = useState<APIVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      packagesService.getPackage(packageId),
      packagesService.getLatestAPIVersions(packageId)
    ])
      .then(([packageData, versions]) => {
        setPkg(packageData);
        setApiVersions(versions);
      })
      .finally(() => setIsLoading(false));
  }, [packageId]);

  return { package: pkg, apiVersions, isLoading };
}
```

#### 3.2 UI Interaction Hooks

```tsx
// src/hooks/useScrollEffect.ts
import { useState, useEffect } from 'react';

export function useScrollEffect(threshold: number = 30) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
}
```

```tsx
// src/hooks/useCopyToClipboard.ts
import { useState, useCallback } from 'react';

export function useCopyToClipboard(timeout: number = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), timeout);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [timeout]);

  return { copy, isCopied };
}
```

```tsx
// src/hooks/useFilters.ts
import { useMemo } from 'react';
import type { APIPackage } from '../types';

export function useFilters(
  packages: APIPackage[],
  searchQuery: string,
  category: string | null,
  providers: string[]
) {
  return useMemo(() => {
    return packages.filter(pkg => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          pkg.name.toLowerCase().includes(query) ||
          pkg.displayName.toLowerCase().includes(query) ||
          pkg.description.toLowerCase().includes(query) ||
          pkg.provider.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (category && !pkg.categories.includes(category)) {
        return false;
      }

      // Provider filter
      if (providers.length > 0 && !providers.includes(pkg.provider)) {
        return false;
      }

      return true;
    });
  }, [packages, searchQuery, category, providers]);
}
```

---

### Phase 4: Services & Utils (Week 4-5)

#### 4.1 API Service

```tsx
// src/services/api.ts
const API_BASE_URL = '/api';

export async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
}
```

```tsx
// src/services/packagesService.ts
import { fetchJSON } from './api';
import type { APIPackage, APIVersion } from '../types';

export const packagesService = {
  getPackages: () => 
    fetchJSON<APIPackage[]>('/mocks'),

  getPackage: (name: string) => 
    fetchJSON<APIPackage>(`/mocks/${name}`),

  getLatestAPIVersions: (packageName: string) => 
    fetchJSON<APIVersion[]>(`/mocks/${packageName}/apis`),

  getAPIVersion: (packageName: string, apiVersionName: string) => 
    fetchJSON<APIVersion>(`/mocks/${packageName}/apis/${apiVersionName}`)
};
```

#### 4.2 Markdown Utils

```tsx
// src/utils/markdown.ts
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: false,
});

// Configure DOMPurify
const sanitizeConfig = {
  ALLOWED_TAGS: [
    'b', 'i', 'strike', 's', 'del', 'em', 'strong',
    'a', 'p', 'h1', 'h2', 'h3', 'h4',
    'ul', 'ol', 'li',
    'code', 'pre',
    'table', 'thead', 'tbody', 'tr', 'td', 'th',
    'br', 'hr'
  ],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class']
};

export function markdownToHtml(markdown: string): string {
  const html = marked(markdown);
  return DOMPurify.sanitize(html, sanitizeConfig);
}
```

#### 4.3 Provider Utils

```tsx
// src/utils/providerUtils.ts
const IGNORED_PROVIDER_TAILS = [', Inc.', ', Inc', ' Inc.', ' Inc', ', LLC', ' LLC'];

export function sanitizeProviderName(provider: string): string {
  if (!provider) return provider;
  
  for (const tail of IGNORED_PROVIDER_TAILS) {
    if (provider.endsWith(tail)) {
      return provider.slice(0, -tail.length);
    }
  }
  
  return provider;
}

export function extractProviders(packages: APIPackage[]): string[] {
  const providers = new Set<string>();
  
  packages.forEach(pkg => {
    const sanitized = sanitizeProviderName(pkg.provider);
    if (sanitized) providers.add(sanitized);
  });
  
  return Array.from(providers).sort();
}
```

---

### Phase 5: Analytics & Context (Week 5)

#### 5.1 Analytics Context

```tsx
// src/context/AnalyticsContext.tsx
import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface AnalyticsContextValue {
  trackEvent: (eventName: string, params?: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isProduction = import.meta.env.PROD;
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID;

  useEffect(() => {
    if (isProduction && trackingId && window.gtag) {
      window.gtag('config', trackingId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, isProduction, trackingId]);

  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (isProduction && window.gtag) {
      window.gtag('event', eventName, params);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within AnalyticsProvider');
  }
  return context;
}
```

---

## 🧪 Testing Strategy

### Unit Testing with Vitest

```tsx
// tests/unit/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });
});
```

### Integration Testing

```tsx
// tests/integration/HomePage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { HomePage } from '@/pages/HomePage';
import { packagesService } from '@/services/packagesService';

vi.mock('@/services/packagesService');

describe('HomePage Integration', () => {
  it('loads and displays packages', async () => {
    const mockPackages = [
      { name: 'test-api', displayName: 'Test API', /* ... */ }
    ];
    
    vi.mocked(packagesService.getPackages).mockResolvedValue(mockPackages);

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test API')).toBeInTheDocument();
    });
  });
});
```

### E2E Testing with Playwright

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test';

test('user can navigate through package details', async ({ page }) => {
  await page.goto('/');
  
  // Click on a package
  await page.click('text=Petstore API');
  
  // Verify we're on package page
  await expect(page).toHaveURL(/\/package\/petstore-api/);
  await expect(page.locator('h1')).toContainText('Petstore API');
  
  // Click on an API version
  await page.click('text=v1.0.0');
  
  // Verify we're on API version page
  await expect(page).toHaveURL(/\/package\/petstore-api\/api\/v1.0.0/);
});
```

---

## 📋 Migration Checklist

### Pre-Migration Tasks
- [ ] Set up new React project structure
- [ ] Configure build tools (Vite/Webpack)
- [ ] Set up TypeScript configuration
- [ ] Configure ESLint and Prettier
- [ ] Create CSS token system
- [ ] Set up testing infrastructure

### Phase 1: Foundation (Week 1-2)
- [ ] Create App component structure
- [ ] Build Header component
- [ ] Build Footer component
- [ ] Implement routing setup
- [ ] Build UI primitive components:
  - [ ] Button
  - [ ] Input
  - [ ] Checkbox
  - [ ] Modal
  - [ ] Tooltip
- [ ] Create base SCSS files and tokens

### Phase 2: Core Features (Week 3-4)
- [ ] Migrate HomePage
  - [ ] Package listing
  - [ ] Search functionality
  - [ ] Category filter
  - [ ] Provider filter
- [ ] Migrate PackagePage
  - [ ] Package details display
  - [ ] API version list
  - [ ] Markdown rendering
- [ ] Migrate APIVersionPage
  - [ ] API details display
  - [ ] Copy to clipboard
  - [ ] Modal interactions
- [ ] Migrate DocumentationPage

### Phase 3: Services & Hooks (Week 4-5)
- [ ] Implement API service layer
- [ ] Create data fetching hooks
- [ ] Create UI interaction hooks
- [ ] Implement utilities (markdown, sanitize, etc.)
- [ ] Set up Analytics context

### Phase 4: Polish & Testing (Week 5-6)
- [ ] Write unit tests (80%+ coverage)
- [ ] Write integration tests
- [ ] Write E2E tests
- [ ] Accessibility audit
- [ ] Performance optimization
- [ ] Cross-browser testing

### Phase 5: Documentation & Deployment (Week 6-7)
- [ ] Create component documentation
- [ ] Write migration guide
- [ ] Update README
- [ ] Set up CI/CD pipeline
- [ ] Deploy to staging
- [ ] User acceptance testing

### Phase 6: Production Deployment (Week 7-8)
- [ ] Production deployment
- [ ] Monitor error rates
- [ ] Monitor performance
- [ ] Collect user feedback
- [ ] Bug fixes and improvements

---

## 🎯 Success Metrics

### Performance Targets
- **Initial Load Time:** < 2s (90th percentile)
- **Time to Interactive:** < 3s
- **Bundle Size:** < 200KB (gzipped)
- **Lighthouse Score:** > 90

### Quality Targets
- **Test Coverage:** > 80%
- **Accessibility:** WCAG 2.1 Level AA
- **Browser Support:** Last 2 versions of major browsers
- **Mobile Responsive:** All pages mobile-friendly

### Feature Parity
- ✅ All Angular features migrated
- ✅ No regression in functionality
- ✅ Improved performance
- ✅ Better developer experience

---

## 🚨 Risks & Mitigation

### Risk 1: Timeline Overrun
**Mitigation:**
- Break work into smaller, reviewable chunks
- Daily progress tracking
- Buffer time in each phase (20%)

### Risk 2: Feature Gaps
**Mitigation:**
- Detailed feature comparison checklist
- Side-by-side testing during development
- User acceptance testing before launch

### Risk 3: Performance Issues
**Mitigation:**
- Performance budgets from day 1
- Regular performance testing
- Code splitting and lazy loading

### Risk 4: Styling Inconsistencies
**Mitigation:**
- CSS token system enforced
- Visual regression testing
- Design review checkpoints

---

## 📚 Resources & References

### Documentation
- [React Documentation](https://react.dev)
- [React Router v6](https://reactrouter.com)
- [Vite Guide](https://vitejs.dev/guide/)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Testing](https://playwright.dev)

### CSS Architecture
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [BEM Methodology](http://getbem.com/)
- [SCSS Documentation](https://sass-lang.com/documentation)

### Best Practices
- [React Best Practices 2024](https://react.dev/learn)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🎉 Expected Benefits

### Developer Experience
- ✅ Modern React 18+ with hooks
- ✅ Better TypeScript support
- ✅ Faster build times (Vite)
- ✅ Hot Module Replacement (HMR)
- ✅ Simpler component model

### User Experience
- ✅ Faster page loads
- ✅ Smaller bundle size
- ✅ Better mobile experience
- ✅ Smoother interactions

### Maintenance
- ✅ Easier to customize (CSS tokens)
- ✅ Better code organization
- ✅ Comprehensive test coverage
- ✅ Active framework support

### Theming
- ✅ Easy theme customization
- ✅ CSS-only theme switching
- ✅ No JavaScript required for themes
- ✅ Better consistency

---

## 📞 Support & Questions

For questions during migration:
- Technical lead review required for architectural decisions
- Daily standups for progress tracking
- Documentation updates as we go

---

*Migration Plan - Last Updated: November 4, 2025*

