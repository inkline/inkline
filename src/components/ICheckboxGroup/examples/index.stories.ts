import ICheckboxGroup from '@inkline/inkline/components/ICheckboxGroup/ICheckboxGroup.vue';
import {
    ICheckboxBasicExample,
    ICheckboxColorVariantsExample,
    ICheckboxDisabledExample,
    ICheckboxGroupRenderComponentExample,
    ICheckboxGroupRenderExpressionExample,
    ICheckboxGroupRenderFunctionExample,
    ICheckboxGroupRenderFunctionPerOptionExample,
    ICheckboxGroupRenderSlotExample,
    ICheckboxSizeVariantsExample
} from '@inkline/inkline/components/ICheckboxGroup/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: ICheckboxGroup,
    title: 'Forms/CheckboxGroup',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICheckboxBasicExample);
export const ColorVariants = createExampleStory(ICheckboxColorVariantsExample);
export const Disabled = createExampleStory(ICheckboxDisabledExample);
export const SizeVariants = createExampleStory(ICheckboxSizeVariantsExample);
export const RenderComponent = createExampleStory(ICheckboxGroupRenderComponentExample);
export const RenderExpression = createExampleStory(ICheckboxGroupRenderExpressionExample);
export const RenderFunction = createExampleStory(ICheckboxGroupRenderFunctionExample);
export const RenderFunctionPerOption = createExampleStory(
    ICheckboxGroupRenderFunctionPerOptionExample
);
export const RenderSlot = createExampleStory(ICheckboxGroupRenderSlotExample);
