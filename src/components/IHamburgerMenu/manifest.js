module.exports = {
    name: 'hamburger-menu',
    events: [
        {
            name: 'update:modelValue',
            description: 'Event emitted for setting the modelValue',
            type: []
        }
    ],
    props: [
        {
            name: 'animation',
            description: 'The animation of the hamburger menu',
            type: [
                'close',
                'arrow-up',
                'arrow-down',
                'arrow-left',
                'arrow-right',
                'plus',
                'minus'
            ],
            default: 'close'
        },
        {
            name: 'color',
            description: 'The color variant of the hamburger menu',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'modelValue',
            description: 'Used to set the hamburger menu as opened or closed',
            type: [
                'Boolean'
            ],
            default: 'false'
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
                description: 'The background of the hamburger-menu component',
                type: 'color',
                variants: {
                    light: 'color(\'dark\')',
                    dark: 'color(\'light\')'
                }
            },
            {
                name: 'opacity',
                description: 'The opacity of the hamburger-menu component',
                value: '0.7'
            },
            {
                name: 'opacity--hover',
                description: 'The opacity of the hamburger-menu component',
                value: '1'
            },
            {
                name: 'padding-top',
                description: 'The padding top of the card component',
                value: 'calc(var(--padding-top) / 2)'
            },
            {
                name: 'padding-right',
                description: 'The padding right of the card component',
                value: 'calc(var(--padding-right) / 2)'
            },
            {
                name: 'padding-bottom',
                description: 'The padding bottom of the card component',
                value: 'calc(var(--padding-bottom) / 2)'
            },
            {
                name: 'padding-left',

                description: 'The padding left of the card component',
                value: 'calc(var(--padding-left) / 2)'
            },
            {
                name: 'padding',
                description: 'The padding of the card component',
                value: ['var(----padding-top)', 'var(----padding-right)', 'var(----padding-bottom)', 'var(----padding-left)']
            },
            {
                name: 'bar--border-radius',
                description: 'The border radius of the hamburger-menu component bars',
                value: '2px'
            },
            {
                name: 'bar--spacing',
                description: 'The spacing between the hamburger-menu component bars',
                value: '5px'
            },
            {
                name: 'bar--width',
                description: 'The width of the hamburger-menu component bars',
                value: '30px'
            },
            {
                name: 'bar--height',
                description: 'The height of the hamburger-menu component bars',
                value: '3px'
            }
        ]
    }
};
