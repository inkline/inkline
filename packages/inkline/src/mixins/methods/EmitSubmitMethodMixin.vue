<script>
import { FormBuilder } from '@inkline/inkline/src/factories/FormBuilder';

export default {
    methods: {
        /**
         * Handler for submit event
         */
        emitSubmit (event) {
            event.preventDefault();

            if (this.schema) {
                this.schema[FormBuilder.keys.VALIDATE](this.validationOptions);

                if (this.schema[FormBuilder.keys.INVALID]) {
                    return;
                }
            }

            return this.$emit('submit', event);
        }
    }
};
</script>
