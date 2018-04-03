import Radio from '../Radio';

export default {
    name: 'Checkbox',
    extends: Radio,
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
