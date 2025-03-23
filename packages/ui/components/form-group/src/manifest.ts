import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'FormGroup',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the form group',
                default: ''
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the form group',
                default: 'false'
            },
            {
                name: 'inline',
                type: 'boolean',
                description: 'Display the form group as inline',
                default: 'false'
            },
            {
                name: 'name',
                type: 'string',
                description: 'The identifier of the form group',
                default: ''
            },
            {
                name: 'readonly',
                type: 'boolean',
                description: 'The readonly state of the form group',
                default: 'false'
            },
            {
                name: 'required',
                type: 'boolean',
                description: 'The required state of the form group',
                default: 'false'
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the form group',
                default: ''
            },
            {
                name: 'shouldValidate',
                type: 'boolean',
                description: 'Enable form validation using schema',
                default: 'true'
            },
            {
                name: 'errorCondition',
                type: 'boolean | Array',
                description: 'The error state of the input, computed based on schema by default.',
                default: 'undefined'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default form group content'
            }
        ],
        css: {
            namespace: 'form-group',
            variables: [
                {
                    name: '--form-group--margin-top',
                    value: '0'
                },
                {
                    name: '--form-group--margin-right',
                    value: '0'
                },
                {
                    name: '--form-group--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--form-group--margin-left',
                    value: '0'
                },
                {
                    name: '--form-group--margin',
                    value: 'var(--form-group--margin-top) var(--form-group--margin-right) var(--form-group--margin-bottom) var(--form-group--margin-left)'
                }
            ]
        }
    }
];

export default manifest;
