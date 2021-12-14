import IRadio from '../index.vue';
import IRadioBasicExample from './basic.vue';
import IRadioColorVariantsExample from './color-variants.vue';
import IRadioDisabledExample from './disabled.vue';
import IRadioGroupDisabledExample from './group-disabled.vue';
import IRadioGroupSizeVariantsExample from './group-size-variants.vue';
import IRadioNativeExample from './native.vue';
import IRadioReadonlyExample from './readonly.vue';
import IRadioSizeVariantsExample from './size-variants.vue';
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
