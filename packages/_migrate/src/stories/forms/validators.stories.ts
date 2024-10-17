import {
    FormValidationValidatorsAlphaExample,
    FormValidationValidatorsAlphanumericExample,
    FormValidationValidatorsEmailExample,
    FormValidationValidatorsMinExample,
    FormValidationValidatorsMaxExample,
    FormValidationValidatorsMinLengthExample,
    FormValidationValidatorsMaxLengthExample,
    FormValidationValidatorsNumberExample,
    FormValidationValidatorsRequiredExample,
    FormValidationValidatorsSameAsExample,
    FormValidationValidatorsCustomExample
} from '@inkline/inkline/examples/forms/validators';
import { Form } from '@inkline/inkline/components';

export default {
    component: Form,
    title: 'Form Validation/Validators'
};

export const Alpha = () => FormValidationValidatorsAlphaExample;
export const Alphanumeric = () => FormValidationValidatorsAlphanumericExample;
export const Email = () => FormValidationValidatorsEmailExample;
export const Min = () => FormValidationValidatorsMinExample;
export const Max = () => FormValidationValidatorsMaxExample;
export const MinLength = () => FormValidationValidatorsMinLengthExample;
export const MaxLength = () => FormValidationValidatorsMaxLengthExample;
export const Number = () => FormValidationValidatorsNumberExample;
export const Required = () => FormValidationValidatorsRequiredExample;
export const SameAs = () => FormValidationValidatorsSameAsExample;
export const Custom = () => FormValidationValidatorsCustomExample;
