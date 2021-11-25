export const manifest = {
    name: 'container',
    slots: [
        {
            description: 'Slot for default container content',
            name: 'default'
        }
    ],
    props: [
        {
            name: 'fluid',
            type: [
                'Boolean'
            ],
            default: 'false',
            description: 'Display the container as fluid, always spanning 100% width'
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
                type: '',
                value: '100%',
                description: 'The width of the container component on extrasmall screens'
            },
            {
                name: 'width--sm',
                type: '',
                value: 'calc(#{breakpoint(\'sm\')} - #{gutter(\'sm\')})',
                description: 'The width of the container component on small screens'
            },
            {
                name: 'width--md',
                type: '',
                value: 'calc(#{breakpoint(\'md\')} - #{gutter(\'md\')})',
                description: 'The width of the container component on medium screens'
            },
            {
                name: 'width--lg',
                type: '',
                value: 'calc(#{breakpoint(\'lg\')} - #{gutter(\'lg\')})',
                description: 'The width of the container component on large screens'
            },
            {
                name: 'width--xl',
                type: '',
                value: 'calc(#{breakpoint(\'xl\')} - #{gutter(\'xl\')})',
                description: 'The width of the container component on extralarge screens'
            },
            {
                name: 'width--xxl',
                type: '',
                value: 'calc(#{breakpoint(\'xxl\')} - #{gutter(\'xxl\')})',
                description: 'The width of the container component on extralarge screens'
            }
        ],
        variants: []
    },
    events: []
};

export default manifest;
