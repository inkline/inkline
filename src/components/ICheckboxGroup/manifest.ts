import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ICheckboxGroup',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the checkbox group'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the checkbox group'
        },
        {
            name: 'error',
            type: ['Boolean', 'Array'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'The error state of the checkbox, computed based on schema by default.'
        },
        {
            name: 'inline',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the checkbox group as inline'
        },
        {
            name: 'indeterminate',
            type: ['Boolean'],
            default: 'false',
            description: 'The indeterminate state of the checkbox group'
        },
        {
            name: 'modelValue',
            type: [],
            default: '',
            description: 'Used to set the checkbox group value'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The unique identifier of the checkbox group'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the checkbox group'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the checkbox group'
        },
        {
            name: 'validateSchema',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable checkbox group validation using schema'
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
            description: 'Slot for default checkbox group options '
        }
    ],
    css: {
        selector: '.checkbox-group',
        variables: []
    }
};

export default manifest;
