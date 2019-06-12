export function head(meta) {
    const titlePostamble = ' - Inkline';
    const descriptionPostamble = ' Inkline is a modern UI/UX framework for Vue.js.';

    const title = meta.title + (meta.preserve && meta.preserve.title ? '' : titlePostamble);
    const description = meta.description + (meta.preserve && meta.preserve.description ? '' : descriptionPostamble);

    return function () {
        return {
            title,
            link: [
                { rel: 'canonical', href: 'https://inkline.io' + this.$route.fullPath.replace(/\/$/, '') },
            ],
            meta: [
                { hid: 'description', name: 'description', content: description },
                { hid: 'description', name: 'description', content: description },
                { hid: `og:title`, property: 'og:title', content: title },
                { hid: `og:description`, property: 'og:description', content: description },
                { hid: `og:url`, property: 'og:url', content: 'https://inkline.io' + this.$route.fullPath },
            ]
        }
    };
}
