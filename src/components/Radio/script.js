import BindableFormItem from '../../mixins/BindableFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FormItem from '../../mixins/FormItem';
import GroupableFormItem from '../../mixins/GroupableFormitem';

export default {
    name: 'Radio',
    props: {
        value: String,
        disabled: Boolean
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
