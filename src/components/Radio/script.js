import BindableGroupedFormItem from '../../mixins/BindableGroupedFormItem';
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
        CustomizableFormItem,
        DisableableFormItem,
        FormItem,
        GroupableFormItem
    ]
};
