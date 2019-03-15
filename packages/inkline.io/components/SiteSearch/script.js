import debounce from 'lodash-es/debounce';
import algoliasearch from "algoliasearch";
import 'instantsearch.css/themes/algolia.css';

const ALGOLIA_APPLICATION_ID = '20XO7MC0CB';
const ALGOLIA_API_KEY = 'd220f0c7ea35fe42306fe72fb00f3a91';

export default {
    name: 'SiteSearch',
    data () {
        return {
            searchIndices: [
                { label: 'Introduction', value: 'introduction' },
                { label: 'Core', value: 'core' },
                { label: 'Forms', value: 'forms' },
                { label: 'Components', value: 'components' },
            ],
            searchKeymap: { show: ['enter'], hide: ['enter'] },
            searchClient: algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)
        };
    },
    methods: {
        updateDropdown() {
            setTimeout(() => this.$refs.dropdown.$emit('init'), 100);
        },
        search(event, callback) {
            callback(event);
        }
    },
    mounted() {
        this.search = debounce(this.search, 500);
    }
};
