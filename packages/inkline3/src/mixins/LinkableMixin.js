export default {
    data() {
        return {
            routerComponent: this.$nuxt ? 'nuxt-link' : 'router-link'
        };
    },
    props: {
        active: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'a'
        },
        tabindex: {
            type: [Number, String],
            default: -1
        }
    },
    computed: {
        linkableClasses() {
            return {
                '-active': this.active,
                '-disabled': this.disabled
            };
        },
        isTag() {
            return this.$attrs.to ? this.routerComponent : this.$attrs.href ? 'a' : this.tag;
        },
        isComponent() {
            return this.isTag === this.routerComponent;
        }
    }
};
