import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '../../mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '../../mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'Breadcrumb',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin
    ],
    props: {
        divider: {
            type: String,
            default: '/'
        },
    }
};