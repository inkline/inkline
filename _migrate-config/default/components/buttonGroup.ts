import { defineComponent } from '../../../../../utils';

export const buttonGroup = defineComponent({
    borderRadius: {
        topLeft: 'var(--border-top-left-radius)',
        topRight: 'var(--border-top-right-radius)',
        bottomRight: 'var(--border-bottom-right-radius)',
        bottomLeft: 'var(--border-bottom-left-radius)'
    }
});
