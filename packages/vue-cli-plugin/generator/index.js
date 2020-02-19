module.exports = (api, options, rootOptions) => {
	api.extendPackage({
		dependencies: {
			'@inkline/inkline': '^1.14'
		}
	});

	// Add imports
	api.injectImports(api.entryFile, options.scss ?
		`import '@inkline/inkline/src/inkline.scss'` :
		`import '@inkline/inkline/dist/inkline.css'`);

	if (options.treeShaking) {
        api.injectImports(api.entryFile, `import { Inkline } from '@inkline/inkline/src'`);
        api.injectImports(api.entryFile, `import * as components from '@inkline/inkline/src/components'`);
    } else {
	    api.injectImports(api.entryFile, `import Inkline from '@inkline/inkline'`);
    }

	api.onCreateComplete(() => {
		const fs = require('fs');

		// Read and get content
		let content = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });
		const lines = content.split(/\r?\n/g).reverse();

		// Inject imports
		const lastImportIndex = lines.findIndex(line => line.match(/^import/));

		if (options.treeShaking) {
            lines[lastImportIndex] += `\n\nVue.use(Inkline, { components });`;
        } else {
            lines[lastImportIndex] += `\n\nVue.use(Inkline);`;
        }

		// Write back
		content = lines.reverse().join(`\n`);
		fs.writeFileSync(api.entryFile, content, { encoding: 'utf-8' });
	})
};
