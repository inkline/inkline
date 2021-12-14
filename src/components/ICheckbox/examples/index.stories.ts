import ICheckbox from '../index.vue';
import ICheckboxBasicExample from './basic.vue';
import ICheckboxColorVariantsExample from './color-variants.vue';
import ICheckboxDisabledExample from './disabled.vue';
import ICheckboxGroupExample from './group.vue';
import ICheckboxGroupDisabledExample from './group-disabled.vue';
import ICheckboxGroupSizeVariantsExample from './group-size-variants.vue';
import ICheckboxGroupColorVariantsExample from './group-color-variants.vue';
import ICheckboxIndeterminateExample from './indeterminate.vue';
import ICheckboxNativeExample from './native.vue';
import ICheckboxReadonlyExample from './readonly.vue';
import ICheckboxSizeVariantsExample from './size-variants.vue';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ICheckbox,
    title: 'Forms/Checkbox',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICheckboxBasicExample);
export const ColorVariants = () => ICheckboxColorVariantsExample;
export const Disabled = () => ICheckboxDisabledExample;
export const Group = () => ICheckboxGroupExample;
export const GroupDisabled = () => ICheckboxGroupDisabledExample;
export const GroupSizeVariants = () => ICheckboxGroupSizeVariantsExample;
export const GroupColorVariants = () => ICheckboxGroupColorVariantsExample;
export const Indeterminate = () => ICheckboxIndeterminateExample;
export const Native = () => ICheckboxNativeExample;
export const Readonly = () => ICheckboxReadonlyExample;
export const SizeVariants = () => ICheckboxSizeVariantsExample;
