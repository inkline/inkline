import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IHeader',
    props: [
        {
            name: 'color',
            type: ['primary', 'light', 'dark'],
            default: '',
            description: 'The color variant of the header'
        },
        {
            name: 'cover',
            type: ['Boolean'],
            default: 'false',
            description:
                'Display the header background as cover, always covering the whole header width or height'
        },
        {
            name: 'fluid',
            type: ['Boolean'],
            default: 'false',
            description:
                'Display the inner content container as fluid, covering 100% of the header width'
        },
        {
            name: 'fullscreen',
            type: ['Boolean'],
            default: 'true',
            description:
                'Display the header as fullscreen, covering 100% screen height and 100% screen width'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the header'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default header content '
        }
    ],
    css: {
        selector: '.header',
        variables: [
            {
                name: '--header--transition-property',
                value: [
                    {
                        value: 'background-color'
                    }
                ]
            },
            {
                name: '--header--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--header--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--header--color',
                variants: [
                    {
                        name: '--header--primary--color',
                        value: [
                            {
                                name: '--contrast-text-color-primary'
                            }
                        ]
                    },
                    {
                        name: '--header--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--header--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--header--background',
                variants: [
                    {
                        name: '--header--primary--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--header--light--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--header--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--header--padding',
                value: [
                    {
                        name: '--header--padding-top',
                        value: [
                            {
                                value: '10rem'
                            }
                        ],
                        variants: [
                            {
                                name: '--header--sm--padding-top',
                                value: [
                                    {
                                        name: '--size-multiplier-xs'
                                    }
                                ]
                            },
                            {
                                name: '--header--md--padding-top',
                                value: [
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--header--lg--padding-top',
                                value: [
                                    {
                                        name: '--size-multiplier-xl'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--header--padding-right',
                        value: [
                            {
                                value: '0'
                            }
                        ],
                        variants: [
                            {
                                name: '--header--sm--padding-right',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--header--md--padding-right',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--header--lg--padding-right',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--header--padding-bottom',
                        value: [
                            {
                                value: '10rem'
                            }
                        ],
                        variants: [
                            {
                                name: '--header--sm--padding-bottom',
                                value: [
                                    {
                                        name: '--size-multiplier-xs'
                                    }
                                ]
                            },
                            {
                                name: '--header--md--padding-bottom',
                                value: [
                                    {
                                        name: '--size-multiplier-md'
                                    }
                                ]
                            },
                            {
                                name: '--header--lg--padding-bottom',
                                value: [
                                    {
                                        name: '--size-multiplier-xl'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--header--padding-left',
                        value: [
                            {
                                value: '0'
                            }
                        ],
                        variants: [
                            {
                                name: '--header--sm--padding-left',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--header--md--padding-left',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--header--lg--padding-left',
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
        ]
    }
};

export default manifest;
