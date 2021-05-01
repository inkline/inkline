import { resolve } from 'path';
import { writeFileSync } from 'fs';

const packageJSON = require(resolve(__dirname, '..', 'package.json'));

delete packageJSON.dependencies.vue;
packageJSON.dependencies['inkline'] = packageJSON.version;


const outputPath = resolve(__dirname, '..', 'src', 'version.ts');
const outputContent = `export const versions = ${JSON.stringify(packageJSON.dependencies, null, 4)
    .replace(/"([^(")"-:]+)":/g,"$1:")}
`;

writeFileSync(outputPath, outputContent);
