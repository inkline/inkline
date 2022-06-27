import { build } from './build';

// (async () => {
//     const config = await loadConfig({});
//     const code = generate(config);
//
//     console.log(code);
//
//     return code;
// })();

(async () => {
    await build();
})();
