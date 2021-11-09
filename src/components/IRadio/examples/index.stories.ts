import IRadio from '../index.vue';
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
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IRadio,
    title: 'Forms/Radio',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IRadioBasicExample
    },
    setup: () => ({ args }),
    template: '<IRadioBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const ColorVariants = () => IRadioColorVariantsExample;
export const Disabled = () => IRadioDisabledExample;
export const GroupDisabled = () => IRadioGroupDisabledExample;
export const GroupSizeVariants = () => IRadioGroupSizeVariantsExample;
export const Native = () => IRadioNativeExample;
export const Readonly = () => IRadioReadonlyExample;
export const SizeVariants = () => IRadioSizeVariantsExample;
