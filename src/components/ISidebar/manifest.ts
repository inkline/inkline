import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ISidebar',
    props: [
        {
            name: 'ariaLabel',
            type: ['String'],
            default: 'Sidebar',
            description: 'The aria-label of the sidebar'
        },
        {
            name: 'collapse',
            type: ['Boolean', 'String'],
            default: "'md'",
            description:
                'Breakpoint to collapse the sidebar at. If boolean value, sets to always or never collapse'
        },
        {
            name: 'collapseOnItemClick',
            type: ['Boolean'],
            default: 'true',
            description: 'Determines if the sidebar should close when clicking a sidebar item'
        },
        {
            name: 'collapseOnClickOutside',
            type: ['Boolean'],
            default: 'true',
            description:
                'Determines if the sidebar should close when clicking outside, on the overlay'
        },
        {
            name: 'collapsePosition',
            type: ['fixed', 'absolute', 'relative'],
            default: 'absolute',
            description: 'The collapse position of the sidebar'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the sidebar'
        },
        {
            name: 'placement',
            type: ['left', 'right'],
            default: 'left',
            description: 'The placement of the sidebar'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the navbar'
        },
        {
            name: 'modelValue',
            type: ['Boolean'],
            default: 'false',
            description: 'Used to manually control the collapsed state of the sidebar'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for sidebar content '
        }
    ],
    css: {
        selector: '.sidebar-wrapper',
        variables: [
            {
                name: '--sidebar--z-index',
                value: [
                    {
                        value: '1030'
                    }
                ]
            },
            {
                name: '--sidebar--width',
                value: [
                    {
                        value: '14rem'
                    }
                ],
                variants: [
                    {
                        name: '--sidebar--sm--width',
                        value: [
                            {
                                value: 'calc(#{14rem} * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--md--width',
                        value: [
                            {
                                value: 'calc(#{14rem} * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--lg--width',
                        value: [
                            {
                                value: 'calc(#{14rem} * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--color',
                variants: [
                    {
                        name: '--sidebar--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--background',
                variants: [
                    {
                        name: '--sidebar--light--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--transition-property',
                value: [
                    {
                        value: 'background-color,\n            color,\n            border-color,\n            transform'
                    }
                ]
            },
            {
                name: '--sidebar--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--sidebar--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--sidebar--box-shadow',
                value: [
                    {
                        value: '(\n                var(--sidebar--box-shadow-x-offset, var(--box-shadow-offset-x))\n                    var(--sidebar--box-shadow-y-offset, var(--box-shadow-offset-y))\n                    var(--sidebar--box-shadow-blur-radius, var(--box-shadow-blur-radius))\n                    var(--sidebar--box-shadow-spread-radius, var(--box-shadow-spread-radius))\n                    var(--sidebar--box-shadow-color, var(--box-shadow-color))\n            )'
                    }
                ]
            },
            {
                name: '--sidebar--border-width',
                value: [
                    {
                        value: '(\n                var(--sidebar--border-top-width, var(--border-top-width))\n                    var(--sidebar--border-right-width, var(--border-right-width))\n                    var(--sidebar--border-bottom-width, var(--border-bottom-width))\n                    var(--sidebar--border-left-width, var(--border-left-width))\n            )'
                    }
                ]
            },
            {
                name: '--sidebar--border-style',
                value: [
                    {
                        value: '(\n                var(--sidebar--border-top-style, var(--border-top-style))\n                    var(--sidebar--border-right-style, var(--border-right-style))\n                    var(--sidebar--border-bottom-style, var(--border-bottom-style))\n                    var(--sidebar--border-left-style, var(--border-left-style))\n            )'
                    }
                ]
            },
            {
                name: '--sidebar--border-color',
                value: [
                    {
                        value: '(\n                var(--sidebar--border-top-color, var(--border-top-color))\n                    var(--sidebar--border-right-color, var(--border-right-color))\n                    var(--sidebar--border-bottom-color, var(--border-bottom-color))\n                    var(--sidebar--border-left-color, var(--border-left-color))\n            )'
                    }
                ]
            },
            {
                name: '--sidebar--border-radius',
                value: [
                    {
                        value: '(\n                var(--sidebar--border-top-left-radius, var(--border-top-left-radius))\n                    var(--sidebar--border-top-right-radius, var(--border-top-right-radius))\n                    var(--sidebar--border-bottom-right-radius, var(--border-bottom-right-radius))\n                    var(--sidebar--border-bottom-left-radius, var(--border-bottom-left-radius))\n            )'
                    }
                ]
            },
            {
                name: '--sidebar--padding',
                value: [
                    {
                        value: '(\n                var(--sidebar--padding-top, var(--padding-top))\n                    var(--sidebar--padding-right, var(--padding-right))\n                    var(--sidebar--padding-bottom, var(--padding-bottom))\n                    var(--sidebar--padding-left, var(--padding-left))\n            )'
                    }
                ]
            },
            {
                name: '--sidebar--overlay--background',
                value: [
                    {
                        value: 'rgba(0, 0, 0, 0.5)'
                    }
                ]
            },
            {
                name: '--sidebar--border-top-left-radius',
                value: [
                    {
                        name: '--border-top-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--sidebar--sm--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--md--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--lg--border-top-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--sidebar--border-bottom-left-radius',
                value: [
                    {
                        name: '--border-bottom-left-radius'
                    }
                ],
                variants: [
                    {
                        name: '--sidebar--sm--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--md--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--sidebar--lg--border-bottom-left-radius',
                        value: [
                            {
                                value: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
