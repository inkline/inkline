import { defineComponent } from '../../../../../utils';

export const expandTransition = defineComponent({
    transition: {
        property: 'height',
        duration: 'var(--transition-duration)',
        timingFunction: 'var(--transition-timing-function)'
    }
});
