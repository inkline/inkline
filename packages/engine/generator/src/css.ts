import {
    resolvePercentagePropertyValue,
    normalizeTokenName,
    toCssName,
    defaultThemeName,
    isCalc,
    isColor,
    isAtRule,
    isRef,
    isSelector,
    isTheme,
    isVariable,
    isCSS,
    defineGenerator,
    Transform,
    isTransform,
    isTokenValue
} from '@inkline/core';
import type {
    Calc,
    Color,
    AtRule,
    OutputFile,
    Reference,
    Selector,
    Theme,
    Variable,
    ComponentValue,
    CSS
} from '@inkline/core';
import { indentLines } from '@inkline/utils';
import { defaultThemeTemplate, themeTemplate } from './templates';
import { applyConfigurationFiles } from './imports';

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
    if (isCSS(instance.__value)) {
        return `hsla(${consume(instance.__value)})`;
    }

    const h = consume(instance.__value[0]);
    const s = resolvePercentagePropertyValue(consume(instance.__value[1]));
    const l = resolvePercentagePropertyValue(consume(instance.__value[2]));
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
 * Consumes a selector variable, equivalent to setting a CSS variable within a selector
 */
export function consumeSelectorVariables(value: Variable[]): string {
    return value.map(consumeVariable).join('\n');
}

/**
 * Consumes a selector instance, equivalent to setting a CSS selector
 */
export function consumeSelector(instance: Selector): string {
    const value = isTokenValue(instance.__value)
        ? consume(instance.__value)
        : consumeComponentValue(instance.__value);

    return `${instance.__name} {
${indentLines(value)}
}`;
}

/**
 * Consumes a component value, equivalent to the body of a selector
 */
export function consumeComponentValue(instance: ComponentValue): string {
    return Object.entries(instance)
        .map(([propertyName, propertyValue]) =>
            propertyName === 'variables'
                ? consumeSelectorVariables(propertyValue as Variable[])
                : consumeSelectorProperty(propertyName, propertyValue)
        )
        .join('\n');
}

/**
 * Consumes a media instance, equivalent to setting a CSS media query
 */
export function consumeAtRule(instance: AtRule): string {
    let value: string;
    if (Array.isArray(instance.__value)) {
        value = instance.__value.map(consume).join('\n\n');
    } else if (isSelector(instance.__value)) {
        value = consumeSelector(instance.__value);
    } else if (isTokenValue(instance.__value)) {
        value = consume(instance.__value);
    } else {
        value = consumeComponentValue(instance.__value);
    }

    return `@${instance.__name} ${instance.__identifier} {
${indentLines(value)}
}`;
}

/**
 * Consumes a transform value, equivalent to setting a CSS transform value
 */
export function consumeTransform(instance: Transform): string {
    return `${instance.__name}(${instance.__value.map(consume).join(', ')})`;
}

/**
 * Consumes a CSS value, equivalent to the string body of a selector
 */
export function consumeCSS(instance: CSS): string {
    return instance.__value.map(consume).join('');
}

/**
 * Consumes a theme instance, setting all variables and selectors
 */
export function consumeTheme(instance: Theme) {
    const isDefaultTheme = instance.__name === defaultThemeName;
    const variables = instance.variables
        ? Array.from(instance.__keys.variables)
              .reduce<string[]>((acc, key) => {
                  acc.push(consumeVariable(instance.variables[key]));
                  return acc;
              }, [])
              .join('\n')
        : '';
    const selectors = instance.selectors ? instance.selectors.map(consume).join('\n\n') : '';

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
        case isAtRule(instance):
            return consumeAtRule(instance);
        case isTransform(instance):
            return consumeTransform(instance);
        case isTheme(instance):
            return consumeTheme(instance);
        case isCSS(instance):
            return consumeCSS(instance);
        default:
            return consumePrimitive(instance);
    }
}

/**
 * CSS Consumer
 */

export const cssGenerator = defineGenerator((configuration) => {
    const outputFiles: OutputFile[] = [];

    const themeFiles: OutputFile[] = Object.values(configuration.themes).flatMap((theme) => {
        const { variables, selectors, ...common } = theme;
        const themeOutputFiles: OutputFile[] = [];
        const themeOutputImports: string[] = [];

        if (Object.keys(variables).length) {
            themeOutputImports.push('@import "variables.css";');
            themeOutputFiles.push({
                path: `${theme.__name}/variables.css`,
                content: consume({ variables, ...common })
            });
        }

        if (Object.keys(selectors).length) {
            themeOutputImports.push('@import "selectors.css";');
            themeOutputFiles.push({
                path: `${theme.__name}/selectors.css`,
                content: consume({ selectors, ...common })
            });
        }

        themeOutputFiles.push({
            path: `${theme.__name}/index.css`,
            content: themeOutputImports.join('\n')
        });

        return themeOutputFiles;
    });

    const indexFile: OutputFile = {
        path: 'index.css',
        content: Object.values(configuration.themes)
            .map((theme) => `@import '${theme.__name}/index.css';`)
            .join('\n')
    };

    outputFiles.push(...themeFiles, indexFile);

    applyConfigurationFiles(outputFiles, configuration.files);

    return outputFiles;
});
