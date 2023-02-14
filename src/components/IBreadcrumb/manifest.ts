export const manifest = {
    "name": "IBreadcrumb",
    "props": [
        {
            "name": "ariaLabel",
            "type": [
                "String"
            ],
            "default": "Breadcrumbs",
            "description": "The aria-label of the breadcrumbs"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the breadcrumb"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the breadcrumb"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for default breadcrumb content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
