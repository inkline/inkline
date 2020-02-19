import { nuxtGenerate } from "./jest/helpers/nuxtGenerate";

describe('Nuxt.js Plugin', () => {
    it('should build plugin with components specified', nuxtGenerate('nuxt.config.plugin.components.js'));
});
