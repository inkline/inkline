import { Generator, ResolvedTheme } from '../types';
import { MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX } from '../constants';
import { codegenSetCSSVariable } from '../helpers';

export const breakpointsGenerator: Generator<ResolvedTheme['breakpoints']> = {
    name: 'breakpoints',
    location: 'root',
    test: /(.*)breakpoints$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    apply: ({ value }) => {
        return ['/**', ' * Breakpoint variables', ' */'].concat(
            Object.entries(value).map(([key, value]) => {
                return codegenSetCSSVariable(`breakpoint-${key}`, value);
            })
        );
    }
};

const breakpointCodegen = {
    css: {
        down: (key: string, nextUnitValue: string, isLast = false) =>
            isLast ? '' : `@custom-media --breakpoint-${key}-down (max-width: ${nextUnitValue});`,
        up: (key: string, unitValue: string, isFirst = false) =>
            isFirst ? '' : `@custom-media --breakpoint-${key}-up (min-width: ${unitValue});`,
        match: (key: string, unitValue: string, nextUnitValue: string) =>
            `@custom-media --breakpoint-${key} (min-width: ${unitValue})${
                nextUnitValue ? ` and (max-width: ${nextUnitValue})` : ''
            };`
    },
    scss: {
        down: (key: string, nextUnitValue: string, isLast = false) =>
            `@mixin breakpoint-${key}-down { ${
                isLast
                    ? '@content;'
                    : `@media screen and (max-width: ${nextUnitValue}) { @content; }`
            } }`,
        up: (key: string, unitValue: string, isFirst = false) =>
            `@mixin breakpoint-${key}-up { ${
                isFirst ? '@content;' : `@media screen and (min-width: ${unitValue}) { @content; }`
            } }`,
        match: (key: string, unitValue: string, nextUnitValue: string) =>
            `@mixin breakpoint-${key} { @media screen and (min-width: ${unitValue})${
                nextUnitValue ? ` and (max-width: ${nextUnitValue})` : ''
            } { @content; }}`,
        list: (breakpoints: string[], columns: number) => [
            `$columns: ${columns} !default;`,
            `$breakpoint-keys: (${breakpoints
                .map((breakpoint) => `'${breakpoint}'`)
                .join(', ')}) !default;`
        ],
        aggregate: (type: string, breakpoints: string[]) => {
            const suffix = type ? `-${type}` : '';
            const indent = '    ';

            return `\n@mixin breakpoint${suffix}($key) {\n${indent}${breakpoints
                .map(
                    (breakpoint, index) =>
                        `@${
                            index !== 0 ? 'else ' : ''
                        }if $key == '${breakpoint}' { @include breakpoint-${breakpoint}${suffix} { @content; } }`
                )
                .join(`\n${indent}`)}\n${indent}@else { @content; }\n}`;
        }
    }
};

export const breakpointsMixinsGenerator: Generator<ResolvedTheme['breakpoints']> = {
    name: 'mixins',
    location: 'default',
    test: /(.*)breakpoints$/,
    skip: [MATCH_VARIANTS_REGEX, MATCH_ELEMENTS_REGEX],
    apply: ({ config, theme, value }) => {
        const pairs = Object.entries(value).sort((a, b) => {
            return parseInt(a[1], 10) - parseInt(b[1], 10);
        });
        const language = ['.css', '.pcss'].includes(config.buildOptions.extName as string)
            ? 'css'
            : 'scss';

        const breakpoints = Object.keys(theme.breakpoints);
        const columns = theme.elements.grid.columns;

        const result = ['/**', ' * Breakpoint mixins', ' */'];

        result.push(
            ...pairs
                .map(([key, value], index) => {
                    const isFirst = index === 0;
                    const isLast = index === pairs.length - 1;
                    const nextValue: string | number = isLast ? Infinity : pairs[index + 1][1];

                    let nextUnitValue;
                    if (typeof nextValue === 'string') {
                        nextUnitValue = `${parseInt(nextValue, 10) - 0.01}${(
                            nextValue as string
                        ).replace(/^\d+/, '')}`;
                    } else {
                        nextUnitValue = `${nextValue - 0.01}px`;
                    }
                    const unitValue = typeof value === 'string' ? value : `${value}px`;

                    const rules: string[] = [];

                    rules.push(breakpointCodegen[language].down(key, nextUnitValue, isLast));
                    rules.push(breakpointCodegen[language].up(key, unitValue, isFirst));
                    rules.push(
                        breakpointCodegen[language].match(
                            key,
                            unitValue,
                            isLast ? '' : nextUnitValue
                        )
                    );

                    return rules;
                })
                .flat()
                .filter((rule) => rule)
        );

        if (language === 'scss') {
            result.push(
                ...[
                    '',
                    breakpointCodegen.scss.list(breakpoints, columns),
                    breakpointCodegen.scss.aggregate('down', breakpoints),
                    breakpointCodegen.scss.aggregate('up', breakpoints),
                    breakpointCodegen.scss.aggregate('', breakpoints)
                ].flat()
            );
        }

        return result;
    }
};

export const breakpointsGenerators: Generator[] = [
    breakpointsGenerator,
    breakpointsMixinsGenerator
];
