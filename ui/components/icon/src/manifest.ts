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
                name: 'color',
                type: "'inherit' | light' | 'dark' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'",
                description: 'The color of the icon',
                default: 'undefined'
            },
            {
                name: 'size',
                type: 'string | number',
                description: 'The size of the icon',
                default: 'undefined'
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
                    name: '--icon--color',
                    value: 'var(--color-light)'
                },
                {
                    name: '--icon--font-size',
                    value: 'var(--font-size-md)'
                },
                {
                    name: '--icon--{color}--color'
                },
                {
                    name: '--icon--font-size'
                }
            ]
        }
    }
];

export default manifest;
