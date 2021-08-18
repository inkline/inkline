import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        tag: {
            type: String,
            default: 'a'
        }
    },
    data() {
        return {
            routerComponent: this.$nuxt ? 'nuxt-link' : 'router-link'
        };
    },
    computed: {
        isTag() {
            return this.$attrs.to ? this.routerComponent : this.$attrs.href ? 'a' : this.tag;
        },
        isComponent() {
            return this.isTag === this.routerComponent;
        }
    }
});
//# sourceMappingURL=LinkableMixin.js.map