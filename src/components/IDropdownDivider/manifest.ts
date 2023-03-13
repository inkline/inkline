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
                        name: '--dropdown--margin--margin-top',
                        value: [
                            {
                                name: '--margin-top'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--margin--margin-right',
                        value: [
                            {
                                name: '--dropdown--body--padding-right',
                                value: [
                                    {
                                        name: '--dropdown--padding-right'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: '--dropdown--margin--margin-bottom',
                        value: [
                            {
                                name: '--margin-top'
                            }
                        ]
                    },
                    {
                        name: '--dropdown--margin--margin-left',
                        value: [
                            {
                                name: '--dropdown--body--padding-left',
                                value: [
                                    {
                                        name: '--dropdown--padding-left'
                                    }
                                ]
                            }
                        ]
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
