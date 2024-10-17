import CheckboxGroup from '@inkline/inkline/components/CheckboxGroup/CheckboxGroup.vue';
import {
    CheckboxBasicExample,
    CheckboxColorVariantsExample,
    CheckboxDisabledExample,
    CheckboxGroupRenderComponentExample,
    CheckboxGroupRenderExpressionExample,
    CheckboxGroupRenderFunctionExample,
    CheckboxGroupRenderFunctionPerOptionExample,
    CheckboxGroupRenderSlotExample,
    CheckboxSizeVariantsExample
} from '@inkline/inkline/components/CheckboxGroup/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: CheckboxGroup,
    title: 'Forms/CheckboxGroup',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(CheckboxBasicExample);
export const ColorVariants = createExampleStory(CheckboxColorVariantsExample);
export const Disabled = createExampleStory(CheckboxDisabledExample);
export const SizeVariants = createExampleStory(CheckboxSizeVariantsExample);
export const RenderComponent = createExampleStory(CheckboxGroupRenderComponentExample);
export const RenderExpression = createExampleStory(CheckboxGroupRenderExpressionExample);
export const RenderFunction = createExampleStory(CheckboxGroupRenderFunctionExample);
export const RenderFunctionPerOption = createExampleStory(
    CheckboxGroupRenderFunctionPerOptionExample
);
export const RenderSlot = createExampleStory(CheckboxGroupRenderSlotExample);
