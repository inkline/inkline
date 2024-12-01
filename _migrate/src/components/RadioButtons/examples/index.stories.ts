import RadioButtons from '@inkline/inkline/components/RadioButtons/RadioButtons.vue';
import {
    RadioButtonsBasicExample,
    RadioButtonsButtonPropsExample,
    RadioButtonsColorVariantsExample,
    RadioButtonsDisabledExample,
    RadioButtonsDisabledOptionExample,
    RadioButtonsReadonlyExample,
    RadioButtonsReadonlyOptionExample,
    RadioButtonsRenderComponentExample,
    RadioButtonsRenderExpressionExample,
    RadioButtonsRenderFunctionExample,
    RadioButtonsRenderFunctionPerOptionExample,
    RadioButtonsRenderSlotExample,
    RadioButtonsSizeVariantsExample,
    RadioButtonsStyleVariantsExample
} from '@inkline/inkline/components/RadioButtons/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: RadioButtons,
    title: 'Forms/RadioButtons',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(RadioButtonsBasicExample);
export const ColorVariants = createExampleStory(RadioButtonsColorVariantsExample);
export const Disabled = createExampleStory(RadioButtonsDisabledExample);
export const DisabledOption = createExampleStory(RadioButtonsDisabledOptionExample);
export const Readonly = createExampleStory(RadioButtonsReadonlyExample);
export const ReadonlyOption = createExampleStory(RadioButtonsReadonlyOptionExample);
export const SizeVariants = createExampleStory(RadioButtonsSizeVariantsExample);
export const StyleVariants = createExampleStory(RadioButtonsStyleVariantsExample);
export const ButtonProps = createExampleStory(RadioButtonsButtonPropsExample);
export const RenderComponent = createExampleStory(RadioButtonsRenderComponentExample);
export const RenderExpression = createExampleStory(RadioButtonsRenderExpressionExample);
export const RenderFunction = createExampleStory(RadioButtonsRenderFunctionExample);
export const RenderFunctionPerOption = createExampleStory(
    RadioButtonsRenderFunctionPerOptionExample
);
export const RenderSlot = createExampleStory(RadioButtonsRenderSlotExample);
