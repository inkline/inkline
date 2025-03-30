import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Loader',
        props: [
            {
                name: 'color',
                type: "'primary' | 'light' | 'dark'",
                description: 'The color variant of the loader',
                default: ''
            },
            {
                name: 'size',
                type: "'sm' | 'md' | 'lg' | 'auto'",
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
                    name: '--loader--animation-name',
                    value: 'none'
                },
                {
                    name: '--loader--animation-fill-mode',
                    value: 'none'
                },
                {
                    name: '--loader--animation-play-state',
                    value: 'running'
                },
                {
                    name: '--loader--animation-delay',
                    value: '0'
                },
                {
                    name: '--loader--animation-timing-function',
                    value: 'linear'
                },
                {
                    name: '--loader--animation-duration',
                    value: '1.2s'
                },
                {
                    name: '--loader--animation-iteration-count',
                    value: 'infinite'
                },
                {
                    name: '--loader--animation-direction',
                    value: 'normal'
                },
                {
                    name: '--loader--animation',
                    value: 'var(--loader--animation-name) var(--loader--animation-duration) var(--loader--animation-iteration-count) var(--loader--animation-direction)'
                },
                {
                    name: '--loader--color',
                    value: 'var(--color-dark)'
                },
                {
                    name: '--loader--width',
                    value: 'calc(var(--spacing-md) * 4)'
                },
                {
                    name: '--loader--height',
                    value: 'calc(var(--spacing-md) * 4)'
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

export default manifest;
