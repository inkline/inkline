import { defineComponent } from '../../../../../utils';

export const checkableButtonGroup = defineComponent(
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
        gap: 'calc(var(--margin-right) * 0.5)',
        transition: {
            property: 'background-color, color, border-color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        padding: {
            top: 'calc(var(--padding-top) * 0.5)',
            right: 'calc(var(--padding-right) * 0.5)',
            bottom: 'calc(var(--padding-bottom) * 0.5)',
            left: 'calc(var(--padding-left) * 0.5)'
        },
        button: {
            background: 'transparent',
            border: {
                color: 'transparent'
            }
        }
    },
    {
        light: {
            background: 'var(--color-white)',
            border: {
                color: 'var(--color-light-shade-50)'
            },
            color: 'var(--contrast-text-color-light)'
        },
        dark: {
            background: 'var(--color-dark)',
            border: {
                color: 'var(--color-dark-tint-50)'
            },
            color: 'var(--contrast-text-color-dark)',
            button: {
                active: {
                    background: 'var(--color-dark-tint-100)'
                }
            }
        },
        sm: {
            borderRadius: {
                topLeft:
                    'calc(var(--checkable-button-group--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight:
                    'calc(var(--checkable-button-group--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight:
                    'calc(var(--checkable-button-group--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft:
                    'calc(var(--checkable-button-group--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            gap: 'calc(var(--checkable-button-group--margin-right) * var(--size-multiplier-sm))',
            padding: {
                top: 'calc(var(--checkable-button-group--padding-top) * var(--size-multiplier-sm))',
                right: 'calc(var(--checkable-button-group--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--checkable-button-group--padding-bottom) * var(--size-multiplier-sm))',
                left: 'calc(var(--checkable-button-group--padding-left) * var(--size-multiplier-sm))'
            }
        },
        md: {
            borderRadius: {
                topLeft:
                    'calc(var(--checkable-button-group--border-top-left-radius) * var(--size-multiplier-md))',
                topRight:
                    'calc(var(--checkable-button-group--border-top-right-radius) * var(--size-multiplier-md))',
                bottomRight:
                    'calc(var(--checkable-button-group--border-bottom-right-radius) * var(--size-multiplier-md))',
                bottomLeft:
                    'calc(var(--checkable-button-group--border-bottom-left-radius) * var(--size-multiplier-md))'
            },
            gap: 'calc(var(--checkable-button-group--margin-right) * var(--size-multiplier-md))',
            padding: {
                top: 'calc(var(--checkable-button-group--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--checkable-button-group--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--checkable-button-group--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--checkable-button-group--padding-left) * var(--size-multiplier-md))'
            }
        },
        lg: {
            borderRadius: {
                topLeft:
                    'calc(var(--checkable-button-group--border-top-left-radius) * var(--size-multiplier-lg))',
                topRight:
                    'calc(var(--checkable-button-group--border-top-right-radius) * var(--size-multiplier-lg))',
                bottomRight:
                    'calc(var(--checkable-button-group--border-bottom-right-radius) * var(--size-multiplier-lg))',
                bottomLeft:
                    'calc(var(--checkable-button-group--border-bottom-left-radius) * var(--size-multiplier-lg))'
            },
            gap: 'calc(var(--checkable-button-group--margin-right) * var(--size-multiplier-lg))',
            padding: {
                top: 'calc(var(--checkable-button-group--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--checkable-button-group--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--checkable-button-group--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--checkable-button-group--padding-left) * var(--size-multiplier-lg))'
            }
        }
    }
);
