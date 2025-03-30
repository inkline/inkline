import './box.preview.css';
import { Box } from '@inkline/component-box';
import {
    BoxBasicExample,
    BoxBackgroundExample,
    BoxBorderExample,
    BoxBorderRadiusExample,
    BoxBoxShadowExample,
    BoxColorExample,
    BoxPaddingExample,
    BoxVariantsExample
} from '@inkline/component-box/examples';
import type { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Box> = {
    component: markRaw(Box),
    title: 'Core Components/Box'
};

export default meta;

export const Basic: StoryFn = () => BoxBasicExample;
export const Background: StoryFn = () => BoxBackgroundExample;
export const Border: StoryFn = () => BoxBorderExample;
export const BorderRadius: StoryFn = () => BoxBorderRadiusExample;
export const BoxShadow: StoryFn = () => BoxBoxShadowExample;
export const Color: StoryFn = () => BoxColorExample;
export const Padding: StoryFn = () => BoxPaddingExample;
export const Variants: StoryFn = () => BoxVariantsExample;
