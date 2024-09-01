import {
    defaultDefinitionOptions,
    namespace,
    nsvariable,
    ref,
    selector,
    usePaddingBase,
    useTextColor
} from '@inkline/config';

const ns = 'caption';

export function useCaptionThemeVariables(options = defaultDefinitionOptions) {
    const { textColorWeaker } = useTextColor();
    const { padding, paddingTop, paddingBottom } = usePaddingBase();

    const captionColor = nsvariable(ns, 'color', ref(textColorWeaker), options);

    const captionPaddingTop = namespace(ns, paddingTop, options);
    const captionPaddingRight = nsvariable(ns, 'padding-right', '0', options);
    const captionPaddingBottom = namespace(ns, paddingBottom, options);
    const captionPaddingLeft = nsvariable(ns, 'padding-left', '0', options);
    const captionPadding = namespace(ns, padding, options);

    return {
        captionColor,
        captionPaddingTop,
        captionPaddingRight,
        captionPaddingBottom,
        captionPaddingLeft,
        captionPadding
    };
}

export function useCaptionThemeBase() {
    const { captionColor, captionPadding } = useCaptionThemeVariables();

    selector('caption', {
        textAlign: 'left',
        padding: ref(captionPadding),
        color: ref(captionColor)
    });
}

export function useCaptionTheme() {
    useCaptionThemeVariables();
    useCaptionThemeBase();
}
