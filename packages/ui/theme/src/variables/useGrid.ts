import { ref, subtract, variable } from '@inkline/core';
import { defaultSizeMultiplierKeys, useSizeMultiplierVariantsFactory } from './useSizeMultiplier';
import { useBreakpoints } from './useBreakpoints';
import { defaultDefinitionOptions } from '@inkline/core';

export function useGrid(options = defaultDefinitionOptions) {
    const { breakpointSm, breakpointMd, breakpointLg, breakpointXl } =
        useBreakpoints();

    const columns = variable('columns', 12, options);

    const gutter = variable('gutter', '28px', options);
    const { gutterXs, gutterSm, gutterMd, gutterLg, gutterXl } =
        useSizeMultiplierVariantsFactory<'gutter'>(gutter, {
            keys: defaultSizeMultiplierKeys,
            ...options
        });

    const container = variable('container', '100%', options);
    const containerXs = variable('container-xs', '100%', options);
    const containerSm = variable(
        'container-sm',
        subtract(ref(breakpointSm), ref(gutterSm)),
        options
    );
    const containerMd = variable(
        'container-md',
        subtract(ref(breakpointMd), ref(gutterMd)),
        options
    );
    const containerLg = variable(
        'container-lg',
        subtract(ref(breakpointLg), ref(gutterLg)),
        options
    );
    const containerXl = variable(
        'container-xl',
        subtract(ref(breakpointXl), ref(gutterXl)),
        options
    );
    // const containerXxl = variable(
    //     'container-xxl',
    //     subtract(ref(breakpointXxl), ref(gutterXxl)),
    //     options
    // );

    return {
        columns,
        gutter,
        gutterXs,
        gutterSm,
        gutterMd,
        gutterLg,
        gutterXl,
        // gutterXxl,
        container,
        containerXs,
        containerSm,
        containerMd,
        containerLg,
        containerXl
        // containerXxl
    };
}
