import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Icon',
        props: [
            {
                name: 'name',
                type: 'string',
                description: 'The icon to be displayed',
                default: ''
            },
            {
                name: 'name',
                type: 'string',
                description: '',
                default: ''
            },
            {
                name: 'width',
                type: 'string | number',
                description: 'The width of the icon. Will override the size prop',
                default: 'undefined'
            },
            {
                name: 'height',
                type: 'string | number',
                description: 'The height of the icon. Will override the size prop',
                default: 'undefined'
            }
        ],
        events: [],
        slots: [],
        css: {
            namespace: 'icon',
            variables: [
                {
                    name: '--icon--font-size'
                },
                {
                    name: '--icon--font-size'
                }
            ]
        }
    }
];

export default manifest;
