import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        name: 'Blockquote',
        props: [
            {
                name: 'align',
                type: "'left' | 'center' | 'right'",
                description: 'The alignment of the blockquote',
                default: "'left'"
            },
            {
                name: 'border',
                type: 'boolean',
                description: 'Display the blockquote with a thick border',
                default: 'true'
            },
            {
                name: 'dashCite',
                type: 'boolean',
                description: 'Display the blockquote cite as dashed',
                default: 'true'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default blockquote content'
            },
            {
                name: 'cite',
                description: 'Slot for blockquote citation'
            }
        ],
        css: {
            namespace: 'blockquote',
            variables: [
                {
                    name: '--blockquote--font-size',
                    value: 'var(--font-size)'
                },
                {
                    name: '--blockquote--margin-top',
                    value: '0'
                },
                {
                    name: '--blockquote--margin-right',
                    value: '0'
                },
                {
                    name: '--blockquote--margin-bottom',
                    value: '0'
                },
                {
                    name: '--blockquote--margin-left',
                    value: '0'
                },
                {
                    name: '--blockquote--margin',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding-top',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding-right',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding-left',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding',
                    value: 'var(--blockquote--padding-top) var(--blockquote--padding-right) var(--blockquote--padding-bottom) var(--blockquote--padding-left)'
                },
                {
                    name: '--blockquote--border-top-width',
                    value: '0'
                },
                {
                    name: '--blockquote--border-top-style',
                    value: 'none'
                },
                {
                    name: '--blockquote--border-top-color',
                    value: 'currentColor'
                },
                {
                    name: '--blockquote--border-right-width',
                    value: '4px'
                },
                {
                    name: '--blockquote--border-right-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--blockquote--border-right-color',
                    value: 'var(--border-left-color)'
                },
                {
                    name: '--blockquote--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--blockquote--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--blockquote--border-bottom-color',
                    value: 'currentColor'
                },
                {
                    name: '--blockquote--border-left-width',
                    value: '4px'
                },
                {
                    name: '--blockquote--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--blockquote--border-left-color',
                    value: 'var(--border-left-color)'
                },
                {
                    name: '--blockquote--border-width',
                    value: 'var(--blockquote--border-top-width) var(--blockquote--border-right-width) var(--blockquote--border-bottom-width) var(--blockquote--border-left-width)'
                },
                {
                    name: '--blockquote--border-style',
                    value: 'var(--blockquote--border-top-style) var(--blockquote--border-right-style) var(--blockquote--border-bottom-style) var(--blockquote--border-left-style)'
                },
                {
                    name: '--blockquote--border-color',
                    value: 'var(--blockquote--border-top-color) var(--blockquote--border-right-color) var(--blockquote--border-bottom-color) var(--blockquote--border-left-color)'
                },
                {
                    name: '--blockquote--border-top',
                    value: 'var(--blockquote--border-top-width) var(--blockquote--border-top-style) var(--blockquote--border-top-color)'
                },
                {
                    name: '--blockquote--border-right',
                    value: 'var(--blockquote--border-right-width) var(--blockquote--border-right-style) var(--blockquote--border-right-color)'
                },
                {
                    name: '--blockquote--border-bottom',
                    value: 'var(--blockquote--border-bottom-width) var(--blockquote--border-bottom-style) var(--blockquote--border-bottom-color)'
                },
                {
                    name: '--blockquote--border-left',
                    value: 'var(--blockquote--border-left-width) var(--blockquote--border-left-style) var(--blockquote--border-left-color)'
                },
                {
                    name: '--blockquote--border',
                    value: 'var(--blockquote--border-top-width) var(--blockquote--border-top-style) var(--blockquote--border-top-color)'
                },
                {
                    name: '--blockquote--cite--color',
                    value: 'var(--text-color--weak)'
                },
                {
                    name: '--blockquote--cite--font-size',
                    value: '80%'
                }
            ]
        }
    },
    {
        name: 'Typography',
        props: [
            {
                name: 'color',
                type: "'primary' | 'secondary' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the text',
                default: ''
            },
            {
                name: 'size',
                type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'lg' | '2xl'",
                description: 'The size variant of the text',
                default: ''
            },
            {
                name: 'tag',
                type: 'string',
                description: 'The HTML tag to be rendered by the component',
                default: "'span'"
            },
            {
                name: 'align',
                type: "'left' | 'center' | 'right' | 'justify'",
                description: 'The text alignment',
                default: 'undefined'
            },
            {
                name: 'fontWeight',
                type: "'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'black' | 'lighter' | 'bolder'",
                description: 'The font weight of the text',
                default: 'undefined'
            },
            {
                name: 'textDecoration',
                type: "'underline' | 'line-through' | 'overline' | 'none'",
                description: 'The text decoration style',
                default: 'undefined'
            },
            {
                name: 'lineHeight',
                type: "'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'",
                description: 'The line height of the text',
                default: 'undefined'
            },
            {
                name: 'letterSpacing',
                type: "'tighter' | 'tight' | 'normal' | 'wide' | 'wider'",
                description: 'The letter spacing of the text',
                default: ''
            },
            {
                name: 'truncate',
                type: 'boolean',
                description:
                    'Whether to truncate the text with an ellipsis if it overflows its container',
                default: 'false'
            },
            {
                name: 'lineClamp',
                type: '1 | 2 | 3 | 4',
                description: 'The number of lines to display before truncating the text',
                default: 'undefined'
            },
            {
                name: 'textTransform',
                type: "'uppercase' | 'lowercase' | 'capitalize' | 'full-width' | 'full-size-kana' | 'math-auto' | 'none'",
                description: 'The text transform style',
                default: 'undefined'
            },
            {
                name: 'noWrap',
                type: 'boolean',
                description: 'Prevents the text from wrapping to a new line',
                default: 'false'
            },
            {
                name: 'gutterBottom',
                type: 'boolean',
                description: 'Applies a bottom margin to the text for spacing purposes',
                default: 'false'
            },
            {
                name: 'lead',
                type: 'boolean',
                description: 'Applies a larger font size and lighter font-weight to the text',
                default: 'false'
            },
            {
                name: 'initialism',
                type: 'boolean',
                description: 'Applies a smaller font size and uppercase text-transform to the text',
                default: 'false'
            }
        ],
        events: [],
        slots: [
            {
                name: 'default',
                description: 'Slot for default typography content'
            }
        ],
        css: {
            namespace: 'typography',
            variables: [
                {
                    name: '--typography--lead--font-size',
                    value: 'var(--font-size--lg)'
                },
                {
                    name: '--typography--lead--font-weight',
                    value: 'var(--font-weight--light)'
                },
                {
                    name: '--typography--initialism--font-size',
                    value: '90%'
                },
                {
                    name: '--typography--initialism--text-transform',
                    value: 'uppercase'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--blockquote--font-size',
                    value: 'var(--font-size)'
                },
                {
                    name: '--blockquote--margin-top',
                    value: '0'
                },
                {
                    name: '--blockquote--margin-right',
                    value: '0'
                },
                {
                    name: '--blockquote--margin-bottom',
                    value: '0'
                },
                {
                    name: '--blockquote--margin-left',
                    value: '0'
                },
                {
                    name: '--blockquote--margin',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding-top',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding-right',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding-left',
                    value: 'var(--spacing)'
                },
                {
                    name: '--blockquote--padding',
                    value: 'var(--blockquote--padding-top) var(--blockquote--padding-right) var(--blockquote--padding-bottom) var(--blockquote--padding-left)'
                },
                {
                    name: '--blockquote--border-top-width',
                    value: '0'
                },
                {
                    name: '--blockquote--border-top-style',
                    value: 'none'
                },
                {
                    name: '--blockquote--border-top-color',
                    value: 'currentColor'
                },
                {
                    name: '--blockquote--border-right-width',
                    value: '4px'
                },
                {
                    name: '--blockquote--border-right-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--blockquote--border-right-color',
                    value: 'var(--border-left-color)'
                },
                {
                    name: '--blockquote--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--blockquote--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--blockquote--border-bottom-color',
                    value: 'currentColor'
                },
                {
                    name: '--blockquote--border-left-width',
                    value: '4px'
                },
                {
                    name: '--blockquote--border-left-style',
                    value: 'var(--border-left-style)'
                },
                {
                    name: '--blockquote--border-left-color',
                    value: 'var(--border-left-color)'
                },
                {
                    name: '--blockquote--border-width',
                    value: 'var(--blockquote--border-top-width) var(--blockquote--border-right-width) var(--blockquote--border-bottom-width) var(--blockquote--border-left-width)'
                },
                {
                    name: '--blockquote--border-style',
                    value: 'var(--blockquote--border-top-style) var(--blockquote--border-right-style) var(--blockquote--border-bottom-style) var(--blockquote--border-left-style)'
                },
                {
                    name: '--blockquote--border-color',
                    value: 'var(--blockquote--border-top-color) var(--blockquote--border-right-color) var(--blockquote--border-bottom-color) var(--blockquote--border-left-color)'
                },
                {
                    name: '--blockquote--border-top',
                    value: 'var(--blockquote--border-top-width) var(--blockquote--border-top-style) var(--blockquote--border-top-color)'
                },
                {
                    name: '--blockquote--border-right',
                    value: 'var(--blockquote--border-right-width) var(--blockquote--border-right-style) var(--blockquote--border-right-color)'
                },
                {
                    name: '--blockquote--border-bottom',
                    value: 'var(--blockquote--border-bottom-width) var(--blockquote--border-bottom-style) var(--blockquote--border-bottom-color)'
                },
                {
                    name: '--blockquote--border-left',
                    value: 'var(--blockquote--border-left-width) var(--blockquote--border-left-style) var(--blockquote--border-left-color)'
                },
                {
                    name: '--blockquote--border',
                    value: 'var(--blockquote--border-top-width) var(--blockquote--border-top-style) var(--blockquote--border-top-color)'
                },
                {
                    name: '--blockquote--cite--color',
                    value: 'var(--text-color--weak)'
                },
                {
                    name: '--blockquote--cite--font-size',
                    value: '80%'
                },
                {
                    name: '--typography--lead--font-size',
                    value: 'var(--font-size--lg)'
                },
                {
                    name: '--typography--lead--font-weight',
                    value: 'var(--font-weight--light)'
                },
                {
                    name: '--typography--initialism--font-size',
                    value: '90%'
                },
                {
                    name: '--typography--initialism--text-transform',
                    value: 'uppercase'
                }
            ]
        }
    }
];

export default manifest;
