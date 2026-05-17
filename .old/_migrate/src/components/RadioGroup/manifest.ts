import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'RadioGroup',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the radio group'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the radio group'
        },
        {
            name: 'error',
            type: ['Boolean', 'Array'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'The error state of the radio, computed based on schema by default.'
        },
        {
            name: 'inline',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the radio group as inline'
        },
        {
            name: 'indeterminate',
            type: ['Boolean'],
            default: 'false',
            description: 'The indeterminate state of the radio group'
        },
        {
            name: 'label',
            type: ['String', 'Number', 'Boolean', 'Function', 'Object'],
            default: 'undefined',
            description:
                'The fallback label of the radio group. Can be a string, number, render function, or component'
        },
        {
            name: 'modelValue',
            type: [],
            default: '',
            description: 'Used to set the radio group value'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the radio group'
        },
        {
            name: 'native',
            type: ['Boolean'],
            default: 'false',
            description: 'Displays the native browser radio input indicator'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the radio group'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the radio group'
        },
        {
            name: 'validateSchema',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable radio group validation using schema'
        },
        {
            name: 'options',
            type: ['Array'],
            default: '',
            description: 'The options of the checkbox group'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for default radio group options '
        }
    ],
    css: {
        selector: '.radio-group',
        variables: []
    }
};

export default manifest;
