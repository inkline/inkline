import ClassableComponent from '../../mixins/ClassableComponent';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import InputableFormItem from '../../mixins/InputableFormItem';

export default {
    name: 'InputGroup',
    props: {
        value: {}
    },
    mixins: [
        ClassableComponent,
        DisableableFormItem,
        InputableFormItem
    ]
};
