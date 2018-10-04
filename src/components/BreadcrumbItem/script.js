import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';

import ActivePropertyMixin from '../../mixins/components/properties/ActivePropertyMixin';
import SizePropertyMixin from '../../mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '../../mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'BreadcrumbItem',
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