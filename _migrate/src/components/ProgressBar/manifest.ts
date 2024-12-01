import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ProgressBar',
    props: [
        {
            name: 'color',
            type: ['light', 'dark', 'primary', 'secondary', 'info', 'success', 'warning', 'danger'],
            default: 'primary',
            description: 'The color variant of the progress bar'
        },
        {
            name: 'value',
            type: ['Number'],
            default: '0',
            description: 'The value of the progress bar'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default progress bar content '
        }
    ],
    css: {
        selector: '.progress-bar',
        variables: [
            {
                name: '--progress-bar--background',
                value: [
                    {
                        name: '--progress-bar--background-h',
                        value: [
                            {
                                name: '--color-primary-h'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--background-s',
                        value: [
                            {
                                name: '--color-primary-s'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--background-l',
                        value: [
                            {
                                name: '--color-primary-l'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--background-a',
                        value: [
                            {
                                name: '--color-primary-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--progress-bar--primary--background',
                        value: [
                            {
                                name: '--progress-bar--primary--background-h',
                                value: [
                                    {
                                        name: '--color-primary-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--primary--background-s',
                                value: [
                                    {
                                        name: '--color-primary-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--primary--background-l',
                                value: [
                                    {
                                        name: '--color-primary-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--primary--background-a',
                                value: [
                                    {
                                        name: '--color-primary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--secondary--background',
                        value: [
                            {
                                name: '--progress-bar--secondary--background-h',
                                value: [
                                    {
                                        name: '--color-secondary-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--secondary--background-s',
                                value: [
                                    {
                                        name: '--color-secondary-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--secondary--background-l',
                                value: [
                                    {
                                        name: '--color-secondary-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--secondary--background-a',
                                value: [
                                    {
                                        name: '--color-secondary-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--info--background',
                        value: [
                            {
                                name: '--progress-bar--info--background-h',
                                value: [
                                    {
                                        name: '--color-info-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--info--background-s',
                                value: [
                                    {
                                        name: '--color-info-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--info--background-l',
                                value: [
                                    {
                                        name: '--color-info-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--info--background-a',
                                value: [
                                    {
                                        name: '--color-info-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--success--background',
                        value: [
                            {
                                name: '--progress-bar--success--background-h',
                                value: [
                                    {
                                        name: '--color-success-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--success--background-s',
                                value: [
                                    {
                                        name: '--color-success-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--success--background-l',
                                value: [
                                    {
                                        name: '--color-success-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--success--background-a',
                                value: [
                                    {
                                        name: '--color-success-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--warning--background',
                        value: [
                            {
                                name: '--progress-bar--warning--background-h',
                                value: [
                                    {
                                        name: '--color-warning-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--warning--background-s',
                                value: [
                                    {
                                        name: '--color-warning-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--warning--background-l',
                                value: [
                                    {
                                        name: '--color-warning-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--warning--background-a',
                                value: [
                                    {
                                        name: '--color-warning-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--danger--background',
                        value: [
                            {
                                name: '--progress-bar--danger--background-h',
                                value: [
                                    {
                                        name: '--color-danger-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--danger--background-s',
                                value: [
                                    {
                                        name: '--color-danger-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--danger--background-l',
                                value: [
                                    {
                                        name: '--color-danger-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--danger--background-a',
                                value: [
                                    {
                                        name: '--color-danger-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--light--background',
                        value: [
                            {
                                name: '--progress-bar--light--background-h',
                                value: [
                                    {
                                        name: '--color-white-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--light--background-s',
                                value: [
                                    {
                                        name: '--color-white-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--light--background-l',
                                value: [
                                    {
                                        name: '--color-white-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--light--background-a',
                                value: [
                                    {
                                        name: '--color-white-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--dark--background',
                        value: [
                            {
                                name: '--progress-bar--dark--background-h',
                                value: [
                                    {
                                        name: '--color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--dark--background-s',
                                value: [
                                    {
                                        name: '--color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--dark--background-l',
                                value: [
                                    {
                                        name: '--color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--dark--background-a',
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
                name: '--progress-bar--color',
                value: [
                    {
                        name: '--progress-bar--color-h',
                        value: [
                            {
                                name: '--contrast-text-color-dark-h'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--color-s',
                        value: [
                            {
                                name: '--contrast-text-color-dark-s'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--color-l',
                        value: [
                            {
                                name: '--contrast-text-color-dark-l'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--color-a',
                        value: [
                            {
                                name: '--contrast-text-color-dark-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--progress-bar--primary--color',
                        value: [
                            {
                                name: '--progress-bar--primary--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--primary--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--primary--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--primary--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--secondary--color',
                        value: [
                            {
                                name: '--progress-bar--secondary--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--secondary--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--secondary--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--secondary--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--info--color',
                        value: [
                            {
                                name: '--progress-bar--info--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--info--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--info--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--info--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--success--color',
                        value: [
                            {
                                name: '--progress-bar--success--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--success--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--success--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--success--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--warning--color',
                        value: [
                            {
                                name: '--progress-bar--warning--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--warning--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--warning--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--warning--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--danger--color',
                        value: [
                            {
                                name: '--progress-bar--danger--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--danger--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--danger--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--danger--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--light--color',
                        value: [
                            {
                                name: '--progress-bar--light--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--light--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--light--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--light--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--dark--color',
                        value: [
                            {
                                name: '--progress-bar--dark--color-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--dark--color-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--dark--color-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--progress-bar--dark--color-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
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
