import type { RawTheme } from '../../../../../types';

export const input: RawTheme['components']['input'] = {
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
            property: 'background-color, color, border-color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        padding: {
            top: 'var(--padding-top-3-4)',
            right: 'var(--padding-right)',
            bottom: 'var(--padding-bottom-3-4)',
            left: 'var(--padding-left)'
        },
        placeholder: {
            color: 'var(--text-color-weaker)'
        },
        icon: {
            width: 'auto',
            height: '1rem',
            color: 'var(--text-color-weak)'
        },
        error: {
            border: {
                color: 'var(--color-danger)'
            }
        },
        disabled: {
            background: 'var(--color-light)'
        },
        focus: {
            border: {
                color: 'var(--color-primary)'
            }
        },
        prefix: {
            color: 'var(--text-color-weaker)'
        },
        suffix: {
            color: 'var(--text-color-weaker)'
        }
    },
    light: {
        background: 'var(--color-white)',
        border: {
            color: 'var(--color-light-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        disabled: {
            background: 'var(--color-light)'
        },
        hover: {
            border: {
                color: 'var(--color-light-shade-100)'
            }
        },
        prepend: {
            background: 'var(--color-light)'
        },
        append: {
            background: 'var(--color-light)'
        }
    },
    dark: {
        background: 'var(--color-dark)',
        border: {
            color: 'var(--color-dark-tint-50)'
        },
        color: 'var(--contrast-text-color-dark)',
        disabled: {
            background: 'var(--color-dark-tint-100)'
        },
        hover: {
            border: {
                color: 'var(--color-dark-tint-100)'
            }
        },
        prepend: {
            background: 'var(--color-dark-shade-50)'
        },
        append: {
            background: 'var(--color-dark-shade-50)'
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
            top: 'calc(var(--padding-top-sm) * 3 / 4)',
            right: 'var(--padding-right-sm)',
            bottom: 'calc(var(--padding-bottom-sm) * 3 / 4)',
            left: 'var(--padding-left-sm)'
        },
        icon: {
            height: 'calc(1rem * var(--size-multiplier-sm))'
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
            top: 'calc(var(--padding-top-md) * 3 / 4)',
            right: 'var(--padding-right-md)',
            bottom: 'calc(var(--padding-bottom-md) * 3 / 4)',
            left: 'var(--padding-left-md)'
        },
        icon: {
            height: 'calc(1rem * var(--size-multiplier-md))'
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
            top: 'calc(var(--padding-top-lg) * 3 / 4)',
            right: 'var(--padding-right-lg)',
            bottom: 'calc(var(--padding-bottom-lg) * 3 / 4)',
            left: 'var(--padding-left-lg)'
        },
        icon: {
            height: 'calc(1rem * var(--size-multiplier-lg))'
        }
    }
};
