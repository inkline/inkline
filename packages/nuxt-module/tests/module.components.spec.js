import { nuxtGenerate, nuxtModuleCallback } from "./jest/helpers/nuxtGenerate";

describe('Nuxt.js Module', () => {
    it('should build module with components specified', nuxtGenerate('nuxt.config.module.components.js', nuxtModuleCallback));
});
