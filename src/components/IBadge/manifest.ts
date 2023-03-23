import { ComponentManifest } from '@inkline/inkline/types';

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
                name: '--badge--color',
                variants: [
                    {
                        name: '--badge--primary--color',
                        value: [
                            {
                                name: '--contrast-text-color-primary'
                            }
                        ]
                    },
                    {
                        name: '--badge--secondary--color',
                        value: [
                            {
                                name: '--contrast-text-color-secondary'
                            }
                        ]
                    },
                    {
                        name: '--badge--info--color',
                        value: [
                            {
                                name: '--contrast-text-color-info'
                            }
                        ]
                    },
                    {
                        name: '--badge--success--color',
                        value: [
                            {
                                name: '--contrast-text-color-success'
                            }
                        ]
                    },
                    {
                        name: '--badge--warning--color',
                        value: [
                            {
                                name: '--contrast-text-color-warning'
                            }
                        ]
                    },
                    {
                        name: '--badge--danger--color',
                        value: [
                            {
                                name: '--contrast-text-color-danger'
                            }
                        ]
                    },
                    {
                        name: '--badge--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--badge--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--badge--background',
                variants: [
                    {
                        name: '--badge--primary--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--badge--secondary--background',
                        value: [
                            {
                                name: '--color-secondary'
                            }
                        ]
                    },
                    {
                        name: '--badge--info--background',
                        value: [
                            {
                                name: '--color-info'
                            }
                        ]
                    },
                    {
                        name: '--badge--success--background',
                        value: [
                            {
                                name: '--color-success'
                            }
                        ]
                    },
                    {
                        name: '--badge--warning--background',
                        value: [
                            {
                                name: '--color-warning'
                            }
                        ]
                    },
                    {
                        name: '--badge--danger--background',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    },
                    {
                        name: '--badge--light--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--badge--dark--background',
                        value: [
                            {
                                name: '--color-dark'
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
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--primary--border-top-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--secondary--border-top-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--badge--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--border-right-color',
                        value: [
                            {
                                name: '--border-right-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--primary--border-right-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
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
                                name: '--badge--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
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
                                name: '--badge--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
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
                                name: '--badge--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
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
                            }
                        ]
                    },
                    {
                        name: '--badge--border-bottom-color',
                        value: [
                            {
                                name: '--border-bottom-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--primary--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
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
                                name: '--badge--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
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
                                name: '--badge--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
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
                                name: '--badge--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
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
                            }
                        ]
                    },
                    {
                        name: '--badge--border-left-color',
                        value: [
                            {
                                name: '--border-left-color'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--primary--border-left-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
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
                            },
                            {
                                name: '--badge--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
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
                            },
                            {
                                name: '--badge--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
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
                            },
                            {
                                name: '--badge--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
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
                        value: [
                            {
                                name: '--border-top-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--sm--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--border-top-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--border-top-right-radius',
                        value: [
                            {
                                name: '--border-top-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--sm--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--border-top-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--border-bottom-right-radius',
                        value: [
                            {
                                name: '--border-bottom-right-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--sm--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--border-bottom-right-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--border-bottom-left-radius',
                        value: [
                            {
                                name: '--border-bottom-left-radius'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--sm--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--border-bottom-left-radius',
                                value: [
                                    {
                                        value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--border-bottom-left-radius',
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
                name: '--badge--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--badge--sm--font-size',
                        value: [
                            {
                                value: 'calc(calc(var(--font-size) * var(--size-multiplier-sm)) * 0.8)'
                            }
                        ]
                    },
                    {
                        name: '--badge--md--font-size',
                        value: [
                            {
                                value: 'calc(calc(var(--font-size) * var(--size-multiplier-md)) * 0.8)'
                            }
                        ]
                    },
                    {
                        name: '--badge--lg--font-size',
                        value: [
                            {
                                value: 'calc(calc(var(--font-size) * var(--size-multiplier-lg)) * 0.8)'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--badge--box-shadow',
                value: [
                    {
                        name: '--badge--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--badge--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--badge--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--badge--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--badge--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--badge--padding',
                value: [
                    {
                        name: '--badge--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--sm--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) * var(--size-multiplier-sm)) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) * var(--size-multiplier-md)) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--padding-top',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-top) * var(--size-multiplier-lg)) * 0.25)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--sm--padding-right',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-right) * var(--size-multiplier-sm)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--padding-right',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-right) * var(--size-multiplier-md)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--padding-right',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-right) * var(--size-multiplier-lg)) * 0.5)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--sm--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-bottom) * var(--size-multiplier-sm)) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-bottom) * var(--size-multiplier-md)) * 0.25)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--padding-bottom',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-bottom) * var(--size-multiplier-lg)) * 0.25)'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--badge--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ],
                        variants: [
                            {
                                name: '--badge--sm--padding-left',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-left) * var(--size-multiplier-sm)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--md--padding-left',
                                value: [
                                    {
                                        value: 'calc(calc(var(--padding-left) * var(--size-multiplier-md)) * 0.5)'
                                    }
                                ]
                            },
                            {
                                name: '--badge--lg--padding-left',
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
                name: '--badge--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            },
            {
                name: '--badge--transition-property',
                value: [
                    {
                        value: '(background-color, color, border-color)'
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
                name: '--badge--link--hover--background',
                value: [
                    {
                        name: '--badge--background'
                    }
                ]
            }
        ]
    }
};

export default manifest;
