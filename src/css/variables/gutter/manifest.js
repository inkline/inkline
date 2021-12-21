export const manifest = {
    name: 'gutter',
    css: {
        variables: [
            {
                name: 'gutter',
                value: '28px',
                description: 'The base gutter used for calculating the gutter variants for various screen sizes'
            },
            {
                name: 'gutter--xs',
                value: 'calc(var(--gutter) * 0.85)',
                description: 'The column, row, and container gutter for the extra-small screen size'
            },
            {
                name: 'gutter--sm',
                value: 'calc(var(--gutter) * 0.925)',
                description: 'The column, row, and container gutter for the small screen size'
            },
            {
                name: 'gutter--md',
                value: 'var(--gutter)',
                description: 'The column, row, and container gutter for the medium screen size'
            },
            {
                name: 'gutter--lg',
                value: 'calc(var(--gutter) * 1.075)',
                description: 'The column, row, and container gutter for the large screen size'
            },
            {
                name: 'gutter--xl',
                value: 'calc(var(--gutter) * 1.15)',
                description: 'The column, row, and container gutter for the extra-large screen size'
            },
            {
                name: 'gutter--xxl',
                value: 'calc(var(--gutter) * 1.25)',
                description: 'The column, row, and container gutter for the extra-extra-large screen size'
            }
        ]
    }
};

export default manifest;
