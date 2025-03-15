import {
    Configuration,
    Variable,
    createContext,
    ref,
    variable,
    GeneratorAddonTailwindCSSOptions
} from '@inkline/core';
import { consume } from '../consume';

export function createTailwindCSSTheme(
    configuration: Configuration,
    addonOptions?: GeneratorAddonTailwindCSSOptions
): string {
    const variables: Variable[] = [];
    const context = createContext();
    const options = { context };

    const defaultTheme = configuration.themes.default;
    const defaultThemeVariables = defaultTheme.variables;
    const defaultThemeVariablesKeys = [...defaultTheme.__keys.variables];

    defaultThemeVariablesKeys.forEach((key) => {
        if (key.startsWith('color-')) {
            variables.push(variable(key, ref(defaultThemeVariables[key]), options));
        }

        if (key.startsWith('font-weight-')) {
            variables.push(variable(key, ref(defaultThemeVariables[key]), options));
        }

        if (key.startsWith('font-family-')) {
            variables.push(
                variable(key.replace('-family', ''), ref(defaultThemeVariables[key]), options)
            );
        }

        if (key.startsWith('font-size-') && !(key.includes('min') || key.includes('max'))) {
            variables.push(
                variable(
                    key.replace('font-size-', 'text-'),
                    ref(defaultThemeVariables[key]),
                    options
                )
            );
        }

        if (key.startsWith('letter-spacing-')) {
            variables.push(
                variable(
                    key.replace('letter-spacing-', 'tracking-'),
                    ref(defaultThemeVariables[key]),
                    options
                )
            );
        }

        if (key.startsWith('line-height-')) {
            variables.push(
                variable(
                    key.replace('line-height-', 'leading-'),
                    ref(defaultThemeVariables[key]),
                    options
                )
            );
        }

        if (key.startsWith('breakpoint-')) {
            variables.push(variable(key, ref(defaultThemeVariables[key]), options));
        }

        if (key.startsWith('spacing-')) {
            variables.push(variable(key, ref(defaultThemeVariables[key]), options));
        }

        if (key.startsWith('border-radius-')) {
            variables.push(
                variable(key.replace('border-', ''), ref(defaultThemeVariables[key]), options)
            );
        }

        if (key.startsWith('box-shadow-')) {
            variables.push(
                variable(key.replace('box-', 'drop-'), ref(defaultThemeVariables[key]), options)
            );
        }
    });

    Object.entries({
        xs: '0 1px 1px rgb(0 0 0 / 0.05)',
        sm: '0 1px 2px rgb(0 0 0 / 0.15)',
        md: '0 3px 3px rgb(0 0 0 / 0.12)',
        lg: '0 4px 4px rgb(0 0 0 / 0.15)',
        xl: '0 9px 7px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 25px rgb(0 0 0 / 0.15)'
    }).forEach(([key, value]) => {
        variables.push(variable(`drop-shadow-${key}`, value, options));
    });

    Object.entries({
        '3xs': '16rem',
        '2xs': '18rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem'
    }).forEach(([key, value]) => {
        variables.push(variable(`container-${key}`, value, options));
    });

    Object.entries({
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px'
    }).forEach(([key, value]) => {
        variables.push(variable(`blur-${key}`, value, options));
    });

    Object.entries({
        '2xs': '0 1px rgb(0 0 0 / 0.05)',
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
    }).forEach(([key, value]) => {
        variables.push(variable(`shadow-${key}`, value, options));
    });

    Object.entries({
        dramatic: '100px',
        near: '300px',
        normal: '500px',
        midrange: '800px',
        distant: '1200px'
    }).forEach(([key, value]) => {
        variables.push(variable(`perspective-${key}`, value, options));
    });

    Object.entries({
        '2xs': '0 1px rgb(0 0 0 / 0.05)',
        xs: '0 1px 1px rgb(0 0 0 / 0.05)',
        sm: '0 2px 4px rgb(0 0 0 / 0.05)'
    }).forEach(([key, value]) => {
        variables.push(variable(`inset-shadow-${key}`, value, options));
    });

    Object.entries({
        video: '16 / 9'
    }).forEach(([key, value]) => {
        variables.push(variable(`aspect-${key}`, value, options));
    });

    Object.entries({
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).forEach(([key, value]) => {
        variables.push(variable(`ease-${key}`, value, options));
    });

    return `@theme inline${addonOptions?.prefix ? ` prefix(${addonOptions.prefix})` : ''} {
    --*: initial;

    ${variables.map(consume).join('\n    ')}
}`;
}

export function createTailwindCSSUtilities(
    _configuration: Configuration,
    _addonOptions?: GeneratorAddonTailwindCSSOptions
) {
    return `@tailwind utilities;`;
}
