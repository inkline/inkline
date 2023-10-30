import ICheckboxGroup from '@inkline/inkline/components/ICheckboxGroup/ICheckboxGroup.vue';
import {
    ICheckboxBasicExample,
    ICheckboxColorVariantsExample,
    ICheckboxDisabledExample,
    ICheckboxOptionsExample,
    ICheckboxSizeVariantsExample
} from '@inkline/inkline/components/ICheckboxGroup/examples/index';
import {
    colorArgType,
    createStory,
    sizeArgType,
    createExampleStory
} from '@inkline/inkline/__storybook__';

export default {
    component: ICheckboxGroup,
    title: 'Forms/CheckboxGroup',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICheckboxBasicExample);
export const Options = createExampleStory(ICheckboxOptionsExample);
export const ColorVariants = createExampleStory(ICheckboxColorVariantsExample);
export const Disabled = createExampleStory(ICheckboxDisabledExample);
export const SizeVariants = createExampleStory(ICheckboxSizeVariantsExample);
