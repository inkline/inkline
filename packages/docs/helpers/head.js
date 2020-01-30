import pages from '@/pages.config';

export function head(id, options = {}) {
    const page = pages.byId[id];
    const titlePostamble = ' - Inkline';
    const descriptionPostamble = ' Inkline is a modern UI/UX framework for Vue.js.';

    const title = page.title + (options.preserve && options.preserve.title ? '' : titlePostamble);
    const description = page.description + (options.preserve && options.preserve.description ? '' : descriptionPostamble);

    return function () {
        const routerPath = this.$route.fullPath.replace(/\/$/, '');

        return {
            title,
            link: [
                { rel: 'canonical', href: 'https://inkline.io' + routerPath },
            ],
            meta: [
                { hid: 'description', name: 'description', content: description },
                { hid: 'description', name: 'description', content: description },
                { hid: `og:title`, property: 'og:title', content: title },
                { hid: `og:description`, property: 'og:description', content: description },
                { hid: `og:url`, property: 'og:url', content: 'https://inkline.io' + routerPath },
            ]
        }
    };
}
