import IButton from '@inkline/inkline/src/components/Button';
import IInput from '@inkline/inkline/src/components/Input';
import IFormGroup from '@inkline/inkline/src/components/FormGroup';

export default {
    name: 'IInputNumber',
    extends: IInput,
    components: {
        IButton,
        IFormGroup
    },
    data() {
        return {
            prepended: true,
            appended: true,
        };
    },
    props: {
        value: {
            type: [Number, String],
            default: 0
        },
        min: {
            type: [Number, String],
            default: -Infinity
        },
        max: {
            type: [Number, String],
            default: Infinity
        },
        precision: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        }
    },
    methods: {
        decrease() {
            this.$emit('input', this.formatPrecision((Number(this.value) - this.step).toString()));
        },
        increase() {
            this.$emit('input', this.formatPrecision((Number(this.value) + this.step).toString()));
        },
        formatPrecision (value) {
            const parts = value.split('.');
            let decimals = parts[1] || "";

            for (let i = decimals.length; i < this.precision; i += 1) {
                decimals += '0';
            }

            return this.precision > 0 ? `${parts[0]}.${decimals}` : parts[0];
        },
        onBlurFormatPrecision (event) {
            this.$emit('input', this.formatPrecision(Number(this.value).toString()));
            this.emitBlur(event);
        },
    },
    watch: {
        value: {
            immediate: true,
            handler (value) {
                let newValue = value === undefined ? value : value.toString()
                    .replace(/^[^0-9-]/, '')
                    .replace(/^(-)[^0-9]/, '$1')
                    .replace(new RegExp(`^(-?[0-9]+)[^0-9${this.precision > 0 ? '.' : ''}]`), '$1');

                if (this.precision > 0) {
                    newValue = newValue
                        .replace(/^(-?[0-9]+\.)[^0-9]/, '$1')
                        .replace(new RegExp(`^(-?[0-9]+\\.[0-9]{0,${this.precision}}).*`), '$1');
                }

                if (parseFloat(newValue) >= parseFloat(this.max)) newValue = this.max.toString();
                if (parseFloat(newValue) <= parseFloat(this.min)) newValue = this.min.toString();

                this.$emit('input', newValue);
            }
        }
    }
};
