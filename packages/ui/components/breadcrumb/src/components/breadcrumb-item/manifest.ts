import type { ComponentManifest } from '@inkline/types';

export const BreadcrumbItemManifest: ComponentManifest = {
    name: 'BreadcrumbItem',
    props: [
        {
            name: 'active',
            type: 'Boolean',
            description: 'The active state of the breadcrumb item',
            default: 'false'
        },
        {
            name: 'disabled',
            type: 'Boolean',
            description: 'The disabled state of the breadcrumb item',
            default: 'false'
        },
        {
            name: 'to',
            type: 'String',
            description: '',
            default: 'undefined'
        },
        {
            name: 'tabindex',
            type: 'Number',
            description: 'The tabindex of the breadcrumb item',
            default: '0'
        },
        {
            name: 'tag',
            type: 'String',
            description: 'Set the HTML tag to be used for rendering the breadcrumb item',
            default: 'a'
        },
        {
            name: 'to',
            type: 'String',
            description: '',
            default: 'undefined'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default breadcrumb item content'
        }
    ],
    css: {
        selector: '.',
        variables: []
    }
};
