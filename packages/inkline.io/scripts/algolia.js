const path = require('path');
const dirTree = require('directory-tree');
const axios = require('axios');

const docsUrl = 'http://localhost:8080/docs/';
const docsRoot = path.resolve(__dirname, '..', 'pages', 'docs');
const data = [];

dirTree(docsRoot).children.forEach((docsCategory) => {
    docsCategory.children.forEach((docsPage) => {
        const pageUrl = docsPage.path.replace(root, '');

        axios.get(docsUrl + pageUrl)
    });
});
