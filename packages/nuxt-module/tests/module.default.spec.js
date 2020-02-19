import { nuxtGenerate, nuxtModuleCallback } from "./jest/helpers/nuxtGenerate";

describe('Nuxt.js Module', () => {
    it('should build module with default config', nuxtGenerate('nuxt.config.module.default.js', nuxtModuleCallback));
});
