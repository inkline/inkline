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
        this.classesProvider.add(() => this.variant ? `-${this.variant}` : this.$inkline && `-${this.$inkline.config.variant}`);
    }
};
</script>
