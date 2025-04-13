import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Drawer',
        props: [
            {
                name: 'closeOnPressEscape',
                type: 'boolean',
                description: 'Determines if the drawer should close when pressing escape',
                default: 'true'
            },
            {
                name: 'closeAriaLabel',
                type: 'string',
                description: 'The aria-label attribute of the close button',
                default: 'Close'
            },
            {
                name: 'color',
                type: "'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the drawer',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the drawer',
                default: 'false'
            },
            {
                name: 'fullscreen',
                type: 'boolean',
                description: 'Make the drawer cover the entire screen',
                default: 'false'
            },
            {
                name: 'hideOnClickOutside',
                type: 'boolean',
                description: 'Determines if the drawer should close when clicking the overlay',
                default: 'true'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The identifier of the drawer',
                default: 'uid()'
            },
            {
                name: 'dismissible',
                type: 'boolean',
                description: 'Determines if the close icon should be visible in the drawer header',
                default: 'false'
            },
            {
                name: 'position',
                type: "'top' | 'right' | 'bottom' | 'left'",
                description: 'The position of the drawer',
                default: 'left'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the drawer',
                default: ''
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to determine if drawer is visible or not',
                default: 'false'
            },
            {
                name: 'transition',
                type: "'fade-in-transition' | 'fade-in-linear-transition' | 'zoom-in-top-transition' | 'zoom-in-bottom-transition' | 'zoom-in-center-transition' | 'zoom-in-left-transition' | 'zoom-in-right-transition'",
                description: 'The drawer opening and closing animation',
                default: 'zoom-in-center-transition'
            },
            {
                name: 'header',
                type: 'string | VNode | VNode[]',
                description: 'The header of the drawer',
                default: 'undefined'
            },
            {
                name: 'icon',
                type: 'string | VNode | VNode[]',
                description: 'The icon of the drawer',
                default: 'undefined'
            },
            {
                name: 'body',
                type: 'string | VNode | VNode[]',
                description: 'The body of the drawer',
                default: 'undefined'
            },
            {
                name: 'footer',
                type: 'string | VNode | VNode[]',
                description: 'The footer of the drawer',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'Drawer',
                description: 'Event emitted for setting the modelValue'
            },
            {
                name: 'Drawer',
                description: 'Event emitted when the drawer is open'
            },
            {
                name: 'Drawer',
                description: 'Event emitted when the drawer is opened and animation is finished'
            },
            {
                name: 'Drawer',
                description: 'Event emitted when the drawer is closed'
            },
            {
                name: 'Drawer',
                description: 'Event emitted when the drawer is closed and animation is finished'
            }
        ],
        slots: [
            {
                name: 'footer',
                description: 'Slot for drawer header content'
            },
            {
                name: 'close',
                description: 'Close button slot'
            },
            {
                name: 'default',
                description: 'Slot for drawer body content'
            },
            {
                name: 'footer',
                description: 'Slot for drawer footer content'
            }
        ],
        css: {
            namespace: 'drawer',
            variables: [
                {
                    name: '--drawer--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--drawer--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--drawer--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--drawer--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--drawer--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--drawer--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--drawer--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--drawer--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--drawer--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--drawer--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--drawer--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--drawer--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--drawer--border-width',
                    value: 'var(--drawer--border-top-width) var(--drawer--border-right-width) var(--drawer--border-bottom-width) var(--drawer--border-left-width)'
                },
                {
                    name: '--drawer--border-style',
                    value: 'var(--drawer--border-top-style) var(--drawer--border-right-style) var(--drawer--border-bottom-style) var(--drawer--border-left-style)'
                },
                {
                    name: '--drawer--border-color',
                    value: 'var(--drawer--border-top-color) var(--drawer--border-right-color) var(--drawer--border-bottom-color) var(--drawer--border-left-color)'
                },
                {
                    name: '--drawer--border-top',
                    value: 'var(--drawer--border-top-width) var(--drawer--border-top-style) var(--drawer--border-top-color)'
                },
                {
                    name: '--drawer--border-right',
                    value: 'var(--drawer--border-right-width) var(--drawer--border-right-style) var(--drawer--border-right-color)'
                },
                {
                    name: '--drawer--border-bottom',
                    value: 'var(--drawer--border-bottom-width) var(--drawer--border-bottom-style) var(--drawer--border-bottom-color)'
                },
                {
                    name: '--drawer--border-left',
                    value: 'var(--drawer--border-left-width) var(--drawer--border-left-style) var(--drawer--border-left-color)'
                },
                {
                    name: '--drawer--border',
                    value: 'var(--drawer--border-top-width) var(--drawer--border-top-style) var(--drawer--border-top-color)'
                },
                {
                    name: '--drawer--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--drawer--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--drawer--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--drawer--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--drawer--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--drawer--box-shadow',
                    value: 'var(--drawer--box-shadow-offset-x) var(--drawer--box-shadow-offset-y) var(--drawer--box-shadow-blur-radius) var(--drawer--box-shadow-spread-radius) var(--drawer--box-shadow-color)'
                },
                {
                    name: '--drawer--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--drawer--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--drawer--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--drawer--transition',
                    value: 'var(--drawer--transition-property) var(--drawer--transition-duration) var(--drawer--transition-timing-function)'
                },
                {
                    name: '--drawer--width',
                    value: '100%'
                },
                {
                    name: '--drawer--z-index',
                    value: '2000'
                },
                {
                    name: '--drawer--wrapper--background',
                    value: 'hsla(0 0% 0% / 0.75)'
                },
                {
                    name: '--drawer--close--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--drawer--close--hover--background',
                    value: 'hsla(0 0% 0% / 0.1)'
                },
                {
                    name: '--drawer--close--active--background',
                    value: 'hsla(0 0% 0% / 0.15)'
                },
                {
                    name: '--drawer--close--size',
                    value: 'calc(var(--font-size--md) * 1.5)'
                },
                {
                    name: '--drawer--close--font-size',
                    value: 'calc(var(--font-size--md) * 0.5)'
                },
                {
                    name: '--drawer--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--drawer--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--drawer--header--background',
                    value: 'var(--color-light)'
                },
                {
                    name: '--drawer--footer--background',
                    value: 'var(--color-light)'
                },
                {
                    name: '--drawer--footer--button--margin-top',
                    value: '0'
                },
                {
                    name: '--drawer--footer--button--margin-right',
                    value: '0'
                },
                {
                    name: '--drawer--footer--button--margin-bottom',
                    value: '0'
                },
                {
                    name: '--drawer--footer--button--margin-left',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--drawer--footer--button--margin',
                    value: 'var(--drawer--footer--button--margin-top) var(--drawer--footer--button--margin-right) var(--drawer--footer--button--margin-bottom) var(--drawer--footer--button--margin-left)'
                },
                {
                    name: '--drawer--border-top-left-radius',
                    value: 'var(--border-top-left-radius--md)'
                },
                {
                    name: '--drawer--border-top-right-radius',
                    value: 'var(--border-top-right-radius--md)'
                },
                {
                    name: '--drawer--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius--md)'
                },
                {
                    name: '--drawer--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius--md)'
                },
                {
                    name: '--drawer--border-radius',
                    value: 'var(--drawer--border-top-left-radius) var(--drawer--border-top-right-radius) var(--drawer--border-bottom-right-radius) var(--drawer--border-bottom-left-radius)'
                },
                {
                    name: '--drawer--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--drawer--padding-top',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--drawer--padding-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--drawer--padding-bottom',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--drawer--padding-left',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--drawer--padding',
                    value: 'var(--drawer--padding-top) var(--drawer--padding-right) var(--drawer--padding-bottom) var(--drawer--padding-left)'
                },
                {
                    name: '--drawer--max-width',
                    value: 'calc(var(--spacing--md) * 30)'
                },
                {
                    name: '--drawer--icon--margin-top',
                    value: '0'
                },
                {
                    name: '--drawer--icon--margin-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--drawer--icon--margin-bottom',
                    value: '0'
                },
                {
                    name: '--drawer--icon--margin-left',
                    value: '0'
                },
                {
                    name: '--drawer--icon--margin',
                    value: 'var(--drawer--icon--margin-top) var(--drawer--icon--margin-right) var(--drawer--icon--margin-bottom) var(--drawer--icon--margin-left)'
                },
                {
                    name: '--drawer--{color}--border-top-color'
                },
                {
                    name: '--drawer--{color}--border-right-color'
                },
                {
                    name: '--drawer--{color}--border-bottom-color'
                },
                {
                    name: '--drawer--{color}--border-left-color'
                },
                {
                    name: '--drawer--{color}--background'
                },
                {
                    name: '--drawer--{color}--color'
                },
                {
                    name: '--drawer--{color}--header--background'
                },
                {
                    name: '--drawer--{color}--footer--background'
                },
                {
                    name: '--drawer--{size}--border-top-left-radius'
                },
                {
                    name: '--drawer--{size}--border-top-right-radius'
                },
                {
                    name: '--drawer--{size}--border-bottom-right-radius'
                },
                {
                    name: '--drawer--{size}--border-bottom-left-radius'
                },
                {
                    name: '--drawer--{size}--font-size'
                },
                {
                    name: '--drawer--{size}--padding-top'
                },
                {
                    name: '--drawer--{size}--padding-right'
                },
                {
                    name: '--drawer--{size}--padding-bottom'
                },
                {
                    name: '--drawer--{size}--padding-left'
                },
                {
                    name: '--drawer--{size}--max-width'
                },
                {
                    name: '--drawer--{size}--close--size'
                },
                {
                    name: '--drawer--{size}--close--font-size'
                },
                {
                    name: '--drawer--{size}--icon--margin-top'
                },
                {
                    name: '--drawer--{size}--icon--margin-right'
                },
                {
                    name: '--drawer--{size}--icon--margin-bottom'
                },
                {
                    name: '--drawer--{size}--icon--margin-left'
                },
                {
                    name: '--drawer--{size}--footer--button--margin-top'
                },
                {
                    name: '--drawer--{size}--footer--button--margin-right'
                },
                {
                    name: '--drawer--{size}--footer--button--margin-bottom'
                },
                {
                    name: '--drawer--{size}--footer--button--margin-left'
                }
            ]
        }
    }
];

export default manifest;
