import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IDropdownItem',
    props: [
        {
            name: 'active',
            type: ['Boolean'],
            default: 'false',
            description: 'The active state of the dropdown item'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the dropdown item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'plaintext',
            type: ['String'],
            default: 'div',
            description: 'Display the dropdown item as plaintext'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the dropdown item'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the list group item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as a Router Link component with a `to` attribute'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default dropdown item content '
        }
    ],
    css: {
        selector: '.dropdown',
        variables: [
            {
                name: '--dropdown--item--margin',
                value: [
                    {
                        value: '(\n            var(--dropdown--item--margin-top, 0)\n                var(\n                    --dropdown--item--margin-right,\n                    var(--dropdown--body--padding-right, calc(var(--dropdown--padding-right) * -1))\n                )\n                var(--dropdown--item--margin-bottom, 0)\n                var(\n                    --dropdown--item--margin-left,\n                    var(--dropdown--body--padding-left, calc(var(--dropdown--padding-left) * -1))\n                )\n        )'
                    }
                ]
            },
            {
                name: '--dropdown--item--transition-property',
                value: [
                    {
                        value: '(background-color, border-color, color)'
                    }
                ]
            },
            {
                name: '--dropdown--item--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--dropdown--item--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--dropdown--item--color',
                value: [
                    {
                        name: '--dropdown--color'
                    }
                ]
            },
            {
                name: '--dropdown--item--border-style',
                value: [
                    {
                        name: '--dropdown--border-style',
                        value: [
                            {
                                value: '(\n                var(\n                        --dropdown--item--border-top-style,\n                        var(--dropdown--border-top-style, var(--border-top-style))))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-right-style',
                        value: [
                            {
                                name: '--dropdown--border-right-style',
                                value: [
                                    {
                                        name: '--border-right-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-bottom-style',
                        value: [
                            {
                                name: '--dropdown--border-bottom-style',
                                value: [
                                    {
                                        name: '--border-bottom-style'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-left-style',
                        value: [
                            {
                                name: '--dropdown--border-left-style',
                                value: [
                                    {
                                        name: '--border-left-style'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--item--border-width',
                value: [
                    {
                        value: '(\n            var(--dropdown--item--border-top-width, 0) var(--dropdown--item--border-right-width, 0)\n                var(--dropdown--item--border-bottom-width, 0)\n                var(--dropdown--item--border-left-width, 0)\n        )'
                    }
                ]
            },
            {
                name: '--dropdown--item--border-color',
                value: [
                    {
                        name: '--dropdown--border-color',
                        value: [
                            {
                                value: '(\n                var(\n                        --dropdown--item--border-top-color,\n                        var(--dropdown--border-top-color, var(--border-top-color))))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-right-color',
                        value: [
                            {
                                name: '--dropdown--border-right-color',
                                value: [
                                    {
                                        name: '--border-right-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-bottom-color',
                        value: [
                            {
                                name: '--dropdown--border-bottom-color',
                                value: [
                                    {
                                        name: '--border-bottom-color'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--border-left-color',
                        value: [
                            {
                                name: '--dropdown--border-left-color',
                                value: [
                                    {
                                        name: '--border-left-color'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--item--padding',
                value: [
                    {
                        name: '--dropdown--padding',
                        value: [
                            {
                                value: '(\n                var(\n                        --dropdown--item--padding-top,\n                        calc(var(--dropdown--padding-top, var(--padding-top)))))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--padding-right',
                        value: [
                            {
                                name: '--dropdown--padding-right',
                                value: [
                                    {
                                        name: '--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--padding-bottom',
                        value: [
                            {
                                value: 'calc(var(--dropdown--padding-bottom, var(--padding-bottom)))'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--item--padding-left',
                        value: [
                            {
                                name: '--dropdown--padding-left',
                                value: [
                                    {
                                        name: '--padding-left'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--item--background',
                value: [
                    {
                        name: '--dropdown--background',
                        value: [
                            {
                                value: 'transparent'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--dropdown--item--hover--color',
                value: [
                    {
                        name: '--dropdown--item--color'
                    }
                ]
            },
            {
                name: '--dropdown--item--hover--background',
                value: [
                    {
                        name: '--dropdown--item--background'
                    }
                ]
            },
            {
                name: '--dropdown--item--disabled--color',
                value: [
                    {
                        name: '--dropdown--item--color'
                    }
                ]
            },
            {
                name: '--dropdown--item--disabled--background',
                value: [
                    {
                        name: '--dropdown--item--background'
                    }
                ]
            },
            {
                name: '--dropdown--item--active--color',
                value: [
                    {
                        name: '--dropdown--item--color'
                    }
                ]
            },
            {
                name: '--dropdown--item--active--background',
                value: [
                    {
                        name: '--dropdown--item--background'
                    }
                ]
            },
            {
                name: '--dropdown--item--active--font-weight',
                value: [
                    {
                        name: '--font-weight-semibold'
                    }
                ]
            }
        ]
    }
};

export default manifest;
