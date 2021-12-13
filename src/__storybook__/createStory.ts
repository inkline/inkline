import { h } from 'vue';

export const createStory = (Component: any) => (args: any) => ({
    setup: () => () => h('div', {
        class: 'storybook-example'
    }, [
        h(Component, args)
    ])
});
