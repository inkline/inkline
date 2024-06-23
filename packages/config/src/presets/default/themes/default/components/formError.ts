import { defineComponent } from '../../../../../utils';

export const formError = defineComponent({
    color: 'var(--color-danger)',
    fontSize: 'calc(var(--font-size) * var(--size-multiplier-sm))',
    margin: {
        top: 'var(--margin-top-1-4)',
        right: 0,
        bottom: 0,
        left: 0
    }
});
