/**
 * Webpack configuration file
 *
 * This file is used for IDEs to provide module resolution (alias) support
 * because Vite is not currently supported in most of them
 */
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@inkline/inkline': path.resolve(__dirname)
        }
    }
};
