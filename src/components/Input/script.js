import BindableIndividualFormItem from '../../mixins/BindableIndividualFormItem';
import ChangeableComponent from '../../mixins/ChangeableComponent';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FocusableFormItem from '../../mixins/FocusableFormItem';
import FormItem from '../../mixins/InjectableFormItem';
import GroupableFormItem from '../../mixins/GroupableFormItem';

export default {
    name: 'Input',
    props: {
        value: [Boolean, String],
        type: String,
        clearable: Boolean
    },
    mixins: [
        BindableIndividualFormItem,
        ChangeableComponent,
        DisableableFormItem,
        FocusableFormItem,
        FormItem,
        GroupableFormItem
    ],
    computed: {
        classes () {
            return [
                { '-disabled': this.isDisabled },
                { '-clearable': this.clearable }
            ];
        },
        isClearVisible () {
            return this.clearable && this.currentValue !== '' && (this.focused || this.hovering);
        }
    },
    methods: {
    }
};
