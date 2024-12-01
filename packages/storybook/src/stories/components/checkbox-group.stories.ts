import { CheckboxGroup } from '@inkline/component-checkbox';
import {
    CheckboxGroupBasicExample,
    CheckboxGroupColorVariantsExample,
    CheckboxGroupDisabledExample,
    CheckboxGroupReadonlyExample,
    CheckboxGroupRenderComponentExample,
    CheckboxGroupRenderExpressionExample,
    CheckboxGroupRenderFunctionExample,
    CheckboxGroupRenderFunctionPerOptionExample,
    CheckboxGroupRenderSlotExample,
    CheckboxGroupSizeVariantsExample
} from '@inkline/component-checkbox/examples';
import { Meta, StoryFn } from '@storybook/vue3';
import { markRaw } from 'vue';

const meta: Meta<typeof CheckboxGroup> = {
    component: markRaw(CheckboxGroup),
    title: 'Forms/CheckboxGroup'
};

export default meta;

export const Basic: StoryFn = () => CheckboxGroupBasicExample;
export const ColorVariants: StoryFn = () => CheckboxGroupColorVariantsExample;
export const Disabled: StoryFn = () => CheckboxGroupDisabledExample;
export const Readonly: StoryFn = () => CheckboxGroupReadonlyExample;
export const SizeVariants: StoryFn = () => CheckboxGroupSizeVariantsExample;
export const RenderComponent: StoryFn = () => CheckboxGroupRenderComponentExample;
export const RenderExpression: StoryFn = () => CheckboxGroupRenderExpressionExample;
export const RenderFunction: StoryFn = () => CheckboxGroupRenderFunctionExample;
export const RenderFunctionPerOption: StoryFn = () => CheckboxGroupRenderFunctionPerOptionExample;
export const RenderSlot: StoryFn = () => CheckboxGroupRenderSlotExample;
