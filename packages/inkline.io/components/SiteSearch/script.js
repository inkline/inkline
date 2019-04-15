import Fuse from 'fuse.js';
import axios from 'axios';

function highlight(resultItem) {
    resultItem.highlight = {};

    ['title', 'subtitle', 'description'].forEach((key) => {
        resultItem.highlight[key] = [{ highlight: false, text: resultItem.item[key] }];
    });

    resultItem.matches.forEach((matchItem) => {
        const result = [];
        const key = matchItem.key;
        const text = resultItem.item[key];
        const matches = [].concat(matchItem.indices);

        let pair = matches.shift();

        if (pair && pair[0] !== 0) {
            result.push({ highlight: false, text: '' });
        }

        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);

            if (pair && i === pair[0]) {
                result.push({ highlight: true, text: '' });
            }

            result[result.length - 1].text += char;

            if (pair && i === pair[1]) {
                result.push({ highlight: false, text: '' });
                pair = matches.shift();
            }
        }

        resultItem.highlight[key] = result;

        if (resultItem.children && resultItem.children.length > 0) {
            resultItem.children.map((child) => highlight(child));
        }
    });
}

export default {
    name: 'SiteSearch',
    created() {
        axios.get('/search.json')
            .then((response) => {
                this.searchList = response.data.entries;
                this.searchList.forEach((category) => {
                    this.searchClients.push(new Fuse(category.items, this.searchOptions));
                    this.searchResults.push({
                        title: category.title,
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
                includeMatches: true,
                includeScore: true,
                threshold: 0.25,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                keys: [
                    { name: "title", weight: 0.4 },
                    { name: "subtitle", weight: 0.3 },
                    { name: "description", weight: 0.2 },
                    { name: "category", weight: 0.1 }
                ]
            }
        };
    },
    computed: {
        sortedSearchResults() {
            return [...this.searchResults].sort((a, b) => {
                if (a.items.length === 0) {
                    return 1;
                } else if (b.items.length === 0) {
                    return -1;
                }

                if (a.items[0].score < b.items[0].score) {
                    return -1;
                } else if (a.items[0].score > b.items[0].score) {
                    return 1;
                }

                return 0;
            });
        },
        searchResultsCount() {
            return this.searchResults.reduce((acc, category) => {
                acc += category.items.length;

                return acc;
            }, 0);
        }
    },
    watch: {
        searchString(value) {
            if (!this.searchClients.length > 0) {
                return;
            }

            this.searchClients.forEach((client, index) => {
                const searchResults = client.search(value);
                searchResults.forEach((result) => highlight(result));

                this.searchResults[index].items = searchResults.map((result) => ({
                    ...result.item,
                    ...result.highlight,
                    score: result.score
                }));
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
