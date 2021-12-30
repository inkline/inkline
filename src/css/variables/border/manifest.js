export const manifest = {
    name: 'border',
    css: {
        variables: [
            {
                name: 'border-style',
                value: 'solid',
                description: 'The border-style part of the design system border'
            },
            {
                name: 'border-top-width',
                value: '1px',
                description: 'The border-top-width part of the design system border-width'
            },
            {
                name: 'border-right-width',
                value: '1px',
                description: 'The border-right-width part of the design system border-width'
            },
            {
                name: 'border-bottom-width',
                value: '1px',
                description: 'The border-bottom-width part of the design system border-width'
            },
            {
                name: 'border-left-width',
                value: '1px',
                description: 'The border-left-width part of the design system border-width'
            },
            {
                name: 'border-width',
                value: 'var(--border-top-width) var(--border-right-width) var(--border-bottom-width) var(--border-left-width)',
                modifiers: ['composed'],
                description: 'The composed border-width of the design system'
            },
            {
                name: 'border-color--light',
                value: 'var(--color--gray-30)',
                description: 'The light mode border-color of the design system border'
            },
            {
                name: 'border-color--dark',
                value: 'var(--color--gray-70)',
                description: 'The dark mode border-color of the design system border'
            },
            {
                name: 'border-color',
                value: 'var(--border-color--light)',
                description: 'The border-color of the design system border. Changes based on selected color mode.'
            },
            {
                name: 'border-top-left-radius',
                value: '0.25rem',
                modifiers: ['size'],
                description: 'The border-top-left-radius of the design system border-radius'
            },
            {
                name: 'border-top-right-radius',
                value: '0.25rem',
                modifiers: ['size'],
                description: 'The border-top-right-radius of the design system border-radius'
            },
            {
                name: 'border-bottom-right-radius',
                value: '0.25rem',
                modifiers: ['size'],
                description: 'The border-bottom-right-radius of the design system border-radius'
            },
            {
                name: 'border-bottom-left-radius',
                value: '0.25rem',
                modifiers: ['size'],
                description: 'The border-bottom-left-radius of the design system border-radius'
            },
            {
                name: 'border-radius',
                value: 'var(--border-top-left-radius) var(--border-top-right-radius) var(--border-bottom-right-radius) var(--border-bottom-left-radius)',
                modifiers: ['composed', 'size'],
                description: 'The composed border-radius of the design system'
            }
        ]
    }
};

export default manifest;
