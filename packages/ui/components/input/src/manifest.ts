import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Textarea',
        props: [
            {
                name: 'name',
                type: 'String',
                description: 'The unique identifier of the textarea',
                default: 'uid()'
            }
        ],
        events: [
            {
                name: 'update:modelValue',
                description: 'Event emitted for setting the modelValue'
            },
            {
                name: 'clear',
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
        name: 'Input',
        props: [
            {
                name: 'color',
                type: 'light',
                description: 'The color variant of the input',
                default: ''
            },
            {
                name: 'clearable',
                type: 'Boolean',
                description: 'Display the input as clearable',
                default: 'false'
            },
            {
                name: 'disabled',
                type: 'Boolean',
                description: 'The disabled state of the input',
                default: 'false'
            },
            {
                name: 'error',
                type: 'Boolean',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            },
            {
                name: 'id',
                type: 'String',
                description: 'The id of the internal input element',
                default: ''
            },
            {
                name: 'wrapperId',
                type: 'String',
                description: 'The id of the input wrapper element',
                default: ''
            },
            {
                name: 'modelValue',
                type: 'String',
                description: 'Used to set the field value',
                default: "''"
            },
            {
                name: 'name',
                type: 'String',
                description: 'The unique identifier of the input',
                default: 'uid()'
            },
            {
                name: 'plaintext',
                type: 'Boolean',
                description: 'Display the input as plaintext, disabling interaction',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'Boolean',
                description: 'The readonly state of the input',
                default: 'false'
            },
            {
                name: 'sizeMultiplier',
                type: 'sm',
                description: 'The size variant of the input',
                default: ''
            },
            {
                name: 'tabindex',
                type: 'Number',
                description: 'The tabindex of the input',
                default: '0'
            },
            {
                name: 'type',
                type: 'String',
                description: 'The type of the input',
                default: 'text'
            },
            {
                name: 'clearAriaLabel',
                type: 'String',
                description: 'The aria-label of the clear button',
                default: 'Clear'
            },
            {
                name: 'showPasswordToggleAriaLabel',
                type: 'String',
                description: 'The aria-label of the show password toggle button',
                default: 'Toggle'
            },
            {
                name: 'showPasswordToggle',
                type: 'Boolean',
                description: 'Display the password toggle button',
                default: 'true'
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
            },
            {
                name: 'clear',
                description: 'Event emitted when clearing the input element'
            },
            {
                name: 'togglePassword',
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
                    name: '--input--border-top-width'
                },
                {
                    name: '--input--border-top-style'
                },
                {
                    name: '--input--border-top-color'
                },
                {
                    name: '--input--border-right-width'
                },
                {
                    name: '--input--border-right-style'
                },
                {
                    name: '--input--border-right-color'
                },
                {
                    name: '--input--border-bottom-width'
                },
                {
                    name: '--input--border-bottom-style'
                },
                {
                    name: '--input--border-bottom-color'
                },
                {
                    name: '--input--border-left-width'
                },
                {
                    name: '--input--border-left-style'
                },
                {
                    name: '--input--border-left-color'
                },
                {
                    name: '--input--border-width'
                },
                {
                    name: '--input--border-style'
                },
                {
                    name: '--input--border-color'
                },
                {
                    name: '--input--border-top'
                },
                {
                    name: '--input--border-right'
                },
                {
                    name: '--input--border-bottom'
                },
                {
                    name: '--input--border-left'
                },
                {
                    name: '--input--border'
                },
                {
                    name: '--input--box-shadow-offset-x'
                },
                {
                    name: '--input--box-shadow-offset-y'
                },
                {
                    name: '--input--box-shadow-blur-radius'
                },
                {
                    name: '--input--box-shadow-spread-radius'
                },
                {
                    name: '--input--box-shadow-color'
                },
                {
                    name: '--input--box-shadow'
                },
                {
                    name: '--input--line-height'
                },
                {
                    name: '--input--transition-property'
                },
                {
                    name: '--input--transition-duration'
                },
                {
                    name: '--input--transition-timing-function'
                },
                {
                    name: '--input--transition'
                },
                {
                    name: '--input--error--border-top-width'
                },
                {
                    name: '--input--error--border-top-style'
                },
                {
                    name: '--input--error--border-top-color'
                },
                {
                    name: '--input--error--border-right-width'
                },
                {
                    name: '--input--error--border-right-style'
                },
                {
                    name: '--input--error--border-right-color'
                },
                {
                    name: '--input--error--border-bottom-width'
                },
                {
                    name: '--input--error--border-bottom-style'
                },
                {
                    name: '--input--error--border-bottom-color'
                },
                {
                    name: '--input--error--border-left-width'
                },
                {
                    name: '--input--error--border-left-style'
                },
                {
                    name: '--input--error--border-left-color'
                },
                {
                    name: '--input--error--border-width'
                },
                {
                    name: '--input--error--border-style'
                },
                {
                    name: '--input--error--border-color'
                },
                {
                    name: '--input--error--border-top'
                },
                {
                    name: '--input--error--border-right'
                },
                {
                    name: '--input--error--border-bottom'
                },
                {
                    name: '--input--error--border-left'
                },
                {
                    name: '--input--error--border'
                },
                {
                    name: '--input--placeholder--color'
                },
                {
                    name: '--input--icon--width'
                },
                {
                    name: '--input--icon--height'
                },
                {
                    name: '--input--icon--color'
                },
                {
                    name: '--input--prefix--color'
                },
                {
                    name: '--input--suffix--color'
                },
                {
                    name: '--input--background'
                },
                {
                    name: '--input--color'
                },
                {
                    name: '--input--hover--border-top-width'
                },
                {
                    name: '--input--hover--border-top-style'
                },
                {
                    name: '--input--hover--border-top-color'
                },
                {
                    name: '--input--hover--border-right-width'
                },
                {
                    name: '--input--hover--border-right-style'
                },
                {
                    name: '--input--hover--border-right-color'
                },
                {
                    name: '--input--hover--border-bottom-width'
                },
                {
                    name: '--input--hover--border-bottom-style'
                },
                {
                    name: '--input--hover--border-bottom-color'
                },
                {
                    name: '--input--hover--border-left-width'
                },
                {
                    name: '--input--hover--border-left-style'
                },
                {
                    name: '--input--hover--border-left-color'
                },
                {
                    name: '--input--hover--border-width'
                },
                {
                    name: '--input--hover--border-style'
                },
                {
                    name: '--input--hover--border-color'
                },
                {
                    name: '--input--hover--border-top'
                },
                {
                    name: '--input--hover--border-right'
                },
                {
                    name: '--input--hover--border-bottom'
                },
                {
                    name: '--input--hover--border-left'
                },
                {
                    name: '--input--hover--border'
                },
                {
                    name: '--input--focus--border-top-width'
                },
                {
                    name: '--input--focus--border-top-style'
                },
                {
                    name: '--input--focus--border-top-color'
                },
                {
                    name: '--input--focus--border-right-width'
                },
                {
                    name: '--input--focus--border-right-style'
                },
                {
                    name: '--input--focus--border-right-color'
                },
                {
                    name: '--input--focus--border-bottom-width'
                },
                {
                    name: '--input--focus--border-bottom-style'
                },
                {
                    name: '--input--focus--border-bottom-color'
                },
                {
                    name: '--input--focus--border-left-width'
                },
                {
                    name: '--input--focus--border-left-style'
                },
                {
                    name: '--input--focus--border-left-color'
                },
                {
                    name: '--input--focus--border-width'
                },
                {
                    name: '--input--focus--border-style'
                },
                {
                    name: '--input--focus--border-color'
                },
                {
                    name: '--input--focus--border-top'
                },
                {
                    name: '--input--focus--border-right'
                },
                {
                    name: '--input--focus--border-bottom'
                },
                {
                    name: '--input--focus--border-left'
                },
                {
                    name: '--input--focus--border'
                },
                {
                    name: '--input--disabled--background'
                },
                {
                    name: '--input--readonly--background'
                },
                {
                    name: '--input--border-top-left-radius'
                },
                {
                    name: '--input--border-top-right-radius'
                },
                {
                    name: '--input--border-bottom-right-radius'
                },
                {
                    name: '--input--border-bottom-left-radius'
                },
                {
                    name: '--input--border-radius'
                },
                {
                    name: '--input--font-size'
                },
                {
                    name: '--input--padding-top'
                },
                {
                    name: '--input--padding-right'
                },
                {
                    name: '--input--padding-bottom'
                },
                {
                    name: '--input--padding-left'
                },
                {
                    name: '--input--padding'
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
        css: {
            namespace: '',
            variables: [
                {
                    name: '--input--border-top-width'
                },
                {
                    name: '--input--border-top-style'
                },
                {
                    name: '--input--border-top-color'
                },
                {
                    name: '--input--border-right-width'
                },
                {
                    name: '--input--border-right-style'
                },
                {
                    name: '--input--border-right-color'
                },
                {
                    name: '--input--border-bottom-width'
                },
                {
                    name: '--input--border-bottom-style'
                },
                {
                    name: '--input--border-bottom-color'
                },
                {
                    name: '--input--border-left-width'
                },
                {
                    name: '--input--border-left-style'
                },
                {
                    name: '--input--border-left-color'
                },
                {
                    name: '--input--border-width'
                },
                {
                    name: '--input--border-style'
                },
                {
                    name: '--input--border-color'
                },
                {
                    name: '--input--border-top'
                },
                {
                    name: '--input--border-right'
                },
                {
                    name: '--input--border-bottom'
                },
                {
                    name: '--input--border-left'
                },
                {
                    name: '--input--border'
                },
                {
                    name: '--input--box-shadow-offset-x'
                },
                {
                    name: '--input--box-shadow-offset-y'
                },
                {
                    name: '--input--box-shadow-blur-radius'
                },
                {
                    name: '--input--box-shadow-spread-radius'
                },
                {
                    name: '--input--box-shadow-color'
                },
                {
                    name: '--input--box-shadow'
                },
                {
                    name: '--input--line-height'
                },
                {
                    name: '--input--transition-property'
                },
                {
                    name: '--input--transition-duration'
                },
                {
                    name: '--input--transition-timing-function'
                },
                {
                    name: '--input--transition'
                },
                {
                    name: '--input--error--border-top-width'
                },
                {
                    name: '--input--error--border-top-style'
                },
                {
                    name: '--input--error--border-top-color'
                },
                {
                    name: '--input--error--border-right-width'
                },
                {
                    name: '--input--error--border-right-style'
                },
                {
                    name: '--input--error--border-right-color'
                },
                {
                    name: '--input--error--border-bottom-width'
                },
                {
                    name: '--input--error--border-bottom-style'
                },
                {
                    name: '--input--error--border-bottom-color'
                },
                {
                    name: '--input--error--border-left-width'
                },
                {
                    name: '--input--error--border-left-style'
                },
                {
                    name: '--input--error--border-left-color'
                },
                {
                    name: '--input--error--border-width'
                },
                {
                    name: '--input--error--border-style'
                },
                {
                    name: '--input--error--border-color'
                },
                {
                    name: '--input--error--border-top'
                },
                {
                    name: '--input--error--border-right'
                },
                {
                    name: '--input--error--border-bottom'
                },
                {
                    name: '--input--error--border-left'
                },
                {
                    name: '--input--error--border'
                },
                {
                    name: '--input--placeholder--color'
                },
                {
                    name: '--input--icon--width'
                },
                {
                    name: '--input--icon--height'
                },
                {
                    name: '--input--icon--color'
                },
                {
                    name: '--input--prefix--color'
                },
                {
                    name: '--input--suffix--color'
                },
                {
                    name: '--input--background'
                },
                {
                    name: '--input--color'
                },
                {
                    name: '--input--hover--border-top-width'
                },
                {
                    name: '--input--hover--border-top-style'
                },
                {
                    name: '--input--hover--border-top-color'
                },
                {
                    name: '--input--hover--border-right-width'
                },
                {
                    name: '--input--hover--border-right-style'
                },
                {
                    name: '--input--hover--border-right-color'
                },
                {
                    name: '--input--hover--border-bottom-width'
                },
                {
                    name: '--input--hover--border-bottom-style'
                },
                {
                    name: '--input--hover--border-bottom-color'
                },
                {
                    name: '--input--hover--border-left-width'
                },
                {
                    name: '--input--hover--border-left-style'
                },
                {
                    name: '--input--hover--border-left-color'
                },
                {
                    name: '--input--hover--border-width'
                },
                {
                    name: '--input--hover--border-style'
                },
                {
                    name: '--input--hover--border-color'
                },
                {
                    name: '--input--hover--border-top'
                },
                {
                    name: '--input--hover--border-right'
                },
                {
                    name: '--input--hover--border-bottom'
                },
                {
                    name: '--input--hover--border-left'
                },
                {
                    name: '--input--hover--border'
                },
                {
                    name: '--input--focus--border-top-width'
                },
                {
                    name: '--input--focus--border-top-style'
                },
                {
                    name: '--input--focus--border-top-color'
                },
                {
                    name: '--input--focus--border-right-width'
                },
                {
                    name: '--input--focus--border-right-style'
                },
                {
                    name: '--input--focus--border-right-color'
                },
                {
                    name: '--input--focus--border-bottom-width'
                },
                {
                    name: '--input--focus--border-bottom-style'
                },
                {
                    name: '--input--focus--border-bottom-color'
                },
                {
                    name: '--input--focus--border-left-width'
                },
                {
                    name: '--input--focus--border-left-style'
                },
                {
                    name: '--input--focus--border-left-color'
                },
                {
                    name: '--input--focus--border-width'
                },
                {
                    name: '--input--focus--border-style'
                },
                {
                    name: '--input--focus--border-color'
                },
                {
                    name: '--input--focus--border-top'
                },
                {
                    name: '--input--focus--border-right'
                },
                {
                    name: '--input--focus--border-bottom'
                },
                {
                    name: '--input--focus--border-left'
                },
                {
                    name: '--input--focus--border'
                },
                {
                    name: '--input--disabled--background'
                },
                {
                    name: '--input--readonly--background'
                },
                {
                    name: '--input--border-top-left-radius'
                },
                {
                    name: '--input--border-top-right-radius'
                },
                {
                    name: '--input--border-bottom-right-radius'
                },
                {
                    name: '--input--border-bottom-left-radius'
                },
                {
                    name: '--input--border-radius'
                },
                {
                    name: '--input--font-size'
                },
                {
                    name: '--input--padding-top'
                },
                {
                    name: '--input--padding-right'
                },
                {
                    name: '--input--padding-bottom'
                },
                {
                    name: '--input--padding-left'
                },
                {
                    name: '--input--padding'
                }
            ]
        }
    }
];

export default manifest;
