import { ICollapsible, ICollapsibleItem } from "@inkline/inkline/src/components";

export default {
    name: 'SiteNavigation',
    components: {
        ICollapsible,
        ICollapsibleItem
    },
    data() {
        return {
            menu: {
                'docs-components-dashboard-datatable': [],
                'docs-forms-validation': []
            }
        }
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
    mounted() {
        Object.keys(this.menu).forEach((routeName) => {
            this.menu[routeName] = this.subroutes[routeName] ? [routeName] : []
        });
    }
};
