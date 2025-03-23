import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'CheckboxGroup',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the checkbox group',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the checkbox group',
                default: 'false'
            },
            {
                name: 'error',
                type: 'boolean | FormStateKeys[]',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            },
            {
                name: 'inline',
                type: 'boolean',
                description: 'Display the checkbox group as inline',
                default: 'false'
            },
            {
                name: 'indeterminate',
                type: 'boolean',
                description: 'The indeterminate state of the checkbox group',
                default: 'false'
            },
            {
                name: 'modelValue',
                type: 'Array',
                description: 'Used to set the checkbox group value',
                default: ''
            },
            {
                name: 'name',
                type: 'string',
                description: 'The unique identifier of the checkbox group',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'boolean',
                description: 'Displays the native browser checkbox input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'boolean',
                description: 'The readonly state of the checkbox group',
                default: 'false'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the checkbox group',
                default: ''
            },
            {
                name: 'validateSchema',
                type: 'boolean',
                description: 'Enable checkbox group validation using schema',
                default: 'true'
            },
            {
                name: 'options',
                type: 'Array',
                description: 'The options of the checkbox group',
                default: ''
            },
            {
                name: 'label',
                type: 'string | number | boolean | Function | Object',
                description:
                    'The fallback label of the checkbox group. Can be a string, number, render function, or component',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'CheckboxGroup',
                description: 'Event emitted for setting the modelValue'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for default checkbox group options'
            }
        ],
        css: {
            namespace: '',
            variables: []
        }
    },
    {
        name: 'Checkbox',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the checkbox',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the checkbox',
                default: 'false'
            },
            {
                name: 'error',
                type: 'boolean | FormStateKeys[]',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            },
            {
                name: 'indeterminate',
                type: 'boolean',
                description: 'The indeterminate state of the checkbox',
                default: 'false'
            },
            {
                name: 'value',
                type: 'boolean',
                description:
                    '[Deprecated] Used to set the checkbox value when used inside a checkbox group',
                default: 'false'
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to set the checkbox value when used by itself',
                default: 'false'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The unique identifier of the checkbox',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'boolean',
                description: 'Displays the native browser checkbox input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'boolean',
                description: 'The readonly state of the checkbox',
                default: 'false'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the checkbox',
                default: ''
            },
            {
                name: 'tabindex',
                type: 'number | string',
                description: 'The tabindex of the checkbox',
                default: '0'
            },
            {
                name: 'validateSchema',
                type: 'boolean',
                description: 'Enable input validation using schema',
                default: 'true'
            },
            {
                name: 'label',
                type: 'string | number | boolean | Function | Object',
                description:
                    'The label to be displayed alongside the checkbox. Can be a string, number, render function, or component',
                default: 'undefined'
            },
            {
                name: 'option',
                type: 'Object',
                description: 'The option object of the checkbox when used inside a checkbox group',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'Checkbox',
                description: 'Event emitted for setting the modelValue'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for default checkbox label'
            }
        ],
        css: {
            namespace: 'checkbox',
            variables: [
                {
                    name: '--checkbox--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--checkbox--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--checkbox--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--checkbox--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--checkbox--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--checkbox--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--checkbox--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--checkbox--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--checkbox--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--checkbox--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--checkbox--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--checkbox--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--checkbox--border-width',
                    value: 'var(--checkbox--border-top-width) var(--checkbox--border-right-width) var(--checkbox--border-bottom-width) var(--checkbox--border-left-width)'
                },
                {
                    name: '--checkbox--border-style',
                    value: 'var(--checkbox--border-top-style) var(--checkbox--border-right-style) var(--checkbox--border-bottom-style) var(--checkbox--border-left-style)'
                },
                {
                    name: '--checkbox--border-color',
                    value: 'var(--checkbox--border-top-color) var(--checkbox--border-right-color) var(--checkbox--border-bottom-color) var(--checkbox--border-left-color)'
                },
                {
                    name: '--checkbox--border-top',
                    value: 'var(--checkbox--border-top-width) var(--checkbox--border-top-style) var(--checkbox--border-top-color)'
                },
                {
                    name: '--checkbox--border-right',
                    value: 'var(--checkbox--border-right-width) var(--checkbox--border-right-style) var(--checkbox--border-right-color)'
                },
                {
                    name: '--checkbox--border-bottom',
                    value: 'var(--checkbox--border-bottom-width) var(--checkbox--border-bottom-style) var(--checkbox--border-bottom-color)'
                },
                {
                    name: '--checkbox--border-left',
                    value: 'var(--checkbox--border-left-width) var(--checkbox--border-left-style) var(--checkbox--border-left-color)'
                },
                {
                    name: '--checkbox--border',
                    value: 'var(--checkbox--border-top-width) var(--checkbox--border-top-style) var(--checkbox--border-top-color)'
                },
                {
                    name: '--checkbox--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--checkbox--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--checkbox--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--checkbox--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--checkbox--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--checkbox--box-shadow',
                    value: 'var(--checkbox--box-shadow-offset-x) var(--checkbox--box-shadow-offset-y) var(--checkbox--box-shadow-blur-radius) var(--checkbox--box-shadow-spread-radius) var(--checkbox--box-shadow-color)'
                },
                {
                    name: '--checkbox--transition-property',
                    value: 'background-color, color, border-color, transform'
                },
                {
                    name: '--checkbox--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--checkbox--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--checkbox--transition',
                    value: 'var(--checkbox--transition-property) var(--checkbox--transition-duration) var(--checkbox--transition-timing-function)'
                },
                {
                    name: '--checkbox--checkmark--color',
                    value: 'var(--color-white)'
                },
                {
                    name: '--checkbox--checkmark--width',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--checkbox--checkmark--height',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--checkbox--disabled--color',
                    value: 'var(--text-color-weak)'
                },
                {
                    name: '--checkbox--disabled--background',
                    value: 'var(--color-gray-100)'
                },
                {
                    name: '--checkbox--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--disabled--border-top-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--disabled--border-right-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--disabled--border-bottom-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--disabled--border-left-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--disabled--border-width',
                    value: 'var(--checkbox--disabled--border-top-width) var(--checkbox--disabled--border-right-width) var(--checkbox--disabled--border-bottom-width) var(--checkbox--disabled--border-left-width)'
                },
                {
                    name: '--checkbox--disabled--border-style',
                    value: 'var(--checkbox--disabled--border-top-style) var(--checkbox--disabled--border-right-style) var(--checkbox--disabled--border-bottom-style) var(--checkbox--disabled--border-left-style)'
                },
                {
                    name: '--checkbox--disabled--border-color',
                    value: 'var(--checkbox--disabled--border-top-color) var(--checkbox--disabled--border-right-color) var(--checkbox--disabled--border-bottom-color) var(--checkbox--disabled--border-left-color)'
                },
                {
                    name: '--checkbox--disabled--border-top',
                    value: 'var(--checkbox--disabled--border-top-width) var(--checkbox--disabled--border-top-style) var(--checkbox--disabled--border-top-color)'
                },
                {
                    name: '--checkbox--disabled--border-right',
                    value: 'var(--checkbox--disabled--border-right-width) var(--checkbox--disabled--border-right-style) var(--checkbox--disabled--border-right-color)'
                },
                {
                    name: '--checkbox--disabled--border-bottom',
                    value: 'var(--checkbox--disabled--border-bottom-width) var(--checkbox--disabled--border-bottom-style) var(--checkbox--disabled--border-bottom-color)'
                },
                {
                    name: '--checkbox--disabled--border-left',
                    value: 'var(--checkbox--disabled--border-left-width) var(--checkbox--disabled--border-left-style) var(--checkbox--disabled--border-left-color)'
                },
                {
                    name: '--checkbox--disabled--border',
                    value: 'var(--checkbox--disabled--border-top-width) var(--checkbox--disabled--border-top-style) var(--checkbox--disabled--border-top-color)'
                },
                {
                    name: '--checkbox--readonly--color',
                    value: 'var(--text-color-weak)'
                },
                {
                    name: '--checkbox--readonly--background',
                    value: 'var(--color-gray-100)'
                },
                {
                    name: '--checkbox--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--readonly--border-top-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--readonly--border-right-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--readonly--border-bottom-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--readonly--border-left-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--readonly--border-width',
                    value: 'var(--checkbox--readonly--border-top-width) var(--checkbox--readonly--border-right-width) var(--checkbox--readonly--border-bottom-width) var(--checkbox--readonly--border-left-width)'
                },
                {
                    name: '--checkbox--readonly--border-style',
                    value: 'var(--checkbox--readonly--border-top-style) var(--checkbox--readonly--border-right-style) var(--checkbox--readonly--border-bottom-style) var(--checkbox--readonly--border-left-style)'
                },
                {
                    name: '--checkbox--readonly--border-color',
                    value: 'var(--checkbox--readonly--border-top-color) var(--checkbox--readonly--border-right-color) var(--checkbox--readonly--border-bottom-color) var(--checkbox--readonly--border-left-color)'
                },
                {
                    name: '--checkbox--readonly--border-top',
                    value: 'var(--checkbox--readonly--border-top-width) var(--checkbox--readonly--border-top-style) var(--checkbox--readonly--border-top-color)'
                },
                {
                    name: '--checkbox--readonly--border-right',
                    value: 'var(--checkbox--readonly--border-right-width) var(--checkbox--readonly--border-right-style) var(--checkbox--readonly--border-right-color)'
                },
                {
                    name: '--checkbox--readonly--border-bottom',
                    value: 'var(--checkbox--readonly--border-bottom-width) var(--checkbox--readonly--border-bottom-style) var(--checkbox--readonly--border-bottom-color)'
                },
                {
                    name: '--checkbox--readonly--border-left',
                    value: 'var(--checkbox--readonly--border-left-width) var(--checkbox--readonly--border-left-style) var(--checkbox--readonly--border-left-color)'
                },
                {
                    name: '--checkbox--readonly--border',
                    value: 'var(--checkbox--readonly--border-top-width) var(--checkbox--readonly--border-top-style) var(--checkbox--readonly--border-top-color)'
                },
                {
                    name: '--checkbox--checked--background',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--checkbox--checked--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--border-top-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--checkbox--checked--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--border-right-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--checkbox--checked--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--border-bottom-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--checkbox--checked--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--border-left-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--checkbox--checked--border-width',
                    value: 'var(--checkbox--checked--border-top-width) var(--checkbox--checked--border-right-width) var(--checkbox--checked--border-bottom-width) var(--checkbox--checked--border-left-width)'
                },
                {
                    name: '--checkbox--checked--border-style',
                    value: 'var(--checkbox--checked--border-top-style) var(--checkbox--checked--border-right-style) var(--checkbox--checked--border-bottom-style) var(--checkbox--checked--border-left-style)'
                },
                {
                    name: '--checkbox--checked--border-color',
                    value: 'var(--checkbox--checked--border-top-color) var(--checkbox--checked--border-right-color) var(--checkbox--checked--border-bottom-color) var(--checkbox--checked--border-left-color)'
                },
                {
                    name: '--checkbox--checked--border-top',
                    value: 'var(--checkbox--checked--border-top-width) var(--checkbox--checked--border-top-style) var(--checkbox--checked--border-top-color)'
                },
                {
                    name: '--checkbox--checked--border-right',
                    value: 'var(--checkbox--checked--border-right-width) var(--checkbox--checked--border-right-style) var(--checkbox--checked--border-right-color)'
                },
                {
                    name: '--checkbox--checked--border-bottom',
                    value: 'var(--checkbox--checked--border-bottom-width) var(--checkbox--checked--border-bottom-style) var(--checkbox--checked--border-bottom-color)'
                },
                {
                    name: '--checkbox--checked--border-left',
                    value: 'var(--checkbox--checked--border-left-width) var(--checkbox--checked--border-left-style) var(--checkbox--checked--border-left-color)'
                },
                {
                    name: '--checkbox--checked--border',
                    value: 'var(--checkbox--checked--border-top-width) var(--checkbox--checked--border-top-style) var(--checkbox--checked--border-top-color)'
                },
                {
                    name: '--checkbox--checked--disabled--background',
                    value: 'var(--color-primary-300)'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--disabled--border-width',
                    value: 'var(--checkbox--checked--disabled--border-top-width) var(--checkbox--checked--disabled--border-right-width) var(--checkbox--checked--disabled--border-bottom-width) var(--checkbox--checked--disabled--border-left-width)'
                },
                {
                    name: '--checkbox--checked--disabled--border-style',
                    value: 'var(--checkbox--checked--disabled--border-top-style) var(--checkbox--checked--disabled--border-right-style) var(--checkbox--checked--disabled--border-bottom-style) var(--checkbox--checked--disabled--border-left-style)'
                },
                {
                    name: '--checkbox--checked--disabled--border-color',
                    value: 'var(--checkbox--checked--disabled--border-top-color) var(--checkbox--checked--disabled--border-right-color) var(--checkbox--checked--disabled--border-bottom-color) var(--checkbox--checked--disabled--border-left-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border-top',
                    value: 'var(--checkbox--checked--disabled--border-top-width) var(--checkbox--checked--disabled--border-top-style) var(--checkbox--checked--disabled--border-top-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border-right',
                    value: 'var(--checkbox--checked--disabled--border-right-width) var(--checkbox--checked--disabled--border-right-style) var(--checkbox--checked--disabled--border-right-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom',
                    value: 'var(--checkbox--checked--disabled--border-bottom-width) var(--checkbox--checked--disabled--border-bottom-style) var(--checkbox--checked--disabled--border-bottom-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border-left',
                    value: 'var(--checkbox--checked--disabled--border-left-width) var(--checkbox--checked--disabled--border-left-style) var(--checkbox--checked--disabled--border-left-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border',
                    value: 'var(--checkbox--checked--disabled--border-top-width) var(--checkbox--checked--disabled--border-top-style) var(--checkbox--checked--disabled--border-top-color)'
                },
                {
                    name: '--checkbox--checked--readonly--background',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-color',
                    value: 'var(--color-primary-500)'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-color',
                    value: 'var(--color-primary-500)'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-color',
                    value: 'var(--color-primary-500)'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-color',
                    value: 'var(--color-primary-500)'
                },
                {
                    name: '--checkbox--checked--readonly--border-width',
                    value: 'var(--checkbox--checked--readonly--border-top-width) var(--checkbox--checked--readonly--border-right-width) var(--checkbox--checked--readonly--border-bottom-width) var(--checkbox--checked--readonly--border-left-width)'
                },
                {
                    name: '--checkbox--checked--readonly--border-style',
                    value: 'var(--checkbox--checked--readonly--border-top-style) var(--checkbox--checked--readonly--border-right-style) var(--checkbox--checked--readonly--border-bottom-style) var(--checkbox--checked--readonly--border-left-style)'
                },
                {
                    name: '--checkbox--checked--readonly--border-color',
                    value: 'var(--checkbox--checked--readonly--border-top-color) var(--checkbox--checked--readonly--border-right-color) var(--checkbox--checked--readonly--border-bottom-color) var(--checkbox--checked--readonly--border-left-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border-top',
                    value: 'var(--checkbox--checked--readonly--border-top-width) var(--checkbox--checked--readonly--border-top-style) var(--checkbox--checked--readonly--border-top-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border-right',
                    value: 'var(--checkbox--checked--readonly--border-right-width) var(--checkbox--checked--readonly--border-right-style) var(--checkbox--checked--readonly--border-right-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom',
                    value: 'var(--checkbox--checked--readonly--border-bottom-width) var(--checkbox--checked--readonly--border-bottom-style) var(--checkbox--checked--readonly--border-bottom-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border-left',
                    value: 'var(--checkbox--checked--readonly--border-left-width) var(--checkbox--checked--readonly--border-left-style) var(--checkbox--checked--readonly--border-left-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border',
                    value: 'var(--checkbox--checked--readonly--border-top-width) var(--checkbox--checked--readonly--border-top-style) var(--checkbox--checked--readonly--border-top-color)'
                },
                {
                    name: '--checkbox--focus--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--checkbox--focus--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--checkbox--focus--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--checkbox--focus--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--checkbox--focus--box-shadow-color',
                    value: 'hsla(from var(--color-primary) h s l / 0.25)'
                },
                {
                    name: '--checkbox--focus--box-shadow',
                    value: 'var(--checkbox--focus--box-shadow-offset-x) var(--checkbox--focus--box-shadow-offset-y) var(--checkbox--focus--box-shadow-blur-radius) var(--checkbox--focus--box-shadow-spread-radius) var(--checkbox--focus--box-shadow-color)'
                },
                {
                    name: '--checkbox--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--checkbox--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--checkbox--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--checkbox--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--checkbox--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--checkbox--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--checkbox--border-radius',
                    value: 'var(--checkbox--border-top-left-radius) var(--checkbox--border-top-right-radius) var(--checkbox--border-bottom-right-radius) var(--checkbox--border-bottom-left-radius)'
                },
                {
                    name: '--checkbox--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--checkbox--margin-top',
                    value: '0'
                },
                {
                    name: '--checkbox--margin-right',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--checkbox--margin-bottom',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--checkbox--margin-left',
                    value: '0'
                },
                {
                    name: '--checkbox--margin',
                    value: 'var(--checkbox--margin-top) var(--checkbox--margin-right) var(--checkbox--margin-bottom) var(--checkbox--margin-left)'
                },
                {
                    name: '--checkbox--width',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--checkbox--height',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--checkbox--{color}--border-top-color'
                },
                {
                    name: '--checkbox--{color}--border-right-color'
                },
                {
                    name: '--checkbox--{color}--border-bottom-color'
                },
                {
                    name: '--checkbox--{color}--border-left-color'
                },
                {
                    name: '--checkbox--{color}--background'
                },
                {
                    name: '--checkbox--{color}--color'
                },
                {
                    name: '--checkbox--{color}--disabled--background'
                },
                {
                    name: '--checkbox--{color}--disabled--border-top-color'
                },
                {
                    name: '--checkbox--{color}--disabled--border-right-color'
                },
                {
                    name: '--checkbox--{color}--disabled--border-bottom-color'
                },
                {
                    name: '--checkbox--{color}--disabled--border-left-color'
                },
                {
                    name: '--checkbox--{color}--readonly--background'
                },
                {
                    name: '--checkbox--{color}--readonly--border-top-color'
                },
                {
                    name: '--checkbox--{color}--readonly--border-right-color'
                },
                {
                    name: '--checkbox--{color}--readonly--border-bottom-color'
                },
                {
                    name: '--checkbox--{color}--readonly--border-left-color'
                },
                {
                    name: '--checkbox--{color}--checked--disabled--background'
                },
                {
                    name: '--checkbox--{color}--checked--disabled--border-top-color'
                },
                {
                    name: '--checkbox--{color}--checked--disabled--border-right-color'
                },
                {
                    name: '--checkbox--{color}--checked--disabled--border-bottom-color'
                },
                {
                    name: '--checkbox--{color}--checked--disabled--border-left-color'
                },
                {
                    name: '--checkbox--{color}--checked--readonly--background'
                },
                {
                    name: '--checkbox--{color}--checked--readonly--border-top-color'
                },
                {
                    name: '--checkbox--{color}--checked--readonly--border-right-color'
                },
                {
                    name: '--checkbox--{color}--checked--readonly--border-bottom-color'
                },
                {
                    name: '--checkbox--{color}--checked--readonly--border-left-color'
                },
                {
                    name: '--checkbox--{size}--border-top-left-radius'
                },
                {
                    name: '--checkbox--{size}--border-top-right-radius'
                },
                {
                    name: '--checkbox--{size}--border-bottom-right-radius'
                },
                {
                    name: '--checkbox--{size}--border-bottom-left-radius'
                },
                {
                    name: '--checkbox--{size}--font-size'
                },
                {
                    name: '--checkbox--{size}--margin-top'
                },
                {
                    name: '--checkbox--{size}--margin-right'
                },
                {
                    name: '--checkbox--{size}--margin-bottom'
                },
                {
                    name: '--checkbox--{size}--margin-left'
                },
                {
                    name: '--checkbox--{size}--width'
                },
                {
                    name: '--checkbox--{size}--height'
                },
                {
                    name: '--checkbox--{size}--checkmark--width'
                },
                {
                    name: '--checkbox--{size}--checkmark--height'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--checkbox--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--checkbox--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--checkbox--border-top-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--checkbox--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--checkbox--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--checkbox--border-right-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--checkbox--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--checkbox--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--checkbox--border-bottom-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--checkbox--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--checkbox--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--checkbox--border-left-color',
                    value: 'var(--color-light-shade-50)'
                },
                {
                    name: '--checkbox--border-width',
                    value: 'var(--checkbox--border-top-width) var(--checkbox--border-right-width) var(--checkbox--border-bottom-width) var(--checkbox--border-left-width)'
                },
                {
                    name: '--checkbox--border-style',
                    value: 'var(--checkbox--border-top-style) var(--checkbox--border-right-style) var(--checkbox--border-bottom-style) var(--checkbox--border-left-style)'
                },
                {
                    name: '--checkbox--border-color',
                    value: 'var(--checkbox--border-top-color) var(--checkbox--border-right-color) var(--checkbox--border-bottom-color) var(--checkbox--border-left-color)'
                },
                {
                    name: '--checkbox--border-top',
                    value: 'var(--checkbox--border-top-width) var(--checkbox--border-top-style) var(--checkbox--border-top-color)'
                },
                {
                    name: '--checkbox--border-right',
                    value: 'var(--checkbox--border-right-width) var(--checkbox--border-right-style) var(--checkbox--border-right-color)'
                },
                {
                    name: '--checkbox--border-bottom',
                    value: 'var(--checkbox--border-bottom-width) var(--checkbox--border-bottom-style) var(--checkbox--border-bottom-color)'
                },
                {
                    name: '--checkbox--border-left',
                    value: 'var(--checkbox--border-left-width) var(--checkbox--border-left-style) var(--checkbox--border-left-color)'
                },
                {
                    name: '--checkbox--border',
                    value: 'var(--checkbox--border-top-width) var(--checkbox--border-top-style) var(--checkbox--border-top-color)'
                },
                {
                    name: '--checkbox--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--checkbox--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--checkbox--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--checkbox--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--checkbox--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--checkbox--box-shadow',
                    value: 'var(--checkbox--box-shadow-offset-x) var(--checkbox--box-shadow-offset-y) var(--checkbox--box-shadow-blur-radius) var(--checkbox--box-shadow-spread-radius) var(--checkbox--box-shadow-color)'
                },
                {
                    name: '--checkbox--transition-property',
                    value: 'background-color, color, border-color, transform'
                },
                {
                    name: '--checkbox--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--checkbox--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--checkbox--transition',
                    value: 'var(--checkbox--transition-property) var(--checkbox--transition-duration) var(--checkbox--transition-timing-function)'
                },
                {
                    name: '--checkbox--checkmark--color',
                    value: 'var(--color-white)'
                },
                {
                    name: '--checkbox--checkmark--width',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--checkbox--checkmark--height',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--checkbox--disabled--color',
                    value: 'var(--text-color-weak)'
                },
                {
                    name: '--checkbox--disabled--background',
                    value: 'var(--color-gray-100)'
                },
                {
                    name: '--checkbox--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--disabled--border-top-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--disabled--border-right-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--disabled--border-bottom-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--disabled--border-left-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--disabled--border-width',
                    value: 'var(--checkbox--disabled--border-top-width) var(--checkbox--disabled--border-right-width) var(--checkbox--disabled--border-bottom-width) var(--checkbox--disabled--border-left-width)'
                },
                {
                    name: '--checkbox--disabled--border-style',
                    value: 'var(--checkbox--disabled--border-top-style) var(--checkbox--disabled--border-right-style) var(--checkbox--disabled--border-bottom-style) var(--checkbox--disabled--border-left-style)'
                },
                {
                    name: '--checkbox--disabled--border-color',
                    value: 'var(--checkbox--disabled--border-top-color) var(--checkbox--disabled--border-right-color) var(--checkbox--disabled--border-bottom-color) var(--checkbox--disabled--border-left-color)'
                },
                {
                    name: '--checkbox--disabled--border-top',
                    value: 'var(--checkbox--disabled--border-top-width) var(--checkbox--disabled--border-top-style) var(--checkbox--disabled--border-top-color)'
                },
                {
                    name: '--checkbox--disabled--border-right',
                    value: 'var(--checkbox--disabled--border-right-width) var(--checkbox--disabled--border-right-style) var(--checkbox--disabled--border-right-color)'
                },
                {
                    name: '--checkbox--disabled--border-bottom',
                    value: 'var(--checkbox--disabled--border-bottom-width) var(--checkbox--disabled--border-bottom-style) var(--checkbox--disabled--border-bottom-color)'
                },
                {
                    name: '--checkbox--disabled--border-left',
                    value: 'var(--checkbox--disabled--border-left-width) var(--checkbox--disabled--border-left-style) var(--checkbox--disabled--border-left-color)'
                },
                {
                    name: '--checkbox--disabled--border',
                    value: 'var(--checkbox--disabled--border-top-width) var(--checkbox--disabled--border-top-style) var(--checkbox--disabled--border-top-color)'
                },
                {
                    name: '--checkbox--readonly--color',
                    value: 'var(--text-color-weak)'
                },
                {
                    name: '--checkbox--readonly--background',
                    value: 'var(--color-gray-100)'
                },
                {
                    name: '--checkbox--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--readonly--border-top-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--readonly--border-right-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--readonly--border-bottom-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--readonly--border-left-color',
                    value: 'var(--color-gray-200)'
                },
                {
                    name: '--checkbox--readonly--border-width',
                    value: 'var(--checkbox--readonly--border-top-width) var(--checkbox--readonly--border-right-width) var(--checkbox--readonly--border-bottom-width) var(--checkbox--readonly--border-left-width)'
                },
                {
                    name: '--checkbox--readonly--border-style',
                    value: 'var(--checkbox--readonly--border-top-style) var(--checkbox--readonly--border-right-style) var(--checkbox--readonly--border-bottom-style) var(--checkbox--readonly--border-left-style)'
                },
                {
                    name: '--checkbox--readonly--border-color',
                    value: 'var(--checkbox--readonly--border-top-color) var(--checkbox--readonly--border-right-color) var(--checkbox--readonly--border-bottom-color) var(--checkbox--readonly--border-left-color)'
                },
                {
                    name: '--checkbox--readonly--border-top',
                    value: 'var(--checkbox--readonly--border-top-width) var(--checkbox--readonly--border-top-style) var(--checkbox--readonly--border-top-color)'
                },
                {
                    name: '--checkbox--readonly--border-right',
                    value: 'var(--checkbox--readonly--border-right-width) var(--checkbox--readonly--border-right-style) var(--checkbox--readonly--border-right-color)'
                },
                {
                    name: '--checkbox--readonly--border-bottom',
                    value: 'var(--checkbox--readonly--border-bottom-width) var(--checkbox--readonly--border-bottom-style) var(--checkbox--readonly--border-bottom-color)'
                },
                {
                    name: '--checkbox--readonly--border-left',
                    value: 'var(--checkbox--readonly--border-left-width) var(--checkbox--readonly--border-left-style) var(--checkbox--readonly--border-left-color)'
                },
                {
                    name: '--checkbox--readonly--border',
                    value: 'var(--checkbox--readonly--border-top-width) var(--checkbox--readonly--border-top-style) var(--checkbox--readonly--border-top-color)'
                },
                {
                    name: '--checkbox--checked--background',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--checkbox--checked--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--border-top-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--checkbox--checked--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--border-right-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--checkbox--checked--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--border-bottom-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--checkbox--checked--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--border-left-color',
                    value: 'var(--color-primary-shade-50)'
                },
                {
                    name: '--checkbox--checked--border-width',
                    value: 'var(--checkbox--checked--border-top-width) var(--checkbox--checked--border-right-width) var(--checkbox--checked--border-bottom-width) var(--checkbox--checked--border-left-width)'
                },
                {
                    name: '--checkbox--checked--border-style',
                    value: 'var(--checkbox--checked--border-top-style) var(--checkbox--checked--border-right-style) var(--checkbox--checked--border-bottom-style) var(--checkbox--checked--border-left-style)'
                },
                {
                    name: '--checkbox--checked--border-color',
                    value: 'var(--checkbox--checked--border-top-color) var(--checkbox--checked--border-right-color) var(--checkbox--checked--border-bottom-color) var(--checkbox--checked--border-left-color)'
                },
                {
                    name: '--checkbox--checked--border-top',
                    value: 'var(--checkbox--checked--border-top-width) var(--checkbox--checked--border-top-style) var(--checkbox--checked--border-top-color)'
                },
                {
                    name: '--checkbox--checked--border-right',
                    value: 'var(--checkbox--checked--border-right-width) var(--checkbox--checked--border-right-style) var(--checkbox--checked--border-right-color)'
                },
                {
                    name: '--checkbox--checked--border-bottom',
                    value: 'var(--checkbox--checked--border-bottom-width) var(--checkbox--checked--border-bottom-style) var(--checkbox--checked--border-bottom-color)'
                },
                {
                    name: '--checkbox--checked--border-left',
                    value: 'var(--checkbox--checked--border-left-width) var(--checkbox--checked--border-left-style) var(--checkbox--checked--border-left-color)'
                },
                {
                    name: '--checkbox--checked--border',
                    value: 'var(--checkbox--checked--border-top-width) var(--checkbox--checked--border-top-style) var(--checkbox--checked--border-top-color)'
                },
                {
                    name: '--checkbox--checked--disabled--background',
                    value: 'var(--color-primary-300)'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-color',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--disabled--border-width',
                    value: 'var(--checkbox--checked--disabled--border-top-width) var(--checkbox--checked--disabled--border-right-width) var(--checkbox--checked--disabled--border-bottom-width) var(--checkbox--checked--disabled--border-left-width)'
                },
                {
                    name: '--checkbox--checked--disabled--border-style',
                    value: 'var(--checkbox--checked--disabled--border-top-style) var(--checkbox--checked--disabled--border-right-style) var(--checkbox--checked--disabled--border-bottom-style) var(--checkbox--checked--disabled--border-left-style)'
                },
                {
                    name: '--checkbox--checked--disabled--border-color',
                    value: 'var(--checkbox--checked--disabled--border-top-color) var(--checkbox--checked--disabled--border-right-color) var(--checkbox--checked--disabled--border-bottom-color) var(--checkbox--checked--disabled--border-left-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border-top',
                    value: 'var(--checkbox--checked--disabled--border-top-width) var(--checkbox--checked--disabled--border-top-style) var(--checkbox--checked--disabled--border-top-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border-right',
                    value: 'var(--checkbox--checked--disabled--border-right-width) var(--checkbox--checked--disabled--border-right-style) var(--checkbox--checked--disabled--border-right-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom',
                    value: 'var(--checkbox--checked--disabled--border-bottom-width) var(--checkbox--checked--disabled--border-bottom-style) var(--checkbox--checked--disabled--border-bottom-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border-left',
                    value: 'var(--checkbox--checked--disabled--border-left-width) var(--checkbox--checked--disabled--border-left-style) var(--checkbox--checked--disabled--border-left-color)'
                },
                {
                    name: '--checkbox--checked--disabled--border',
                    value: 'var(--checkbox--checked--disabled--border-top-width) var(--checkbox--checked--disabled--border-top-style) var(--checkbox--checked--disabled--border-top-color)'
                },
                {
                    name: '--checkbox--checked--readonly--background',
                    value: 'var(--color-primary-400)'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-color',
                    value: 'var(--color-primary-500)'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-color',
                    value: 'var(--color-primary-500)'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-color',
                    value: 'var(--color-primary-500)'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-color',
                    value: 'var(--color-primary-500)'
                },
                {
                    name: '--checkbox--checked--readonly--border-width',
                    value: 'var(--checkbox--checked--readonly--border-top-width) var(--checkbox--checked--readonly--border-right-width) var(--checkbox--checked--readonly--border-bottom-width) var(--checkbox--checked--readonly--border-left-width)'
                },
                {
                    name: '--checkbox--checked--readonly--border-style',
                    value: 'var(--checkbox--checked--readonly--border-top-style) var(--checkbox--checked--readonly--border-right-style) var(--checkbox--checked--readonly--border-bottom-style) var(--checkbox--checked--readonly--border-left-style)'
                },
                {
                    name: '--checkbox--checked--readonly--border-color',
                    value: 'var(--checkbox--checked--readonly--border-top-color) var(--checkbox--checked--readonly--border-right-color) var(--checkbox--checked--readonly--border-bottom-color) var(--checkbox--checked--readonly--border-left-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border-top',
                    value: 'var(--checkbox--checked--readonly--border-top-width) var(--checkbox--checked--readonly--border-top-style) var(--checkbox--checked--readonly--border-top-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border-right',
                    value: 'var(--checkbox--checked--readonly--border-right-width) var(--checkbox--checked--readonly--border-right-style) var(--checkbox--checked--readonly--border-right-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom',
                    value: 'var(--checkbox--checked--readonly--border-bottom-width) var(--checkbox--checked--readonly--border-bottom-style) var(--checkbox--checked--readonly--border-bottom-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border-left',
                    value: 'var(--checkbox--checked--readonly--border-left-width) var(--checkbox--checked--readonly--border-left-style) var(--checkbox--checked--readonly--border-left-color)'
                },
                {
                    name: '--checkbox--checked--readonly--border',
                    value: 'var(--checkbox--checked--readonly--border-top-width) var(--checkbox--checked--readonly--border-top-style) var(--checkbox--checked--readonly--border-top-color)'
                },
                {
                    name: '--checkbox--focus--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--checkbox--focus--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--checkbox--focus--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--checkbox--focus--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--checkbox--focus--box-shadow-color',
                    value: 'hsla(from var(--color-primary) h s l / 0.25)'
                },
                {
                    name: '--checkbox--focus--box-shadow',
                    value: 'var(--checkbox--focus--box-shadow-offset-x) var(--checkbox--focus--box-shadow-offset-y) var(--checkbox--focus--box-shadow-blur-radius) var(--checkbox--focus--box-shadow-spread-radius) var(--checkbox--focus--box-shadow-color)'
                },
                {
                    name: '--checkbox--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--checkbox--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--checkbox--border-top-left-radius',
                    value: 'var(--border-top-left-radius-md)'
                },
                {
                    name: '--checkbox--border-top-right-radius',
                    value: 'var(--border-top-right-radius-md)'
                },
                {
                    name: '--checkbox--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius-md)'
                },
                {
                    name: '--checkbox--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius-md)'
                },
                {
                    name: '--checkbox--border-radius',
                    value: 'var(--checkbox--border-top-left-radius) var(--checkbox--border-top-right-radius) var(--checkbox--border-bottom-right-radius) var(--checkbox--border-bottom-left-radius)'
                },
                {
                    name: '--checkbox--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--checkbox--margin-top',
                    value: '0'
                },
                {
                    name: '--checkbox--margin-right',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--checkbox--margin-bottom',
                    value: 'calc(var(--spacing-md) * 0.5)'
                },
                {
                    name: '--checkbox--margin-left',
                    value: '0'
                },
                {
                    name: '--checkbox--margin',
                    value: 'var(--checkbox--margin-top) var(--checkbox--margin-right) var(--checkbox--margin-bottom) var(--checkbox--margin-left)'
                },
                {
                    name: '--checkbox--width',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--checkbox--height',
                    value: 'var(--spacing-md)'
                }
            ]
        }
    }
];

export default manifest;
