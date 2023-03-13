import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IDropdownItem',
    props: [
        {
            name: 'active',
            type: ['Boolean'],
            default: 'false',
            description: 'The active state of the dropdown item'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the dropdown item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'plaintext',
            type: ['String'],
            default: 'div',
            description: 'Display the dropdown item as plaintext'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the dropdown item'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the list group item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as a Router Link component with a `to` attribute'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default dropdown item content '
        }
    ],
    css: {
        selector: '.dropdown',
        variables: [
            {
                name: '--dropdown--item--margin',
                value: [
                    {
                        name: '--dropdown--item--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--margin-right',
                        value: [
                            {
                                name: '--dropdown--body--padding-right',
                                value: [
                                    {
                                        name: '--dropdown--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--margin-left',
                        value: [
                            {
                                name: '--dropdown--body--padding-left',
                                value: [
                                    {
                                        name: '--dropdown--padding-left'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--item--transition-property',
                value: [
                    {
                        value: '(background-color, border-color, color)'
                    }
                ]
            },
            {
                name: '--dropdown--item--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--dropdown--item--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--dropdown--item--color',
                value: [
                    {
                        name: '--dropdown--color'
                    }
                ]
            },
            {
                name: '--dropdown--item--border-style',
                value: [
                    {
                        name: '--dropdown--border-style',
                        value: [
                            {
                                name: '--dropdown--item--border-top-style',
                                value: [
                                    {
                                        name: '--dropdown--border-top-style',
                                        value: [
                                            {
                                                name: '--border-top-style'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-right-style',
                        value: [
                            {
                                name: '--dropdown--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-bottom-style',
                        value: [
                            {
                                name: '--dropdown--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-left-style',
                        value: [
                            {
                                name: '--dropdown--border-left-style',
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
                name: '--dropdown--item--border-width',
                value: [
                    {
                        name: '--dropdown--item--border-top-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-right-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-bottom-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-left-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--item--border-color',
                value: [
                    {
                        name: '--dropdown--border-color',
                        value: [
                            {
                                name: '--dropdown--item--border-top-color',
                                value: [
                                    {
                                        name: '--dropdown--border-top-color',
                                        value: [
                                            {
                                                name: '--border-top-color'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-right-color',
                        value: [
                            {
                                name: '--dropdown--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-bottom-color',
                        value: [
                            {
                                name: '--dropdown--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-left-color',
                        value: [
                            {
                                name: '--dropdown--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--item--padding',
                value: [
                    {
                        name: '--dropdown--padding',
                        value: [
                            {
                                name: '--dropdown--item--padding-top',
                                value: [
                                    {
                                        name: '--dropdown--padding-top',
                                        value: [
                                            {
                                                name: '--padding-top'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--padding-right',
                        value: [
                            {
                                name: '--dropdown--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--padding-bottom',
                        value: [
                            {
                                name: '--dropdown--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--padding-left',
                        value: [
                            {
                                name: '--dropdown--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--item--background',
                value: [
                    {
                        name: '--dropdown--background',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--item--hover--color',
                value: [
                    {
                        name: '--dropdown--item--color'
                    }
                ]
            },
            {
                name: '--dropdown--item--hover--background',
                value: [
                    {
                        name: '--dropdown--item--background'
                    }
                ]
            },
            {
                name: '--dropdown--item--disabled--color',
                value: [
                    {
                        name: '--dropdown--item--color'
                    }
                ]
            },
            {
                name: '--dropdown--item--disabled--background',
                value: [
                    {
                        name: '--dropdown--item--background'
                    }
                ]
            },
            {
                name: '--dropdown--item--active--color',
                value: [
                    {
                        name: '--dropdown--item--color'
                    }
                ]
            },
            {
                name: '--dropdown--item--active--background',
                value: [
                    {
                        name: '--dropdown--item--background'
                    }
                ]
            },
            {
                name: '--dropdown--item--active--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            }
        ]
    }
};

export default manifest;
