import pages from '~/pages.config';

export function head(options = {}) {
    return function () {
        const id = this.$route.name;
        const page = pages.byId[id];

        const titlePostamble = ' - Inkline';
        const descriptionPostamble = ' Inkline is the customizable Vue.js UI/UX Library.';

        const title = page.title + (options.preserve?.title ? '' : titlePostamble);
        const description = page.description + (options.preserve?.description ? '' : descriptionPostamble);
        const routerPath = this.$route.fullPath.replace(/\/$/, '');

        return {
            title,
            link: [
                { rel: 'canonical', href: 'https://inkline.io' + routerPath }
            ],
            meta: [
                { hid: 'description', name: 'description', content: description },
                { hid: 'og:title', property: 'og:title', content: title },
                { hid: 'og:description', property: 'og:description', content: description },
                { hid: 'og:url', property: 'og:url', content: 'https://inkline.io' + routerPath }
            ]
        };
    };
}
