import type { ComponentManifest } from '@inkline/types';

export const FormManifest: ComponentManifest = {
    name: 'Form',
    props: [
        {
            name: 'color',
            type: 'light',
            description: 'The color variant of the form',
            default: ''
        },
        {
            name: 'disabled',
            type: 'Boolean',
            description: 'The disabled state of the form',
            default: 'false'
        },
        {
            name: 'inline',
            type: 'Boolean',
            description: 'Display the form as inline',
            default: 'false'
        },
        {
            name: 'loading',
            type: 'Boolean',
            description: 'The loading state of the form',
            default: 'false'
        },
        {
            name: 'name',
            type: 'String',
            description: 'The unique identifier of the form',
            default: 'undefined'
        },
        {
            name: 'modelValue',
            type: 'Boolean',
            description: 'Used to set the form schema',
            default: 'false'
        },
        {
            name: 'readonly',
            type: 'Boolean',
            description: 'The readonly state of the form',
            default: 'false'
        },
        {
            name: 'sizeMultiplier',
            type: 'sm',
            description: 'The size variant of the form',
            default: ''
        },
        {
            name: 'shouldValidate',
            type: 'Boolean',
            description: 'Enable form validation using schema',
            default: 'true'
        },
        {
            name: 'validateOn',
            type: 'Array',
            description: 'The events to validate the form on',
            default: 'undefined'
        },
        {
            name: 'errorCondition',
            type: 'Boolean',
            description: 'The error state of the input, computed based on schema by default.',
            default: "'touched', 'dirty', 'invalid'"
        }
    ],
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue schema'
        },
        {
            name: 'submit',
            description: 'Event emitted for submitting the form'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for form content'
        }
    ],
    css: {
        selector: '.',
        variables: []
    }
};
