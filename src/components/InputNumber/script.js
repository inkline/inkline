import Input from '../Input';

export default {
    name: 'InputNumber',
    extends: Input,
    data () {
        return {
            prepended: true,
            appended: true
        };
    },
    watch: {
        value: {
            immediate: true,
            handler (value) {
                let newValue = value === undefined ? value : Number(value.replace(/[^0-9]/g, ''));

                if (newValue !== undefined && isNaN(newValue)) return;
                if (newValue >= this.max) newValue = this.max;
                if (newValue <= this.min) newValue = this.min;

                this.$emit('input', newValue);
            }
        }
    },
};
