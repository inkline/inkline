import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Form',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the form',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the form',
                default: 'false'
            },
            {
                name: 'inline',
                type: 'boolean',
                description: 'Display the form as inline',
                default: 'false'
            },
            {
                name: 'loading',
                type: 'boolean',
                description: 'The loading state of the form',
                default: 'false'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The unique identifier of the form',
                default: 'undefined'
            },
            {
                name: 'modelValue',
                type: 'boolean',
                description: 'Used to set the form schema',
                default: 'false'
            },
            {
                name: 'readonly',
                type: 'boolean',
                description: 'The readonly state of the form',
                default: 'false'
            },
            {
                name: 'sizeMultiplier',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the form',
                default: ''
            },
            {
                name: 'shouldValidate',
                type: 'boolean',
                description: 'Enable form validation using schema',
                default: 'true'
            },
            {
                name: 'validateOn',
                type: 'Array | number',
                description: 'The events to validate the form on',
                default: 'undefined'
            },
            {
                name: 'errorCondition',
                type: 'boolean | Array',
                description: 'The error state of the input, computed based on schema by default.',
                default: "'touched', 'dirty', 'invalid'"
            }
        ],
        events: [
            {
                name: 'Form',
                description: 'Event emitted for setting the modelValue schema'
            },
            {
                name: 'Form',
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
            namespace: '',
            variables: []
        }
    }
];

export default manifest;
