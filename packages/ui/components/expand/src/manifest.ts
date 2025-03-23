import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Expand',
        props: [
            {
                name: 'axis',
                type: "'x' | 'y'",
                description: 'The axis to expand on',
                default: "'y'"
            }
        ],
        events: [],
        slots: [],
        css: {
            namespace: 'expand',
            variables: [
                {
                    name: '--expand--transition-property',
                    value: 'height, width'
                },
                {
                    name: '--expand--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--expand--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--expand--transition',
                    value: 'var(--expand--transition-property) var(--expand--transition-duration) var(--expand--transition-timing-function)'
                }
            ]
        }
    }
];

export default manifest;
