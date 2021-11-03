import ISelect from '../index.vue';
import {
    ISelectAdvancedExample,
    ISelectAutocompleteExample,
    ISelectAutocompleteAsyncExample,
    ISelectBasicExample,
    ISelectColorVariantsExample,
    ISelectClearableExample,
    ISelectDisabledExample,
    ISelectDisabledOptionExample,
    ISelectHeaderFooterExample,
    ISelectMarkupExample,
    ISelectSizeVariantsExample,
    ISelectPrependAppendTextExample,
    ISelectPrependAppendButtonExample,
    ISelectPaginationExample,
    ISelectPrefixSuffixExample,
    ISelectReadonlyExample,
    ISelectRenderingRenderFunctionExample,
    ISelectRenderingValueByPathExample,
    ISelectRenderingScopedSlotExample,
    ISelectTypeExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: ISelect,
    title: 'Components/Select',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-select v-bind="args">
        Select
    </i-select>`,
});

export const Component = Template.bind({});

export const Advanced = () => ISelectAdvancedExample;
export const Autocomplete = () => ISelectAutocompleteExample;
export const AutocompleteAsync = () => ISelectAutocompleteAsyncExample;
export const Basic = () => ISelectBasicExample;
export const ColorVariants = () => ISelectColorVariantsExample;
export const Clearable = () => ISelectClearableExample;
export const Disabled = () => ISelectDisabledExample;
export const DisabledOption = () => ISelectDisabledOptionExample;
export const HeaderFooter = () => ISelectHeaderFooterExample;
export const Markup = () => ISelectMarkupExample;
export const SizeVariants = () => ISelectSizeVariantsExample;
export const PrependAppendText = () => ISelectPrependAppendTextExample;
export const PrependAppendButton = () => ISelectPrependAppendButtonExample;
export const Pagination = () => ISelectPaginationExample;
export const PrefixSuffix = () => ISelectPrefixSuffixExample;
export const Readonly = () => ISelectReadonlyExample;
export const RenderingRenderFunction = () => ISelectRenderingRenderFunctionExample;
export const RenderingValueByPath = () => ISelectRenderingValueByPathExample;
export const RenderingScopedSlot = () => ISelectRenderingScopedSlotExample;
export const Type = () => ISelectTypeExample;
            