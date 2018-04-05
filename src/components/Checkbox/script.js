import CheckableFormItem from '../../mixins/forms/CheckableFormItem';

export default {
    name: 'Checkbox',
    mixins: [
        CheckableFormItem
    ],
    props: {
        value: [Boolean, String],
        indeterminate: Boolean /* @TODO Implement indeterminate checkboxes */
    },
    mounted () {
        if (this.indeterminate) {
            this.$el.setAttribute('aria-controls', this.controls);
        }
    }
};
