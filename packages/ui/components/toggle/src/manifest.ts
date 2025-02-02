import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Toggle',
        props: [
            {
                name: 'color',
                type: 'light',
                description: 'The color variant of the toggle',
                default: ''
            },
            {
                name: 'disabled',
                type: 'Boolean',
                description: 'The disabled state of the toggle',
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
                description: 'The indeterminate state of the toggle',
                default: 'false'
            },
            {
                name: 'name',
                type: 'String',
                description: 'The unique identifier of the toggle',
                default: 'uid()'
            },
            {
                name: 'native',
                type: 'Boolean',
                description: 'Displays the native browser toggle input indicator',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'Boolean',
                description: 'The readonly state of the toggle',
                default: 'false'
            },
            {
                name: 'rounded',
                type: 'Boolean',
                description: 'The rounded variant of the toggle',
                default: 'false'
            },
            {
                name: 'sizeMultiplier',
                type: 'sm',
                description: 'The size variant of the toggle',
                default: ''
            },
            {
                name: 'tabindex',
                type: 'Number',
                description: 'The tabindex of the toggle',
                default: '0'
            },
            {
                name: 'validateSchema',
                type: 'Boolean',
                description: 'Enable input validation using schema',
                default: 'true'
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
                description: 'Slot for default toggle label'
            }
        ],
        css: {
            namespace: 'toggle',
            variables: [
                {
                    name: '--toggle--border-top-width'
                },
                {
                    name: '--toggle--border-top-style'
                },
                {
                    name: '--toggle--border-top-color'
                },
                {
                    name: '--toggle--border-right-width'
                },
                {
                    name: '--toggle--border-right-style'
                },
                {
                    name: '--toggle--border-right-color'
                },
                {
                    name: '--toggle--border-bottom-width'
                },
                {
                    name: '--toggle--border-bottom-style'
                },
                {
                    name: '--toggle--border-bottom-color'
                },
                {
                    name: '--toggle--border-left-width'
                },
                {
                    name: '--toggle--border-left-style'
                },
                {
                    name: '--toggle--border-left-color'
                },
                {
                    name: '--toggle--border-width'
                },
                {
                    name: '--toggle--border-style'
                },
                {
                    name: '--toggle--border-color'
                },
                {
                    name: '--toggle--border-top'
                },
                {
                    name: '--toggle--border-right'
                },
                {
                    name: '--toggle--border-bottom'
                },
                {
                    name: '--toggle--border-left'
                },
                {
                    name: '--toggle--border'
                },
                {
                    name: '--toggle--box-shadow-offset-x'
                },
                {
                    name: '--toggle--box-shadow-offset-y'
                },
                {
                    name: '--toggle--box-shadow-blur-radius'
                },
                {
                    name: '--toggle--box-shadow-spread-radius'
                },
                {
                    name: '--toggle--box-shadow-color'
                },
                {
                    name: '--toggle--box-shadow'
                },
                {
                    name: '--toggle--font-size'
                },
                {
                    name: '--toggle--line-height'
                },
                {
                    name: '--toggle--transition-property'
                },
                {
                    name: '--toggle--transition-duration'
                },
                {
                    name: '--toggle--transition-timing-function'
                },
                {
                    name: '--toggle--transition'
                },
                {
                    name: '--toggle--indicator--scale'
                },
                {
                    name: '--toggle--indicator--transition-property'
                },
                {
                    name: '--toggle--indicator--transition-duration'
                },
                {
                    name: '--toggle--indicator--transition-timing-function'
                },
                {
                    name: '--toggle--indicator--transition'
                },
                {
                    name: '--toggle--indicator--background'
                },
                {
                    name: '--toggle--indicator--margin-top'
                },
                {
                    name: '--toggle--indicator--margin-right'
                },
                {
                    name: '--toggle--indicator--margin-bottom'
                },
                {
                    name: '--toggle--indicator--margin-left'
                },
                {
                    name: '--toggle--indicator--margin'
                },
                {
                    name: '--toggle--indicator--border-top-left-radius'
                },
                {
                    name: '--toggle--indicator--border-top-right-radius'
                },
                {
                    name: '--toggle--indicator--border-bottom-right-radius'
                },
                {
                    name: '--toggle--indicator--border-bottom-left-radius'
                },
                {
                    name: '--toggle--indicator--border-radius'
                },
                {
                    name: '--toggle--disabled--color'
                },
                {
                    name: '--toggle--disabled--background'
                },
                {
                    name: '--toggle--disabled--border-top-width'
                },
                {
                    name: '--toggle--disabled--border-top-style'
                },
                {
                    name: '--toggle--disabled--border-top-color'
                },
                {
                    name: '--toggle--disabled--border-right-width'
                },
                {
                    name: '--toggle--disabled--border-right-style'
                },
                {
                    name: '--toggle--disabled--border-right-color'
                },
                {
                    name: '--toggle--disabled--border-bottom-width'
                },
                {
                    name: '--toggle--disabled--border-bottom-style'
                },
                {
                    name: '--toggle--disabled--border-bottom-color'
                },
                {
                    name: '--toggle--disabled--border-left-width'
                },
                {
                    name: '--toggle--disabled--border-left-style'
                },
                {
                    name: '--toggle--disabled--border-left-color'
                },
                {
                    name: '--toggle--disabled--border-width'
                },
                {
                    name: '--toggle--disabled--border-style'
                },
                {
                    name: '--toggle--disabled--border-color'
                },
                {
                    name: '--toggle--disabled--border-top'
                },
                {
                    name: '--toggle--disabled--border-right'
                },
                {
                    name: '--toggle--disabled--border-bottom'
                },
                {
                    name: '--toggle--disabled--border-left'
                },
                {
                    name: '--toggle--disabled--border'
                },
                {
                    name: '--toggle--disabled--indicator--background'
                },
                {
                    name: '--toggle--readonly--color'
                },
                {
                    name: '--toggle--readonly--background'
                },
                {
                    name: '--toggle--readonly--border-top-width'
                },
                {
                    name: '--toggle--readonly--border-top-style'
                },
                {
                    name: '--toggle--readonly--border-top-color'
                },
                {
                    name: '--toggle--readonly--border-right-width'
                },
                {
                    name: '--toggle--readonly--border-right-style'
                },
                {
                    name: '--toggle--readonly--border-right-color'
                },
                {
                    name: '--toggle--readonly--border-bottom-width'
                },
                {
                    name: '--toggle--readonly--border-bottom-style'
                },
                {
                    name: '--toggle--readonly--border-bottom-color'
                },
                {
                    name: '--toggle--readonly--border-left-width'
                },
                {
                    name: '--toggle--readonly--border-left-style'
                },
                {
                    name: '--toggle--readonly--border-left-color'
                },
                {
                    name: '--toggle--readonly--border-width'
                },
                {
                    name: '--toggle--readonly--border-style'
                },
                {
                    name: '--toggle--readonly--border-color'
                },
                {
                    name: '--toggle--readonly--border-top'
                },
                {
                    name: '--toggle--readonly--border-right'
                },
                {
                    name: '--toggle--readonly--border-bottom'
                },
                {
                    name: '--toggle--readonly--border-left'
                },
                {
                    name: '--toggle--readonly--border'
                },
                {
                    name: '--toggle--readonly--indicator--background'
                },
                {
                    name: '--toggle--background'
                },
                {
                    name: '--toggle--color'
                },
                {
                    name: '--toggle--checked--background'
                },
                {
                    name: '--toggle--checked--border-top-width'
                },
                {
                    name: '--toggle--checked--border-top-style'
                },
                {
                    name: '--toggle--checked--border-top-color'
                },
                {
                    name: '--toggle--checked--border-right-width'
                },
                {
                    name: '--toggle--checked--border-right-style'
                },
                {
                    name: '--toggle--checked--border-right-color'
                },
                {
                    name: '--toggle--checked--border-bottom-width'
                },
                {
                    name: '--toggle--checked--border-bottom-style'
                },
                {
                    name: '--toggle--checked--border-bottom-color'
                },
                {
                    name: '--toggle--checked--border-left-width'
                },
                {
                    name: '--toggle--checked--border-left-style'
                },
                {
                    name: '--toggle--checked--border-left-color'
                },
                {
                    name: '--toggle--checked--border-width'
                },
                {
                    name: '--toggle--checked--border-style'
                },
                {
                    name: '--toggle--checked--border-color'
                },
                {
                    name: '--toggle--checked--border-top'
                },
                {
                    name: '--toggle--checked--border-right'
                },
                {
                    name: '--toggle--checked--border-bottom'
                },
                {
                    name: '--toggle--checked--border-left'
                },
                {
                    name: '--toggle--checked--border'
                },
                {
                    name: '--toggle--checked--disabled--background'
                },
                {
                    name: '--toggle--checked--disabled--border-top-width'
                },
                {
                    name: '--toggle--checked--disabled--border-top-style'
                },
                {
                    name: '--toggle--checked--disabled--border-top-color'
                },
                {
                    name: '--toggle--checked--disabled--border-right-width'
                },
                {
                    name: '--toggle--checked--disabled--border-right-style'
                },
                {
                    name: '--toggle--checked--disabled--border-right-color'
                },
                {
                    name: '--toggle--checked--disabled--border-bottom-width'
                },
                {
                    name: '--toggle--checked--disabled--border-bottom-style'
                },
                {
                    name: '--toggle--checked--disabled--border-bottom-color'
                },
                {
                    name: '--toggle--checked--disabled--border-left-width'
                },
                {
                    name: '--toggle--checked--disabled--border-left-style'
                },
                {
                    name: '--toggle--checked--disabled--border-left-color'
                },
                {
                    name: '--toggle--checked--disabled--border-width'
                },
                {
                    name: '--toggle--checked--disabled--border-style'
                },
                {
                    name: '--toggle--checked--disabled--border-color'
                },
                {
                    name: '--toggle--checked--disabled--border-top'
                },
                {
                    name: '--toggle--checked--disabled--border-right'
                },
                {
                    name: '--toggle--checked--disabled--border-bottom'
                },
                {
                    name: '--toggle--checked--disabled--border-left'
                },
                {
                    name: '--toggle--checked--disabled--border'
                },
                {
                    name: '--toggle--checked--disabled--indicator--background'
                },
                {
                    name: '--toggle--checked--readonly--background'
                },
                {
                    name: '--toggle--checked--readonly--border-top-width'
                },
                {
                    name: '--toggle--checked--readonly--border-top-style'
                },
                {
                    name: '--toggle--checked--readonly--border-top-color'
                },
                {
                    name: '--toggle--checked--readonly--border-right-width'
                },
                {
                    name: '--toggle--checked--readonly--border-right-style'
                },
                {
                    name: '--toggle--checked--readonly--border-right-color'
                },
                {
                    name: '--toggle--checked--readonly--border-bottom-width'
                },
                {
                    name: '--toggle--checked--readonly--border-bottom-style'
                },
                {
                    name: '--toggle--checked--readonly--border-bottom-color'
                },
                {
                    name: '--toggle--checked--readonly--border-left-width'
                },
                {
                    name: '--toggle--checked--readonly--border-left-style'
                },
                {
                    name: '--toggle--checked--readonly--border-left-color'
                },
                {
                    name: '--toggle--checked--readonly--border-width'
                },
                {
                    name: '--toggle--checked--readonly--border-style'
                },
                {
                    name: '--toggle--checked--readonly--border-color'
                },
                {
                    name: '--toggle--checked--readonly--border-top'
                },
                {
                    name: '--toggle--checked--readonly--border-right'
                },
                {
                    name: '--toggle--checked--readonly--border-bottom'
                },
                {
                    name: '--toggle--checked--readonly--border-left'
                },
                {
                    name: '--toggle--checked--readonly--border'
                },
                {
                    name: '--toggle--checked--readonly--indicator--background'
                },
                {
                    name: '--toggle--checked--indicator--background'
                },
                {
                    name: '--toggle--border-top-left-radius'
                },
                {
                    name: '--toggle--border-top-right-radius'
                },
                {
                    name: '--toggle--border-bottom-right-radius'
                },
                {
                    name: '--toggle--border-bottom-left-radius'
                },
                {
                    name: '--toggle--border-radius'
                },
                {
                    name: '--toggle--margin-top'
                },
                {
                    name: '--toggle--margin-right'
                },
                {
                    name: '--toggle--margin-bottom'
                },
                {
                    name: '--toggle--margin-left'
                },
                {
                    name: '--toggle--margin'
                },
                {
                    name: '--toggle--width'
                },
                {
                    name: '--toggle--height'
                },
                {
                    name: '--toggle--{color}--background'
                },
                {
                    name: '--toggle--{color}--border-top-color'
                },
                {
                    name: '--toggle--{color}--border-right-color'
                },
                {
                    name: '--toggle--{color}--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--border-left-color'
                },
                {
                    name: '--toggle--{color}--color'
                },
                {
                    name: '--toggle--{color}--disabled--background'
                },
                {
                    name: '--toggle--{color}--disabled--border-top-color'
                },
                {
                    name: '--toggle--{color}--disabled--border-right-color'
                },
                {
                    name: '--toggle--{color}--disabled--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--disabled--border-left-color'
                },
                {
                    name: '--toggle--{color}--disabled--indicator--background'
                },
                {
                    name: '--toggle--{color}--readonly--background'
                },
                {
                    name: '--toggle--{color}--readonly--border-top-color'
                },
                {
                    name: '--toggle--{color}--readonly--border-right-color'
                },
                {
                    name: '--toggle--{color}--readonly--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--readonly--border-left-color'
                },
                {
                    name: '--toggle--{color}--readonly--indicator--background'
                },
                {
                    name: '--toggle--{color}--checked--background'
                },
                {
                    name: '--toggle--{color}--checked--border-top-color'
                },
                {
                    name: '--toggle--{color}--checked--border-right-color'
                },
                {
                    name: '--toggle--{color}--checked--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--checked--border-left-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--background'
                },
                {
                    name: '--toggle--{color}--checked--disabled--border-top-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--border-right-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--border-left-color'
                },
                {
                    name: '--toggle--{color}--checked--disabled--indicator--background'
                },
                {
                    name: '--toggle--{color}--checked--readonly--background'
                },
                {
                    name: '--toggle--{color}--checked--readonly--border-top-color'
                },
                {
                    name: '--toggle--{color}--checked--readonly--border-right-color'
                },
                {
                    name: '--toggle--{color}--checked--readonly--border-bottom-color'
                },
                {
                    name: '--toggle--{color}--checked--readonly--border-left-color'
                },
                {
                    name: '--toggle--{color}--checked--readonly--indicator--background'
                },
                {
                    name: '--toggle--{color}--checked--indicator--background'
                },
                {
                    name: '--toggle--{color}--indicator--background'
                },
                {
                    name: '--toggle--{size}--border-top-left-radius'
                },
                {
                    name: '--toggle--{size}--border-top-right-radius'
                },
                {
                    name: '--toggle--{size}--border-bottom-right-radius'
                },
                {
                    name: '--toggle--{size}--border-bottom-left-radius'
                },
                {
                    name: '--toggle--{size}--font-size'
                },
                {
                    name: '--toggle--{size}--margin-top'
                },
                {
                    name: '--toggle--{size}--margin-right'
                },
                {
                    name: '--toggle--{size}--margin-bottom'
                },
                {
                    name: '--toggle--{size}--margin-left'
                },
                {
                    name: '--toggle--{size}--width'
                },
                {
                    name: '--toggle--{size}--height'
                },
                {
                    name: '--toggle--{size}--indicator--margin-top'
                },
                {
                    name: '--toggle--{size}--indicator--margin-right'
                },
                {
                    name: '--toggle--{size}--indicator--margin-bottom'
                },
                {
                    name: '--toggle--{size}--indicator--margin-left'
                },
                {
                    name: '--toggle--{size}--indicator--border-top-left-radius'
                },
                {
                    name: '--toggle--{size}--indicator--border-top-right-radius'
                },
                {
                    name: '--toggle--{size}--indicator--border-bottom-right-radius'
                },
                {
                    name: '--toggle--{size}--indicator--border-bottom-left-radius'
                }
            ]
        }
    }
];

export default manifest;
