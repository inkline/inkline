import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import InjectParentFormProviderMixin from 'inkline/mixins/forms/providers/InjectParentFormProviderMixin';

import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'IFormLabel',
    props: {
        value: {}
    },
    mixins: [
        ClassesProviderMixin,
        InjectParentFormProviderMixin,

        SizePropertyMixin,
    ]
};
