import DisableableFormItem from '../../mixins/forms/DisableableFormitem';
import InputableFormItem from '../../mixins/forms/InputableFormItem';

import ClassableComponent from '../../mixins/components/ClassableComponent';
import SizeableComponent from '../../mixins/components/SizeableComponent';

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
