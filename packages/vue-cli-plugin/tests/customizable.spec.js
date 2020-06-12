import generator from '../generator';
import { vueCLIBuild } from "./jest/helpers/vueCLIBuild";

describe('Vue CLI Module', () => {
    it('should build plugin with tree shaking and scss config enabled',
        vueCLIBuild('tree-shaking-scss', generator, {
            customizable: true,
        })
    );

    it('should build typescript plugin with tree shaking and scss config enabled',
        vueCLIBuild('tree-shaking-scss', generator, {
            customizable: true,
            typescript: true
        })
    );
});
