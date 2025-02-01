import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Loader',
        props: [
            {
                name: 'color',
                type: 'primary',
                description: 'The color variant of the loader',
                default: ''
            },
            {
                name: 'sizeMultiplier',
                type: 'sm',
                description: 'The size variant of the loader',
                default: ''
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default loader content'
            }
        ],
        css: {
            namespace: 'loader',
            variables: [
                {
                    name: '--loader--animation-name'
                },
                {
                    name: '--loader--animation-duration'
                },
                {
                    name: '--loader--animation-iteration-count'
                },
                {
                    name: '--loader--animation-direction'
                },
                {
                    name: '--loader--animation'
                },
                {
                    name: '--loader--color'
                },
                {
                    name: '--loader--width'
                },
                {
                    name: '--loader--height'
                },
                {
                    name: '--loader--{color}--color'
                },
                {
                    name: '--loader--{size}--width'
                },
                {
                    name: '--loader--{size}--height'
                }
            ]
        }
    }
];
