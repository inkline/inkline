import { loadConfig } from './load';
import { generate } from './generate';

(async () => {
    const config = await loadConfig({});
    const code = generate(config);

    console.log(code);

    return code;
})();
