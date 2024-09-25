import ICheckbox from '@inkline/inkline/components/ICheckbox/ICheckbox.vue';
import {
    ICheckboxBasicExample,
    ICheckboxColorVariantsExample,
    ICheckboxDisabledExample,
    ICheckboxIndeterminateExample,
    ICheckboxNativeExample,
    ICheckboxReadonlyExample,
    ICheckboxSizeVariantsExample
} from '@inkline/inkline/components/ICheckbox/examples/index';
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
export const Indeterminate = createExampleStory(ICheckboxIndeterminateExample);
export const Native = createExampleStory(ICheckboxNativeExample);
export const Readonly = createExampleStory(ICheckboxReadonlyExample);
export const SizeVariants = createExampleStory(ICheckboxSizeVariantsExample);
