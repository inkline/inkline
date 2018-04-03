import BindableGroupedFormItem from '../../mixins/BindableGroupedFormItem';
import ClassableComponent from '../../mixins/ClassableComponent';
import CustomizableFormItem from '../../mixins/CustomizableFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FormItem from '../../mixins/InjectableFormItem';
import GroupableFormItem from '../../mixins/GroupableFormItem';

export default {
    name: 'Checkbox',
    props: {
        value: [String, Boolean],
        indeterminate: Boolean /* @TODO Implement indeterminate checkboxes */
    },
    mixins: [
        BindableGroupedFormItem,
        ClassableComponent,
        CustomizableFormItem,
        DisableableFormItem,
        FormItem,
        GroupableFormItem
    ],
    mounted () {
        if (this.indeterminate) {
            this.$el.setAttribute('aria-controls', this.controls);
        }
    }
};
