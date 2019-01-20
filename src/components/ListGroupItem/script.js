import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import ActivePropertyMixin from 'inkline/mixins/components/properties/ActivePropertyMixin';
import DisabledPropertyMixin from 'inkline/mixins/components/properties/DisabledPropertyMixin';

export default {
    name: 'IListGroupItem',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        ActivePropertyMixin,
        DisabledPropertyMixin
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