import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Input',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the input',
                default: ''
            },
            {
                name: 'clearable',
                type: 'boolean',
                description: 'Display the input as clearable',
                default: 'false'
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the input',
                default: 'false'
            },
            {
                name: 'error',
                type: 'boolean | FormStateKeys[]',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            },
            {
                name: 'id',
                type: 'string',
                description: 'The id of the internal input element',
                default: ''
            },
            {
                name: 'wrapperId',
                type: 'string',
                description: 'The id of the input wrapper element',
                default: ''
            },
            {
                name: 'modelValue',
                type: 'string | number',
                description: 'Used to set the field value',
                default: "''"
            },
            {
                name: 'name',
                type: 'string',
                description: 'The unique identifier of the input',
                default: 'uid()'
            },
            {
                name: 'plaintext',
                type: 'boolean',
                description: 'Display the input as plaintext, disabling interaction',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'boolean',
                description: 'The readonly state of the input',
                default: 'false'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the input',
                default: ''
            },
            {
                name: 'tabindex',
                type: 'number | string',
                description: 'The tabindex of the input',
                default: '0'
            },
            {
                name: 'type',
                type: 'string',
                description: 'The type of the input',
                default: 'text'
            },
            {
                name: 'clearAriaLabel',
                type: 'string',
                description: 'The aria-label of the clear button',
                default: 'Clear'
            },
            {
                name: 'showPasswordToggleAriaLabel',
                type: 'string',
                description: 'The aria-label of the show password toggle button',
                default: 'Toggle'
            },
            {
                name: 'showPasswordToggle',
                type: 'boolean',
                description: 'Display the password toggle button',
                default: 'true'
            },
            {
                name: 'validateSchema',
                type: 'boolean',
                description: 'Enable input validation using schema',
                default: 'true'
            }
        ],
        events: [
            {
                name: 'Input',
                description: 'Event emitted for setting the modelValue'
            },
            {
                name: 'Input',
                description: 'Event emitted when clearing the input element'
            },
            {
                name: 'Input',
                description: 'Event emitted when toggling the password visibility'
            }
        ],
        slots: [
            {
                name: 'prepend',
                description: 'Slot for the input prepend content'
            },
            {
                name: 'prefix',
                description: 'Slot for the input prefix content'
            },
            {
                name: 'password-toggle',
                description: 'Slot for the password toggle button'
            },
            {
                name: 'clearable',
                description: 'Slot for the clearable button'
            },
            {
                name: 'suffix',
                description: 'Slot for the input suffix content'
            },
            {
                name: 'append',
                description: 'Slot for the input append content'
            }
        ],
        css: {
            namespace: 'input',
            variables: [
                {
                    name: '--input--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--input--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--input--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--input--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--input--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--input--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--input--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--input--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--input--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--input--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--input--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--input--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--input--border-width',
                    value: 'var(--input--border-top-width) var(--input--border-right-width) var(--input--border-bottom-width) var(--input--border-left-width)'
                },
                {
                    name: '--input--border-style',
                    value: 'var(--input--border-top-style) var(--input--border-right-style) var(--input--border-bottom-style) var(--input--border-left-style)'
                },
                {
                    name: '--input--border-color',
                    value: 'var(--input--border-top-color) var(--input--border-right-color) var(--input--border-bottom-color) var(--input--border-left-color)'
                },
                {
                    name: '--input--border-top',
                    value: 'var(--input--border-top-width) var(--input--border-top-style) var(--input--border-top-color)'
                },
                {
                    name: '--input--border-right',
                    value: 'var(--input--border-right-width) var(--input--border-right-style) var(--input--border-right-color)'
                },
                {
                    name: '--input--border-bottom',
                    value: 'var(--input--border-bottom-width) var(--input--border-bottom-style) var(--input--border-bottom-color)'
                },
                {
                    name: '--input--border-left',
                    value: 'var(--input--border-left-width) var(--input--border-left-style) var(--input--border-left-color)'
                },
                {
                    name: '--input--border',
                    value: 'var(--input--border-top-width) var(--input--border-top-style) var(--input--border-top-color)'
                },
                {
                    name: '--input--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--input--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--input--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--input--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--input--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--input--box-shadow',
                    value: 'var(--input--box-shadow-offset-x) var(--input--box-shadow-offset-y) var(--input--box-shadow-blur-radius) var(--input--box-shadow-spread-radius) var(--input--box-shadow-color)'
                },
                {
                    name: '--input--line-height',
                    value: 'var(--line-height)'
                },
                {
                    name: '--input--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--input--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--input--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--input--transition',
                    value: 'var(--input--transition-property) var(--input--transition-duration) var(--input--transition-timing-function)'
                },
                {
                    name: '--input--error--border-top-width',
                    value: '0'
                },
                {
                    name: '--input--error--border-top-style',
                    value: 'none'
                },
                {
                    name: '--input--error--border-top-color',
                    value: 'var(--color-danger)'
                },
                {
                    name: '--input--error--border-right-width',
                    value: '0'
                },
                {
                    name: '--input--error--border-right-style',
                    value: 'none'
                },
                {
                    name: '--input--error--border-right-color',
                    value: 'var(--color-danger)'
                },
                {
                    name: '--input--error--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--input--error--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--input--error--border-bottom-color',
                    value: 'var(--color-danger)'
                },
                {
                    name: '--input--error--border-left-width',
                    value: '0'
                },
                {
                    name: '--input--error--border-left-style',
                    value: 'none'
                },
                {
                    name: '--input--error--border-left-color',
                    value: 'var(--color-danger)'
                },
                {
                    name: '--input--error--border-width',
                    value: 'var(--input--error--border-top-width) var(--input--error--border-right-width) var(--input--error--border-bottom-width) var(--input--error--border-left-width)'
                },
                {
                    name: '--input--error--border-style',
                    value: 'var(--input--error--border-top-style) var(--input--error--border-right-style) var(--input--error--border-bottom-style) var(--input--error--border-left-style)'
                },
                {
                    name: '--input--error--border-color',
                    value: 'var(--input--error--border-top-color) var(--input--error--border-right-color) var(--input--error--border-bottom-color) var(--input--error--border-left-color)'
                },
                {
                    name: '--input--error--border-top',
                    value: 'var(--input--error--border-top-width) var(--input--error--border-top-style) var(--input--error--border-top-color)'
                },
                {
                    name: '--input--error--border-right',
                    value: 'var(--input--error--border-right-width) var(--input--error--border-right-style) var(--input--error--border-right-color)'
                },
                {
                    name: '--input--error--border-bottom',
                    value: 'var(--input--error--border-bottom-width) var(--input--error--border-bottom-style) var(--input--error--border-bottom-color)'
                },
                {
                    name: '--input--error--border-left',
                    value: 'var(--input--error--border-left-width) var(--input--error--border-left-style) var(--input--error--border-left-color)'
                },
                {
                    name: '--input--error--border',
                    value: 'var(--input--error--border-top-width) var(--input--error--border-top-style) var(--input--error--border-top-color)'
                },
                {
                    name: '--input--placeholder--color',
                    value: 'var(--text-color--weaker)'
                },
                {
                    name: '--input--icon--width',
                    value: 'auto'
                },
                {
                    name: '--input--icon--height',
                    value: '1rem'
                },
                {
                    name: '--input--icon--color',
                    value: 'var(--text-color--weak)'
                },
                {
                    name: '--input--prefix--color',
                    value: 'var(--text-color--weaker)'
                },
                {
                    name: '--input--suffix--color',
                    value: 'var(--text-color--weaker)'
                },
                {
                    name: '--input--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--input--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--input--hover--border-top-width',
                    value: '0'
                },
                {
                    name: '--input--hover--border-top-style',
                    value: 'none'
                },
                {
                    name: '--input--hover--border-top-color',
                    value: 'var(--color-light--shade-100)'
                },
                {
                    name: '--input--hover--border-right-width',
                    value: '0'
                },
                {
                    name: '--input--hover--border-right-style',
                    value: 'none'
                },
                {
                    name: '--input--hover--border-right-color',
                    value: 'var(--color-light--shade-100)'
                },
                {
                    name: '--input--hover--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--input--hover--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--input--hover--border-bottom-color',
                    value: 'var(--color-light--shade-100)'
                },
                {
                    name: '--input--hover--border-left-width',
                    value: '0'
                },
                {
                    name: '--input--hover--border-left-style',
                    value: 'none'
                },
                {
                    name: '--input--hover--border-left-color',
                    value: 'var(--color-light--shade-100)'
                },
                {
                    name: '--input--hover--border-width',
                    value: 'var(--input--hover--border-top-width) var(--input--hover--border-right-width) var(--input--hover--border-bottom-width) var(--input--hover--border-left-width)'
                },
                {
                    name: '--input--hover--border-style',
                    value: 'var(--input--hover--border-top-style) var(--input--hover--border-right-style) var(--input--hover--border-bottom-style) var(--input--hover--border-left-style)'
                },
                {
                    name: '--input--hover--border-color',
                    value: 'var(--input--hover--border-top-color) var(--input--hover--border-right-color) var(--input--hover--border-bottom-color) var(--input--hover--border-left-color)'
                },
                {
                    name: '--input--hover--border-top',
                    value: 'var(--input--hover--border-top-width) var(--input--hover--border-top-style) var(--input--hover--border-top-color)'
                },
                {
                    name: '--input--hover--border-right',
                    value: 'var(--input--hover--border-right-width) var(--input--hover--border-right-style) var(--input--hover--border-right-color)'
                },
                {
                    name: '--input--hover--border-bottom',
                    value: 'var(--input--hover--border-bottom-width) var(--input--hover--border-bottom-style) var(--input--hover--border-bottom-color)'
                },
                {
                    name: '--input--hover--border-left',
                    value: 'var(--input--hover--border-left-width) var(--input--hover--border-left-style) var(--input--hover--border-left-color)'
                },
                {
                    name: '--input--hover--border',
                    value: 'var(--input--hover--border-top-width) var(--input--hover--border-top-style) var(--input--hover--border-top-color)'
                },
                {
                    name: '--input--focus--border-top-width',
                    value: '0'
                },
                {
                    name: '--input--focus--border-top-style',
                    value: 'none'
                },
                {
                    name: '--input--focus--border-top-color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--input--focus--border-right-width',
                    value: '0'
                },
                {
                    name: '--input--focus--border-right-style',
                    value: 'none'
                },
                {
                    name: '--input--focus--border-right-color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--input--focus--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--input--focus--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--input--focus--border-bottom-color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--input--focus--border-left-width',
                    value: '0'
                },
                {
                    name: '--input--focus--border-left-style',
                    value: 'none'
                },
                {
                    name: '--input--focus--border-left-color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--input--focus--border-width',
                    value: 'var(--input--focus--border-top-width) var(--input--focus--border-right-width) var(--input--focus--border-bottom-width) var(--input--focus--border-left-width)'
                },
                {
                    name: '--input--focus--border-style',
                    value: 'var(--input--focus--border-top-style) var(--input--focus--border-right-style) var(--input--focus--border-bottom-style) var(--input--focus--border-left-style)'
                },
                {
                    name: '--input--focus--border-color',
                    value: 'var(--input--focus--border-top-color) var(--input--focus--border-right-color) var(--input--focus--border-bottom-color) var(--input--focus--border-left-color)'
                },
                {
                    name: '--input--focus--border-top',
                    value: 'var(--input--focus--border-top-width) var(--input--focus--border-top-style) var(--input--focus--border-top-color)'
                },
                {
                    name: '--input--focus--border-right',
                    value: 'var(--input--focus--border-right-width) var(--input--focus--border-right-style) var(--input--focus--border-right-color)'
                },
                {
                    name: '--input--focus--border-bottom',
                    value: 'var(--input--focus--border-bottom-width) var(--input--focus--border-bottom-style) var(--input--focus--border-bottom-color)'
                },
                {
                    name: '--input--focus--border-left',
                    value: 'var(--input--focus--border-left-width) var(--input--focus--border-left-style) var(--input--focus--border-left-color)'
                },
                {
                    name: '--input--focus--border',
                    value: 'var(--input--focus--border-top-width) var(--input--focus--border-top-style) var(--input--focus--border-top-color)'
                },
                {
                    name: '--input--disabled--background',
                    value: 'var(--color-light)'
                },
                {
                    name: '--input--readonly--background',
                    value: 'var(--color-light--tint-50)'
                },
                {
                    name: '--input--border-top-left-radius',
                    value: 'var(--border-top-left-radius--md)'
                },
                {
                    name: '--input--border-top-right-radius',
                    value: 'var(--border-top-right-radius--md)'
                },
                {
                    name: '--input--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius--md)'
                },
                {
                    name: '--input--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius--md)'
                },
                {
                    name: '--input--border-radius',
                    value: 'var(--input--border-top-left-radius) var(--input--border-top-right-radius) var(--input--border-bottom-right-radius) var(--input--border-bottom-left-radius)'
                },
                {
                    name: '--input--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--input--padding-top',
                    value: 'calc(var(--spacing--md) * 0.75)'
                },
                {
                    name: '--input--padding-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--input--padding-bottom',
                    value: 'calc(var(--spacing--md) * 0.75)'
                },
                {
                    name: '--input--padding-left',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--input--padding',
                    value: 'var(--input--padding-top) var(--input--padding-right) var(--input--padding-bottom) var(--input--padding-left)'
                },
                {
                    name: '--input--{color}--border-top-color'
                },
                {
                    name: '--input--{color}--border-right-color'
                },
                {
                    name: '--input--{color}--border-bottom-color'
                },
                {
                    name: '--input--{color}--border-left-color'
                },
                {
                    name: '--input--{color}--background'
                },
                {
                    name: '--input--{color}--color'
                },
                {
                    name: '--input--{color}--hover--border-top-color'
                },
                {
                    name: '--input--{color}--hover--border-right-color'
                },
                {
                    name: '--input--{color}--hover--border-bottom-color'
                },
                {
                    name: '--input--{color}--hover--border-left-color'
                },
                {
                    name: '--input--{color}--focus--border-top-color'
                },
                {
                    name: '--input--{color}--focus--border-right-color'
                },
                {
                    name: '--input--{color}--focus--border-bottom-color'
                },
                {
                    name: '--input--{color}--focus--border-left-color'
                },
                {
                    name: '--input--{color}--disabled--background'
                },
                {
                    name: '--input--{color}--readonly--background'
                },
                {
                    name: '--input--{size}--border-top-left-radius'
                },
                {
                    name: '--input--{size}--border-top-right-radius'
                },
                {
                    name: '--input--{size}--border-bottom-right-radius'
                },
                {
                    name: '--input--{size}--border-bottom-left-radius'
                },
                {
                    name: '--input--{size}--font-size'
                },
                {
                    name: '--input--{size}--padding-top'
                },
                {
                    name: '--input--{size}--padding-right'
                },
                {
                    name: '--input--{size}--padding-bottom'
                },
                {
                    name: '--input--{size}--padding-left'
                }
            ]
        }
    },
    {
        name: 'Textarea',
        props: [
            {
                name: 'name',
                type: 'string',
                description: 'The unique identifier of the textarea',
                default: 'uid()'
            }
        ],
        events: [
            {
                name: 'Textarea',
                description: 'Event emitted for setting the modelValue'
            },
            {
                name: 'Textarea',
                description: 'Event emitted when clearing the input element'
            }
        ],
        slots: [],
        css: {
            namespace: '',
            variables: []
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--input--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--input--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--input--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--input--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--input--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--input--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--input--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--input--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--input--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--input--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--input--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--input--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--input--border-width',
                    value: 'var(--input--border-top-width) var(--input--border-right-width) var(--input--border-bottom-width) var(--input--border-left-width)'
                },
                {
                    name: '--input--border-style',
                    value: 'var(--input--border-top-style) var(--input--border-right-style) var(--input--border-bottom-style) var(--input--border-left-style)'
                },
                {
                    name: '--input--border-color',
                    value: 'var(--input--border-top-color) var(--input--border-right-color) var(--input--border-bottom-color) var(--input--border-left-color)'
                },
                {
                    name: '--input--border-top',
                    value: 'var(--input--border-top-width) var(--input--border-top-style) var(--input--border-top-color)'
                },
                {
                    name: '--input--border-right',
                    value: 'var(--input--border-right-width) var(--input--border-right-style) var(--input--border-right-color)'
                },
                {
                    name: '--input--border-bottom',
                    value: 'var(--input--border-bottom-width) var(--input--border-bottom-style) var(--input--border-bottom-color)'
                },
                {
                    name: '--input--border-left',
                    value: 'var(--input--border-left-width) var(--input--border-left-style) var(--input--border-left-color)'
                },
                {
                    name: '--input--border',
                    value: 'var(--input--border-top-width) var(--input--border-top-style) var(--input--border-top-color)'
                },
                {
                    name: '--input--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--input--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--input--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--input--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--input--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--input--box-shadow',
                    value: 'var(--input--box-shadow-offset-x) var(--input--box-shadow-offset-y) var(--input--box-shadow-blur-radius) var(--input--box-shadow-spread-radius) var(--input--box-shadow-color)'
                },
                {
                    name: '--input--line-height',
                    value: 'var(--line-height)'
                },
                {
                    name: '--input--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--input--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--input--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--input--transition',
                    value: 'var(--input--transition-property) var(--input--transition-duration) var(--input--transition-timing-function)'
                },
                {
                    name: '--input--error--border-top-width',
                    value: '0'
                },
                {
                    name: '--input--error--border-top-style',
                    value: 'none'
                },
                {
                    name: '--input--error--border-top-color',
                    value: 'var(--color-danger)'
                },
                {
                    name: '--input--error--border-right-width',
                    value: '0'
                },
                {
                    name: '--input--error--border-right-style',
                    value: 'none'
                },
                {
                    name: '--input--error--border-right-color',
                    value: 'var(--color-danger)'
                },
                {
                    name: '--input--error--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--input--error--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--input--error--border-bottom-color',
                    value: 'var(--color-danger)'
                },
                {
                    name: '--input--error--border-left-width',
                    value: '0'
                },
                {
                    name: '--input--error--border-left-style',
                    value: 'none'
                },
                {
                    name: '--input--error--border-left-color',
                    value: 'var(--color-danger)'
                },
                {
                    name: '--input--error--border-width',
                    value: 'var(--input--error--border-top-width) var(--input--error--border-right-width) var(--input--error--border-bottom-width) var(--input--error--border-left-width)'
                },
                {
                    name: '--input--error--border-style',
                    value: 'var(--input--error--border-top-style) var(--input--error--border-right-style) var(--input--error--border-bottom-style) var(--input--error--border-left-style)'
                },
                {
                    name: '--input--error--border-color',
                    value: 'var(--input--error--border-top-color) var(--input--error--border-right-color) var(--input--error--border-bottom-color) var(--input--error--border-left-color)'
                },
                {
                    name: '--input--error--border-top',
                    value: 'var(--input--error--border-top-width) var(--input--error--border-top-style) var(--input--error--border-top-color)'
                },
                {
                    name: '--input--error--border-right',
                    value: 'var(--input--error--border-right-width) var(--input--error--border-right-style) var(--input--error--border-right-color)'
                },
                {
                    name: '--input--error--border-bottom',
                    value: 'var(--input--error--border-bottom-width) var(--input--error--border-bottom-style) var(--input--error--border-bottom-color)'
                },
                {
                    name: '--input--error--border-left',
                    value: 'var(--input--error--border-left-width) var(--input--error--border-left-style) var(--input--error--border-left-color)'
                },
                {
                    name: '--input--error--border',
                    value: 'var(--input--error--border-top-width) var(--input--error--border-top-style) var(--input--error--border-top-color)'
                },
                {
                    name: '--input--placeholder--color',
                    value: 'var(--text-color--weaker)'
                },
                {
                    name: '--input--icon--width',
                    value: 'auto'
                },
                {
                    name: '--input--icon--height',
                    value: '1rem'
                },
                {
                    name: '--input--icon--color',
                    value: 'var(--text-color--weak)'
                },
                {
                    name: '--input--prefix--color',
                    value: 'var(--text-color--weaker)'
                },
                {
                    name: '--input--suffix--color',
                    value: 'var(--text-color--weaker)'
                },
                {
                    name: '--input--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--input--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--input--hover--border-top-width',
                    value: '0'
                },
                {
                    name: '--input--hover--border-top-style',
                    value: 'none'
                },
                {
                    name: '--input--hover--border-top-color',
                    value: 'var(--color-light--shade-100)'
                },
                {
                    name: '--input--hover--border-right-width',
                    value: '0'
                },
                {
                    name: '--input--hover--border-right-style',
                    value: 'none'
                },
                {
                    name: '--input--hover--border-right-color',
                    value: 'var(--color-light--shade-100)'
                },
                {
                    name: '--input--hover--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--input--hover--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--input--hover--border-bottom-color',
                    value: 'var(--color-light--shade-100)'
                },
                {
                    name: '--input--hover--border-left-width',
                    value: '0'
                },
                {
                    name: '--input--hover--border-left-style',
                    value: 'none'
                },
                {
                    name: '--input--hover--border-left-color',
                    value: 'var(--color-light--shade-100)'
                },
                {
                    name: '--input--hover--border-width',
                    value: 'var(--input--hover--border-top-width) var(--input--hover--border-right-width) var(--input--hover--border-bottom-width) var(--input--hover--border-left-width)'
                },
                {
                    name: '--input--hover--border-style',
                    value: 'var(--input--hover--border-top-style) var(--input--hover--border-right-style) var(--input--hover--border-bottom-style) var(--input--hover--border-left-style)'
                },
                {
                    name: '--input--hover--border-color',
                    value: 'var(--input--hover--border-top-color) var(--input--hover--border-right-color) var(--input--hover--border-bottom-color) var(--input--hover--border-left-color)'
                },
                {
                    name: '--input--hover--border-top',
                    value: 'var(--input--hover--border-top-width) var(--input--hover--border-top-style) var(--input--hover--border-top-color)'
                },
                {
                    name: '--input--hover--border-right',
                    value: 'var(--input--hover--border-right-width) var(--input--hover--border-right-style) var(--input--hover--border-right-color)'
                },
                {
                    name: '--input--hover--border-bottom',
                    value: 'var(--input--hover--border-bottom-width) var(--input--hover--border-bottom-style) var(--input--hover--border-bottom-color)'
                },
                {
                    name: '--input--hover--border-left',
                    value: 'var(--input--hover--border-left-width) var(--input--hover--border-left-style) var(--input--hover--border-left-color)'
                },
                {
                    name: '--input--hover--border',
                    value: 'var(--input--hover--border-top-width) var(--input--hover--border-top-style) var(--input--hover--border-top-color)'
                },
                {
                    name: '--input--focus--border-top-width',
                    value: '0'
                },
                {
                    name: '--input--focus--border-top-style',
                    value: 'none'
                },
                {
                    name: '--input--focus--border-top-color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--input--focus--border-right-width',
                    value: '0'
                },
                {
                    name: '--input--focus--border-right-style',
                    value: 'none'
                },
                {
                    name: '--input--focus--border-right-color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--input--focus--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--input--focus--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--input--focus--border-bottom-color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--input--focus--border-left-width',
                    value: '0'
                },
                {
                    name: '--input--focus--border-left-style',
                    value: 'none'
                },
                {
                    name: '--input--focus--border-left-color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--input--focus--border-width',
                    value: 'var(--input--focus--border-top-width) var(--input--focus--border-right-width) var(--input--focus--border-bottom-width) var(--input--focus--border-left-width)'
                },
                {
                    name: '--input--focus--border-style',
                    value: 'var(--input--focus--border-top-style) var(--input--focus--border-right-style) var(--input--focus--border-bottom-style) var(--input--focus--border-left-style)'
                },
                {
                    name: '--input--focus--border-color',
                    value: 'var(--input--focus--border-top-color) var(--input--focus--border-right-color) var(--input--focus--border-bottom-color) var(--input--focus--border-left-color)'
                },
                {
                    name: '--input--focus--border-top',
                    value: 'var(--input--focus--border-top-width) var(--input--focus--border-top-style) var(--input--focus--border-top-color)'
                },
                {
                    name: '--input--focus--border-right',
                    value: 'var(--input--focus--border-right-width) var(--input--focus--border-right-style) var(--input--focus--border-right-color)'
                },
                {
                    name: '--input--focus--border-bottom',
                    value: 'var(--input--focus--border-bottom-width) var(--input--focus--border-bottom-style) var(--input--focus--border-bottom-color)'
                },
                {
                    name: '--input--focus--border-left',
                    value: 'var(--input--focus--border-left-width) var(--input--focus--border-left-style) var(--input--focus--border-left-color)'
                },
                {
                    name: '--input--focus--border',
                    value: 'var(--input--focus--border-top-width) var(--input--focus--border-top-style) var(--input--focus--border-top-color)'
                },
                {
                    name: '--input--disabled--background',
                    value: 'var(--color-light)'
                },
                {
                    name: '--input--readonly--background',
                    value: 'var(--color-light--tint-50)'
                },
                {
                    name: '--input--border-top-left-radius',
                    value: 'var(--border-top-left-radius--md)'
                },
                {
                    name: '--input--border-top-right-radius',
                    value: 'var(--border-top-right-radius--md)'
                },
                {
                    name: '--input--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius--md)'
                },
                {
                    name: '--input--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius--md)'
                },
                {
                    name: '--input--border-radius',
                    value: 'var(--input--border-top-left-radius) var(--input--border-top-right-radius) var(--input--border-bottom-right-radius) var(--input--border-bottom-left-radius)'
                },
                {
                    name: '--input--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--input--padding-top',
                    value: 'calc(var(--spacing--md) * 0.75)'
                },
                {
                    name: '--input--padding-right',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--input--padding-bottom',
                    value: 'calc(var(--spacing--md) * 0.75)'
                },
                {
                    name: '--input--padding-left',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--input--padding',
                    value: 'var(--input--padding-top) var(--input--padding-right) var(--input--padding-bottom) var(--input--padding-left)'
                }
            ]
        }
    }
];

export default manifest;
