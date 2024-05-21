export const codegenScssVariables = {
    set: (name: string, value: string | number, isDefault = true) =>
        `$${name}: ${value}${isDefault ? ' !default' : ''};`,
    get: (name: string) => `$${name}`,
    interpolate: (name: string) => `#{$${name}}`
};
