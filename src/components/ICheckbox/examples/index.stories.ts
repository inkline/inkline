import ICheckbox from '../index.vue';
import {
    ICheckboxBasicExample,
    ICheckboxColorVariantsExample,
    ICheckboxDisabledExample,
    ICheckboxGroupExample,
    ICheckboxGroupDisabledExample,
    ICheckboxGroupSizeVariantsExample,
    ICheckboxGroupColorVariantsExample,
    ICheckboxIndeterminateExample,
    ICheckboxNativeExample,
    ICheckboxReadonlyExample,
    ICheckboxSizeVariantsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: ICheckbox,
    title: 'Forms/Checkbox',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        ICheckboxBasicExample
    },
    setup: () => ({ args }),
    template: '<ICheckboxBasicExample v-bind="args" />',
});

export const Basic = Template.bind({});
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
