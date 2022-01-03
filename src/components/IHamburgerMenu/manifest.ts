export const manifest = {
    name: 'hamburger-menu',
    events: [
        {
            description: 'Event emitted for setting the modelValue',
            name: 'update:modelValue'
        }
    ],
    props: [
        {
            name: 'animation',
            type: [
                'close',
                'arrow-up',
                'arrow-down',
                'arrow-left',
                'arrow-right',
                'plus',
                'minus'
            ],
            default: 'close',
            description: 'The animation of the hamburger menu'
        },
        {
            name: 'color',
            type: [
                'light',
                'dark'
            ],
            default: 'light',
            description: 'The color variant of the hamburger menu'
        },
        {
            name: 'modelValue',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Used to set the hamburger menu as opened or closed'
        }
    ],
    css: {
        selector: '.hamburger-menu',
        defaults: {
            size: 'md',
            color: 'light'
        },
        variables: [
            {
                name: 'background',
                type: 'color',
                value: 'color(\'dark\')',
                description: 'The background of the hamburger-menu component'
            },
            {
                name: 'opacity',
                type: '',
                value: '0.7',
                description: 'The opacity of the hamburger-menu component'
            },
            {
                name: 'opacity--hover',
                type: '',
                value: '1',
                description: 'The opacity of the hamburger-menu component'
            },
            {
                name: 'padding-top',
                type: '',
                value: 'calc(var(--padding-top) / 2)',
                description: 'The padding top of the card component'
            },
            {
                name: 'padding-right',
                type: '',
                value: 'calc(var(--padding-right) / 2)',
                description: 'The padding right of the card component'
            },
            {
                name: 'padding-bottom',
                type: '',
                value: 'calc(var(--padding-bottom) / 2)',
                description: 'The padding bottom of the card component'
            },
            {
                name: 'padding-left',
                type: '',
                value: 'calc(var(--padding-left) / 2)',
                description: 'The padding left of the card component'
            },
            {
                name: 'padding',
                type: '',
                value: 'var(----padding-top) var(----padding-right) var(----padding-bottom) var(----padding-left)',
                description: 'The padding of the card component'
            },
            {
                name: 'bar--border-radius',
                type: '',
                value: '2px',
                description: 'The border radius of the hamburger-menu component bars'
            },
            {
                name: 'bar--spacing',
                type: '',
                value: '5px',
                description: 'The spacing between the hamburger-menu component bars'
            },
            {
                name: 'bar--width',
                type: '',
                value: '30px',
                description: 'The width of the hamburger-menu component bars'
            },
            {
                name: 'bar--height',
                type: '',
                value: '3px',
                description: 'The height of the hamburger-menu component bars'
            }
        ],
        variants: [
            {
                name: 'light',
                type: 'variant',
                description: 'Variables for the light color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'dark\')',
                        description: 'The background of the hamburger-menu component, for the light color variant'
                    }
                ]
            },
            {
                name: 'dark',
                type: 'variant',
                description: 'Variables for the dark color variant',
                variables: [
                    {
                        name: 'background',
                        type: '',
                        value: 'color(\'light\')',
                        description: 'The background of the hamburger-menu component, for the dark color variant'
                    }
                ]
            }
        ]
    },
    slots: []
};

export default manifest;
