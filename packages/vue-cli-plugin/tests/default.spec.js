import generator from '../generator';
import { vueCLIBuild } from "./jest/helpers/vueCLIBuild";

describe('Vue CLI Module', () => {
    it('should build plugin with default config',
        vueCLIBuild('default', generator, {})
    );

    xit('should build typescript plugin with default config',
        vueCLIBuild('default', generator, {
            typescript: true
        })
    );
});
