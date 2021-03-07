import { alpha } from '@inkline/inkline/src/validation/validators/alpha';
import { alphanumeric } from '@inkline/inkline/src/validation/validators/alphanumeric';
import { custom } from '@inkline/inkline/src/validation/validators/custom';
import { number } from '@inkline/inkline/src/validation/validators/number';
import { email } from '@inkline/inkline/src/validation/validators/email';
import { max } from '@inkline/inkline/src/validation/validators/max';
import { maxLength } from '@inkline/inkline/src/validation/validators/maxLength';
import { min } from '@inkline/inkline/src/validation/validators/min';
import { minLength } from '@inkline/inkline/src/validation/validators/minLength';
import { required } from '@inkline/inkline/src/validation/validators/required';
import { sameAs } from '@inkline/inkline/src/validation/validators/sameAs';

export { alpha } from '@inkline/inkline/src/validation/validators/alpha';
export { alphanumeric } from '@inkline/inkline/src/validation/validators/alphanumeric';
export { custom } from '@inkline/inkline/src/validation/validators/custom';
export { number } from '@inkline/inkline/src/validation/validators/number';
export { email } from '@inkline/inkline/src/validation/validators/email';
export { max } from '@inkline/inkline/src/validation/validators/max';
export { maxLength } from '@inkline/inkline/src/validation/validators/maxLength';
export { min } from '@inkline/inkline/src/validation/validators/min';
export { minLength } from '@inkline/inkline/src/validation/validators/minLength';
export { required } from '@inkline/inkline/src/validation/validators/required';
export { sameAs } from '@inkline/inkline/src/validation/validators/sameAs';

export const validators = {
    alpha,
    alphanumeric,
    custom,
    number,
    email,
    max,
    maxLength,
    min,
    minLength,
    required,
    sameAs
};

export function registerValidator(name, validator) {
    validators[name] = validator;
}

export function unregisterValidator(name) {
    delete validators[name];
}
