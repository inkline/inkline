import { IRadio } from '../index';
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
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IRadio,
    title: 'Forms/Radio',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IRadioBasicExample);
export const ColorVariants = () => IRadioColorVariantsExample;
export const Disabled = () => IRadioDisabledExample;
export const GroupDisabled = () => IRadioGroupDisabledExample;
export const GroupSizeVariants = () => IRadioGroupSizeVariantsExample;
export const Native = () => IRadioNativeExample;
export const Readonly = () => IRadioReadonlyExample;
export const SizeVariants = () => IRadioSizeVariantsExample;
