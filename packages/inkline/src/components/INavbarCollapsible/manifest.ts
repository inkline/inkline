import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'INavbarCollapsible',
    props: [],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default navbar collapsible content '
        }
    ],
    css: {
        selector: '.navbar-collapsible',
        variables: [
            {
                name: '--navbar--collapsible--transition',
                value: [
                    {
                        name: '--navbar--collapsible--transition-property'
                    },
                    {
                        name: '--navbar--collapsible--transition-duration'
                    },
                    {
                        name: '--navbar--collapsible--transition-timing-function'
                    }
                ]
            }
        ]
    }
};

export default manifest;
