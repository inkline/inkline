import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Card',
        props: [
            {
                name: 'color',
                type: 'primary',
                description: 'The color variant of the card',
                default: ''
            },
            {
                name: 'sizeMultiplier',
                type: 'sm',
                description: 'The size variant of the card',
                default: ''
            }
        ],
        events: [],
        slots: [
            {
                name: 'header',
                description: 'Slot for card header content'
            },
            {
                name: 'default',
                description: 'Slot for card body content'
            },
            {
                name: 'footer',
                description: 'Slot for card footer content'
            }
        ],
        css: {
            namespace: 'card',
            variables: [
                {
                    name: '--card--border-top-width'
                },
                {
                    name: '--card--border-top-style'
                },
                {
                    name: '--card--border-top-color'
                },
                {
                    name: '--card--border-right-width'
                },
                {
                    name: '--card--border-right-style'
                },
                {
                    name: '--card--border-right-color'
                },
                {
                    name: '--card--border-bottom-width'
                },
                {
                    name: '--card--border-bottom-style'
                },
                {
                    name: '--card--border-bottom-color'
                },
                {
                    name: '--card--border-left-width'
                },
                {
                    name: '--card--border-left-style'
                },
                {
                    name: '--card--border-left-color'
                },
                {
                    name: '--card--border-width'
                },
                {
                    name: '--card--border-style'
                },
                {
                    name: '--card--border-color'
                },
                {
                    name: '--card--border-top'
                },
                {
                    name: '--card--border-right'
                },
                {
                    name: '--card--border-bottom'
                },
                {
                    name: '--card--border-left'
                },
                {
                    name: '--card--border'
                },
                {
                    name: '--card--box-shadow-offset-x'
                },
                {
                    name: '--card--box-shadow-offset-y'
                },
                {
                    name: '--card--box-shadow-blur-radius'
                },
                {
                    name: '--card--box-shadow-spread-radius'
                },
                {
                    name: '--card--box-shadow-color'
                },
                {
                    name: '--card--box-shadow'
                },
                {
                    name: '--card--transition-property'
                },
                {
                    name: '--card--transition-duration'
                },
                {
                    name: '--card--transition-timing-function'
                },
                {
                    name: '--card--transition'
                },
                {
                    name: '--card--background'
                },
                {
                    name: '--card--color'
                },
                {
                    name: '--card--border-top-left-radius'
                },
                {
                    name: '--card--border-top-right-radius'
                },
                {
                    name: '--card--border-bottom-right-radius'
                },
                {
                    name: '--card--border-bottom-left-radius'
                },
                {
                    name: '--card--border-radius'
                },
                {
                    name: '--card--font-size'
                },
                {
                    name: '--card--padding-top'
                },
                {
                    name: '--card--padding-right'
                },
                {
                    name: '--card--padding-bottom'
                },
                {
                    name: '--card--padding-left'
                },
                {
                    name: '--card--padding'
                },
                {
                    name: '--card--{color}--border-top-color'
                },
                {
                    name: '--card--{color}--border-right-color'
                },
                {
                    name: '--card--{color}--border-bottom-color'
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
    }
];
