<script>
import { FormBuilder } from '@inkline/inkline/src/factories/FormBuilder';

export default {
    props: {
        value: {
            type: [String, Number],
            default: ''
        }
    },
    computed: {
        /**
         * Bind the value of an individual form item
         */
        model: {
            get() {
                if (this.schema) {
                    return this.schema[FormBuilder.keys.VALUE];
                }

                return this.value;
            },
            set (value) {
                return this.$emit('input', value);
            }
        }
    }
};
</script>
