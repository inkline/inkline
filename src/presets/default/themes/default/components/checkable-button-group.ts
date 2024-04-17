import type { RawTheme } from '../../../../../types';

export const checkableButtonGroup: RawTheme['components']['checkableButtonGroup'] = {
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
            topLeft: 'var(--border-top-left-radius-sm)',
            topRight: 'var(--border-top-right-radius-sm)',
            bottomRight: 'var(--border-bottom-right-radius-sm)',
            bottomLeft: 'var(--border-bottom-left-radius-sm)'
        },
        gap: 'calc(var(--margin-right-sm) * 0.5)',
        padding: {
            top: 'calc(var(--padding-top-sm) * 0.5)',
            right: 'calc(var(--padding-right-sm) * 0.5)',
            bottom: 'calc(var(--padding-bottom-sm) * 0.5)',
            left: 'calc(var(--padding-left-sm) * 0.5)'
        }
    },
    md: {
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-md)',
            topRight: 'var(--border-top-right-radius-md)',
            bottomRight: 'var(--border-bottom-right-radius-md)',
            bottomLeft: 'var(--border-bottom-left-radius-md)'
        },
        gap: 'calc(var(--margin-right-md) * 0.5)',
        padding: {
            top: 'calc(var(--padding-top-md) * 0.5)',
            right: 'calc(var(--padding-right-md) * 0.5)',
            bottom: 'calc(var(--padding-bottom-md) * 0.5)',
            left: 'calc(var(--padding-left-md) * 0.5)'
        }
    },
    lg: {
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-lg)',
            topRight: 'var(--border-top-right-radius-lg)',
            bottomRight: 'var(--border-bottom-right-radius-lg)',
            bottomLeft: 'var(--border-bottom-left-radius-lg)'
        },
        gap: 'calc(var(--margin-right-lg) * 0.5)',
        padding: {
            top: 'calc(var(--padding-top-lg) * 0.5)',
            right: 'calc(var(--padding-right-lg) * 0.5)',
            bottom: 'calc(var(--padding-bottom-lg) * 0.5)',
            left: 'calc(var(--padding-left-lg) * 0.5)'
        }
    }
};
