import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'Progress',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the progress component'
        },
        {
            name: 'min',
            type: ['Number'],
            default: '0',
            description: 'The value to consider as the 0% starting point'
        },
        {
            name: 'max',
            type: ['Number'],
            default: '100',
            description: 'The value to consider as the 100% ending point'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the progress component'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for progress bars '
        }
    ],
    css: {
        selector: '.progress',
        variables: [
            {
                name: '--progress--background',
                value: [
                    {
                        name: '--progress--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--progress--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--progress--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--progress--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--progress--light--background',
                        value: [
                            {
                                name: '--progress--light--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress--light--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress--light--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress--light--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress--dark--background',
                        value: [
                            {
                                name: '--progress--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress--dark--background-a',
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
                name: '--progress--border-radius',
                value: [
                    {
                        name: '--progress--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--progress--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--progress--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--progress--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--progress--sm--border-radius',
                        value: [
                            {
                                name: '--progress--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--progress--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--progress--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--progress--sm--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--progress--md--border-radius',
                        value: [
                            {
                                name: '--progress--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--progress--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--progress--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--progress--md--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--progress--lg--border-radius',
                        value: [
                            {
                                name: '--progress--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--progress--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--progress--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--progress--lg--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--progress--border-width',
                value: [
                    {
                        name: '--progress--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--progress--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--progress--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--progress--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--progress--border-style',
                value: [
                    {
                        name: '--progress--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--progress--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--progress--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--progress--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--progress--border-color',
                value: [
                    {
                        name: '--progress--border-top-color',
                        value: []
                    },
                    {
                        name: '--progress--border-right-color',
                        value: []
                    },
                    {
                        name: '--progress--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--progress--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--progress--light--border-color',
                        value: [
                            {
                                name: '--progress--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--progress--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--progress--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--progress--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress--dark--border-color',
                        value: [
                            {
                                name: '--progress--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--progress--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--progress--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--progress--dark--border-left-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--progress--box-shadow',
                value: []
            },
            {
                name: '--progress--height',
                value: [],
                variants: [
                    {
                        name: '--progress--sm--height',
                        value: [
                            {
                                value: 'calc(0.75rem * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--progress--md--height',
                        value: [
                            {
                                value: 'calc(0.75rem * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--progress--lg--height',
                        value: [
                            {
                                value: 'calc(0.75rem * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--progress--transition',
                value: [
                    {
                        name: '--progress--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--progress--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--progress--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    },
                    {
                        name: '--progress--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--progress--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--progress--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
