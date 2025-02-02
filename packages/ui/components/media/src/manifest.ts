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
                    name: '--media--image--margin-top'
                },
                {
                    name: '--media--image--margin-right'
                },
                {
                    name: '--media--image--margin-bottom'
                },
                {
                    name: '--media--image--margin-left'
                },
                {
                    name: '--media--image--margin'
                }
            ]
        }
    }
];

export default manifest;
