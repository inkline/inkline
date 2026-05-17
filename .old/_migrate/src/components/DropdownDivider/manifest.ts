import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'DropdownDivider',
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
