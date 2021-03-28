const fs = require('fs');

const configContentTranspileDependencies = `    transpileDependencies: [
        '@inkline/inkline'
    ]`;

const configContent = `module.exports = {
${configContentTranspileDependencies}
};`;

/**
 * Add inkline to package.json dependencies
 *
 * @param api
 */
const addDependencies = (api) => {
    api.extendPackage({
        dependencies: {
            '@inkline/inkline': '^2.0.0'
        }
    });
};

/**
 * Add inkline dependencies to package.json dev dependencies
 *
 * @param api
 */
const addDevDependencies = (api) => {
    api.extendPackage({
        devDependencies: {
            'node-sass': '<5.0.0',
            'sass-loader': '<11.0.0'
        }
    });
};

/**
 * Add inkline default imports to the entry file
 *
 * @param api
 */
const addDefaultImports = (api) => {
    api.injectImports(api.entryFile, `import Inkline from '@inkline/inkline';`);
    api.injectImports(api.entryFile, `import '@inkline/inkline/dist/inkline.css';`);
};

/**
 * Add inkline customizable imports to the entry file
 *
 * @param api
 */
const addCustomizableImports = (api) => {
    api.injectImports(api.entryFile, `import { Inkline } from '@inkline/inkline/src';`);
    api.injectImports(api.entryFile, `import * as components from '@inkline/inkline/src/components';`);
    api.injectImports(api.entryFile, `import '@inkline/inkline/src/inkline.scss';`);
};

/**
 * Add inkline to the transpiled dependencies field in vue.config.js.
 *
 * @param api
 */
const addVueConfig = (api) => {
    const configPath = api.resolve('vue.config.js');

    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, configContent, { encoding: 'utf-8' });
    } else {
        let contents = fs.readFileSync(configPath, { encoding: 'utf-8' });

        if (contents.indexOf('transpileDependencies') !== -1) {
            contents = contents
                .replace(/( *)(transpileDependencies:\s*\[)/, `$1$2\n$1$1'@inkline/inkline',\n`);
        } else {
            contents = contents
                .replace(/(module\.exports\s*=\s*{)/, `$1\n${configContentTranspileDependencies},\n`);
        }

        fs.writeFileSync(configPath, contents, { encoding: 'utf-8' });
    }
};

/**
 * Add inkline to Vue after importing
 *
 * @param api
 * @param options
 */
const addIntegration = (api, options) => {
    // Read and get content
    let content = fs.readFileSync(api.resolve(api.entryFile), { encoding: 'utf-8' });
    const lines = content.split(/\r?\n/g).reverse();

    // Inject imports
    let lastImportIndex = lines.findIndex(line => line.match(/^import/));

    if (lastImportIndex === -1) {
        lastImportIndex = 0;
    }

    if (options.customizable) {
        lines[lastImportIndex] += `\n\nVue.use(Inkline, { components });`;
    } else {
        lines[lastImportIndex] += `\n\nVue.use(Inkline);`;
    }

    // Write back
    content = lines.reverse().join(`\n`);
    fs.writeFileSync(api.resolve(api.entryFile), content, { encoding: 'utf-8' });
};

module.exports = (api, options, rootOptions) => {
    addDependencies(api);

	if (options.customizable) {
        addDevDependencies(api);
        addVueConfig(api);
        addCustomizableImports(api);
    } else {
	    addDefaultImports(api);
    }

	api.onCreateComplete(() => {
		addIntegration(api, options)
	})
};
