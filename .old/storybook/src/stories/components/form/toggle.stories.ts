import './toggle.preview.css';
import { Toggle } from '@inkline/component-toggle';
import {
    ToggleBasicExample,
    ToggleColorVariantsExample,
    ToggleDisabledExample,
    ToggleReadonlyExample,
    ToggleRoundedExample,
    ToggleSizeVariantsExample
} from '@inkline/component-toggle/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Toggle> = {
    component: markRaw(Toggle),
    title: 'Forms/Toggle'
};

export default meta;

export const Basic: StoryFn = () => ToggleBasicExample;
export const ColorVariants: StoryFn = () => ToggleColorVariantsExample;
export const Disabled: StoryFn = () => ToggleDisabledExample;
export const Readonly: StoryFn = () => ToggleReadonlyExample;
export const Rounded: StoryFn = () => ToggleRoundedExample;
export const SizeVariants: StoryFn = () => ToggleSizeVariantsExample;
