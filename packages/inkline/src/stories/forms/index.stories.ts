import {
    IFormValidationBasicExample,
    IFormValidationBasicBindingExample,
    IFormValidationBasicValidatorsExample
} from '../examples/index';
import { IForm } from '@inkline/inkline/components';

export default {
    component: IForm,
    title: 'Form Validation/Introduction'
};

export const Basic = () => IFormValidationBasicExample;
export const Bindings = () => IFormValidationBasicBindingExample;
export const Validators = () => IFormValidationBasicValidatorsExample;
