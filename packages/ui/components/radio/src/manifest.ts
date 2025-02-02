import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'RadioGroup',
        props: [
            {
                name: 'color',
                type: 'light',
                description: 'The color variant of the radio group',
                default: ''
            },
            {
                name: 'disabled',
                type: 'Boolean',
                description: 'The disabled state of the radio group',
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
                description: 'Display the radio group as inline',
                default: 'false'
            },
            {
                name: 'indeterminate',
                type: 'Boolean',
                description: 'The indeterminate state of the radio group',
                default: 'false'
            },
            {
                name: 'label',
                type: 'String',
                description:
                    'The fallback label of the radio group. Can be a string, number, render function, or component',
                default: 'undefined'
            },
            {
                name: 'name',
                type: 'String',
                description: 'The unique identifier of the radio group',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'Boolean',
                description: 'Displays the native browser radio input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'Boolean',
                description: 'The readonly state of the radio group',
                default: 'false'
            },
            {
                name: 'sizeMultiplier',
                type: 'sm',
                description: 'The size variant of the radio group',
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
                description: 'The options of the radio group',
                default: ''
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
                type: 'light',
                description: 'The color variant of the radio',
                default: ''
            },
            {
                name: 'disabled',
                type: 'Boolean',
                description: 'The disabled state of the radio',
                default: 'false'
            },
            {
                name: 'error',
                type: 'Boolean',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            },
            {
                name: 'name',
                type: 'String',
                description: 'The unique identifier of the radio',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'Boolean',
                description: 'Displays the native browser radio input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'Boolean',
                description: 'The readonly state of the radio',
                default: 'false'
            },
            {
                name: 'sizeMultiplier',
                type: 'sm',
                description: 'The size variant of the radio',
                default: ''
            },
            {
                name: 'tabindex',
                type: 'Number',
                description: 'The tabindex of the radio',
                default: '0'
            },
            {
                name: 'label',
                type: 'String',
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
                name: 'update:modelValue',
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
                    name: '--radio--border-top-width'
                },
                {
                    name: '--radio--border-top-style'
                },
                {
                    name: '--radio--border-top-color'
                },
                {
                    name: '--radio--border-right-width'
                },
                {
                    name: '--radio--border-right-style'
                },
                {
                    name: '--radio--border-right-color'
                },
                {
                    name: '--radio--border-bottom-width'
                },
                {
                    name: '--radio--border-bottom-style'
                },
                {
                    name: '--radio--border-bottom-color'
                },
                {
                    name: '--radio--border-left-width'
                },
                {
                    name: '--radio--border-left-style'
                },
                {
                    name: '--radio--border-left-color'
                },
                {
                    name: '--radio--border-width'
                },
                {
                    name: '--radio--border-style'
                },
                {
                    name: '--radio--border-color'
                },
                {
                    name: '--radio--border-top'
                },
                {
                    name: '--radio--border-right'
                },
                {
                    name: '--radio--border-bottom'
                },
                {
                    name: '--radio--border-left'
                },
                {
                    name: '--radio--border'
                },
                {
                    name: '--radio--border-top-left-radius'
                },
                {
                    name: '--radio--border-top-right-radius'
                },
                {
                    name: '--radio--border-bottom-right-radius'
                },
                {
                    name: '--radio--border-bottom-left-radius'
                },
                {
                    name: '--radio--border-radius'
                },
                {
                    name: '--radio--box-shadow-offset-x'
                },
                {
                    name: '--radio--box-shadow-offset-y'
                },
                {
                    name: '--radio--box-shadow-blur-radius'
                },
                {
                    name: '--radio--box-shadow-spread-radius'
                },
                {
                    name: '--radio--box-shadow-color'
                },
                {
                    name: '--radio--box-shadow'
                },
                {
                    name: '--radio--transition-property'
                },
                {
                    name: '--radio--transition-duration'
                },
                {
                    name: '--radio--transition-timing-function'
                },
                {
                    name: '--radio--transition'
                },
                {
                    name: '--radio--circle--color'
                },
                {
                    name: '--radio--circle--width'
                },
                {
                    name: '--radio--circle--height'
                },
                {
                    name: '--radio--checked--background'
                },
                {
                    name: '--radio--checked--border-top-width'
                },
                {
                    name: '--radio--checked--border-top-style'
                },
                {
                    name: '--radio--checked--border-top-color'
                },
                {
                    name: '--radio--checked--border-right-width'
                },
                {
                    name: '--radio--checked--border-right-style'
                },
                {
                    name: '--radio--checked--border-right-color'
                },
                {
                    name: '--radio--checked--border-bottom-width'
                },
                {
                    name: '--radio--checked--border-bottom-style'
                },
                {
                    name: '--radio--checked--border-bottom-color'
                },
                {
                    name: '--radio--checked--border-left-width'
                },
                {
                    name: '--radio--checked--border-left-style'
                },
                {
                    name: '--radio--checked--border-left-color'
                },
                {
                    name: '--radio--checked--border-width'
                },
                {
                    name: '--radio--checked--border-style'
                },
                {
                    name: '--radio--checked--border-color'
                },
                {
                    name: '--radio--checked--border-top'
                },
                {
                    name: '--radio--checked--border-right'
                },
                {
                    name: '--radio--checked--border-bottom'
                },
                {
                    name: '--radio--checked--border-left'
                },
                {
                    name: '--radio--checked--border'
                },
                {
                    name: '--radio--checked--disabled--background'
                },
                {
                    name: '--radio--checked--disabled--border-top-width'
                },
                {
                    name: '--radio--checked--disabled--border-top-style'
                },
                {
                    name: '--radio--checked--disabled--border-top-color'
                },
                {
                    name: '--radio--checked--disabled--border-right-width'
                },
                {
                    name: '--radio--checked--disabled--border-right-style'
                },
                {
                    name: '--radio--checked--disabled--border-right-color'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-width'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-style'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-color'
                },
                {
                    name: '--radio--checked--disabled--border-left-width'
                },
                {
                    name: '--radio--checked--disabled--border-left-style'
                },
                {
                    name: '--radio--checked--disabled--border-left-color'
                },
                {
                    name: '--radio--checked--disabled--border-width'
                },
                {
                    name: '--radio--checked--disabled--border-style'
                },
                {
                    name: '--radio--checked--disabled--border-color'
                },
                {
                    name: '--radio--checked--disabled--border-top'
                },
                {
                    name: '--radio--checked--disabled--border-right'
                },
                {
                    name: '--radio--checked--disabled--border-bottom'
                },
                {
                    name: '--radio--checked--disabled--border-left'
                },
                {
                    name: '--radio--checked--disabled--border'
                },
                {
                    name: '--radio--checked--readonly--background'
                },
                {
                    name: '--radio--checked--readonly--border-top-width'
                },
                {
                    name: '--radio--checked--readonly--border-top-style'
                },
                {
                    name: '--radio--checked--readonly--border-top-color'
                },
                {
                    name: '--radio--checked--readonly--border-right-width'
                },
                {
                    name: '--radio--checked--readonly--border-right-style'
                },
                {
                    name: '--radio--checked--readonly--border-right-color'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-width'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-style'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-color'
                },
                {
                    name: '--radio--checked--readonly--border-left-width'
                },
                {
                    name: '--radio--checked--readonly--border-left-style'
                },
                {
                    name: '--radio--checked--readonly--border-left-color'
                },
                {
                    name: '--radio--checked--readonly--border-width'
                },
                {
                    name: '--radio--checked--readonly--border-style'
                },
                {
                    name: '--radio--checked--readonly--border-color'
                },
                {
                    name: '--radio--checked--readonly--border-top'
                },
                {
                    name: '--radio--checked--readonly--border-right'
                },
                {
                    name: '--radio--checked--readonly--border-bottom'
                },
                {
                    name: '--radio--checked--readonly--border-left'
                },
                {
                    name: '--radio--checked--readonly--border'
                },
                {
                    name: '--radio--disabled--color'
                },
                {
                    name: '--radio--disabled--background'
                },
                {
                    name: '--radio--disabled--border-top-width'
                },
                {
                    name: '--radio--disabled--border-top-style'
                },
                {
                    name: '--radio--disabled--border-top-color'
                },
                {
                    name: '--radio--disabled--border-right-width'
                },
                {
                    name: '--radio--disabled--border-right-style'
                },
                {
                    name: '--radio--disabled--border-right-color'
                },
                {
                    name: '--radio--disabled--border-bottom-width'
                },
                {
                    name: '--radio--disabled--border-bottom-style'
                },
                {
                    name: '--radio--disabled--border-bottom-color'
                },
                {
                    name: '--radio--disabled--border-left-width'
                },
                {
                    name: '--radio--disabled--border-left-style'
                },
                {
                    name: '--radio--disabled--border-left-color'
                },
                {
                    name: '--radio--disabled--border-width'
                },
                {
                    name: '--radio--disabled--border-style'
                },
                {
                    name: '--radio--disabled--border-color'
                },
                {
                    name: '--radio--disabled--border-top'
                },
                {
                    name: '--radio--disabled--border-right'
                },
                {
                    name: '--radio--disabled--border-bottom'
                },
                {
                    name: '--radio--disabled--border-left'
                },
                {
                    name: '--radio--disabled--border'
                },
                {
                    name: '--radio--focus--box-shadow-offset-x'
                },
                {
                    name: '--radio--focus--box-shadow-offset-y'
                },
                {
                    name: '--radio--focus--box-shadow-blur-radius'
                },
                {
                    name: '--radio--focus--box-shadow-spread-radius'
                },
                {
                    name: '--radio--focus--box-shadow-color'
                },
                {
                    name: '--radio--focus--box-shadow'
                },
                {
                    name: '--radio--background'
                },
                {
                    name: '--radio--color'
                },
                {
                    name: '--radio--readonly--background'
                },
                {
                    name: '--radio--readonly--border-top-width'
                },
                {
                    name: '--radio--readonly--border-top-style'
                },
                {
                    name: '--radio--readonly--border-top-color'
                },
                {
                    name: '--radio--readonly--border-right-width'
                },
                {
                    name: '--radio--readonly--border-right-style'
                },
                {
                    name: '--radio--readonly--border-right-color'
                },
                {
                    name: '--radio--readonly--border-bottom-width'
                },
                {
                    name: '--radio--readonly--border-bottom-style'
                },
                {
                    name: '--radio--readonly--border-bottom-color'
                },
                {
                    name: '--radio--readonly--border-left-width'
                },
                {
                    name: '--radio--readonly--border-left-style'
                },
                {
                    name: '--radio--readonly--border-left-color'
                },
                {
                    name: '--radio--readonly--border-width'
                },
                {
                    name: '--radio--readonly--border-style'
                },
                {
                    name: '--radio--readonly--border-color'
                },
                {
                    name: '--radio--readonly--border-top'
                },
                {
                    name: '--radio--readonly--border-right'
                },
                {
                    name: '--radio--readonly--border-bottom'
                },
                {
                    name: '--radio--readonly--border-left'
                },
                {
                    name: '--radio--readonly--border'
                },
                {
                    name: '--radio--font-size'
                },
                {
                    name: '--radio--margin-top'
                },
                {
                    name: '--radio--margin-right'
                },
                {
                    name: '--radio--margin-bottom'
                },
                {
                    name: '--radio--margin-left'
                },
                {
                    name: '--radio--margin'
                },
                {
                    name: '--radio--width'
                },
                {
                    name: '--radio--height'
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
                    name: '--radio--border-top-width'
                },
                {
                    name: '--radio--border-top-style'
                },
                {
                    name: '--radio--border-top-color'
                },
                {
                    name: '--radio--border-right-width'
                },
                {
                    name: '--radio--border-right-style'
                },
                {
                    name: '--radio--border-right-color'
                },
                {
                    name: '--radio--border-bottom-width'
                },
                {
                    name: '--radio--border-bottom-style'
                },
                {
                    name: '--radio--border-bottom-color'
                },
                {
                    name: '--radio--border-left-width'
                },
                {
                    name: '--radio--border-left-style'
                },
                {
                    name: '--radio--border-left-color'
                },
                {
                    name: '--radio--border-width'
                },
                {
                    name: '--radio--border-style'
                },
                {
                    name: '--radio--border-color'
                },
                {
                    name: '--radio--border-top'
                },
                {
                    name: '--radio--border-right'
                },
                {
                    name: '--radio--border-bottom'
                },
                {
                    name: '--radio--border-left'
                },
                {
                    name: '--radio--border'
                },
                {
                    name: '--radio--border-top-left-radius'
                },
                {
                    name: '--radio--border-top-right-radius'
                },
                {
                    name: '--radio--border-bottom-right-radius'
                },
                {
                    name: '--radio--border-bottom-left-radius'
                },
                {
                    name: '--radio--border-radius'
                },
                {
                    name: '--radio--box-shadow-offset-x'
                },
                {
                    name: '--radio--box-shadow-offset-y'
                },
                {
                    name: '--radio--box-shadow-blur-radius'
                },
                {
                    name: '--radio--box-shadow-spread-radius'
                },
                {
                    name: '--radio--box-shadow-color'
                },
                {
                    name: '--radio--box-shadow'
                },
                {
                    name: '--radio--transition-property'
                },
                {
                    name: '--radio--transition-duration'
                },
                {
                    name: '--radio--transition-timing-function'
                },
                {
                    name: '--radio--transition'
                },
                {
                    name: '--radio--circle--color'
                },
                {
                    name: '--radio--circle--width'
                },
                {
                    name: '--radio--circle--height'
                },
                {
                    name: '--radio--checked--background'
                },
                {
                    name: '--radio--checked--border-top-width'
                },
                {
                    name: '--radio--checked--border-top-style'
                },
                {
                    name: '--radio--checked--border-top-color'
                },
                {
                    name: '--radio--checked--border-right-width'
                },
                {
                    name: '--radio--checked--border-right-style'
                },
                {
                    name: '--radio--checked--border-right-color'
                },
                {
                    name: '--radio--checked--border-bottom-width'
                },
                {
                    name: '--radio--checked--border-bottom-style'
                },
                {
                    name: '--radio--checked--border-bottom-color'
                },
                {
                    name: '--radio--checked--border-left-width'
                },
                {
                    name: '--radio--checked--border-left-style'
                },
                {
                    name: '--radio--checked--border-left-color'
                },
                {
                    name: '--radio--checked--border-width'
                },
                {
                    name: '--radio--checked--border-style'
                },
                {
                    name: '--radio--checked--border-color'
                },
                {
                    name: '--radio--checked--border-top'
                },
                {
                    name: '--radio--checked--border-right'
                },
                {
                    name: '--radio--checked--border-bottom'
                },
                {
                    name: '--radio--checked--border-left'
                },
                {
                    name: '--radio--checked--border'
                },
                {
                    name: '--radio--checked--disabled--background'
                },
                {
                    name: '--radio--checked--disabled--border-top-width'
                },
                {
                    name: '--radio--checked--disabled--border-top-style'
                },
                {
                    name: '--radio--checked--disabled--border-top-color'
                },
                {
                    name: '--radio--checked--disabled--border-right-width'
                },
                {
                    name: '--radio--checked--disabled--border-right-style'
                },
                {
                    name: '--radio--checked--disabled--border-right-color'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-width'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-style'
                },
                {
                    name: '--radio--checked--disabled--border-bottom-color'
                },
                {
                    name: '--radio--checked--disabled--border-left-width'
                },
                {
                    name: '--radio--checked--disabled--border-left-style'
                },
                {
                    name: '--radio--checked--disabled--border-left-color'
                },
                {
                    name: '--radio--checked--disabled--border-width'
                },
                {
                    name: '--radio--checked--disabled--border-style'
                },
                {
                    name: '--radio--checked--disabled--border-color'
                },
                {
                    name: '--radio--checked--disabled--border-top'
                },
                {
                    name: '--radio--checked--disabled--border-right'
                },
                {
                    name: '--radio--checked--disabled--border-bottom'
                },
                {
                    name: '--radio--checked--disabled--border-left'
                },
                {
                    name: '--radio--checked--disabled--border'
                },
                {
                    name: '--radio--checked--readonly--background'
                },
                {
                    name: '--radio--checked--readonly--border-top-width'
                },
                {
                    name: '--radio--checked--readonly--border-top-style'
                },
                {
                    name: '--radio--checked--readonly--border-top-color'
                },
                {
                    name: '--radio--checked--readonly--border-right-width'
                },
                {
                    name: '--radio--checked--readonly--border-right-style'
                },
                {
                    name: '--radio--checked--readonly--border-right-color'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-width'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-style'
                },
                {
                    name: '--radio--checked--readonly--border-bottom-color'
                },
                {
                    name: '--radio--checked--readonly--border-left-width'
                },
                {
                    name: '--radio--checked--readonly--border-left-style'
                },
                {
                    name: '--radio--checked--readonly--border-left-color'
                },
                {
                    name: '--radio--checked--readonly--border-width'
                },
                {
                    name: '--radio--checked--readonly--border-style'
                },
                {
                    name: '--radio--checked--readonly--border-color'
                },
                {
                    name: '--radio--checked--readonly--border-top'
                },
                {
                    name: '--radio--checked--readonly--border-right'
                },
                {
                    name: '--radio--checked--readonly--border-bottom'
                },
                {
                    name: '--radio--checked--readonly--border-left'
                },
                {
                    name: '--radio--checked--readonly--border'
                },
                {
                    name: '--radio--disabled--color'
                },
                {
                    name: '--radio--disabled--background'
                },
                {
                    name: '--radio--disabled--border-top-width'
                },
                {
                    name: '--radio--disabled--border-top-style'
                },
                {
                    name: '--radio--disabled--border-top-color'
                },
                {
                    name: '--radio--disabled--border-right-width'
                },
                {
                    name: '--radio--disabled--border-right-style'
                },
                {
                    name: '--radio--disabled--border-right-color'
                },
                {
                    name: '--radio--disabled--border-bottom-width'
                },
                {
                    name: '--radio--disabled--border-bottom-style'
                },
                {
                    name: '--radio--disabled--border-bottom-color'
                },
                {
                    name: '--radio--disabled--border-left-width'
                },
                {
                    name: '--radio--disabled--border-left-style'
                },
                {
                    name: '--radio--disabled--border-left-color'
                },
                {
                    name: '--radio--disabled--border-width'
                },
                {
                    name: '--radio--disabled--border-style'
                },
                {
                    name: '--radio--disabled--border-color'
                },
                {
                    name: '--radio--disabled--border-top'
                },
                {
                    name: '--radio--disabled--border-right'
                },
                {
                    name: '--radio--disabled--border-bottom'
                },
                {
                    name: '--radio--disabled--border-left'
                },
                {
                    name: '--radio--disabled--border'
                },
                {
                    name: '--radio--focus--box-shadow-offset-x'
                },
                {
                    name: '--radio--focus--box-shadow-offset-y'
                },
                {
                    name: '--radio--focus--box-shadow-blur-radius'
                },
                {
                    name: '--radio--focus--box-shadow-spread-radius'
                },
                {
                    name: '--radio--focus--box-shadow-color'
                },
                {
                    name: '--radio--focus--box-shadow'
                },
                {
                    name: '--radio--background'
                },
                {
                    name: '--radio--color'
                },
                {
                    name: '--radio--readonly--background'
                },
                {
                    name: '--radio--readonly--border-top-width'
                },
                {
                    name: '--radio--readonly--border-top-style'
                },
                {
                    name: '--radio--readonly--border-top-color'
                },
                {
                    name: '--radio--readonly--border-right-width'
                },
                {
                    name: '--radio--readonly--border-right-style'
                },
                {
                    name: '--radio--readonly--border-right-color'
                },
                {
                    name: '--radio--readonly--border-bottom-width'
                },
                {
                    name: '--radio--readonly--border-bottom-style'
                },
                {
                    name: '--radio--readonly--border-bottom-color'
                },
                {
                    name: '--radio--readonly--border-left-width'
                },
                {
                    name: '--radio--readonly--border-left-style'
                },
                {
                    name: '--radio--readonly--border-left-color'
                },
                {
                    name: '--radio--readonly--border-width'
                },
                {
                    name: '--radio--readonly--border-style'
                },
                {
                    name: '--radio--readonly--border-color'
                },
                {
                    name: '--radio--readonly--border-top'
                },
                {
                    name: '--radio--readonly--border-right'
                },
                {
                    name: '--radio--readonly--border-bottom'
                },
                {
                    name: '--radio--readonly--border-left'
                },
                {
                    name: '--radio--readonly--border'
                },
                {
                    name: '--radio--font-size'
                },
                {
                    name: '--radio--margin-top'
                },
                {
                    name: '--radio--margin-right'
                },
                {
                    name: '--radio--margin-bottom'
                },
                {
                    name: '--radio--margin-left'
                },
                {
                    name: '--radio--margin'
                },
                {
                    name: '--radio--width'
                },
                {
                    name: '--radio--height'
                }
            ]
        }
    }
];

export default manifest;
