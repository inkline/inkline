<template>
    <div class="footer-navigation">
        <ul class="pagination">
            <li class="previous">
                <span v-if="previous">&larr;</span>
                <nuxt-link v-if="previous" :to="{ name: previous.id }">
                    {{ previous.title }}
                </nuxt-link>
            </li>
            <li class="next">
                <nuxt-link v-if="next" :to="{ name: next.id }">
                    {{ next.title }}
                </nuxt-link>
                <span v-if="next">&rarr;</span>
            </li>
        </ul>

        <p class="contribute">
            Caught a mistake or want to contribute to the documentation?
            <a :href="githubUrl" rel="nofollow">Edit this page on GitHub!</a>
        </p>
    </div>
</template>

<script>
import pages from '~/pages.config';

const docsPagesIds = pages.allIds.filter((pageId) => pageId.indexOf('docs') === 0);

export default {
    name: 'FooterNavigation',
    data() {
        return {
            previous: {},
            next: {},
            githubUrl: ''
        };
    },
    methods: {
        update() {
            const currentIndex = docsPagesIds.indexOf(this.$nuxt.$route.name);
            const previousPageId = docsPagesIds[currentIndex - 1];
            const nextPageId = docsPagesIds[currentIndex + 1];

            this.previous = pages.byId[previousPageId];
            this.next = pages.byId[nextPageId];
            this.githubUrl = 'https://github.com/inkline/inkline/tree/master/packages/docs/pages' + this.$nuxt.$route.path + '.md';
        }
    },
    created() {
        this.$nuxt.$on('viewLoaded', this.update);
    }
};
</script>

<style lang="scss" scoped>
@import '~@inkline/inkline/src/css/config/index';

.footer-navigation {
    margin: $spacer 0;

    > .pagination {
        display: flex;
        list-style: none;
        padding: $spacer 0;
        justify-content: space-between;
        border-bottom: 1px solid $border-color;

        li {
            margin: 0;
        }

        .previous {
            span {
                margin-right: 0.25rem;
            }
        }

        .next {
            span {
                margin-left: 0.25rem;
            }
        }
    }

    > .contribute {
        font-size: font-size(sm);
    }
}

.inkline.-dark .footer-navigation {
    > .pagination {
        border-bottom: 1px solid $border-color-dark;
    }
}
</style>
