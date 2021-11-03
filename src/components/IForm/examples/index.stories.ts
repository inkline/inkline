import IForm from '../index.vue';
import {
    IFormBasicExample,
    IFormDisabledExample,
    IFormReadonlyExample,
    IFormSizeVariantsSmExample,
    IFormSizeVariantsMdExample,
    IFormSizeVariantsLgExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__/argTypes';

export default {
    component: IForm,
    title: 'Components/Form',
    argTypes: {
        ...colorArgType(),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    setup: () => ({ args }),
    template: `<i-form v-bind="args">
        Form
    </i-form>`,
});

export const Component = Template.bind({});

export const Basic = () => IFormBasicExample;
export const Disabled = () => IFormDisabledExample;
export const Readonly = () => IFormReadonlyExample;
export const SizeVariantsSm = () => IFormSizeVariantsSmExample;
export const SizeVariantsMd = () => IFormSizeVariantsMdExample;
export const SizeVariantsLg = () => IFormSizeVariantsLgExample;
            