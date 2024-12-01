import CheckboxButtons from '@inkline/inkline/components/CheckboxButtons/CheckboxButtons.vue';
import {
    CheckboxButtonsBasicExample,
    CheckboxButtonsButtonPropsExample,
    CheckboxButtonsColorVariantsExample,
    CheckboxButtonsDisabledExample,
    CheckboxButtonsDisabledOptionExample,
    CheckboxButtonsReadonlyExample,
    CheckboxButtonsReadonlyOptionExample,
    CheckboxButtonsRenderComponentExample,
    CheckboxButtonsRenderExpressionExample,
    CheckboxButtonsRenderFunctionExample,
    CheckboxButtonsRenderFunctionPerOptionExample,
    CheckboxButtonsRenderSlotExample,
    CheckboxButtonsSizeVariantsExample,
    CheckboxButtonsStyleVariantsExample
} from '@inkline/inkline/components/CheckboxButtons/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: CheckboxButtons,
    title: 'Forms/CheckboxButtons',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(CheckboxButtonsBasicExample);
export const ColorVariants = createExampleStory(CheckboxButtonsColorVariantsExample);
export const Disabled = createExampleStory(CheckboxButtonsDisabledExample);
export const DisabledOption = createExampleStory(CheckboxButtonsDisabledOptionExample);
export const Readonly = createExampleStory(CheckboxButtonsReadonlyExample);
export const ReadonlyOption = createExampleStory(CheckboxButtonsReadonlyOptionExample);
export const SizeVariants = createExampleStory(CheckboxButtonsSizeVariantsExample);
export const StyleVariants = createExampleStory(CheckboxButtonsStyleVariantsExample);
export const ButtonProps = createExampleStory(CheckboxButtonsButtonPropsExample);
export const RenderComponent = createExampleStory(CheckboxButtonsRenderComponentExample);
export const RenderExpression = createExampleStory(CheckboxButtonsRenderExpressionExample);
export const RenderFunction = createExampleStory(CheckboxButtonsRenderFunctionExample);
export const RenderFunctionPerOption = createExampleStory(
    CheckboxButtonsRenderFunctionPerOptionExample
);
export const RenderSlot = createExampleStory(CheckboxButtonsRenderSlotExample);
