import { Component, h } from 'vue';

export const createStory = (component: Component) => (args: any) => ({
    setup: () => () =>
        h(
            'div',
            {
                class: `storybook-example ${args.class || ''}`
            },
            [h(component, args)]
        )
});
