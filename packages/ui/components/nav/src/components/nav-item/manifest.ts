import type { ComponentManifest } from '@inkline/types';

export const NavItemManifest: ComponentManifest = {
    name: 'NavItem',
    props: [
        {
            name: 'active',
            type: 'Boolean',
            description: 'The active state of the nav item',
            default: 'false'
        },
        {
            name: 'disabled',
            type: 'Boolean',
            description: 'The disabled state of the nav item',
            default: 'false'
        },
        {
            name: 'to',
            type: 'String',
            description: 'Renders the component as an anchor link with a `href` attribute',
            default: 'undefined'
        },
        {
            name: 'stopPropagation',
            type: 'Boolean',
            description:
                'Used to close the nearest navbar or sidebar by propagating the onClick event',
            default: 'false'
        },
        {
            name: 'tag',
            type: 'String',
            description: 'Set the HTML tag to be used for rendering the nav item',
            default: 'div'
        },
        {
            name: 'tabindex',
            type: 'Number',
            description: 'The tabindex of the list group item',
            default: '0'
        },
        {
            name: 'to',
            type: 'String',
            description: 'Renders the component as a Router Link component with a `to` attribute',
            default: 'undefined'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default nav item content'
        }
    ],
    css: {
        selector: '.',
        variables: []
    }
};
