module.exports = {
    name: 'nav',
    slots: [
        {
            name: 'default',
            description: 'Slot for default nav content',
            type: []
        }
    ],
    props: [
        {
            name: 'color',
            description: 'The color variant of the nav',
            type: [
                'light',
                'dark'
            ],
            default: 'light'
        },
        {
            name: 'size',
            description: 'The size variant of the nav',
            type: [
                'sm',
                'md',
                'lg'
            ],
            default: 'md'
        },
        {
            name: 'vertical',
            description: 'Display the nav with vertical orientation',
            type: [
                'Boolean'
            ],
            default: 'false'
        }
    ],
    styles: [
        {
            name: 'color',
            description: 'The color of the list group component item',
            type: 'color',
            variants: {
                light: 'contrast-color($color-light)',
                dark: 'contrast-color($color-dark)'
            }
        },
        {
            name: 'color-active',
            description: 'The color of the list group component item when active',
            type: 'color',
            variants: {
                light: 'color(\'primary\')',
                dark: 'color(\'primary\')'
            }
        },
        {
            name: 'color-disabled',
            description: 'The color of the list group component item when disabled',
            type: 'color',
            variants: {
                light: 'var(--text-muted)',
                dark: 'var(--text-muted)'
            }
        },
        {
            name: 'font-size',
            description: 'The font size of the modal component',
            type: 'size',
            default: 'font-size()'
        },
        {
            name: 'padding',
            description: 'The padding of the modal component',
            type: 'size',
            default: 'spacing()'
        }
    ]
};
