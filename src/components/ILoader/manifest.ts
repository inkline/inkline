export const manifest = {
    name: 'ILoader',
    props: [
        {
            name: 'color',
            type: ['primary', 'light', 'dark'],
            default: '',
            description: 'The color variant of the loader'
        },
        {
            name: 'size',
            type: ['sm', 'md', 'lg', 'auto'],
            default: '',
            description: 'The size variant of the loader'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default loader content '
        }
    ],
    css: {
        selector: '.loader',
        variables: [
            {
                name: '--loader--size',
                variants: [
                    {
                        name: '--loader--sm--size',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--loader--md--size',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--loader--lg--size',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--loader--size',
                variants: [
                    {
                        name: '--loader--sm--size',
                        value: [
                            {
                                name: '--size-multiplier-sm'
                            }
                        ]
                    },
                    {
                        name: '--loader--md--size',
                        value: [
                            {
                                name: '--size-multiplier-md'
                            }
                        ]
                    },
                    {
                        name: '--loader--lg--size',
                        value: [
                            {
                                name: '--size-multiplier-lg'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--loader--background',
                variants: [
                    {
                        name: '--loader--primary--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--loader--light--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    },
                    {
                        name: '--loader--dark--background',
                        value: [
                            {
                                name: '--color-light'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
