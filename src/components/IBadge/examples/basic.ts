import { defineComponent, h } from '@inkline/paper';
import { IBadge } from '@inkline/inkline/components';

export default defineComponent({
    render (state) {
        return h(IBadge, state, 'Badge');
    }
});
