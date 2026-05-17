import { Radio } from '@inkline/inkline/components/Radio/index';
import {
    RadioBasicExample,
    RadioColorVariantsExample,
    RadioDisabledExample,
    RadioNativeExample,
    RadioReadonlyExample,
    RadioSizeVariantsExample
} from '@inkline/inkline/components/Radio/examples/index';
import { colorArgType, createStory, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: Radio,
    title: 'Forms/Radio',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

export const Basic = createStory(RadioBasicExample);
export const ColorVariants = () => RadioColorVariantsExample;
export const Disabled = () => RadioDisabledExample;
export const Native = () => RadioNativeExample;
export const Readonly = () => RadioReadonlyExample;
export const SizeVariants = () => RadioSizeVariantsExample;
