import IRadioButtons from '@inkline/inkline/components/IRadioButtons/IRadioButtons.vue';
import {
    IRadioButtonsBasicExample,
    IRadioButtonsButtonPropsExample,
    IRadioButtonsColorVariantsExample,
    IRadioButtonsDisabledExample,
    IRadioButtonsDisabledOptionExample,
    IRadioButtonsReadonlyExample,
    IRadioButtonsReadonlyOptionExample,
    IRadioButtonsRenderComponentExample,
    IRadioButtonsRenderExpressionExample,
    IRadioButtonsRenderFunctionExample,
    IRadioButtonsRenderFunctionPerOptionExample,
    IRadioButtonsRenderSlotExample,
    IRadioButtonsSizeVariantsExample,
    IRadioButtonsStyleVariantsExample
} from '@inkline/inkline/components/IRadioButtons/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: IRadioButtons,
    title: 'Forms/RadioButtons',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IRadioButtonsBasicExample);
export const ColorVariants = createExampleStory(IRadioButtonsColorVariantsExample);
export const Disabled = createExampleStory(IRadioButtonsDisabledExample);
export const DisabledOption = createExampleStory(IRadioButtonsDisabledOptionExample);
export const Readonly = createExampleStory(IRadioButtonsReadonlyExample);
export const ReadonlyOption = createExampleStory(IRadioButtonsReadonlyOptionExample);
export const SizeVariants = createExampleStory(IRadioButtonsSizeVariantsExample);
export const StyleVariants = createExampleStory(IRadioButtonsStyleVariantsExample);
export const ButtonProps = createExampleStory(IRadioButtonsButtonPropsExample);
export const RenderComponent = createExampleStory(IRadioButtonsRenderComponentExample);
export const RenderExpression = createExampleStory(IRadioButtonsRenderExpressionExample);
export const RenderFunction = createExampleStory(IRadioButtonsRenderFunctionExample);
export const RenderFunctionPerOption = createExampleStory(
    IRadioButtonsRenderFunctionPerOptionExample
);
export const RenderSlot = createExampleStory(IRadioButtonsRenderSlotExample);
