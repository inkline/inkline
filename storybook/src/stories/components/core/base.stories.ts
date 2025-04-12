import './base.preview.css';
import { BaseComponent } from '@inkline/component-base';
import {
    BaseComponentBasicExample,
    BaseComponentBackgroundExample,
    BaseComponentBorderExample,
    BaseComponentBorderRadiusExample,
    BaseComponentBoxShadowExample,
    BaseComponentColorExample,
    BaseComponentPaddingExample,
    BaseComponentVariantsExample
} from '@inkline/component-base/examples';
import type { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof BaseComponent> = {
    component: markRaw(BaseComponent),
    title: 'Core Components/Base'
};

export default meta;

export const Basic: StoryFn = () => BaseComponentBasicExample;
export const Background: StoryFn = () => BaseComponentBackgroundExample;
export const Border: StoryFn = () => BaseComponentBorderExample;
export const BorderRadius: StoryFn = () => BaseComponentBorderRadiusExample;
export const BoxShadow: StoryFn = () => BaseComponentBoxShadowExample;
export const Color: StoryFn = () => BaseComponentColorExample;
export const Padding: StoryFn = () => BaseComponentPaddingExample;
export const Variants: StoryFn = () => BaseComponentVariantsExample;
