import { Checkbox } from '@inkline/component-checkbox';
import {
    CheckboxBasicExample,
    CheckboxColorVariantsExample,
    CheckboxDisabledExample,
    CheckboxIndeterminateExample,
    CheckboxNativeExample,
    CheckboxReadonlyExample,
    CheckboxSizeVariantsExample
} from '@inkline/component-checkbox/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof Checkbox> = {
    component: markRaw(Checkbox),
    title: 'Forms/Checkbox'
};

export default meta;

export const Basic: StoryFn = () => CheckboxBasicExample;
export const ColorVariants: StoryFn = () => CheckboxColorVariantsExample;
export const Disabled: StoryFn = () => CheckboxDisabledExample;
export const Indeterminate: StoryFn = () => CheckboxIndeterminateExample;
export const Native: StoryFn = () => CheckboxNativeExample;
export const Readonly: StoryFn = () => CheckboxReadonlyExample;
export const SizeVariants: StoryFn = () => CheckboxSizeVariantsExample;
