import { IRadioGroup } from '@inkline/inkline/components/IRadioGroup';
import {
    IRadioBasicExample,
    IRadioColorVariantsExample,
    IRadioDisabledExample,
    IRadioReadonlyExample,
    IRadioOptionsExample,
    IRadioSizeVariantsExample
} from '@inkline/inkline/components/IRadioGroup/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IRadioGroup,
    title: 'Forms/RadioGroup',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(IRadioBasicExample);
export const Options = () => IRadioOptionsExample;
export const ColorVariants = () => IRadioColorVariantsExample;
export const Disabled = () => IRadioDisabledExample;
export const Readonly = () => IRadioReadonlyExample;
export const SizeVariants = () => IRadioSizeVariantsExample;
