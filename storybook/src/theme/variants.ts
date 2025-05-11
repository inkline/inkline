import { ThemeOptions } from '@inkline/types';

export const theme: ThemeOptions = {
    tailwindcss: false,
    variants: {
        "default": {
            "extends": [
                "box"
            ]
        },
        "box--base": {
            "borderWidth": "default",
            "borderStyle": "default"
        },
        "box--base--md": {
            "extends": "box--base",
            "borderRadius": "md",
            "boxShadow": "md"
        },
        "box--md": {
            "extends": "box--base--md",
            "padding": "md"
        },
        "box": {
            "extends": "box--md"
        },
        "alert--xs": {
            "extends": [
                "box--xs"
            ]
        },
        "alert--sm": {
            "extends": [
                "box--sm"
            ]
        },
        "alert--md": {
            "extends": [
                "box--md"
            ]
        },
        "alert--lg": {
            "extends": [
                "box--lg"
            ]
        },
        "alert--xl": {
            "extends": [
                "box--xl"
            ]
        },
        "alert--info": {
            "extends": [
                "info--tint"
            ]
        },
        "alert--success": {
            "extends": [
                "success--tint"
            ]
        },
        "alert--warning": {
            "extends": [
                "warning--tint"
            ]
        },
        "alert--danger": {
            "extends": [
                "danger--tint"
            ]
        },
        "alert": {
            "extends": [
                "alert--md",
                "alert--info"
            ],
            "gap": "default"
        }
    }
};