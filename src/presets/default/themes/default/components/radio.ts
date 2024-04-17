import type { RawTheme } from '../../../../../types';

export const radio: RawTheme['components']['radio'] = {
    default: {
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
            right: 'var(--margin-right)',
            bottom: 0,
            left: 0
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
            topLeft: 'var(--border-top-left-radius-sm)',
            topRight: 'var(--border-top-right-radius-sm)',
            bottomRight: 'var(--border-bottom-right-radius-sm)',
            bottomLeft: 'var(--border-bottom-left-radius-sm)'
        },
        fontSize: 'var(--font-size-sm)',
        padding: {
            top: 'var(--padding-top-sm)',
            right: 'var(--padding-right-sm)',
            bottom: 'var(--padding-bottom-sm)',
            left: 'var(--padding-left-sm)'
        },
        margin: {
            right: 'calc(var(--margin-right-sm) / 2)'
        },
        width: 'calc(1rem * var(--size-multiplier-sm))',
        height: 'calc(1rem * var(--size-multiplier-sm))',
        checkmark: {
            width: 'calc(0.5rem * var(--size-multiplier-sm))',
            height: 'calc(0.5rem * var(--size-multiplier-sm))'
        }
    },
    md: {
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-md)',
            topRight: 'var(--border-top-right-radius-md)',
            bottomRight: 'var(--border-bottom-right-radius-md)',
            bottomLeft: 'var(--border-bottom-left-radius-md)'
        },
        fontSize: 'var(--font-size-md)',
        padding: {
            top: 'var(--padding-top-md)',
            right: 'var(--padding-right-md)',
            bottom: 'var(--padding-bottom-md)',
            left: 'var(--padding-left-md)'
        },
        margin: {
            right: 'calc(var(--margin-right-md) / 2)'
        },
        width: 'calc(1rem * var(--size-multiplier-md))',
        height: 'calc(1rem * var(--size-multiplier-md))',
        checkmark: {
            width: 'calc(0.5rem * var(--size-multiplier-md))',
            height: 'calc(0.5rem * var(--size-multiplier-md))'
        }
    },
    lg: {
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-lg)',
            topRight: 'var(--border-top-right-radius-lg)',
            bottomRight: 'var(--border-bottom-right-radius-lg)',
            bottomLeft: 'var(--border-bottom-left-radius-lg)'
        },
        fontSize: 'var(--font-size-lg)',
        padding: {
            top: 'var(--padding-top-lg)',
            right: 'var(--padding-right-lg)',
            bottom: 'var(--padding-bottom-lg)',
            left: 'var(--padding-left-lg)'
        },
        margin: {
            right: 'calc(var(--margin-right-lg) / 2)'
        },
        width: 'calc(1rem * var(--size-multiplier-lg))',
        height: 'calc(1rem * var(--size-multiplier-lg))',
        checkmark: {
            width: 'calc(0.5rem * var(--size-multiplier-lg))',
            height: 'calc(0.5rem * var(--size-multiplier-lg))'
        }
    }
};
