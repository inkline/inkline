const path = require('path');
const readFile = require('fs-readfile-promise');
const dirTree = require('directory-tree');
const markdown = new (require('markdown-it'))();
const markdownConfig = require('../markdown.config');
const JSDOM = require('jsdom').JSDOM;

const algoliaSearch = require('algoliasearch');
const algoliaConfig = require('../algolia.config');
const algoliaClient = algoliaSearch(algoliaConfig.ALGOLIA_APPLICATION_ID, algoliaConfig.ALGOLIA_API_KEY);
const algoliaIndex = algoliaClient.initIndex('inkline');

const docsRoot = path.resolve(__dirname, '..', 'pages', 'docs');
const data = [];
const promises = [];

/**
 * Slugify title string
 *
 * @param string
 * @returns {*}
 */
function slugify (string) {
    return string
        .toLowerCase()
        .replace(/\s+/g, '-')               // Replace spaces with -
        .replace(/[^\w-]+/g, '')            // Remove all non-word chars
        .replace(/--+/g, '-')               // Replace multiple - with single -
        .replace(/^-+/, '')                 // Trim - from start of text
        .replace(/-+$/, '');                // Trim - from end of text
}

/**
 * Parse page content using JSDOM. Process the page content into a usable Algolia search format
 *
 * @param html
 * @param url
 */
async function parsePageContent(html, url) {
    const { document } = new JSDOM(html, { runScripts: "dangerously" }).window;
    const title = document.querySelector("h1").textContent;
    let section;
    let order = 0;

    document.querySelectorAll("h1, h3, p").forEach((element) => {
        if (element.tagName === 'P') {
            if (element.textContent[0] === '<') {
                return;
            }

            data[data.length - 1].description += element.textContent + '\n';
        } else {
            section = {
                title,
                description: '',
                order,
                url
            };

            if (element.tagName === 'H3') {
                section.subtitle = element.textContent;
                section.url += '#' + element.id;
            }

            data.push(Object.assign({ objectID: slugify(`${section.title} ${order} ${section.subtitle || ''}`) }, section));
            order += 1;
        }
    });
}

/**
 * Set up markdown configuration to be the same as the one used for the webpack loader
 */
markdownConfig.plugins.forEach((plugin) => {
    if (!!plugin && plugin.constructor === Array) {
        return markdown.use(plugin[0], plugin[1]);
    }

    markdown.use(plugin);
});

/**
 * Recursively descent into the documentation pages and parse the content
 */
(dirTree(docsRoot) || { children: [] }).children.forEach((docsCategory) => {
    docsCategory.children.forEach((docsPage) => {
        promises.push(readFile(docsPage.path + '/template.md', 'utf8').then((response) => {
            return parsePageContent(markdown.render(response.toString()), docsPage.path.replace(docsRoot, 'docs'));
        }));
    });
});

return Promise.all(promises).then(() => {
    algoliaIndex.addObjects(data);
    // console.log(data);
    console.log("Search indices have been successfully added to algolia!")
});

