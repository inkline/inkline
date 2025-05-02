import { ThemeOptions } from '@inkline/types';

export const theme: ThemeOptions = {
    tailwindcss: false,
    variants: {
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
        },
        "badge--xs": {
            "extends": "box--wide--3xs",
            "fontSize": "2xs"
        },
        "badge--sm": {
            "extends": "box--wide--2xs",
            "fontSize": "xs"
        },
        "badge--md": {
            "extends": "box--wide--xs",
            "fontSize": "sm"
        },
        "badge--lg": {
            "extends": "box--wide--sm",
            "fontSize": "md"
        },
        "badge--xl": {
            "extends": "box--wide--md",
            "fontSize": "lg"
        },
        "badge--light": {
            "extends": "light"
        },
        "badge--dark": {
            "extends": "dark"
        },
        "badge--primary": {
            "extends": "primary"
        },
        "badge--secondary": {
            "extends": "secondary"
        },
        "badge--success": {
            "extends": "success"
        },
        "badge--danger": {
            "extends": "danger"
        },
        "badge--warning": {
            "extends": "warning"
        },
        "badge--info": {
            "extends": "info"
        },
        "badge--inherit": {
            "fontSize": "inherit"
        },
        "badge--pill": {
            "borderRadius": "full"
        },
        "badge": {
            "extends": [
                "default",
                "badge--md"
            ],
            "fontWeight": "semibold"
        },
        "breadcrumb--xs": {
            "fontSize": "xs"
        },
        "breadcrumb--sm": {
            "fontSize": "sm"
        },
        "breadcrumb--md": {
            "fontSize": "md"
        },
        "breadcrumb--lg": {
            "fontSize": "lg"
        },
        "breadcrumb--xl": {
            "fontSize": "xl"
        },
        "breadcrumb--light": {
            "color": "{{light.color}}"
        },
        "breadcrumb--dark": {
            "color": "{{dark.color}}"
        },
        "breadcrumb": {
            "color": "{{default.color}}"
        },
        "breadcrumb-item--disabled": {
            "color": "weaker"
        },
        "breadcrumb-item--active": {
            "color": "weakest"
        },
        "button--sm": {
            "extends": "box--wide--sm",
            "fontSize": "sm"
        },
        "button--sm--square": {
            "square": "sm",
            "padding": "0"
        },
        "button--sm--circle": {
            "extends": "button--sm--square",
            "borderRadius": "full"
        },
        "button--md": {
            "extends": "box--wide--md",
            "fontSize": "md"
        },
        "button--md--square": {
            "square": "md",
            "padding": "0"
        },
        "button--md--circle": {
            "extends": "button--md--square",
            "borderRadius": "full"
        },
        "button--lg": {
            "extends": "box--wide--lg",
            "fontSize": "lg"
        },
        "button--lg--square": {
            "square": "lg",
            "padding": "0"
        },
        "button--lg--circle": {
            "extends": "button--lg--square",
            "borderRadius": "full"
        },
        "button--light": {
            "extends": "light--interactive"
        },
        "hover:button--light": {
            "extends": "hover:light--interactive"
        },
        "active:button--light": {
            "extends": "active:light--interactive"
        },
        "focus:button--light": {
            "extends": "focus:light--interactive"
        },
        "button--dark": {
            "extends": "dark--interactive"
        },
        "hover:button--dark": {
            "extends": "hover:dark--interactive"
        },
        "active:button--dark": {
            "extends": "active:dark--interactive"
        },
        "focus:button--dark": {
            "extends": "focus:dark--interactive"
        },
        "button--primary": {
            "extends": "primary--interactive"
        },
        "hover:button--primary": {
            "extends": "hover:primary--interactive"
        },
        "active:button--primary": {
            "extends": "active:primary--interactive"
        },
        "focus:button--primary": {
            "extends": "focus:primary--interactive"
        },
        "button--secondary": {
            "extends": "secondary--interactive"
        },
        "hover:button--secondary": {
            "extends": "hover:secondary--interactive"
        },
        "active:button--secondary": {
            "extends": "active:secondary--interactive"
        },
        "focus:button--secondary": {
            "extends": "focus:secondary--interactive"
        },
        "button--success": {
            "extends": "success--interactive"
        },
        "hover:button--success": {
            "extends": "hover:success--interactive"
        },
        "active:button--success": {
            "extends": "active:success--interactive"
        },
        "focus:button--success": {
            "extends": "focus:success--interactive"
        },
        "button--danger": {
            "extends": "danger--interactive"
        },
        "hover:button--danger": {
            "extends": "hover:danger--interactive"
        },
        "active:button--danger": {
            "extends": "active:danger--interactive"
        },
        "focus:button--danger": {
            "extends": "focus:danger--interactive"
        },
        "button--warning": {
            "extends": "warning--interactive"
        },
        "hover:button--warning": {
            "extends": "hover:warning--interactive"
        },
        "active:button--warning": {
            "extends": "active:warning--interactive"
        },
        "focus:button--warning": {
            "extends": "focus:warning--interactive"
        },
        "button--info": {
            "extends": "info--interactive"
        },
        "hover:button--info": {
            "extends": "hover:info--interactive"
        },
        "active:button--info": {
            "extends": "active:info--interactive"
        },
        "focus:button--info": {
            "extends": "focus:info--interactive"
        },
        "button": {
            "extends": [
                "default--interactive",
                "button--md"
            ],
            "gap": "md"
        },
        "hover:button": {
            "extends": [
                "hover:default--interactive"
            ]
        },
        "active:button": {
            "extends": [
                "active:default--interactive"
            ]
        },
        "focus:button": {
            "extends": [
                "focus:default--interactive"
            ]
        },
        "button--block": {
            "width": "100"
        },
        "button--square": {
            "extends": "button--md--square"
        },
        "button--circle": {
            "extends": "button--md--circle"
        },
        "button--disabled": {
            "opacity": "75"
        },
        "button-group": {
            "extends": [
                "default",
                "box"
            ],
            "border": "0",
            "padding": "0"
        },
        "button-group--block": {
            "width": "100"
        },
        "button-group--block--child": {
            "flexBasis": "100"
        }
    }
};