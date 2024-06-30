import { defineComponent } from '../../../../../utils';

export const icon = defineComponent(
    {
        fontSize: 'var(--font-size)'
    },
    {
        xs: {
            fontSize: 'calc(var(--icon--font-size) * var(--size-multiplier-xs))'
        },
        sm: {
            fontSize: 'calc(var(--icon--font-size) * var(--size-multiplier-sm))'
        },
        md: {
            fontSize: 'calc(var(--icon--font-size) * var(--size-multiplier-md))'
        },
        lg: {
            fontSize: 'calc(var(--icon--font-size) * var(--size-multiplier-lg))'
        },
        xl: {
            fontSize: 'calc(var(--icon--font-size) * var(--size-multiplier-xl))'
        },
        xxl: {
            fontSize: 'calc(var(--icon--font-size) * var(--size-multiplier-xxl))'
        }
    }
);
