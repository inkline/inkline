import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ITab',
    props: [
        {
            name: 'title',
            type: ['String'],
            default: '',
            description: 'The title of the tab'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The name of the tab, used as an identifier'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for tab content '
        }
    ],
    css: {
        selector: '.tabs',
        variables: [
            {
                name: '--tabs--tab--transition-property',
                value: [
                    {
                        name: '--tabs--transition-property',
                        value: [
                            {
                                value: 'background-color, border-color, color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--tab--transition-duration',
                value: [
                    {
                        name: '--tabs--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--tab--transition-timing-function',
                value: [
                    {
                        name: '--tabs--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--tab--color',
                value: [
                    {
                        name: '--tabs--color'
                    }
                ]
            },
            {
                name: '--tabs--tab--background',
                value: [
                    {
                        name: '--tabs--background'
                    }
                ]
            },
            {
                name: '--tabs--tab--border-color',
                value: [
                    {
                        name: '--tabs--tab--border-top-color',
                        value: [
                            {
                                name: '--tabs--border-top-color',
                                value: [
                                    {
                                        name: '--border-top-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--tab--border-right-color',
                        value: [
                            {
                                name: '--tabs--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--tab--border-bottom-color',
                        value: [
                            {
                                name: '--tabs--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--tab--border-left-color',
                        value: [
                            {
                                name: '--tabs--border-left-color',
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
                name: '--tabs--tab--border-style',
                value: [
                    {
                        name: '--tabs--tab--border-top-style',
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
                        name: '--tabs--tab--border-right-style',
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
                        name: '--tabs--tab--border-bottom-style',
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
                        name: '--tabs--tab--border-left-style',
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
                name: '--tabs--tab--border-width',
                value: [
                    {
                        name: '--tabs--tab--border-top-width',
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
                        name: '--tabs--tab--border-right-width',
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
                        name: '--tabs--tab--border-bottom-width',
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
                        name: '--tabs--tab--border-left-width',
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
                name: '--tabs--tab--border-radius',
                value: [
                    {
                        name: '--tabs--border-radius',
                        value: [
                            {
                                name: '--tabs--tab--border-top-left-radius',
                                value: [
                                    {
                                        name: '--tabs--border-top-left-radius',
                                        value: [
                                            {
                                                name: '--border-top-left-radius'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--tab--border-top-right-radius',
                        value: [
                            {
                                name: '--tabs--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--tab--border-bottom-right-radius',
                        value: [
                            {
                                name: '--tabs--border-bottom-right-radius',
                                value: [
                                    {
                                        name: '--border-bottom-right-radius'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--tab--border-bottom-left-radius',
                        value: [
                            {
                                name: '--tabs--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--tab--font-size',
                value: [
                    {
                        name: '--tabs--font-size',
                        value: [
                            {
                                name: '--font-size'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--tab--padding',
                value: [
                    {
                        name: '--tabs--tab--padding-top',
                        value: [
                            {
                                name: '--tabs--padding-top',
                                value: [
                                    {
                                        name: '--padding-top'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--tab--padding-right',
                        value: [
                            {
                                name: '--tabs--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--tab--padding-bottom',
                        value: [
                            {
                                name: '--tabs--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--tabs--tab--padding-left',
                        value: [
                            {
                                name: '--tabs--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
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
