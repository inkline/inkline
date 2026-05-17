import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'CardFooter',
        props: [],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for card footer content'
            }
        ]
    },
    {
        name: 'CardHeader',
        props: [],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for card header content'
            }
        ]
    },
    {
        name: 'CardImage',
        props: [],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for card image content'
            }
        ]
    },
    {
        name: 'Card',
        props: [
            {
                name: 'color',
                type: "'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the card',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the card',
                default: ''
            },
            {
                name: 'tag',
                type: 'string',
                description: 'The HTML tag to use for the card root element',
                default: 'div'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for card content'
            }
        ],
        css: {
            namespace: 'card',
            variables: [
                {
                    name: '--card--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--card--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--card--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--card--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--card--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--card--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--card--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--card--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--card--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--card--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--card--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--card--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--card--border-width',
                    value: 'var(--card--border-top-width) var(--card--border-right-width) var(--card--border-bottom-width) var(--card--border-left-width)'
                },
                {
                    name: '--card--border-style',
                    value: 'var(--card--border-top-style) var(--card--border-right-style) var(--card--border-bottom-style) var(--card--border-left-style)'
                },
                {
                    name: '--card--border-color',
                    value: 'var(--card--border-top-color) var(--card--border-right-color) var(--card--border-bottom-color) var(--card--border-left-color)'
                },
                {
                    name: '--card--border-top',
                    value: 'var(--card--border-top-width) var(--card--border-top-style) var(--card--border-top-color)'
                },
                {
                    name: '--card--border-right',
                    value: 'var(--card--border-right-width) var(--card--border-right-style) var(--card--border-right-color)'
                },
                {
                    name: '--card--border-bottom',
                    value: 'var(--card--border-bottom-width) var(--card--border-bottom-style) var(--card--border-bottom-color)'
                },
                {
                    name: '--card--border-left',
                    value: 'var(--card--border-left-width) var(--card--border-left-style) var(--card--border-left-color)'
                },
                {
                    name: '--card--border',
                    value: 'var(--card--border-top-width) var(--card--border-top-style) var(--card--border-top-color)'
                },
                {
                    name: '--card--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--card--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--card--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--card--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--card--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--card--box-shadow',
                    value: 'var(--card--box-shadow-offset-x) var(--card--box-shadow-offset-y) var(--card--box-shadow-blur-radius) var(--card--box-shadow-spread-radius) var(--card--box-shadow-color)'
                },
                {
                    name: '--card--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--card--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--card--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--card--transition',
                    value: 'var(--card--transition-property) var(--card--transition-duration) var(--card--transition-timing-function)'
                },
                {
                    name: '--card--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--card--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--card--border-top-left-radius',
                    value: 'var(--border-top-left-radius--md)'
                },
                {
                    name: '--card--border-top-right-radius',
                    value: 'var(--border-top-right-radius--md)'
                },
                {
                    name: '--card--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius--md)'
                },
                {
                    name: '--card--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius--md)'
                },
                {
                    name: '--card--border-radius',
                    value: 'var(--card--border-top-left-radius) var(--card--border-top-right-radius) var(--card--border-bottom-right-radius) var(--card--border-bottom-left-radius)'
                },
                {
                    name: '--card--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--card--padding-top',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--card--padding-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--card--padding-bottom',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--card--padding-left',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--card--padding',
                    value: 'var(--card--padding-top) var(--card--padding-right) var(--card--padding-bottom) var(--card--padding-left)'
                },
                {
                    name: '--card--{color}--border-top-width'
                },
                {
                    name: '--card--{color}--border-top-style'
                },
                {
                    name: '--card--{color}--border-top-color'
                },
                {
                    name: '--card--{color}--border-right-width'
                },
                {
                    name: '--card--{color}--border-right-style'
                },
                {
                    name: '--card--{color}--border-right-color'
                },
                {
                    name: '--card--{color}--border-bottom-width'
                },
                {
                    name: '--card--{color}--border-bottom-style'
                },
                {
                    name: '--card--{color}--border-bottom-color'
                },
                {
                    name: '--card--{color}--border-left-width'
                },
                {
                    name: '--card--{color}--border-left-style'
                },
                {
                    name: '--card--{color}--border-left-color'
                },
                {
                    name: '--card--{color}--background'
                },
                {
                    name: '--card--{color}--color'
                },
                {
                    name: '--card--{size}--border-top-left-radius'
                },
                {
                    name: '--card--{size}--border-top-right-radius'
                },
                {
                    name: '--card--{size}--border-bottom-right-radius'
                },
                {
                    name: '--card--{size}--border-bottom-left-radius'
                },
                {
                    name: '--card--{size}--font-size'
                },
                {
                    name: '--card--{size}--padding-top'
                },
                {
                    name: '--card--{size}--padding-right'
                },
                {
                    name: '--card--{size}--padding-bottom'
                },
                {
                    name: '--card--{size}--padding-left'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--card--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--card--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--card--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--card--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--card--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--card--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--card--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--card--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--card--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--card--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--card--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--card--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--card--border-width',
                    value: 'var(--card--border-top-width) var(--card--border-right-width) var(--card--border-bottom-width) var(--card--border-left-width)'
                },
                {
                    name: '--card--border-style',
                    value: 'var(--card--border-top-style) var(--card--border-right-style) var(--card--border-bottom-style) var(--card--border-left-style)'
                },
                {
                    name: '--card--border-color',
                    value: 'var(--card--border-top-color) var(--card--border-right-color) var(--card--border-bottom-color) var(--card--border-left-color)'
                },
                {
                    name: '--card--border-top',
                    value: 'var(--card--border-top-width) var(--card--border-top-style) var(--card--border-top-color)'
                },
                {
                    name: '--card--border-right',
                    value: 'var(--card--border-right-width) var(--card--border-right-style) var(--card--border-right-color)'
                },
                {
                    name: '--card--border-bottom',
                    value: 'var(--card--border-bottom-width) var(--card--border-bottom-style) var(--card--border-bottom-color)'
                },
                {
                    name: '--card--border-left',
                    value: 'var(--card--border-left-width) var(--card--border-left-style) var(--card--border-left-color)'
                },
                {
                    name: '--card--border',
                    value: 'var(--card--border-top-width) var(--card--border-top-style) var(--card--border-top-color)'
                },
                {
                    name: '--card--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--card--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--card--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--card--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--card--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--card--box-shadow',
                    value: 'var(--card--box-shadow-offset-x) var(--card--box-shadow-offset-y) var(--card--box-shadow-blur-radius) var(--card--box-shadow-spread-radius) var(--card--box-shadow-color)'
                },
                {
                    name: '--card--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--card--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--card--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--card--transition',
                    value: 'var(--card--transition-property) var(--card--transition-duration) var(--card--transition-timing-function)'
                },
                {
                    name: '--card--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--card--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--card--border-top-left-radius',
                    value: 'var(--border-top-left-radius--md)'
                },
                {
                    name: '--card--border-top-right-radius',
                    value: 'var(--border-top-right-radius--md)'
                },
                {
                    name: '--card--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius--md)'
                },
                {
                    name: '--card--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius--md)'
                },
                {
                    name: '--card--border-radius',
                    value: 'var(--card--border-top-left-radius) var(--card--border-top-right-radius) var(--card--border-bottom-right-radius) var(--card--border-bottom-left-radius)'
                },
                {
                    name: '--card--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--card--padding-top',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--card--padding-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--card--padding-bottom',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--card--padding-left',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--card--padding',
                    value: 'var(--card--padding-top) var(--card--padding-right) var(--card--padding-bottom) var(--card--padding-left)'
                }
            ]
        }
    }
];

export default manifest;
