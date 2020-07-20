<template>
    <div class="site-search">
        <i-dropdown ref="dropdown" placement="bottom-start" :disabled="searchString === ''" :keymap="searchKeymap">
            <i-input v-model="searchString" type="search" placeholder="Search">
                <font-awesome-icon slot="prefix" icon="search" />
            </i-input>
            <i-dropdown-menu v-show="searchString !== ''">
                <div class="body">
                    <div v-if="searchResults.length === 0 && searchString !== ''">
                        <i-dropdown-item>
                            No search results found for "{{ searchString }}"
                        </i-dropdown-item>
                    </div>

                    <i-dropdown-item
                        v-for="item in searchResults"
                        :key="item.id"
                        :to="item.path">
                        <div v-if="item.title.length > 0" class="title">
                            <template v-for="(part, index) in item.title">
                                <strong v-if="part.highlight" :key="index">{{ part.text }}</strong>
                                <span v-else :key="index">{{ part.text }}</span>
                            </template>
                        </div>
                        <div v-if="item.heading.length > 0" class="subtitle">
                            <template v-for="(part, index) in item.heading">
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

                <div v-show="searchResults.length > 0" class="footer">
                    Showing {{ searchResultsCount > searchResultsLimit ? searchResultsLimit : searchResultsCount }} out of
                    {{ searchResultsCount }} search result{{ searchResultsCount > 1 ? 's' : '' }}
                </div>
            </i-dropdown-menu>
        </i-dropdown>
    </div>
</template>

<script>
import Fuse from 'fuse.js';

const searchOptions = {
    shouldSort: true,
    includeMatches: true,
    includeScore: true,
    threshold: 0.25,
    ignoreLocation: true,
    tokenize: true,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
        { name: 'title', weight: 1 },
        { name: 'heading', weight: 0.9 },
        { name: 'subheading', weight: 0.8 },
        { name: 'description', weight: 0.7 }
    ]
};

/**
 * Flatten nuxt content root tag to contain text only
 *
 * @param child
 * @returns {string}
 */
const flatten = (child) => {
    let value = '';

    if (child.value) {
        return child.value;
    }

    if (child.children) {
        child.children.forEach((subChild) => {
            value += flatten(subChild);
        });
    }

    return value;
};

/**
 * Highlight the search string in each result
 *
 * @param resultItem
 */
function highlight(resultItem) {
    resultItem.highlight = {};

    ['title', 'heading', 'subheading', 'description'].forEach((key) => {
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
    data () {
        return {
            searchString: '',
            searchKeymap: { show: ['enter'], hide: ['enter'] },
            searchList: [],
            searchResults: [],
            searchResultsLimit: 20,
            searchResultsCount: 0,
            searchClient: []
        };
    },
    watch: {
        searchString(value) {
            const searchResults = this.searchClient.search(value);

            searchResults.forEach((result) => highlight(result));

            this.searchResultsCount = searchResults.length;
            this.searchResults = searchResults.map((result) => ({
                ...result.item,
                ...result.highlight,
                score: result.score
            })).slice(0, this.searchResultsLimit);

            setTimeout(() => this.$refs.dropdown.$emit('init'), 100);
        }
    },
    mounted() {
        this.initialize();
    },
    methods: {
        async initialize() {
            const pages = await this.$content('docs', { deep: true })
                .only(['title', 'description', 'body', 'path'])
                .fetch();

            const entries = pages.reduce((acc, { title, description, body, path }) => {
                acc.push({
                    path,
                    title,
                    description
                });

                body.children
                    .map((child) => ({ tag: child.tag, hash: child.props.id, value: flatten(child) }))
                    .forEach((entry) => {
                        const lastEntry = acc[acc.length - 1];
                        const secondLastEntry = acc[acc.length - 2];

                        if (entry.tag === 'h3') {
                            return acc.push({
                                title,
                                path: `${path}${(entry.hash ? '#' + entry.hash : '')}`,
                                heading: entry.value,
                                description: ''
                            });
                        } else if (entry.tag === 'h4') {
                            return acc.push({
                                title,
                                path: `${path}${(entry.hash ? '#' + entry.hash : '')}`,
                                heading: lastEntry.heading,
                                subheading: entry.value,
                                description: ''
                            });
                        } else if (lastEntry && lastEntry.description === '') {
                            lastEntry.description = entry.value;

                            if (secondLastEntry && secondLastEntry.description === '') {
                                secondLastEntry.description = entry.value;
                            }
                        } else {
                            lastEntry.description += ' ' + entry.value;
                        }
                    });

                return acc;
            }, []);

            entries.forEach((entry, index) => {
                entry.id = index;
            });

            this.searchList = entries;
            this.searchClient = new Fuse(
                this.searchList,
                searchOptions
            );
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
            display: block;
            text-align: right;
            padding: ($spacer / 2) $spacer;
            border-top: 1px solid $border-color-light;
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

.inkline.-dark .site-search {
    .menu {
        > .footer {
            border-top: 1px solid $border-color-dark;
        }
    }
}
</style>
