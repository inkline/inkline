import { toKebabCase } from '../string';

export const codegenCssVariables = {
    set: (name: string, value: string) => `--${name}: ${value};`,
    get: (name: string, fallback?: string) => `var(--${name}${fallback ? `, ${fallback}` : ''})`
};

export const getCssVariableNamePreamble = (path: string[]): string => {
    return path.length > 2
        ? path
              .map((part) => toKebabCase(part))
              .slice(0, -2)
              .join('--') + '--'
        : '';
};
