import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'ISelectOption',
    props: [
        {
            name: 'label',
            type: ['String', 'Number', 'Boolean', 'Function', 'Object'],
            default: 'undefined',
            description:
                'The label of the select option. Can be a string, number, render function, or component'
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the list group item'
        },
        {
            name: 'option',
            type: ['Object'],
            default: '',
            description: 'The select option'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for select option label '
        }
    ],
    css: {
        selector: '.select-option',
        variables: [
            {
                name: '--select--option--border-width',
                value: []
            },
            {
                name: '--select--option--border-style',
                value: []
            },
            {
                name: '--select--option--border-color',
                value: []
            },
            {
                name: '--select--option--background',
                value: []
            },
            {
                name: '--select--option--color',
                value: []
            },
            {
                name: '--select--option--padding',
                value: []
            },
            {
                name: '--select--option--transition',
                value: [
                    {
                        name: '--select--option--transition-property'
                    },
                    {
                        name: '--select--option--transition-duration'
                    },
                    {
                        name: '--select--option--transition-timing-function'
                    }
                ]
            },
            {
                name: '--select--option--hover--background',
                value: []
            },
            {
                name: '--select--option--hover--color',
                value: []
            },
            {
                name: '--select--option--focus--background',
                value: []
            },
            {
                name: '--select--option--focus--color',
                value: []
            },
            {
                name: '--select--option--disabled--color',
                value: []
            },
            {
                name: '--select--option--disabled--background',
                value: []
            },
            {
                name: '--select--option--active--background',
                value: []
            },
            {
                name: '--select--option--active--color',
                value: []
            }
        ]
    }
};

export default manifest;
