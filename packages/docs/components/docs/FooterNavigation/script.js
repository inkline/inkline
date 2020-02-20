import pages from '@/pages.config';

const docsPagesIds = pages.allIds.filter((pageId) => pageId.indexOf('docs') === 0);

export default {
    name: 'FooterNavigation',
    data() {
        return {
            previous: {},
            next: {},
            githubUrl: ''
        }
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
