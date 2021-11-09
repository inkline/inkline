import {
    IFormValidationBasicExample,
    IFormValidationBasicBindingExample,
    IFormValidationBasicValidatorsExample
} from './index';
import { colorArgType, sizeArgType } from '@inkline/inkline/__storybook__';
import { IForm } from '@inkline/inkline/components';

export default {
    component: IForm,
    title: 'Form Validation/Introduction',
    argTypes: {
        ...colorArgType(['light', 'dark']),
        ...sizeArgType()
    }
};

const Template = (args: any) => ({
    components: {
        IFormValidationBasicExample
    },
    setup: () => ({ args }),
    template: '<IFormValidationBasicExample v-bind="args" />'
});

export const Basic = Template.bind({});
export const BasicBinding = () => IFormValidationBasicBindingExample;
export const BasicValidators = () => IFormValidationBasicValidatorsExample;
