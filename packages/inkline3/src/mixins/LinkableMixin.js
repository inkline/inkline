export default {
    data() {
        return {
            routerComponent: this.$nuxt ? 'nuxt-link' : 'router-link'
        };
    },
    props: {
        tag: {
            type: String,
            default: 'a'
        }
    },
    computed: {
        isTag() {
            return this.$attrs.to ? this.routerComponent : this.$attrs.href ? 'a' : this.tag;
        },
        isComponent() {
            return this.isTag === this.routerComponent;
        }
    }
};
