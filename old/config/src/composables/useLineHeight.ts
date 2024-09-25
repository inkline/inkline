import { variable } from '../tokens';
import { defaultDefinitionOptions } from '../constants';

export function useLineHeight(options = defaultDefinitionOptions) {
    const lineHeight = variable('line-height', 1.5, options);

    return {
        lineHeight
    };
}
