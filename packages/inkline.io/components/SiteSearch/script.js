import { capitalizeFirst } from "@inkline/inkline/src/helpers";
import Fuse from 'fuse.js';
import axios from 'axios';

export default {
    name: 'SiteSearch',
    created() {
        axios.get('/search.json')
            .then((response) => {
                this.searchList = response.data.entries;
                this.searchList.forEach((category) => {
                    this.searchClients.push(new Fuse(category.items, this.searchOptions));
                    this.searchResults.push({
                        title: capitalizeFirst(category.title),
                        items: []
                    });
                });
            });
    },
    data () {
        return {
            searchString: '',
            searchKeymap: { show: ['enter'], hide: ['enter'] },
            searchList: [],
            searchResults: [],
            searchClients: [],
            searchOptions: {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                    "title",
                    "subtitle",
                    "description",
                    "category"
                ]
            }
        };
    },
    watch: {
        searchString(value) {
            if (!this.searchClients.length > 0) {
                return;
            }

            this.searchClients.forEach((client, index) => {
                this.searchResults[index].items = client.search(value);
            });

            setTimeout(() => this.$refs.dropdown.$emit('init'), 100);
        }
    },
    methods: {
        hasResults() {
            return this.searchResults.some((category) => category.items.length > 0)
        }
    }
};
