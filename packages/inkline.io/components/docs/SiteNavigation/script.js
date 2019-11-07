import { ICollapsible, ICollapsibleItem } from "@inkline/inkline/src/components";

export default {
    name: 'SiteNavigation',
    components: {
        ICollapsible,
        ICollapsibleItem
    },
    computed: {
        subroutes() {
            const routeParts = this.$nuxt.$route.path.split('-');
            return routeParts
                .reduce((acc, part, index) => {
                    acc[routeParts.slice(0, index).join('-')] = true;
                    return acc;
                }, {});
        }
    },
    methods: {
        isSubroute(routeName) {
            console.log(routeName, this.$nuxt.$route.name)
            return this.$nuxt.$route.name.indexOf(routeName) === 0 ? [routeName] : [];
        }
    },
    mounted() {
        console.log(this.$nuxt);
    }
};
