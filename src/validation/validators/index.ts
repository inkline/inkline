import { alpha } from './alpha';
import { alphanumeric } from './alphanumeric';
import { custom } from './custom';
import { number } from './number';
import { email } from './email';
import { max } from './max';
import { maxLength } from './maxLength';
import { min } from './min';
import { minLength } from './minLength';
import { required } from './required';
import { sameAs } from './sameAs';

export { alpha } from './alpha';
export { alphanumeric } from './alphanumeric';
export { custom } from './custom';
export { number } from './number';
export { email } from './email';
export { max } from './max';
export { maxLength } from './maxLength';
export { min } from './min';
export { minLength } from './minLength';
export { required } from './required';
export { sameAs } from './sameAs';

export const validators: {
    [key: string]: (value: any, options: any) => boolean
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

export function registerValidator (name: string, validator: (value: any, options: any) => boolean): void {
    validators[name] = validator;
}

export function unregisterValidator (name: string): void {
    delete validators[name];
}
