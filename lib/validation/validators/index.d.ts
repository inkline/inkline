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
export declare const validators: {
    [key: string]: (value: any, options: any) => boolean;
};
export declare function registerValidator(name: string, validator: (value: any, options: any) => boolean): void;
export declare function unregisterValidator(name: string): void;
