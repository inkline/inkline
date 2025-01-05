import { resolve } from 'path';
import { watch } from '@inkline/framework';

const __dirname = new URL('.', import.meta.url).pathname;

export async function build() {}

await (async () => {
    await watch({
        outputDir: resolve(__dirname, '..', 'src', 'css')
    });
})();
