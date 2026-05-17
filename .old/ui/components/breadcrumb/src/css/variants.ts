import { ThemeOptions } from '@inkline/types';

export const theme: ThemeOptions = {
    tailwindcss: false,
    variants: {
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
        }
    }
};