import generator from '../generator';
import { vueCLIBuild } from "./jest/helpers/vueCLIBuild";

describe('Vue CLI Module', () => {
    it('should build plugin with customizable flag enabled',
        vueCLIBuild('customizable', generator, {
            customizable: true,
        })
    );

    // it('should build typescript plugin with customizable flag enabled',
    //     vueCLIBuild('customizable', generator, {
    //         customizable: true,
    //         typescript: true
    //     })
    // );
});
