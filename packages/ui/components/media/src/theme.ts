import {
    ref,
    selector,
    nsvariables,
    DefinitionOptions,
    defaultDefinitionOptions,
    vref
} from '@inkline/core';
import { useSpacing } from '@inkline/theme';

const ns = 'media';

/**
 * Config
 */

export function useMediaThemeConfig(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { spacing } = useSpacing(options);

    return {
        image: {
            margin: {
                top: ref(spacing),
                right: ref(spacing),
                bottom: ref(spacing),
                left: ref(spacing)
            }
        }
    };
}

/**
 * Variables
 */

export function useMediaThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return nsvariables(ns, useMediaThemeConfig(options), {
        ...options,
        registerComposed: false
    });
}

/**
 * Selectors
 */

export function useMediaThemeLayoutSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    selector(
        '.media',
        {
            position: 'relative',
            display: 'flex',
            flexDirection: 'row'
        },
        options
    );

    selector(
        '.media > .media-body',
        {
            flex: '0 1 auto'
        },
        options
    );

    selector(
        '.media > img, .media > .img, .media > .image',
        {
            alignSelf: 'flex-start',
            height: 'auto',
            flex: '0 0 auto'
        },
        options
    );
}

export function useMediaThemeBaseSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { mediaImageMargin } = useMediaThemeVariables(options);

    selector(
        '.media > img, .media > .img, .media > .image',
        {
            margin: vref(mediaImageMargin)
        },
        options
    );
}

export function useMediaTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useMediaThemeLayoutSelectors(options);
    useMediaThemeBaseSelectors(options);
}
