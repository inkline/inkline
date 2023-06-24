import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IRadioButtons',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the radio buttons'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the radio buttons'
        },
        {
            name: 'error',
            type: ['Boolean', 'Array'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'The error state of the checkbox, computed based on schema by default.'
        },
        {
            name: 'modelValue',
            type: [],
            default: '',
            description: 'Used to set the radio buttons value'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the radio buttons'
        },
        {
            name: 'options',
            type: ['Array'],
            default: '',
            description: 'The options to be rendered as radio buttons'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the radio buttons'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the radio buttons'
        },
        {
            name: 'validate',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable radio buttons validation using schema'
        },
        {
            name: 'variant',
            type: ['default', 'button-group'],
            default: 'default',
            description: 'The style variant of the radio buttons'
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
            description: 'Slot for rendering radio buttons options '
        }
    ],
    css: {
        selector: '.radio-buttons',
        variables: []
    }
};

export default manifest;
