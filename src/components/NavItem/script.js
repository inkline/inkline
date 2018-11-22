import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'INavItem',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        DisabledPropertyMixin,
        SizePropertyMixin,
    ],
    props: {
        tabs: {
            type: Boolean,
            default: false
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        _tag () {
            return this.attributes.to ? 'router-link' : this.attributes.href ? 'a' : this.tag;
        }
    }
};