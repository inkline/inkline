import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ITabTitle',
    props: [
        {
            name: 'for',
            type: ['String'],
            default: '',
            description: 'The name of the referenced tab'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for tab title content '
        }
    ],
    css: {
        selector: '.tabs',
        variables: [
            {
                name: '--tabs--title--border-style',
                value: [
                    {
                        name: '--tabs--title--border-top-style',
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
                        name: '--tabs--title--border-right-style',
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
                        name: '--tabs--title--border-bottom-style',
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
                        name: '--tabs--title--border-left-style',
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
                name: '--tabs--title--border-width',
                value: [
                    {
                        name: '--tabs--title--border-top-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--tabs--title--border-right-width',
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
                        name: '--tabs--title--border-bottom-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--tabs--title--border-left-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--title--border-color',
                value: [
                    {
                        name: '--tabs--title--border-top-color',
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
                        name: '--tabs--title--border-right-color',
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
                        name: '--tabs--title--border-bottom-color',
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
                        name: '--tabs--title--border-left-color',
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
                name: '--tabs--title--padding',
                value: [
                    {
                        name: '--tabs--title--padding-top',
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
                        name: '--tabs--title--padding-right',
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
                        name: '--tabs--title--padding-bottom',
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
                        name: '--tabs--title--padding-left',
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
            },
            {
                name: '--tabs--title--font-size',
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
                name: '--tabs--title--transition-property',
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
                name: '--tabs--title--transition-duration',
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
                name: '--tabs--title--transition-timing-function',
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
                name: '--tabs--title--color',
                value: [
                    {
                        name: '--tabs--color'
                    }
                ]
            },
            {
                name: '--tabs--title--background',
                value: [
                    {
                        name: '--tabs--background'
                    }
                ]
            },
            {
                name: '--tabs--title--active--color',
                value: [
                    {
                        name: '--tabs--title--color',
                        value: [
                            {
                                name: '--tabs--color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--title--active--background',
                value: [
                    {
                        name: '--tabs--title--background',
                        value: [
                            {
                                name: '--tabs--background'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tabs--title--active--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            },
            {
                name: '--tabs--title--hover--background',
                value: [
                    {
                        name: '--tabs--title--background'
                    }
                ]
            },
            {
                name: '--tabs--stretch--title--border-right-width',
                value: [
                    {
                        value: '0'
                    }
                ]
            }
        ]
    }
};

export default manifest;
