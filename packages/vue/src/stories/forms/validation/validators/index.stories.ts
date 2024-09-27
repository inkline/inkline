import {
    IFormValidationValidatorsAlphaExample,
    IFormValidationValidatorsAlphanumericExample,
    IFormValidationValidatorsEmailExample,
    IFormValidationValidatorsMinExample,
    IFormValidationValidatorsMaxExample,
    IFormValidationValidatorsMinLengthExample,
    IFormValidationValidatorsMaxLengthExample,
    IFormValidationValidatorsNumberExample,
    IFormValidationValidatorsRequiredExample,
    IFormValidationValidatorsSameAsExample,
    IFormValidationValidatorsCustomExample
} from '@inkline/inkline/stories/forms/validation/validators/index';
import { IForm } from '@inkline/inkline/components';

export default {
    component: IForm,
    title: 'Form Validation/Validators'
};

export const Alpha = () => IFormValidationValidatorsAlphaExample;
export const Alphanumeric = () => IFormValidationValidatorsAlphanumericExample;
export const Email = () => IFormValidationValidatorsEmailExample;
export const Min = () => IFormValidationValidatorsMinExample;
export const Max = () => IFormValidationValidatorsMaxExample;
export const MinLength = () => IFormValidationValidatorsMinLengthExample;
export const MaxLength = () => IFormValidationValidatorsMaxLengthExample;
export const Number = () => IFormValidationValidatorsNumberExample;
export const Required = () => IFormValidationValidatorsRequiredExample;
export const SameAs = () => IFormValidationValidatorsSameAsExample;
export const Custom = () => IFormValidationValidatorsCustomExample;
