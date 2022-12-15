<script>
import Vue from 'vue';

export default {
    props: {
        variant: {
            type: String,
            default: ''
        }
    },
    created() {
        this.classesProvider.add(() => {
            const variant = this.$inkline?.config?.variant;

            return this.variant ? `-${this.variant}` : variant && `-${variant}`;
        });
    }
};
</script>
