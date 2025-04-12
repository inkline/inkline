import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Badge',
        props: [
            {
                name: 'color',
                type: "'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | string",
                description: 'The color of the badge',
                default: 'undefined'
            },
            {
                name: 'size',
                type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'inherit' | string",
                description: 'The size of the badge',
                default: 'undefined'
            },
            {
                name: 'variant',
                type: 'string | string[]',
                description: 'The variant of the badge',
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
            variables: []
        }
    }
];

export default manifest;
