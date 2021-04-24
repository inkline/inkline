const fs = require('fs');
const path = require('path');
const glob = require('glob');

const package = require(path.resolve(__dirname, '..', 'package.json'));

const icons = [
    {
        name: 'fontawesome',
        path: '@fortawesome/fontawesome-free/svgs',
        variants: ['brands', 'regular', 'solid']
        
    }
]
