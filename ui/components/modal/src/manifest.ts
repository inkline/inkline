import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'ModalClose',
        props: [
            {
                name: 'closeAriaLabel',
                type: 'string',
                description: 'The aria-label attribute of the close button',
                default: 'Close'
            }
        ],
        events: [],
        slots: [
            {
                name: 'close',
                description: 'Close button slot'
            }
        ]
    },
    {
        name: 'ModalContainer',
        props: [
            {
                name: 'eventBus',
                type: 'EventBus',
                description: 'The event bus to use for showing/hiding modals',
                default: 'modalEventBus'
            }
        ],
        events: [],
        slots: [],
        css: {
            namespace: '',
            variables: []
        }
    },
    {
        name: 'ModalFooter',
        props: [],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for modal footer content'
            }
        ]
    },
    {
        name: 'ModalHeader',
        props: [],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for modal header content'
            }
        ]
    },
    {
        name: 'Modal',
        props: [
            {
                name: 'closeOnPressEscape',
                type: 'boolean',
                description: 'Determines if the modal should close when pressing escape',
                default: 'true'
            },
            {
                name: 'color',
                type: "'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the modal',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the modal',
                default: 'false'
            },
            {
                name: 'fullscreen',
                type: 'boolean',
                description: 'Make the modal cover the entire screen',
                default: 'false'
            },
            {
                name: 'hideOnClickOutside',
                type: 'boolean',
                description: 'Determines if the modal should close when clicking the overlay',
                default: 'true'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The identifier of the modal',
                default: 'uid()'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description: 'Determines if the close icon should be visible in the modal header',
                default: 'false'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the modal',
                default: ''
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to determine if modal is visible or not',
                default: 'false'
            },
            {
                name: 'transition',
                type: "'fade-in-transition' | 'fade-in-linear-transition' | 'zoom-in-top-transition' | 'zoom-in-bottom-transition' | 'zoom-in-center-transition' | 'zoom-in-left-transition' | 'zoom-in-right-transition'",
                description: 'The modal opening and closing animation',
                default: 'zoom-in-center-transition'
            },
            {
                name: 'teleport',
                type: 'boolean',
                description: 'Teleport the modal to the modal container',
                default: 'false'
            },
            {
                name: 'content',
                type: 'string | VNode | VNode[]',
                description: 'The content of the modal',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'Modal',
                description: 'Event emitted for setting the modelValue'
            },
            {
                name: 'Modal',
                description: 'Event emitted when the modal is open'
            },
            {
                name: 'Modal',
                description: 'Event emitted when the modal is opened and animation is finished'
            },
            {
                name: 'Modal',
                description: 'Event emitted when the modal is closed'
            },
            {
                name: 'Modal',
                description: 'Event emitted when the modal is closed and animation is finished'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for modal content'
            }
        ],
        css: {
            namespace: 'modal',
            variables: [
                {
                    name: '--modal--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--modal--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--modal--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--modal--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--modal--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--modal--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--modal--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--modal--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--modal--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--modal--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--modal--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--modal--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--modal--border-width',
                    value: 'var(--modal--border-top-width) var(--modal--border-right-width) var(--modal--border-bottom-width) var(--modal--border-left-width)'
                },
                {
                    name: '--modal--border-style',
                    value: 'var(--modal--border-top-style) var(--modal--border-right-style) var(--modal--border-bottom-style) var(--modal--border-left-style)'
                },
                {
                    name: '--modal--border-color',
                    value: 'var(--modal--border-top-color) var(--modal--border-right-color) var(--modal--border-bottom-color) var(--modal--border-left-color)'
                },
                {
                    name: '--modal--border-top',
                    value: 'var(--modal--border-top-width) var(--modal--border-top-style) var(--modal--border-top-color)'
                },
                {
                    name: '--modal--border-right',
                    value: 'var(--modal--border-right-width) var(--modal--border-right-style) var(--modal--border-right-color)'
                },
                {
                    name: '--modal--border-bottom',
                    value: 'var(--modal--border-bottom-width) var(--modal--border-bottom-style) var(--modal--border-bottom-color)'
                },
                {
                    name: '--modal--border-left',
                    value: 'var(--modal--border-left-width) var(--modal--border-left-style) var(--modal--border-left-color)'
                },
                {
                    name: '--modal--border',
                    value: 'var(--modal--border-top-width) var(--modal--border-top-style) var(--modal--border-top-color)'
                },
                {
                    name: '--modal--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--modal--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--modal--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--modal--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--modal--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--modal--box-shadow',
                    value: 'var(--modal--box-shadow-offset-x) var(--modal--box-shadow-offset-y) var(--modal--box-shadow-blur-radius) var(--modal--box-shadow-spread-radius) var(--modal--box-shadow-color)'
                },
                {
                    name: '--modal--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--modal--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--modal--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--modal--transition',
                    value: 'var(--modal--transition-property) var(--modal--transition-duration) var(--modal--transition-timing-function)'
                },
                {
                    name: '--modal--width',
                    value: '100%'
                },
                {
                    name: '--modal--z-index',
                    value: '2000'
                },
                {
                    name: '--modal--wrapper--background',
                    value: 'hsla(0 0% 0% / 0.75)'
                },
                {
                    name: '--modal--close--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--modal--close--hover--background',
                    value: 'hsla(0 0% 0% / 0.1)'
                },
                {
                    name: '--modal--close--active--background',
                    value: 'hsla(0 0% 0% / 0.15)'
                },
                {
                    name: '--modal--close--size',
                    value: 'calc(var(--font-size--md) * 1.5)'
                },
                {
                    name: '--modal--close--font-size',
                    value: 'calc(var(--font-size--md) * 0.5)'
                },
                {
                    name: '--modal--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--modal--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--modal--border-top-left-radius',
                    value: 'var(--border-top-left-radius--md)'
                },
                {
                    name: '--modal--border-top-right-radius',
                    value: 'var(--border-top-right-radius--md)'
                },
                {
                    name: '--modal--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius--md)'
                },
                {
                    name: '--modal--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius--md)'
                },
                {
                    name: '--modal--border-radius',
                    value: 'var(--modal--border-top-left-radius) var(--modal--border-top-right-radius) var(--modal--border-bottom-right-radius) var(--modal--border-bottom-left-radius)'
                },
                {
                    name: '--modal--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--modal--padding-top',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--modal--padding-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--modal--padding-bottom',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--modal--padding-left',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--modal--padding',
                    value: 'var(--modal--padding-top) var(--modal--padding-right) var(--modal--padding-bottom) var(--modal--padding-left)'
                },
                {
                    name: '--modal--max-width',
                    value: 'calc(var(--spacing--md) * 30)'
                },
                {
                    name: '--modal--footer--gap',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--modal--{color}--border-top-color'
                },
                {
                    name: '--modal--{color}--border-right-color'
                },
                {
                    name: '--modal--{color}--border-bottom-color'
                },
                {
                    name: '--modal--{color}--border-left-color'
                },
                {
                    name: '--modal--{color}--background'
                },
                {
                    name: '--modal--{color}--color'
                },
                {
                    name: '--modal--{size}--border-top-left-radius'
                },
                {
                    name: '--modal--{size}--border-top-right-radius'
                },
                {
                    name: '--modal--{size}--border-bottom-right-radius'
                },
                {
                    name: '--modal--{size}--border-bottom-left-radius'
                },
                {
                    name: '--modal--{size}--font-size'
                },
                {
                    name: '--modal--{size}--padding-top'
                },
                {
                    name: '--modal--{size}--padding-right'
                },
                {
                    name: '--modal--{size}--padding-bottom'
                },
                {
                    name: '--modal--{size}--padding-left'
                },
                {
                    name: '--modal--{size}--max-width'
                },
                {
                    name: '--modal--{size}--close--size'
                },
                {
                    name: '--modal--{size}--close--font-size'
                },
                {
                    name: '--modal--{size}--footer--gap'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--modal--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--modal--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--modal--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--modal--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--modal--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--modal--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--modal--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--modal--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--modal--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--modal--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--modal--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--modal--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--modal--border-width',
                    value: 'var(--modal--border-top-width) var(--modal--border-right-width) var(--modal--border-bottom-width) var(--modal--border-left-width)'
                },
                {
                    name: '--modal--border-style',
                    value: 'var(--modal--border-top-style) var(--modal--border-right-style) var(--modal--border-bottom-style) var(--modal--border-left-style)'
                },
                {
                    name: '--modal--border-color',
                    value: 'var(--modal--border-top-color) var(--modal--border-right-color) var(--modal--border-bottom-color) var(--modal--border-left-color)'
                },
                {
                    name: '--modal--border-top',
                    value: 'var(--modal--border-top-width) var(--modal--border-top-style) var(--modal--border-top-color)'
                },
                {
                    name: '--modal--border-right',
                    value: 'var(--modal--border-right-width) var(--modal--border-right-style) var(--modal--border-right-color)'
                },
                {
                    name: '--modal--border-bottom',
                    value: 'var(--modal--border-bottom-width) var(--modal--border-bottom-style) var(--modal--border-bottom-color)'
                },
                {
                    name: '--modal--border-left',
                    value: 'var(--modal--border-left-width) var(--modal--border-left-style) var(--modal--border-left-color)'
                },
                {
                    name: '--modal--border',
                    value: 'var(--modal--border-top-width) var(--modal--border-top-style) var(--modal--border-top-color)'
                },
                {
                    name: '--modal--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--modal--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--modal--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--modal--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--modal--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--modal--box-shadow',
                    value: 'var(--modal--box-shadow-offset-x) var(--modal--box-shadow-offset-y) var(--modal--box-shadow-blur-radius) var(--modal--box-shadow-spread-radius) var(--modal--box-shadow-color)'
                },
                {
                    name: '--modal--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--modal--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--modal--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--modal--transition',
                    value: 'var(--modal--transition-property) var(--modal--transition-duration) var(--modal--transition-timing-function)'
                },
                {
                    name: '--modal--width',
                    value: '100%'
                },
                {
                    name: '--modal--z-index',
                    value: '2000'
                },
                {
                    name: '--modal--wrapper--background',
                    value: 'hsla(0 0% 0% / 0.75)'
                },
                {
                    name: '--modal--close--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--modal--close--hover--background',
                    value: 'hsla(0 0% 0% / 0.1)'
                },
                {
                    name: '--modal--close--active--background',
                    value: 'hsla(0 0% 0% / 0.15)'
                },
                {
                    name: '--modal--close--size',
                    value: 'calc(var(--font-size--md) * 1.5)'
                },
                {
                    name: '--modal--close--font-size',
                    value: 'calc(var(--font-size--md) * 0.5)'
                },
                {
                    name: '--modal--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--modal--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--modal--border-top-left-radius',
                    value: 'var(--border-top-left-radius--md)'
                },
                {
                    name: '--modal--border-top-right-radius',
                    value: 'var(--border-top-right-radius--md)'
                },
                {
                    name: '--modal--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius--md)'
                },
                {
                    name: '--modal--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius--md)'
                },
                {
                    name: '--modal--border-radius',
                    value: 'var(--modal--border-top-left-radius) var(--modal--border-top-right-radius) var(--modal--border-bottom-right-radius) var(--modal--border-bottom-left-radius)'
                },
                {
                    name: '--modal--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--modal--padding-top',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--modal--padding-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--modal--padding-bottom',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--modal--padding-left',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--modal--padding',
                    value: 'var(--modal--padding-top) var(--modal--padding-right) var(--modal--padding-bottom) var(--modal--padding-left)'
                },
                {
                    name: '--modal--max-width',
                    value: 'calc(var(--spacing--md) * 30)'
                },
                {
                    name: '--modal--footer--gap',
                    value: 'calc(var(--spacing--md) * 0.5)'
                }
            ]
        }
    }
];

export default manifest;
