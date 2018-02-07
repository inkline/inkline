'use strict';

const merge = require('webpack-merge');
const prodEnv = require('./env.production');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"'
});
