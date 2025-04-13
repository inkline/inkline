import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Media',
        props: [],
        events: [],
        slots: [
            {
                name: 'image',
                description: 'Slot for media image'
            },
            {
                name: 'default',
                description: 'Slot for default media content'
            }
        ],
        css: {
            namespace: 'media',
            variables: [
                {
                    name: '--media--image--margin-top',
                    value: 'var(--spacing)'
                },
                {
                    name: '--media--image--margin-right',
                    value: 'var(--spacing)'
                },
                {
                    name: '--media--image--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--media--image--margin-left',
                    value: 'var(--spacing)'
                },
                {
                    name: '--media--image--margin',
                    value: 'var(--media--image--margin-top) var(--media--image--margin-right) var(--media--image--margin-bottom) var(--media--image--margin-left)'
                }
            ]
        }
    }
];

export default manifest;
