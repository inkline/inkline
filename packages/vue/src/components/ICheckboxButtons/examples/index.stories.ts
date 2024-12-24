import ICheckboxButtons from '@inkline/inkline/components/ICheckboxButtons/ICheckboxButtons.vue';
import {
    ICheckboxButtonsBasicExample,
    ICheckboxButtonsButtonPropsExample,
    ICheckboxButtonsColorVariantsExample,
    ICheckboxButtonsDisabledExample,
    ICheckboxButtonsDisabledOptionExample,
    ICheckboxButtonsReadonlyExample,
    ICheckboxButtonsReadonlyOptionExample,
    ICheckboxButtonsRenderComponentExample,
    ICheckboxButtonsRenderExpressionExample,
    ICheckboxButtonsRenderFunctionExample,
    ICheckboxButtonsRenderFunctionPerOptionExample,
    ICheckboxButtonsRenderSlotExample,
    ICheckboxButtonsSizeVariantsExample,
    ICheckboxButtonsStyleVariantsExample
} from '@inkline/inkline/components/ICheckboxButtons/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: ICheckboxButtons,
    title: 'Forms/CheckboxButtons',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICheckboxButtonsBasicExample);
export const ColorVariants = createExampleStory(ICheckboxButtonsColorVariantsExample);
export const Disabled = createExampleStory(ICheckboxButtonsDisabledExample);
export const DisabledOption = createExampleStory(ICheckboxButtonsDisabledOptionExample);
export const Readonly = createExampleStory(ICheckboxButtonsReadonlyExample);
export const ReadonlyOption = createExampleStory(ICheckboxButtonsReadonlyOptionExample);
export const SizeVariants = createExampleStory(ICheckboxButtonsSizeVariantsExample);
export const StyleVariants = createExampleStory(ICheckboxButtonsStyleVariantsExample);
export const ButtonProps = createExampleStory(ICheckboxButtonsButtonPropsExample);
export const RenderComponent = createExampleStory(ICheckboxButtonsRenderComponentExample);
export const RenderExpression = createExampleStory(ICheckboxButtonsRenderExpressionExample);
export const RenderFunction = createExampleStory(ICheckboxButtonsRenderFunctionExample);
export const RenderFunctionPerOption = createExampleStory(
    ICheckboxButtonsRenderFunctionPerOptionExample
);
export const RenderSlot = createExampleStory(ICheckboxButtonsRenderSlotExample);
