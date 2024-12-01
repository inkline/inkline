import { Select } from '@inkline/inkline/components/Select/index';
import {
    SelectBasicExample,
    SelectPreselectedExample,
    SelectColorVariantsExample,
    SelectClearableExample,
    SelectDisabledExample,
    SelectDisabledOptionExample,
    SelectHeaderFooterExample,
    SelectSizeVariantsExample,
    SelectPrependAppendTextExample,
    SelectPrependAppendButtonExample,
    SelectPrefixSuffixExample,
    SelectReadonlyExample,
    SelectRenderExpressionExample,
    SelectRenderFunctionExample,
    SelectRenderComponentExample,
    SelectRenderSlotExample,
    SelectRenderFunctionPerOptionExample
} from '@inkline/inkline/components/Select/examples/index';
import { colorArgType, createStory, sizeArgType, useServer } from '@inkline/inkline/__storybook__';

useServer();

export default {
    component: Select,
    title: 'Forms/Select',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(SelectBasicExample);
export const Preselected = createStory(SelectPreselectedExample);
export const ColorVariants = () => SelectColorVariantsExample;
export const Clearable = () => SelectClearableExample;
export const Disabled = () => SelectDisabledExample;
export const DisabledOption = () => SelectDisabledOptionExample;
export const HeaderFooter = () => SelectHeaderFooterExample;
export const SizeVariants = () => SelectSizeVariantsExample;
export const PrependAppendText = () => SelectPrependAppendTextExample;
export const PrependAppendButton = () => SelectPrependAppendButtonExample;
export const PrefixSuffix = () => SelectPrefixSuffixExample;
export const Readonly = () => SelectReadonlyExample;
export const RenderExpression = () => SelectRenderExpressionExample;
export const RenderFunction = () => SelectRenderFunctionExample;
export const RenderFunctionPerOption = () => SelectRenderFunctionPerOptionExample;
export const RenderComponent = () => SelectRenderComponentExample;
export const RenderSlot = () => SelectRenderSlotExample;
