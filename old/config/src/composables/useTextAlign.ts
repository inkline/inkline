import { defaultDefinitionOptions } from '../constants';
import { variable } from '../tokens';

export function useTextAlign(options = defaultDefinitionOptions) {
    const textAlign = variable('text-align', 'left', options);
    const textAlignLeft = variable('text-align-left', 'left', options);
    const textAlignCenter = variable('text-align-center', 'center', options);
    const textAlignRight = variable('text-align-right', 'right', options);
    const textAlignJustify = variable('text-align-justify', 'justify', options);

    return {
        textAlign,
        textAlignLeft,
        textAlignCenter,
        textAlignRight,
        textAlignJustify
    };
}
