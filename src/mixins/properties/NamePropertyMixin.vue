<script>
import { FormBuilder } from '@inkline/inkline/src/factories/FormBuilder';

export default {
    computed: {
        name() {
            return this.schema ? this.schema[FormBuilder.keys.NAME] : this.$attrs.name;
        }
    }
};
</script>
