import { defaultDefinitionOptions, DefinitionOptions, ref, variable } from '@inkline/core';
import { useSpacing } from './useSpacing';

export function useGrid(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacingSmLg } = useSpacing(options);

    const columns = variable('columns', 12, options);
    const columnGap = variable('column-gap', ref(spacingSmLg), options);
    const rowGap = variable('row-gap', ref(spacingSmLg), options);

    return {
        columns,
        columnGap,
        rowGap
    };
}
