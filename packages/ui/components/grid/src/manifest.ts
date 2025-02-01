import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Grid',
        props: [
            {
                name: 'container',
                type: 'Boolean',
                description:
                    'Mark the grid as a container, setting a max-width and centering the content',
                default: 'false'
            },
            {
                name: 'size',
                type: "'auto'",
                description: 'Set the size of the grid item',
                default: 'undefined'
            },
            {
                name: '',
                type: "'auto'",
                description: 'Set the size of the grid item on various screen sizes',
                default: 'undefined'
            },
            {
                name: 'align-items',
                type: "'flex-start'",
                description: 'Align the items in the row',
                default: "'flex-start'"
            },
            {
                name: 'align-items-{breakpoint}',
                type: "'flex-start'",
                description: 'Align the items in the row on various screen sizes',
                default: 'undefined'
            },
            {
                name: 'justify-content',
                type: "'flex-start'",
                description: 'Justify the content of the row',
                default: 'undefined'
            },
            {
                name: 'direction-{breakpoint}',
                type: "'flex-start'",
                description: 'Justify the content of the row on various screen sizes',
                default: "'flex-start'"
            },
            {
                name: 'direction',
                type: "'row'",
                description: 'Direction of the row content',
                default: 'undefined'
            },
            {
                name: 'direction-{breakpoint}',
                type: "'row'",
                description: 'Direction of the row content on various screen sizes',
                default: 'undefined'
            },
            {
                name: 'offset',
                type: 'number',
                description: 'Offset the grid item',
                default: 'undefined'
            },
            {
                name: 'offset-{breakpoint}',
                type: 'number',
                description: 'Offset the grid item on various screen sizes',
                default: 'undefined'
            },
            {
                name: 'no-gap',
                type: 'Boolean',
                description: 'Remove gap between child elements',
                default: 'false'
            },
            {
                name: 'no-wrap',
                type: 'Boolean',
                description: 'Disable wrapping of child elements',
                default: 'false'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default row content'
            }
        ],
        css: {
            namespace: '',
            variables: []
        }
    }
];
