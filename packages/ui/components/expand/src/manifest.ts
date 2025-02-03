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
                    name: '--expand--transition-property'
                },
                {
                    name: '--expand--transition-duration'
                },
                {
                    name: '--expand--transition-timing-function'
                },
                {
                    name: '--expand--transition'
                }
            ]
        }
    }
];

export default manifest;
