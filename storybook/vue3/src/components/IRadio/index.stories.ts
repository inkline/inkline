import { IRadio } from '@inkline/inkline/components';
import {
    IRadioBasicExample,
    IRadioColorVariantsExample,
    IRadioDisabledExample,
    IRadioGroupDisabledExample,
    IRadioGroupSizeVariantsExample,
    IRadioNativeExample,
    IRadioReadonlyExample,
    IRadioSizeVariantsExample
} from './index';
import { colorArgType,  sizeArgType } from '@inkline/inkline/__storybook__';
import { createStory } from '@inkline/paper/storybook';

export default {
    component: IRadio,
    title: 'Forms/Radio',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IRadioBasicExample);
export const ColorVariants = createStory(IRadioColorVariantsExample);
export const Disabled = createStory(IRadioDisabledExample);
export const GroupDisabled = createStory(IRadioGroupDisabledExample);
export const GroupSizeVariants = createStory(IRadioGroupSizeVariantsExample);
export const Native = createStory(IRadioNativeExample);
export const Readonly = createStory(IRadioReadonlyExample);
export const SizeVariants = createStory(IRadioSizeVariantsExample);
