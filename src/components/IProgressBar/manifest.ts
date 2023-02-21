export const manifest = {
    name: 'IProgressBar',
    props: [
        {
            name: 'color',
            type: ['light', 'dark', 'primary', 'secondary', 'info', 'success', 'warning', 'danger'],
            default: 'primary',
            description: 'The color variant of the progress bar'
        },
        {
            name: 'value',
            type: ['Number'],
            default: '0',
            description: 'The value of the progress bar'
        }
    ],
    events: [],
    slots: [
        {
            name: 'default',
            description: 'Slot for default progress bar content '
        }
    ],
    css: {
        selector: '.progress-bar',
        variables: [
            {
                name: '--progress-bar--color',
                variants: [
                    {
                        name: '--progress-bar--primary--color',
                        value: [
                            {
                                name: '--contrast-text--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--secondary--color',
                        value: [
                            {
                                name: '--contrast-text--color-secondary'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--light--color',
                        value: [
                            {
                                name: '--contrast-text--color-light'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--dark--color',
                        value: [
                            {
                                name: '--contrast-text--color-dark'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--info--color',
                        value: [
                            {
                                name: '--contrast-text--color-info'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--success--color',
                        value: [
                            {
                                name: '--contrast-text--color-success'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--warning--color',
                        value: [
                            {
                                name: '--contrast-text--color-warning'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--danger--color',
                        value: [
                            {
                                name: '--contrast-text--color-danger'
                            }
                        ]
                    }
                ]
            },
            {
                name: '--progress-bar--background',
                variants: [
                    {
                        name: '--progress-bar--primary--background',
                        value: [
                            {
                                name: '--color-primary'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--secondary--background',
                        value: [
                            {
                                name: '--color-secondary'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--light--background',
                        value: [
                            {
                                name: '--color-white'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--dark--background',
                        value: [
                            {
                                name: '--color-dark'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--info--background',
                        value: [
                            {
                                name: '--color-info'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--success--background',
                        value: [
                            {
                                name: '--color-success'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--warning--background',
                        value: [
                            {
                                name: '--color-warning'
                            }
                        ]
                    },
                    {
                        name: '--progress-bar--danger--background',
                        value: [
                            {
                                name: '--color-danger'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
