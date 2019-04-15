const path = require('path');
const fs = require('fs');
const readFile = require('fs-readfile-promise');
const dirTree = require('directory-tree');
const markdown = new (require('markdown-it'))();
const markdownConfig = require('../markdown.config');
const JSDOM = require('jsdom').JSDOM;

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
 * @param category
 */
async function parsePageContent(html, url, category) {
    const { document } = new JSDOM(html, { runScripts: "dangerously" }).window;
    const title = document.querySelector("h1").textContent;
    let section;
    let order = 0;

    document.querySelectorAll("h1, h3, p").forEach((element) => {
        if (element.tagName === 'P') {
            if (element.textContent[0] === '<') {
                return;
            }

            category.items[category.items.length - 1].description += element.textContent + '\n';
        } else {
            section = {
                title,
                description: '',
                order,
                url
            };

            if (element.tagName === 'H3') {
                section.subtitle = element.textContent;
                section.hash = element.id;
            }

            category.items.push(Object.assign({ objectID: slugify(`${section.title} ${order} ${section.subtitle || ''}`) }, section));
            order += 1;
        }
    });
}

/**
 * Loop through dir children and add them to the search index
 *
 * @param dir
 * @param category
 */
function descendDirTree(dir, category) {
    dir.children.forEach((docsPage) => {
        const url = docsPage.path.replace(docsRoot, 'docs').replace(/\//g, '-').replace(/\.md$/, '');

        if (docsPage.children) {
            return descendDirTree(docsPage, category);
        }

        promises.push(readFile(docsPage.path, 'utf8').then((response) => {
            return parsePageContent(markdown.render(response.toString()), url, category);
        }));
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
(dirTree(docsRoot, { extensions: /\.md/ }) || { children: [] }).children.forEach((docsCategory) => {
    const category = docsCategory.path.replace(docsRoot + '/', '');
    const entry = {
        title: category.charAt(0).toUpperCase() + category.slice(1),
        items: []
    };

    data.push(entry);

    descendDirTree(docsCategory, entry);
});

return Promise.all(promises).then(() => {
    fs.writeFile(path.join(__dirname, '..', 'static', 'search.json'), JSON.stringify({ entries: data }), (err) => {
        if (err) { console.log(err); }

        console.log("Search indices have been successfully generated!")
    });
});

