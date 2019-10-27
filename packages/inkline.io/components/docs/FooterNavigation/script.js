import pages from '@/pages.config';

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
            const currentIndex = pages.allIds.indexOf(this.$nuxt.$route.name);
            const previousPageId = pages.allIds[currentIndex - 1];
            const nextPageId = pages.allIds[currentIndex + 1];

            this.previous = pages.byId[previousPageId];
            this.next = pages.byId[nextPageId];
            this.githubUrl = 'https://github.com/inkline/inkline.io/tree/master/pages' + this.$nuxt.$route.path + '.md';
        }
    },
    created() {
        this.$nuxt.$on('viewLoaded', this.update);
    }
};
