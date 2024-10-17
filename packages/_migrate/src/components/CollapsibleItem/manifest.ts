import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'CollapsibleItem',
    props: [
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description:
                'The unique identifier of the collapsible item, used for determining if the item is open or not'
        },
        {
            name: 'title',
            type: ['String'],
            default: '',
            description: 'The title of the collapsible item'
        }
    ],
    events: [],
    slots: [
        {
            name: 'header',
            description: 'Slot for collapsible item header content '
        },
        {
            name: 'default',
            description: 'Slot for default collapsible item content '
        }
    ],
    css: {
        selector: '.collapsible',
        variables: [
            {
                name: '--collapsible--box-shadow',
                value: []
            },
            {
                name: '--collapsible--header--border-width',
                value: []
            },
            {
                name: '--collapsible--header--border-style',
                value: []
            },
            {
                name: '--collapsible--header--border-color',
                value: []
            },
            {
                name: '--collapsible--header--background',
                value: []
            },
            {
                name: '--collapsible--header--color',
                value: []
            },
            {
                name: '--collapsible--header--padding',
                value: []
            },
            {
                name: '--collapsible--header--transition',
                value: [
                    {
                        name: '--collapsible--header--transition-property'
                    },
                    {
                        name: '--collapsible--header--transition-duration'
                    },
                    {
                        name: '--collapsible--header--transition-timing-function'
                    }
                ]
            },
            {
                name: '--collapsible--icon--width',
                value: [
                    {
                        value: '12px'
                    }
                ]
            },
            {
                name: '--collapsible--icon--height',
                value: [
                    {
                        value: '12px'
                    }
                ]
            },
            {
                name: '--collapsible--icon--transition',
                value: [
                    {
                        name: '--collapsible--icon--transition-property'
                    },
                    {
                        name: '--collapsible--icon--transition-duration'
                    },
                    {
                        name: '--collapsible--icon--transition-timing-function'
                    }
                ]
            },
            {
                name: '--collapsible--icon--color',
                value: []
            },
            {
                name: '--collapsible--body--border-width',
                value: []
            },
            {
                name: '--collapsible--body--border-style',
                value: []
            },
            {
                name: '--collapsible--body--border-color',
                value: []
            },
            {
                name: '--collapsible--body--background',
                value: []
            },
            {
                name: '--collapsible--body--color',
                value: []
            },
            {
                name: '--collapsible--body--padding',
                value: []
            },
            {
                name: '--collapsible--header--border-radius',
                value: [
                    {
                        name: '--collapsible--header--border-top-left-radius'
                    },
                    {
                        name: '--collapsible--header--border-top-right-radius'
                    },
                    {
                        name: '--collapsible--header--border-bottom-left-radius'
                    },
                    {
                        name: '--collapsible--header--border-bottom-right-radius'
                    }
                ]
            },
            {
                name: '--collapsible--body--border-radius',
                value: [
                    {
                        name: '--collapsible--body--border-bottom-left-radius'
                    },
                    {
                        name: '--collapsible--body--border-bottom-right-radius'
                    }
                ]
            }
        ]
    }
};

export default manifest;
