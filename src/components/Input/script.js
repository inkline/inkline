import BindableFormItem from '../../mixins/BindableFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FormItem from '../../mixins/FormItem';
import GroupableFormItem from '../../mixins/GroupableFormitem';

export default {
    name: 'Input',
    props: {
        value: [Boolean, String],
        disabled: Boolean,
        type: String
    },
    mixins: [
        BindableFormItem,
        DisableableFormItem,
        FormItem,
        GroupableFormItem
    ],
    computed: {
        classes () {
            return [
                { '-disabled': this.isDisabled }
            ];
        }
    }
};
