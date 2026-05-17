import { useUtilities } from '../utilities';
import { defaultDefinitionOptions, DefinitionOptions } from '@inkline/core';

export function useThemeUtilities(userOptions: DefinitionOptions, prefix?: string) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useUtilities(options, prefix);
}
