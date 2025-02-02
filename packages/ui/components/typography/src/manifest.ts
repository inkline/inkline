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
                    name: '--blockquote--font-size'
                },
                {
                    name: '--blockquote--margin-top'
                },
                {
                    name: '--blockquote--margin-right'
                },
                {
                    name: '--blockquote--margin-bottom'
                },
                {
                    name: '--blockquote--margin-left'
                },
                {
                    name: '--blockquote--margin'
                },
                {
                    name: '--blockquote--padding-top'
                },
                {
                    name: '--blockquote--padding-right'
                },
                {
                    name: '--blockquote--padding-bottom'
                },
                {
                    name: '--blockquote--padding-left'
                },
                {
                    name: '--blockquote--padding'
                },
                {
                    name: '--blockquote--border-top-width'
                },
                {
                    name: '--blockquote--border-top-style'
                },
                {
                    name: '--blockquote--border-top-color'
                },
                {
                    name: '--blockquote--border-right-width'
                },
                {
                    name: '--blockquote--border-right-style'
                },
                {
                    name: '--blockquote--border-right-color'
                },
                {
                    name: '--blockquote--border-bottom-width'
                },
                {
                    name: '--blockquote--border-bottom-style'
                },
                {
                    name: '--blockquote--border-bottom-color'
                },
                {
                    name: '--blockquote--border-left-width'
                },
                {
                    name: '--blockquote--border-left-style'
                },
                {
                    name: '--blockquote--border-left-color'
                },
                {
                    name: '--blockquote--border-width'
                },
                {
                    name: '--blockquote--border-style'
                },
                {
                    name: '--blockquote--border-color'
                },
                {
                    name: '--blockquote--border-top'
                },
                {
                    name: '--blockquote--border-right'
                },
                {
                    name: '--blockquote--border-bottom'
                },
                {
                    name: '--blockquote--border-left'
                },
                {
                    name: '--blockquote--border'
                },
                {
                    name: '--blockquote--cite--color'
                },
                {
                    name: '--blockquote--cite--font-size'
                }
            ]
        }
    },
    {
        name: 'Typography',
        props: [
            {
                name: 'color',
                type: "'primary' | 'success' | 'light' | 'dark' | 'info' | 'success' | 'warning' | 'danger'",
                description: 'The color variant of the badge',
                default: ''
            },
            {
                name: 'size',
                type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'lg' | '2xl'",
                description: 'The size variant of the badge',
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
                    name: '--typography--lead--font-size'
                },
                {
                    name: '--typography--lead--font-weight'
                },
                {
                    name: '--typography--initialism--font-size'
                },
                {
                    name: '--typography--initialism--text-transform'
                }
            ]
        }
    },
    {
        css: {
            namespace: '',
            variables: [
                {
                    name: '--blockquote--font-size'
                },
                {
                    name: '--blockquote--margin-top'
                },
                {
                    name: '--blockquote--margin-right'
                },
                {
                    name: '--blockquote--margin-bottom'
                },
                {
                    name: '--blockquote--margin-left'
                },
                {
                    name: '--blockquote--margin'
                },
                {
                    name: '--blockquote--padding-top'
                },
                {
                    name: '--blockquote--padding-right'
                },
                {
                    name: '--blockquote--padding-bottom'
                },
                {
                    name: '--blockquote--padding-left'
                },
                {
                    name: '--blockquote--padding'
                },
                {
                    name: '--blockquote--border-top-width'
                },
                {
                    name: '--blockquote--border-top-style'
                },
                {
                    name: '--blockquote--border-top-color'
                },
                {
                    name: '--blockquote--border-right-width'
                },
                {
                    name: '--blockquote--border-right-style'
                },
                {
                    name: '--blockquote--border-right-color'
                },
                {
                    name: '--blockquote--border-bottom-width'
                },
                {
                    name: '--blockquote--border-bottom-style'
                },
                {
                    name: '--blockquote--border-bottom-color'
                },
                {
                    name: '--blockquote--border-left-width'
                },
                {
                    name: '--blockquote--border-left-style'
                },
                {
                    name: '--blockquote--border-left-color'
                },
                {
                    name: '--blockquote--border-width'
                },
                {
                    name: '--blockquote--border-style'
                },
                {
                    name: '--blockquote--border-color'
                },
                {
                    name: '--blockquote--border-top'
                },
                {
                    name: '--blockquote--border-right'
                },
                {
                    name: '--blockquote--border-bottom'
                },
                {
                    name: '--blockquote--border-left'
                },
                {
                    name: '--blockquote--border'
                },
                {
                    name: '--blockquote--cite--color'
                },
                {
                    name: '--blockquote--cite--font-size'
                },
                {
                    name: '--typography--lead--font-size'
                },
                {
                    name: '--typography--lead--font-weight'
                },
                {
                    name: '--typography--initialism--font-size'
                },
                {
                    name: '--typography--initialism--text-transform'
                }
            ]
        }
    }
];

export default manifest;
