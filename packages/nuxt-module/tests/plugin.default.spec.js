import { nuxtGenerate } from "./jest/helpers/nuxtGenerate";

describe('Nuxt.js Plugin', () => {
    it('should build plugin with default import', nuxtGenerate('nuxt.config.plugin.default.js'));
});
