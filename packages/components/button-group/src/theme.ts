import { defaultDefinitionOptions, nsdefine, ref, selector } from '@inkline/core';
import { useBoxShadow } from '@inkline/theme';

const ns = 'button-group';

export function useButtonGroupThemeVariables(options = defaultDefinitionOptions) {
    const {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor
    } = useBoxShadow();

    return nsdefine(
        ns,
        {
            boxShadow: {
                offsetX: ref(boxShadowOffsetX),
                offsetY: ref(boxShadowOffsetY),
                blurRadius: ref(boxShadowBlurRadius),
                spreadRadius: ref(boxShadowSpreadRadius),
                color: ref(boxShadowColor)
            }
        },
        options
    );
}

export function useButtonGroupThemeLayout() {
    selector('.button-group', {
        position: 'relative',
        display: 'inline-flex',
        verticalAlign: 'middle',
        boxSizing: 'border-box'
    });

    selector(['.button-group .button', '.button-group .button-group'], {
        boxShadow: 'none'
    });

    // Horizontal button group

    selector(
        [
            '.button-group.-horizontal > .button:not(:last-child)',
            '.button-group.-horizontal > .button-group:has(+ .button-group) .button:last-child',
            '.button-group.-horizontal > .button-group:has(+ .button) .button:last-child'
        ],
        {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderRightWidth: 0
        }
    );

    selector(
        [
            '.button-group.-horizontal > .button:not(:first-child)',
            '.button-group.-horizontal > .button-group + .button-group .button:first-child',
            '.button-group.-horizontal > .button + .button-group .button:first-child'
        ],
        {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0
        }
    );

    // Vertical button group

    selector(
        [
            '.button-group.-vertical > .button:not(:last-child)',
            '.button-group.-vertical > .button-group:has(+ .button-group) .button:last-child',
            '.button-group.-vertical > .button-group:has(+ .button) .button:last-child'
        ],
        {
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomWidth: 0
        }
    );

    selector(
        [
            '.button-group.-vertical > .button:not(:first-child)',
            '.button-group.-vertical > .button-group + .button-group .button:first-child',
            '.button-group.-vertical > .button + .button-group .button:first-child'
        ],
        {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }
    );

    // Block button group

    selector('.button-group.-block', {
        display: 'flex',
        flexBasis: '100%'
    });

    selector('.button-group.-block > .button', {
        flexBasis: '100%'
    });

    // Vertical button group

    selector('.button-group.-vertical', {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    });

    selector(
        [
            '.button-group.-vertical .button',
            '.button-group.-vertical .button-group',
            '.button-group.-vertical [class$="-wrapper"]'
        ],
        {
            width: '100%'
        }
    );
}

export function useButtonGroupThemeBase() {
    const { buttonGroupBoxShadow } = useButtonGroupThemeVariables();

    selector('.button-group', {
        boxShadow: ref(buttonGroupBoxShadow)
    });
}

export function useButtonGroupTheme() {
    useButtonGroupThemeVariables();
    useButtonGroupThemeLayout();
    useButtonGroupThemeBase();
}
