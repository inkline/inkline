import IExpandTransition from '@inkline/inkline/src/transitions/IExpandTransition/index.vue';

/**
 * @name default
 * @kind slot
 * @description Slot for default navbar collapsible content
 */

export default {
    name: 'INavbarCollapsible',
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
            return this.navbar.collapsed || !this.navbar.collapsible;
        }
    }
};
