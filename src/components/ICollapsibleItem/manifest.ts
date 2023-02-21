export const manifest = {
    name: 'ICollapsibleItem',
    props: [
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description:
                'The unique identifier of the collapsible item, used for determining if the item is open or not'
        },
        {
            name: 'title',
            type: ['String'],
            default: '',
            description: 'The title of the collapsible item'
        }
    ],
    events: [],
    slots: [
        {
            name: 'header',
            description: 'Slot for collapsible item header content '
        },
        {
            name: 'default',
            description: 'Slot for default collapsible item content '
        }
    ],
    css: {
        selector: '.collapsible',
        variables: [
            {
                name: '--collapsible--box-shadow',
                value: [
                    {
                        name: '--collapsible--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--collapsible--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--collapsible--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--collapsible--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--collapsible--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--header--border-style',
                value: [
                    {
                        name: '--collapsible--border-style',
                        value: [
                            {
                                name: '--collapsible--header--border-top-style',
                                value: [
                                    {
                                        name: '--collapsible--border-top-style',
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
                        name: '--collapsible--header--border-right-style',
                        value: [
                            {
                                name: '--collapsible--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--header--border-bottom-style',
                        value: [
                            {
                                name: '--collapsible--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--header--border-left-style',
                        value: [
                            {
                                name: '--collapsible--border-left-style',
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
                name: '--collapsible--header--border-width',
                value: [
                    {
                        name: '--collapsible--border-width',
                        value: [
                            {
                                name: '--collapsible--header--border-top-width',
                                value: [
                                    {
                                        name: '--collapsible--border-top-width',
                                        value: [
                                            {
                                                name: '--border-top-width'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--header--border-right-width',
                        value: [
                            {
                                name: '--collapsible--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--header--border-bottom-width',
                        value: [
                            {
                                name: '--collapsible--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--header--border-left-width',
                        value: [
                            {
                                name: '--collapsible--border-left-width',
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
                name: '--collapsible--header--border-color',
                value: [
                    {
                        name: '--collapsible--border-color',
                        value: [
                            {
                                name: '--collapsible--header--border-top-color',
                                value: [
                                    {
                                        name: '--collapsible--border-top-color',
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
                        name: '--collapsible--header--border-right-color',
                        value: [
                            {
                                name: '--collapsible--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--header--border-bottom-color',
                        value: [
                            {
                                name: '--collapsible--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--header--border-left-color',
                        value: [
                            {
                                name: '--collapsible--border-left-color',
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
                name: '--collapsible--header--color',
                value: [
                    {
                        name: '--collapsible--color'
                    }
                ]
            },
            {
                name: '--collapsible--header--background',
                value: [
                    {
                        name: '--collapsible--background'
                    }
                ]
            },
            {
                name: '--collapsible--header--padding',
                value: [
                    {
                        name: '--collapsible--padding',
                        value: [
                            {
                                name: '--collapsible--header--padding-top',
                                value: [
                                    {
                                        name: '--collapsible--padding-top',
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
                        name: '--collapsible--header--padding-right',
                        value: [
                            {
                                name: '--collapsible--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--header--padding-bottom',
                        value: [
                            {
                                name: '--collapsible--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--header--padding-left',
                        value: [
                            {
                                name: '--collapsible--padding-left',
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
                name: '--collapsible--transition-property',
                value: [
                    {
                        name: '--collapsible--transition-property',
                        value: [
                            {
                                value: '(background-color, border-radius)'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--transition-duration',
                value: [
                    {
                        name: '--collapsible--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--collapsible--icon--color',
                value: [
                    {
                        name: '--collapsible--header--color',
                        value: [
                            {
                                name: '--collapsible--color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--icon--size',
                value: [
                    {
                        value: '12px'
                    }
                ]
            },
            {
                name: '--collapsible--icon--size',
                value: [
                    {
                        value: '12px'
                    }
                ]
            },
            {
                name: '--collapsible--icon--size',
                value: []
            },
            {
                name: '--collapsible--transition-property',
                value: [
                    {
                        name: '--collapsible--transition-property',
                        value: [
                            {
                                value: '(background-color, transform)'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--transition-duration',
                value: [
                    {
                        name: '--collapsible--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--collapsible--body--border-style',
                value: [
                    {
                        name: '--collapsible--border-style',
                        value: [
                            {
                                name: '--collapsible--body--border-top-style',
                                value: [
                                    {
                                        name: '--collapsible--border-top-style',
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
                        name: '--collapsible--body--border-right-style',
                        value: [
                            {
                                name: '--collapsible--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--body--border-bottom-style',
                        value: [
                            {
                                name: '--collapsible--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--body--border-left-style',
                        value: [
                            {
                                name: '--collapsible--border-left-style',
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
                name: '--collapsible--body--border-width',
                value: [
                    {
                        name: '--collapsible--border-width',
                        value: [
                            {
                                name: '--collapsible--body--border-top-width',
                                value: [
                                    {
                                        name: '--collapsible--border-top-width',
                                        value: [
                                            {
                                                name: '--border-top-width'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--body--border-right-width',
                        value: [
                            {
                                name: '--collapsible--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--body--border-bottom-width',
                        value: [
                            {
                                name: '--collapsible--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--body--border-left-width',
                        value: [
                            {
                                name: '--collapsible--border-left-width',
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
                name: '--collapsible--body--border-color',
                value: [
                    {
                        name: '--collapsible--border-color',
                        value: [
                            {
                                name: '--collapsible--body--border-top-color',
                                value: [
                                    {
                                        name: '--collapsible--border-top-color',
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
                        name: '--collapsible--body--border-right-color',
                        value: [
                            {
                                name: '--collapsible--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--body--border-bottom-color',
                        value: [
                            {
                                name: '--collapsible--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--body--border-left-color',
                        value: [
                            {
                                name: '--collapsible--border-left-color',
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
                name: '--collapsible--body--color',
                value: [
                    {
                        name: '--collapsible--color'
                    }
                ]
            },
            {
                name: '--collapsible--body--background',
                value: [
                    {
                        name: '--collapsible--background'
                    }
                ]
            },
            {
                name: '--collapsible--body--padding',
                value: [
                    {
                        name: '--collapsible--padding',
                        value: [
                            {
                                name: '--collapsible--body--padding-top',
                                value: [
                                    {
                                        name: '--collapsible--padding-top',
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
                        name: '--collapsible--body--padding-right',
                        value: [
                            {
                                name: '--collapsible--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--body--padding-bottom',
                        value: [
                            {
                                name: '--collapsible--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--collapsible--body--padding-left',
                        value: [
                            {
                                name: '--collapsible--padding-left',
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
                name: '--collapsible--header--border-top-left-radius',
                value: [
                    {
                        name: '--collapsible--border-top-left-radius',
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--header--border-top-right-radius',
                value: [
                    {
                        name: '--collapsible--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--header--border-bottom-left-radius',
                value: [
                    {
                        name: '--collapsible--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--header--border-bottom-right-radius',
                value: [
                    {
                        name: '--collapsible--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--body--border-bottom-left-radius',
                value: [
                    {
                        name: '--collapsible--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--collapsible--body--border-bottom-right-radius',
                value: [
                    {
                        name: '--collapsible--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
