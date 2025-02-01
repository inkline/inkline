import type { ComponentManifest } from '@inkline/types';

export const FormGroupManifest: ComponentManifest = {
    name: 'FormGroup',
    props: [
        {
            name: 'color',
            type: 'light',
            description: 'The color variant of the form group',
            default: ''
        },
        {
            name: 'disabled',
            type: 'Boolean',
            description: 'The disabled state of the form group',
            default: 'false'
        },
        {
            name: 'inline',
            type: 'Boolean',
            description: 'Display the form group as inline',
            default: 'false'
        },
        {
            name: 'name',
            type: 'String',
            description: 'The identifier of the form group',
            default: ''
        },
        {
            name: 'readonly',
            type: 'Boolean',
            description: 'The readonly state of the form group',
            default: 'false'
        },
        {
            name: 'required',
            type: 'Boolean',
            description: 'The required state of the form group',
            default: 'false'
        },
        {
            name: 'size',
            type: 'sm',
            description: 'The size variant of the form group',
            default: ''
        },
        {
            name: 'shouldValidate',
            type: 'Boolean',
            description: 'Enable form validation using schema',
            default: 'true'
        },
        {
            name: 'errorCondition',
            type: 'Boolean',
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
        selector: '.form-group',
        variables: [
            {
                name: 'form-group--margin-top'
            },
            {
                name: 'form-group--margin-right'
            },
            {
                name: 'form-group--margin-bottom'
            },
            {
                name: 'form-group--margin-left'
            },
            {
                name: 'form-group--margin'
            }
        ]
    }
};
