import { defaultDefinitionOptions, DefinitionOptions, ref, variable } from '@inkline/core';

export function useFontFamilyVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

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
        'font-family-base--secondary',
        ref(fontFamilyBase),
        options
    );
    const fontFamilyMonospaceSecondary = variable(
        'font-family-monospace--secondary',
        ref(fontFamilyMonospace),
        options
    );
    const fontFamilyPrintSecondary = variable(
        'font-family-print--secondary',
        ref(fontFamilyPrint),
        options
    );

    const fontFamily = variable(
        'font-family',
        ref(fontFamilyBase),
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

export function useFontFamily(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useFontFamilyVariables(options);
}
