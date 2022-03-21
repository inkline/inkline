import { ICheckbox } from '@inkline/inkline/components';
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
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: ICheckbox,
    title: 'Forms/Checkbox',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(ICheckboxBasicExample);
export const ColorVariants = createStory(ICheckboxColorVariantsExample);
export const Disabled = createStory(ICheckboxDisabledExample);
export const Group = createStory(ICheckboxGroupExample);
export const GroupDisabled = createStory(ICheckboxGroupDisabledExample);
export const GroupSizeVariants = createStory(ICheckboxGroupSizeVariantsExample);
export const GroupColorVariants = createStory(ICheckboxGroupColorVariantsExample);
export const Indeterminate = createStory(ICheckboxIndeterminateExample);
export const Native = createStory(ICheckboxNativeExample);
export const Readonly = createStory(ICheckboxReadonlyExample);
export const SizeVariants = createStory(ICheckboxSizeVariantsExample);
