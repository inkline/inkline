export const manifest = {
    "name": "ITab",
    "props": [
        {
            "name": "title",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The title of the tab"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "uid()",
            "description": "The name of the tab, used as an identifier"
        }
    ],
    "events": [],
    "slots": [
        {
            "name": "default",
            "description": "Slot for tab content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
