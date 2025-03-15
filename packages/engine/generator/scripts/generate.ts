import normalizeCSS from 'normalize.css/normalize.css';
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootDir, 'src');
const resourcesDir = path.resolve(srcDir, 'resources');

if (!fs.existsSync(resourcesDir)) {
    fs.mkdirSync(resourcesDir, { recursive: true });
}

const targetPath = path.resolve(resourcesDir, 'normalize.css.ts');
fs.writeFileSync(targetPath, `export default ${JSON.stringify(normalizeCSS)}`);
