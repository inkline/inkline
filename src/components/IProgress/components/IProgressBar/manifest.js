export const manifest = {
    name: 'progress-bar',
    slots: [
        {
            description: 'Slot for default progress bar content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'color',
            type: [
                'light',
                'dark',
                'primary',
                'secondary',
                'info',
                'success',
                'warning',
                'danger'
            ],
            default: 'primary',
            description: 'The color variant of the progress bar'
        },
        {
            name: 'value',
            type: [
                'Number'
            ],
            default: '0',
            description: 'The value of the progress bar'
        }
    ],
    css: {
        selector: '.progress-bar',
        defaults: {
            size: 'md',
            color: 'primary'
        },
        variables: [
            {
                name: 'color',
                type: 'color',
                value: 'contrast-color($color-primary)',
                description: 'The color of the progress-bar component'
            },
            {
                name: 'background',
                type: 'color',
                value: 'color(\'primary\')',
                description: 'The background of the progress-bar component'
            }
        ],
        variants: [
            {
                name: 'primary',
                type: 'variant',
                description: 'Variables for the primary color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-primary)',
                        description: 'The color of the progress-bar component, for the primary color variant'
                    },
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'primary\')',
                        description: 'The background of the progress-bar component, for the primary color variant'
                    }
                ]
            },
            {
                name: 'secondary',
                type: 'variant',
                description: 'Variables for the secondary color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-secondary)',
                        description: 'The color of the progress-bar component, for the secondary color variant'
                    },
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'secondary\')',
                        description: 'The background of the progress-bar component, for the secondary color variant'
                    }
                ]
            },
            {
                name: 'light',
                type: 'variant',
                description: 'Variables for the light color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-light)',
                        description: 'The color of the progress-bar component, for the light color variant'
                    },
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'white\')',
                        description: 'The background of the progress-bar component, for the light color variant'
                    }
                ]
            },
            {
                name: 'dark',
                type: 'variant',
                description: 'Variables for the dark color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-dark)',
                        description: 'The color of the progress-bar component, for the dark color variant'
                    },
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The background of the progress-bar component, for the dark color variant'
                    }
                ]
            },
            {
                name: 'info',
                type: 'variant',
                description: 'Variables for the info color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-info)',
                        description: 'The color of the progress-bar component, for the info color variant'
                    },
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'info\')',
                        description: 'The background of the progress-bar component, for the info color variant'
                    }
                ]
            },
            {
                name: 'success',
                type: 'variant',
                description: 'Variables for the success color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-success)',
                        description: 'The color of the progress-bar component, for the success color variant'
                    },
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'success\')',
                        description: 'The background of the progress-bar component, for the success color variant'
                    }
                ]
            },
            {
                name: 'warning',
                type: 'variant',
                description: 'Variables for the warning color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-warning)',
                        description: 'The color of the progress-bar component, for the warning color variant'
                    },
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'warning\')',
                        description: 'The background of the progress-bar component, for the warning color variant'
                    }
                ]
            },
            {
                name: 'danger',
                type: 'variant',
                description: 'Variables for the danger color variant',
                variables: [
                    {
                        name: 'color',
                        type: '',
                        value: 'contrast-color($color-danger)',
                        description: 'The color of the progress-bar component, for the danger color variant'
                    },
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'danger\')',
                        description: 'The background of the progress-bar component, for the danger color variant'
                    }
                ]
            }
        ]
    },
    events: []
};

export default manifest;
