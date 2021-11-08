import IForm from '../index.vue';
import {
    IFormBasicExample,
    IFormDisabledExample,
    IFormReadonlyExample,
    IFormSizeVariantsSmExample,
    IFormSizeVariantsMdExample,
    IFormSizeVariantsLgExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IForm,
    title: 'Components/Form',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IFormBasicExample
    },
    setup: () => ({ args }),
    template: '<IFormBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const Disabled = () => IFormDisabledExample;
export const Readonly = () => IFormReadonlyExample;
export const SizeVariantsSm = () => IFormSizeVariantsSmExample;
export const SizeVariantsMd = () => IFormSizeVariantsMdExample;
export const SizeVariantsLg = () => IFormSizeVariantsLgExample;
