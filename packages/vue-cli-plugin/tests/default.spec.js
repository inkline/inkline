import { vueCLIBuild } from "./jest/helpers/vueCLIBuild";

describe('Vue CLI Module', () => {
    it('should build plugin with default config', vueCLIBuild('src/main.default.js'));
});
