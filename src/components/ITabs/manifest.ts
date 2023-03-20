import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ITabs',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the tabs'
        },
        {
            name: 'modelValue',
            type: ['String'],
            default: '',
            description: 'Used to set the currently active tab'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the tabs'
        },
        {
            name: 'stretch',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the tabs header as full width'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    slots: [
        {
            name: 'header',
            description: 'Slot for tabs header '
        },
        {
            name: 'default',
            description: 'Slot for tab components '
        }
    ],
    css: {
        selector: '.tabs',
        variables: [
            {
                name: '--tabs--header--border-color',
                value: [
                    {
                        name: '--tabs--header--border-top-color',
                        value: [
                            {
                                name: '--tabs--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--tabs--light--border-top-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--dark--border-top-color',
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
                        name: '--tabs--header--border-right-color',
                        value: [
                            {
                                name: '--tabs--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--tabs--light--border-right-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--dark--border-right-color',
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
                        name: '--tabs--header--border-bottom-color',
                        value: [
                            {
                                name: '--tabs--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--tabs--light--border-bottom-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--dark--border-bottom-color',
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
                        name: '--tabs--header--border-left-color',
                        value: [
                            {
                                name: '--tabs--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--tabs--light--border-left-color',
                                        value: [
                                            {
                                                name: '--color-light-shade-50'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--dark--border-left-color',
                                        value: [
                                            {
                                                name: '--color-dark-tint-50'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--header--border-style',
                value: [
                    {
                        name: '--tabs--header--border-top-style',
                        value: [
                            {
                                name: '--tabs--border-top-style',
                                value: [
                                    {
                                        name: '--border-top-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--border-right-style',
                        value: [
                            {
                                name: '--tabs--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--border-bottom-style',
                        value: [
                            {
                                name: '--tabs--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--border-left-style',
                        value: [
                            {
                                name: '--tabs--border-left-style',
                                value: [
                                    {
                                        name: '--border-left-style'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--header--border-width',
                value: [
                    {
                        name: '--tabs--header--border-top-width',
                        value: [
                            {
                                name: '--tabs--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--border-right-width',
                        value: [
                            {
                                name: '--tabs--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--border-bottom-width',
                        value: [
                            {
                                name: '--tabs--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--border-left-width',
                        value: [
                            {
                                name: '--tabs--border-left-width',
                                value: [
                                    {
                                        name: '--border-left-width'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--header--font-size',
                value: [
                    {
                        name: '--tabs--font-size',
                        value: [
                            {
                                name: '--font-size'
                            }
                        ],
                        variants: [
                            {
                                name: '--tabs--sm--font-size',
                                value: [
                                    {
                                        value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--tabs--md--font-size',
                                value: [
                                    {
                                        value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--tabs--lg--font-size',
                                value: [
                                    {
                                        value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--header--border-radius',
                value: [
                    {
                        name: '--tabs--border-radius',
                        value: [
                            {
                                name: '--tabs--header--border-top-left-radius',
                                value: [
                                    {
                                        name: '--tabs--border-top-left-radius',
                                        value: [
                                            {
                                                name: '--border-top-left-radius'
                                            }
                                        ],
                                        variants: [
                                            {
                                                name: '--tabs--sm--border-top-left-radius',
                                                value: [
                                                    {
                                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                                                    }
                                                ]
                                            },
                                            {
                                                name: '--tabs--md--border-top-left-radius',
                                                value: [
                                                    {
                                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                                                    }
                                                ]
                                            },
                                            {
                                                name: '--tabs--lg--border-top-left-radius',
                                                value: [
                                                    {
                                                        value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--border-top-right-radius',
                        value: [
                            {
                                name: '--tabs--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--tabs--sm--border-top-right-radius',
                                        value: [
                                            {
                                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--md--border-top-right-radius',
                                        value: [
                                            {
                                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--lg--border-top-right-radius',
                                        value: [
                                            {
                                                value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--border-bottom-right-radius',
                        value: [
                            {
                                name: '--tabs--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--tabs--sm--border-bottom-right-radius',
                                        value: [
                                            {
                                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--md--border-bottom-right-radius',
                                        value: [
                                            {
                                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--lg--border-bottom-right-radius',
                                        value: [
                                            {
                                                value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--header--border-bottom-left-radius',
                        value: [
                            {
                                name: '--tabs--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    }
                                ],
                                variants: [
                                    {
                                        name: '--tabs--sm--border-bottom-left-radius',
                                        value: [
                                            {
                                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--md--border-bottom-left-radius',
                                        value: [
                                            {
                                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                            }
                                        ]
                                    },
                                    {
                                        name: '--tabs--lg--border-bottom-left-radius',
                                        value: [
                                            {
                                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-lg))'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--header--margin-bottom',
                value: [
                    {
                        name: '--tabs--margin-bottom',
                        value: [
                            {
                                name: '--margin-bottom'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--header--color',
                value: [
                    {
                        name: '--tabs--color',
                        variants: [
                            {
                                name: '--tabs--light--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-white'
                                    }
                                ]
                            },
                            {
                                name: '--tabs--dark--color',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--header--background',
                value: [
                    {
                        name: '--tabs--background',
                        variants: [
                            {
                                name: '--tabs--light--background',
                                value: [
                                    {
                                        name: '--color-white'
                                    }
                                ]
                            },
                            {
                                name: '--tabs--dark--background',
                                value: [
                                    {
                                        name: '--color-dark'
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
