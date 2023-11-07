import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ICheckableButtonGroup',
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
                variants: [
                    {
                        name: '--checkable-button-group--light--background',
                        value: [
                            {
                                name: '--color-light-tint-100'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--dark--background',
                        value: [
                            {
                                name: '--color-dark-shade-100'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--color',
                variants: [
                    {
                        name: '--checkable-button-group--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
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
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--dark--border-left-color',
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
                name: '--checkable-button-group--border-radius',
                value: [
                    {
                        name: '--checkable-button-group--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--sm--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--sm--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--box-shadow',
                value: [
                    {
                        name: '--checkable-button-group--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
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
                        value: [
                            {
                                name: '--padding-top-1-2'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) * var(--size-multiplier-sm)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) * var(--size-multiplier-md)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) * var(--size-multiplier-lg)) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--padding-right',
                        value: [
                            {
                                name: '--padding-right-1-2'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--sm--padding-right',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-right) * var(--size-multiplier-sm)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--padding-right',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-right) * var(--size-multiplier-md)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--padding-right',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-right) * var(--size-multiplier-lg)) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom-1-2'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-bottom) * var(--size-multiplier-sm)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-bottom) * var(--size-multiplier-md)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-bottom) * var(--size-multiplier-lg)) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--checkable-button-group--padding-left',
                        value: [
                            {
                                name: '--padding-left-1-2'
                            }
                        ],
                        variants: [
                            {
                                name: '--checkable-button-group--sm--padding-left',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-left) * var(--size-multiplier-sm)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--md--padding-left',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-left) * var(--size-multiplier-md)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--checkable-button-group--lg--padding-left',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-left) * var(--size-multiplier-lg)) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--checkable-button-group--transition-property',
                value: [
                    {
                        value: '(background-color, border-color)'
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
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--checkable-button-group--gap',
                value: [
                    {
                        name: '--margin-right-1-2'
                    }
                ]
            },
            {
                name: '--checkable-button-group--button--active--background',
                value: [
                    {
                        name: '--button--background'
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
                name: '--checkable-button-group--button--border-color',
                value: [
                    {
                        value: 'transparent'
                    }
                ]
            },
            {
                name: '--checkable-button-group--button--box-shadow',
                value: [
                    {
                        value: 'none'
                    }
                ]
            },
            {
                name: '--button--border-top-color'
            }
        ]
    }
};

export default manifest;
