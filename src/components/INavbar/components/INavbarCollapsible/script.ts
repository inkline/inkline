import { defineComponent } from 'vue';
import { IExpandTransition } from '@inkline/inkline/transitions';

/**
 * @name default
 * @kind slot
 * @description Slot for default navbar collapsible content
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
    computed: {
        visible () {
            return (this as any).navbar.open || !(this as any).navbar.collapsible;
        }
    }
});
