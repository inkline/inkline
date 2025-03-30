import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Badge',
        props: [
            {
                name: 'variant',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
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
