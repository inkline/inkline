import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Header',
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
                name: '--header--background',
                value: [
                    {
                        name: '--header--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--header--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--header--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--header--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--header--primary--background',
                        value: [
                            {
                                name: '--header--primary--background-h',
                                value: [
                                    {
                                        name: '--color-primary-h'
                                    }
                                ]
                            },
                            {
                                name: '--header--primary--background-s',
                                value: [
                                    {
                                        name: '--color-primary-s'
                                    }
                                ]
                            },
                            {
                                name: '--header--primary--background-l',
                                value: [
                                    {
                                        name: '--color-primary-l'
                                    }
                                ]
                            },
                            {
                                name: '--header--primary--background-a',
                                value: [
                                    {
                                        name: '--color-primary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--header--light--background',
                        value: [
                            {
                                name: '--header--light--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--header--light--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--header--light--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--header--light--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--header--dark--background',
                        value: [
                            {
                                name: '--header--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--header--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--header--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--header--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--header--color',
                value: [
                    {
                        name: '--header--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--header--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--header--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--header--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--header--primary--color',
                        value: [
                            {
                                name: '--header--primary--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--header--primary--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--header--primary--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--header--primary--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--header--light--color',
                        value: [
                            {
                                name: '--header--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--header--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--header--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--header--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--header--dark--color',
                        value: [
                            {
                                name: '--header--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--header--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--header--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--header--dark--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--header--transition',
                value: [
                    {
                        name: '--header--transition-property',
                        value: [
                            {
                                value: 'background-color, color'
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
                        name: '--header--transition-property',
                        value: [
                            {
                                value: 'background-color, color'
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
                    }
                ]
            },
            {
                name: '--header--padding',
                value: [
                    {
                        name: '--header--padding-top',
                        value: []
                    },
                    {
                        name: '--header--padding-right',
                        value: []
                    },
                    {
                        name: '--header--padding-bottom',
                        value: []
                    },
                    {
                        name: '--header--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--header--sm--padding',
                        value: [
                            {
                                name: '--header--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(10rem * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--header--sm--padding-right',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            },
                            {
                                name: '--header--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(10rem * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--header--sm--padding-left',
                                value: [
                                    {
                                        value: '0'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--header--md--padding',
                        value: [
                            {
                                name: '--header--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(10rem * var(--size-multiplier-md))'
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
                                name: '--header--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(10rem * var(--size-multiplier-md))'
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
                            }
                        ]
                    },
                    {
                        name: '--header--lg--padding',
                        value: [
                            {
                                name: '--header--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(10rem * var(--size-multiplier-lg))'
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
                            },
                            {
                                name: '--header--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(10rem * var(--size-multiplier-lg))'
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
