import algoliasearch from "algoliasearch";
import 'instantsearch.css/themes/algolia.css';

export default {
    name: 'SiteNavigation',
    data () {
        return {
            popperOptions: {
                positionFixed: true
            },
            searchIndices: [
                { label: 'Introduction', value: 'introduction' },
                { label: 'Core', value: 'core' },
                { label: 'Forms', value: 'forms' },
                { label: 'Components', value: 'components' },
            ],
            searchKeymap: { show: ['enter'], hide: ['enter'] },
            searchClient: algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY)
        };
    },
    methods: {
        updateDropdown() {
            this.$refs.dropdown.$emit('change');
        }
    }
};
