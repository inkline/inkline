import { ref, variable } from '../tokens';
import { defaultDefinitionOptions } from '../constants';

export function useBorder(options = defaultDefinitionOptions) {
    const borderTopWidth = variable('border-top-width', '1px', options);
    const borderRightWidth = variable('border-right-width', '1px', options);
    const borderBottomWidth = variable('border-bottom-width', '1px', options);
    const borderLeftWidth = variable('border-left-width', '1px', options);
    const borderWidth = variable(
        'border-width',
        [ref(borderTopWidth), ref(borderRightWidth), ref(borderBottomWidth), ref(borderLeftWidth)],
        options
    );

    const borderTopStyle = variable('border-top-style', 'solid', options);
    const borderRightStyle = variable('border-right-style', 'solid', options);
    const borderBottomStyle = variable('border-bottom-style', 'solid', options);
    const borderLeftStyle = variable('border-left-style', 'solid', options);
    const borderStyle = variable(
        'border-style',
        [ref(borderTopStyle), ref(borderRightStyle), ref(borderBottomStyle), ref(borderLeftStyle)],
        options
    );

    const borderTopColor = variable('border-top-color', 'var(--color-gray-200)', options);
    const borderRightColor = variable('border-right-color', 'var(--color-gray-200)', options);
    const borderBottomColor = variable('border-bottom-color', 'var(--color-gray-200)', options);
    const borderLeftColor = variable('border-left-color', 'var(--color-gray-200)', options);
    const borderColor = variable(
        'border-color',
        [ref(borderTopColor), ref(borderRightColor), ref(borderBottomColor), ref(borderLeftColor)],
        options
    );

    const borderTop = variable(
        'border-top',
        [ref(borderTopWidth), ref(borderTopStyle), ref(borderTopColor)],
        options
    );
    const borderRight = variable(
        'border-right',
        [ref(borderRightWidth), ref(borderRightStyle), ref(borderRightColor)],
        options
    );
    const borderBottom = variable(
        'border-bottom',
        [ref(borderBottomWidth), ref(borderBottomStyle), ref(borderBottomColor)],
        options
    );
    const borderLeft = variable(
        'border-left',
        [ref(borderLeftWidth), ref(borderLeftStyle), ref(borderLeftColor)],
        options
    );

    const border = variable(
        'border',
        [ref(borderWidth), ref(borderStyle), ref(borderColor)],
        options
    );

    return {
        borderTopWidth,
        borderRightWidth,
        borderBottomWidth,
        borderLeftWidth,
        borderWidth,
        borderTopStyle,
        borderRightStyle,
        borderBottomStyle,
        borderLeftStyle,
        borderStyle,
        borderTopColor,
        borderRightColor,
        borderBottomColor,
        borderLeftColor,
        borderColor,
        borderTop,
        borderRight,
        borderBottom,
        borderLeft,
        border
    };
}
