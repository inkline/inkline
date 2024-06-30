import { defineComponent } from '../../../../../utils';

export const popover = defineComponent(
    {
        background: 'var(--color-white)',
        boxShadow: {
            offsetX: 'var(--box-shadow-offset-x)',
            offsetY: 'var(--box-shadow-offset-y)',
            blurRadius: 'var(--box-shadow-blur-radius)',
            spreadRadius: 'var(--box-shadow-spread-radius)',
            color: 'var(--box-shadow-color)'
        },
        border: {
            top: {
                width: 'var(--border-top-width)',
                style: 'var(--border-top-style)',
                color: 'var(--border-top-color)'
            },
            right: {
                width: 'var(--border-right-width)',
                style: 'var(--border-right-style)',
                color: 'var(--border-right-color)'
            },
            bottom: {
                width: 'var(--border-bottom-width)',
                style: 'var(--border-bottom-style)',
                color: 'var(--border-bottom-color)'
            },
            left: {
                width: 'var(--border-left-width)',
                style: 'var(--border-left-style)',
                color: 'var(--border-left-color)'
            }
        },
        borderRadius: {
            topLeft: 'var(--border-top-left-radius)',
            topRight: 'var(--border-top-right-radius)',
            bottomRight: 'var(--border-bottom-right-radius)',
            bottomLeft: 'var(--border-bottom-left-radius)'
        },
        color: 'var(--contrast-text-color-light)',
        fontSize: 'var(--font-size)',
        lineHeight: 'var(--line-height)',
        width: '280px',
        maxWidth: '90vw',
        transition: {
            property: 'background-color, color, border-color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        padding: {
            top: 'var(--padding-top)',
            right: 'var(--padding-right)',
            bottom: 'var(--padding-bottom)',
            left: 'var(--padding-left)'
        },
        zIndex: 2000,
        arrow: {
            size: '6px'
        }
    },
    {
        light: {
            background: 'var(--color-white)',
            border: {
                color: 'var(--color-light-shade-50)'
            },
            color: 'var(--contrast-text-color-light)',
            header: {
                background: 'var(--color-light)'
            },
            footer: {
                background: 'var(--color-light)'
            }
        },
        dark: {
            background: 'var(--color-dark)',
            border: {
                color: 'var(--color-dark-tint-50)'
            },
            color: 'var(--contrast-text-color-dark)',
            header: {
                background: 'var(--color-dark-shade-50)'
            },
            footer: {
                background: 'var(--color-dark-shade-50)'
            }
        },
        sm: {
            borderRadius: {
                topLeft: 'calc(var(--popover--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight:
                    'calc(var(--popover--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight:
                    'calc(var(--popover--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft:
                    'calc(var(--popover--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            fontSize: 'calc(var(--popover--font-size) * var(--size-multiplier-sm))',
            padding: {
                top: 'calc(var(--popover--padding-top) * var(--size-multiplier-sm))',
                right: 'calc(var(--popover--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--popover--padding-bottom) * var(--size-multiplier-sm))',
                left: 'calc(var(--popover--padding-left) * var(--size-multiplier-sm))'
            }
        },
        md: {
            borderRadius: {
                topLeft: 'calc(var(--popover--border-top-left-radius) * var(--size-multiplier-md))',
                topRight:
                    'calc(var(--popover--border-top-right-radius) * var(--size-multiplier-md))',
                bottomRight:
                    'calc(var(--popover--border-bottom-right-radius) * var(--size-multiplier-md))',
                bottomLeft:
                    'calc(var(--popover--border-bottom-left-radius) * var(--size-multiplier-md))'
            },
            fontSize: 'calc(var(--popover--font-size) * var(--size-multiplier-md))',
            padding: {
                top: 'calc(var(--popover--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--popover--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--popover--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--popover--padding-left) * var(--size-multiplier-md))'
            }
        },
        lg: {
            borderRadius: {
                topLeft: 'calc(var(--popover--border-top-left-radius) * var(--size-multiplier-lg))',
                topRight:
                    'calc(var(--popover--border-top-right-radius) * var(--size-multiplier-lg))',
                bottomRight:
                    'calc(var(--popover--border-bottom-right-radius) * var(--size-multiplier-lg))',
                bottomLeft:
                    'calc(var(--popover--border-bottom-left-radius) * var(--size-multiplier-lg))'
            },
            fontSize: 'calc(var(--popover--font-size) * var(--size-multiplier-lg))',
            padding: {
                top: 'calc(var(--popover--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--popover--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--popover--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--popover--padding-left) * var(--size-multiplier-lg))'
            }
        }
    }
);
