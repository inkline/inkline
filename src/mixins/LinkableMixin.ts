import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        tag: {
            type: String,
            default: 'a'
        }
    },
    computed: {
        isTag (): string {
            return this.$attrs.to ? this.routerComponent : this.$attrs.href ? 'a' : this.tag;
        },
        isComponent (): boolean {
            return this.isTag === this.routerComponent;
        },
        routerComponent (): string {
            return this.$inkline.options.routerComponent;
        }
    }
});
