import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'INavItem',
    props: [
        {
            name: 'active',
            type: ['Boolean'],
            default: 'false',
            description: 'The active state of the nav item'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the nav item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'stopPropagation',
            type: ['Boolean'],
            default: 'false',
            description:
                'Used to close the nearest navbar or sidebar by propagating the onClick event'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the nav item'
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
            description: 'Slot for default nav item content '
        }
    ],
    css: {
        selector: '.nav',
        variables: [
            {
                name: '--nav--transition-property',
                value: [
                    {
                        value: 'background-color, border-color, color'
                    }
                ]
            },
            {
                name: '--nav--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--nav--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--nav--padding',
                value: [
                    {
                        name: '--nav--padding-top',
                        value: [
                            {
                                name: '--padding-top'
                            }
                        ]
                    },
                    {
                        name: '--nav--padding-right',
                        value: [
                            {
                                name: '--padding-right'
                            }
                        ]
                    },
                    {
                        name: '--nav--padding-bottom',
                        value: [
                            {
                                name: '--padding-bottom'
                            }
                        ]
                    },
                    {
                        name: '--nav--padding-left',
                        value: [
                            {
                                name: '--padding-left'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--nav--color'
            },
            {
                name: '--nav--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ]
            },
            {
                name: '--nav--disabled--color'
            },
            {
                name: '--nav--active--color'
            }
        ]
    }
};

export default manifest;
