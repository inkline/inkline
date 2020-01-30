import { ITable } from "@inkline/inkline/src/index";
import IApiPreview from '../ApiPreview';
import ICodePreview from '../CodePreview';

export default {
    name: 'View',
    components: {
        ICodePreview,
        IApiPreview,
        ITable
    },
    mounted() {
        this.$nuxt.$emit('viewLoaded');
    }
};
