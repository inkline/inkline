import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ITable',
    props: [
        {
            name: 'bordered',
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
            name: 'hoverable',
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
        selector: '.table',
        variables: [
            {
                name: '--table--border-color',
                value: [
                    {
                        name: '--table--border-top-color',
                        value: []
                    },
                    {
                        name: '--table--border-top-color',
                        value: []
                    },
                    {
                        name: '--table--border-right-color',
                        value: []
                    },
                    {
                        name: '--table--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--table--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--table--primary--border-color',
                        value: [
                            {
                                name: '--table--primary--border-top-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--border-right-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--border-left-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--border-color',
                        value: [
                            {
                                name: '--table--secondary--border-top-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--border-right-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--border-left-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--info--border-color',
                        value: [
                            {
                                name: '--table--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--success--border-color',
                        value: [
                            {
                                name: '--table--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--border-right-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--border-left-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--warning--border-color',
                        value: [
                            {
                                name: '--table--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--danger--border-color',
                        value: [
                            {
                                name: '--table--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--border-right-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--border-left-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--light--border-color',
                        value: [
                            {
                                name: '--table--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--dark--border-color',
                        value: [
                            {
                                name: '--table--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--border-left-color',
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
                name: '--table--color',
                value: [
                    {
                        name: '--table--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--table--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--table--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--table--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--table--primary--color',
                        value: [
                            {
                                name: '--table--primary--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--color',
                        value: [
                            {
                                name: '--table--secondary--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--info--color',
                        value: [
                            {
                                name: '--table--info--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--success--color',
                        value: [
                            {
                                name: '--table--success--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--warning--color',
                        value: [
                            {
                                name: '--table--warning--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--danger--color',
                        value: [
                            {
                                name: '--table--danger--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--light--color',
                        value: [
                            {
                                name: '--table--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--dark--color',
                        value: [
                            {
                                name: '--table--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--color-a',
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
                name: '--table--margin',
                value: [
                    {
                        name: '--table--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--table--margin-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--table--margin-bottom',
                        value: [
                            {
                                name: '--margin-bottom'
                            }
                        ]
                    },
                    {
                        name: '--table--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--th--font-weight',
                value: [
                    {
                        name: '--font-weight-bold'
                    }
                ]
            },
            {
                name: '--table--background',
                value: [
                    {
                        name: '--table--background-h',
                        value: [
                            {
                                name: '--color-white-h'
                            }
                        ]
                    },
                    {
                        name: '--table--background-s',
                        value: [
                            {
                                name: '--color-white-s'
                            }
                        ]
                    },
                    {
                        name: '--table--background-l',
                        value: [
                            {
                                name: '--color-white-l'
                            }
                        ]
                    },
                    {
                        name: '--table--background-a',
                        value: [
                            {
                                name: '--color-white-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--table--primary--background',
                        value: [
                            {
                                name: '--table--primary--background-h',
                                value: [
                                    {
                                        name: '--color-primary-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--background-s',
                                value: [
                                    {
                                        name: '--color-primary-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--background-l',
                                value: [
                                    {
                                        name: '--color-primary-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--background-a',
                                value: [
                                    {
                                        name: '--color-primary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--primary--striped--background',
                        value: [
                            {
                                name: '--table--primary--striped--background-h',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--striped--background-s',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--striped--background-l',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--striped--background-a',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--primary--hover--background',
                        value: [
                            {
                                name: '--table--primary--hover--background-h',
                                value: [
                                    {
                                        name: '--color-primary-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--hover--background-s',
                                value: [
                                    {
                                        name: '--color-primary-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--hover--background-l',
                                value: [
                                    {
                                        name: '--color-primary-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--primary--hover--background-a',
                                value: [
                                    {
                                        name: '--color-primary-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--background',
                        value: [
                            {
                                name: '--table--secondary--background-h',
                                value: [
                                    {
                                        name: '--color-secondary-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--background-s',
                                value: [
                                    {
                                        name: '--color-secondary-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--background-l',
                                value: [
                                    {
                                        name: '--color-secondary-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--background-a',
                                value: [
                                    {
                                        name: '--color-secondary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--striped--background',
                        value: [
                            {
                                name: '--table--secondary--striped--background-h',
                                value: []
                            },
                            {
                                name: '--table--secondary--striped--background-s',
                                value: []
                            },
                            {
                                name: '--table--secondary--striped--background-l',
                                value: []
                            },
                            {
                                name: '--table--secondary--striped--background-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--table--secondary--hover--background',
                        value: [
                            {
                                name: '--table--secondary--hover--background-h',
                                value: [
                                    {
                                        name: '--color-secondary-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--hover--background-s',
                                value: [
                                    {
                                        name: '--color-secondary-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--hover--background-l',
                                value: [
                                    {
                                        name: '--color-secondary-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--secondary--hover--background-a',
                                value: [
                                    {
                                        name: '--color-secondary-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--info--background',
                        value: [
                            {
                                name: '--table--info--background-h',
                                value: [
                                    {
                                        name: '--color-info-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--background-s',
                                value: [
                                    {
                                        name: '--color-info-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--background-l',
                                value: [
                                    {
                                        name: '--color-info-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--background-a',
                                value: [
                                    {
                                        name: '--color-info-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--info--striped--background',
                        value: [
                            {
                                name: '--table--info--striped--background-h',
                                value: [
                                    {
                                        name: '--color-info-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--striped--background-s',
                                value: [
                                    {
                                        name: '--color-info-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--striped--background-l',
                                value: [
                                    {
                                        name: '--color-info-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--striped--background-a',
                                value: [
                                    {
                                        name: '--color-info-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--info--hover--background',
                        value: [
                            {
                                name: '--table--info--hover--background-h',
                                value: [
                                    {
                                        name: '--color-info-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--hover--background-s',
                                value: [
                                    {
                                        name: '--color-info-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--hover--background-l',
                                value: [
                                    {
                                        name: '--color-info-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--info--hover--background-a',
                                value: [
                                    {
                                        name: '--color-info-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--success--background',
                        value: [
                            {
                                name: '--table--success--background-h',
                                value: [
                                    {
                                        name: '--color-success-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--background-s',
                                value: [
                                    {
                                        name: '--color-success-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--background-l',
                                value: [
                                    {
                                        name: '--color-success-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--background-a',
                                value: [
                                    {
                                        name: '--color-success-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--success--striped--background',
                        value: [
                            {
                                name: '--table--success--striped--background-h',
                                value: [
                                    {
                                        name: '--color-success-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--striped--background-s',
                                value: [
                                    {
                                        name: '--color-success-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--striped--background-l',
                                value: [
                                    {
                                        name: '--color-success-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--striped--background-a',
                                value: [
                                    {
                                        name: '--color-success-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--success--hover--background',
                        value: [
                            {
                                name: '--table--success--hover--background-h',
                                value: [
                                    {
                                        name: '--color-success-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--hover--background-s',
                                value: [
                                    {
                                        name: '--color-success-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--hover--background-l',
                                value: [
                                    {
                                        name: '--color-success-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--success--hover--background-a',
                                value: [
                                    {
                                        name: '--color-success-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--warning--background',
                        value: [
                            {
                                name: '--table--warning--background-h',
                                value: [
                                    {
                                        name: '--color-warning-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--background-s',
                                value: [
                                    {
                                        name: '--color-warning-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--background-l',
                                value: [
                                    {
                                        name: '--color-warning-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--background-a',
                                value: [
                                    {
                                        name: '--color-warning-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--warning--striped--background',
                        value: [
                            {
                                name: '--table--warning--striped--background-h',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--striped--background-s',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--striped--background-l',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--striped--background-a',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--warning--hover--background',
                        value: [
                            {
                                name: '--table--warning--hover--background-h',
                                value: [
                                    {
                                        name: '--color-warning-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--hover--background-s',
                                value: [
                                    {
                                        name: '--color-warning-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--hover--background-l',
                                value: [
                                    {
                                        name: '--color-warning-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--warning--hover--background-a',
                                value: [
                                    {
                                        name: '--color-warning-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--danger--background',
                        value: [
                            {
                                name: '--table--danger--background-h',
                                value: [
                                    {
                                        name: '--color-danger-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--background-s',
                                value: [
                                    {
                                        name: '--color-danger-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--background-l',
                                value: [
                                    {
                                        name: '--color-danger-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--background-a',
                                value: [
                                    {
                                        name: '--color-danger-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--danger--striped--background',
                        value: [
                            {
                                name: '--table--danger--striped--background-h',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--striped--background-s',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--striped--background-l',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--striped--background-a',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--danger--hover--background',
                        value: [
                            {
                                name: '--table--danger--hover--background-h',
                                value: [
                                    {
                                        name: '--color-danger-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--hover--background-s',
                                value: [
                                    {
                                        name: '--color-danger-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--hover--background-l',
                                value: [
                                    {
                                        name: '--color-danger-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--danger--hover--background-a',
                                value: [
                                    {
                                        name: '--color-danger-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--light--background',
                        value: [
                            {
                                name: '--table--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--light--striped--background',
                        value: [
                            {
                                name: '--table--light--striped--background-h',
                                value: [
                                    {
                                        name: '--color-gray-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--striped--background-s',
                                value: [
                                    {
                                        name: '--color-gray-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--striped--background-l',
                                value: [
                                    {
                                        name: '--color-gray-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--striped--background-a',
                                value: [
                                    {
                                        name: '--color-gray-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--light--hover--background',
                        value: [
                            {
                                name: '--table--light--hover--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--hover--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--hover--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--light--hover--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--dark--background',
                        value: [
                            {
                                name: '--table--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--dark--striped--background',
                        value: [
                            {
                                name: '--table--dark--striped--background-h',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--striped--background-s',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--striped--background-l',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--striped--background-a',
                                value: [
                                    {
                                        name: '--color-dark-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--table--dark--hover--background',
                        value: [
                            {
                                name: '--table--dark--hover--background-h',
                                value: [
                                    {
                                        name: '--color-dark-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--hover--background-s',
                                value: [
                                    {
                                        name: '--color-dark-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--hover--background-l',
                                value: [
                                    {
                                        name: '--color-dark-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--table--dark--hover--background-a',
                                value: [
                                    {
                                        name: '--color-dark-shade-100-a'
                                    }
                                ]
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
                        value: []
                    },
                    {
                        name: '--table--border-right-width',
                        value: []
                    },
                    {
                        name: '--table--border-bottom-width',
                        value: []
                    },
                    {
                        name: '--table--border-left-width',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--table--bordered--border-width',
                        value: [
                            {
                                name: '--table--bordered--border-top-width',
                                value: [
                                    {
                                        name: '--border-top-width'
                                    }
                                ]
                            },
                            {
                                name: '--table--bordered--border-right-width',
                                value: [
                                    {
                                        name: '--border-right-width'
                                    }
                                ]
                            },
                            {
                                name: '--table--bordered--border-bottom-width',
                                value: [
                                    {
                                        name: '--border-bottom-width'
                                    }
                                ]
                            },
                            {
                                name: '--table--bordered--border-left-width',
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
                name: '--table--padding',
                value: [
                    {
                        name: '--table--padding-top',
                        value: []
                    },
                    {
                        name: '--table--padding-right',
                        value: []
                    },
                    {
                        name: '--table--padding-bottom',
                        value: []
                    },
                    {
                        name: '--table--padding-left',
                        value: []
                    }
                ]
            },
            {
                name: '--table--transition',
                value: [
                    {
                        name: '--table--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
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
                                value: 'background-color, color, border-color'
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
                    }
                ]
            },
            {
                name: '--table--adjacent--border-width',
                value: [
                    {
                        name: '--table--adjacent--border-top-width'
                    }
                ]
            },
            {
                name: '--table--adjacent--border-style',
                value: [
                    {
                        name: '--table--adjacent--border-top-style'
                    }
                ]
            },
            {
                name: '--table--adjacent--border-color',
                value: [
                    {
                        name: '--table--adjacent--border-top-color',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    },
                    {
                        name: '--table--adjacent--border-top-color',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--thead--th--border-width',
                value: [
                    {
                        name: '--table--thead--th--border-bottom-width'
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
                                name: '--padding-top-1-2'
                            }
                        ]
                    },
                    {
                        name: '--table--condensed--padding-right',
                        value: [
                            {
                                name: '--padding-right-1-2'
                            }
                        ]
                    },
                    {
                        name: '--table--condensed--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom-1-2'
                            }
                        ]
                    },
                    {
                        name: '--table--condensed--padding-left',
                        value: [
                            {
                                name: '--padding-left-1-2'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--border--border-color',
                value: []
            },
            {
                name: '--table--border--border-style',
                value: []
            },
            {
                name: '--table--border--border-width',
                value: []
            },
            {
                name: '--table--striped--background',
                value: [
                    {
                        name: '--table--striped--background-h',
                        value: [
                            {
                                name: '--color-gray-100-h'
                            }
                        ]
                    },
                    {
                        name: '--table--striped--background-s',
                        value: [
                            {
                                name: '--color-gray-100-s'
                            }
                        ]
                    },
                    {
                        name: '--table--striped--background-l',
                        value: [
                            {
                                name: '--color-gray-100-l'
                            }
                        ]
                    },
                    {
                        name: '--table--striped--background-a',
                        value: [
                            {
                                name: '--color-gray-100-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--table--hover--background',
                value: [
                    {
                        name: '--table--hover--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--table--hover--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--table--hover--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--table--hover--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
