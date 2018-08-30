import DisableableFormItem from '../../mixins/forms/properties/DisabledPropertyMixin';
import InputableFormItem from '../../mixins/components/methods/OnInputMethodMixin';

import ClassableComponent from '../../mixins/components/providers/ClassesProviderMixin';
import SizeableComponent from '../../mixins/components/properties/SizePropertyMixin';

export default {
    name: 'InputGroup',
    props: {
        value: {}
    },
    mixins: [
        DisableableFormItem,
        InputableFormItem,

        ClassableComponent,
        SizeableComponent
    ]
};
