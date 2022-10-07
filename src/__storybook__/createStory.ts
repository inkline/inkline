import { DefineComponent, h } from 'vue';

export const createStory = (Component: DefineComponent) => (args: any) => ({
    setup: () => () =>
        h(
            'div',
            {
                class: `storybook-example ${args.class || ''}`
            },
            [h(Component, args)]
        )
});
