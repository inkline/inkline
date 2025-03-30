import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Box',
        props: [
            {
                name: 'background',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string",
                description: 'The background of the box',
                default: ''
            },
            {
                name: 'border',
                type: "'none' | 'thin'",
                description: 'The border of the box',
                default: ''
            },
            {
                name: 'borderStyle',
                type: "'none' | 'solid' | 'dashed' | 'dotted'",
                description: 'The border-style of the box',
                default: ''
            },
            {
                name: 'borderTopStyle',
                type: "'none' | 'solid' | 'dashed' | 'dotted'",
                description: 'The border-top-style of the box',
                default: ''
            },
            {
                name: 'borderRightStyle',
                type: "'none' | 'solid' | 'dashed' | 'dotted'",
                description: 'The border-right-style of the box',
                default: ''
            },
            {
                name: 'borderBottomStyle',
                type: "'none' | 'solid' | 'dashed' | 'dotted'",
                description: 'The border-bottom-style of the box',
                default: ''
            },
            {
                name: 'borderLeftStyle',
                type: "'none' | 'solid' | 'dashed' | 'dotted'",
                description: 'The border-left-style of the box',
                default: ''
            },
            {
                name: 'borderWidth',
                type: "'none' | 'thin' | 'medium' | 'thick'",
                description: 'The border-width of the box',
                default: ''
            },
            {
                name: 'borderTopWidth',
                type: "'none' | 'thin' | 'medium' | 'thick'",
                description: 'The border-top-width of the box',
                default: ''
            },
            {
                name: 'borderRightWidth',
                type: "'none' | 'thin' | 'medium' | 'thick'",
                description: 'The border-right-width of the box',
                default: ''
            },
            {
                name: 'borderBottomWidth',
                type: "'none' | 'thin' | 'medium' | 'thick'",
                description: 'The border-bottom-width of the box',
                default: ''
            },
            {
                name: 'borderLeftWidth',
                type: "'none' | 'thin' | 'medium' | 'thick'",
                description: 'The border-left-width of the box',
                default: ''
            },
            {
                name: 'borderColor',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string",
                description: 'The border-color of the box',
                default: ''
            },
            {
                name: 'borderTopColor',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string",
                description: 'The border-top-color of the box',
                default: ''
            },
            {
                name: 'borderRightColor',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string",
                description: 'The border-right-color of the box',
                default: ''
            },
            {
                name: 'borderBottomColor',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string",
                description: 'The border-bottom-color of the box',
                default: ''
            },
            {
                name: 'borderLeftColor',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string",
                description: 'The border-left-color of the box',
                default: ''
            },
            {
                name: 'borderRadius',
                type: "'none' | 'sm' | 'md' | 'lg'",
                description: 'The border-radius of the box',
                default: ''
            },
            {
                name: 'borderTopLeftRadius',
                type: "'none' | 'sm' | 'md' | 'lg'",
                description: 'The border-top-left-radius of the box',
                default: ''
            },
            {
                name: 'borderTopRightRadius',
                type: "'none' | 'sm' | 'md' | 'lg'",
                description: 'The border-top-right-radius of the box',
                default: ''
            },
            {
                name: 'borderBottomLeftRadius',
                type: "'none' | 'sm' | 'md' | 'lg'",
                description: 'The border-bottom-left-radius of the box',
                default: ''
            },
            {
                name: 'borderBottomRightRadius',
                type: "'none' | 'sm' | 'md' | 'lg'",
                description: 'The border-bottom-right-radius of the box',
                default: ''
            },
            {
                name: 'boxShadow',
                type: "'none' | sm' | 'md' | 'lg'",
                description: '/** The box-shadow of the box',
                default: ''
            },
            {
                name: 'color',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger' | 'white' | 'black' | { light: 'color', dark: 'color' } | string",
                description: 'The color of the box',
                default: ''
            },
            {
                name: 'fontSize',
                type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
                description: 'The font-size of the box',
                default: ''
            },
            {
                name: 'fontWeight',
                type: "'normal' | 'bold' | 'bolder' | 'lighter'",
                description: 'The font-weight of the box',
                default: ''
            },
            {
                name: 'margin',
                type: "'sm' | 'md' | 'lg'",
                description: 'The margin of the box',
                default: ''
            },
            {
                name: 'margin-top',
                type: "'sm' | 'md' | 'lg'",
                description: 'The margin-top of the box',
                default: ''
            },
            {
                name: 'margin-right',
                type: "'sm' | 'md' | 'lg'",
                description: 'The margin-right of the box',
                default: ''
            },
            {
                name: 'margin-bottom',
                type: "'sm' | 'md' | 'lg'",
                description: 'The margin-bottom of the box',
                default: ''
            },
            {
                name: 'margin-left',
                type: "'sm' | 'md' | 'lg'",
                description: 'The margin-left of the box',
                default: ''
            },
            {
                name: 'padding',
                type: "'sm' | 'md' | 'lg'",
                description: 'The padding of the box',
                default: ''
            },
            {
                name: 'padding-top',
                type: "'sm' | 'md' | 'lg'",
                description: 'The padding-top of the box',
                default: ''
            },
            {
                name: 'padding-right',
                type: "'sm' | 'md' | 'lg'",
                description: 'The padding-right of the box',
                default: ''
            },
            {
                name: 'padding-bottom',
                type: "'sm' | 'md' | 'lg'",
                description: 'The padding-bottom of the box',
                default: ''
            },
            {
                name: 'padding-left',
                type: "'sm' | 'md' | 'lg'",
                description: 'The padding-left of the box',
                default: ''
            },
            {
                name: 'tag',
                type: 'string',
                description: 'The HTML tag to use for the box root element',
                default: 'div'
            },
            {
                name: 'variant',
                type: "'default'",
                description: 'The variant of the box',
                default: 'default'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for box content'
            }
        ]
    },
    {
        name: 'GridBox',
        props: [],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for grid box content'
            }
        ]
    }
];

export default manifest;
