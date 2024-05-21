import { RequiredOptions as PrettierOptions } from 'prettier';

export const defaultPrettierConfig: Partial<PrettierOptions> = {
    parser: 'typescript',
    trailingComma: 'none',
    tabWidth: 4,
    semi: true,
    singleQuote: true
};
