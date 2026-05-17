# Components

## How to add a new component

- Create a new folder in `packages/components/src` with the name of the component.
- Create a new file `index.ts` in the folder and export the component and the theme.
- Create a new file `theme.ts` in the folder and export the theme.
- Create a new file `README.md` in the folder and describe the component.

### Global

- Add the component export to the `index.ts` file in `packages/inkline/src/components`.
- Add the component import to the `bundle.ts` file in `packages/inkline/src/components`.
- Add the component theme to the `theme.ts` file in `packages/inkline/src/components`.

### Storybook

- Create a new `${component}.stories.ts` file in `packages/storybook/src/stories/components` with the name of the component.
- Create a new `${component}.preview.scss` file in `packages/storybook/src/stories/components` with the name of the component.
- Add the component paths to the `tsconfig.json` file in `packages/storybook`.
- Add the component paths to the `vite.config.ts` file in `packages/storybook`.
- Add the component theme to the `inkline.config.ts` file in `packages/storybook`.
