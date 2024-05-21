import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ITabTitle',
    props: [
        {
            name: 'for',
            type: ['String'],
            default: '',
            description: 'The name of the referenced tab'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for tab title content '
        }
    ],
    css: {
        selector: '.tab-title',
        variables: [
            {
                name: '--tabs--title--background',
                value: []
            },
            {
                name: '--tabs--title--border-radius',
                value: []
            },
            {
                name: '--tabs--title--border-width',
                value: []
            },
            {
                name: '--tabs--title--border-style',
                value: []
            },
            {
                name: '--tabs--title--border-color',
                value: []
            },
            {
                name: '--tabs--title--color',
                value: []
            },
            {
                name: '--tabs--title--font-size',
                value: []
            },
            {
                name: '--tabs--title--padding',
                value: []
            },
            {
                name: '--tabs--title--transition',
                value: [
                    {
                        name: '--tabs--title--transition-property'
                    },
                    {
                        name: '--tabs--title--transition-duration'
                    },
                    {
                        name: '--tabs--title--transition-timing-function'
                    }
                ]
            },
            {
                name: '--tabs--title--hover--background',
                value: []
            },
            {
                name: '--tabs--title--hover--border-color',
                value: []
            },
            {
                name: '--tabs--title--hover--color',
                value: []
            },
            {
                name: '--tabs--title--focus--background',
                value: []
            },
            {
                name: '--tabs--title--focus--border-color',
                value: []
            },
            {
                name: '--tabs--title--focus--color',
                value: []
            },
            {
                name: '--tabs--title--active--background',
                value: []
            },
            {
                name: '--tabs--title--active--border-color',
                value: []
            },
            {
                name: '--tabs--title--active--color',
                value: []
            },
            {
                name: '--tabs--title--active--font-weight',
                value: []
            }
        ]
    }
};

export default manifest;
