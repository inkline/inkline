import { isCalc, isColor, isRef, isSelector, isTheme, isVariable } from '../typeGuards';
import { Calc, Color, OutputFile, Reference, Selector, Theme, Variable } from '../types';
import { defaultThemeName } from '../constants';
import {
    addDefaultIndentToLine,
    normalizePercentageValue,
    normalizeTokenName,
    toCssName
} from '../utils';
import { defaultThemeTemplate, themeTemplate } from '../templates';
import { defineGenerator } from './define';
import { applyConfigurationFiles } from '../imports';

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
export function consumeCalc(instance: Calc): string {
    return `calc(${consume(instance.__value)})`;
}

/**
 * Consumes a color instance, equivalent to setting a CSS color value
 */
export function consumeColor(instance: Color): string {
    const h = consume(instance.__value[0]);
    const s = normalizePercentageValue(consume(instance.__value[1]));
    const l = normalizePercentageValue(consume(instance.__value[2]));
    const a = consume(instance.__value[3]);

    return `hsla(${h} ${s} ${l} / ${a})`;
}

/**
 * Consumes a selector property, equivalent to setting a CSS property
 */
export function consumeSelectorProperty(key: string, value: unknown): string {
    const resolvedKey = toCssName(key);
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
        case isColor(instance):
            return consumeColor(instance);
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

export const scssGenerator = defineGenerator((configuration) => {
    const outputFiles: OutputFile[] = [];

    const themeFiles: OutputFile[] = Object.values(configuration.themes).flatMap((theme) => {
        const { variables, selectors, ...common } = theme;
        const themeOutputFiles: OutputFile[] = [];
        const themeOutputImports: string[] = [];

        if (Object.keys(variables).length) {
            themeOutputImports.push('@import "variables";');
            themeOutputFiles.push({
                path: `${theme.__name}/_variables.scss`,
                content: consume({ variables, selectors: {}, ...common })
            });
        }

        if (Object.keys(selectors).length) {
            themeOutputImports.push('@import "selectors";');
            themeOutputFiles.push({
                path: `${theme.__name}/_selectors.scss`,
                content: consume({ variables: {}, selectors, ...common })
            });
        }

        themeOutputFiles.push({
            path: `${theme.__name}/index.scss`,
            content: themeOutputImports.join('\n')
        });

        return themeOutputFiles;
    });

    const indexFile: OutputFile = {
        path: 'index.scss',
        content: Object.values(configuration.themes)
            .map((theme) => `@import '${theme.__name}';`)
            .join('\n')
    };

    outputFiles.push(...themeFiles, indexFile);

    applyConfigurationFiles(outputFiles, configuration.files);

    return outputFiles;
});
