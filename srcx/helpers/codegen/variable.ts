/**
 * Generate code for setting a css variable
 *
 * @param key
 * @param value
 */
export const codegenSetCSSVariable = <T = string | number>(key: string, value: T) => {
    return `--${key}: ${value};`;
};

/**
 * Generate code for getting a css variable
 *
 * @param key
 * @param fallbackValue
 */
export const codegenGetCSSVariable = <T = string | number>(key: string, fallbackValue?: T) => {
    return `var(--${key}${fallbackValue ? `, ${fallbackValue}` : ''})`;
};
