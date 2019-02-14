import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '@inkline/inkline/mixins/components/properties/SizePropertyMixin';
import VariantPropertyMixin from '@inkline/inkline/mixins/components/properties/VariantPropertyMixin';

export default {
    name: 'ICard',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        SizePropertyMixin,
        VariantPropertyMixin
    ]
};
