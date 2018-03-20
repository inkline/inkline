import BindableIndividualFormItem from '../../mixins/BindableIndividualFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FormItem from '../../mixins/InjectableFormItem';
import GroupableFormItem from '../../mixins/GroupableFormItem';

export default {
    name: 'Input',
    props: {
        value: [Boolean, String],
        type: String
    },
    mixins: [
        BindableIndividualFormItem,
        DisableableFormItem,
        FormItem,
        GroupableFormItem
    ],
    computed: {
        classes () {
            console.log(this.cls);

            return [
                { '-disabled': this.isDisabled }
            ];
        }
    }
};
