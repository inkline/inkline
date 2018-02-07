'use strict';

const merge = require('webpack-merge');
const devEnv = require('./env.development');

module.exports = merge(devEnv, {
    NODE_ENV: '"testing"'
});
