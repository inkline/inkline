export const manifest = {
    "name": "IIcon",
    "props": [
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "",
            "description": "The icon to be displayed"
        },
        {
            "name": "name",
            "type": [
                "String"
            ],
            "default": "",
            "description": ""
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the icon"
        }
    ],
    "events": [],
    "slots": [],
    "css": {
        "selector": "",
        "variables": [
            {
                "name": "--icon--size",
                "value": [
                    {
                        "name": "--icon--sm--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--icon--md--size",
                        "value": [],
                        "variants": []
                    },
                    {
                        "name": "--icon--lg--size",
                        "value": [],
                        "variants": []
                    }
                ],
                "variants": [
                    {
                        "name": "--icon--sm--size",
                        "value": [
                            {
                                "name": "--font-size"
                            },
                            {
                                "name": "--size-multiplier-sm"
                            }
                        ]
                    },
                    {
                        "name": "--icon--md--size",
                        "value": [
                            {
                                "name": "--font-size"
                            },
                            {
                                "name": "--size-multiplier-md"
                            }
                        ]
                    },
                    {
                        "name": "--icon--lg--size",
                        "value": [
                            {
                                "name": "--font-size"
                            },
                            {
                                "name": "--size-multiplier-lg"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

export default manifest;
