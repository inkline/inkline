import IExpandTransition from '@inkline/inkline/src/transitions/IExpandTransition/index.vue';

/**
 * @name default
 * @kind slot
 * @description Slot for default navbar collapsible content
 */

const componentName = 'INavbarCollapsible';

export default {
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
};
