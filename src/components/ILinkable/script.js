import {
    ActivePropertyMixin,
    DisabledPropertyMixin,
    AttributesProviderMixin,
    ClassesProviderMixin,
    TabIndexPropertyMixin,
} from '@inkline/inkline/src/mixins';

export default {
    name: 'ILinkable',
    mixins: [
        ActivePropertyMixin,
        TabIndexPropertyMixin,
        DisabledPropertyMixin,

        AttributesProviderMixin,
        ClassesProviderMixin
    ],
    data() {
        return {
            routerComponent: this.$nuxt ? 'nuxt-link' : 'router-link'
        };
    },
    props: {
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
        isTag() {
            return this.attributes.to ? this.routerComponent : this.attributes.href ? 'a' : this.tag;
        },
        isComponent() {
            return this.isTag === this.routerComponent;
        }
    },
    methods: {
        onClick(event) {
            this.$emit('click', event);
        }
    }
};
