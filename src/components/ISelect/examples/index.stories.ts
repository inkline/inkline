import ISelect from '../index.vue';
import ISelectAdvancedExample from './advanced.vue';
import ISelectAutocompleteExample from './autocomplete.vue';
import ISelectAutocompleteAsyncExample from './autocomplete-async.vue';
import ISelectBasicExample from './basic.vue';
import ISelectColorVariantsExample from './color-variants.vue';
import ISelectClearableExample from './clearable.vue';
import ISelectDisabledExample from './disabled.vue';
import ISelectDisabledOptionExample from './disabled-option.vue';
import ISelectHeaderFooterExample from './header-and-footer.vue';
import ISelectMarkupExample from './markup.vue';
import ISelectSizeVariantsExample from './size-variants.vue';
import ISelectPrependAppendTextExample from './prepend-append-text.vue';
import ISelectPrependAppendButtonExample from './prepend-append-button.vue';
import ISelectPaginationExample from './pagination.vue';
import ISelectPrefixSuffixExample from './prefix-suffix.vue';
import ISelectReadonlyExample from './readonly.vue';
import ISelectRenderingRenderFunctionExample from './rendering-render-function.vue';
import ISelectRenderingValueByPathExample from './rendering-value-by-path.vue';
import ISelectRenderingScopedSlotExample from './rendering-scoped-slot.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';
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
export const Advanced = () => ISelectAdvancedExample;
export const Autocomplete = () => ISelectAutocompleteExample;
export const AutocompleteAsync = () => ISelectAutocompleteAsyncExample;
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
