import generator from '../generator';
import { vueCLIBuild } from "./jest/helpers/vueCLIBuild";

describe('Vue CLI Module', () => {
    it('should build plugin with tree shaking and scss config enabled', vueCLIBuild('main.tree-shaking-scss', generator, {
        treeShaking: true,
        scss: true
    }));

    it('should build typescript plugin with tree shaking and scss config enabled', vueCLIBuild('main.tree-shaking-scss', generator, {
        treeShaking: true,
        scss: true,
        typescript: true
    }));
});
