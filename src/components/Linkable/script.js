import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';

export default {
    name: 'ILinkable',
    mixins: [
        AttributesProviderMixin
    ],
    data() {
        return {
            routerComponent: this.$nuxt ? 'nuxt-link' : 'router-link'
        };
    },
    props: {
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        isTag () {
            return this.attributes.to ? 'router-link' : this.attributes.href ? 'a' : this.tag;
        }
    }
};