import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'HamburgerMenu',
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
                name: '--hamburger-menu--width',
                value: [],
                variants: [
                    {
                        name: '--hamburger-menu--sm--width',
                        value: [
                            {
                                name: '--hamburger-menu--sm--bar--width'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--sm--bar--width',
                        value: [
                            {
                                value: 'calc(30px * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--md--width',
                        value: [
                            {
                                name: '--hamburger-menu--md--bar--width'
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
                        name: '--hamburger-menu--lg--width',
                        value: [
                            {
                                name: '--hamburger-menu--lg--bar--width'
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
                name: '--hamburger-menu--height',
                value: [],
                variants: [
                    {
                        name: '--hamburger-menu--sm--height',
                        value: [
                            {
                                value: 'calc(\n      var(--hamburger-menu--sm--bar--height) * 3 +\n        var(--hamburger-menu--sm--bar--spacing) * 2\n    )'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--sm--bar--height',
                        value: [
                            {
                                value: '2px'
                            }
                        ]
                    },
                    {
                        name: '--hamburger-menu--md--height',
                        value: [
                            {
                                value: 'calc(\n      var(--hamburger-menu--md--bar--height) * 3 +\n        var(--hamburger-menu--md--bar--spacing) * 2\n    )'
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
                        name: '--hamburger-menu--lg--height',
                        value: [
                            {
                                value: 'calc(\n      var(--hamburger-menu--lg--bar--height) * 3 +\n        var(--hamburger-menu--lg--bar--spacing) * 2\n    )'
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
                name: '--hamburger-menu--transition',
                value: [
                    {
                        name: '--hamburger-menu--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
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
                        value: []
                    },
                    {
                        name: '--hamburger-menu--transition-property',
                        value: [
                            {
                                value: 'background-color, color, border-color'
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
                        value: []
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
                value: []
            },
            {
                name: '--hamburger-menu--bar--border-radius',
                value: [
                    {
                        name: '--hamburger-menu--bar--border-top-left-radius',
                        value: []
                    },
                    {
                        name: '--hamburger-menu--bar--border-top-right-radius',
                        value: []
                    },
                    {
                        name: '--hamburger-menu--bar--border-bottom-right-radius',
                        value: []
                    },
                    {
                        name: '--hamburger-menu--bar--border-bottom-left-radius',
                        value: []
                    }
                ]
            },
            {
                name: '--hamburger-menu--bar--background',
                value: []
            },
            {
                name: '--hamburger-menu--bar--width',
                value: []
            },
            {
                name: '--hamburger-menu--bar--transition',
                value: [
                    {
                        name: '--hamburger-menu--bar--transition-property',
                        value: [
                            {
                                value: 'background, transform'
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
                        value: []
                    },
                    {
                        name: '--hamburger-menu--bar--transition-property',
                        value: [
                            {
                                value: 'background, transform'
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
                        value: []
                    }
                ]
            },
            {
                name: '--hamburger-menu--bar--spacing',
                value: [
                    {
                        value: '4px'
                    }
                ]
            }
        ]
    }
};

export default manifest;
