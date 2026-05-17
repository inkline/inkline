import { defaultDefinitionOptions, DefinitionOptions, variable, ref } from '@inkline/core';

export function useLineHeightVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const lineHeightTight = variable('line-height--tight', 1.2, options);
    const lineHeightSnug = variable('line-height--snug', 1.35, options);
    const lineHeightNormal = variable('line-height--normal', 1.5, options);
    const lineHeightRelaxed = variable('line-height--relaxed', 1.65, options);
    const lineHeightLoose = variable('line-height--loose', 1.9, options);

    const lineHeight = variable('line-height', ref(lineHeightNormal), options);

    return {
        lineHeightTight,
        lineHeightSnug,
        lineHeightNormal,
        lineHeightRelaxed,
        lineHeightLoose,
        lineHeight
    };
}

export function useLineHeight(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useLineHeightVariables(options);
}
