import IApiPreview from '../ApiPreview';
import ICodePreview from '../CodePreview';

export default {
    name: 'View',
    components: {
        ICodePreview,
        IApiPreview
    },
    mounted() {
        this.$nuxt.$emit('viewLoaded');
    }
};
