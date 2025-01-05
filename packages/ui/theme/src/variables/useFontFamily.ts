import { DefinitionOptions, ref, variable } from '@inkline/core';

export function useFontFamily(options: DefinitionOptions) {
    const fontFamilyBase = variable(
        'font-family-base',
        '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen-Sans, Ubuntu, Cantarell, \'Helvetica Neue\', sans-serif',
        options
    );
    const fontFamilyMonospace = variable(
        'font-family-monospace',
        '\'SFMono-Regular\', Menlo, Monaco, Consolas, \'Liberation Mono\', \'Courier New\', monospace',
        options
    );
    const fontFamilyPrint = variable(
        'font-family-print',
        '\'Georgia\', \'Times New Roman\', \'Times\', serif',
        options
    );

    const fontFamilyBaseSecondary = variable(
        'font-family-base-secondary',
        ref(fontFamilyBase),
        options
    );
    const fontFamilyMonospaceSecondary = variable(
        'font-family-monospace-secondary',
        ref(fontFamilyMonospace),
        options
    );
    const fontFamilyPrintSecondary = variable(
        'font-family-print-secondary',
        ref(fontFamilyPrint),
        options
    );

    return {
        fontFamilyBase,
        fontFamilyMonospace,
        fontFamilyPrint,
        fontFamilyBaseSecondary,
        fontFamilyMonospaceSecondary,
        fontFamilyPrintSecondary
    };
}
