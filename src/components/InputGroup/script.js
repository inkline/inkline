import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';

import OnInputMethodMixin from 'inkline/mixins/components/methods/OnInputMethodMixin';

import DisabledPropertyMixin from 'inkline/mixins/forms/properties/DisabledPropertyMixin';
import SizePropertyMixin from 'inkline/mixins/components/properties/SizePropertyMixin';

export default {
    name: 'IInputGroup',
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
