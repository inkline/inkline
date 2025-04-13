import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'RadioGroup',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the radio group',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the radio group',
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
                description: 'Display the radio group as inline',
                default: 'false'
            },
            {
                name: 'indeterminate',
                type: 'boolean',
                description: 'The indeterminate state of the radio group',
                default: 'false'
            },
            {
                name: 'label',
                type: 'string | number | boolean | Function | Object',
                description:
                    'The fallback label of the radio group. Can be a string, number, render function, or component',
                default: 'undefined'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The unique identifier of the radio group',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'boolean',
                description: 'Displays the native browser radio input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'boolean',
                description: 'The readonly state of the radio group',
                default: 'false'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the radio group',
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
                description: 'The options of the radio group',
                default: ''
            }
        ],
        events: [
            {
                name: 'RadioGroup',
                description: 'Event emitted for setting the modelValue'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for default radio group options'
            }
        ],
        css: {
            namespace: '',
            variables: []
        }
    },
    {
        name: 'Radio',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the radio',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the radio',
                default: 'false'
            },
            {
                name: 'error',
                type: 'boolean | FormStateKeys[]',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            },
            {
                name: 'modelValue',
                type: 'string | number | boolean | object',
                description: 'Used to set the radio value when used by itself',
                default: 'false'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The unique identifier of the radio',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'boolean',
                description: 'Displays the native browser radio input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'boolean',
                description: 'The readonly state of the radio',
                default: 'false'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the radio',
                default: ''
            },
            {
                name: 'tabindex',
                type: 'number | number',
                description: 'The tabindex of the radio',
                default: '0'
            },
            {
                name: 'label',
                type: 'string | number | boolean | Function | Object',
                description:
                    'The label to be displayed alongside the radio. Can be a string, number, render function, or component',
                default: 'undefined'
            },
            {
                name: 'option',
                type: 'Object',
                description: 'The option object of the radio when used inside a radio group',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'Radio',
                description: 'Event emitted for setting the modelValue'
            }
        ],
        slots: [
            {
                name: 'default',
                description: 'Slot for default radio label'
            }
        ],
        css: {
            namespace: 'radio',
            variables: [
                {
                    name: '--radio--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--radio--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--radio--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--radio--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--radio--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--radio--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--radio--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--radio--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--radio--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--radio--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--radio--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--radio--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--radio--border-width',
                    value: 'var(--radio--border-top-width) var(--radio--border-right-width) var(--radio--border-bottom-width) var(--radio--border-left-width)'
                },
                {
                    name: '--radio--border-style',
                    value: 'var(--radio--border-top-style) var(--radio--border-right-style) var(--radio--border-bottom-style) var(--radio--border-left-style)'
                },
                {
                    name: '--radio--border-color',
                    value: 'var(--radio--border-top-color) var(--radio--border-right-color) var(--radio--border-bottom-color) var(--radio--border-left-color)'
                },
                {
                    name: '--radio--border-top',
                    value: 'var(--radio--border-top-width) var(--radio--border-top-style) var(--radio--border-top-color)'
                },
                {
                    name: '--radio--border-right',
                    value: 'var(--radio--border-right-width) var(--radio--border-right-style) var(--radio--border-right-color)'
                },
                {
                    name: '--radio--border-bottom',
                    value: 'var(--radio--border-bottom-width) var(--radio--border-bottom-style) var(--radio--border-bottom-color)'
                },
                {
                    name: '--radio--border-left',
                    value: 'var(--radio--border-left-width) var(--radio--border-left-style) var(--radio--border-left-color)'
                },
                {
                    name: '--radio--border',
                    value: 'var(--radio--border-top-width) var(--radio--border-top-style) var(--radio--border-top-color)'
                },
                {
                    name: '--radio--border-top-left-radius',
                    value: '50%'
                },
                {
                    name: '--radio--border-top-right-radius',
                    value: '50%'
                },
                {
                    name: '--radio--border-bottom-right-radius',
                    value: '50%'
                },
                {
                    name: '--radio--border-bottom-left-radius',
                    value: '50%'
                },
                {
                    name: '--radio--border-radius',
                    value: 'var(--radio--border-top-left-radius) var(--radio--border-top-right-radius) var(--radio--border-bottom-right-radius) var(--radio--border-bottom-left-radius)'
                },
                {
                    name: '--radio--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--radio--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--radio--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--radio--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--radio--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--radio--box-shadow',
                    value: 'var(--radio--box-shadow-offset-x) var(--radio--box-shadow-offset-y) var(--radio--box-shadow-blur-radius) var(--radio--box-shadow-spread-radius) var(--radio--box-shadow-color)'
                },
                {
                    name: '--radio--transition-property',
                    value: 'background-color, color, border-color, transform'
                },
                {
                    name: '--radio--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--radio--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--radio--transition',
                    value: 'var(--radio--transition-property) var(--radio--transition-duration) var(--radio--transition-timing-function)'
                },
                {
                    name: '--radio--circle--color',
                    value: 'var(--color-white)'
                },
                {
                    name: '--radio--circle--width',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--radio--circle--height',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--radio--checked--background',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--radio--checked--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--border-top-color',
                    value: 'var(--color-primary--shade-50)'
                },
                {
                    name: '--radio--checked--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--border-right-color',
                    value: 'var(--color-primary--shade-50)'
                },
                {
                    name: '--radio--checked--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--border-bottom-color',
                    value: 'var(--color-primary--shade-50)'
                },
                {
                    name: '--radio--checked--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--border-left-color',
                    value: 'var(--color-primary--shade-50)'
                },
                {
                    name: '--radio--checked--border-width',
                    value: 'var(--radio--checked--border-top-width) var(--radio--checked--border-right-width) var(--radio--checked--border-bottom-width) var(--radio--checked--border-left-width)'
                },
                {
                    name: '--radio--checked--border-style',
                    value: 'var(--radio--checked--border-top-style) var(--radio--checked--border-right-style) var(--radio--checked--border-bottom-style) var(--radio--checked--border-left-style)'
                },
                {
                    name: '--radio--checked--border-color',
                    value: 'var(--radio--checked--border-top-color) var(--radio--checked--border-right-color) var(--radio--checked--border-bottom-color) var(--radio--checked--border-left-color)'
                },
                {
                    name: '--radio--checked--border-top',
                    value: 'var(--radio--checked--border-top-width) var(--radio--checked--border-top-style) var(--radio--checked--border-top-color)'
                },
                {
                    name: '--radio--checked--border-right',
                    value: 'var(--radio--checked--border-right-width) var(--radio--checked--border-right-style) var(--radio--checked--border-right-color)'
                },
                {
                    name: '--radio--checked--border-bottom',
                    value: 'var(--radio--checked--border-bottom-width) var(--radio--checked--border-bottom-style) var(--radio--checked--border-bottom-color)'
                },
                {
                    name: '--radio--checked--border-left',
                    value: 'var(--radio--checked--border-left-width) var(--radio--checked--border-left-style) var(--radio--checked--border-left-color)'
                },
                {
                    name: '--radio--checked--border',
                    value: 'var(--radio--checked--border-top-width) var(--radio--checked--border-top-style) var(--radio--checked--border-top-color)'
                },
                {
                    name: '--radio--checked--disabled--background',
                    value: 'var(--color-primary--300)'
                },
                {
                    name: '--radio--checked--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--disabled--border-top-color',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--disabled--border-right-color',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-color',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--disabled--border-left-color',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--disabled--border-width',
                    value: 'var(--radio--checked--disabled--border-top-width) var(--radio--checked--disabled--border-right-width) var(--radio--checked--disabled--border-bottom-width) var(--radio--checked--disabled--border-left-width)'
                },
                {
                    name: '--radio--checked--disabled--border-style',
                    value: 'var(--radio--checked--disabled--border-top-style) var(--radio--checked--disabled--border-right-style) var(--radio--checked--disabled--border-bottom-style) var(--radio--checked--disabled--border-left-style)'
                },
                {
                    name: '--radio--checked--disabled--border-color',
                    value: 'var(--radio--checked--disabled--border-top-color) var(--radio--checked--disabled--border-right-color) var(--radio--checked--disabled--border-bottom-color) var(--radio--checked--disabled--border-left-color)'
                },
                {
                    name: '--radio--checked--disabled--border-top',
                    value: 'var(--radio--checked--disabled--border-top-width) var(--radio--checked--disabled--border-top-style) var(--radio--checked--disabled--border-top-color)'
                },
                {
                    name: '--radio--checked--disabled--border-right',
                    value: 'var(--radio--checked--disabled--border-right-width) var(--radio--checked--disabled--border-right-style) var(--radio--checked--disabled--border-right-color)'
                },
                {
                    name: '--radio--checked--disabled--border-bottom',
                    value: 'var(--radio--checked--disabled--border-bottom-width) var(--radio--checked--disabled--border-bottom-style) var(--radio--checked--disabled--border-bottom-color)'
                },
                {
                    name: '--radio--checked--disabled--border-left',
                    value: 'var(--radio--checked--disabled--border-left-width) var(--radio--checked--disabled--border-left-style) var(--radio--checked--disabled--border-left-color)'
                },
                {
                    name: '--radio--checked--disabled--border',
                    value: 'var(--radio--checked--disabled--border-top-width) var(--radio--checked--disabled--border-top-style) var(--radio--checked--disabled--border-top-color)'
                },
                {
                    name: '--radio--checked--readonly--background',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--readonly--border-top-color',
                    value: 'var(--color-primary--500)'
                },
                {
                    name: '--radio--checked--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--readonly--border-right-color',
                    value: 'var(--color-primary--500)'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-color',
                    value: 'var(--color-primary--500)'
                },
                {
                    name: '--radio--checked--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--readonly--border-left-color',
                    value: 'var(--color-primary--500)'
                },
                {
                    name: '--radio--checked--readonly--border-width',
                    value: 'var(--radio--checked--readonly--border-top-width) var(--radio--checked--readonly--border-right-width) var(--radio--checked--readonly--border-bottom-width) var(--radio--checked--readonly--border-left-width)'
                },
                {
                    name: '--radio--checked--readonly--border-style',
                    value: 'var(--radio--checked--readonly--border-top-style) var(--radio--checked--readonly--border-right-style) var(--radio--checked--readonly--border-bottom-style) var(--radio--checked--readonly--border-left-style)'
                },
                {
                    name: '--radio--checked--readonly--border-color',
                    value: 'var(--radio--checked--readonly--border-top-color) var(--radio--checked--readonly--border-right-color) var(--radio--checked--readonly--border-bottom-color) var(--radio--checked--readonly--border-left-color)'
                },
                {
                    name: '--radio--checked--readonly--border-top',
                    value: 'var(--radio--checked--readonly--border-top-width) var(--radio--checked--readonly--border-top-style) var(--radio--checked--readonly--border-top-color)'
                },
                {
                    name: '--radio--checked--readonly--border-right',
                    value: 'var(--radio--checked--readonly--border-right-width) var(--radio--checked--readonly--border-right-style) var(--radio--checked--readonly--border-right-color)'
                },
                {
                    name: '--radio--checked--readonly--border-bottom',
                    value: 'var(--radio--checked--readonly--border-bottom-width) var(--radio--checked--readonly--border-bottom-style) var(--radio--checked--readonly--border-bottom-color)'
                },
                {
                    name: '--radio--checked--readonly--border-left',
                    value: 'var(--radio--checked--readonly--border-left-width) var(--radio--checked--readonly--border-left-style) var(--radio--checked--readonly--border-left-color)'
                },
                {
                    name: '--radio--checked--readonly--border',
                    value: 'var(--radio--checked--readonly--border-top-width) var(--radio--checked--readonly--border-top-style) var(--radio--checked--readonly--border-top-color)'
                },
                {
                    name: '--radio--disabled--color',
                    value: 'var(--text-color--weak)'
                },
                {
                    name: '--radio--disabled--background',
                    value: 'var(--color-gray--100)'
                },
                {
                    name: '--radio--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--disabled--border-top-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--disabled--border-right-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--disabled--border-bottom-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--disabled--border-left-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--disabled--border-width',
                    value: 'var(--radio--disabled--border-top-width) var(--radio--disabled--border-right-width) var(--radio--disabled--border-bottom-width) var(--radio--disabled--border-left-width)'
                },
                {
                    name: '--radio--disabled--border-style',
                    value: 'var(--radio--disabled--border-top-style) var(--radio--disabled--border-right-style) var(--radio--disabled--border-bottom-style) var(--radio--disabled--border-left-style)'
                },
                {
                    name: '--radio--disabled--border-color',
                    value: 'var(--radio--disabled--border-top-color) var(--radio--disabled--border-right-color) var(--radio--disabled--border-bottom-color) var(--radio--disabled--border-left-color)'
                },
                {
                    name: '--radio--disabled--border-top',
                    value: 'var(--radio--disabled--border-top-width) var(--radio--disabled--border-top-style) var(--radio--disabled--border-top-color)'
                },
                {
                    name: '--radio--disabled--border-right',
                    value: 'var(--radio--disabled--border-right-width) var(--radio--disabled--border-right-style) var(--radio--disabled--border-right-color)'
                },
                {
                    name: '--radio--disabled--border-bottom',
                    value: 'var(--radio--disabled--border-bottom-width) var(--radio--disabled--border-bottom-style) var(--radio--disabled--border-bottom-color)'
                },
                {
                    name: '--radio--disabled--border-left',
                    value: 'var(--radio--disabled--border-left-width) var(--radio--disabled--border-left-style) var(--radio--disabled--border-left-color)'
                },
                {
                    name: '--radio--disabled--border',
                    value: 'var(--radio--disabled--border-top-width) var(--radio--disabled--border-top-style) var(--radio--disabled--border-top-color)'
                },
                {
                    name: '--radio--focus--box-shadow-offset-x',
                    value: '0'
                },
                {
                    name: '--radio--focus--box-shadow-offset-y',
                    value: '0'
                },
                {
                    name: '--radio--focus--box-shadow-blur-radius',
                    value: '0'
                },
                {
                    name: '--radio--focus--box-shadow-spread-radius',
                    value: '3px'
                },
                {
                    name: '--radio--focus--box-shadow-color',
                    value: 'hsla(from var(--color-primary) h s l / 0.25)'
                },
                {
                    name: '--radio--focus--box-shadow',
                    value: 'var(--radio--focus--box-shadow-offset-x) var(--radio--focus--box-shadow-offset-y) var(--radio--focus--box-shadow-blur-radius) var(--radio--focus--box-shadow-spread-radius) var(--radio--focus--box-shadow-color)'
                },
                {
                    name: '--radio--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--radio--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--radio--readonly--background',
                    value: 'var(--color-gray--100)'
                },
                {
                    name: '--radio--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--readonly--border-top-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--readonly--border-right-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--readonly--border-bottom-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--readonly--border-left-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--readonly--border-width',
                    value: 'var(--radio--readonly--border-top-width) var(--radio--readonly--border-right-width) var(--radio--readonly--border-bottom-width) var(--radio--readonly--border-left-width)'
                },
                {
                    name: '--radio--readonly--border-style',
                    value: 'var(--radio--readonly--border-top-style) var(--radio--readonly--border-right-style) var(--radio--readonly--border-bottom-style) var(--radio--readonly--border-left-style)'
                },
                {
                    name: '--radio--readonly--border-color',
                    value: 'var(--radio--readonly--border-top-color) var(--radio--readonly--border-right-color) var(--radio--readonly--border-bottom-color) var(--radio--readonly--border-left-color)'
                },
                {
                    name: '--radio--readonly--border-top',
                    value: 'var(--radio--readonly--border-top-width) var(--radio--readonly--border-top-style) var(--radio--readonly--border-top-color)'
                },
                {
                    name: '--radio--readonly--border-right',
                    value: 'var(--radio--readonly--border-right-width) var(--radio--readonly--border-right-style) var(--radio--readonly--border-right-color)'
                },
                {
                    name: '--radio--readonly--border-bottom',
                    value: 'var(--radio--readonly--border-bottom-width) var(--radio--readonly--border-bottom-style) var(--radio--readonly--border-bottom-color)'
                },
                {
                    name: '--radio--readonly--border-left',
                    value: 'var(--radio--readonly--border-left-width) var(--radio--readonly--border-left-style) var(--radio--readonly--border-left-color)'
                },
                {
                    name: '--radio--readonly--border',
                    value: 'var(--radio--readonly--border-top-width) var(--radio--readonly--border-top-style) var(--radio--readonly--border-top-color)'
                },
                {
                    name: '--radio--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--radio--margin-top',
                    value: '0'
                },
                {
                    name: '--radio--margin-right',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--radio--margin-bottom',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--radio--margin-left',
                    value: '0'
                },
                {
                    name: '--radio--margin',
                    value: 'var(--radio--margin-top) var(--radio--margin-right) var(--radio--margin-bottom) var(--radio--margin-left)'
                },
                {
                    name: '--radio--width',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--radio--height',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--radio--{color}--border-top-color'
                },
                {
                    name: '--radio--{color}--border-right-color'
                },
                {
                    name: '--radio--{color}--border-bottom-color'
                },
                {
                    name: '--radio--{color}--border-left-color'
                },
                {
                    name: '--radio--{color}--background'
                },
                {
                    name: '--radio--{color}--color'
                },
                {
                    name: '--radio--{color}--disabled--background'
                },
                {
                    name: '--radio--{color}--disabled--border-top-color'
                },
                {
                    name: '--radio--{color}--disabled--border-right-color'
                },
                {
                    name: '--radio--{color}--disabled--border-bottom-color'
                },
                {
                    name: '--radio--{color}--disabled--border-left-color'
                },
                {
                    name: '--radio--{color}--readonly--background'
                },
                {
                    name: '--radio--{color}--readonly--border-top-color'
                },
                {
                    name: '--radio--{color}--readonly--border-right-color'
                },
                {
                    name: '--radio--{color}--readonly--border-bottom-color'
                },
                {
                    name: '--radio--{color}--readonly--border-left-color'
                },
                {
                    name: '--radio--{color}--checked--disabled--background'
                },
                {
                    name: '--radio--{color}--checked--disabled--border-top-color'
                },
                {
                    name: '--radio--{color}--checked--disabled--border-right-color'
                },
                {
                    name: '--radio--{color}--checked--disabled--border-bottom-color'
                },
                {
                    name: '--radio--{color}--checked--disabled--border-left-color'
                },
                {
                    name: '--radio--{color}--checked--readonly--background'
                },
                {
                    name: '--radio--{color}--checked--readonly--border-top-color'
                },
                {
                    name: '--radio--{color}--checked--readonly--border-right-color'
                },
                {
                    name: '--radio--{color}--checked--readonly--border-bottom-color'
                },
                {
                    name: '--radio--{color}--checked--readonly--border-left-color'
                },
                {
                    name: '--radio--{size}--font-size'
                },
                {
                    name: '--radio--{size}--margin-top'
                },
                {
                    name: '--radio--{size}--margin-right'
                },
                {
                    name: '--radio--{size}--margin-bottom'
                },
                {
                    name: '--radio--{size}--margin-left'
                },
                {
                    name: '--radio--{size}--width'
                },
                {
                    name: '--radio--{size}--height'
                },
                {
                    name: '--radio--{size}--circle--width'
                },
                {
                    name: '--radio--{size}--circle--height'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--radio--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--radio--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--radio--border-top-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--radio--border-right-width',
                    value: 'var(--border-right-width)'
                },
                {
                    name: '--radio--border-right-style',
                    value: 'var(--border-right-style)'
                },
                {
                    name: '--radio--border-right-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--radio--border-bottom-width',
                    value: 'var(--border-bottom-width)'
                },
                {
                    name: '--radio--border-bottom-style',
                    value: 'var(--border-bottom-style)'
                },
                {
                    name: '--radio--border-bottom-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--radio--border-left-width',
                    value: 'var(--border-left-width)'
                },
                {
                    name: '--radio--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--radio--border-left-color',
                    value: 'var(--color-light--shade-50)'
                },
                {
                    name: '--radio--border-width',
                    value: 'var(--radio--border-top-width) var(--radio--border-right-width) var(--radio--border-bottom-width) var(--radio--border-left-width)'
                },
                {
                    name: '--radio--border-style',
                    value: 'var(--radio--border-top-style) var(--radio--border-right-style) var(--radio--border-bottom-style) var(--radio--border-left-style)'
                },
                {
                    name: '--radio--border-color',
                    value: 'var(--radio--border-top-color) var(--radio--border-right-color) var(--radio--border-bottom-color) var(--radio--border-left-color)'
                },
                {
                    name: '--radio--border-top',
                    value: 'var(--radio--border-top-width) var(--radio--border-top-style) var(--radio--border-top-color)'
                },
                {
                    name: '--radio--border-right',
                    value: 'var(--radio--border-right-width) var(--radio--border-right-style) var(--radio--border-right-color)'
                },
                {
                    name: '--radio--border-bottom',
                    value: 'var(--radio--border-bottom-width) var(--radio--border-bottom-style) var(--radio--border-bottom-color)'
                },
                {
                    name: '--radio--border-left',
                    value: 'var(--radio--border-left-width) var(--radio--border-left-style) var(--radio--border-left-color)'
                },
                {
                    name: '--radio--border',
                    value: 'var(--radio--border-top-width) var(--radio--border-top-style) var(--radio--border-top-color)'
                },
                {
                    name: '--radio--border-top-left-radius',
                    value: '50%'
                },
                {
                    name: '--radio--border-top-right-radius',
                    value: '50%'
                },
                {
                    name: '--radio--border-bottom-right-radius',
                    value: '50%'
                },
                {
                    name: '--radio--border-bottom-left-radius',
                    value: '50%'
                },
                {
                    name: '--radio--border-radius',
                    value: 'var(--radio--border-top-left-radius) var(--radio--border-top-right-radius) var(--radio--border-bottom-right-radius) var(--radio--border-bottom-left-radius)'
                },
                {
                    name: '--radio--box-shadow-offset-x',
                    value: 'var(--box-shadow-offset-x)'
                },
                {
                    name: '--radio--box-shadow-offset-y',
                    value: 'var(--box-shadow-offset-y)'
                },
                {
                    name: '--radio--box-shadow-blur-radius',
                    value: 'var(--box-shadow-blur-radius)'
                },
                {
                    name: '--radio--box-shadow-spread-radius',
                    value: 'var(--box-shadow-spread-radius)'
                },
                {
                    name: '--radio--box-shadow-color',
                    value: 'var(--box-shadow-color)'
                },
                {
                    name: '--radio--box-shadow',
                    value: 'var(--radio--box-shadow-offset-x) var(--radio--box-shadow-offset-y) var(--radio--box-shadow-blur-radius) var(--radio--box-shadow-spread-radius) var(--radio--box-shadow-color)'
                },
                {
                    name: '--radio--transition-property',
                    value: 'background-color, color, border-color, transform'
                },
                {
                    name: '--radio--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--radio--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--radio--transition',
                    value: 'var(--radio--transition-property) var(--radio--transition-duration) var(--radio--transition-timing-function)'
                },
                {
                    name: '--radio--circle--color',
                    value: 'var(--color-white)'
                },
                {
                    name: '--radio--circle--width',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--radio--circle--height',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--radio--checked--background',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--radio--checked--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--border-top-color',
                    value: 'var(--color-primary--shade-50)'
                },
                {
                    name: '--radio--checked--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--border-right-color',
                    value: 'var(--color-primary--shade-50)'
                },
                {
                    name: '--radio--checked--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--border-bottom-color',
                    value: 'var(--color-primary--shade-50)'
                },
                {
                    name: '--radio--checked--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--border-left-color',
                    value: 'var(--color-primary--shade-50)'
                },
                {
                    name: '--radio--checked--border-width',
                    value: 'var(--radio--checked--border-top-width) var(--radio--checked--border-right-width) var(--radio--checked--border-bottom-width) var(--radio--checked--border-left-width)'
                },
                {
                    name: '--radio--checked--border-style',
                    value: 'var(--radio--checked--border-top-style) var(--radio--checked--border-right-style) var(--radio--checked--border-bottom-style) var(--radio--checked--border-left-style)'
                },
                {
                    name: '--radio--checked--border-color',
                    value: 'var(--radio--checked--border-top-color) var(--radio--checked--border-right-color) var(--radio--checked--border-bottom-color) var(--radio--checked--border-left-color)'
                },
                {
                    name: '--radio--checked--border-top',
                    value: 'var(--radio--checked--border-top-width) var(--radio--checked--border-top-style) var(--radio--checked--border-top-color)'
                },
                {
                    name: '--radio--checked--border-right',
                    value: 'var(--radio--checked--border-right-width) var(--radio--checked--border-right-style) var(--radio--checked--border-right-color)'
                },
                {
                    name: '--radio--checked--border-bottom',
                    value: 'var(--radio--checked--border-bottom-width) var(--radio--checked--border-bottom-style) var(--radio--checked--border-bottom-color)'
                },
                {
                    name: '--radio--checked--border-left',
                    value: 'var(--radio--checked--border-left-width) var(--radio--checked--border-left-style) var(--radio--checked--border-left-color)'
                },
                {
                    name: '--radio--checked--border',
                    value: 'var(--radio--checked--border-top-width) var(--radio--checked--border-top-style) var(--radio--checked--border-top-color)'
                },
                {
                    name: '--radio--checked--disabled--background',
                    value: 'var(--color-primary--300)'
                },
                {
                    name: '--radio--checked--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--disabled--border-top-color',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--disabled--border-right-color',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-color',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--disabled--border-left-color',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--disabled--border-width',
                    value: 'var(--radio--checked--disabled--border-top-width) var(--radio--checked--disabled--border-right-width) var(--radio--checked--disabled--border-bottom-width) var(--radio--checked--disabled--border-left-width)'
                },
                {
                    name: '--radio--checked--disabled--border-style',
                    value: 'var(--radio--checked--disabled--border-top-style) var(--radio--checked--disabled--border-right-style) var(--radio--checked--disabled--border-bottom-style) var(--radio--checked--disabled--border-left-style)'
                },
                {
                    name: '--radio--checked--disabled--border-color',
                    value: 'var(--radio--checked--disabled--border-top-color) var(--radio--checked--disabled--border-right-color) var(--radio--checked--disabled--border-bottom-color) var(--radio--checked--disabled--border-left-color)'
                },
                {
                    name: '--radio--checked--disabled--border-top',
                    value: 'var(--radio--checked--disabled--border-top-width) var(--radio--checked--disabled--border-top-style) var(--radio--checked--disabled--border-top-color)'
                },
                {
                    name: '--radio--checked--disabled--border-right',
                    value: 'var(--radio--checked--disabled--border-right-width) var(--radio--checked--disabled--border-right-style) var(--radio--checked--disabled--border-right-color)'
                },
                {
                    name: '--radio--checked--disabled--border-bottom',
                    value: 'var(--radio--checked--disabled--border-bottom-width) var(--radio--checked--disabled--border-bottom-style) var(--radio--checked--disabled--border-bottom-color)'
                },
                {
                    name: '--radio--checked--disabled--border-left',
                    value: 'var(--radio--checked--disabled--border-left-width) var(--radio--checked--disabled--border-left-style) var(--radio--checked--disabled--border-left-color)'
                },
                {
                    name: '--radio--checked--disabled--border',
                    value: 'var(--radio--checked--disabled--border-top-width) var(--radio--checked--disabled--border-top-style) var(--radio--checked--disabled--border-top-color)'
                },
                {
                    name: '--radio--checked--readonly--background',
                    value: 'var(--color-primary--400)'
                },
                {
                    name: '--radio--checked--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--readonly--border-top-color',
                    value: 'var(--color-primary--500)'
                },
                {
                    name: '--radio--checked--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--readonly--border-right-color',
                    value: 'var(--color-primary--500)'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-color',
                    value: 'var(--color-primary--500)'
                },
                {
                    name: '--radio--checked--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--checked--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--checked--readonly--border-left-color',
                    value: 'var(--color-primary--500)'
                },
                {
                    name: '--radio--checked--readonly--border-width',
                    value: 'var(--radio--checked--readonly--border-top-width) var(--radio--checked--readonly--border-right-width) var(--radio--checked--readonly--border-bottom-width) var(--radio--checked--readonly--border-left-width)'
                },
                {
                    name: '--radio--checked--readonly--border-style',
                    value: 'var(--radio--checked--readonly--border-top-style) var(--radio--checked--readonly--border-right-style) var(--radio--checked--readonly--border-bottom-style) var(--radio--checked--readonly--border-left-style)'
                },
                {
                    name: '--radio--checked--readonly--border-color',
                    value: 'var(--radio--checked--readonly--border-top-color) var(--radio--checked--readonly--border-right-color) var(--radio--checked--readonly--border-bottom-color) var(--radio--checked--readonly--border-left-color)'
                },
                {
                    name: '--radio--checked--readonly--border-top',
                    value: 'var(--radio--checked--readonly--border-top-width) var(--radio--checked--readonly--border-top-style) var(--radio--checked--readonly--border-top-color)'
                },
                {
                    name: '--radio--checked--readonly--border-right',
                    value: 'var(--radio--checked--readonly--border-right-width) var(--radio--checked--readonly--border-right-style) var(--radio--checked--readonly--border-right-color)'
                },
                {
                    name: '--radio--checked--readonly--border-bottom',
                    value: 'var(--radio--checked--readonly--border-bottom-width) var(--radio--checked--readonly--border-bottom-style) var(--radio--checked--readonly--border-bottom-color)'
                },
                {
                    name: '--radio--checked--readonly--border-left',
                    value: 'var(--radio--checked--readonly--border-left-width) var(--radio--checked--readonly--border-left-style) var(--radio--checked--readonly--border-left-color)'
                },
                {
                    name: '--radio--checked--readonly--border',
                    value: 'var(--radio--checked--readonly--border-top-width) var(--radio--checked--readonly--border-top-style) var(--radio--checked--readonly--border-top-color)'
                },
                {
                    name: '--radio--disabled--color',
                    value: 'var(--text-color--weak)'
                },
                {
                    name: '--radio--disabled--background',
                    value: 'var(--color-gray--100)'
                },
                {
                    name: '--radio--disabled--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--disabled--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--disabled--border-top-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--disabled--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--disabled--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--disabled--border-right-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--disabled--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--disabled--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--disabled--border-bottom-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--disabled--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--disabled--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--disabled--border-left-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--disabled--border-width',
                    value: 'var(--radio--disabled--border-top-width) var(--radio--disabled--border-right-width) var(--radio--disabled--border-bottom-width) var(--radio--disabled--border-left-width)'
                },
                {
                    name: '--radio--disabled--border-style',
                    value: 'var(--radio--disabled--border-top-style) var(--radio--disabled--border-right-style) var(--radio--disabled--border-bottom-style) var(--radio--disabled--border-left-style)'
                },
                {
                    name: '--radio--disabled--border-color',
                    value: 'var(--radio--disabled--border-top-color) var(--radio--disabled--border-right-color) var(--radio--disabled--border-bottom-color) var(--radio--disabled--border-left-color)'
                },
                {
                    name: '--radio--disabled--border-top',
                    value: 'var(--radio--disabled--border-top-width) var(--radio--disabled--border-top-style) var(--radio--disabled--border-top-color)'
                },
                {
                    name: '--radio--disabled--border-right',
                    value: 'var(--radio--disabled--border-right-width) var(--radio--disabled--border-right-style) var(--radio--disabled--border-right-color)'
                },
                {
                    name: '--radio--disabled--border-bottom',
                    value: 'var(--radio--disabled--border-bottom-width) var(--radio--disabled--border-bottom-style) var(--radio--disabled--border-bottom-color)'
                },
                {
                    name: '--radio--disabled--border-left',
                    value: 'var(--radio--disabled--border-left-width) var(--radio--disabled--border-left-style) var(--radio--disabled--border-left-color)'
                },
                {
                    name: '--radio--disabled--border',
                    value: 'var(--radio--disabled--border-top-width) var(--radio--disabled--border-top-style) var(--radio--disabled--border-top-color)'
                },
                {
                    name: '--radio--focus--box-shadow-offset-x',
                    value: '0'
                },
                {
                    name: '--radio--focus--box-shadow-offset-y',
                    value: '0'
                },
                {
                    name: '--radio--focus--box-shadow-blur-radius',
                    value: '0'
                },
                {
                    name: '--radio--focus--box-shadow-spread-radius',
                    value: '3px'
                },
                {
                    name: '--radio--focus--box-shadow-color',
                    value: 'hsla(from var(--color-primary) h s l / 0.25)'
                },
                {
                    name: '--radio--focus--box-shadow',
                    value: 'var(--radio--focus--box-shadow-offset-x) var(--radio--focus--box-shadow-offset-y) var(--radio--focus--box-shadow-blur-radius) var(--radio--focus--box-shadow-spread-radius) var(--radio--focus--box-shadow-color)'
                },
                {
                    name: '--radio--background',
                    value: 'var(--color-white)'
                },
                {
                    name: '--radio--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--radio--readonly--background',
                    value: 'var(--color-gray--100)'
                },
                {
                    name: '--radio--readonly--border-top-width',
                    value: '0'
                },
                {
                    name: '--radio--readonly--border-top-style',
                    value: 'none'
                },
                {
                    name: '--radio--readonly--border-top-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--readonly--border-right-width',
                    value: '0'
                },
                {
                    name: '--radio--readonly--border-right-style',
                    value: 'none'
                },
                {
                    name: '--radio--readonly--border-right-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--readonly--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--radio--readonly--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--radio--readonly--border-bottom-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--readonly--border-left-width',
                    value: '0'
                },
                {
                    name: '--radio--readonly--border-left-style',
                    value: 'none'
                },
                {
                    name: '--radio--readonly--border-left-color',
                    value: 'var(--color-gray--200)'
                },
                {
                    name: '--radio--readonly--border-width',
                    value: 'var(--radio--readonly--border-top-width) var(--radio--readonly--border-right-width) var(--radio--readonly--border-bottom-width) var(--radio--readonly--border-left-width)'
                },
                {
                    name: '--radio--readonly--border-style',
                    value: 'var(--radio--readonly--border-top-style) var(--radio--readonly--border-right-style) var(--radio--readonly--border-bottom-style) var(--radio--readonly--border-left-style)'
                },
                {
                    name: '--radio--readonly--border-color',
                    value: 'var(--radio--readonly--border-top-color) var(--radio--readonly--border-right-color) var(--radio--readonly--border-bottom-color) var(--radio--readonly--border-left-color)'
                },
                {
                    name: '--radio--readonly--border-top',
                    value: 'var(--radio--readonly--border-top-width) var(--radio--readonly--border-top-style) var(--radio--readonly--border-top-color)'
                },
                {
                    name: '--radio--readonly--border-right',
                    value: 'var(--radio--readonly--border-right-width) var(--radio--readonly--border-right-style) var(--radio--readonly--border-right-color)'
                },
                {
                    name: '--radio--readonly--border-bottom',
                    value: 'var(--radio--readonly--border-bottom-width) var(--radio--readonly--border-bottom-style) var(--radio--readonly--border-bottom-color)'
                },
                {
                    name: '--radio--readonly--border-left',
                    value: 'var(--radio--readonly--border-left-width) var(--radio--readonly--border-left-style) var(--radio--readonly--border-left-color)'
                },
                {
                    name: '--radio--readonly--border',
                    value: 'var(--radio--readonly--border-top-width) var(--radio--readonly--border-top-style) var(--radio--readonly--border-top-color)'
                },
                {
                    name: '--radio--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--radio--margin-top',
                    value: '0'
                },
                {
                    name: '--radio--margin-right',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--radio--margin-bottom',
                    value: 'calc(var(--spacing--md) * 0.5)'
                },
                {
                    name: '--radio--margin-left',
                    value: '0'
                },
                {
                    name: '--radio--margin',
                    value: 'var(--radio--margin-top) var(--radio--margin-right) var(--radio--margin-bottom) var(--radio--margin-left)'
                },
                {
                    name: '--radio--width',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--radio--height',
                    value: 'var(--spacing--md)'
                }
            ]
        }
    }
];

export default manifest;
