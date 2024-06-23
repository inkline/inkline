import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    createGenericVariantResolveFn,
    defineGeneratorValueFn,
    getCssVariableVariantName,
    codegenCssVariables,
    toUnitValue,
    defineGenerator,
    isInternalKey,
    defineModule
} from '../utils';
import {
    GeneratorOutput,
    GeneratorPriority,
    RawTheme,
    RawThemeValueType,
    ResolvedTheme,
    ResolvedThemeValueType,
    ThemeVariable
} from '../types';

/**
 * Types
 */

export type RawThemeBreakpoint = string | number;

export type ResolvedThemeBreakpoint = string | number;

/**
 * Utils
 */

export const codegenBreakpoints = {
    down: (key: string, nextUnitValue: string, isLast = false) => [
        `@mixin breakpoint-${key}-down {`,
        isLast ? '@content;' : `@media screen and (max-width: ${nextUnitValue}) { @content; }`,
        '}'
    ],
    up: (key: string, unitValue: string, isFirst = false) => [
        `@mixin breakpoint-${key}-up {`,
        isFirst ? '@content;' : `@media screen and (min-width: ${unitValue}) { @content; }`,
        '}'
    ],
    match: (key: string, unitValue: string, nextUnitValue: string) => [
        `@mixin breakpoint-${key} { @media screen and (min-width: ${unitValue})${nextUnitValue ? ` and (max-width: ${nextUnitValue})` : ''} { @content; }}`
    ],
    list: (breakpoints: string[]) => [
        `$breakpoint-keys: (${breakpoints.map((breakpoint) => `'${breakpoint}'`).join(', ')}) !default;`
    ],
    aggregate: (type: string, breakpoints: string[]) => {
        const suffix = type ? `-${type}` : '';
        const aggregateStrings = breakpoints.map(
            (breakpoint, index) =>
                `@${index !== 0 ? 'else ' : ''}if $key == '${breakpoint}' { @include breakpoint-${breakpoint}${suffix} { @content; } }`
        );
        return [
            `@mixin breakpoint${suffix}($key) {`,
            ...aggregateStrings.map((str) => `${str}`),
            `@else { @content; }`,
            '}'
        ];
    }
};

/**
 * Resolver
 */

export const resolveBreakpoint = defineResolverValueFn<RawThemeBreakpoint, ResolvedThemeBreakpoint>(
    (breakpoint) => breakpoint
);

export const resolveBreakpointVariant = defineResolverVariantFn<
    RawThemeBreakpoint,
    ResolvedThemeBreakpoint
>(resolveBreakpoint);

export const breakpointsResolver = defineResolver<
    RawThemeValueType<RawTheme['breakpoints']>,
    ResolvedThemeValueType<ResolvedTheme['breakpoints']>
>({
    key: /^breakpoints\.[^.]+$/,
    resolve: createGenericVariantResolveFn(resolveBreakpoint, resolveBreakpointVariant)
});

/**
 * Generator
 */

export const generateBreakpoint = defineGeneratorValueFn<ResolvedThemeBreakpoint>(
    (breakpoint, meta) => {
        const variantName = getCssVariableVariantName(meta);
        if (variantName === 'default') {
            return [];
        }

        return [codegenCssVariables.set(`breakpoint-${variantName}`, toUnitValue(breakpoint))];
    }
);

export const breakpointsGenerator = defineGenerator<ResolvedThemeBreakpoint>({
    key: /^breakpoints\.[^.]+$/,
    output: GeneratorOutput.CssVariables,
    generate: generateBreakpoint
});

export const generateBreakpointMixins = defineGeneratorValueFn<
    ThemeVariable<ResolvedThemeBreakpoint>
>((rawBreakpoints) => {
    const lines = [];
    const { default: _, ...breakpoints } = rawBreakpoints;

    const breakpointKeys = Object.keys(breakpoints).filter((key) => !isInternalKey(key));
    const breakpointPairs = Object.entries(breakpoints).filter(([key]) => !isInternalKey(key)) as [
        string,
        RawThemeBreakpoint
    ][];

    breakpointPairs.sort((a, b) => {
        return parseInt(a[1] as string, 10) - parseInt(b[1] as string, 10);
    });

    lines.push(
        ...breakpointPairs
            .map(([key, value], index) => {
                const isFirst = index === 0;
                const isLast = index === breakpointPairs.length - 1;
                const nextValue: string | number | undefined = isLast
                    ? Infinity
                    : breakpointPairs[index + 1][1] ?? 0;

                let nextUnitValue;
                if (typeof nextValue === 'string') {
                    nextUnitValue = `${parseInt(nextValue, 10) - 0.01}${nextValue.replace(
                        /^\d+/,
                        ''
                    )}`;
                } else {
                    nextUnitValue = toUnitValue(nextValue - 0.01);
                }
                const unitValue = toUnitValue(value ?? 0);

                const rules: string[] = [];

                rules.push(...codegenBreakpoints.down(key, nextUnitValue, isLast));
                rules.push(...codegenBreakpoints.up(key, unitValue, isFirst));
                rules.push(
                    ...codegenBreakpoints.match(key, unitValue, isLast ? '' : nextUnitValue)
                );

                return rules;
            })
            .flat()
            .filter((rule) => rule)
    );

    lines.push(
        ...codegenBreakpoints.list(breakpointKeys),
        ...codegenBreakpoints.aggregate('down', breakpointKeys),
        ...codegenBreakpoints.aggregate('up', breakpointKeys),
        ...codegenBreakpoints.aggregate('', breakpointKeys)
    );

    return lines;
});

// @TODO Fix generation of breakpoints mixins
export const breakpointsMixinsGenerator = defineGenerator<ThemeVariable<ResolvedThemeBreakpoint>>({
    key: 'breakpoints',
    output: GeneratorOutput.Mixins,
    priority: GeneratorPriority.Highest,
    generate: generateBreakpointMixins
});

/**
 * Module
 */

export const breakpoints = defineModule(({ registerGenerator, registerResolver }) => {
    registerResolver(breakpointsResolver);
    registerGenerator(breakpointsGenerator);
    registerGenerator(breakpointsMixinsGenerator);
});
