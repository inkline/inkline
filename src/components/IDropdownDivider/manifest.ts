import { ComponentManifest } from '@inkline/inkline/types';

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
                value: [
                    {
                        value: '(\n            var(--dropdown--margin--margin-top, calc(var(--margin-top) * 0.5))\n                var(\n                    --dropdown--margin--margin-right,\n                    var(--dropdown--body--padding-right, calc(var(--dropdown--padding-right) * -1))\n                )\n                var(--dropdown--margin--margin-bottom, calc(var(--margin-top) * 0.5))\n                var(\n                    --dropdown--margin--margin-left,\n                    var(--dropdown--body--padding-left, calc(var(--dropdown--padding-left) * -1))\n                )\n        )'
                    }
                ]
            },
            {
                name: '--dropdown--divider--background',
                value: [
                    {
                        name: '--dropdown--border-top-color',
                        value: [
                            {
                                name: '--border-top-color'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
