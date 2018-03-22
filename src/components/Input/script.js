import BindableIndividualFormItem from '../../mixins/BindableIndividualFormItem';
import ChangeableComponent from '../../mixins/ChangeableComponent';
import ClearableFormItem from '../../mixins/ClearableFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FocusableComponent from '../../mixins/FocusableComponent';
import FormItem from '../../mixins/InjectableFormItem';
import GroupableFormItem from '../../mixins/GroupableFormItem';
import HoverableComponent from '../../mixins/HoverableComponent';
import InputableFormItem from '../../mixins/InputableFormItem';

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
        ClearableFormItem,
        DisableableFormItem,
        FocusableComponent,
        FormItem,
        GroupableFormItem,
        HoverableComponent,
        InputableFormItem
    ],
    methods: {
    }
};
