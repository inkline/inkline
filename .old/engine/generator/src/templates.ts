import { indentLines } from '@inkline/utils';

export function rootThemeTemplate(
    variables: string,
    selectors: string,
    utilities: string
) {
    if (!variables && !selectors && !utilities) {
        return '';
    }

    const variablesString = `:root {\n${indentLines(variables)}\n}`;
    const firstSpacingString = variables && (selectors || utilities) ? '\n\n' : '';
    const selectorsString = selectors ? `${selectors}` : '';
    const secondSpacingString = selectors && utilities ? '\n\n' : '';
    const utilitiesString = utilities ? `${utilities}` : '';

    return `${variables ? variablesString : ''}${firstSpacingString}${selectorsString}${secondSpacingString}${utilitiesString}\n`;
}

export function themeTemplate(
    themeSelector: string,
    variables: string,
    selectors: string,
    utilities: string
) {
    if (!variables && !selectors && !utilities) {
        return '';
    }

    const variablesString = variables ? `${indentLines(variables)}` : '';
    const firstSpacingString = variables && (selectors || utilities) ? '\n\n' : '';
    const selectorsString = selectors ? `${indentLines(selectors)}` : '';
    const secondSpacingString = selectors && utilities ? '\n\n' : '';
    const utilitiesString = utilities ? `${indentLines(utilities)}` : '';

    return `${themeSelector} {\n${variablesString}${firstSpacingString}${selectorsString}${secondSpacingString}${utilitiesString}\n}\n`;
}
