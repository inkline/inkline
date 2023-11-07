import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IFormError',
    props: [
        {
            name: 'for',
            type: ['String'],
            default: '',
            description: 'The schema path of the target input to show the errors for.'
        },
        {
            name: 'visible',
            type: ['Array', 'String'],
            default: "'touched', 'dirty', 'invalid'",
            description: 'Set the validation statuses for which the form error should be visible.'
        }
    ],
    events: [],
    slots: [],
    css: {
        selector: '.form-error',
        variables: [
            {
                name: '--form-error--margin',
                value: [
                    {
                        name: '--form-error--margin-top',
                        value: [
                            {
                                name: '--margin-top-1-4'
                            }
                        ]
                    },
                    {
                        name: '--form-error--margin-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--form-error--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--form-error--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--form-error--color',
                value: [
                    {
                        name: '--color-danger'
                    }
                ]
            },
            {
                name: '--form-error-font-size',
                value: [
                    {
                        name: '--font-size-sm'
                    }
                ]
            }
        ]
    }
};

export default manifest;
