# Complete Angular Frontend Analysis - hub.microcks.io

## 📋 Overview

**Project Name:** hub.microcks.io-frontend  
**Version:** 0.9.0-SNAPSHOT  
**Framework:** Angular 8.2.14  
**Author:** Laurent Broudoux  
**License:** Apache-2.0  

The Angular frontend is a web application that allows users to browse, search, and view API mock packages for Microcks.

---

## 🏗️ General Architecture

### Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Application pages
│   │   ├── services/       # Services (API calls)
│   │   └── models/         # TypeScript data models
│   ├── assets/             # Static resources
│   └── environments/       # Environment configuration
└── e2e/                    # End-to-end tests
```

---

## 📦 Main Dependencies

### Framework & Core
- **Angular 8.2.14** - Main framework
- **RxJS 6.4.0** - Reactive programming
- **TypeScript** - Development language
- **Zone.js 0.9.1** - Angular change detection

### UI/UX
- **Bootstrap 4.4.1** - CSS framework
- **ngx-bootstrap 5.6.2** - Bootstrap components for Angular
- **Font Awesome 4.7.0** - Icons
- **jQuery 3.4.1** - DOM manipulation (for Bootstrap)
- **Popper.js 1.16.0** - Tooltips and popovers

### Specific Features
- **Showdown 1.9.1** - Markdown to HTML conversion
- **sanitize-html 1.20.1** - HTML sanitization for security
- **copy-to-clipboard 3.2.0** - Clipboard copy functionality

### Development Tools
- **Angular CLI 8.3.29** - Build and development tool
- **Karma & Jasmine** - Unit testing framework
- **Protractor** - End-to-end tests
- **TSLint & Codelyzer** - TypeScript linting

---

## 🎯 Features & Functionality

### 1. **Navigation and Routing**

#### Defined Routes (app-routing.module.ts)

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePageComponent | Home page with package list |
| `/package/:packageId` | PackagePageComponent | Package details |
| `/package/:packageId/api/:apiVersionId` | APIVersionPageComponent | API version details |
| `/doc/:page` | DocumentationPageComponent | Documentation pages |

### 2. **Package Management**

#### Service: PackagesService
**Location:** `src/app/services/packages.service.ts`

**API Endpoints:**
- `GET /api/mocks` - Retrieves all packages
- `GET /api/mocks/:name` - Retrieves a specific package
- `GET /api/mocks/:packageName/apis` - Retrieves API versions for a package
- `GET /api/mocks/:packageName/apis/:apiVersionName` - Retrieves a specific API version

### 3. **Analytics and Tracking**

**Integrated Google Analytics** via gtag
- Tracking ID: `G-MP6ZKCGWBC` (in production)
- Automatic navigation tracking
- Configuration in `environment.prod.ts`

---

## 📄 Application Pages

### 1. HomePage (`home.page.ts`)

**Route:** `/`

**Features:**
- Display of complete list of available packages
- **Category filtering** (single selection)
- **Provider filtering** (multiple selection, max 6 displayed initially)
- **Text search** with URL synchronization (query param `search`)
- Package **sorting**
- Available API counting
- Display of filtered package count

**Interactions:**
- Real-time search via input
- Clear button to erase search
- Toggle provider filters
- Category selection/deselection
- Navigation to package detail pages

**Displayed Data:**
- Package thumbnail
- Name and description
- Provider
- Categories
- Number of available APIs

---

### 2. PackagePage (`package.page.ts`)

**Route:** `/package/:packageId`

**Features:**
- Display of specific package details
- List of available APIs in the package
- Markdown to HTML conversion for long description
- Navigation breadcrumb

**Displayed Data:**
- Package image and name
- Short and long description (Markdown)
- List of available API versions
- Package provider
- Metadata (categories, source, maturity)

**Navigation:**
- Link to each API version in the package
- Breadcrumb: Home > Package Name

---

### 3. APIVersionPage (`apiVersion.page.ts`)

**Route:** `/package/:packageId/api/:apiVersionId`

**Features:**
- Complete API version details
- **Capability level display** (mocks, assertions)
- **Copy to clipboard** (GUI and CLI commands)
- Bootstrap tooltips
- Modal for installation instructions
- Markdown conversion of description

**Displayed Data:**
- API image and information
- Detailed description (Markdown)
- Version and capability level
- **Contracts** (types and URLs)
- **Links** (documentation, repo, etc.)
- **Maintainers** (name and email)
- **Keywords**
- Import commands for Microcks

**Capability Levels:**
- "Full Mocks" → mocks-level-2.svg icon
- "Mocks + Assertions" → mocks-level-2.svg icon
- Others → mocks-level-1.svg icon

---

### 4. DocumentationPage (`doc.page.ts`)

**Route:** `/doc/:page`

**Features:**
- Dynamic loading of Markdown pages from `/documentation/:page.md`
- Markdown to HTML conversion
- Automatic title generation (from route parameter)

**Title Transformation:**
- Replaces dashes with spaces
- Capitalizes first letter

---

## 🧩 Components

### 1. HeaderBarComponent

**Selector:** `<header-bar>`  
**Location:** `src/app/components/header-bar/`

**Features:**
- Main navigation bar
- **Search field** with clear button
- **Scroll effect** - "scrolled" CSS class applied after 30px of scrolling
- Search value state management

**Events:**
- `window:scroll` - Detects scroll to apply visual effect

---

### 2. FooterBarComponent

**Selector:** `<footer-bar>`  
**Location:** `src/app/components/footer-bar/`

**Features:**
- Application footer
- Legal information and links
- ViewEncapsulation.None encapsulation

---

### 3. AppComponent

**Selector:** `<app-root>`  
**Location:** `src/app/app.component.ts`

**Features:**
- Root component of the application
- **Google Analytics configuration**
- Navigation event listening (NavigationEnd)
- Global layout with header, router-outlet and footer

**HTML Structure:**
```html
<div class="mh-page">
  <header-bar></header-bar>
  <router-outlet></router-outlet>
  <footer-bar></footer-bar>
</div>
```

---

## 📊 Data Models

**Location:** `src/app/models/package.model.ts`

### 1. APIPackage

```typescript
{
  name: string;              // Unique identifier
  displayName: string;       // Display name
  categories: string[];      // Package categories
  createdAt: Date;          // Creation date
  updatedAt: Date;          // Update date
  description: string;       // Short description
  imgUrl: string;           // Full image URL
  thumbUrl: string;         // Thumbnail URL
  provider: string;         // Provider
  source: string;           // Package source
  maturity: string;         // Maturity level
  longDescription: string;  // Long description (Markdown)
  apis: APISummary[];       // List of APIs
}
```

### 2. APISummary

```typescript
{
  name: string;              // API name
  currentVersion: string;    // Current version
  versions: APINameVersion[]; // All versions
}
```

### 3. APINameVersion

```typescript
{
  name: string;    // Version name
  version: string; // Version number
}
```

### 4. APIVersion

```typescript
{
  id: string;                  // Identifier
  name: string;                // Name
  displayName: string;         // Display name
  version: string;             // Version
  versionForCompare: string;   // Version for comparison
  createdAt: string;           // Creation date
  replaces: string;            // Replaced version
  description: string;         // Description (Markdown)
  imgUrl: string;              // Image
  thumbUrl: string;            // Thumbnail
  capabilityLevel: string;     // Capability level
  contracts: Contract[];       // Available contracts
  links: Link[];              // Useful links
  maintainers: Maintainer[];  // Maintainers
  keywords: string;           // Keywords
  packageName: string;        // Parent package name
}
```

### 5. Contract

```typescript
{
  type: string;  // Contract type (OpenAPI, AsyncAPI, etc.)
  url: string;   // Contract URL
}
```

### 6. Link

```typescript
{
  name: string;  // Link name
  url: string;   // URL
}
```

### 7. Maintainer

```typescript
{
  name: string;   // Maintainer name
  email: string;  // Contact email
}
```

---

## 🔧 Utilities & Helpers

### Markdown Converter

**Location:** `src/app/components/markdown.ts`

**Features:**
- Markdown to HTML conversion via Showdown
- **HTML sanitization** for security (sanitize-html)
- Support for:
  - Tables
  - Links opening in new tab
  - Strikethrough
  - Emojis

**Showdown Options:**
```typescript
{
  tables: true,
  openLinksInNewWindow: true,
  strikethrough: true,
  emoji: true
}
```

**Allowed HTML Tags:**
- Formatting: `b`, `i`, `strike`, `s`, `del`, `em`, `strong`
- Structure: `p`, `h1-h4`, `ul`, `ol`, `li`
- Code: `code`, `pre`
- Tables: `table`, `thead`, `tbody`, `tr`, `td`, `th`
- Links: `a`

---

## 🌍 Environments

### Development (`environment.ts`)
```typescript
{
  production: false,
  ga_tracking_id: null
}
```

### Production (`environment.prod.ts`)
```typescript
{
  production: true,
  ga_tracking_id: 'G-MP6ZKCGWBC'
}
```

---

## 🎨 Styles & Assets

### CSS
- **Bootstrap 4** (bootstrap.min.css)
- **Font Awesome 4** for icons
- Custom styles in `styles.css`

### Images
**Location:** `src/assets/images/`

- `hub-microcks.svg` - Hub logo
- `microcks.svg` - Microcks logo
- `header-bg.png` - Header background image
- `git-repos-organization.png` - Illustration
- `mocks-level-1.svg` - Basic mocks level badge
- `mocks-level-2.svg` - Advanced mocks level badge
- `mocks-level-3.svg` - Complete mocks level badge
- `default.png` - Default image (in `/public/logos/`)

---

## 🔍 Search and Filtering Features

### Text Search (HomePage)

**Mechanism:**
1. Input in the header-bar
2. `keyup` event captured via Renderer2
3. Value synchronized with query param `?search=...`
4. Real-time package filtering

**Filters applied to:**
- Package name
- Description
- Provider
- Categories

### Category Filtering

- **Single selection** (radio-like behavior)
- Visual display of selected category
- Deselect button (close icon)

### Provider Filtering

- **Multiple selection** (checkboxes)
- Display limited to 6 providers initially
- "Show X more" button to display all providers
- Counter of number of packages per provider
- **Provider name cleanup** (removal of ", Inc.", " LLC", etc.)

### "Other" Category

- Packages without assigned category are grouped in "Other"

---

## 📱 Responsive Design

- **Responsive Container:** `container-sm`
- **Grid System:** Bootstrap 4 grid system
  - `col-md-*` for desktop
  - `col-sm-*` for tablets
  - `col-xs-*` for mobile
- **Push Columns:** Column reorganization for different screen sizes

---

## 🧪 Tests

### Unit Tests
- **Framework:** Jasmine 3.99.1
- **Runner:** Karma 4.4.1
- **Configuration:** `karma.conf.js`
- **Command:** `npm test`

### E2E Tests
- **Framework:** Protractor
- **Configuration:** `e2e/protractor.conf.js`
- **Spec:** `e2e/src/app.e2e-spec.ts`
- **Page Object:** `e2e/src/app.po.ts`
- **Command:** `npm run e2e`

---

## 🚀 Available NPM Scripts

```json
{
  "start": "ng serve",           // Development server
  "build": "ng build",           // Development build
  "build-prod": "ng build --prod", // Production build
  "test": "ng test",             // Unit tests
  "lint": "ng lint",             // Code linting
  "e2e": "ng e2e"               // End-to-end tests
}
```

---

## 🔒 Security

### HTML Sanitization
- **Library:** sanitize-html
- **Context:** Markdown to HTML conversion
- **Protection against:** XSS, script injection

### Content Security Policy
- External content management (images, scripts)
- Contract and link URL validation

---

## 📝 Build Configuration

### Angular Configuration (`angular.json`)

**Output:**
- Folder: `dist/`
- Copied assets: `favicon.ico`, `src/assets`

**Included Styles:**
1. Font Awesome CSS
2. Bootstrap CSS
3. Custom styles

**Polyfills:**
- Support for older browsers
- Configuration in `polyfills.ts`

**TypeScript:**
- App configuration: `tsconfig.app.json`
- Specs configuration: `tsconfig.spec.json`
- Global configuration: `tsconfig.json`

---

## 🔄 Data Flow

### 1. Initial Load (HomePage)
```
HomePage.ngOnInit()
  → PackagesService.getPackages()
    → GET /api/mocks
      → packages[]
        → initializeAvailableCategories()
        → initializeAvailableProviders()
          → filteredPackages[]
```

### 2. Navigation to a Package
```
User clicks package
  → Router navigate /package/:packageId
    → PackagePageComponent.ngOnInit()
      → PackagesService.getPackage(packageId)
        → GET /api/mocks/:packageId
          → resolvedPackage
      → PackagesService.getLatestAPIVersions(packageId)
        → GET /api/mocks/:packageId/apis
          → resolvedAPIVersions[]
```

### 3. Navigation to an API Version
```
User clicks API version
  → Router navigate /package/:packageId/api/:apiVersionId
    → APIVersionPageComponent.ngOnInit()
      → PackagesService.getPackage(packageId)
        → resolvedPackage
      → PackagesService.getAPIVersion(packageId, apiVersionId)
        → GET /api/mocks/:packageId/apis/:apiVersionId
          → resolvedAPIVersion
            → Matching resolvedPackageAPI from package.apis
```

---

## 🎯 Identified Improvement Points

### 1. **Angular Version**
- Angular 8 is obsolete (EOL since 2020)
- Recommendation: Upgrade to Angular 17/18

### 2. **Security Dependencies**
- jQuery could be removed (heavy dependency)
- Some dependencies have old versions

### 3. **TypeScript**
- TSLint is deprecated → Migration to ESLint recommended

### 4. **Tests**
- Spec files to verify/complete
- Coverage to improve

### 5. **Performance**
- Module lazy loading not implemented
- Bundle optimization possible

### 6. **Accessibility**
- Possible improvement of ARIA attributes
- Keyboard navigation to verify

---

## 📚 Related Documentation

### Available Documentation Pages
- `about.md` - About the hub
- `create-api-mocks.md` - Create API mocks
- `how-to-contribute.md` - Contribution guide
- `package-api-mocks.md` - Package API mocks
- `submit-your-api-package.md` - Submit a package

**Access route:** `/doc/:page`

---

## 🌟 Main Features Summary

### ✅ Implemented Features

1. **Package Catalog**
   - Complete list with thumbnails
   - Advanced search and filtering
   - Categorization

2. **Package Details**
   - Complete information
   - Markdown support
   - API list

3. **API Version Details**
   - Technical information
   - Available contracts
   - Import commands
   - Copy-to-clipboard

4. **Documentation**
   - Dynamic Markdown pages
   - Integrated navigation

5. **Analytics**
   - Integrated Google Analytics
   - Page view tracking

6. **Responsive Design**
   - Bootstrap 4
   - Mobile-friendly

---

## 📞 Contact & Maintenance

**Author:** Laurent Broudoux  
**License:** Apache-2.0  
**Project:** Hub Microcks.io

---

*Document generated on November 4, 2025*

