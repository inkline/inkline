import ClassesProviderMixin from '../../mixins/components/providers/ClassesProviderMixin';

import OnInputMethodMixin from '../../mixins/components/methods/OnInputMethodMixin';

import DisabledPropertyMixin from '../../mixins/forms/properties/DisabledPropertyMixin';
import SizePropertyMixin from '../../mixins/components/properties/SizePropertyMixin';

export default {
    name: 'InputGroup',
    props: {
        value: {}
    },
    mixins: [
        ClassesProviderMixin,

        OnInputMethodMixin,

        DisabledPropertyMixin,
        SizePropertyMixin
    ]
};
