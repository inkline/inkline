export const manifest = {
    "name": "IPagination",
    "props": [
        {
            "name": "ariaLabel",
            "type": [
                "String"
            ],
            "default": "Pagination",
            "description": "The aria-label of the pagination"
        },
        {
            "name": "color",
            "type": [
                "light",
                "dark"
            ],
            "default": "",
            "description": "The color variant of the pagination"
        },
        {
            "name": "itemsPerPage",
            "type": [
                "Number"
            ],
            "default": "20",
            "description": "The number of items per page to be displayed"
        },
        {
            "name": "itemsTotal",
            "type": [
                "Number"
            ],
            "default": "0",
            "description": "The total number of items"
        },
        {
            "name": "limit",
            "type": [
                "Number",
                "Object"
            ],
            "default": "",
            "description": "The maximum number of pagination buttons to show on each breakpoint"
        },
        {
            "name": "quickLink",
            "type": [
                "Boolean"
            ],
            "default": "false",
            "description": "Display the quick link buttons"
        },
        {
            "name": "modelValue",
            "type": [
                "Number"
            ],
            "default": "1",
            "description": "Used to determine the current page"
        },
        {
            "name": "size",
            "type": [
                "sm",
                "md",
                "lg"
            ],
            "default": "",
            "description": "The size variant of the pagination"
        },
        {
            "name": "showNavigationWhenDisabled",
            "type": [
                "boolean"
            ],
            "default": "true",
            "description": "Show or hide navigation buttons for first or last page"
        }
    ],
    "events": [
        {
            "description": "Event emitted for setting the modelValue",
            "name": "update:modelValue"
        }
    ],
    "slots": [
        {
            "name": "previous",
            "description": "Slot for previous button content "
        },
        {
            "name": "next",
            "description": "Slot for next button content "
        }
    ],
    "css": {
        "selector": "",
        "variables": []
    }
};

export default manifest;
