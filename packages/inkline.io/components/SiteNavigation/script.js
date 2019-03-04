import algoliasearch from "algoliasearch";
import 'instantsearch.css/themes/algolia.css';

export default {
    name: 'SiteNavigation',
    data () {
        return {
            popperOptions: {
                positionFixed: true
            },
            searchClient: algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY)
        };
    }
};
