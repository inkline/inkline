import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IHamburgerMenu',
    props: [
        {
            name: 'animation',
            type: ['close', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'plus', 'minus'],
            default: 'close',
            description: 'The animation of the hamburger menu'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the hamburger menu'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the hamburger menu'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to set the hamburger menu as opened or closed'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    slots: [],
    css: {
        selector: '.hamburger-menu',
        variables: [
            {
                name: '--hamburger-menu--opacity',
                value: [
                    {
                        value: '0.75'
                    }
                ]
            },
            {
                name: '--hamburger-menu--padding',
                value: [
                    {
                        name: '--hamburger-menu--padding-top',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--padding-right',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--padding-bottom',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--padding-left',
                        value: [
                            {
                                value: '0'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--hamburger-menu--bar--width',
                variants: [
                    {
                        name: '--hamburger-menu--sm--bar--width',
                        value: [
                            {
                                value: 'calc(30px * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--md--bar--width',
                        value: [
                            {
                                value: 'calc(30px * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--lg--bar--width',
                        value: [
                            {
                                value: 'calc(30px * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--hamburger-menu--transition-property',
                value: [
                    {
                        value: 'background-color,\n        color,\n        border-color'
                    }
                ]
            },
            {
                name: '--hamburger-menu--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--hamburger-menu--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--hamburger-menu--hover--opacity',
                value: [
                    {
                        value: '1'
                    }
                ]
            },
            {
                name: '--hamburger-menu--bar--height',
                variants: [
                    {
                        name: '--hamburger-menu--sm--bar--height',
                        value: [
                            {
                                value: '2px'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--md--bar--height',
                        value: [
                            {
                                value: '3px'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--lg--bar--height',
                        value: [
                            {
                                value: '4px'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--hamburger-menu--bar--border-radius',
                value: [
                    {
                        name: '--border-radius-sm'
                    }
                ],
                variants: [
                    {
                        name: '--hamburger-menu--sm--bar--border-radius',
                        value: [
                            {
                                value: '1px'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--md--bar--border-radius',
                        value: [
                            {
                                value: '2px'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--lg--bar--border-radius',
                        value: [
                            {
                                value: '3px'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--hamburger-menu--background',
                variants: [
                    {
                        name: '--hamburger-menu--light--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--dark--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--hamburger-menu--bar--transition-property',
                value: [
                    {
                        value: 'background-color,\n                transform'
                    }
                ]
            },
            {
                name: '--hamburger-menu--bar--transition-duration',
                value: [
                    {
                        value: '175ms'
                    }
                ]
            },
            {
                name: '--hamburger-menu--bar--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            }
        ]
    }
};

export default manifest;
