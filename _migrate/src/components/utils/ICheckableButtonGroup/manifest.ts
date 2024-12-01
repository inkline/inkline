import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'CheckableButtonGroup',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the checkable buttons'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the checkable buttons'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The type of the checkable buttons'
        },
        {
            name: 'variant',
            type: ['default', 'group'],
            default: 'default',
            description: 'The style variant of the checkable buttons'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default content '
        }
    ],
    css: {
        selector: '.checkable-button-group',
        variables: [
            {
                name: '--checkable-button-group--background',
                value: [
                    {
                        name: '--checkable-button-group--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--checkable-button-group--light--background',
                        value: [
                            {
                                name: '--checkable-button-group--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--dark--background',
                        value: [
                            {
                                name: '--checkable-button-group--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--dark--button--active--background',
                        value: [
                            {
                                name: '--checkable-button-group--dark--button--active--background-h',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--dark--button--active--background-s',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--dark--button--active--background-l',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--dark--button--active--background-a',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--border-style',
                value: [
                    {
                        name: '--checkable-button-group--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--border-width',
                value: [
                    {
                        name: '--checkable-button-group--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--border-color',
                value: [
                    {
                        name: '--checkable-button-group--border-top-color',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--border-right-color',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--checkable-button-group--light--border-color',
                        value: [
                            {
                                name: '--checkable-button-group--light--border-top-color',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--light--border-right-color',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--light--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--light--border-left-color',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--dark--border-color',
                        value: [
                            {
                                name: '--checkable-button-group--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--border-right-color',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--dark--border-bottom-color',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--dark--border-left-color',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--border-radius',
                value: [
                    {
                        name: '--checkable-button-group--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--checkable-button-group--sm--border-radius',
                        value: [
                            {
                                name: '--checkable-button-group--sm--border-top-left-radius',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--sm--border-top-right-radius',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--sm--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--md--border-radius',
                        value: [
                            {
                                name: '--checkable-button-group--md--border-top-left-radius',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--md--border-top-right-radius',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--md--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--lg--border-radius',
                        value: [
                            {
                                name: '--checkable-button-group--lg--border-top-left-radius',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--lg--border-top-right-radius',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--lg--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--box-shadow',
                value: []
            },
            {
                name: '--checkable-button-group--color',
                value: [
                    {
                        name: '--checkable-button-group--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--checkable-button-group--light--color',
                        value: [
                            {
                                name: '--checkable-button-group--light--color-h',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--light--color-s',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--light--color-l',
                                value: []
                            },
                            {
                                name: '--checkable-button-group--light--color-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--dark--color',
                        value: [
                            {
                                name: '--checkable-button-group--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--color-a',
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
                name: '--checkable-button-group--padding',
                value: [
                    {
                        name: '--checkable-button-group--padding-top',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--padding-right',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--padding-bottom',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--checkable-button-group--sm--padding',
                        value: [
                            {
                                name: '--checkable-button-group--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-top-sm) * 0.5\n    )'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--sm--padding-right',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-right-sm) * 0.5\n    )'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-bottom-sm) * 0.5\n    )'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--sm--padding-left',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-left-sm) * 0.5\n    )'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--md--padding',
                        value: [
                            {
                                name: '--checkable-button-group--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-top-md) * 0.5\n    )'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--padding-right',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-right-md) * 0.5\n    )'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-bottom-md) * 0.5\n    )'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--padding-left',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-left-md) * 0.5\n    )'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--lg--padding',
                        value: [
                            {
                                name: '--checkable-button-group--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-top-lg) * 0.5\n    )'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--padding-right',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-right-lg) * 0.5\n    )'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-bottom-lg) * 0.5\n    )'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--padding-left',
                                value: [
                                    {
                                        value: 'calc(\n      var(--padding-left-lg) * 0.5\n    )'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--transition',
                value: [
                    {
                        name: '--checkable-button-group--transition-property',
                        value: [
                            {
                                value: 'background-color, color,\n      border-color'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--transition-timing-function',
                        value: []
                    },
                    {
                        name: '--checkable-button-group--transition-property',
                        value: [
                            {
                                value: 'background-color, color,\n      border-color'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--transition-timing-function',
                        value: []
                    }
                ]
            },
            {
                name: '--checkable-button-group--button--background',
                value: [
                    {
                        value: 'transparent'
                    }
                ]
            },
            {
                name: '--checkable-button-group--button--border-width',
                value: []
            },
            {
                name: '--checkable-button-group--button--border-style',
                value: []
            },
            {
                name: '--checkable-button-group--button--border-color',
                value: [
                    {
                        name: '--checkable-button-group--button--border-top-color',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--button--border-right-color',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--button--border-bottom-color',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--button--border-left-color',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--button--color',
                value: []
            },
            {
                name: '--checkable-button-group--gap',
                value: [
                    {
                        value: 'calc(var(--margin-right) * 0.5)'
                    }
                ],
                variants: [
                    {
                        name: '--checkable-button-group--sm--gap',
                        value: [
                            {
                                value: 'calc(var(--margin-right-sm) * 0.5)'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--md--gap',
                        value: [
                            {
                                value: 'calc(var(--margin-right-md) * 0.5)'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--lg--gap',
                        value: [
                            {
                                value: 'calc(var(--margin-right-lg) * 0.5)'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--button--active--background',
                value: []
            },
            {
                name: '--checkable-button-group--button--hover--background',
                value: []
            },
            {
                name: '--checkable-button-group--button--hover--border-color',
                value: []
            },
            {
                name: '--checkable-button-group--button--focus--background',
                value: []
            },
            {
                name: '--checkable-button-group--button--focus--border-color',
                value: []
            }
        ]
    }
};

export default manifest;
