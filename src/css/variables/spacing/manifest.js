export const manifest = {
    name: 'spacing',
    css: {
        variables: [
            {
                name: 'spacing',
                value: '1rem',
                description: 'The base spacing of the design system used for margins and paddings'
            },
            {
                name: 'margin-top',
                value: 'var(--spacing)',
                description: 'The margin-top part of the design system margin'
            },
            {
                name: 'margin-right',
                value: 'var(--spacing)',
                description: 'The margin-right part of the design system margin'
            },
            {
                name: 'margin-bottom',
                value: 'var(--spacing)',
                description: 'The margin-bottom part of the design system margin'
            },
            {
                name: 'margin-right',
                value: 'var(--spacing)',
                description: 'The margin-right part of the design system margin'
            },
            {
                name: 'margin',
                value: 'var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left)',
                modifiers: ['composed'],
                description: 'The composed margin of the design system'
            },
            {
                name: 'padding-top',
                value: 'var(--spacing)',
                description: 'The padding-top part of the design system padding'
            },
            {
                name: 'padding-right',
                value: 'var(--spacing)',
                description: 'The padding-right part of the design system padding'
            },
            {
                name: 'padding-bottom',
                value: 'var(--spacing)',
                description: 'The padding-bottom part of the design system padding'
            },
            {
                name: 'padding-right',
                value: 'var(--spacing)',
                description: 'The padding-right part of the design system padding'
            },
            {
                name: 'padding',
                value: 'var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left)',
                modifiers: ['composed'],
                description: 'The composed padding of the design system'
            }
        ]
    }
};

export default manifest;
