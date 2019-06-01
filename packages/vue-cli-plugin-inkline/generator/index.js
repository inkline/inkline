module.exports = (api, options, rootOptions) => {
	api.extendPackage({
		dependencies: {
			'@inkline/inkline': '^1.14'
		}
	});

	// Add imports
	api.injectImports(api.entryFile, options.stylus ?
		`import '@inkline/inkline/dist/inkline.css'` :
		`import '@inkline/inkline/src/index.styl'`);
	api.injectImports(api.entryFile, `import Inkline from '@inkline/inkline'`);

	api.onCreateComplete(() => {
		const fs   = require('fs');
		const isTs = api.hasPlugin('typescript') ? 'ts' : 'js';

		// Read and get content
		let content = fs.readFileSync(api.entryFile, { encoding: 'utf-8' });
		const lines = content.split(/\r?\n/g).reverse();

		// Inject imports
		const lastImportIndex = lines.findIndex(line => line.match(/^import/));
		lines[lastImportIndex] += `\n\nVue.use(Inkline);`;

		// Write back
		content = lines.reverse().join(`\n`);
		fs.writeFileSync(api.entryFile, content, { encoding: 'utf-8' });
	})
};
