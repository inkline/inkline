const path = require('path');

module.exports = {
    wrapper: '<article>',
    langPrefix: 'line-numbers language-',
    html: true,
    plugins: [
        require('markdown-it-attrs'),
        require('markdown-it-emoji'),
        [require('markdown-it-include'), path.join(__dirname, 'pages')],
        require('markdown-it-prism'),
        require('markdown-it-named-headings')
    ]
};
