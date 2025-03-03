# Inkline Development Guide

## Build Commands
- Build all packages: `pnpm run build`
- Build core packages: `pnpm run build:core`
- Build UI packages: `pnpm run build:ui`
- Run development mode: `pnpm run dev`
- Run Storybook: `pnpm run storybook`
- Run Documentation: `pnpm run dev:docs`

## Test Commands
- Run all tests: `pnpm run test`
- Run tests with watch mode: `pnpm run test:dev` (in specific package)
- Run single test: `pnpm run test -- -t "test name"` (in specific package)

## Lint Commands
- Lint all packages: `pnpm run lint`

## Code Style Guidelines
- Use TypeScript for type safety
- Follow ESLint rules with 4-space indentation
- Always use semicolons at the end of statements
- Use PascalCase for component names and camelCase for functions/variables
- Use explicit return types for functions
- Follow Vue 3 Composition API patterns
- Use typed props and emits
- Write unit tests for all components and utilities
- Unused variables should be prefixed with underscore (_param)

# Component Guidelines
- Components should be placed in the `packages/ui/components` directory
- Component styles are written using `@inkline/core` and `@inkline/theme`, in the `theme.ts` file
- Component stylesheets (found in `src/css` dir) are auto-generated based on `theme.ts` and should not be modified directly
- Component manifests (found in `manifest.ts` files) are auto-generated and should not be modified directly

## How to create a new component

- Create a new folder in `packages/components` with the name of the component.
- Copy the structure of an existing component folder
- Create a new file `index.ts` in the folder and export the component and the theme.
- Create a new file `theme.ts` in the folder and use `@inkline/core` and `@inkline/theme` to style the component.

### Add the component to the base bundle package

- Add the component export file in `packages/inkline/src/{component-name}.ts` and export the component and the theme.

### Add the component to Storybook
- Create a new `${component}.stories.ts` file in `packages/storybook/src/stories/components` with the name of the component.
- Create a new `${component}.preview.scss` file in `packages/storybook/src/stories/components` with the name of the component.
- Add the component theme to the `inkline.config.ts` file in `packages/storybook`.
