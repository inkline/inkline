module.exports = {
    name: 'container',
    slots: [
        {
            name: 'default',
            description: 'Slot for default container content',
            type: []
        }
    ],
    props: [
        {
            name: 'fluid',
            description: 'Display the container as fluid, always spanning 100% width',
            type: [
                'Boolean'
            ],
            default: 'false'
        }
    ],
    css: {
        selector: '.container',
        defaults: {
            size: 'xs'
        },
        variables: [
            {
                name: 'width--xs',
                description: 'The width of the container component on extrasmall screens',
                value: '100%'
            },
            {
                name: 'width--sm',
                description: 'The width of the container component on small screens',
                value: 'calc(#{breakpoint(\'sm\')} - #{gutter(\'sm\')})'
            },
            {
                name: 'width--md',
                description: 'The width of the container component on medium screens',
                value: 'calc(#{breakpoint(\'md\')} - #{gutter(\'md\')})'
            },
            {
                name: 'width--lg',
                description: 'The width of the container component on large screens',
                value: 'calc(#{breakpoint(\'lg\')} - #{gutter(\'lg\')})'
            },
            {
                name: 'width--xl',
                description: 'The width of the container component on extralarge screens',
                value: 'calc(#{breakpoint(\'xl\')} - #{gutter(\'xl\')})'
            }
        ]
    }
};
