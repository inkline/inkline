import Checkbox from '@inkline/inkline/components/Checkbox/Checkbox.vue';
import {
    CheckboxBasicExample,
    CheckboxColorVariantsExample,
    CheckboxDisabledExample,
    CheckboxIndeterminateExample,
    CheckboxNativeExample,
    CheckboxReadonlyExample,
    CheckboxSizeVariantsExample
} from '@inkline/inkline/components/Checkbox/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: Checkbox,
    title: 'Forms/Checkbox',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(CheckboxBasicExample);
export const ColorVariants = createExampleStory(CheckboxColorVariantsExample);
export const Disabled = createExampleStory(CheckboxDisabledExample);
export const Indeterminate = createExampleStory(CheckboxIndeterminateExample);
export const Native = createExampleStory(CheckboxNativeExample);
export const Readonly = createExampleStory(CheckboxReadonlyExample);
export const SizeVariants = createExampleStory(CheckboxSizeVariantsExample);
