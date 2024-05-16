import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IDropdownDivider',
    props: [],
    events: [],
    slots: [],
    css: {
        selector: '.dropdown-divider',
        variables: [
            {
                name: '--dropdown--divider--margin',
                value: []
            },
            {
                name: '--dropdown--divider--background',
                value: []
            }
        ]
    }
};

export default manifest;
