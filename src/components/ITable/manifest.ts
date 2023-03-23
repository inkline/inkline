import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ITable',
    props: [
        {
            name: 'border',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the table with borders'
        },
        {
            name: 'condensed',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the table rows as condensed'
        },
        {
            name: 'striped',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the table rows as alternating stripes'
        },
        {
            name: 'hover',
            type: ['Boolean'],
            default: 'false',
            description: 'Set the table rows as hoverable'
        },
        {
            name: 'responsive',
            type: ['Boolean', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
            default: 'false',
            description:
                'Set the table to be responsive, enabling horizontal scroll when overflowing the parent container'
        },
        {
            name: 'nowrap',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the table rows without wrapping white-space'
        },
        {
            name: 'color',
            type: ['primary', 'success', 'light', 'dark', 'info', 'success', 'warning', 'danger'],
            default: '',
            description: 'The color variant of the table'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for table rows and data '
        }
    ],
    css: {
        selector: '.table-wrapper',
        variables: [
            {
                name: '--table--margin-bottom',
                value: [
                    {
                        name: '--margin-bottom'
                    }
                ]
            },
            {
                name: '--table--border-color',
                value: [
                    {
                        name: '--table--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ]
                    },
                    {
                        name: '--table--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ]
                    },
                    {
                        name: '--table--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ]
                    },
                    {
                        name: '--table--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--table--primary--border-color',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--border-color',
                        value: [
                            {
                                name: '--color-secondary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--light--border-color',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--table--dark--border-color',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    },
                    {
                        name: '--table--info--border-color',
                        value: [
                            {
                                name: '--color-info-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--success--border-color',
                        value: [
                            {
                                name: '--color-success-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--warning--border-color',
                        value: [
                            {
                                name: '--color-warning-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--danger--border-color',
                        value: [
                            {
                                name: '--color-danger-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--color',
                variants: [
                    {
                        name: '--table--primary--color',
                        value: [
                            {
                                name: '--contrast-text-color-primary'
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--color',
                        value: [
                            {
                                name: '--contrast-text-color-secondary'
                            }
                        ]
                    },
                    {
                        name: '--table--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--table--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    },
                    {
                        name: '--table--info--color',
                        value: [
                            {
                                name: '--contrast-text-color-info'
                            }
                        ]
                    },
                    {
                        name: '--table--success--color',
                        value: [
                            {
                                name: '--contrast-text-color-success'
                            }
                        ]
                    },
                    {
                        name: '--table--warning--color',
                        value: [
                            {
                                name: '--contrast-text-color-warning'
                            }
                        ]
                    },
                    {
                        name: '--table--danger--color',
                        value: [
                            {
                                name: '--contrast-text-color-danger'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--padding',
                value: [
                    {
                        name: '--table--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ]
                    },
                    {
                        name: '--table--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ]
                    },
                    {
                        name: '--table--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ]
                    },
                    {
                        name: '--table--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--border-style',
                value: [
                    {
                        name: '--table--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--table--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--table--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--table--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--border-width',
                value: [
                    {
                        name: '--table--border-top-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--table--border-right-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--table--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--table--border-left-width',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--background',
                variants: [
                    {
                        name: '--table--primary--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--background',
                        value: [
                            {
                                name: '--color-secondary'
                            }
                        ]
                    },
                    {
                        name: '--table--light--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--table--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    },
                    {
                        name: '--table--info--background',
                        value: [
                            {
                                name: '--color-info'
                            }
                        ]
                    },
                    {
                        name: '--table--success--background',
                        value: [
                            {
                                name: '--color-success'
                            }
                        ]
                    },
                    {
                        name: '--table--warning--background',
                        value: [
                            {
                                name: '--color-warning'
                            }
                        ]
                    },
                    {
                        name: '--table--danger--background',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--table--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--table--transition-property',
                value: [
                    {
                        value: 'color, background-color, border'
                    }
                ]
            },
            {
                name: '--table--thead--th--border-bottom-width',
                value: [
                    {
                        name: '--table--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--tbody--adjacent--border-top-style',
                value: [
                    {
                        value: 'solid'
                    }
                ]
            },
            {
                name: '--table--tbody--adjacent--border-top-width',
                value: [
                    {
                        name: '--table--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--tbody--adjacent--border-top-color',
                value: [
                    {
                        value: 'transparent'
                    }
                ]
            },
            {
                name: '--table--condensed--padding',
                value: [
                    {
                        name: '--table--condensed--padding-top',
                        value: [
                            {
                                value: 'calc(var(--table--padding-top, var(--padding-top)))'
                            }
                        ]
                    },
                    {
                        name: '--table--condensed--padding-right',
                        value: [
                            {
                                value: 'calc(var(--table--padding-right, var(--padding-right)))'
                            }
                        ]
                    },
                    {
                        name: '--table--condensed--padding-bottom',
                        value: [
                            {
                                value: 'calc(var(--table--padding-bottom, var(--padding-bottom)))'
                            }
                        ]
                    },
                    {
                        name: '--table--condensed--padding-left',
                        value: [
                            {
                                value: 'calc(var(--table--padding-left, var(--padding-left)))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--striped--background',
                variants: [
                    {
                        name: '--table--primary--striped--background',
                        value: [
                            {
                                name: '--color-primary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--striped--background',
                        value: [
                            {
                                name: '--color-secondary-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--light--striped--background',
                        value: [
                            {
                                name: '--color-gray-50'
                            }
                        ]
                    },
                    {
                        name: '--table--dark--striped--background',
                        value: [
                            {
                                name: '--color-dark-tint-50'
                            }
                        ]
                    },
                    {
                        name: '--table--info--striped--background',
                        value: [
                            {
                                name: '--color-info-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--success--striped--background',
                        value: [
                            {
                                name: '--color-success-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--warning--striped--background',
                        value: [
                            {
                                name: '--color-warning-shade-50'
                            }
                        ]
                    },
                    {
                        name: '--table--danger--striped--background',
                        value: [
                            {
                                name: '--color-danger-shade-50'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--hover--background',
                variants: [
                    {
                        name: '--table--primary--hover--background',
                        value: [
                            {
                                name: '--color-primary-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--hover--background',
                        value: [
                            {
                                name: '--color-secondary-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--table--light--hover--background',
                        value: [
                            {
                                name: '--color-gray-100'
                            }
                        ]
                    },
                    {
                        name: '--table--dark--hover--background',
                        value: [
                            {
                                name: '--color-dark-tint-100'
                            }
                        ]
                    },
                    {
                        name: '--table--success--hover--background',
                        value: [
                            {
                                name: '--color-success-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--table--warning--hover--background',
                        value: [
                            {
                                name: '--color-warning-shade-100'
                            }
                        ]
                    },
                    {
                        name: '--table--danger--hover--background',
                        value: [
                            {
                                name: '--color-danger-shade-100'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
