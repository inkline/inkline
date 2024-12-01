import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'NavbarBrand',
    props: [
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as an anchor link with a `href` attribute'
        },
        {
            name: 'tag',
            type: ['String'],
            default: 'div',
            description: 'Set the HTML tag to be used for rendering the nav item'
        },
        {
            name: 'to',
            type: ['String'],
            default: 'undefined',
            description: 'Renders the component as a Router Link component with a `to` attribute'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default navbar brand content '
        }
    ],
    css: {
        selector: '.navbar-brand',
        variables: [
            {
                name: '--navbar--brand--color',
                value: []
            },
            {
                name: '--navbar--brand--font-size',
                value: []
            },
            {
                name: '--navbar--brand--margin',
                value: []
            },
            {
                name: '--navbar--brand--transition',
                value: [
                    {
                        name: '--navbar--brand--transition-property'
                    },
                    {
                        name: '--navbar--brand--transition-duration'
                    },
                    {
                        name: '--navbar--brand--transition-timing-function'
                    }
                ]
            },
            {
                name: '--navbar--brand--padding',
                value: []
            }
        ]
    }
};

export default manifest;
