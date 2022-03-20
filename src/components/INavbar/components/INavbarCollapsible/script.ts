import { defineComponent, h } from '@inkline/paper';
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
    computed: {
        visible () {
            return (this as any).navbar.open || !(this as any).navbar.collapsible;
        }
    }
});
