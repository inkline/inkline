import { nuxtGenerate, nuxtModuleCallback } from "./jest/helpers/nuxtGenerate";

describe('Nuxt.js Module', () => {
    it('should build module with plugin options', nuxtGenerate('nuxt.config.module.options.js', nuxtModuleCallback));
});
