import { h } from 'vue';

export const createStory = (Component: any) => (args: any) => ({
    setup: () => () => h(Component, { class: 'storybook-example', ...args })
});
