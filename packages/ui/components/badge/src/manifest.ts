import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Badge',
        props: [
            {
                name: 'color',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the badge',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg' | 'inherit'",
                description: 'The size variant of the badge',
                default: ''
            },
            {
                name: 'pill',
                type: 'boolean',
                description: 'Display the badge as a pill',
                default: 'false'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default badge content'
            }
        ],
        css: {
            namespace: 'badge',
            variables: [
                {
                    name: '--badge--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--badge--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--badge--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--badge--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--badge--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--badge--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--badge--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--badge--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--badge--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--badge--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--badge--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--badge--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--badge--border-width',
                    value: 'var(--badge--border-top-width) var(--badge--border-right-width) var(--badge--border-bottom-width) var(--badge--border-left-width)'
                },
                {
                    name: '--badge--border-style',
                    value: 'var(--badge--border-top-style) var(--badge--border-right-style) var(--badge--border-bottom-style) var(--badge--border-left-style)'
                },
                {
                    name: '--badge--border-color',
                    value: 'var(--badge--border-top-color) var(--badge--border-right-color) var(--badge--border-bottom-color) var(--badge--border-left-color)'
                },
                {
                    name: '--badge--border-top',
                    value: 'var(--badge--border-top-width) var(--badge--border-top-style) var(--badge--border-top-color)'
                },
                {
                    name: '--badge--border-right',
                    value: 'var(--badge--border-right-width) var(--badge--border-right-style) var(--badge--border-right-color)'
                },
                {
                    name: '--badge--border-bottom',
                    value: 'var(--badge--border-bottom-width) var(--badge--border-bottom-style) var(--badge--border-bottom-color)'
                },
                {
                    name: '--badge--border-left',
                    value: 'var(--badge--border-left-width) var(--badge--border-left-style) var(--badge--border-left-color)'
                },
                {
                    name: '--badge--border',
                    value: 'var(--badge--border-top-width) var(--badge--border-top-style) var(--badge--border-top-color)'
                },
                {
                    name: '--badge--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--badge--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--badge--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--badge--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--badge--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--badge--box-shadow',
                    value: 'var(--badge--box-shadow-offset-x) var(--badge--box-shadow-offset-y) var(--badge--box-shadow-blur-radius) var(--badge--box-shadow-spread-radius) var(--badge--box-shadow-color)'
                },
                {
                    name: '--badge--font-weight',
                    value: 'var(--font-weight-semibold)'
                },
                {
                    name: '--badge--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--badge--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--badge--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--badge--transition',
                    value: 'var(--badge--transition-property) var(--badge--transition-duration) var(--badge--transition-timing-function)'
                },
                {
                    name: '--badge--pill--border-top-left-radius',
                    value: '50%'
                },
                {
                    name: '--badge--pill--border-top-right-radius',
                    value: '50%'
                },
                {
                    name: '--badge--pill--border-bottom-right-radius',
                    value: '50%'
                },
                {
                    name: '--badge--pill--border-bottom-left-radius',
                    value: '50%'
                },
                {
                    name: '--badge--pill--border-radius',
                    value: 'var(--badge--pill--border-top-left-radius) var(--badge--pill--border-top-right-radius) var(--badge--pill--border-bottom-right-radius) var(--badge--pill--border-bottom-left-radius)'
                },
                {
                    name: '--badge--background',
                    value: 'var(--color-light)'
                },
                {
                    name: '--badge--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--badge--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--badge--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--badge--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--badge--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--badge--border-radius',
                    value: 'var(--badge--border-top-left-radius) var(--badge--border-top-right-radius) var(--badge--border-bottom-right-radius) var(--badge--border-bottom-left-radius)'
                },
                {
                    name: '--badge--font-size',
                    value: 'var(--font-size-sm)'
                },
                {
                    name: '--badge--padding-top',
                    value: 'calc(var(--spacing-md) * 0.25)'
                },
                {
                    name: '--badge--padding-right',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--badge--padding-bottom',
                    value: 'calc(var(--spacing-md) * 0.25)'
                },
                {
                    name: '--badge--padding-left',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--badge--padding',
                    value: 'var(--badge--padding-top) var(--badge--padding-right) var(--badge--padding-bottom) var(--badge--padding-left)'
                },
                {
                    name: '--badge--{color}--border-top-color'
                },
                {
                    name: '--badge--{color}--border-right-color'
                },
                {
                    name: '--badge--{color}--border-bottom-color'
                },
                {
                    name: '--badge--{color}--border-left-color'
                },
                {
                    name: '--badge--{color}--background'
                },
                {
                    name: '--badge--{color}--color'
                },
                {
                    name: '--badge--{size}--border-top-left-radius'
                },
                {
                    name: '--badge--{size}--border-top-right-radius'
                },
                {
                    name: '--badge--{size}--border-bottom-right-radius'
                },
                {
                    name: '--badge--{size}--border-bottom-left-radius'
                },
                {
                    name: '--badge--{size}--font-size'
                },
                {
                    name: '--badge--{size}--padding-top'
                },
                {
                    name: '--badge--{size}--padding-right'
                },
                {
                    name: '--badge--{size}--padding-bottom'
                },
                {
                    name: '--badge--{size}--padding-left'
                }
            ]
        }
    }
];

export default manifest;
