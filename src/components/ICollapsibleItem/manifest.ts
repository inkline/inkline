export const manifest = {
    "name": "ICollapsibleItem",
    "props": [
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The unique identifier of the collapsible item, used for determining if the item is open or not"
        },
        {
            "name": "title",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The title of the collapsible item"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "header",
            "description": "Slot for collapsible item header content "
        },
        {
            "name": "default",
            "description": "Slot for default collapsible item content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
