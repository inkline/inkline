import { indentLines } from '@inkline/utils';

export function defaultThemeTemplate(themeSelector: string, variables: string, selectors: string) {
    if (!variables && !selectors) {
        return '';
    }

    const variablesString = `${themeSelector} {\n${indentLines(variables)}\n}`;
    const spacingString = variables && selectors ? '\n\n' : '';
    const selectorsString = selectors ? `${selectors}` : '';

    return `${variables ? variablesString : ''}${spacingString}${selectorsString}\n`;
}

export function themeTemplate(themeSelector: string, variables: string, selectors: string) {
    if (!variables && !selectors) {
        return '';
    }

    const variablesString = variables ? `${indentLines(variables)}` : '';
    const spacingString = variables && selectors ? '\n\n' : '';
    const selectorsString = selectors ? `${indentLines(selectors)}` : '';

    return `${themeSelector} {\n${variablesString}${spacingString}${selectorsString}\n}\n`;
}
