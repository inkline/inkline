import ActivePropertyMixin from '@inkline/inkline/mixins/components/properties/ActivePropertyMixin';

import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

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
            default: 'span'
        }
    },
    computed: {
        isTag () {
            return this.attributes.to ? this.routerComponent : this.attributes.href ? 'a' : this.tag;
        }
    }
};