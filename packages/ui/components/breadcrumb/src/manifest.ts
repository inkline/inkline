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
                    name: '--breadcrumb--margin-top',
                    value: '0'
                },
                {
                    name: '--breadcrumb--margin-right',
                    value: '0'
                },
                {
                    name: '--breadcrumb--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--breadcrumb--margin-left',
                    value: '0'
                },
                {
                    name: '--breadcrumb--margin',
                    value: 'var(--breadcrumb--margin-top) var(--breadcrumb--margin-right) var(--breadcrumb--margin-bottom) var(--breadcrumb--margin-left)'
                },
                {
                    name: '--breadcrumb--separator',
                    value: '"/"'
                },
                {
                    name: '--breadcrumb--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--breadcrumb--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--breadcrumb--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--breadcrumb--transition',
                    value: 'var(--breadcrumb--transition-property) var(--breadcrumb--transition-duration) var(--breadcrumb--transition-timing-function)'
                },
                {
                    name: '--breadcrumb--active--color',
                    value: 'var(--text-color-weaker)'
                },
                {
                    name: '--breadcrumb--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--breadcrumb--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--breadcrumb--padding-top',
                    value: '0'
                },
                {
                    name: '--breadcrumb--padding-right',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--breadcrumb--padding-bottom',
                    value: '0'
                },
                {
                    name: '--breadcrumb--padding-left',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--breadcrumb--padding',
                    value: 'var(--breadcrumb--padding-top) var(--breadcrumb--padding-right) var(--breadcrumb--padding-bottom) var(--breadcrumb--padding-left)'
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
                    name: '--breadcrumb--margin-top',
                    value: '0'
                },
                {
                    name: '--breadcrumb--margin-right',
                    value: '0'
                },
                {
                    name: '--breadcrumb--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--breadcrumb--margin-left',
                    value: '0'
                },
                {
                    name: '--breadcrumb--margin',
                    value: 'var(--breadcrumb--margin-top) var(--breadcrumb--margin-right) var(--breadcrumb--margin-bottom) var(--breadcrumb--margin-left)'
                },
                {
                    name: '--breadcrumb--separator',
                    value: '"/"'
                },
                {
                    name: '--breadcrumb--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--breadcrumb--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--breadcrumb--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--breadcrumb--transition',
                    value: 'var(--breadcrumb--transition-property) var(--breadcrumb--transition-duration) var(--breadcrumb--transition-timing-function)'
                },
                {
                    name: '--breadcrumb--active--color',
                    value: 'var(--text-color-weaker)'
                },
                {
                    name: '--breadcrumb--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--breadcrumb--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--breadcrumb--padding-top',
                    value: '0'
                },
                {
                    name: '--breadcrumb--padding-right',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--breadcrumb--padding-bottom',
                    value: '0'
                },
                {
                    name: '--breadcrumb--padding-left',
                    value: 'var(--spacing-md)'
                },
                {
                    name: '--breadcrumb--padding',
                    value: 'var(--breadcrumb--padding-top) var(--breadcrumb--padding-right) var(--breadcrumb--padding-bottom) var(--breadcrumb--padding-left)'
                }
            ]
        }
    }
];

export default manifest;
