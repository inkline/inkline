import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import ActivePropertyMixin from 'inkline/mixins/components/properties/ActivePropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from 'inkline/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'IBreadcrumbItem',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        ActivePropertyMixin,
        SizePropertyMixin,
        VariantPropertyMixin
    ],
    computed: {
        tag() {
            return this.attributes.to ? 'router-link' : 'a';
        }
    }
};