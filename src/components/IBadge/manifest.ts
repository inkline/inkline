import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IBadge',
    props: [
        {
            name: 'color',
            type: ['primary', 'success', 'light', 'dark', 'info', 'success', 'warning', 'danger'],
            default: '',
            description: 'The color variant of the badge'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the badge'
        },
        {
            name: 'pill',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the badge as a pill'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default badge content '
        }
    ],
    css: {
        selector: '.badge',
        variables: [
            {
                name: '--badge--background',
                value: [
                    {
                        name: '--badge--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--badge--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--badge--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--badge--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--badge--primary--background',
                        value: [
                            {
                                name: '--badge--primary--background-h',
                                value: [
                                    {
                                        name: '--color-primary-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--primary--background-s',
                                value: [
                                    {
                                        name: '--color-primary-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--primary--background-l',
                                value: [
                                    {
                                        name: '--color-primary-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--primary--background-a',
                                value: [
                                    {
                                        name: '--color-primary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--secondary--background',
                        value: [
                            {
                                name: '--badge--secondary--background-h',
                                value: [
                                    {
                                        name: '--color-secondary-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--background-s',
                                value: [
                                    {
                                        name: '--color-secondary-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--background-l',
                                value: [
                                    {
                                        name: '--color-secondary-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--background-a',
                                value: [
                                    {
                                        name: '--color-secondary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--info--background',
                        value: [
                            {
                                name: '--badge--info--background-h',
                                value: [
                                    {
                                        name: '--color-info-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--background-s',
                                value: [
                                    {
                                        name: '--color-info-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--background-l',
                                value: [
                                    {
                                        name: '--color-info-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--background-a',
                                value: [
                                    {
                                        name: '--color-info-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--success--background',
                        value: [
                            {
                                name: '--badge--success--background-h',
                                value: [
                                    {
                                        name: '--color-success-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--background-s',
                                value: [
                                    {
                                        name: '--color-success-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--background-l',
                                value: [
                                    {
                                        name: '--color-success-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--background-a',
                                value: [
                                    {
                                        name: '--color-success-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--warning--background',
                        value: [
                            {
                                name: '--badge--warning--background-h',
                                value: [
                                    {
                                        name: '--color-warning-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--background-s',
                                value: [
                                    {
                                        name: '--color-warning-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--background-l',
                                value: [
                                    {
                                        name: '--color-warning-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--background-a',
                                value: [
                                    {
                                        name: '--color-warning-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--danger--background',
                        value: [
                            {
                                name: '--badge--danger--background-h',
                                value: [
                                    {
                                        name: '--color-danger-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--background-s',
                                value: [
                                    {
                                        name: '--color-danger-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--background-l',
                                value: [
                                    {
                                        name: '--color-danger-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--background-a',
                                value: [
                                    {
                                        name: '--color-danger-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--light--background',
                        value: [
                            {
                                name: '--badge--light--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--dark--background',
                        value: [
                            {
                                name: '--badge--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--badge--border-style',
                value: [
                    {
                        name: '--badge--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--badge--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--badge--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--badge--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--badge--border-width',
                value: [
                    {
                        name: '--badge--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--badge--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--badge--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--badge--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--badge--border-color',
                value: [
                    {
                        name: '--badge--border-top-color',
                        value: []
                    },
                    {
                        name: '--badge--border-right-color',
                        value: []
                    },
                    {
                        name: '--badge--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--badge--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--badge--primary--border-color',
                        value: [
                            {
                                name: '--badge--primary--border-top-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--primary--border-right-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--primary--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--primary--border-left-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--secondary--border-color',
                        value: [
                            {
                                name: '--badge--secondary--border-top-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--border-right-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--border-left-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--info--border-color',
                        value: [
                            {
                                name: '--badge--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--success--border-color',
                        value: [
                            {
                                name: '--badge--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--border-right-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--border-left-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--warning--border-color',
                        value: [
                            {
                                name: '--badge--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--danger--border-color',
                        value: [
                            {
                                name: '--badge--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--border-right-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--border-left-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--light--border-color',
                        value: [
                            {
                                name: '--badge--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--dark--border-color',
                        value: [
                            {
                                name: '--badge--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--border-left-color',
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
                name: '--badge--border-radius',
                value: [
                    {
                        name: '--badge--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--badge--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--badge--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--badge--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--badge--sm--border-radius',
                        value: [
                            {
                                name: '--badge--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--badge--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--badge--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--badge--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--md--border-radius',
                        value: [
                            {
                                name: '--badge--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--badge--md--border-bottom-left-radius',
                                value: [
                                    {
                                        name: '--border-bottom-left-radius-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--lg--border-radius',
                        value: [
                            {
                                name: '--badge--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--badge--lg--border-bottom-left-radius',
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
                name: '--badge--box-shadow',
                value: []
            },
            {
                name: '--badge--color',
                value: [
                    {
                        name: '--badge--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--badge--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--badge--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--badge--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--badge--primary--color',
                        value: [
                            {
                                name: '--badge--primary--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--primary--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--primary--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--primary--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--secondary--color',
                        value: [
                            {
                                name: '--badge--secondary--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--info--color',
                        value: [
                            {
                                name: '--badge--info--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--success--color',
                        value: [
                            {
                                name: '--badge--success--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--warning--color',
                        value: [
                            {
                                name: '--badge--warning--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--danger--color',
                        value: [
                            {
                                name: '--badge--danger--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--light--color',
                        value: [
                            {
                                name: '--badge--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--dark--color',
                        value: [
                            {
                                name: '--badge--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--color-a',
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
                name: '--badge--font-size',
                value: [],
                variants: [
                    {
                        name: '--badge--sm--font-size',
                        value: [
                            {
                                value: '75%'
                            }
                        ]
                    },
                    {
                        name: '--badge--md--font-size',
                        value: [
                            {
                                value: '80%'
                            }
                        ]
                    },
                    {
                        name: '--badge--lg--font-size',
                        value: [
                            {
                                value: '85%'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--badge--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            },
            {
                name: '--badge--padding',
                value: [
                    {
                        name: '--badge--padding-top',
                        value: []
                    },
                    {
                        name: '--badge--padding-right',
                        value: []
                    },
                    {
                        name: '--badge--padding-bottom',
                        value: []
                    },
                    {
                        name: '--badge--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--badge--sm--padding',
                        value: [
                            {
                                name: '--badge--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-sm) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--sm--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right-sm) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-sm) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--sm--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left-sm) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--md--padding',
                        value: [
                            {
                                name: '--badge--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-md) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right-md) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-md) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left-md) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--lg--padding',
                        value: [
                            {
                                name: '--badge--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(var(--padding-top-lg) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--padding-right',
                                value: [
                                    {
                                        value: 'calc(var(--padding-right-lg) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(var(--padding-bottom-lg) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--padding-left',
                                value: [
                                    {
                                        value: 'calc(var(--padding-left-lg) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--badge--transition',
                value: [
                    {
                        name: '--badge--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--badge--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--badge--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    },
                    {
                        name: '--badge--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--badge--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--badge--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--badge--link--hover--background',
                value: []
            },
            {
                name: '--badge--pill--border-radius',
                value: [
                    {
                        name: '--badge--pill--border-top-left-radius',
                        value: [
                            {
                                value: '50%'
                            }
                        ]
                    },
                    {
                        name: '--badge--pill--border-top-right-radius',
                        value: [
                            {
                                value: '50%'
                            }
                        ]
                    },
                    {
                        name: '--badge--pill--border-bottom-right-radius',
                        value: [
                            {
                                value: '50%'
                            }
                        ]
                    },
                    {
                        name: '--badge--pill--border-bottom-left-radius',
                        value: [
                            {
                                value: '50%'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
