module.exports = {
    wrapper: '<article>',
    langPrefix: 'line-numbers language-',
    html: true,
    plugins: [
        // require('markdown-it-attrs'),
        // require('markdown-it-emoji'),
        // [require('markdown-it-include'), path.join(__dirname, 'pages')],
        [require('markdown-it-front-matter'), () => {}],
        require('markdown-it-prism'),
        require('markdown-it-named-headings')
        // require('markdown-it-github-headings')
    ]
};
