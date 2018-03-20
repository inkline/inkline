import BindableGroupedFormItem from '../../mixins/BindableGroupedFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FormItem from '../../mixins/InjectableFormItem';
import GroupableFormItem from '../../mixins/GroupableFormItem';

export default {
    name: 'Checkbox',
    props: {
        value: [Boolean, String],
        indeterminate: Boolean /* @TODO Implement indeterminate checkboxes */
    },
    mixins: [
        BindableGroupedFormItem,
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
    },
    mounted () {
        if (this.indeterminate) {
            this.$el.setAttribute('aria-controls', this.controls);
        }
    }
};
