import {
    FormValidationBasicExample,
    FormValidationBasicBindingExample,
    FormValidationBasicValidatorsExample
} from '@inkline/inkline/examples/forms';
import { Form } from '@inkline/inkline/components';

export default {
    component: Form,
    title: 'Form Validation/Introduction'
};

export const Basic = () => FormValidationBasicExample;
export const Bindings = () => FormValidationBasicBindingExample;
export const Validators = () => FormValidationBasicValidatorsExample;
