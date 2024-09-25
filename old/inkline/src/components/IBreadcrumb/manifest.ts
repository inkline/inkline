import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IBreadcrumb',
    props: [
        {
            name: 'ariaLabel',
            type: ['String'],
            default: 'Breadcrumbs',
            description: 'The aria-label of the breadcrumbs'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the breadcrumb'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the breadcrumb'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default breadcrumb content '
        }
    ],
    css: {
        selector: '.breadcrumb',
        variables: [
            {
                name: '--breadcrumb--font-size',
                value: [],
                variants: [
                    {
                        name: '--breadcrumb--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--breadcrumb--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--breadcrumb--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--breadcrumb--margin',
                value: [
                    {
                        name: '--breadcrumb--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--breadcrumb--margin-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--breadcrumb--margin-bottom',
                        value: [
                            {
                                name: '--margin-bottom'
                            }
                        ]
                    },
                    {
                        name: '--breadcrumb--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--breadcrumb--padding',
                value: [
                    {
                        name: '--breadcrumb--padding-top',
                        value: []
                    },
                    {
                        name: '--breadcrumb--padding-right',
                        value: []
                    },
                    {
                        name: '--breadcrumb--padding-bottom',
                        value: []
                    },
                    {
                        name: '--breadcrumb--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--breadcrumb--sm--padding',
                        value: [
                            {
                                name: '--breadcrumb--sm--padding-top',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--breadcrumb--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--breadcrumb--sm--padding-bottom',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--breadcrumb--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--breadcrumb--md--padding',
                        value: [
                            {
                                name: '--breadcrumb--md--padding-top',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--breadcrumb--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--breadcrumb--md--padding-bottom',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--breadcrumb--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--breadcrumb--lg--padding',
                        value: [
                            {
                                name: '--breadcrumb--lg--padding-top',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--breadcrumb--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--breadcrumb--lg--padding-bottom',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--breadcrumb--lg--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
