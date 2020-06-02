<script>
import { FormBuilder } from '@inkline/inkline/src/factories/FormBuilder';

export default {
    props: {
        value: {
            type: [String, Boolean],
            default: ''
        }
    },
    computed: {
        /**
         * Get the value of the form item
         */
        currentValue() {
            return this.value;
        },

        /**
         * Bind the value of a form item group or groupable form item
         */
        model: {
            get() {
                const target = this.isGrouped ? this.parentFormGroup : this;

                return target.schema ? target.schema[FormBuilder.keys.VALUE] : target.value;
            },
            set (value) {
                if (this.isGrouped) {
                    return this.parentFormGroup.$emit('input', value);
                }

                return this.$emit('input', value);
            }
        }
    }
};
</script>
