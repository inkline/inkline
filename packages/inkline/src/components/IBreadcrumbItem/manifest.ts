import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IBreadcrumbItem',
    props: [
        {
            name: 'active',
            type: ['Boolean'],
            default: 'false',
            description: 'The active state of the breadcrumb item'
        },
        {
            name: 'disabled',
            type: ['Boolean'],
            default: 'false',
            description: 'The disabled state of the breadcrumb item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: ''
        },
        {
            name: 'tabindex',
            type: ['Number', 'String'],
            default: '0',
            description: 'The tabindex of the breadcrumb item'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'a',
            description: 'Set the HTML tag to be used for rendering the breadcrumb item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: ''
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default breadcrumb item content '
        }
    ],
    css: {
        selector: '.breadcrumb-item',
        variables: [
            {
                name: '--breadcrumb--padding',
                value: [
                    {
                        name: '--breadcrumb--padding-left'
                    },
                    {
                        name: '--breadcrumb--padding-right'
                    }
                ]
            },
            {
                name: '--breadcrumb--color',
                value: []
            },
            {
                name: '--breadcrumb--active--color',
                value: []
            },
            {
                name: '--breadcrumb--separator',
                value: []
            },
            {
                name: '--breadcrumb--link--color',
                value: []
            }
        ]
    }
};

export default manifest;
