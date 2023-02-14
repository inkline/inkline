export const manifest = {
    "name": "ITable",
    "props": [
        {
            "name": "border",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the table with borders"
        },
        {
            "name": "condensed",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the table rows as condensed"
        },
        {
            "name": "striped",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the table rows as alternating stripes"
        },
        {
            "name": "hover",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Set the table rows as hoverable"
        },
        {
            "name": "responsive",
            "type": [
                "Boolean",
                "xs",
                "sm",
                "md",
                "lg",
                "xl",
                "xxl"
            ],
            "default": "false",
            "description": "Set the table to be responsive, enabling horizontal scroll when overflowing the parent container"
        },
        {
            "name": "nowrap",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the table rows without wrapping white-space"
        },
        {
            "name": "color",
            "type": [
                "primary",
                "success",
                "light",
                "dark",
                "info",
                "success",
                "warning",
                "danger"
            ],
            "default": "",
            "description": "The color variant of the table"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for table rows and data "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
