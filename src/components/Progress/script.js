import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from 'inkline/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'IProgress',
    mixins: [
        ClassesProviderMixin,

        SizePropertyMixin,
        VariantPropertyMixin,
    ]
};