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
                name: '--form-label--color',
                value: []
            },
            {
                name: '--form-label--transition',
                value: [
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
                    }
                ]
            },
            {
                name: '--form-label--font-size',
                value: [],
                variants: [
                    {
                        name: '--form-label--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--form-label--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--form-label--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
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
                        name: '--form-label--required--color-h',
                        value: [
                            {
                                name: '--color-danger-h'
                            }
                        ]
                    },
                    {
                        name: '--form-label--required--color-s',
                        value: [
                            {
                                name: '--color-danger-s'
                            }
                        ]
                    },
                    {
                        name: '--form-label--required--color-l',
                        value: [
                            {
                                name: '--color-danger-l'
                            }
                        ]
                    },
                    {
                        name: '--form-label--required--color-a',
                        value: [
                            {
                                name: '--color-danger-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--form-label--error--color',
                value: [
                    {
                        name: '--form-label--error--color-h',
                        value: [
                            {
                                name: '--color-danger-h'
                            }
                        ]
                    },
                    {
                        name: '--form-label--error--color-s',
                        value: [
                            {
                                name: '--color-danger-s'
                            }
                        ]
                    },
                    {
                        name: '--form-label--error--color-l',
                        value: [
                            {
                                name: '--color-danger-l'
                            }
                        ]
                    },
                    {
                        name: '--form-label--error--color-a',
                        value: [
                            {
                                name: '--color-danger-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--form-label--inline--margin',
                value: [
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
        ]
    }
};

export default manifest;
