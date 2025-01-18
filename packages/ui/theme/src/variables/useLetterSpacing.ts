import { defaultDefinitionOptions, DefinitionOptions } from '@inkline/core';
import { variable } from '@inkline/core';

export function useLetterSpacing(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const letterSpacing = variable('letter-spacing', 'normal', options);

    const letterSpacingNone = variable('letter-spacing-none', '0', options);
    const letterSpacingTight = variable('letter-spacing-tight', '-0.05em', options);
    const letterSpacingNormal = variable('letter-spacing-normal', '0.05em', options);
    const letterSpacingWide = variable('letter-spacing-wide', '0.1em', options);

    return {
        letterSpacing,
        letterSpacingNone,
        letterSpacingTight,
        letterSpacingNormal,
        letterSpacingWide
    };
}
