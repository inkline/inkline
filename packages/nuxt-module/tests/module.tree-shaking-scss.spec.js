import { nuxtGenerate, nuxtModuleCallback } from "./jest/helpers/nuxtGenerate";

describe('Nuxt.js Module', () => {
    it('should build module with tree shaking and scss enabled', nuxtGenerate('nuxt.config.module.tree-shaking-scss.js', nuxtModuleCallback));
});
