import pluginInkline from '@inkline/eslint-config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default pluginInkline(__dirname).configs['default'];
