import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IButton',
    props: [
        {
            name: 'active',
            type: ['Boolean'],
            default: 'false',
            description: 'The active state of the button'
        },
        {
            name: 'block',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button as a block, spanning the full container width'
        },
        {
            name: 'circle',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button as a circle'
        },
        {
            name: 'color',
            type: ['primary', 'success', 'light', 'dark', 'info', 'success', 'warning', 'danger'],
            default: '',
            description: 'The color variant of the button'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the button'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'link',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button as a link'
        },
        {
            name: 'loading',
            type: ['Boolean'],
            default: 'false',
            description: 'The loading state of the button'
        },
        {
            name: 'showLoadingIcon',
            type: ['Boolean'],
            default: 'true',
            description: 'Display the button loading icon when loading state is active'
        },
        {
            name: 'outline',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button as an outline button'
        },
        {
            name: 'square',
            type: ['Boolean'],
            default: 'false',
            description: 'Display the button as a square'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'button',
            description: 'Set the HTML tag to be used for rendering the button'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the button'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as a Router Link component with a `to` attribute'
        },
        {
            name: 'type',
            type: ['button', 'submit', 'reset', 'undefined'],
            default: '',
            description: 'The type of the button'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the button'
        }
    ],
    events: [
        {
            description: 'Emitted when the button is clicked',
            name: 'click'
        }
    ],
    slots: [
        {
            name: 'loading',
            description: 'Slot for button loading text '
        },
        {
            name: 'icon',
            description: 'Slot for button icon '
        },
        {
            name: 'default',
            description: 'Slot for default button content '
        }
    ],
    css: {
        selector: '.button',
        variables: [
            {
                name: '--button--background',
                value: [
                    {
                        name: '--button--background-h',
                        value: [
                            {
                                name: '--color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--button--background-s',
                        value: [
                            {
                                name: '--color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--button--background-l',
                        value: [
                            {
                                name: '--color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--button--background-a',
                        value: [
                            {
                                name: '--color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--button--primary--background',
                        value: [
                            {
                                name: '--button--primary--background-h',
                                value: [
                                    {
                                        name: '--color-primary-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--background-s',
                                value: [
                                    {
                                        name: '--color-primary-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--background-l',
                                value: [
                                    {
                                        name: '--color-primary-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--background-a',
                                value: [
                                    {
                                        name: '--color-primary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--primary--hover--background',
                        value: [
                            {
                                name: '--button--primary--hover--background-h',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--hover--background-s',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--hover--background-l',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--hover--background-a',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--primary--focus--background',
                        value: [
                            {
                                name: '--button--primary--focus--background-h',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--focus--background-s',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--focus--background-l',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--focus--background-a',
                                value: [
                                    {
                                        name: '--color-primary-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--primary--active--background',
                        value: [
                            {
                                name: '--button--primary--active--background-h',
                                value: [
                                    {
                                        name: '--color-primary-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--active--background-s',
                                value: [
                                    {
                                        name: '--color-primary-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--active--background-l',
                                value: [
                                    {
                                        name: '--color-primary-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--active--background-a',
                                value: [
                                    {
                                        name: '--color-primary-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--background',
                        value: [
                            {
                                name: '--button--secondary--background-h',
                                value: [
                                    {
                                        name: '--color-secondary-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--background-s',
                                value: [
                                    {
                                        name: '--color-secondary-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--background-l',
                                value: [
                                    {
                                        name: '--color-secondary-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--background-a',
                                value: [
                                    {
                                        name: '--color-secondary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--hover--background',
                        value: [
                            {
                                name: '--button--secondary--hover--background-h',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--hover--background-s',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--hover--background-l',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--hover--background-a',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--focus--background',
                        value: [
                            {
                                name: '--button--secondary--focus--background-h',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--focus--background-s',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--focus--background-l',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--focus--background-a',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--active--background',
                        value: [
                            {
                                name: '--button--secondary--active--background-h',
                                value: []
                            },
                            {
                                name: '--button--secondary--active--background-s',
                                value: []
                            },
                            {
                                name: '--button--secondary--active--background-l',
                                value: []
                            },
                            {
                                name: '--button--secondary--active--background-a',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--button--info--background',
                        value: [
                            {
                                name: '--button--info--background-h',
                                value: [
                                    {
                                        name: '--color-info-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--background-s',
                                value: [
                                    {
                                        name: '--color-info-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--background-l',
                                value: [
                                    {
                                        name: '--color-info-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--background-a',
                                value: [
                                    {
                                        name: '--color-info-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--info--hover--background',
                        value: [
                            {
                                name: '--button--info--hover--background-h',
                                value: [
                                    {
                                        name: '--color-info-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--hover--background-s',
                                value: [
                                    {
                                        name: '--color-info-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--hover--background-l',
                                value: [
                                    {
                                        name: '--color-info-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--hover--background-a',
                                value: [
                                    {
                                        name: '--color-info-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--info--focus--background',
                        value: [
                            {
                                name: '--button--info--focus--background-h',
                                value: [
                                    {
                                        name: '--color-info-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--focus--background-s',
                                value: [
                                    {
                                        name: '--color-info-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--focus--background-l',
                                value: [
                                    {
                                        name: '--color-info-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--focus--background-a',
                                value: [
                                    {
                                        name: '--color-info-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--info--active--background',
                        value: [
                            {
                                name: '--button--info--active--background-h',
                                value: [
                                    {
                                        name: '--color-info-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--active--background-s',
                                value: [
                                    {
                                        name: '--color-info-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--active--background-l',
                                value: [
                                    {
                                        name: '--color-info-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--active--background-a',
                                value: [
                                    {
                                        name: '--color-info-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--success--background',
                        value: [
                            {
                                name: '--button--success--background-h',
                                value: [
                                    {
                                        name: '--color-success-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--background-s',
                                value: [
                                    {
                                        name: '--color-success-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--background-l',
                                value: [
                                    {
                                        name: '--color-success-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--background-a',
                                value: [
                                    {
                                        name: '--color-success-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--success--hover--background',
                        value: [
                            {
                                name: '--button--success--hover--background-h',
                                value: [
                                    {
                                        name: '--color-success-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--hover--background-s',
                                value: [
                                    {
                                        name: '--color-success-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--hover--background-l',
                                value: [
                                    {
                                        name: '--color-success-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--hover--background-a',
                                value: [
                                    {
                                        name: '--color-success-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--success--focus--background',
                        value: [
                            {
                                name: '--button--success--focus--background-h',
                                value: [
                                    {
                                        name: '--color-success-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--focus--background-s',
                                value: [
                                    {
                                        name: '--color-success-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--focus--background-l',
                                value: [
                                    {
                                        name: '--color-success-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--focus--background-a',
                                value: [
                                    {
                                        name: '--color-success-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--success--active--background',
                        value: [
                            {
                                name: '--button--success--active--background-h',
                                value: [
                                    {
                                        name: '--color-success-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--active--background-s',
                                value: [
                                    {
                                        name: '--color-success-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--active--background-l',
                                value: [
                                    {
                                        name: '--color-success-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--active--background-a',
                                value: [
                                    {
                                        name: '--color-success-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--warning--background',
                        value: [
                            {
                                name: '--button--warning--background-h',
                                value: [
                                    {
                                        name: '--color-warning-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--background-s',
                                value: [
                                    {
                                        name: '--color-warning-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--background-l',
                                value: [
                                    {
                                        name: '--color-warning-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--background-a',
                                value: [
                                    {
                                        name: '--color-warning-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--warning--hover--background',
                        value: [
                            {
                                name: '--button--warning--hover--background-h',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--hover--background-s',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--hover--background-l',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--hover--background-a',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--warning--focus--background',
                        value: [
                            {
                                name: '--button--warning--focus--background-h',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--focus--background-s',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--focus--background-l',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--focus--background-a',
                                value: [
                                    {
                                        name: '--color-warning-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--warning--active--background',
                        value: [
                            {
                                name: '--button--warning--active--background-h',
                                value: [
                                    {
                                        name: '--color-warning-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--active--background-s',
                                value: [
                                    {
                                        name: '--color-warning-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--active--background-l',
                                value: [
                                    {
                                        name: '--color-warning-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--active--background-a',
                                value: [
                                    {
                                        name: '--color-warning-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--danger--background',
                        value: [
                            {
                                name: '--button--danger--background-h',
                                value: [
                                    {
                                        name: '--color-danger-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--background-s',
                                value: [
                                    {
                                        name: '--color-danger-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--background-l',
                                value: [
                                    {
                                        name: '--color-danger-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--background-a',
                                value: [
                                    {
                                        name: '--color-danger-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--danger--hover--background',
                        value: [
                            {
                                name: '--button--danger--hover--background-h',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--hover--background-s',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--hover--background-l',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--hover--background-a',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--danger--focus--background',
                        value: [
                            {
                                name: '--button--danger--focus--background-h',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--focus--background-s',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--focus--background-l',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--focus--background-a',
                                value: [
                                    {
                                        name: '--color-danger-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--danger--active--background',
                        value: [
                            {
                                name: '--button--danger--active--background-h',
                                value: [
                                    {
                                        name: '--color-danger-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--active--background-s',
                                value: [
                                    {
                                        name: '--color-danger-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--active--background-l',
                                value: [
                                    {
                                        name: '--color-danger-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--active--background-a',
                                value: [
                                    {
                                        name: '--color-danger-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--light--background',
                        value: [
                            {
                                name: '--button--light--background-h',
                                value: [
                                    {
                                        name: '--color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--background-s',
                                value: [
                                    {
                                        name: '--color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--background-l',
                                value: [
                                    {
                                        name: '--color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--background-a',
                                value: [
                                    {
                                        name: '--color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--light--hover--background',
                        value: [
                            {
                                name: '--button--light--hover--background-h',
                                value: [
                                    {
                                        name: '--color-light-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--hover--background-s',
                                value: [
                                    {
                                        name: '--color-light-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--hover--background-l',
                                value: [
                                    {
                                        name: '--color-light-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--hover--background-a',
                                value: [
                                    {
                                        name: '--color-light-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--light--focus--background',
                        value: [
                            {
                                name: '--button--light--focus--background-h',
                                value: [
                                    {
                                        name: '--color-light-shade-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--focus--background-s',
                                value: [
                                    {
                                        name: '--color-light-shade-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--focus--background-l',
                                value: [
                                    {
                                        name: '--color-light-shade-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--focus--background-a',
                                value: [
                                    {
                                        name: '--color-light-shade-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--light--active--background',
                        value: [
                            {
                                name: '--button--light--active--background-h',
                                value: [
                                    {
                                        name: '--color-light-shade-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--active--background-s',
                                value: [
                                    {
                                        name: '--color-light-shade-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--active--background-l',
                                value: [
                                    {
                                        name: '--color-light-shade-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--active--background-a',
                                value: [
                                    {
                                        name: '--color-light-shade-100-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--dark--background',
                        value: [
                            {
                                name: '--button--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--background-a',
                                value: [
                                    {
                                        name: '--color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--dark--hover--background',
                        value: [
                            {
                                name: '--button--dark--hover--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--hover--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--hover--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--hover--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--dark--focus--background',
                        value: [
                            {
                                name: '--button--dark--focus--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--focus--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--focus--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--focus--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-50-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--dark--active--background',
                        value: [
                            {
                                name: '--button--dark--active--background-h',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--active--background-s',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--active--background-l',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--active--background-a',
                                value: [
                                    {
                                        name: '--color-dark-tint-100-a'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--color',
                value: [
                    {
                        name: '--button--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-light-h'
                            }
                        ]
                    },
                    {
                        name: '--button--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-light-s'
                            }
                        ]
                    },
                    {
                        name: '--button--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-light-l'
                            }
                        ]
                    },
                    {
                        name: '--button--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-light-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--button--primary--color',
                        value: [
                            {
                                name: '--button--primary--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--color',
                        value: [
                            {
                                name: '--button--secondary--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--info--color',
                        value: [
                            {
                                name: '--button--info--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--success--color',
                        value: [
                            {
                                name: '--button--success--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--warning--color',
                        value: [
                            {
                                name: '--button--warning--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--danger--color',
                        value: [
                            {
                                name: '--button--danger--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--light--color',
                        value: [
                            {
                                name: '--button--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--dark--color',
                        value: [
                            {
                                name: '--button--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--color-a',
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
                name: '--button--border-width',
                value: [
                    {
                        name: '--button--border-top-width',
                        value: [
                            {
                                name: '--border-top-width'
                            }
                        ]
                    },
                    {
                        name: '--button--border-right-width',
                        value: [
                            {
                                name: '--border-right-width'
                            }
                        ]
                    },
                    {
                        name: '--button--border-bottom-width',
                        value: [
                            {
                                name: '--border-bottom-width'
                            }
                        ]
                    },
                    {
                        name: '--button--border-left-width',
                        value: [
                            {
                                name: '--border-left-width'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--border-style',
                value: [
                    {
                        name: '--button--border-top-style',
                        value: [
                            {
                                name: '--border-top-style'
                            }
                        ]
                    },
                    {
                        name: '--button--border-right-style',
                        value: [
                            {
                                name: '--border-right-style'
                            }
                        ]
                    },
                    {
                        name: '--button--border-bottom-style',
                        value: [
                            {
                                name: '--border-bottom-style'
                            }
                        ]
                    },
                    {
                        name: '--button--border-left-style',
                        value: [
                            {
                                name: '--border-left-style'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--border-color',
                value: [
                    {
                        name: '--button--border-left-color',
                        value: []
                    },
                    {
                        name: '--button--border-top-color',
                        value: []
                    },
                    {
                        name: '--button--border-top-color',
                        value: []
                    },
                    {
                        name: '--button--border-right-color',
                        value: []
                    },
                    {
                        name: '--button--border-bottom-color',
                        value: []
                    },
                    {
                        name: '--button--border-left-color',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--button--primary--border-color',
                        value: [
                            {
                                name: '--button--primary--border-top-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--border-right-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--primary--border-left-color',
                                value: [
                                    {
                                        name: '--color-primary-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--secondary--border-color',
                        value: [
                            {
                                name: '--button--secondary--border-top-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--border-right-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--secondary--border-left-color',
                                value: [
                                    {
                                        name: '--color-secondary-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--info--border-color',
                        value: [
                            {
                                name: '--button--info--border-top-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--border-right-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--info--border-left-color',
                                value: [
                                    {
                                        name: '--color-info-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--success--border-color',
                        value: [
                            {
                                name: '--button--success--border-top-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--border-right-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--success--border-left-color',
                                value: [
                                    {
                                        name: '--color-success-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--warning--border-color',
                        value: [
                            {
                                name: '--button--warning--border-top-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--border-right-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--warning--border-left-color',
                                value: [
                                    {
                                        name: '--color-warning-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--danger--border-color',
                        value: [
                            {
                                name: '--button--danger--border-top-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--border-right-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--danger--border-left-color',
                                value: [
                                    {
                                        name: '--color-danger-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--light--border-color',
                        value: [
                            {
                                name: '--button--light--border-top-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--border-right-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--light--border-left-color',
                                value: [
                                    {
                                        name: '--color-light-shade-50'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--dark--border-color',
                        value: [
                            {
                                name: '--button--dark--border-top-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--border-right-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--border-bottom-color',
                                value: [
                                    {
                                        name: '--color-dark-tint-50'
                                    }
                                ]
                            },
                            {
                                name: '--button--dark--border-left-color',
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
                name: '--button--border-radius',
                value: [
                    {
                        name: '--button--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--button--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--button--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--button--border-bottom-left-radius',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--button--sm--border-radius',
                        value: [
                            {
                                name: '--button--sm--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--button--sm--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-sm'
                                    }
                                ]
                            },
                            {
                                name: '--button--sm--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--button--sm--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--button--md--border-radius',
                        value: [
                            {
                                name: '--button--md--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-md'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--button--md--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    },
                    {
                        name: '--button--lg--border-radius',
                        value: [
                            {
                                name: '--button--lg--border-top-left-radius',
                                value: [
                                    {
                                        name: '--border-top-left-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--border-top-right-radius',
                                value: [
                                    {
                                        name: '--border-top-right-radius-lg'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--border-bottom-right-radius',
                                value: []
                            },
                            {
                                name: '--button--lg--border-bottom-left-radius',
                                value: []
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--box-shadow',
                value: []
            },
            {
                name: '--button--font-size',
                value: [],
                variants: [
                    {
                        name: '--button--sm--font-size',
                        value: [
                            {
                                name: '--font-size-sm'
                            }
                        ]
                    },
                    {
                        name: '--button--md--font-size',
                        value: [
                            {
                                name: '--font-size-md'
                            }
                        ]
                    },
                    {
                        name: '--button--lg--font-size',
                        value: [
                            {
                                name: '--font-size-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--font-weight',
                value: [
                    {
                        name: '--font-weight-normal'
                    }
                ]
            },
            {
                name: '--button--line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
            },
            {
                name: '--button--padding',
                value: [
                    {
                        name: '--button--padding-top',
                        value: []
                    },
                    {
                        name: '--button--padding-right',
                        value: []
                    },
                    {
                        name: '--button--padding-bottom',
                        value: []
                    },
                    {
                        name: '--button--padding-left',
                        value: []
                    }
                ],
                variants: [
                    {
                        name: '--button--sm--padding',
                        value: [
                            {
                                name: '--button--sm--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-sm'
                                    }
                                ]
                            },
                            {
                                name: '--button--sm--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-sm'
                                    }
                                ]
                            },
                            {
                                name: '--button--sm--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-sm'
                                    }
                                ]
                            },
                            {
                                name: '--button--sm--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-sm'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--md--padding',
                        value: [
                            {
                                name: '--button--md--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-md'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-md'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-md'
                                    }
                                ]
                            },
                            {
                                name: '--button--md--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-md'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--button--lg--padding',
                        value: [
                            {
                                name: '--button--lg--padding-top',
                                value: [
                                    {
                                        name: '--padding-top-lg'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--padding-right',
                                value: [
                                    {
                                        name: '--padding-right-lg'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--padding-bottom',
                                value: [
                                    {
                                        name: '--padding-bottom-lg'
                                    }
                                ]
                            },
                            {
                                name: '--button--lg--padding-left',
                                value: [
                                    {
                                        name: '--padding-left-lg'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--transition',
                value: [
                    {
                        name: '--button--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--button--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--button--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    },
                    {
                        name: '--button--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
                            }
                        ]
                    },
                    {
                        name: '--button--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--button--transition-timing-function',
                        value: [
                            {
                                name: '--transition-timing-function'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--disabled--opacity',
                value: [
                    {
                        value: '0.8'
                    }
                ]
            },
            {
                name: '--button--hover--background',
                value: [
                    {
                        name: '--button--hover--background-h',
                        value: [
                            {
                                name: '--color-light-shade-50-h'
                            }
                        ]
                    },
                    {
                        name: '--button--hover--background-s',
                        value: [
                            {
                                name: '--color-light-shade-50-s'
                            }
                        ]
                    },
                    {
                        name: '--button--hover--background-l',
                        value: [
                            {
                                name: '--color-light-shade-50-l'
                            }
                        ]
                    },
                    {
                        name: '--button--hover--background-a',
                        value: [
                            {
                                name: '--color-light-shade-50-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--hover--border-color',
                value: []
            },
            {
                name: '--button--hover--color',
                value: []
            },
            {
                name: '--button--focus--background',
                value: [
                    {
                        name: '--button--focus--background-h',
                        value: [
                            {
                                name: '--color-light-shade-50-h'
                            }
                        ]
                    },
                    {
                        name: '--button--focus--background-s',
                        value: [
                            {
                                name: '--color-light-shade-50-s'
                            }
                        ]
                    },
                    {
                        name: '--button--focus--background-l',
                        value: [
                            {
                                name: '--color-light-shade-50-l'
                            }
                        ]
                    },
                    {
                        name: '--button--focus--background-a',
                        value: [
                            {
                                name: '--color-light-shade-50-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--focus--border-color',
                value: []
            },
            {
                name: '--button--focus--color',
                value: []
            },
            {
                name: '--button--active--background',
                value: [
                    {
                        name: '--button--active--background-h',
                        value: [
                            {
                                name: '--color-light-shade-100-h'
                            }
                        ]
                    },
                    {
                        name: '--button--active--background-s',
                        value: [
                            {
                                name: '--color-light-shade-100-s'
                            }
                        ]
                    },
                    {
                        name: '--button--active--background-l',
                        value: [
                            {
                                name: '--color-light-shade-100-l'
                            }
                        ]
                    },
                    {
                        name: '--button--active--background-a',
                        value: [
                            {
                                name: '--color-light-shade-100-a'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--active--border-color',
                value: []
            },
            {
                name: '--button--active--color',
                value: []
            },
            {
                name: '--button--block--margin',
                value: [
                    {
                        name: '--button--block--margin-top',
                        value: [
                            {
                                name: '--margin-top'
                            }
                        ]
                    },
                    {
                        name: '--button--block--margin-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--button--block--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--button--block--margin-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--button--link--color',
                value: []
            },
            {
                name: '--button--link--hover--color',
                value: []
            },
            {
                name: '--button--link--focus--color',
                value: []
            },
            {
                name: '--button--link--active--color',
                value: []
            },
            {
                name: '--button--circle--width',
                value: []
            },
            {
                name: '--button--circle--height',
                value: []
            },
            {
                name: '--button--square--width',
                value: []
            },
            {
                name: '--button--square--height',
                value: []
            },
            {
                name: '--button--loader--width',
                value: [
                    {
                        value: '1rem'
                    }
                ]
            },
            {
                name: '--button--loader--height',
                value: [
                    {
                        value: '1rem'
                    }
                ]
            },
            {
                name: '--button--icon--margin',
                value: [
                    {
                        name: '--button--icon--margin-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--button--icon--margin-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--button--icon--margin-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--button--icon--margin-left',
                        value: [
                            {
                                name: '--margin-right-1-2'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
