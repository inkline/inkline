import type { ComponentManifest } from '@inkline/devtools';

export const manifest: ComponentManifest = {
    name: 'Card',
    props: [
        {
            name: 'color',
            type: ['primary', 'success', 'light', 'dark', 'info', 'success', 'warning', 'danger'],
            default: '',
            description: 'The color variant of the card'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the card'
        },
        {
            name: 'tag',
            type: [],
            default: 'div',
            description: 'The HTML tag to use for the card root element'
        }
    ],
    events: [],
    slots: [
        {
            name: 'header',
            description: 'Slot for card header content '
        },
        {
            name: 'image',
            description: 'Slot for card image '
        },
        {
            name: 'default',
            description: 'Slot for card header content '
        },
        {
            name: 'footer',
            description: 'Slot for card footer content '
        }
    ],
    css: {
        selector: '.card',
        variables: [
            {
                name: '--card--border-radius',
                value: [
                    {
                        name: '--card--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--card--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--card--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--card--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--card--sm--border-radius',
                        value: [
                            {
                                name: '--card--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--card--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--card--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--card--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--md--border-radius',
                        value: [
                            {
                                name: '--card--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--card--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--card--md--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--card--lg--border-radius',
                        value: [
                            {
                                name: '--card--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--card--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--card--lg--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--box-shadow',
                value: []
            },
            {
                name: '--card--font-size',
                value: [],
                variants: [
                    {
                        name: '--card--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--card--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--card--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--transition',
                value: [
                    {
                        name: '--card--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--card--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--card--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    },
                    {
                        name: '--card--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--card--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--card--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--card--header--border-width',
                value: []
            },
            {
                name: '--card--header--border-style',
                value: []
            },
            {
                name: '--card--header--border-color',
                value: []
            },
            {
                name: '--card--header--background',
                value: []
            },
            {
                name: '--card--header--color',
                value: []
            },
            {
                name: '--card--header--padding',
                value: []
            },
            {
                name: '--card--header--transition',
                value: [
                    {
                        name: '--card--header--transition-property'
                    },
                    {
                        name: '--card--header--transition-duration'
                    },
                    {
                        name: '--card--header--transition-timing-function'
                    }
                ]
            },
            {
                name: '--card--header--border-radius',
                value: [
                    {
                        name: '--card--header--border-top-left-radius'
                    },
                    {
                        name: '--card--header--border-top-right-radius'
                    }
                ]
            },
            {
                name: '--card--body--border-radius',
                value: []
            },
            {
                name: '--card--body--border-width',
                value: []
            },
            {
                name: '--card--body--border-style',
                value: []
            },
            {
                name: '--card--body--border-color',
                value: []
            },
            {
                name: '--card--body--background',
                value: []
            },
            {
                name: '--card--body--color',
                value: []
            },
            {
                name: '--card--body--padding',
                value: []
            },
            {
                name: '--card--body--transition',
                value: [
                    {
                        name: '--card--body--transition-property'
                    },
                    {
                        name: '--card--body--transition-duration'
                    },
                    {
                        name: '--card--body--transition-timing-function'
                    }
                ]
            },
            {
                name: '--card--footer--border-radius',
                value: [
                    {
                        name: '--card--footer--border-bottom-left-radius'
                    },
                    {
                        name: '--card--footer--border-bottom-right-radius'
                    }
                ]
            },
            {
                name: '--card--footer--border-width',
                value: []
            },
            {
                name: '--card--footer--border-style',
                value: []
            },
            {
                name: '--card--footer--border-color',
                value: []
            },
            {
                name: '--card--footer--background',
                value: []
            },
            {
                name: '--card--footer--color',
                value: []
            },
            {
                name: '--card--footer--padding',
                value: []
            },
            {
                name: '--card--footer--transition',
                value: [
                    {
                        name: '--card--footer--transition-property'
                    },
                    {
                        name: '--card--footer--transition-duration'
                    },
                    {
                        name: '--card--footer--transition-timing-function'
                    }
                ]
            },
            {
                name: '--card--img--border-radius',
                value: [
                    {
                        name: '--card--img--border-top-left-radius'
                    },
                    {
                        name: '--card--img--border-top-right-radius'
                    }
                ]
            },
            {
                name: '--card--list-group--border-radius',
                value: [
                    {
                        name: '--card--list-group--border-top-left-radius'
                    },
                    {
                        name: '--card--list-group--border-top-right-radius'
                    },
                    {
                        name: '--card--list-group--border-bottom-left-radius'
                    },
                    {
                        name: '--card--list-group--border-bottom-right-radius'
                    }
                ]
            }
        ]
    }
};

export default manifest;
