module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      '@inkline/inkline': '^1.14'
		}
	});

	api.onCreateComplete(() => {
		const fs       = require('fs');
		const ext      = api.hasPlugin('typescript') ? 'ts' : 'js';
		const mainPath = api.resolve(`./src/main.${ext}`);

		// Read and get content
		let content = fs.readFileSync(mainPath, { encoding: 'utf-8' });
		const lines = content.split(/\r?\n/g).reverse();

		// Inject imports
		const lastImportIndex = lines.findIndex(line => line.match(/^import/));
		lines[lastImportIndex] += `\nimport '@inkline/inkline/dist/inkline.css';`
		lines[lastImportIndex] += `\nimport Inkline from '@inkline/inkline';`;
		lines[lastImportIndex] += `\n\nVue.use(Inkline);`;

		// Write back
		content = lines.reverse().join(`\n`);
		fs.writeFileSync(mainPath, content, { encoding: 'utf-8' });
	})
}
