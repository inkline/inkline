export const manifest = {
    name: 'breakpoints',
    css: {
        variables: [
            {
                name: 'breakpoints-xs',
                value: '0',
                type: 'scss',
                description: 'The starting breakpoint for the extra-small screen size'
            },
            {
                name: 'breakpoints-sm',
                value: '576px',
                type: 'scss',
                description: 'The starting breakpoint for the small screen size'
            },
            {
                name: 'breakpoints-md',
                value: '768px',
                type: 'scss',
                description: 'The starting breakpoint for the medium screen size'
            },
            {
                name: 'breakpoints-lg',
                value: '992px',
                type: 'scss',
                description: 'The starting breakpoint for the large screen size'
            },
            {
                name: 'breakpoints-xl',
                value: '1200px',
                type: 'scss',
                description: 'The starting breakpoint for the extra-large screen size'
            },
            {
                name: 'breakpoints-xxl',
                value: '1400px',
                type: 'scss',
                description: 'The starting breakpoint for the extra-extra-large screen size'
            },
            {
                name: 'breakpoints',
                value: "( 'xs': $breakpoints-xs, 'sm': $breakpoints-sm, 'md': $breakpoints-md, 'lg': $breakpoints-lg, 'xl': $breakpoints-xl, 'xxl': $breakpoints-xxl )",
                type: 'scss',
                description: 'The breakpoints map used for media queries'
            },
            {
                name: 'breakpoint-keys',
                value: "('xs', 'sm', 'md', 'lg', 'xl', 'xxl')",
                type: 'scss',
                description: 'The list of breakpoint keys used for media queries'
            },
            {
                name: 'breakpoint-prefix-keys',
                value: "list.append($breakpoint-keys, '_')",
                type: 'scss',
                description: 'The list of breakpoint keys used for media queries with "_" appended to it. The "_" key is used to skip wrapping the code in a media query.'
            }
        ]
    }
};

export default manifest;
