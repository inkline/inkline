import IFormValidationValidatorsAlphaExample from './alpha.vue';
import IFormValidationValidatorsAlphanumericExample from './alphanumeric.vue';
import IFormValidationValidatorsEmailExample from './email.vue';
import IFormValidationValidatorsMinExample from './min.vue';
import IFormValidationValidatorsMaxExample from './max.vue';
import IFormValidationValidatorsMinLengthExample from './min-length.vue';
import IFormValidationValidatorsMaxLengthExample from './max-length.vue';
import IFormValidationValidatorsNumberExample from './number.vue';
import IFormValidationValidatorsRequiredExample from './required.vue';
import IFormValidationValidatorsSameAsExample from './same-as.vue';
import IFormValidationValidatorsCustomExample from './custom.vue';
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
