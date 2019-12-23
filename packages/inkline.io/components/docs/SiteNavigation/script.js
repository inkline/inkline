import { ICollapsible, ICollapsibleItem } from "@inkline/inkline/src/components";

export default {
    name: 'SiteNavigation',
    components: {
        ICollapsible,
        ICollapsibleItem
    },
    computed: {
        subroutes() {
            const routeParts = this.$nuxt.$route.name.split('-');
            return routeParts
                .reduce((acc, part, index) => {
                    acc[routeParts.slice(0, index + 1).join('-')] = true;
                    return acc;
                }, {});
        }
    },
    methods: {
        isNavCollapsed(routeName) {
            return this.subroutes[routeName] ? [routeName] : [];
        }
    },
    mounted() {
        console.log(this.$nuxt);
    }
};
