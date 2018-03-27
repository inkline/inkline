import BindableIndividualFormItem from '../../mixins/BindableIndividualFormItem';
import ChangeableComponent from '../../mixins/ChangeableComponent';
import ClassableComponent from '../../mixins/ClassableComponent';
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
        value: String,
        type: String
    },
    mixins: [
        BindableIndividualFormItem,
        ChangeableComponent,
        ClassableComponent,
        ClearableFormItem,
        DisableableFormItem,
        FocusableComponent,
        FormItem,
        GroupableFormItem,
        HoverableComponent,
        InputableFormItem
    ],
    created () {
        if (this.classesProvider) {
            this.classesProvider.push(() => ({
                '-prefixed': this.$slots.prefix,
                '-suffixed': this.$slots.suffix,
                '-prepended': this.$slots.prepend,
                '-appended': this.$slots.append
            }));
        }
    }
};
