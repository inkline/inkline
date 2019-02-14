import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import ActivePropertyMixin from '@inkline/inkline/mixins/components/properties/ActivePropertyMixin';
import DisabledPropertyMixin from '@inkline/inkline/mixins/components/properties/DisabledPropertyMixin';

export default {
    name: 'INavItem',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        ActivePropertyMixin,
        DisabledPropertyMixin,
    ],
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