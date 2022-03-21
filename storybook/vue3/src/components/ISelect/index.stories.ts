import { ISelect } from '@inkline/inkline/components';
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
    ISelectRenderingScopedSlotExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';
import { useServer } from '@inkline/inkline/__mocks__/useServer';

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
export const Advanced = createStory(ISelectAdvancedExample);
export const Autocomplete = createStory(ISelectAutocompleteExample);
export const AutocompleteAsync = createStory(ISelectAutocompleteAsyncExample);
export const ColorVariants = createStory(ISelectColorVariantsExample);
export const Clearable = createStory(ISelectClearableExample);
export const Disabled = createStory(ISelectDisabledExample);
export const DisabledOption = createStory(ISelectDisabledOptionExample);
export const HeaderFooter = createStory(ISelectHeaderFooterExample);
export const Markup = createStory(ISelectMarkupExample);
export const SizeVariants = createStory(ISelectSizeVariantsExample);
export const PrependAppendText = createStory(ISelectPrependAppendTextExample);
export const PrependAppendButton = createStory(ISelectPrependAppendButtonExample);
export const Pagination = createStory(ISelectPaginationExample);
export const PrefixSuffix = createStory(ISelectPrefixSuffixExample);
export const Readonly = createStory(ISelectReadonlyExample);
export const RenderingRenderFunction = createStory(ISelectRenderingRenderFunctionExample);
export const RenderingValueByPath = createStory(ISelectRenderingValueByPathExample);
export const RenderingScopedSlot = createStory(ISelectRenderingScopedSlotExample);
