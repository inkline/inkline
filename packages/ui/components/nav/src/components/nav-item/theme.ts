import { defaultDefinitionOptions, DefinitionOptions, selector, ref, vref } from '@inkline/core';
import { useNavThemeVariables } from '../nav/theme';

export function useNavItemThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const {
        navColor,
        navFontSize,
        navTransitionProperty,
        navTransitionDuration,
        navTransitionTimingFunction,
        navPadding,
        navItemDisabledColor,
        navItemActiveFontWeight,
        navItemActiveColor
    } = useNavThemeVariables(options);

    selector(
        '.nav-item',
        {
            color: ref(navColor),
            fontSize: ref(navFontSize),
            transitionProperty: ref(navTransitionProperty),
            transitionDuration: ref(navTransitionDuration),
            transitionTimingFunction: ref(navTransitionTimingFunction),
            padding: vref(navPadding),
            display: 'block',
            marginBottom: 0
        },
        options
    );

    selector(
        '.nav-item.-disabled',
        {
            color: ref(navItemDisabledColor),
            pointerEvents: 'none',
            cursor: 'default'
        },
        options
    );

    selector(
        '.nav-item.-active',
        {
            color: ref(navItemActiveColor),
            fontWeight: ref(navItemActiveFontWeight)
        },
        options
    );

    selector(
        ['.nav-item:hover', '.nav-item:focus'],
        {
            textDecoration: 'none',
            outline: 0
        },
        options
    );

    selector(
        ['.nav-item[to]', '.nav-item[href]'],
        {
            cursor: 'pointer'
        },
        options
    );
}

export function useNavItemTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useNavItemThemeSelectors(options);
}
