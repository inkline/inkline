import { ThemeOptions } from '@inkline/types';

export const theme: ThemeOptions = {
    tailwindcss: false,
    variants: {
        "default": {
            "extends": [
                "box"
            ],
            "background": {
                "light": "white",
                "dark": "dark"
            },
            "borderColor": {
                "light": "light-shade-50",
                "dark": "dark-tint-50"
            },
            "color": {
                "light": "black",
                "dark": "white"
            }
        },
        "default--interactive": {
            "extends": "default"
        },
        "active:default--interactive": {
            "background": {
                "light": "gray-100",
                "dark": "dark-tint-100"
            },
            "borderColor": {
                "light": "light-shade-100",
                "dark": "dark-tint-100"
            }
        },
        "focus:default--interactive": {
            "background": {
                "light": "gray-50",
                "dark": "dark-tint-50"
            },
            "borderColor": {
                "light": "light-shade-100",
                "dark": "dark-tint-100"
            }
        },
        "hover:default--interactive": {
            "background": {
                "light": "gray-50",
                "dark": "dark-tint-50"
            },
            "borderColor": {
                "light": "light-shade-100",
                "dark": "dark-tint-100"
            }
        },
        "light": {
            "background": "light",
            "borderColor": "light-shade-50",
            "color": "black"
        },
        "light--interactive": {
            "extends": "light"
        },
        "active:light--interactive": {
            "background": "light-shade-100",
            "borderColor": "light-shade-100"
        },
        "focus:light--interactive": {
            "background": "light-shade-50",
            "borderColor": "light-shade-50"
        },
        "hover:light--interactive": {
            "background": "light-shade-50",
            "borderColor": "light-shade-50"
        },
        "dark": {
            "background": "dark",
            "borderColor": "dark-tint-50",
            "color": "white"
        },
        "dark--interactive": {
            "extends": "dark"
        },
        "active:dark--interactive": {
            "background": "dark-tint-100",
            "borderColor": "dark-tint-100"
        },
        "focus:dark--interactive": {
            "background": "dark-tint-50",
            "borderColor": "dark-tint-50"
        },
        "hover:dark--interactive": {
            "background": "dark-tint-50",
            "borderColor": "dark-tint-50"
        },
        "primary": {
            "background": "primary",
            "borderColor": "primary-shade-50",
            "color": "white"
        },
        "primary--interactive": {
            "extends": "primary"
        },
        "active:primary--interactive": {
            "background": "primary-shade-100",
            "borderColor": "primary-shade-100"
        },
        "focus:primary--interactive": {
            "background": "primary-shade-50",
            "borderColor": "primary-shade-50"
        },
        "hover:primary--interactive": {
            "background": "primary-shade-50",
            "borderColor": "primary-shade-50"
        },
        "primary--tint": {
            "extends": "primary",
            "background": "primary-100",
            "color": "primary-800"
        },
        "secondary": {
            "background": "secondary",
            "borderColor": "secondary-shade-50",
            "color": "white"
        },
        "secondary--interactive": {
            "extends": "secondary"
        },
        "active:secondary--interactive": {
            "background": "secondary-shade-100",
            "borderColor": "secondary-shade-100"
        },
        "focus:secondary--interactive": {
            "background": "secondary-shade-50",
            "borderColor": "secondary-shade-50"
        },
        "hover:secondary--interactive": {
            "background": "secondary-shade-50",
            "borderColor": "secondary-shade-50"
        },
        "secondary--tint": {
            "extends": "secondary",
            "background": "secondary-100",
            "color": "secondary-800"
        },
        "success": {
            "background": "success",
            "borderColor": "success-shade-50",
            "color": "white"
        },
        "success--interactive": {
            "extends": "success"
        },
        "active:success--interactive": {
            "background": "success-shade-100",
            "borderColor": "success-shade-100"
        },
        "focus:success--interactive": {
            "background": "success-shade-50",
            "borderColor": "success-shade-50"
        },
        "hover:success--interactive": {
            "background": "success-shade-50",
            "borderColor": "success-shade-50"
        },
        "success--tint": {
            "extends": "success",
            "background": "success-100",
            "color": "success-800"
        },
        "info": {
            "background": "info",
            "borderColor": "info-shade-50",
            "color": "white"
        },
        "info--interactive": {
            "extends": "info"
        },
        "active:info--interactive": {
            "background": "info-shade-100",
            "borderColor": "info-shade-100"
        },
        "focus:info--interactive": {
            "background": "info-shade-50",
            "borderColor": "info-shade-50"
        },
        "hover:info--interactive": {
            "background": "info-shade-50",
            "borderColor": "info-shade-50"
        },
        "info--tint": {
            "extends": "info",
            "background": "info-100",
            "color": "info-800"
        },
        "warning": {
            "background": "warning",
            "borderColor": "warning-shade-50",
            "color": "white"
        },
        "warning--interactive": {
            "extends": "warning"
        },
        "active:warning--interactive": {
            "background": "warning-shade-100",
            "borderColor": "warning-shade-100"
        },
        "focus:warning--interactive": {
            "background": "warning-shade-50",
            "borderColor": "warning-shade-50"
        },
        "hover:warning--interactive": {
            "background": "warning-shade-50",
            "borderColor": "warning-shade-50"
        },
        "warning--tint": {
            "extends": "warning",
            "background": "warning-100",
            "color": "warning-800"
        },
        "danger": {
            "background": "danger",
            "borderColor": "danger-shade-50",
            "color": "white"
        },
        "danger--interactive": {
            "extends": "danger"
        },
        "active:danger--interactive": {
            "background": "danger-shade-100",
            "borderColor": "danger-shade-100"
        },
        "focus:danger--interactive": {
            "background": "danger-shade-50",
            "borderColor": "danger-shade-50"
        },
        "hover:danger--interactive": {
            "background": "danger-shade-50",
            "borderColor": "danger-shade-50"
        },
        "danger--tint": {
            "extends": "danger",
            "background": "danger-100",
            "color": "danger-800"
        },
        "box--base": {
            "borderWidth": "default",
            "borderStyle": "default"
        },
        "box--base--xs": {
            "extends": "box--base",
            "borderRadius": "xs",
            "boxShadow": "xs"
        },
        "box--base--sm": {
            "extends": "box--base",
            "borderRadius": "sm",
            "boxShadow": "sm"
        },
        "box--base--md": {
            "extends": "box--base",
            "borderRadius": "md",
            "boxShadow": "md"
        },
        "box--base--lg": {
            "extends": "box--base",
            "borderRadius": "lg",
            "boxShadow": "lg"
        },
        "box--base--xl": {
            "extends": "box--base",
            "borderRadius": "xl",
            "boxShadow": "xl"
        },
        "box--3xs": {
            "extends": "box--base--xs",
            "padding": "3xs"
        },
        "box--2xs": {
            "extends": "box--base--xs",
            "padding": "2xs"
        },
        "box--xs": {
            "extends": "box--base--xs",
            "padding": "xs"
        },
        "box--sm": {
            "extends": "box--base--sm",
            "padding": "sm"
        },
        "box--md": {
            "extends": "box--base--md",
            "padding": "md"
        },
        "box--lg": {
            "extends": "box--base--lg",
            "padding": "lg"
        },
        "box--xl": {
            "extends": "box--base--xl",
            "padding": "xl"
        },
        "box--2xl": {
            "extends": "box--base--xl",
            "padding": "2xl"
        },
        "box--3xl": {
            "extends": "box--base--xl",
            "padding": "3xl"
        },
        "box": {
            "extends": "box--md"
        },
        "box--wide--2xs": {
            "extends": "box--base--xs",
            "paddingX": "2xs",
            "paddingY": "3xs"
        },
        "box--wide--xs": {
            "extends": "box--base--xs",
            "paddingX": "xs",
            "paddingY": "2xs"
        },
        "box--wide--sm": {
            "extends": "box--base--sm",
            "paddingX": "sm",
            "paddingY": "xs"
        },
        "box--wide--md": {
            "extends": "box--base--md",
            "paddingX": "md",
            "paddingY": "sm"
        },
        "box--wide--lg": {
            "extends": "box--base--lg",
            "paddingX": "lg",
            "paddingY": "md"
        },
        "box--wide--xl": {
            "extends": "box--base--xl",
            "paddingX": "xl",
            "paddingY": "lg"
        },
        "box--wide--2xl": {
            "extends": "box--base--xl",
            "paddingX": "2xl",
            "paddingY": "xl"
        },
        "box--wide": {
            "extends": "box--wide--md"
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