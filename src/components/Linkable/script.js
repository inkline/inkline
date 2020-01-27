import ActivePropertyMixin from '@inkline/inkline/src/mixins/components/properties/ActivePropertyMixin';
import DisabledPropertyMixin from '@inkline/inkline/src/mixins/components/properties/DisabledPropertyMixin';
import TabIndexPropertyMixin from '@inkline/inkline/src/mixins/components/properties/TabIndexPropertyMixin';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

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
