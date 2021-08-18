import { defineComponent } from 'vue';
import IExpandTransition from '../../../../transitions/IExpandTransition/index.vue';
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
        visible() {
            return this.navbar.open || !this.navbar.collapsible;
        }
    }
});
//# sourceMappingURL=script.js.map