import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ITab',
    props: [
        {
            name: 'title',
            type: ['String'],
            default: '',
            description: 'The title of the tab'
        },
        {
            name: 'name',
            type: ['String'],
            default: 'uid()',
            description: 'The name of the tab, used as an identifier'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for tab content '
        }
    ],
    css: {
        selector: '.tab',
        variables: [
            {
                name: '--tabs--tab--background',
                value: []
            },
            {
                name: '--tabs--tab--border-radius',
                value: []
            },
            {
                name: '--tabs--tab--border-width',
                value: []
            },
            {
                name: '--tabs--tab--border-style',
                value: []
            },
            {
                name: '--tabs--tab--border-color',
                value: []
            },
            {
                name: '--tabs--tab--color',
                value: []
            },
            {
                name: '--tabs--tab--transition',
                value: [
                    {
                        name: '--tabs--tab--transition-property'
                    },
                    {
                        name: '--tabs--tab--transition-duration'
                    },
                    {
                        name: '--tabs--tab--transition-timing-function'
                    }
                ]
            },
            {
                name: '--tabs--tab--font-size',
                value: []
            },
            {
                name: '--tabs--tab--padding',
                value: []
            }
        ]
    }
};

export default manifest;
