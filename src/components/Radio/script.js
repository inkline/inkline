import BindableGroupedFormItem from '../../mixins/BindableGroupedFormItem';
import ClassableComponent from '../../mixins/ClassableComponent';
import CustomizableFormItem from '../../mixins/CustomizableFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FormItem from '../../mixins/InjectableFormItem';
import GroupableFormItem from '../../mixins/GroupableFormItem';

export default {
    name: 'Radio',
    props: {
        value: String
    },
    mixins: [
        BindableGroupedFormItem,
        ClassableComponent,
        CustomizableFormItem,
        DisableableFormItem,
        FormItem,
        GroupableFormItem
    ]
};
