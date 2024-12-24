import { ISelect } from '@inkline/inkline/components/ISelect/index';
import {
    ISelectBasicExample,
    ISelectPreselectedExample,
    ISelectColorVariantsExample,
    ISelectClearableExample,
    ISelectDisabledExample,
    ISelectDisabledOptionExample,
    ISelectHeaderFooterExample,
    ISelectSizeVariantsExample,
    ISelectPrependAppendTextExample,
    ISelectPrependAppendButtonExample,
    ISelectPrefixSuffixExample,
    ISelectReadonlyExample,
    ISelectRenderExpressionExample,
    ISelectRenderFunctionExample,
    ISelectRenderComponentExample,
    ISelectRenderSlotExample,
    ISelectRenderFunctionPerOptionExample
} from '@inkline/inkline/components/ISelect/examples/index';
import { colorArgType, createStory, sizeArgType, useServer } from '@inkline/inkline/__storybook__';

useServer();

export default {
    component: ISelect,
    title: 'Forms/Select',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ISelectBasicExample);
export const Preselected = createStory(ISelectPreselectedExample);
export const ColorVariants = () => ISelectColorVariantsExample;
export const Clearable = () => ISelectClearableExample;
export const Disabled = () => ISelectDisabledExample;
export const DisabledOption = () => ISelectDisabledOptionExample;
export const HeaderFooter = () => ISelectHeaderFooterExample;
export const SizeVariants = () => ISelectSizeVariantsExample;
export const PrependAppendText = () => ISelectPrependAppendTextExample;
export const PrependAppendButton = () => ISelectPrependAppendButtonExample;
export const PrefixSuffix = () => ISelectPrefixSuffixExample;
export const Readonly = () => ISelectReadonlyExample;
export const RenderExpression = () => ISelectRenderExpressionExample;
export const RenderFunction = () => ISelectRenderFunctionExample;
export const RenderFunctionPerOption = () => ISelectRenderFunctionPerOptionExample;
export const RenderComponent = () => ISelectRenderComponentExample;
export const RenderSlot = () => ISelectRenderSlotExample;
