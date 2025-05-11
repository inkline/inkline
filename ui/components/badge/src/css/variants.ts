import { ThemeOptions } from '@inkline/types';

export const theme: ThemeOptions = {
    tailwindcss: false,
    variants: {
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
        }
    }
};