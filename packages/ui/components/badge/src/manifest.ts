import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Badge',
        props: [
            {
                name: 'color',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the badge',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg'",
                description: 'The size variant of the badge',
                default: ''
            },
            {
                name: 'pill',
                type: 'boolean',
                description: 'Display the badge as a pill',
                default: 'false'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default badge content'
            }
        ],
        css: {
            namespace: 'badge',
            variables: [
                {
                    name: '--badge--border-top-width'
                },
                {
                    name: '--badge--border-top-style'
                },
                {
                    name: '--badge--border-top-color'
                },
                {
                    name: '--badge--border-right-width'
                },
                {
                    name: '--badge--border-right-style'
                },
                {
                    name: '--badge--border-right-color'
                },
                {
                    name: '--badge--border-bottom-width'
                },
                {
                    name: '--badge--border-bottom-style'
                },
                {
                    name: '--badge--border-bottom-color'
                },
                {
                    name: '--badge--border-left-width'
                },
                {
                    name: '--badge--border-left-style'
                },
                {
                    name: '--badge--border-left-color'
                },
                {
                    name: '--badge--border-width'
                },
                {
                    name: '--badge--border-style'
                },
                {
                    name: '--badge--border-color'
                },
                {
                    name: '--badge--border-top'
                },
                {
                    name: '--badge--border-right'
                },
                {
                    name: '--badge--border-bottom'
                },
                {
                    name: '--badge--border-left'
                },
                {
                    name: '--badge--border'
                },
                {
                    name: '--badge--box-shadow-offset-x'
                },
                {
                    name: '--badge--box-shadow-offset-y'
                },
                {
                    name: '--badge--box-shadow-blur-radius'
                },
                {
                    name: '--badge--box-shadow-spread-radius'
                },
                {
                    name: '--badge--box-shadow-color'
                },
                {
                    name: '--badge--box-shadow'
                },
                {
                    name: '--badge--font-weight'
                },
                {
                    name: '--badge--transition-property'
                },
                {
                    name: '--badge--transition-duration'
                },
                {
                    name: '--badge--transition-timing-function'
                },
                {
                    name: '--badge--transition'
                },
                {
                    name: '--badge--pill--border-top-left-radius'
                },
                {
                    name: '--badge--pill--border-top-right-radius'
                },
                {
                    name: '--badge--pill--border-bottom-right-radius'
                },
                {
                    name: '--badge--pill--border-bottom-left-radius'
                },
                {
                    name: '--badge--pill--border-radius'
                },
                {
                    name: '--badge--background'
                },
                {
                    name: '--badge--color'
                },
                {
                    name: '--badge--border-top-left-radius'
                },
                {
                    name: '--badge--border-top-right-radius'
                },
                {
                    name: '--badge--border-bottom-right-radius'
                },
                {
                    name: '--badge--border-bottom-left-radius'
                },
                {
                    name: '--badge--border-radius'
                },
                {
                    name: '--badge--font-size'
                },
                {
                    name: '--badge--padding-top'
                },
                {
                    name: '--badge--padding-right'
                },
                {
                    name: '--badge--padding-bottom'
                },
                {
                    name: '--badge--padding-left'
                },
                {
                    name: '--badge--padding'
                },
                {
                    name: '--badge--{color}--border-top-color'
                },
                {
                    name: '--badge--{color}--border-right-color'
                },
                {
                    name: '--badge--{color}--border-bottom-color'
                },
                {
                    name: '--badge--{color}--border-left-color'
                },
                {
                    name: '--badge--{color}--background'
                },
                {
                    name: '--badge--{color}--color'
                },
                {
                    name: '--badge--{size}--border-top-left-radius'
                },
                {
                    name: '--badge--{size}--border-top-right-radius'
                },
                {
                    name: '--badge--{size}--border-bottom-right-radius'
                },
                {
                    name: '--badge--{size}--border-bottom-left-radius'
                },
                {
                    name: '--badge--{size}--font-size'
                },
                {
                    name: '--badge--{size}--padding-top'
                },
                {
                    name: '--badge--{size}--padding-right'
                },
                {
                    name: '--badge--{size}--padding-bottom'
                },
                {
                    name: '--badge--{size}--padding-left'
                }
            ]
        }
    }
];

export default manifest;
