import { defineComponent } from 'vue';
import { IExpandTransition } from '@inkline/inkline/transitions';

/**
 * Slot for default navbar collapsible content
 * @name default
 * @kind slot
 */

const componentName = 'INavbarCollapsible';

export default defineComponent({
    name: componentName,
    components: {
        IExpandTransition
    },
    inject: {
        navbar: {
            default: () => ({})
        }
    },
    inheritAttrs: false,
    computed: {
        visible () {
            const isServer = typeof window === 'undefined';

            return (this as any).navbar.open || !(this as any).navbar.collapsible || isServer;
        }
    }
});
