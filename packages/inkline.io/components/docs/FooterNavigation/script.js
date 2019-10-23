import pages from '@/pages.config';

export default {
    name: 'FooterNavigation',
    computed: {
        previous() {
            const currentIndex = pages.allIds.indexOf(this.$nuxt.$route.name);
            const previousPageId = pages.allIds[currentIndex - 1];

            return pages.byId[previousPageId];
        },
        next() {
            const currentIndex = pages.allIds.indexOf(this.$nuxt.$route.name);
            const nextPageId = pages.allIds[currentIndex + 1];

            return pages.byId[nextPageId];
        },
        githubUrl() {
            return 'https://github.com/inkline/inkline.io/tree/master/pages' + this.$nuxt.$route.path + '.md';
        }
    }
};
