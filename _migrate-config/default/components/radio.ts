import { defineComponent } from '../../../../../utils';

export const radio = defineComponent(
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
        transition: {
            property: 'background-color, color, border-color, transform',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        margin: {
            top: 0,
            right: 'calc(var(--margin-right) / 2)',
            bottom: 'calc(var(--margin-bottom) / 2)',
            left: 0
        },
        zIndex: 2000,
        arrow: {
            size: '6px'
        },
        width: '1rem',
        height: '1rem',
        checked: {
            border: {
                color: 'var(--color-primary-shade-50)'
            },
            background: 'var(--color-primary)',
            disabled: {
                background: 'var(--color-primary-300)',
                border: {
                    color: 'var(--color-primary-400)'
                },
                color: 'var(--text-color-white)'
            }
        },
        disabled: {
            color: 'var(--text-color-weakest)',
            background: 'var(--color-gray-100)'
        },
        checkmark: {
            color: 'var(--color-white)',
            width: '0.5rem',
            height: '0.5rem'
        }
    },
    {
        light: {
            background: 'var(--color-white)',
            border: {
                color: 'var(--color-light-shade-50)'
            },
            color: 'var(--contrast-text-color-light)',
            disabled: {
                background: 'var(--color-gray-100)'
            },
            checked: {
                disabled: {
                    background: 'var(--color-primary-300)',
                    border: {
                        color: 'var(--color-primary-400)'
                    },
                    color: 'var(--text-color-white)'
                }
            }
        },
        dark: {
            background: 'var(--color-dark)',
            border: {
                color: 'var(--color-dark-tint-50)'
            },
            color: 'var(--contrast-text-color-dark)',
            disabled: {
                background: 'var(--color-gray-600)'
            },
            checked: {
                disabled: {
                    background: 'var(--color-primary-700)',
                    border: {
                        color: 'var(--color-primary-800)'
                    },
                    color: 'var(--text-color-white)'
                }
            }
        },
        sm: {
            borderRadius: {
                topLeft: 'calc(var(--radio--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight: 'calc(var(--radio--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight:
                    'calc(var(--radio--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft:
                    'calc(var(--radio--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            fontSize: 'calc(var(--radio--font-size) * var(--size-multiplier-sm))',
            margin: {
                right: 'calc(var(--radio--margin-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--radio--margin-bottom) * var(--size-multiplier-sm))'
            },
            width: 'calc(var(--radio--width) * var(--size-multiplier-sm))',
            height: 'calc(var(--radio--height) * var(--size-multiplier-sm))',
            checkmark: {
                width: 'calc(var(--radio--checkmark--width) * var(--size-multiplier-sm))',
                height: 'calc(var(--radio--checkmark--height) * var(--size-multiplier-sm))'
            }
        },
        md: {
            borderRadius: {
                topLeft: 'calc(var(--radio--border-top-left-radius) * var(--size-multiplier-md))',
                topRight: 'calc(var(--radio--border-top-right-radius) * var(--size-multiplier-md))',
                bottomRight:
                    'calc(var(--radio--border-bottom-right-radius) * var(--size-multiplier-md))',
                bottomLeft:
                    'calc(var(--radio--border-bottom-left-radius) * var(--size-multiplier-md))'
            },
            fontSize: 'calc(var(--radio--font-size) * var(--size-multiplier-md))',
            margin: {
                right: 'calc(var(--radio--margin-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--radio--margin-bottom) * var(--size-multiplier-md))'
            },
            width: 'calc(var(--radio--width) * var(--size-multiplier-md))',
            height: 'calc(var(--radio--height) * var(--size-multiplier-md))',
            checkmark: {
                width: 'calc(var(--radio--checkmark--width) * var(--size-multiplier-md))',
                height: 'calc(var(--radio--checkmark--height) * var(--size-multiplier-md))'
            }
        },
        lg: {
            borderRadius: {
                topLeft: 'calc(var(--radio--border-top-left-radius) * var(--size-multiplier-lg))',
                topRight: 'calc(var(--radio--border-top-right-radius) * var(--size-multiplier-lg))',
                bottomRight:
                    'calc(var(--radio--border-bottom-right-radius) * var(--size-multiplier-lg))',
                bottomLeft:
                    'calc(var(--radio--border-bottom-left-radius) * var(--size-multiplier-lg))'
            },
            fontSize: 'calc(var(--radio--font-size) * var(--size-multiplier-lg))',
            margin: {
                right: 'calc(var(--radio--margin-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--radio--margin-bottom) * var(--size-multiplier-lg))'
            },
            width: 'calc(var(--radio--width) * var(--size-multiplier-lg))',
            height: 'calc(var(--radio--height) * var(--size-multiplier-lg))',
            checkmark: {
                width: 'calc(var(--radio--checkmark--width) * var(--size-multiplier-lg))',
                height: 'calc(var(--radio--checkmark--height) * var(--size-multiplier-lg))'
            }
        }
    }
);
