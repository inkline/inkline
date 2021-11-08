import IFormLabel from '../index.vue';
import {
    IFormLabelBasicExample,
    IFormLabelDisabledExample,
    IFormLabelPlacementExample,
    IFormLabelRequiredExample,
    IFormLabelSizeVariantsExample
} from './index';
import { sizeArgType } from '@inkline/inkline/__storybook__';

export default {
    component: IFormLabel,
    title: 'Forms/Form Label',
    argTypes: {
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IFormLabelBasicExample
    },
    setup: () => ({ args }),
    template: '<IFormLabelBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const Disabled = () => IFormLabelDisabledExample;
export const Placement = () => IFormLabelPlacementExample;
export const Required = () => IFormLabelRequiredExample;
export const SizeVariants = () => IFormLabelSizeVariantsExample;
