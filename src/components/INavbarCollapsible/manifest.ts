import { ComponentManifest } from '@inkline/inkline/types';

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
                name: '--navbar--transition-property',
                value: [
                    {
                        value: '(height, background-color, border-color)'
                    }
                ]
            },
            {
                name: '--navbar--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--navbar--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            }
        ]
    }
};

export default manifest;
