---
applyTo: '**/*.jsx, **/*.tsx, **/*.js, **/*.ts, **/*.css, **/*.scss'
description: 'React development standards, best practices, and component instructions.'
---

# React Development Instructions

Instructions for building high-quality React applications with modern patterns, hooks, and best practices following the official React documentation at https://react.dev.

## Project Context
- Latest React version (React 19+)
- TypeScript for type safety
- Functional components with hooks as default
- Follow React's official style guide and best practices
- Use modern build tools (Vite, Create React App, or custom Webpack setup)
- Implement proper component composition and reusability patterns

---

## Component Architecture

### Naming and Structure Convention

- Components must always be placed in a folder/file `<ComponentName>/<ComponentName>.tsx`.
- Only one React component should be declared per file.
- The component name must be in PascalCase.
- The component must be a function, preferably an arrow function.
- The component must be exported at the declaration:

  ```tsx
  export const MyComponent = () => {};
  ```

### Component Design
- Follow the single responsibility principle for components.
- Use descriptive and consistent naming conventions.
- Implement proper prop validation with TypeScript.
- Design components to be testable and reusable.
- Keep components small and focused on a single concern.
- Use composition patterns (render props, children as functions).
- Organize components by feature or domain for scalability.
- Separate presentational and container components clearly.
- Implement proper component hierarchies with clear data flow.

### Development Principles
- Follow SOLID, DRY, KISS principles.
- Prefer code simplicity and clarity.
- Factorize common code.
- Do not declare more than one React component per file (`react/no-multi-comp`).
- Do not use conditional rendering that could cause leaked renders (`react/jsx-no-leaked-render`).
- Follow the `react/function-component-definition` rule: always declare components as arrow functions.
- Implement component composition over inheritance.

---

## TypeScript and Typing

### Type Declaration
- The props type must always be declared before the component.
- The type is named `<ComponentName>Props`.
- Use predefined types (e.g. `PropsWithChildren`) if children are needed.
- The type is used in the arrow function declaration:

  ```tsx
  type MyComponentProps = {};

  export const MyComponent = (props: MyComponentProps) => {};
  ```

- Never use `FC<MyComponentProps>`.
- Export the component type if necessary.

### TypeScript Best Practices
- Use TypeScript interfaces for props, state, and component definitions.
- Define proper types for event handlers and refs.
- Implement generic components where appropriate.
- Use strict mode in `tsconfig.json` for type safety.
- Create union types for component variants and states.

---

## State Management and Hooks

### useState and useReducer
- Use `useState` for simple, local component state.
- Use `useReducer` for complex state logic.
- Leverage `useContext` for sharing state across component trees.
- Consider external state management (Redux Toolkit, Zustand) for complex applications.
- Implement proper state normalization and data structures.
- Use React Query or SWR for server state management.

### Hooks Best Practices
- Avoid using the same hook multiple times in a component.
- Prefer deriving a value rather than multiplying hooks.

  Example:

  ```tsx
  // Bad practice
  const id1 = useId();
  const id2 = useId();
  // Good practice
  const id1 = useId();
  const id2 = `${id1}-id2`;
  ```

### useEffect and Custom Hooks
- Use `useEffect` with proper dependency arrays to avoid infinite loops.
- Implement cleanup functions in effects to prevent memory leaks.
- Create custom hooks for reusable stateful logic.
- Follow the rules of hooks (only call at the top level).
- Use `useRef` for accessing DOM elements and storing mutable values.
- Use `useMemo` and `useCallback` for performance optimization when needed.

---

## Performance Optimization

- Optimize rendering and avoid unnecessary re-renders (see performance-optimization.instructions.md).
- Use React.memo, useMemo, useCallback if necessary.
- Use `React.memo` for component memoization when appropriate.
- Implement code splitting with `React.lazy` and `Suspense`.
- Optimize bundle size with tree shaking and dynamic imports.
- Use `useMemo` and `useCallback` judiciously to prevent unnecessary re-renders.
- Implement virtual scrolling for large lists.
- Profile components with React DevTools to identify performance bottlenecks.

---

## Styling and UI

### CSS and Styling Approach
- Use CSS Modules, Styled Components, or modern CSS-in-JS solutions.
- Implement responsive design with mobile-first approach.
- Follow BEM methodology or similar naming conventions for CSS classes.
- Use CSS custom properties (variables) for theming.
- Implement consistent spacing, typography, and color systems.
- Ensure accessibility with proper ARIA attributes and semantic HTML.

---

## Data Fetching

- Use modern data fetching libraries (React Query, SWR, Apollo Client).
- Implement proper loading, error, and success states.
- Handle race conditions and request cancellation.
- Use optimistic updates for better user experience.
- Implement proper caching strategies.
- Handle offline scenarios and network errors gracefully.

---

## Error Handling

- Implement Error Boundaries for component-level error handling.
- Use proper error states in data fetching.
- Implement fallback UI for error scenarios.
- Log errors appropriately for debugging.
- Handle async errors in effects and event handlers.
- Provide meaningful error messages to users.

---

## Forms and Validation

- Use controlled components for form inputs.
- Implement proper form validation with libraries like Formik or React Hook Form.
- Handle form submission and error states appropriately.
- Implement accessibility features for forms (labels, ARIA attributes).
- Use debounced validation for better user experience.
- Handle file uploads and complex form scenarios.
- Use explicit labels for form fields.
- Indicate required fields and input errors.

---

## Accessibility

### Standards and Compliance
- Follow RGAA 4 and WCAG 2.2 AA instructions (see a11y.instructions.md).
- Use semantic HTML elements appropriately.
- Implement proper ARIA attributes and roles.
- Ensure keyboard navigation works for all interactive elements.
- Provide alt text for images and descriptive text for icons.
- Implement proper color contrast ratios.
- Test with screen readers and accessibility tools.
- Ensure all interactive elements are keyboard accessible.

---

## Routing

- Use React Router for client-side routing.
- Implement nested routes and route protection.
- Handle route parameters and query strings properly.
- Implement lazy loading for route-based code splitting.
- Use proper navigation patterns and back button handling.
- Implement breadcrumbs and navigation state management.

---

## Testing

- Write unit tests for components using React Testing Library.
- Test component behavior, not implementation details.
- Use Jest for test runner and assertion library.
- Implement integration tests for complex component interactions.
- Mock external dependencies and API calls appropriately.
- Test accessibility features and keyboard navigation.

---

## Security

- Sanitize user inputs to prevent XSS attacks.
- Validate and escape data before rendering.
- Use HTTPS for all external API calls.
- Implement proper authentication and authorization patterns.
- Avoid storing sensitive data in localStorage or sessionStorage.
- Use Content Security Policy (CSP) headers.

---

## Development Workflow and Guidelines

### Code Organization and Naming
- Follow React's naming conventions (PascalCase for components, camelCase for functions).
- Use meaningful commit messages and maintain clean git history.
- Implement proper code splitting and lazy loading strategies.
- Document complex components and custom hooks with JSDoc.
- Use ESLint and Prettier for consistent code formatting.
- Keep dependencies up to date and audit for security vulnerabilities.

### Environment and Deployment
- Implement proper environment configuration for different deployment stages.
- Use React Developer Tools for debugging and performance analysis.

---

## Common Patterns

- Higher-Order Components (HOCs) for cross-cutting concerns.
- Render props pattern for component composition.
- Compound components for related functionality.
- Provider pattern for context-based state sharing.
- Container/Presentational component separation.
- Custom hooks for reusable logic extraction.

---

## Practical Examples

### Component Declaration

```tsx
// src/shared/components/MyComponent/MyComponent.tsx

type MyComponentProps = PropsWithChildren<{
  label: string;
  onClick: () => void;
}>;

export const MyComponent = ({ label, onClick, children }: MyComponentProps) => {
  return (
    <button onClick={onClick}>
      {label}
      {children}
    </button>
  );
};
```

### Using useState

```tsx
import { useState } from 'react';

type CounterProps = { initial: number };

export const Counter = ({ initial }: CounterProps) => {
  const [count, setCount] = useState(initial);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
};
```

### Using useReducer

```tsx
import { useReducer } from 'react';

type State = { count: number };
type Action = { type: 'increment' } | { type: 'decrement' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

type CounterReducerProps = { initial: number };

export const CounterReducer = ({ initial }: CounterReducerProps) => {
  const [state, dispatch] = useReducer(reducer, { count: initial });
  return (
    <>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
};
```

### Accessibility Example (Form)

```tsx
import { useForm } from 'react-hook-form';

type FormProps = {};

type FormData = { email: string };

export const Form = ({}: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <label htmlFor="email">Email *</label>
      <input
        id="email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />
      {errors.email && (
        <span id="email-error" role="alert">
          {errors.email.message}
        </span>
      )}
      <button type="submit">Send</button>
    </form>
  );
};
```

---

These instructions must be followed for all React development in the project. They combine best practices from React's official documentation with project-specific conventions for component structure, accessibility, and performance.

Instructions used: [a11y.instructions.md, performance-optimization.instructions.md, follow-up-question.instructions.md, copilot-instructions.md]

> Generated with accessibility, performance, and project conventions in mind. Always manually test accessibility (e.g. with Accessibility Insights).

