import BindableFormItem from '../../mixins/BindableFormItem';
import DisableableFormItem from '../../mixins/DisableableFormItem';
import FormItem from '../../mixins/FormItem';
import GroupableFormItem from '../../mixins/GroupableFormitem';

export default {
    name: 'Checkbox',
    props: {
        value: [Boolean, String],
        disabled: Boolean,
        indeterminate: Boolean /* @TODO Implement indeterminate checkboxes */
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
    },
    mounted () {
        if (this.indeterminate) {
            this.$el.setAttribute('aria-controls', this.controls);
        }
    }
};
