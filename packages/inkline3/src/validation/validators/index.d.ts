declare const validators: {
    [key: string]: (value: any, options: any) => boolean
};

declare function registerValidator(name: string, validator: (value: any, options: any) => boolean): void;
declare function unregisterValidator(name: string): void;

export { validators, registerValidator, unregisterValidator };
