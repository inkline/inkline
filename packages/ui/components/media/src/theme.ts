import { ref, selector, nsvariables, defaultDefinitionOptions } from '@inkline/core';
import { useSpacing } from '@inkline/theme';

const ns = 'media';

export function useMediaThemeVariables(options = defaultDefinitionOptions) {
    const { spacing } = useSpacing();

    return {
        ...nsvariables(
            [ns, 'image'] as const,
            {
                margin: {
                    top: ref(spacing),
                    right: ref(spacing),
                    bottom: ref(spacing),
                    left: ref(spacing)
                }
            },
            options
        )
    };
}

export function useMediaThemeLayout() {
    selector('.media', {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row'
    });

    selector('.media > .media-body', {
        flex: '0 1 auto'
    });

    selector('.media > img, .media > .img, .media > .image', {
        alignSelf: 'flex-start',
        height: 'auto',
        flex: '0 0 auto'
    });
}

export function useMediaThemeBase() {
    const {
        mediaImageMarginTop,
        mediaImageMarginRight,
        mediaImageMarginBottom,
        mediaImageMarginLeft
    } = useMediaThemeVariables();

    selector('.media > img, .media > .img, .media > .image', {
        margin: [
            ref(mediaImageMarginTop),
            ref(mediaImageMarginRight),
            ref(mediaImageMarginBottom),
            ref(mediaImageMarginLeft)
        ]
    });
}

export function useMediaTheme() {
    useMediaThemeLayout();
    useMediaThemeBase();
}
