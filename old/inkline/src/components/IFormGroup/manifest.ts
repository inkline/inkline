import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IFormGroup',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the form group'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the form group'
        },
        {
            name: 'inline',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the form group as inline'
        },
        {
            name: 'name',
            type: ['String'],
            default: '',
            description: 'The identifier of the form group'
        },
        {
            name: 'readonly',
            type: ['Boolean'],
            default: 'false',
            description: 'The readonly state of the form group'
        },
        {
            name: 'required',
            type: ['Boolean'],
            default: 'false',
            description: 'The required state of the form group'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the form group'
        },
        {
            name: 'validateSchema',
            type: ['Boolean'],
            default: 'true',
            description: 'Enable form validation using schema'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default form group content '
        }
    ],
    css: {
        selector: '.form-group',
        variables: [
            {
                name: '--form-group--adjacent--margin',
                value: [
                    {
                        name: '--form-group--adjacent--margin-top',
                        value: [
                            {
                                name: '--margin-top'
                            }
                        ]
                    },
                    {
                        name: '--form-group--adjacent--margin-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--form-group--adjacent--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--form-group--adjacent--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
