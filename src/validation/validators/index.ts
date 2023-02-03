import { alpha } from '@inkline/inkline/validation/validators/alpha';
import { alphanumeric } from '@inkline/inkline/validation/validators/alphanumeric';
import { custom } from '@inkline/inkline/validation/validators/custom';
import { number } from '@inkline/inkline/validation/validators/number';
import { email } from '@inkline/inkline/validation/validators/email';
import { max } from '@inkline/inkline/validation/validators/max';
import { maxLength } from '@inkline/inkline/validation/validators/maxLength';
import { min } from '@inkline/inkline/validation/validators/min';
import { minLength } from '@inkline/inkline/validation/validators/minLength';
import { required } from '@inkline/inkline/validation/validators/required';
import { sameAs } from '@inkline/inkline/validation/validators/sameAs';

export { alpha } from '@inkline/inkline/validation/validators/alpha';
export { alphanumeric } from '@inkline/inkline/validation/validators/alphanumeric';
export { custom } from '@inkline/inkline/validation/validators/custom';
export { number } from '@inkline/inkline/validation/validators/number';
export { email } from '@inkline/inkline/validation/validators/email';
export { max } from '@inkline/inkline/validation/validators/max';
export { maxLength } from '@inkline/inkline/validation/validators/maxLength';
export { min } from '@inkline/inkline/validation/validators/min';
export { minLength } from '@inkline/inkline/validation/validators/minLength';
export { required } from '@inkline/inkline/validation/validators/required';
export { sameAs } from '@inkline/inkline/validation/validators/sameAs';

export const validators: {
    [key: string]: (value: any, options: any) => boolean;
} = {
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

export function registerValidator(
    name: string,
    validator: (value: any, options: any) => boolean
): void {
    validators[name] = validator;
}

export function unregisterValidator(name: string): void {
    delete validators[name];
}
