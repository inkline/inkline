import type { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'LayoutAside',
    props: [],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default layout aside content '
        }
    ],
    css: {
        selector: '.layout-aside',
        variables: [
            {
                name: '--layout-aside--transition',
                value: [
                    {
                        name: '--layout-aside--transition-property',
                        value: [
                            {
                                value: 'width, height'
                            }
                        ]
                    },
                    {
                        name: '--layout-aside--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--layout-aside--transition-timing-function',
                        value: []
                    },
                    {
                        name: '--layout-aside--transition-property',
                        value: [
                            {
                                value: 'width, height'
                            }
                        ]
                    },
                    {
                        name: '--layout-aside--transition-duration',
                        value: [
                            {
                                name: '--transition-duration'
                            }
                        ]
                    },
                    {
                        name: '--layout-aside--transition-timing-function',
                        value: []
                    }
                ]
            },
            {
                name: '--layout-aside--width',
                value: [
                    {
                        value: '320px'
                    }
                ]
            }
        ]
    }
};

export default manifest;
