import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IBreadcrumb',
    props: [
        {
            name: 'ariaLabel',
            type: ['String'],
            default: 'Breadcrumbs',
            description: 'The aria-label of the breadcrumbs'
        },
        {
            name: 'color',
            type: ['light', 'dark'],
            default: '',
            description: 'The color variant of the breadcrumb'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the breadcrumb'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default breadcrumb content '
        }
    ],
    css: {
        selector: '.breadcrumb',
        variables: [
            {
                name: '--breadcrumb--margin-bottom',
                value: [
                    {
                        name: '--margin-bottom'
                    }
                ]
            },
            {
                name: '--breadcrumb--font-size',
                value: [
                    {
                        name: '--font-size'
                    }
                ],
                variants: [
                    {
                        name: '--breadcrumb--sm--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-sm))'
                            }
                        ]
                    },
                    {
                        name: '--breadcrumb--md--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-md))'
                            }
                        ]
                    },
                    {
                        name: '--breadcrumb--lg--font-size',
                        value: [
                            {
                                value: 'calc(var(--font-size) * var(--size-multiplier-lg))'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
