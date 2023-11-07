import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IFormLabel',
    props: [
        {
            name: 'for',
            type: ['String'],
            default: '',
            description:
                'The id of the target input to be focused by the form label. If left empty, clicking the form label will focus the next sibling input'
        },
        {
            name: 'placement',
            type: ['left', 'right'],
            default: 'left',
            description: 'The placement of the form label'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the form label'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default form label content  '
        }
    ],
    css: {
        selector: '.form-label',
        variables: [
            {
                name: '--form-label--transition-property',
                value: [
                    {
                        value: 'color'
                    }
                ]
            },
            {
                name: '--form-label--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--form-label--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--form-label--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--form-label--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--form-label--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--form-label--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--form-label--margin',
                value: [
                    {
                        name: '--form-label--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--form-label--margin-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--form-label--margin-bottom',
                        value: [
                            {
                                name: '--margin-bottom-1-4'
                            }
                        ]
                    },
                    {
                        name: '--form-label--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--form-label--required--color',
                value: [
                    {
                        name: '--color-danger'
                    }
                ]
            },
            {
                name: '--form-label--error--color',
                value: [
                    {
                        name: '--color-danger'
                    }
                ]
            },
            {
                name: '--form-label--inline--margin-right',
                value: [
                    {
                        name: '--margin-right'
                    }
                ]
            },
            {
                name: '--form-label--inline--margin-left',
                value: [
                    {
                        name: '--margin-left'
                    }
                ]
            }
        ]
    }
};

export default manifest;
