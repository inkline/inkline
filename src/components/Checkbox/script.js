import Checkable from '../Checkable';

export default {
    name: 'Checkbox',
    mixins: [
        Checkable
    ],
    props: {
        value: [Boolean, String],
        indeterminate: Boolean /* @TODO Implement indeterminate checkboxes */
    },
    computed: {
        checked () {
            if ({}.toString.call(this.model) === '[object Boolean]') {
                return this.model;
            } else if (Array.isArray(this.model)) {
                return this.model.indexOf(this.currentValue) !== -1;
            } else if (this.model !== null && this.model !== undefined) {
                return this.model === this.currentValue;
            }
        }
    },
    mounted () {
        if (this.indeterminate) {
            this.$el.setAttribute('aria-controls', this.controls);
        }
    }
};
