import { markRaw } from 'vue';
import { Nav } from '@inkline/component-nav';
import {
    NavBasicExample,
    NavColorVariantsExample,
    NavRoutingExample,
    NavSizeVariantsExample,
    NavStateActiveExample,
    NavDirectionExample
} from '@inkline/component-nav/examples';
import type { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof Nav> = {
    component: markRaw(Nav),
    title: 'Components/Nav'
};

export default meta;

export const Basic: StoryFn = () => NavBasicExample;
export const ColorVariants: StoryFn = () => NavColorVariantsExample;
export const SizeVariants: StoryFn = () => NavSizeVariantsExample;
export const Routing: StoryFn = () => NavRoutingExample;
export const StateActive: StoryFn = () => NavStateActiveExample;
export const Direction: StoryFn = () => NavDirectionExample;
