import { defineComponent } from '../../../../../utils';

export const formLabel = defineComponent(
    {
        fontSize: 'var(--font-size)',
        margin: {
            top: 0,
            right: 0,
            bottom: 'var(--margin-bottom-1-4)',
            left: 0
        },
        transition: {
            property: 'color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        error: {
            color: 'var(--color-danger)'
        },
        inline: {
            margin: {
                left: 'var(--margin-left)',
                right: 'var(--margin-right)'
            }
        },
        required: {
            color: 'var(--color-danger)'
        }
    },
    {
        sm: {
            fontSize: 'calc(var(--form-label--font-size) * var(--size-multiplier-sm))'
        },
        md: {
            fontSize: 'calc(var(--form-label--font-size) * var(--size-multiplier-md))'
        },
        lg: {
            fontSize: 'calc(var(--form-label--font-size) * var(--size-multiplier-lg))'
        }
    }
);
