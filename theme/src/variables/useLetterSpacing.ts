import { defaultDefinitionOptions, DefinitionOptions } from '@inkline/core';
import { variable, ref } from '@inkline/core';

export function useLetterSpacingVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const letterSpacingTighter = variable('letter-spacing-tighter', '-0.05em', options);
    const letterSpacingTight = variable('letter-spacing-tight', '-0.025em', options);
    const letterSpacingNormal = variable('letter-spacing-normal', 'normal', options);
    const letterSpacingWide = variable('letter-spacing-wide', '0.05em', options);
    const letterSpacingWider = variable('letter-spacing-wider', '0.1em', options);

    const letterSpacing = variable('letter-spacing', ref(letterSpacingNormal), options);

    return {
        letterSpacing,
        letterSpacingTighter,
        letterSpacingTight,
        letterSpacingNormal,
        letterSpacingWide,
        letterSpacingWider
    };
}

export function useLetterSpacing(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useLetterSpacingVariables(options);
}
