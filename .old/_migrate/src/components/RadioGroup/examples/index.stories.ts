import { RadioGroup } from '@inkline/inkline/components/RadioGroup';
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
} from '@inkline/inkline/components/RadioGroup/examples/index';
import {
    colorArgType,
    createExampleStory,
    createStory,
    sizeArgType
} from '@inkline/inkline/__storybook__';

export default {
    component: RadioGroup,
    title: 'Forms/RadioGroup',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(RadioGroupBasicExample);
export const ColorVariants = () => RadioGroupColorVariantsExample;
export const Disabled = () => RadioGroupDisabledExample;
export const Readonly = () => RadioGroupReadonlyExample;
export const SizeVariants = () => RadioGroupSizeVariantsExample;
export const RenderComponent = createExampleStory(RadioGroupRenderComponentExample);
export const RenderExpression = createExampleStory(RadioGroupRenderExpressionExample);
export const RenderFunction = createExampleStory(RadioGroupRenderFunctionExample);
export const RenderFunctionPerOption = createExampleStory(RadioGroupRenderFunctionPerOptionExample);
export const RenderSlot = createExampleStory(RadioGroupRenderSlotExample);
