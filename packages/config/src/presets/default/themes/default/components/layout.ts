import { defineComponent } from '../../../../../utils';

export const layoutAside = defineComponent({
    width: '320px',
    transition: {
        property: 'width, height',
        duration: 'var(--transition-duration)',
        timingFunction: 'var(--transition-timing-function)'
    }
});
