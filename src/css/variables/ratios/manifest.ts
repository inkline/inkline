export const manifest = {
    name: 'ratios',
    css: {
        variables: [
            {
                name: 'scale-ratio',
                value: 'var(--scale-ratio--minor-third)',
                description: 'The primary scale ratio used throughout the design system'
            },
            {
                name: 'scale-ratio-secondary',
                value: 'var(--scale-ratio--perfect-fourth)',
                description: 'The secondary scale ratio used throughout the design system'
            },
            {
                name: 'scale-ratio--minor-second',
                value: '1.067',
                description: 'The number usually referred to as the minor second scale ratio'
            },
            {
                name: 'scale-ratio--major-second',
                value: '1.125',
                description: 'The number usually referred to as the major second scale ratio'
            },
            {
                name: 'scale-ratio--minor-third',
                value: '1.2',
                description: 'The number usually referred to as the minor third scale ratio'
            },
            {
                name: 'scale-ratio--major-third',
                value: '1.25',
                description: 'The number usually referred to as the major third scale ratio'
            },
            {
                name: 'scale-ratio--perfect-fourth',
                value: '1.333',
                description: 'The number usually referred to as the perfect fourth scale ratio'
            },
            {
                name: 'scale-ratio--augmented-fourth',
                value: '1.414',
                description: 'The number usually referred to as the augmented fourth scale ratio'
            },
            {
                name: 'scale-ratio--perfect-fifth',
                value: '1.5',
                description: 'The number usually referred to as the perfect fifth scale ratio'
            },
            {
                name: 'scale-ratio--golden',
                value: '1.618',
                description: 'The number usually referred to as the golden scale ratio'
            },
            {
                name: 'scale-ratio--pow-1',
                value: 'var(--scale-ratio)',
                description: 'The primary scale ratio raised to the power of 1'
            },
            {
                name: 'scale-ratio--pow-2',
                value: 'calc(var(--scale-ratio--pow-1) * var(--scale-ratio))',
                description: 'The primary scale ratio raised to the power of 2'
            },
            {
                name: 'scale-ratio--pow-3',
                value: 'calc(var(--scale-ratio--pow-2) * var(--scale-ratio))',
                description: 'The primary scale ratio raised to the power of 3'
            },
            {
                name: 'scale-ratio--pow-4',
                value: 'calc(var(--scale-ratio--pow-3) * var(--scale-ratio))',
                description: 'The primary scale ratio raised to the power of 4'
            },
            {
                name: 'scale-ratio--pow-5',
                value: 'calc(var(--scale-ratio--pow-4) * var(--scale-ratio))',
                description: 'The primary scale ratio raised to the power of 5'
            },
            {
                name: 'scale-ratio--pow-6',
                value: 'calc(var(--scale-ratio--pow-5) * var(--scale-ratio))',
                description: 'The primary scale ratio raised to the power of 6'
            }
        ]
    }
};

export default manifest;
