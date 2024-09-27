import { IRadioGroup } from '@inkline/inkline/components/IRadioGroup';
import {
    IRadioGroupBasicExample,
    IRadioGroupColorVariantsExample,
    IRadioGroupDisabledExample,
    IRadioGroupReadonlyExample,
    IRadioGroupSizeVariantsExample,
    IRadioGroupRenderComponentExample,
    IRadioGroupRenderExpressionExample,
    IRadioGroupRenderFunctionExample,
    IRadioGroupRenderFunctionPerOptionExample,
    IRadioGroupRenderSlotExample
} from '@inkline/inkline/components/IRadioGroup/examples/index';
import {
    colorArgType,
    createExampleStory,
    createStory,
    sizeArgType
} from '@inkline/inkline/__storybook__';

export default {
    component: IRadioGroup,
    title: 'Forms/RadioGroup',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IRadioGroupBasicExample);
export const ColorVariants = () => IRadioGroupColorVariantsExample;
export const Disabled = () => IRadioGroupDisabledExample;
export const Readonly = () => IRadioGroupReadonlyExample;
export const SizeVariants = () => IRadioGroupSizeVariantsExample;
export const RenderComponent = createExampleStory(IRadioGroupRenderComponentExample);
export const RenderExpression = createExampleStory(IRadioGroupRenderExpressionExample);
export const RenderFunction = createExampleStory(IRadioGroupRenderFunctionExample);
export const RenderFunctionPerOption = createExampleStory(
    IRadioGroupRenderFunctionPerOptionExample
);
export const RenderSlot = createExampleStory(IRadioGroupRenderSlotExample);
