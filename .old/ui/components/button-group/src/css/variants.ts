import { ThemeOptions } from '@inkline/types';

export const theme: ThemeOptions = {
    tailwindcss: false,
    variants: {
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