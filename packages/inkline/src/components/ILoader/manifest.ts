import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ILoader',
    props: [
        {
            name: 'color',
            type: ['primary', 'light', 'dark'],
            default: '',
            description: 'The color variant of the loader'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg', 'auto'],
            default: '',
            description: 'The size variant of the loader'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default loader content '
        }
    ],
    css: {
        selector: '.loader',
        variables: [
            {
                name: '--loader--width',
                value: [],
                variants: [
                    {
                        name: '--loader--sm--width',
                        value: [
                            {
                                value: 'calc(64px * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--loader--md--width',
                        value: [
                            {
                                value: 'calc(64px * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--loader--lg--width',
                        value: [
                            {
                                value: 'calc(64px * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--loader--height',
                value: [
                    {
                        value: '64px'
                    }
                ]
            },
            {
                name: '--loader--animation',
                value: [
                    {
                        name: '--loader--animation-duration',
                        value: [
                            {
                                value: '1.2s'
                            }
                        ]
                    },
                    {
                        name: '--loader--animation-duration',
                        value: [
                            {
                                value: '1.2s'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--loader--background',
                value: [
                    {
                        name: '--loader--background-h',
                        value: [
                            {
                                name: '--color-primary-h'
                            }
                        ]
                    },
                    {
                        name: '--loader--background-s',
                        value: [
                            {
                                name: '--color-primary-s'
                            }
                        ]
                    },
                    {
                        name: '--loader--background-l',
                        value: [
                            {
                                name: '--color-primary-l'
                            }
                        ]
                    },
                    {
                        name: '--loader--background-a',
                        value: [
                            {
                                name: '--color-primary-a'
                            }
                        ]
                    }
                ],
                variants: [
                    {
                        name: '--loader--light--background',
                        value: [
                            {
                                name: '--loader--light--background-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-h'
                                    }
                                ]
                            },
                            {
                                name: '--loader--light--background-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-s'
                                    }
                                ]
                            },
                            {
                                name: '--loader--light--background-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-l'
                                    }
                                ]
                            },
                            {
                                name: '--loader--light--background-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-light-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--loader--dark--background',
                        value: [
                            {
                                name: '--loader--dark--background-h',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-h'
                                    }
                                ]
                            },
                            {
                                name: '--loader--dark--background-s',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-s'
                                    }
                                ]
                            },
                            {
                                name: '--loader--dark--background-l',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-l'
                                    }
                                ]
                            },
                            {
                                name: '--loader--dark--background-a',
                                value: [
                                    {
                                        name: '--contrast-text-color-dark-a'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--loader--primary--background',
                        value: [
                            {
                                name: '--loader--primary--background-h',
                                value: [
                                    {
                                        name: '--color-primary-h'
                                    }
                                ]
                            },
                            {
                                name: '--loader--primary--background-s',
                                value: [
                                    {
                                        name: '--color-primary-s'
                                    }
                                ]
                            },
                            {
                                name: '--loader--primary--background-l',
                                value: [
                                    {
                                        name: '--color-primary-l'
                                    }
                                ]
                            },
                            {
                                name: '--loader--primary--background-a',
                                value: [
                                    {
                                        name: '--color-primary-a'
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
