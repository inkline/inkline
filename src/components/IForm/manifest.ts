import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IForm',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the form'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the form'
        },
        {
            name: 'inline',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the form as inline'
        },
        {
            name: 'loading',
            type: ['Boolean'],
            default: 'false',
            description: 'The loading state of the form'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'undefined',
            description: 'The unique identifier of the form'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to set the form schema'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the form'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the form'
        },
        {
            name: 'validate',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable form validation using schema'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue schema',
            name: 'update:modelValue'
        },
        {
            description: 'Event emitted for submitting the form',
            name: 'submit'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for form content '
        }
    ],
    css: {
        selector: '.form',
        variables: []
    }
};

export default manifest;
