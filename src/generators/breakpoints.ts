import { Theme, UserConfiguration } from '../types';

export const breakpointsGenerators: UserConfiguration.GeneratorPlugin<{}, Theme['breakpoints']> = () => [
    {
        name: 'breakpoints',
        test: /(.*)breakpoints$/,
        skip: /^variants/,
        generate: ({ value }) => {
            const pairs = Object.entries(value).sort((a, b) => a[1] - b[1]);

            return ['/**', ' * Breakpoint variables', ' */']
                .concat(pairs.map(([key, value], index) => {
                    const nextValue: string | number = index === pairs.length - 1 ? Infinity : pairs[index + 1][1];
                    const nextUnitValue = typeof nextValue === 'string'
                        ? `${parseInt(nextValue) - 0.01}${(nextValue as string).replace(/^\d+/, '')}`
                        : `${nextValue - 0.01}px`;
                    const unitValue = typeof value === 'string' ? value : `${value}px`;

                    const rules: string[] = [];

                    if (index !== pairs.length - 1) {
                        rules.push(`@custom-media --breakpoint-${key}-down (max-width: ${nextUnitValue});`);
                    }

                    if (index !== 0) {
                        rules.push(`@custom-media --breakpoint-${key}-up (min-width: ${unitValue});`);
                    }

                    rules.push(`@custom-media --breakpoint-${key} (min-width: ${unitValue}${index !== pairs.length - 1 ? ` and max-width: ${nextUnitValue}` : ''});`);

                    return rules;
                }).flat());
        }
    }
];
