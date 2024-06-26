import {
    defineGenerator,
    defineModule,
    getResolvedPath,
    isInternalKey,
    isObject,
    isReservedChildElementKey,
    toKebabCase
} from '../utils';
import { GeneratorPriority, GeneratorOutput } from '../types';
import { RawThemeColor, ResolvedThemeColor } from './colors';
import { RawThemeBorder, ResolvedThemeBorder } from './border';
import { RawThemeBorderRadius, ResolvedThemeBorderRadius } from './borderRadius';
import { RawThemeBoxShadow, ResolvedThemeBoxShadow } from './boxShadow';
import { RawThemeTypographyFontSize, ResolvedThemeTypographyFontSize } from './typography';
import {
    RawThemeMargin,
    RawThemePadding,
    ResolvedThemeMargin,
    ResolvedThemePadding
} from './spacing';
import { RawThemeTransition, ResolvedThemeTransition } from './transition';

/**
 * Types
 */

export type ThemeElementName = string;

export interface RawThemeElementDefinition {
    background?: Partial<RawThemeColor>;
    border?: Partial<RawThemeBorder>;
    borderRadius?: Partial<RawThemeBorderRadius>;
    boxShadow?: Partial<RawThemeBoxShadow>;
    color?: Partial<RawThemeColor>;
    fontSize?: Partial<RawThemeTypographyFontSize>;
    margin?: Partial<RawThemeMargin>;
    padding?: Partial<RawThemePadding>;
    transition?: Partial<RawThemeTransition>;
    [key: string]:
        | RawThemeElementDefinition
        | object // Generic for object variable values
        | string
        | number
        | boolean
        | undefined;
}

export type ThemeComponentName = string;

export type ResolvedThemeElementDefinition = Partial<{
    background: ResolvedThemeColor;
    border: ResolvedThemeBorder;
    borderRadius: ResolvedThemeBorderRadius;
    boxShadow: ResolvedThemeBoxShadow;
    color: ResolvedThemeColor;
    fontSize: ResolvedThemeTypographyFontSize;
    margin: ResolvedThemeMargin;
    padding: ResolvedThemePadding;
    transition: ResolvedThemeTransition;
    [key: string]: any;
}>;

export type ResolvedThemeComponent = ResolvedThemeElementDefinition;

/**
 * Utils
 */

export function getPropertyPaths(obj: any, currentPath: string = ''): string[] {
    const paths: string[] = [];

    if (!isObject(obj)) {
        return [currentPath];
    }

    for (const key in obj) {
        if (typeof obj[key] === 'undefined' || isInternalKey(key)) {
            continue;
        }

        const newPath = currentPath ? `${currentPath}-${toKebabCase(key)}` : toKebabCase(key);
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            paths.push(...getPropertyPaths(obj[key], newPath));
        } else {
            paths.push(newPath);
        }
    }

    return paths;
}

export function generateIncludeProperties(
    variant: Record<string, any>,
    componentName: string,
    variantName: string,
    path: string[] = []
): string[] {
    const elementOrState = path.map((p) => `'${p}'`).join(' ');
    const elementOrStateString = elementOrState ? `, ${elementOrState}` : '';

    return Object.keys(variant).flatMap((property) => {
        if (isInternalKey(property)) {
            return '';
        }

        const propertyValue = variant[property] as { default: string } | string;
        const propertyName = toKebabCase(property);

        if (isReservedChildElementKey(property)) {
            const propertyPaths = getPropertyPaths(
                typeof propertyValue === 'object' && 'default' in propertyValue
                    ? propertyValue.default
                    : propertyValue,
                propertyName
            ).map((propertyPath) => {
                if (propertyPath.startsWith('border-radius')) {
                    return `${propertyPath.replace('border-radius-', 'border-')}-radius`;
                }

                return propertyPath;
            });

            return propertyPaths.map((part) => {
                return `@include variants.${part}('${componentName}', '${variantName}'${elementOrStateString});`;
            });
        } else if (typeof variant[property] === 'object') {
            return generateIncludeProperties(
                variant[property] as Record<string, unknown>,
                componentName,
                variantName,
                [...path, property]
            );
        }

        return '';
    });
}

/**
 * Generator
 */

export const componentVariantsGenerator = defineGenerator<ResolvedThemeComponent>({
    key: /^components\.[^.]+$/,
    output: GeneratorOutput.Default,
    priority: GeneratorPriority.Highest,
    sideEffects: true,
    generate: (value, meta) => {
        const result = [];
        const path = getResolvedPath(meta);
        const variants = Object.keys(value).filter(
            (key) => key !== 'default' && !isInternalKey(key)
        );
        const componentName = toKebabCase(path[path.length - 1]);
        const componentSelector = `.${componentName}`;

        result.push(`@use '../mixins/variants';\n`);
        result.push(`${componentSelector} {`);

        for (const variant of variants) {
            const variantName = toKebabCase(variant);

            result.push(`@include variants.selector('${variantName}') {`);
            result.push(
                ...generateIncludeProperties(
                    value[variant] as Record<string, unknown>,
                    componentName,
                    variantName
                )
            );
            result.push(`}`);
        }

        result.push('}\n');

        return result;
    }
});

/**
 * Module
 */

export const components = defineModule(({ registerGenerator }) => {
    registerGenerator(componentVariantsGenerator);
});
