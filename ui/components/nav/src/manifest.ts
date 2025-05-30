import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'NavItem',
        props: [
            {
                name: 'active',
                type: 'boolean',
                description: 'The active state of the nav item',
                default: 'false'
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'The disabled state of the nav item',
                default: 'false'
            },
            {
                name: 'to',
                type: 'string',
                description: 'Renders the component as an anchor link with a `href` attribute',
                default: 'undefined'
            },
            {
                name: 'stopPropagation',
                type: 'boolean',
                description:
                    'Used to close the nearest navbar or sidebar by propagating the onClick event',
                default: 'false'
            },
            {
                name: 'tag',
                type: 'string',
                description: 'Set the HTML tag to be used for rendering the nav item',
                default: 'div'
            },
            {
                name: 'tabindex',
                type: 'number | string',
                description: 'The tabindex of the list group item',
                default: '0'
            },
            {
                name: 'to',
                type: 'string',
                description:
                    'Renders the component as a Router Link component with a `to` attribute',
                default: 'undefined'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default nav item content'
            }
        ],
        css: {
            namespace: '',
            variables: []
        }
    },
    {
        name: 'Nav',
        props: [
            {
                name: 'color',
                type: "'light' | 'dark'",
                description: 'The color variant of the nav',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the nav',
                default: ''
            },
            {
                name: 'row',
                type: "'row' | 'column'",
                description: 'Display the nav with vertical orientation',
                default: "'row'"
            },
            {
                name: 'items',
                type: 'NavItemDefinition[]',
                description: 'Nav items to display',
                default: ''
            },
            {
                name: 'noGap',
                type: 'Boolean',
                description: 'Remove the gap between nav items',
                default: 'false'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default nav content'
            }
        ],
        css: {
            namespace: 'nav',
            variables: [
                {
                    name: '--nav--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--nav--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--nav--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--nav--transition',
                    value: 'var(--nav--transition-property) var(--nav--transition-duration) var(--nav--transition-timing-function)'
                },
                {
                    name: '--nav--item--active--font-weight',
                    value: 'var(--font-weight--semibold)'
                },
                {
                    name: '--nav--item--active--color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--nav--item--disabled--color',
                    value: 'var(--text-color--weaker)'
                },
                {
                    name: '--nav--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--nav--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--nav--gap',
                    value: 'var(--spacing--md)'
                },
                {
                    name: '--nav--{color}--color'
                },
                {
                    name: '--nav--{color}--item--active--color'
                },
                {
                    name: '--nav--{size}--font-size'
                },
                {
                    name: '--nav--{size}--gap'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--nav--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--nav--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--nav--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--nav--transition',
                    value: 'var(--nav--transition-property) var(--nav--transition-duration) var(--nav--transition-timing-function)'
                },
                {
                    name: '--nav--item--active--font-weight',
                    value: 'var(--font-weight--semibold)'
                },
                {
                    name: '--nav--item--active--color',
                    value: 'var(--color-primary)'
                },
                {
                    name: '--nav--item--disabled--color',
                    value: 'var(--text-color--weaker)'
                },
                {
                    name: '--nav--color',
                    value: 'var(--contrast-text-color-light)'
                },
                {
                    name: '--nav--font-size',
                    value: 'var(--font-size--md)'
                },
                {
                    name: '--nav--gap',
                    value: 'var(--spacing--md)'
                }
            ]
        }
    }
];

export default manifest;
