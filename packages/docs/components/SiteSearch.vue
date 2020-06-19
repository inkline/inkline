<template>
    <div class="site-search">
        <i-dropdown ref="dropdown" placement="bottom-start" :keymap="searchKeymap">
            <i-input v-model="searchString" type="search" placeholder="Search">
                <font-awesome-icon slot="prefix" icon="search" />
            </i-input>
            <i-dropdown-menu v-show="searchString !== ''">
                <div class="body">
                    <div v-for="(category, categoryIndex) in searchList" v-if="!hasResults() && searchString === ''" :key="categoryIndex">
                        <div class="category">
                            {{ category.title }}
                        </div>
                        <i-dropdown-item
                            v-for="item in category.items"
                            :key="item.objectID"
                            :to="{ name: item.url, hash: item.hash ? '#' + item.hash : '' }">
                            <div v-if="item.title" class="title">
                                {{ item.title }}
                            </div>
                            <div v-if="item.subtitle" class="subtitle">
                                {{ item.subtitle }}
                            </div>
                            <div v-if="item.description" class="description">
                                {{ item.description }}
                            </div>
                        </i-dropdown-item>
                    </div>

                    <div v-if="!hasResults() && searchString !== ''">
                        <i-dropdown-item>
                            No search results found for "{{ searchString }}"
                        </i-dropdown-item>
                    </div>

                    <div v-for="(category, categoryIndex) in sortedSearchResults" v-if="category.items.length > 0" :key="categoryIndex">
                        <div class="category">
                            {{ category.title }}
                        </div>
                        <i-dropdown-item
                            v-for="item in category.items"
                            :key="item.objectID"
                            :to="{ name: item.url, hash: item.hash ? '#' + item.hash : '' }">
                            <div v-if="item.title.length > 0" class="title">
                                <template v-for="(part, index) in item.title">
                                    <strong v-if="part.highlight" :key="index">{{ part.text }}</strong>
                                    <span v-else :key="index">{{ part.text }}</span>
                                </template>
                            </div>
                            <div v-if="item.subtitle.length > 0" class="subtitle">
                                <template v-for="(part, index) in item.subtitle">
                                    <strong v-if="part.highlight" :key="index">{{ part.text }}</strong>
                                    <span v-else :key="index">{{ part.text }}</span>
                                </template>
                            </div>
                            <div v-if="item.description.length > 0" class="description">
                                <template v-for="(part, index) in item.description">
                                    <strong v-if="part.highlight" :key="index">{{ part.text }}</strong>
                                    <span v-else :key="index">{{ part.text }}</span>
                                </template>
                            </div>
                        </i-dropdown-item>
                    </div>
                </div>
                <div v-show="hasResults()" class="footer">
                    Found {{ searchResultsCount }} search result{{ searchResultsCount > 1 ? 's' : '' }}
                </div>
            </i-dropdown-menu>
        </i-dropdown>
    </div>
</template>

<script>
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

const searchOptions = {
    shouldSort: true,
    includeMatches: true,
    includeScore: true,
    threshold: 0.25,
    location: 0,
    distance: 75,
    tokenize: true,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
        { name: 'title', weight: 0.4 },
        { name: 'subtitle', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'category', weight: 0.1 }
    ]
};

export default {
    name: 'SiteSearch',
    data () {
        return {
            searchString: '',
            searchKeymap: { show: ['enter'], hide: ['enter'] },
            searchList: [],
            searchResults: [],
            searchClients: []
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
    mounted() {
        axios.get('/search.json')
            .then((response) => {
                const searchList = response.data.entries;
                const searchResults = [];
                const searchClients = [];

                searchList.forEach((category) => {
                    searchClients.push(new Fuse(category.items, searchOptions));
                    searchResults.push({
                        title: category.title,
                        items: []
                    });
                });

                this.searchList = searchList;
                this.searchResults = searchResults;
                this.searchClients = searchClients;
            });
    },
    methods: {
        hasResults() {
            return this.searchResults.some((category) => category.items.length > 0);
        }
    }
};
</script>

<style lang="scss">
@import '~@inkline/inkline/src/css/config/index';
@import '~@inkline/inkline/src/css/mixins/index';

.site-search {
    margin: 0 $spacer;

    .menu {
        width: 520px;
        padding: 0 !important;

        > .body {
            max-height: 250px;
            overflow-y: auto;
        }

        > .footer {
            display: flex;
            justify-content: flex-end;
            padding: ($spacer / 2) $spacer;
            border-top: 1px solid colors('gray-30');
            font-size: font-size('sm');
            color: colors('gray-60');
        }

        .category {
            position: sticky;
            font-weight: bold;
            font-size: font-size('sm');
            padding: ($spacer / 2) $spacer;
            border-top: 1px solid colors('gray-30');
            border-bottom: 1px solid colors('gray-30');

            &:first-child {
                border-top: 0;
            }
        }

        .item {
            .title {
                font-weight: bold;
                display: inline-block;
            }

            .subtitle {
                display: inline-block;
            }

            .description {
                display: block;
                font-size: font-size('sm');
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .title,
            .subtitle,
            .description {
                strong {
                    font-weight: 600;
                    background: rgba(colors('primary'), 0.15);
                }
            }
        }
    }

    @include breakpoint-down(sm) {
        margin: $spacer 0 0;

        .menu {
            width: 14rem;

            .body {
                max-width: 100%;
            }
        }
    }
}
</style>
