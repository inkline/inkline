import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'INumberInput',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the input'
        },
        {
            name: 'clearable',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the input as clearable'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the input'
        },
        {
            name: 'error',
            type: ['Boolean', 'Array'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'The error state of the checkbox, computed based on schema by default.'
        },
        {
            name: 'id',
            type: ['String'],
            default: '',
            description: 'The id of the internal input element'
        },
        {
            name: 'modelValue',
            type: ['String', 'Number'],
            default: '',
            description: 'Used to set the field value'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the input'
        },
        {
            name: 'plaintext',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the input as plaintext, disabling interaction'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the input'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the input'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the input'
        },
        {
            name: 'min',
            type: ['Number'],
            default: '-Infinity',
            description: 'The minimum allowed input value'
        },
        {
            name: 'max',
            type: ['Number'],
            default: '+Infinity',
            description: 'The maximum allowed input value'
        },
        {
            name: 'precision',
            type: ['Number'],
            default: '0',
            description: 'The precision of the input value, for floating point numbers'
        },
        {
            name: 'step',
            type: ['Number'],
            default: '1',
            description: 'The increment step to increase or decrease the value by'
        },
        {
            name: 'clearAriaLabel',
            type: ['String'],
            default: 'Clear',
            description: 'The aria-label of the clear button'
        },
        {
            name: 'validate',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable number input validation using schema'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        },
        {
            description: 'Event emitted when clearing the input element',
            name: 'clear'
        }
    ],
    slots: [
        {
            name: 'prepend',
            description: 'Slot for the input prepend content '
        },
        {
            name: 'prefix',
            description: 'Slot for the input prefix content '
        },
        {
            name: 'clearable',
            description: 'Slot for the clearable button '
        },
        {
            name: 'suffix',
            description: 'Slot for the input suffix content '
        },
        {
            name: 'append',
            description: 'Slot for the input append content '
        }
    ],
    css: {
        selector: '',
        variables: []
    }
};

export default manifest;
