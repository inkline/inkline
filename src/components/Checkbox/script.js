import BindableGroupedFormItem from '../../mixins/BindableGroupedFormItem';
import ClassableComponent from '../../mixins/ClassableComponent';
import CustomizableFormItem from '../../mixins/CustomizableFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FocusableComponent from '../../mixins/FocusableComponent';
import InjectableFormItem from '../../mixins/InjectableFormItem';
import LabelableFormItem from '../../mixins/LabelableFormItem';
import GroupableFormItem from '../../mixins/GroupableFormItem';

export default {
    name: 'Checkbox',
    props: {
        value: [Boolean, String],
        indeterminate: Boolean /* @TODO Implement indeterminate checkboxes */
    },
    mixins: [
        BindableGroupedFormItem,
        ClassableComponent,
        CustomizableFormItem,
        DisableableFormItem,
        FocusableComponent,
        InjectableFormItem,
        LabelableFormItem,
        GroupableFormItem
    ],
    mounted () {
        if (this.indeterminate) {
            this.$el.setAttribute('aria-controls', this.controls);
        }
    }
};
