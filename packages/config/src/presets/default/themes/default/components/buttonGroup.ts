import { defineComponent } from '../../../../../utils';

export const buttonGroup = defineComponent({
    borderRadius: {
        topLeft: 'var(--button--border-top-left-radius)',
        topRight: 'var(--button--border-top-right-radius)',
        bottomRight: 'var(--button--border-bottom-right-radius)',
        bottomLeft: 'var(--button--border-bottom-left-radius)'
    }
});
