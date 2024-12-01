import { RadioGroup } from '@inkline/component-radio';
import {
    RadioGroupBasicExample,
    RadioGroupColorVariantsExample,
    RadioGroupDisabledExample,
    RadioGroupReadonlyExample,
    RadioGroupSizeVariantsExample,
    RadioGroupRenderComponentExample,
    RadioGroupRenderExpressionExample,
    RadioGroupRenderFunctionExample,
    RadioGroupRenderFunctionPerOptionExample,
    RadioGroupRenderSlotExample
} from '@inkline/component-radio/examples';
import { markRaw } from 'vue';
import { Meta, StoryFn } from '@storybook/vue3';

const meta: Meta<typeof RadioGroup> = {
    component: markRaw(RadioGroup),
    title: 'Forms/RadioGroup'
};

export default meta;

export const Basic: StoryFn = () => RadioGroupBasicExample;
export const ColorVariants: StoryFn = () => RadioGroupColorVariantsExample;
export const Disabled: StoryFn = () => RadioGroupDisabledExample;
export const Readonly: StoryFn = () => RadioGroupReadonlyExample;
export const SizeVariants: StoryFn = () => RadioGroupSizeVariantsExample;
export const RenderComponent: StoryFn = () => RadioGroupRenderComponentExample;
export const RenderExpression: StoryFn = () => RadioGroupRenderExpressionExample;
export const RenderFunction: StoryFn = () => RadioGroupRenderFunctionExample;
export const RenderFunctionPerOption: StoryFn = () => RadioGroupRenderFunctionPerOptionExample;
export const RenderSlot: StoryFn = () => RadioGroupRenderSlotExample;
