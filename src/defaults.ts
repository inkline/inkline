export const defaultConfig = {
    // Each plugin returns { parser, generator? }
    // Each parser function recieves the config object to be processed
    // The return value for each parser will be a variables group or styles group, containing an array of elements
    // Each generator processes the return values of the parser into a string
    plugins: [
        color(), // Parser, options { name: (parts) => `color--${parts.join('--')}` }
        spacing(), // Parser, finds 'padding' and 'margin'
        borderRadius(), // Parser, finds field ending with 'borderRadius'
        border(), // Parser, finds field ending with 'border'
        boxShadow(), // Parser, finds field ending with 'boxShadow'
        generic(), // Parser, finds anything else
        theme(), // Generator, renders comment and applies generators to every item in items, wraps items in class if not default
        group(), // Generator, renders comment and applies generators to every item in items
        variable() // Generator, renders CSS Variable
    ],

    // The config object itself will be processed by the plugins
    theme: {
        default: {
            padding: '1rem'
        },
        light: {},
        dark: {
            colors: {
                green: '30',
                red: {
                    default: '',
                    10: '#SOMEVALUE',
                    20: '#SOMEVALUE',
                    30: '#SOMEVALUE',
                    40: '#SOMEVALUE',
                    50: '#SOMEVALUE'
                }
            }
        }
    }
};

// Possible values for padding
// '1rem'
// '1rem 1rem'
// '1rem 1rem 1rem'
// '1rem 1rem 1rem 1rem'
// ['1rem']
// ['1rem', '1rem']
// ['1rem', '1rem', '1rem']
// ['1rem', '1rem', '1rem', '1rem']
// { top: '1rem' }

// Return type example
const returnValue = [
    {
        type: 'theme',
        name: 'default',
        items: [
            {
                type: 'group',
                name: 'Padding',
                items: [
                    { type: 'variable', name: 'padding-top', value: '1rem' },
                    { type: 'variable', name: 'padding-right', value: '1rem' },
                    { type: 'variable', name: 'padding-bottom', value: '1rem' },
                    { type: 'variable', name: 'padding-left', value: '1rem' },
                ]
            },
            {
                type: 'group',
                name: 'Margin',
                items: [
                    { type: 'variable', name: 'margin-top', value: '1rem' },
                    { type: 'variable', name: 'margin-right', value: '1rem' },
                    { type: 'variable', name: 'margin-bottom', value: '1rem' },
                    { type: 'variable', name: 'margin-left', value: '1rem' },
                ]
            },
            {
                type: 'group',
                name: 'Colors',
                items: [
                    {
                        type: 'group',
                        name: 'Red',
                        items: [
                            { type: 'variable', name: 'color--red--h', value: '50' },
                            { type: 'variable', name: 'color--red--s', value: '31%' },
                            { type: 'variable', name: 'color--red--l', value: '55%' },
                            { type: 'variable', name: 'color--red--a', value: '1' },
                            { type: 'variable', name: 'color--red', value: 'hsla(var(--color--red--h), var(--color--red--s), var(--color--red--l), var(--color--red--a))' },
                        ]
                    }
                ]
            }
        ]
    }
];

// Return types are passed to generators
