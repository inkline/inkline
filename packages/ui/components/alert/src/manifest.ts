import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Alert',
        props: [
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the alert',
                default: 'undefined'
            },
            {
                name: 'color',
                type: "'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the alert',
                default: "'info'"
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to show or hide the alert',
                default: 'undefined'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description: 'Shows a dismiss icon on the alert',
                default: 'false'
            },
            {
                name: 'dismissAriaLabel',
                type: 'string',
                description: 'The aria-label to use for the dismiss button',
                default: 'Dismiss'
            },
            {
                name: 'icon',
                type: 'string | VNode | VNode[]',
                description: 'The icon to be rendered in the toast',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'Alert',
                description: 'Event emitted for setting the modelValue'
            }
        ],
        slots: [
            {
                name: 'icon',
                description: 'Slot for alert icon'
            },
            {
                name: 'default',
                description: 'Slot for default alert content'
            },
            {
                name: 'dismiss',
                description: 'Slot for alert dismiss button'
            }
        ],
        css: {
            namespace: 'alert',
            variables: [
                {
                    name: '--alert--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--alert--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--alert--border-top-color',
                    value: 'var(--color-info-shade-50)'
                },
                {
                    name: '--alert--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--alert--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--alert--border-right-color',
                    value: 'var(--color-info-shade-50)'
                },
                {
                    name: '--alert--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--alert--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--alert--border-bottom-color',
                    value: 'var(--color-info-shade-50)'
                },
                {
                    name: '--alert--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--alert--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--alert--border-left-color',
                    value: 'var(--color-info-shade-50)'
                },
                {
                    name: '--alert--border-width',
                    value: 'var(--alert--border-top-width) var(--alert--border-right-width) var(--alert--border-bottom-width) var(--alert--border-left-width)'
                },
                {
                    name: '--alert--border-style',
                    value: 'var(--alert--border-top-style) var(--alert--border-right-style) var(--alert--border-bottom-style) var(--alert--border-left-style)'
                },
                {
                    name: '--alert--border-color',
                    value: 'var(--alert--border-top-color) var(--alert--border-right-color) var(--alert--border-bottom-color) var(--alert--border-left-color)'
                },
                {
                    name: '--alert--border-top',
                    value: 'var(--alert--border-top-width) var(--alert--border-top-style) var(--alert--border-top-color)'
                },
                {
                    name: '--alert--border-right',
                    value: 'var(--alert--border-right-width) var(--alert--border-right-style) var(--alert--border-right-color)'
                },
                {
                    name: '--alert--border-bottom',
                    value: 'var(--alert--border-bottom-width) var(--alert--border-bottom-style) var(--alert--border-bottom-color)'
                },
                {
                    name: '--alert--border-left',
                    value: 'var(--alert--border-left-width) var(--alert--border-left-style) var(--alert--border-left-color)'
                },
                {
                    name: '--alert--border',
                    value: 'var(--alert--border-top-width) var(--alert--border-top-style) var(--alert--border-top-color)'
                },
                {
                    name: '--alert--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--alert--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--alert--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--alert--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--alert--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--alert--box-shadow',
                    value: 'var(--alert--box-shadow-offset-x) var(--alert--box-shadow-offset-y) var(--alert--box-shadow-blur-radius) var(--alert--box-shadow-spread-radius) var(--alert--box-shadow-color)'
                },
                {
                    name: '--alert--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--alert--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--alert--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--alert--transition',
                    value: 'var(--alert--transition-property) var(--alert--transition-duration) var(--alert--transition-timing-function)'
                },
                {
                    name: '--alert--link--font-weight',
                    value: 'var(--font-weight-semibold)'
                },
                {
                    name: '--alert--background',
                    value: 'var(--color-info-100)'
                },
                {
                    name: '--alert--color',
                    value: 'var(--color-info-800)'
                },
                {
                    name: '--alert--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--alert--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--alert--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--alert--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--alert--border-radius',
                    value: 'var(--alert--border-top-left-radius) var(--alert--border-top-right-radius) var(--alert--border-bottom-right-radius) var(--alert--border-bottom-left-radius)'
                },
                {
                    name: '--alert--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--alert--padding-top',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--alert--padding-right',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--alert--padding-bottom',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--alert--padding-left',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--alert--padding',
                    value: 'var(--alert--padding-top) var(--alert--padding-right) var(--alert--padding-bottom) var(--alert--padding-left)'
                },
                {
                    name: '--alert--{color}--border-top-color'
                },
                {
                    name: '--alert--{color}--border-right-color'
                },
                {
                    name: '--alert--{color}--border-bottom-color'
                },
                {
                    name: '--alert--{color}--border-left-color'
                },
                {
                    name: '--alert--{color}--background'
                },
                {
                    name: '--alert--{color}--color'
                },
                {
                    name: '--alert--{size}--border-top-left-radius'
                },
                {
                    name: '--alert--{size}--border-top-right-radius'
                },
                {
                    name: '--alert--{size}--border-bottom-right-radius'
                },
                {
                    name: '--alert--{size}--border-bottom-left-radius'
                },
                {
                    name: '--alert--{size}--font-size'
                },
                {
                    name: '--alert--{size}--padding-top'
                },
                {
                    name: '--alert--{size}--padding-right'
                },
                {
                    name: '--alert--{size}--padding-bottom'
                },
                {
                    name: '--alert--{size}--padding-left'
                }
            ]
        }
    }
];

export default manifest;
