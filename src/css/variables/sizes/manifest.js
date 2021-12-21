export const manifest = {
    name: 'sizes',
    css: {
        variables: [
            {
                name: 'size-percentage--0',
                value: '0%',
                description: 'The 0 percent value of the size percentage scale'
            },
            {
                name: 'size-percentage--25',
                value: '25%',
                description: 'The 25 percent value of the size percentage scale'
            },
            {
                name: 'size-percentage--50',
                value: '50%',
                description: 'The 50 percent value of the size percentage scale'
            },
            {
                name: 'size-percentage--75',
                value: '75%',
                description: 'The 75 percent value of the size percentage scale'
            },
            {
                name: 'size-percentage--100',
                value: '100%',
                description: 'The 100 percent value of the size percentage scale'
            },
            {
                name: 'size-multiplier',
                value: '1',
                description: 'The base size multiplier value'
            },
            {
                name: 'size-multiplier--xs',
                value: 'calc(var(--size-multiplier) / var(--scale-ratio--pow-2))',
                description: 'The extra-small size multiplier value'
            },
            {
                name: 'size-multiplier--sm',
                value: 'calc(var(--size-multiplier) / var(--scale-ratio))',
                description: 'The small size multiplier value'
            },
            {
                name: 'size-multiplier--md',
                value: 'var(--size-multiplier)',
                description: 'The medium size multiplier value'
            },
            {
                name: 'size-multiplier--lg',
                value: 'calc(var(--size-multiplier) * var(--scale-ratio))',
                description: 'The large size multiplier value'
            },
            {
                name: 'size-multiplier--xl',
                value: 'calc(var(--size-multiplier) * var(--scale-ratio--pow-2))',
                description: 'The extra-large size multiplier value'
            }
        ]
    }
};

export default manifest;
