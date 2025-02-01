import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Linkable',
        props: [
            {
                name: 'to',
                type: 'String',
                description: 'Renders the component as an anchor link with a `href` attribute',
                default: 'undefined'
            },
            {
                name: 'tag',
                type: 'String',
                description: 'Set the HTML tag to be used for rendering the linkable',
                default: 'button'
            },
            {
                name: 'to',
                type: 'String',
                description:
                    'Renders the component as a Router Link component with a `to` attribute',
                default: 'undefined'
            }
        ],
        events: [],
        slots: [],
        css: {
            namespace: '',
            variables: []
        }
    }
];
