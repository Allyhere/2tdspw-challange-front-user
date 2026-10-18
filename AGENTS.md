# Agent notes

Visible copy is Brazilian Portuguese (`pt-BR`). Routes, components, files, functions, and variables are English.

## Lint

After each code change, run `npm run lint` and fix violations before continuing.

- Do not use `any`.
- Do not leave unused imports or unused variables.
- Keep each function at or under 50 lines, ignoring blank lines and comments.

## Tailwind

Define values in the `@theme` block in `src/index.css`. Use the generated utilities (`bg-primary`, `p-lg`, `rounded-md`).

Never use arbitrary bracket values such as `bg-[#8B3FBF]`, `w-[365px]`, or `p-[13px]`. If a size is missing, add a named theme token.

## Accessibility

Use semantic HTML and aim for WCAG AA. Interactive controls come from `react-aria-components`, not raw `button`, `input`, or `a`.

The commit hook runs `npm run lint` and `npm run a11y` (`@axe-core/cli` against the preview server).

## Components

Never create a component that returns only a styled element. Write the element at the call site.

## Utilities

Write a single-line helper at the call site. Put any longer helper in `src/utils`.

## Hooks

Put React hooks in `src/hooks`.
