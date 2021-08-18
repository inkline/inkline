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
        isTag(): string {
            return this.$attrs.to ? this.routerComponent : this.$attrs.href ? 'a' : this.tag;
        },
        isComponent(): boolean {
            return this.isTag === this.routerComponent;
        }
    }
});
