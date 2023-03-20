import { ComponentManifest } from '@inkline/inkline/types';

export const manifest: ComponentManifest = {
    name: 'IHeader',
    props: [
        {
            name: 'color',
            type: ['primary', 'light', 'dark'],
            default: '',
            description: 'The color variant of the header'
        },
        {
            name: 'cover',
            type: ['Boolean'],
            default: 'false',
            description:
                'Display the header background as cover, always covering the whole header width or height'
        },
        {
            name: 'fluid',
            type: ['Boolean'],
            default: 'false',
            description:
                'Display the inner content container as fluid, covering 100% of the header width'
        },
        {
            name: 'fullscreen',
            type: ['Boolean'],
            default: 'true',
            description:
                'Display the header as fullscreen, covering 100% screen height and 100% screen width'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg'],
            default: '',
            description: 'The size variant of the header'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default header content '
        }
    ],
    css: {
        selector: '.header',
        variables: [
            {
                name: '--header--transition-property',
                value: [
                    {
                        value: 'background-color'
                    }
                ]
            },
            {
                name: '--header--transition-duration',
                value: [
                    {
                        name: '--transition-duration'
                    }
                ]
            },
            {
                name: '--header--transition-timing-function',
                value: [
                    {
                        name: '--transition-timing-function'
                    }
                ]
            },
            {
                name: '--header--color',
                variants: [
                    {
                        name: '--header--primary--color',
                        value: [
                            {
                                name: '--contrast-text-color-primary'
                            }
                        ]
                    },
                    {
                        name: '--header--light--color',
                        value: [
                            {
                                name: '--contrast-text-color-light'
                            }
                        ]
                    },
                    {
                        name: '--header--dark--color',
                        value: [
                            {
                                name: '--contrast-text-color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--header--background',
                variants: [
                    {
                        name: '--header--primary--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--header--light--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    },
                    {
                        name: '--header--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--header--padding',
                value: [
                    {
                        value: '(\n            var(--header--padding-top, 10rem) var(--header--padding-right, 0)\n                var(--header--padding-bottom, 10rem) var(--header--padding-left, 0)\n        )'
                    }
                ]
            }
        ]
    }
};

export default manifest;
