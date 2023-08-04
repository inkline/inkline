import { parseCssSelector, parseCssVariables } from '../parser';
import { mapVariantsToVariables } from '../transformers';

describe('parseCssSelector', () => {
    it('should parse a CSS selector', () => {
        const source = `
/*
 * Button Group
 */

.button-group {
    display: block;
}`;
        const selector = parseCssSelector(source);

        expect(selector).toEqual('.button-group');
    });
});

describe('parseCssVariables', () => {
    it('should parse CSS variables without fallback', () => {
        const source = `
/*
 * Button
 */

.button {
    color: var(--button--color);
    background: var(--button--background);
}
`;
        const variables = parseCssVariables(source);

        expect(variables).toEqual([{ name: '--button--color' }, { name: '--button--background' }]);
    });

    it('should parse CSS variables with value fallback', () => {
        const source = `
/*
 * Button
 */

.button {
    color: var(--button--color, red);
    background: var(--button--background, #ff5500);
}
`;
        const variables = parseCssVariables(source);

        expect(variables).toEqual([
            { name: '--button--color', value: [{ value: 'red' }] },
            { name: '--button--background', value: [{ value: '#ff5500' }] }
        ]);
    });

    it('should parse CSS variables with multiple values fallback', () => {
        const source = `
/*
 * Button
 */

.button {
    transition: var(--button--transition, background 0.2s ease, color 0.2s ease);
}
`;
        const variables = parseCssVariables(source);

        expect(variables).toEqual([
            {
                name: '--button--transition',
                value: [{ value: 'background 0.2s ease, color 0.2s ease' }]
            }
        ]);
    });

    it('should parse CSS variables with css variable fallback', () => {
        const source = `
/*
 * Button
 */

.button {
    color: var(--button--color, var(--color-white));
    background: var(--button--background, var(--color--primary));
}
`;
        const variables = parseCssVariables(source);

        expect(variables).toEqual([
            { name: '--button--color', value: [{ name: '--color-white' }] },
            { name: '--button--background', value: [{ name: '--color--primary' }] }
        ]);
    });

    it('should parse CSS variables with multiple css variables fallback', () => {
        const source = `
/*
 * Button
 */

.button {
    border-color: var(--button--border-color, var(--border-top-color) var(--border-right-color) var(--border-bottom-color) var(--border-left-color));
}
`;
        const variables = parseCssVariables(source);

        expect(variables).toEqual([
            {
                name: '--button--border-color',
                value: [
                    { name: '--border-top-color' },
                    { name: '--border-right-color' },
                    { name: '--border-bottom-color' },
                    { name: '--border-left-color' }
                ]
            }
        ]);
    });

    it('should parse CSS variables with multiple css variables fallback on multiple lines', () => {
        const source = `
/*
 * Button
 */

.button {
    border-color: var(
        --button--border-color,
            var(--border-top-color)
            var(--border-right-color)
            var(--border-bottom-color)
            var(--border-left-color)
    );
}
`;
        const variables = parseCssVariables(source);

        expect(variables).toEqual([
            {
                name: '--button--border-color',
                value: [
                    { name: '--border-top-color' },
                    { name: '--border-right-color' },
                    { name: '--border-bottom-color' },
                    { name: '--border-left-color' }
                ]
            }
        ]);
    });
});

describe('mapVariantsToVariables', () => {
    it('should map variants to variables', () => {
        const variables = [{ name: '--button--color' }, { name: '--button--background' }];
        const variants = [
            [
                { name: '--button--primary--color', value: [{ value: 'red' }] },
                { name: '--button--primary--background', value: [{ value: '#ff5500' }] },
                { name: '--button--secondary--color', value: [{ value: 'blue' }] },
                { name: '--button--secondary--background', value: [{ value: '#0055ff' }] }
            ]
        ];
        const mappedVariables = mapVariantsToVariables(variables, variants);

        expect(mappedVariables).toEqual([
            {
                name: '--button--color',
                variants: [
                    { name: '--button--primary--color', value: [{ value: 'red' }] },
                    { name: '--button--secondary--color', value: [{ value: 'blue' }] }
                ]
            },
            {
                name: '--button--background',
                variants: [
                    { name: '--button--primary--background', value: [{ value: '#ff5500' }] },
                    { name: '--button--secondary--background', value: [{ value: '#0055ff' }] }
                ]
            }
        ]);
    });

    it('should map variants to nested variables', () => {
        const variables = [
            {
                name: '--button--border-color',
                value: [
                    { name: '--button--border-top-color' },
                    { name: '--button--border-right-color' },
                    { name: '--button--border-bottom-color' },
                    { name: '--button--border-left-color' }
                ]
            },
            { name: '--button--background' }
        ];
        const variants = [
            [
                { name: '--button--primary--border-top-color', value: [{ value: 'blue' }] },
                { name: '--button--primary--border-right-color', value: [{ value: 'blue' }] },
                { name: '--button--primary--border-bottom-color', value: [{ value: 'blue' }] },
                { name: '--button--primary--border-left-color', value: [{ value: 'blue' }] },
                { name: '--button--primary--background', value: [{ value: '#ff5500' }] },
                { name: '--button--secondary--background', value: [{ value: '#0055ff' }] }
            ]
        ];
        const mappedVariables = mapVariantsToVariables(variables, variants);

        expect(mappedVariables).toEqual([
            {
                name: '--button--border-color',
                value: [
                    {
                        name: '--button--border-top-color',
                        variants: [
                            {
                                name: '--button--primary--border-top-color',
                                value: [{ value: 'blue' }]
                            }
                        ]
                    },
                    {
                        name: '--button--border-right-color',
                        variants: [
                            {
                                name: '--button--primary--border-right-color',
                                value: [{ value: 'blue' }]
                            }
                        ]
                    },
                    {
                        name: '--button--border-bottom-color',
                        variants: [
                            {
                                name: '--button--primary--border-bottom-color',
                                value: [{ value: 'blue' }]
                            }
                        ]
                    },
                    {
                        name: '--button--border-left-color',
                        variants: [
                            {
                                name: '--button--primary--border-left-color',
                                value: [{ value: 'blue' }]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--background',
                variants: [
                    { name: '--button--primary--background', value: [{ value: '#ff5500' }] },
                    { name: '--button--secondary--background', value: [{ value: '#0055ff' }] }
                ]
            }
        ]);
    });
});
