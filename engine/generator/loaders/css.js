import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

export function load(url, context, defaultLoad) {
    if (url.endsWith('.css')) {
        const filePath = fileURLToPath(url);
        const source = readFileSync(filePath, 'utf-8');

        return {
            format: 'module',
            shortCircuit: true,
            source: `export default ${JSON.stringify(source)}`
        };
    }

    return defaultLoad(url, context, defaultLoad);
}
