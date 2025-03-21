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
                type: "'light' | 'dark'",
                description: 'The color variant of the breadcrumb',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the breadcrumb',
                default: ''
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
                    name: '--breadcrumb--margin-top'
                },
                {
                    name: '--breadcrumb--margin-right'
                },
                {
                    name: '--breadcrumb--margin-bottom'
                },
                {
                    name: '--breadcrumb--margin-left'
                },
                {
                    name: '--breadcrumb--margin'
                },
                {
                    name: '--breadcrumb--separator'
                },
                {
                    name: '--breadcrumb--transition-property'
                },
                {
                    name: '--breadcrumb--transition-duration'
                },
                {
                    name: '--breadcrumb--transition-timing-function'
                },
                {
                    name: '--breadcrumb--transition'
                },
                {
                    name: '--breadcrumb--active--color'
                },
                {
                    name: '--breadcrumb--color'
                },
                {
                    name: '--breadcrumb--font-size'
                },
                {
                    name: '--breadcrumb--padding-top'
                },
                {
                    name: '--breadcrumb--padding-right'
                },
                {
                    name: '--breadcrumb--padding-bottom'
                },
                {
                    name: '--breadcrumb--padding-left'
                },
                {
                    name: '--breadcrumb--padding'
                },
                {
                    name: '--breadcrumb--{color}--color'
                },
                {
                    name: '--breadcrumb--{size}--font-size'
                },
                {
                    name: '--breadcrumb--{size}--padding-top'
                },
                {
                    name: '--breadcrumb--{size}--padding-right'
                },
                {
                    name: '--breadcrumb--{size}--padding-bottom'
                },
                {
                    name: '--breadcrumb--{size}--padding-left'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--breadcrumb--margin-top'
                },
                {
                    name: '--breadcrumb--margin-right'
                },
                {
                    name: '--breadcrumb--margin-bottom'
                },
                {
                    name: '--breadcrumb--margin-left'
                },
                {
                    name: '--breadcrumb--margin'
                },
                {
                    name: '--breadcrumb--separator'
                },
                {
                    name: '--breadcrumb--transition-property'
                },
                {
                    name: '--breadcrumb--transition-duration'
                },
                {
                    name: '--breadcrumb--transition-timing-function'
                },
                {
                    name: '--breadcrumb--transition'
                },
                {
                    name: '--breadcrumb--active--color'
                },
                {
                    name: '--breadcrumb--color'
                },
                {
                    name: '--breadcrumb--font-size'
                },
                {
                    name: '--breadcrumb--padding-top'
                },
                {
                    name: '--breadcrumb--padding-right'
                },
                {
                    name: '--breadcrumb--padding-bottom'
                },
                {
                    name: '--breadcrumb--padding-left'
                },
                {
                    name: '--breadcrumb--padding'
                }
            ]
        }
    }
];

export default manifest;
