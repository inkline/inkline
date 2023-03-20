import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ITooltip',
    props: [
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the tooltip'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the tooltip'
        },
        {
            name: 'visible',
            type: ['Boolean'],
            default: 'undefined',
            description: 'Used to manually control the visibility of the tooltip'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The identifier of the tooltip'
        },
        {
            name: 'arrow',
            type: ['Boolean'],
            default: 'true',
            description: 'Displays an arrow on the tooltip pointing to the trigger element'
        },
        {
            name: 'placement',
            type: [
                'top',
                'top-start',
                'top-end',
                'bottom',
                'bottom-start',
                'bottom-end',
                'left',
                'left-start',
                'left-end',
                'right',
                'right-start',
                'right-end'
            ],
            default: 'false',
            description: 'The placement of the tooltip'
        },
        {
            name: 'events',
            type: ['hover', 'focus', 'click', 'manual'],
            default: 'hover, focus',
            description: 'The events used to trigger the tooltip'
        },
        {
            name: 'offset',
            type: ['Number'],
            default: '6',
            description: 'The offset of the tooltip relative to the trigger element'
        },
        {
            name: 'interactable',
            type: ['Boolean'],
            default: 'false',
            description:
                'Determines whether hover state should be transferred from trigger to popup'
        },
        {
            name: 'popupOptions',
            type: ['Object'],
            default: '',
            description: 'Used to override the floating-ui options used for creating the tooltip'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the tooltip'
        },
        {
            name: 'hoverHideDelay',
            type: ['Number'],
            default: '300',
            description: 'Delay in milliseconds before the tooltip is hidden on hover'
        },
        {
            name: 'animationDuration',
            type: ['Number'],
            default: '300',
            description: 'Animation duration in milliseconds'
        }
    ],
    events: [
        {
            description: 'Event emitted for setting the visible',
            name: 'update:visible'
        },
        {
            description: 'Event emitted when clicking outside the tooltip',
            name: 'click:outside'
        }
    ],
    slots: [
        {
            name: 'default',
            description: 'Slot for tooltip trigger '
        },
        {
            name: 'body',
            description: 'Slot for tooltip body content '
        }
    ],
    css: {
        selector: '.tooltip-wrapper',
        variables: [
            {
                name: '--tooltip--line-height',
                value: [
                    {
                        name: '--line-height'
                    }
                ]
            },
            {
                name: '--tooltip--border-width',
                value: [
                    {
                        value: '(\n                var(--tooltip--border-top-width, var(--border-top-width))\n                    var(--tooltip--border-right-width, var(--border-right-width))\n                    var(--tooltip--border-bottom-width, var(--border-bottom-width))\n                    var(--tooltip--border-left-width, var(--border-left-width))\n            )'
                    }
                ]
            },
            {
                name: '--tooltip--border-style',
                value: [
                    {
                        value: '(\n                var(--tooltip--border-top-style, var(--border-top-style))\n                    var(--tooltip--border-right-style, var(--border-right-style))\n                    var(--tooltip--border-bottom-style, var(--border-bottom-style))\n                    var(--tooltip--border-left-style, var(--border-left-style))\n            )'
                    }
                ]
            },
            {
                name: '--tooltip--color',
                variants: [
                    {
                        name: '--tooltip--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-white'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--background',
                variants: [
                    {
                        name: '--tooltip--light--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--border-color',
                value: [
                    {
                        value: '(\n                var(--tooltip--border-top-color, var(--border-top-color))\n                    var(--tooltip--border-right-color, var(--border-right-color))\n                    var(--tooltip--border-bottom-color, var(--border-bottom-color))\n                    var(--tooltip--border-left-color, var(--border-left-color))\n            )'
                    }
                ]
            },
            {
                name: '--tooltip--border-radius',
                value: [
                    {
                        value: '(\n                var(--tooltip--border-top-left-radius, var(--border-top-left-radius))\n                    var(--tooltip--border-top-right-radius, var(--border-top-right-radius))\n                    var(--tooltip--border-bottom-right-radius, var(--border-bottom-right-radius))\n                    var(--tooltip--border-bottom-left-radius, var(--border-bottom-left-radius))\n            )'
                    }
                ]
            },
            {
                name: '--tooltip--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--tooltip--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--tooltip--padding',
                value: [
                    {
                        value: '(\n                var(--tooltip--padding-top, var(--padding-top))\n                    var(--tooltip--padding-right, var(--padding-right))\n                    var(--tooltip--padding-bottom, var(--padding-bottom))\n                    var(--tooltip--padding-left, var(--padding-left))\n            )'
                    }
                ]
            },
            {
                name: '--tooltip--box-shadow',
                value: [
                    {
                        name: '--tooltip--box-shadow-x-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-x'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--box-shadow-y-offset',
                        value: [
                            {
                                name: '--box-shadow-offset-y'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--box-shadow-blur-radius',
                        value: [
                            {
                                name: '--box-shadow-blur-radius'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--box-shadow-spread-radius',
                        value: [
                            {
                                name: '--box-shadow-spread-radius'
                            }
                        ]
                    },
                    {
                        name: '--tooltip--box-shadow-color',
                        value: [
                            {
                                name: '--box-shadow-color'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
