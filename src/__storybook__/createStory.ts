import type { Component} from 'vue';
import { h } from 'vue';

export const createStory =
    (component: Component, storyArgs: { classes?: string } = {}) =>
    (args: any) => ({
        setup: () => () =>
            h(
                'div',
                {
                    class: `storybook-example ${storyArgs.classes || ''}`
                },
                [h(component, args)]
            )
    });
