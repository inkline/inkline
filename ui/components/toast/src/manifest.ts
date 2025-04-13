import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'ToastContainer',
        props: [
            {
                name: 'eventBus',
                type: 'EventBus',
                description: 'The event bus to use for showing/hiding toasts',
                default: 'toastEventBus'
            },
            {
                name: 'duration',
                type: 'number',
                description:
                    'The default duration for toasts in milliseconds, if not specified in the plugin or toast display options',
                default: 'undefined'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description:
                    'The default dismissible state for toasts, if not specified in the plugin or toast display options',
                default: 'undefined'
            },
            {
                name: 'showProgress',
                type: 'boolean',
                description:
                    'The default option for showing the progress bar for toasts, if not specified in the plugin or toast display options',
                default: 'undefined'
            }
        ],
        events: [],
        slots: [],
        css: {
            namespace: 'toast-container',
            variables: [
                {
                    name: '--toast-container--margin-top',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--margin-right',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--margin-left',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--margin',
                    value: 'var(--toast-container--margin-top) var(--toast-container--margin-right) var(--toast-container--margin-bottom) var(--toast-container--margin-left)'
                },
                {
                    name: '--toast-container--width',
                    value: '320px'
                },
                {
                    name: '--toast-container--z-index',
                    value: '2010'
                },
                {
                    name: '--toast-container--toast--gap',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--toast--transition-property',
                    value: 'transform, opacity'
                },
                {
                    name: '--toast-container--toast--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--toast-container--toast--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--toast-container--toast--transition',
                    value: 'var(--toast-container--toast--transition-property) var(--toast-container--toast--transition-duration) var(--toast-container--toast--transition-timing-function)'
                }
            ]
        }
    },
    {
        name: 'Toast',
        props: [
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the toast',
                default: ''
            },
            {
                name: 'color',
                type: 'light | dark | info | success | warning | danger',
                description: 'The color variant of the toast',
                default: 'light'
            },
            {
                name: 'duration',
                type: 'number',
                description:
                    'The duration of the toast, in milliseconds. A duration of 0 will show the toast indefinitely.',
                default: '0'
            },
            {
                name: 'showProgress',
                type: 'boolean',
                description: 'Show progress bar for the duration of the toast',
                default: 'true'
            },
            {
                name: 'icon',
                type: 'string | VNode | VNode[]',
                description: 'The icon to be rendered in the toast',
                default: 'undefined'
            },
            {
                name: 'title',
                type: 'string | VNode | VNode[]',
                description: 'The title to be rendered in the toast',
                default: 'undefined'
            },
            {
                name: 'message',
                type: 'string | VNode | VNode[]',
                description: 'The message to be rendered in the toast',
                default: 'undefined'
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to show or hide a dismissible toast',
                default: 'true'
            },
            {
                name: 'position',
                type: "'top-left' | 'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom' | 'bottom-left' | 'left'",
                description: 'Used to set the position of the toast',
                default: 'top-right'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description: 'Shows a dismiss icon on the toast',
                default: 'false'
            },
            {
                name: 'dismissAriaLabel',
                type: 'string',
                description: 'The aria-label to use for the dismiss button',
                default: 'Dismiss'
            }
        ],
        events: [
            {
                name: 'Toast',
                description: 'Event emitted when the toast is dismissed'
            }
        ],
        slots: [
            {
                name: 'icon',
                description: 'Slot for toast icon'
            },
            {
                name: 'title',
                description: 'Slot for toast title'
            },
            {
                name: 'default',
                description: 'Slot for default toast content'
            },
            {
                name: 'dismiss',
                description: 'Slot for toast dismiss button'
            }
        ],
        css: {
            namespace: 'toast',
            variables: [
                {
                    name: '--toast--animation-name',
                    value: 'toast-duration'
                },
                {
                    name: '--toast--animation-fill-mode',
                    value: 'forwards'
                },
                {
                    name: '--toast--animation-play-state',
                    value: 'running'
                },
                {
                    name: '--toast--animation-delay',
                    value: '0'
                },
                {
                    name: '--toast--animation-timing-function',
                    value: 'linear'
                },
                {
                    name: '--toast--animation-duration',
                    value: '4000'
                },
                {
                    name: '--toast--animation-iteration-count',
                    value: '1'
                },
                {
                    name: '--toast--animation-direction',
                    value: 'normal'
                },
                {
                    name: '--toast--animation',
                    value: 'var(--toast--animation-name) var(--toast--animation-duration) var(--toast--animation-iteration-count) var(--toast--animation-direction)'
                },
                {
                    name: '--toast--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--toast--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--toast--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--toast--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--toast--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--toast--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--toast--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--toast--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--toast--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--toast--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--toast--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--toast--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--toast--border-width',
                    value: 'var(--toast--border-top-width) var(--toast--border-right-width) var(--toast--border-bottom-width) var(--toast--border-left-width)'
                },
                {
                    name: '--toast--border-style',
                    value: 'var(--toast--border-top-style) var(--toast--border-right-style) var(--toast--border-bottom-style) var(--toast--border-left-style)'
                },
                {
                    name: '--toast--border-color',
                    value: 'var(--toast--border-top-color) var(--toast--border-right-color) var(--toast--border-bottom-color) var(--toast--border-left-color)'
                },
                {
                    name: '--toast--border-top',
                    value: 'var(--toast--border-top-width) var(--toast--border-top-style) var(--toast--border-top-color)'
                },
                {
                    name: '--toast--border-right',
                    value: 'var(--toast--border-right-width) var(--toast--border-right-style) var(--toast--border-right-color)'
                },
                {
                    name: '--toast--border-bottom',
                    value: 'var(--toast--border-bottom-width) var(--toast--border-bottom-style) var(--toast--border-bottom-color)'
                },
                {
                    name: '--toast--border-left',
                    value: 'var(--toast--border-left-width) var(--toast--border-left-style) var(--toast--border-left-color)'
                },
                {
                    name: '--toast--border',
                    value: 'var(--toast--border-top-width) var(--toast--border-top-style) var(--toast--border-top-color)'
                },
                {
                    name: '--toast--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--toast--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--toast--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--toast--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--toast--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--toast--box-shadow',
                    value: 'var(--toast--box-shadow-offset-x) var(--toast--box-shadow-offset-y) var(--toast--box-shadow-blur-radius) var(--toast--box-shadow-spread-radius) var(--toast--box-shadow-color)'
                },
                {
                    name: '--toast--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--toast--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--toast--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--toast--transition',
                    value: 'var(--toast--transition-property) var(--toast--transition-duration) var(--toast--transition-timing-function)'
                },
                {
                    name: '--toast--link--font-weight',
                    value: 'var(--font-weight--semibold)'
                },
                {
                    name: '--toast--title--font-weight',
                    value: 'var(--font-weight--semibold)'
                },
                {
                    name: '--toast--title--font-size',
                    value: 'var(--font-size)'
                },
                {
                    name: '--toast--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--toast--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--toast--progress--background',
                    value: 'hsla(0 0% 0% / 0.05)'
                },
                {
                    name: '--toast--progress--bar--background',
                    value: 'hsla(0 0% 0% / 0.15)'
                },
                {
                    name: '--toast--progress--height',
                    value: 'calc(var(--spacing--md) * 0.25)'
                },
                {
                    name: '--toast--code--background',
                    value: 'hsla(0 0% 0% / 0.05)'
                },
                {
                    name: '--toast--border-top-left-radius',
                    value: 'var(--border-top-left-radius--md)'
                },
                {
                    name: '--toast--border-top-right-radius',
                    value: 'var(--border-top-right-radius--md)'
                },
                {
                    name: '--toast--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius--md)'
                },
                {
                    name: '--toast--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius--md)'
                },
                {
                    name: '--toast--border-radius',
                    value: 'var(--toast--border-top-left-radius) var(--toast--border-top-right-radius) var(--toast--border-bottom-right-radius) var(--toast--border-bottom-left-radius)'
                },
                {
                    name: '--toast--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--toast--padding-top',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--toast--padding-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--toast--padding-bottom',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--toast--padding-left',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--toast--padding',
                    value: 'var(--toast--padding-top) var(--toast--padding-right) var(--toast--padding-bottom) var(--toast--padding-left)'
                },
                {
                    name: '--toast--{color}--border-top-color'
                },
                {
                    name: '--toast--{color}--border-right-color'
                },
                {
                    name: '--toast--{color}--border-bottom-color'
                },
                {
                    name: '--toast--{color}--border-left-color'
                },
                {
                    name: '--toast--{color}--background'
                },
                {
                    name: '--toast--{color}--color'
                },
                {
                    name: '--toast--{color}--progress--background'
                },
                {
                    name: '--toast--{color}--progress--bar--background'
                },
                {
                    name: '--toast--{color}--code--background'
                },
                {
                    name: '--toast--{size}--border-top-left-radius'
                },
                {
                    name: '--toast--{size}--border-top-right-radius'
                },
                {
                    name: '--toast--{size}--border-bottom-right-radius'
                },
                {
                    name: '--toast--{size}--border-bottom-left-radius'
                },
                {
                    name: '--toast--{size}--font-size'
                },
                {
                    name: '--toast--{size}--padding-top'
                },
                {
                    name: '--toast--{size}--padding-right'
                },
                {
                    name: '--toast--{size}--padding-bottom'
                },
                {
                    name: '--toast--{size}--padding-left'
                },
                {
                    name: '--toast--{size}--progress--height'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--toast--animation-name',
                    value: 'toast-duration'
                },
                {
                    name: '--toast--animation-fill-mode',
                    value: 'forwards'
                },
                {
                    name: '--toast--animation-play-state',
                    value: 'running'
                },
                {
                    name: '--toast--animation-delay',
                    value: '0'
                },
                {
                    name: '--toast--animation-timing-function',
                    value: 'linear'
                },
                {
                    name: '--toast--animation-duration',
                    value: '4000'
                },
                {
                    name: '--toast--animation-iteration-count',
                    value: '1'
                },
                {
                    name: '--toast--animation-direction',
                    value: 'normal'
                },
                {
                    name: '--toast--animation',
                    value: 'var(--toast--animation-name) var(--toast--animation-duration) var(--toast--animation-iteration-count) var(--toast--animation-direction)'
                },
                {
                    name: '--toast--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--toast--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--toast--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--toast--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--toast--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--toast--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--toast--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--toast--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--toast--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--toast--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--toast--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--toast--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--toast--border-width',
                    value: 'var(--toast--border-top-width) var(--toast--border-right-width) var(--toast--border-bottom-width) var(--toast--border-left-width)'
                },
                {
                    name: '--toast--border-style',
                    value: 'var(--toast--border-top-style) var(--toast--border-right-style) var(--toast--border-bottom-style) var(--toast--border-left-style)'
                },
                {
                    name: '--toast--border-color',
                    value: 'var(--toast--border-top-color) var(--toast--border-right-color) var(--toast--border-bottom-color) var(--toast--border-left-color)'
                },
                {
                    name: '--toast--border-top',
                    value: 'var(--toast--border-top-width) var(--toast--border-top-style) var(--toast--border-top-color)'
                },
                {
                    name: '--toast--border-right',
                    value: 'var(--toast--border-right-width) var(--toast--border-right-style) var(--toast--border-right-color)'
                },
                {
                    name: '--toast--border-bottom',
                    value: 'var(--toast--border-bottom-width) var(--toast--border-bottom-style) var(--toast--border-bottom-color)'
                },
                {
                    name: '--toast--border-left',
                    value: 'var(--toast--border-left-width) var(--toast--border-left-style) var(--toast--border-left-color)'
                },
                {
                    name: '--toast--border',
                    value: 'var(--toast--border-top-width) var(--toast--border-top-style) var(--toast--border-top-color)'
                },
                {
                    name: '--toast--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--toast--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--toast--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--toast--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--toast--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--toast--box-shadow',
                    value: 'var(--toast--box-shadow-offset-x) var(--toast--box-shadow-offset-y) var(--toast--box-shadow-blur-radius) var(--toast--box-shadow-spread-radius) var(--toast--box-shadow-color)'
                },
                {
                    name: '--toast--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--toast--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--toast--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--toast--transition',
                    value: 'var(--toast--transition-property) var(--toast--transition-duration) var(--toast--transition-timing-function)'
                },
                {
                    name: '--toast--link--font-weight',
                    value: 'var(--font-weight--semibold)'
                },
                {
                    name: '--toast--title--font-weight',
                    value: 'var(--font-weight--semibold)'
                },
                {
                    name: '--toast--title--font-size',
                    value: 'var(--font-size)'
                },
                {
                    name: '--toast--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--toast--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--toast--progress--background',
                    value: 'hsla(0 0% 0% / 0.05)'
                },
                {
                    name: '--toast--progress--bar--background',
                    value: 'hsla(0 0% 0% / 0.15)'
                },
                {
                    name: '--toast--progress--height',
                    value: 'calc(var(--spacing--md) * 0.25)'
                },
                {
                    name: '--toast--code--background',
                    value: 'hsla(0 0% 0% / 0.05)'
                },
                {
                    name: '--toast--border-top-left-radius',
                    value: 'var(--border-top-left-radius--md)'
                },
                {
                    name: '--toast--border-top-right-radius',
                    value: 'var(--border-top-right-radius--md)'
                },
                {
                    name: '--toast--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius--md)'
                },
                {
                    name: '--toast--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius--md)'
                },
                {
                    name: '--toast--border-radius',
                    value: 'var(--toast--border-top-left-radius) var(--toast--border-top-right-radius) var(--toast--border-bottom-right-radius) var(--toast--border-bottom-left-radius)'
                },
                {
                    name: '--toast--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--toast--padding-top',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--toast--padding-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--toast--padding-bottom',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--toast--padding-left',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--toast--padding',
                    value: 'var(--toast--padding-top) var(--toast--padding-right) var(--toast--padding-bottom) var(--toast--padding-left)'
                },
                {
                    name: '--toast-container--margin-top',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--margin-right',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--margin-left',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--margin',
                    value: 'var(--toast-container--margin-top) var(--toast-container--margin-right) var(--toast-container--margin-bottom) var(--toast-container--margin-left)'
                },
                {
                    name: '--toast-container--width',
                    value: '320px'
                },
                {
                    name: '--toast-container--z-index',
                    value: '2010'
                },
                {
                    name: '--toast-container--toast--gap',
                    value: 'var(--spacing)'
                },
                {
                    name: '--toast-container--toast--transition-property',
                    value: 'transform, opacity'
                },
                {
                    name: '--toast-container--toast--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--toast-container--toast--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--toast-container--toast--transition',
                    value: 'var(--toast-container--toast--transition-property) var(--toast-container--toast--transition-duration) var(--toast-container--toast--transition-timing-function)'
                }
            ]
        }
    }
];

export default manifest;
