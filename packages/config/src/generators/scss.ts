import { isCalc, isRef, isSelector, isTheme, isVariable } from '../typeGuards';
import { Calc, OutputFile, Reference, Selector, Theme, Variable } from '../types';
import { defaultThemeName } from '../constants';
import { addDefaultIndentToLine, normalizeTokenName, toKebabCase } from '../utils';
import { defaultThemeTemplate, themeTemplate } from '../templates';
import { defineGenerator } from './define';

/**
 * Consumes each item in an array and joins the result
 */
export function consumeArray(instance: unknown[]): string {
    return instance.map(consume).join(' ');
}

/**
 * Consumes a variable instance, equivalent to setting a CSS variable
 */
export function consumeVariable(instance: Variable): string {
    return `--${normalizeTokenName(instance.__name)}: ${consume(instance.__value)};`;
}

/**
 * Consumes a ref instance, equivalent to referencing a CSS variable with optional fallback
 */
export function consumeRef(instance: Reference): string {
    return `var(--${normalizeTokenName(instance.__name)}${instance.__fallback ? `, ${consume(instance.__fallback)}` : ''})`;
}

/**
 * Consumes a calc instance, equivalent to setting a CSS calc value
 */
export function consumeCalc(instance: Calc) {
    return `calc(${consume(instance.__value)})`;
}

/**
 * Consumes a selector property, equivalent to setting a CSS property
 */
export function consumeSelectorProperty(key: string, value: unknown): string {
    const resolvedKey = toKebabCase(key);
    return `${resolvedKey}: ${consume(value)};`;
}

/**
 * Consumes a selector instance, equivalent to setting a CSS selector
 */
export function consumeSelector(instance: Selector): string {
    return `${instance.__name} {
${Object.entries(instance.__value)
    .map(([propertyName, propertyValue]) => consumeSelectorProperty(propertyName, propertyValue))
    .map(addDefaultIndentToLine)
    .join('\n')}
}`;
}

/**
 * Consumes a theme instance, setting all variables and selectors
 */
export function consumeTheme(instance: Theme) {
    const isDefaultTheme = instance.__name === defaultThemeName;
    const variables = Object.values(instance.variables).map(consumeVariable).join('\n');
    const selectors = Object.values(instance.selectors).map(consumeSelector).join('\n\n');

    return isDefaultTheme
        ? defaultThemeTemplate(':root', variables, selectors)
        : themeTemplate(`.${instance.__name}-theme`, variables, selectors);
}

/**
 * Consumes a primitive instance, equivalent to setting a CSS value
 */
export function consumePrimitive(instance: unknown): string {
    return instance !== undefined && instance !== null ? `${instance as string}` : '';
}

/**
 * Consumes any token instance and returns the CSS string representation
 */
export function consume(instance: unknown): string {
    switch (true) {
        case Array.isArray(instance):
            return consumeArray(instance);
        case isVariable(instance):
            return consumeVariable(instance);
        case isRef(instance):
            return consumeRef(instance);
        case isCalc(instance):
            return consumeCalc(instance);
        case isSelector(instance):
            return consumeSelector(instance);
        case isTheme(instance):
            return consumeTheme(instance);
        default:
            return consumePrimitive(instance);
    }
}

/**
 * SCSS Consumer
 */

export const scssGenerator = defineGenerator((themes) => {
    const themeFiles: OutputFile[] = Object.values(themes).map((theme) => ({
        path: `${theme.__name}.scss`,
        content: consume(theme)
    }));

    const indexFile: OutputFile = {
        path: 'index.scss',
        content: Object.values(themes)
            .map((theme) => `@import '${theme.__name}';`)
            .join('\n')
    };

    return [...themeFiles, indexFile];
});
