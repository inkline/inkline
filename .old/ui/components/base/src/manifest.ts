import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'BaseComponent',
        props: [
            {
                name: 'component',
                type: 'string',
                description: 'The component to use as the root element',
                default: 'undefined'
            },
            {
                name: 'tag',
                type: 'string',
                description: 'The HTML tag to use for the component root element',
                default: 'div'
            },
            {
                name: 'variant',
                type: 'string | string[] | VariantProps',
                description: 'The variants applied to the component',
                default: ''
            },
            {
                name: 'hover:variant',
                type: 'string | string[] | VariantProps',
                description: 'The variants applied to the component on hover',
                default: ''
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'The default slot of the box component'
            }
        ],
        css: {
            namespace: 'base',
            variables: []
        }
    }
];

export default manifest;
