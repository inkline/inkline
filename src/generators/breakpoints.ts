import {
    codegenBreakpoints,
    codegenCssVariables,
    createFieldWithVariantsGenerateFn,
    defineGenerator,
    defineGeneratorValueFn,
    getResolvedPath,
    toUnitValue
} from '../utils';
import { GeneratorPriority, GeneratorType, ResolvedTheme, ResolvedThemeBreakpoint } from '../types';

export const generateBreakpoint = defineGeneratorValueFn<ResolvedThemeBreakpoint>(
    (breakpoint, meta) => {
        const path = getResolvedPath(meta);
        const variantName = path[path.length - 1];
        if (variantName === 'default') {
            return [];
        }

        return [codegenCssVariables.set(`breakpoint-${variantName}`, toUnitValue(breakpoint))];
    }
);

export const breakpointsGenerator = defineGenerator<ResolvedTheme['breakpoints']>({
    key: 'breakpoints',
    type: GeneratorType.CssVariables,
    generate: createFieldWithVariantsGenerateFn(generateBreakpoint)
});

export const generateBreakpointMixins = defineGeneratorValueFn<ResolvedTheme['breakpoints']>(
    (rawBreakpoints, meta) => {
        const lines = [];
        const { default: _, ...breakpoints } = rawBreakpoints;

        const breakpointKeys = Object.keys(breakpoints);
        const breakpointPairs = Object.entries(breakpoints).sort((a, b) => {
            return parseInt(a[1] as string, 10) - parseInt(b[1] as string, 10);
        });

        lines.push(
            ...breakpointPairs
                .map(([key, value], index) => {
                    const isFirst = index === 0;
                    const isLast = index === breakpointPairs.length - 1;
                    const nextValue: string | number = isLast
                        ? Infinity
                        : breakpointPairs[index + 1][1];

                    let nextUnitValue;
                    if (typeof nextValue === 'string') {
                        nextUnitValue = `${parseInt(nextValue, 10) - 0.01}${(
                            nextValue as string
                        ).replace(/^\d+/, '')}`;
                    } else {
                        nextUnitValue = toUnitValue(nextValue - 0.01);
                    }
                    const unitValue = toUnitValue(value);

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
    }
);

export const breakpointsMixinsGenerator = defineGenerator<ResolvedTheme['breakpoints']>({
    key: 'breakpoints',
    type: GeneratorType.Mixins,
    priority: GeneratorPriority.Highest,
    generate: generateBreakpointMixins
});
