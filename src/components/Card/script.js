import AttributesProviderMixin from '../../mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';

import SizePropertyMixin from '../../mixins/components/properties/SizePropertyMixin';
import ThemePropertyMixin from '../../mixins/components/properties/ThemePropertyMixin';

export default {
    name: 'Card',
    mixins: [
        AttributesProviderMixin,
        ClassesProviderMixin,
        SizePropertyMixin,
        ThemePropertyMixin
    ]
};
