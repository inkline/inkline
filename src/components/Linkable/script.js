import ActivePropertyMixin from '@inkline/inkline/src/mixins/components/properties/ActivePropertyMixin';

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

export default {
    name: 'ILinkable',
    mixins: [
        ActivePropertyMixin,

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
        }
    },
    computed: {
        isTag() {
            return this.attributes.to ? this.routerComponent : this.attributes.href ? 'a' : this.tag;
        }
    }
};
