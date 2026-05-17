import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'BreadcrumbItem',
        props: [
            {
                name: 'active',
                type: 'boolean',
                description: 'The active state of the breadcrumb item',
                default: 'false'
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the breadcrumb item',
                default: 'false'
            },
            {
                name: 'to',
                type: 'string',
                description: '',
                default: 'undefined'
            },
            {
                name: 'tabindex',
                type: 'number | string',
                description: 'The tabindex of the breadcrumb item',
                default: '0'
            },
            {
                name: 'tag',
                type: 'string',
                description: 'Set the HTML tag to be used for rendering the breadcrumb item',
                default: 'a'
            },
            {
                name: 'to',
                type: 'string',
                description: '',
                default: 'undefined'
            },
            {
                name: 'variant',
                type: 'string',
                description: 'The variant of the alert',
                default: "'info'"
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default breadcrumb item content'
            }
        ],
        css: {
            namespace: '',
            variables: []
        }
    },
    {
        name: 'Breadcrumb',
        props: [
            {
                name: 'ariaLabel',
                type: 'string',
                description: 'The aria-label of the breadcrumbs',
                default: 'Breadcrumbs'
            },
            {
                name: 'color',
                type: "'light' | 'dark' | string",
                description: 'The color variant of the breadcrumb',
                default: ''
            },
            {
                name: 'size',
                type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | string",
                description: 'The size variant of the breadcrumb',
                default: ''
            },
            {
                name: 'variant',
                type: 'string',
                description: 'The variant of the alert',
                default: "'info'"
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default breadcrumb content'
            }
        ],
        css: {
            namespace: 'breadcrumb',
            variables: [
                {
                    name: '--breadcrumb--separator',
                    value: '"/"'
                },
                {
                    name: '--breadcrumb--gap',
                    value: 'var(--spacing)'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--breadcrumb--separator',
                    value: '"/"'
                },
                {
                    name: '--breadcrumb--gap',
                    value: 'var(--spacing)'
                }
            ]
        }
    }
];

export default manifest;
