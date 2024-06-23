import { defineComponent } from '../../../../../utils';

export const loader = defineComponent(
    {
        animation: {
            duration: '1.2s'
        },
        background: 'var(--color-primary)',
        width: '64px',
        height: '64px'
    },
    {
        light: {
            background: 'var(--contrast-text-color-light)'
        },
        dark: {
            background: 'var(--contrast-text-color-dark)'
        },
        primary: {
            background: 'var(--color-primary)'
        },
        sm: {
            width: 'calc(var(--loader--width) * var(--size-multiplier-sm))'
        },
        md: {
            width: 'calc(var(--loader--width) * var(--size-multiplier-md))'
        },
        lg: {
            width: 'calc(var(--loader--width) * var(--size-multiplier-lg))'
        }
    }
);
