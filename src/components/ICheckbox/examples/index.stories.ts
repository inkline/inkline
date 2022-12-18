import ICheckbox from '../ICheckbox.vue';
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
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: ICheckbox,
    title: 'Forms/Checkbox',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICheckboxBasicExample);
export const ColorVariants = createExampleStory(ICheckboxColorVariantsExample);
export const Disabled = createExampleStory(ICheckboxDisabledExample);
export const Group = createExampleStory(ICheckboxGroupExample);
export const GroupDisabled = createExampleStory(ICheckboxGroupDisabledExample);
export const GroupSizeVariants = createExampleStory(ICheckboxGroupSizeVariantsExample);
export const GroupColorVariants = createExampleStory(ICheckboxGroupColorVariantsExample);
export const Indeterminate = createExampleStory(ICheckboxIndeterminateExample);
export const Native = createExampleStory(ICheckboxNativeExample);
export const Readonly = createExampleStory(ICheckboxReadonlyExample);
export const SizeVariants = createExampleStory(ICheckboxSizeVariantsExample);
