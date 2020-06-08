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
        const variant = ((this.$inkline || {}).config || {}).variant;

        this.classesProvider.add(() => this.variant ? `-${this.variant}` : variant && `-${variant}`);
    }
};
</script>
