import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Checkbox',
        props: [
            {
                name: 'color',
                type: 'light',
                description: 'The color variant of the checkbox',
                default: ''
            },
            {
                name: 'disabled',
                type: 'Boolean',
                description: 'The disabled state of the checkbox',
                default: 'false'
            },
            {
                name: 'error',
                type: 'Boolean',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            },
            {
                name: 'indeterminate',
                type: 'Boolean',
                description: 'The indeterminate state of the checkbox',
                default: 'false'
            },
            {
                name: 'name',
                type: 'String',
                description: 'The unique identifier of the checkbox',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'Boolean',
                description: 'Displays the native browser checkbox input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'Boolean',
                description: 'The readonly state of the checkbox',
                default: 'false'
            },
            {
                name: 'sizeMultiplier',
                type: 'sm',
                description: 'The size variant of the checkbox',
                default: ''
            },
            {
                name: 'tabindex',
                type: 'Number',
                description: 'The tabindex of the checkbox',
                default: '0'
            },
            {
                name: 'validateSchema',
                type: 'Boolean',
                description: 'Enable input validation using schema',
                default: 'true'
            },
            {
                name: 'label',
                type: 'String',
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
                name: 'update:modelValue',
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
                    name: '--checkbox--border-top-width'
                },
                {
                    name: '--checkbox--border-top-style'
                },
                {
                    name: '--checkbox--border-top-color'
                },
                {
                    name: '--checkbox--border-right-width'
                },
                {
                    name: '--checkbox--border-right-style'
                },
                {
                    name: '--checkbox--border-right-color'
                },
                {
                    name: '--checkbox--border-bottom-width'
                },
                {
                    name: '--checkbox--border-bottom-style'
                },
                {
                    name: '--checkbox--border-bottom-color'
                },
                {
                    name: '--checkbox--border-left-width'
                },
                {
                    name: '--checkbox--border-left-style'
                },
                {
                    name: '--checkbox--border-left-color'
                },
                {
                    name: '--checkbox--border-width'
                },
                {
                    name: '--checkbox--border-style'
                },
                {
                    name: '--checkbox--border-color'
                },
                {
                    name: '--checkbox--border-top'
                },
                {
                    name: '--checkbox--border-right'
                },
                {
                    name: '--checkbox--border-bottom'
                },
                {
                    name: '--checkbox--border-left'
                },
                {
                    name: '--checkbox--border'
                },
                {
                    name: '--checkbox--box-shadow-offset-x'
                },
                {
                    name: '--checkbox--box-shadow-offset-y'
                },
                {
                    name: '--checkbox--box-shadow-blur-radius'
                },
                {
                    name: '--checkbox--box-shadow-spread-radius'
                },
                {
                    name: '--checkbox--box-shadow-color'
                },
                {
                    name: '--checkbox--box-shadow'
                },
                {
                    name: '--checkbox--transition-property'
                },
                {
                    name: '--checkbox--transition-duration'
                },
                {
                    name: '--checkbox--transition-timing-function'
                },
                {
                    name: '--checkbox--transition'
                },
                {
                    name: '--checkbox--checkmark--color'
                },
                {
                    name: '--checkbox--checkmark--width'
                },
                {
                    name: '--checkbox--checkmark--height'
                },
                {
                    name: '--checkbox--disabled--color'
                },
                {
                    name: '--checkbox--disabled--background'
                },
                {
                    name: '--checkbox--disabled--border-top-width'
                },
                {
                    name: '--checkbox--disabled--border-top-style'
                },
                {
                    name: '--checkbox--disabled--border-top-color'
                },
                {
                    name: '--checkbox--disabled--border-right-width'
                },
                {
                    name: '--checkbox--disabled--border-right-style'
                },
                {
                    name: '--checkbox--disabled--border-right-color'
                },
                {
                    name: '--checkbox--disabled--border-bottom-width'
                },
                {
                    name: '--checkbox--disabled--border-bottom-style'
                },
                {
                    name: '--checkbox--disabled--border-bottom-color'
                },
                {
                    name: '--checkbox--disabled--border-left-width'
                },
                {
                    name: '--checkbox--disabled--border-left-style'
                },
                {
                    name: '--checkbox--disabled--border-left-color'
                },
                {
                    name: '--checkbox--disabled--border-width'
                },
                {
                    name: '--checkbox--disabled--border-style'
                },
                {
                    name: '--checkbox--disabled--border-color'
                },
                {
                    name: '--checkbox--disabled--border-top'
                },
                {
                    name: '--checkbox--disabled--border-right'
                },
                {
                    name: '--checkbox--disabled--border-bottom'
                },
                {
                    name: '--checkbox--disabled--border-left'
                },
                {
                    name: '--checkbox--disabled--border'
                },
                {
                    name: '--checkbox--readonly--color'
                },
                {
                    name: '--checkbox--readonly--background'
                },
                {
                    name: '--checkbox--readonly--border-top-width'
                },
                {
                    name: '--checkbox--readonly--border-top-style'
                },
                {
                    name: '--checkbox--readonly--border-top-color'
                },
                {
                    name: '--checkbox--readonly--border-right-width'
                },
                {
                    name: '--checkbox--readonly--border-right-style'
                },
                {
                    name: '--checkbox--readonly--border-right-color'
                },
                {
                    name: '--checkbox--readonly--border-bottom-width'
                },
                {
                    name: '--checkbox--readonly--border-bottom-style'
                },
                {
                    name: '--checkbox--readonly--border-bottom-color'
                },
                {
                    name: '--checkbox--readonly--border-left-width'
                },
                {
                    name: '--checkbox--readonly--border-left-style'
                },
                {
                    name: '--checkbox--readonly--border-left-color'
                },
                {
                    name: '--checkbox--readonly--border-width'
                },
                {
                    name: '--checkbox--readonly--border-style'
                },
                {
                    name: '--checkbox--readonly--border-color'
                },
                {
                    name: '--checkbox--readonly--border-top'
                },
                {
                    name: '--checkbox--readonly--border-right'
                },
                {
                    name: '--checkbox--readonly--border-bottom'
                },
                {
                    name: '--checkbox--readonly--border-left'
                },
                {
                    name: '--checkbox--readonly--border'
                },
                {
                    name: '--checkbox--checked--background'
                },
                {
                    name: '--checkbox--checked--border-top-width'
                },
                {
                    name: '--checkbox--checked--border-top-style'
                },
                {
                    name: '--checkbox--checked--border-top-color'
                },
                {
                    name: '--checkbox--checked--border-right-width'
                },
                {
                    name: '--checkbox--checked--border-right-style'
                },
                {
                    name: '--checkbox--checked--border-right-color'
                },
                {
                    name: '--checkbox--checked--border-bottom-width'
                },
                {
                    name: '--checkbox--checked--border-bottom-style'
                },
                {
                    name: '--checkbox--checked--border-bottom-color'
                },
                {
                    name: '--checkbox--checked--border-left-width'
                },
                {
                    name: '--checkbox--checked--border-left-style'
                },
                {
                    name: '--checkbox--checked--border-left-color'
                },
                {
                    name: '--checkbox--checked--border-width'
                },
                {
                    name: '--checkbox--checked--border-style'
                },
                {
                    name: '--checkbox--checked--border-color'
                },
                {
                    name: '--checkbox--checked--border-top'
                },
                {
                    name: '--checkbox--checked--border-right'
                },
                {
                    name: '--checkbox--checked--border-bottom'
                },
                {
                    name: '--checkbox--checked--border-left'
                },
                {
                    name: '--checkbox--checked--border'
                },
                {
                    name: '--checkbox--checked--disabled--background'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-top'
                },
                {
                    name: '--checkbox--checked--disabled--border-right'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom'
                },
                {
                    name: '--checkbox--checked--disabled--border-left'
                },
                {
                    name: '--checkbox--checked--disabled--border'
                },
                {
                    name: '--checkbox--checked--readonly--background'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-top'
                },
                {
                    name: '--checkbox--checked--readonly--border-right'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom'
                },
                {
                    name: '--checkbox--checked--readonly--border-left'
                },
                {
                    name: '--checkbox--checked--readonly--border'
                },
                {
                    name: '--checkbox--focus--box-shadow-offset-x'
                },
                {
                    name: '--checkbox--focus--box-shadow-offset-y'
                },
                {
                    name: '--checkbox--focus--box-shadow-blur-radius'
                },
                {
                    name: '--checkbox--focus--box-shadow-spread-radius'
                },
                {
                    name: '--checkbox--focus--box-shadow-color'
                },
                {
                    name: '--checkbox--focus--box-shadow'
                },
                {
                    name: '--checkbox--background'
                },
                {
                    name: '--checkbox--color'
                },
                {
                    name: '--checkbox--border-top-left-radius'
                },
                {
                    name: '--checkbox--border-top-right-radius'
                },
                {
                    name: '--checkbox--border-bottom-right-radius'
                },
                {
                    name: '--checkbox--border-bottom-left-radius'
                },
                {
                    name: '--checkbox--border-radius'
                },
                {
                    name: '--checkbox--font-size'
                },
                {
                    name: '--checkbox--margin-top'
                },
                {
                    name: '--checkbox--margin-right'
                },
                {
                    name: '--checkbox--margin-bottom'
                },
                {
                    name: '--checkbox--margin-left'
                },
                {
                    name: '--checkbox--margin'
                },
                {
                    name: '--checkbox--width'
                },
                {
                    name: '--checkbox--height'
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
        name: 'CheckboxGroup',
        props: [
            {
                name: 'color',
                type: 'light',
                description: 'The color variant of the checkbox group',
                default: ''
            },
            {
                name: 'disabled',
                type: 'Boolean',
                description: 'The disabled state of the checkbox group',
                default: 'false'
            },
            {
                name: 'error',
                type: 'Boolean',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            },
            {
                name: 'inline',
                type: 'Boolean',
                description: 'Display the checkbox group as inline',
                default: 'false'
            },
            {
                name: 'indeterminate',
                type: 'Boolean',
                description: 'The indeterminate state of the checkbox group',
                default: 'false'
            },
            {
                name: 'name',
                type: 'String',
                description: 'The unique identifier of the checkbox group',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'Boolean',
                description: 'Displays the native browser checkbox input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'Boolean',
                description: 'The readonly state of the checkbox group',
                default: 'false'
            },
            {
                name: 'sizeMultiplier',
                type: 'sm',
                description: 'The size variant of the checkbox group',
                default: ''
            },
            {
                name: 'validateSchema',
                type: 'Boolean',
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
                type: 'String',
                description:
                    'The fallback label of the checkbox group. Can be a string, number, render function, or component',
                default: 'undefined'
            }
        ],
        events: [
            {
                name: 'update:modelValue',
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
        css: {
            namespace: '',
            variables: [
                {
                    name: '--checkbox--border-top-width'
                },
                {
                    name: '--checkbox--border-top-style'
                },
                {
                    name: '--checkbox--border-top-color'
                },
                {
                    name: '--checkbox--border-right-width'
                },
                {
                    name: '--checkbox--border-right-style'
                },
                {
                    name: '--checkbox--border-right-color'
                },
                {
                    name: '--checkbox--border-bottom-width'
                },
                {
                    name: '--checkbox--border-bottom-style'
                },
                {
                    name: '--checkbox--border-bottom-color'
                },
                {
                    name: '--checkbox--border-left-width'
                },
                {
                    name: '--checkbox--border-left-style'
                },
                {
                    name: '--checkbox--border-left-color'
                },
                {
                    name: '--checkbox--border-width'
                },
                {
                    name: '--checkbox--border-style'
                },
                {
                    name: '--checkbox--border-color'
                },
                {
                    name: '--checkbox--border-top'
                },
                {
                    name: '--checkbox--border-right'
                },
                {
                    name: '--checkbox--border-bottom'
                },
                {
                    name: '--checkbox--border-left'
                },
                {
                    name: '--checkbox--border'
                },
                {
                    name: '--checkbox--box-shadow-offset-x'
                },
                {
                    name: '--checkbox--box-shadow-offset-y'
                },
                {
                    name: '--checkbox--box-shadow-blur-radius'
                },
                {
                    name: '--checkbox--box-shadow-spread-radius'
                },
                {
                    name: '--checkbox--box-shadow-color'
                },
                {
                    name: '--checkbox--box-shadow'
                },
                {
                    name: '--checkbox--transition-property'
                },
                {
                    name: '--checkbox--transition-duration'
                },
                {
                    name: '--checkbox--transition-timing-function'
                },
                {
                    name: '--checkbox--transition'
                },
                {
                    name: '--checkbox--checkmark--color'
                },
                {
                    name: '--checkbox--checkmark--width'
                },
                {
                    name: '--checkbox--checkmark--height'
                },
                {
                    name: '--checkbox--disabled--color'
                },
                {
                    name: '--checkbox--disabled--background'
                },
                {
                    name: '--checkbox--disabled--border-top-width'
                },
                {
                    name: '--checkbox--disabled--border-top-style'
                },
                {
                    name: '--checkbox--disabled--border-top-color'
                },
                {
                    name: '--checkbox--disabled--border-right-width'
                },
                {
                    name: '--checkbox--disabled--border-right-style'
                },
                {
                    name: '--checkbox--disabled--border-right-color'
                },
                {
                    name: '--checkbox--disabled--border-bottom-width'
                },
                {
                    name: '--checkbox--disabled--border-bottom-style'
                },
                {
                    name: '--checkbox--disabled--border-bottom-color'
                },
                {
                    name: '--checkbox--disabled--border-left-width'
                },
                {
                    name: '--checkbox--disabled--border-left-style'
                },
                {
                    name: '--checkbox--disabled--border-left-color'
                },
                {
                    name: '--checkbox--disabled--border-width'
                },
                {
                    name: '--checkbox--disabled--border-style'
                },
                {
                    name: '--checkbox--disabled--border-color'
                },
                {
                    name: '--checkbox--disabled--border-top'
                },
                {
                    name: '--checkbox--disabled--border-right'
                },
                {
                    name: '--checkbox--disabled--border-bottom'
                },
                {
                    name: '--checkbox--disabled--border-left'
                },
                {
                    name: '--checkbox--disabled--border'
                },
                {
                    name: '--checkbox--readonly--color'
                },
                {
                    name: '--checkbox--readonly--background'
                },
                {
                    name: '--checkbox--readonly--border-top-width'
                },
                {
                    name: '--checkbox--readonly--border-top-style'
                },
                {
                    name: '--checkbox--readonly--border-top-color'
                },
                {
                    name: '--checkbox--readonly--border-right-width'
                },
                {
                    name: '--checkbox--readonly--border-right-style'
                },
                {
                    name: '--checkbox--readonly--border-right-color'
                },
                {
                    name: '--checkbox--readonly--border-bottom-width'
                },
                {
                    name: '--checkbox--readonly--border-bottom-style'
                },
                {
                    name: '--checkbox--readonly--border-bottom-color'
                },
                {
                    name: '--checkbox--readonly--border-left-width'
                },
                {
                    name: '--checkbox--readonly--border-left-style'
                },
                {
                    name: '--checkbox--readonly--border-left-color'
                },
                {
                    name: '--checkbox--readonly--border-width'
                },
                {
                    name: '--checkbox--readonly--border-style'
                },
                {
                    name: '--checkbox--readonly--border-color'
                },
                {
                    name: '--checkbox--readonly--border-top'
                },
                {
                    name: '--checkbox--readonly--border-right'
                },
                {
                    name: '--checkbox--readonly--border-bottom'
                },
                {
                    name: '--checkbox--readonly--border-left'
                },
                {
                    name: '--checkbox--readonly--border'
                },
                {
                    name: '--checkbox--checked--background'
                },
                {
                    name: '--checkbox--checked--border-top-width'
                },
                {
                    name: '--checkbox--checked--border-top-style'
                },
                {
                    name: '--checkbox--checked--border-top-color'
                },
                {
                    name: '--checkbox--checked--border-right-width'
                },
                {
                    name: '--checkbox--checked--border-right-style'
                },
                {
                    name: '--checkbox--checked--border-right-color'
                },
                {
                    name: '--checkbox--checked--border-bottom-width'
                },
                {
                    name: '--checkbox--checked--border-bottom-style'
                },
                {
                    name: '--checkbox--checked--border-bottom-color'
                },
                {
                    name: '--checkbox--checked--border-left-width'
                },
                {
                    name: '--checkbox--checked--border-left-style'
                },
                {
                    name: '--checkbox--checked--border-left-color'
                },
                {
                    name: '--checkbox--checked--border-width'
                },
                {
                    name: '--checkbox--checked--border-style'
                },
                {
                    name: '--checkbox--checked--border-color'
                },
                {
                    name: '--checkbox--checked--border-top'
                },
                {
                    name: '--checkbox--checked--border-right'
                },
                {
                    name: '--checkbox--checked--border-bottom'
                },
                {
                    name: '--checkbox--checked--border-left'
                },
                {
                    name: '--checkbox--checked--border'
                },
                {
                    name: '--checkbox--checked--disabled--background'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-top-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-right-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-left-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-width'
                },
                {
                    name: '--checkbox--checked--disabled--border-style'
                },
                {
                    name: '--checkbox--checked--disabled--border-color'
                },
                {
                    name: '--checkbox--checked--disabled--border-top'
                },
                {
                    name: '--checkbox--checked--disabled--border-right'
                },
                {
                    name: '--checkbox--checked--disabled--border-bottom'
                },
                {
                    name: '--checkbox--checked--disabled--border-left'
                },
                {
                    name: '--checkbox--checked--disabled--border'
                },
                {
                    name: '--checkbox--checked--readonly--background'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-top-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-right-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-left-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-width'
                },
                {
                    name: '--checkbox--checked--readonly--border-style'
                },
                {
                    name: '--checkbox--checked--readonly--border-color'
                },
                {
                    name: '--checkbox--checked--readonly--border-top'
                },
                {
                    name: '--checkbox--checked--readonly--border-right'
                },
                {
                    name: '--checkbox--checked--readonly--border-bottom'
                },
                {
                    name: '--checkbox--checked--readonly--border-left'
                },
                {
                    name: '--checkbox--checked--readonly--border'
                },
                {
                    name: '--checkbox--focus--box-shadow-offset-x'
                },
                {
                    name: '--checkbox--focus--box-shadow-offset-y'
                },
                {
                    name: '--checkbox--focus--box-shadow-blur-radius'
                },
                {
                    name: '--checkbox--focus--box-shadow-spread-radius'
                },
                {
                    name: '--checkbox--focus--box-shadow-color'
                },
                {
                    name: '--checkbox--focus--box-shadow'
                },
                {
                    name: '--checkbox--background'
                },
                {
                    name: '--checkbox--color'
                },
                {
                    name: '--checkbox--border-top-left-radius'
                },
                {
                    name: '--checkbox--border-top-right-radius'
                },
                {
                    name: '--checkbox--border-bottom-right-radius'
                },
                {
                    name: '--checkbox--border-bottom-left-radius'
                },
                {
                    name: '--checkbox--border-radius'
                },
                {
                    name: '--checkbox--font-size'
                },
                {
                    name: '--checkbox--margin-top'
                },
                {
                    name: '--checkbox--margin-right'
                },
                {
                    name: '--checkbox--margin-bottom'
                },
                {
                    name: '--checkbox--margin-left'
                },
                {
                    name: '--checkbox--margin'
                },
                {
                    name: '--checkbox--width'
                },
                {
                    name: '--checkbox--height'
                }
            ]
        }
    }
];
