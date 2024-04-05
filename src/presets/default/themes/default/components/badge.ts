import type { RawTheme } from '../../../../../types';

export const badge: RawTheme['components']['badge'] = {
    default: {
        background: 'var(--color-light)',
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
        fontSize: '80%',
        fontWeight: 'var(--font-weight-semibold)',
        transition: {
            property: 'background-color, color, border-color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        padding: {
            top: 'calc(var(--padding-top) * 0.25)',
            right: 'calc(var(--padding-right) * 0.5)',
            bottom: 'calc(var(--padding-bottom) * 0.25)',
            left: 'calc(var(--padding-left) * 0.5)'
        },
        pill: {
            borderRadius: {
                topLeft: '50%',
                topRight: '50%',
                bottomRight: '50%',
                bottomLeft: '50%'
            }
        }
    },
    primary: {
        background: 'var(--color-primary)',
        border: {
            color: 'var(--color-primary-shade-50)'
        },
        color: 'var(--contrast-text-color-dark)'
    },
    secondary: {
        background: 'var(--color-secondary)',
        border: {
            color: 'var(--color-secondary-shade-50)'
        },
        color: 'var(--contrast-text-color-dark)'
    },
    info: {
        background: 'var(--color-info)',
        border: {
            color: 'var(--color-info-shade-50)'
        },
        color: 'var(--contrast-text-color-light)'
    },
    success: {
        background: 'var(--color-success)',
        border: {
            color: 'var(--color-success-shade-50)'
        },
        color: 'var(--contrast-text-color-light)'
    },
    warning: {
        background: 'var(--color-warning)',
        border: {
            color: 'var(--color-warning-shade-50)'
        },
        color: 'var(--contrast-text-color-light)'
    },
    danger: {
        background: 'var(--color-danger)',
        border: {
            color: 'var(--color-danger-shade-50)'
        },
        color: 'var(--contrast-text-color-light)'
    },
    light: {
        background: 'var(--color-light)',
        border: {
            color: 'var(--color-light-shade-50)'
        },
        color: 'var(--contrast-text-color-light)'
    },
    dark: {
        background: 'var(--color-dark)',
        border: {
            color: 'var(--color-dark-shade-50)'
        },
        color: 'var(--contrast-text-color-dark)'
    },
    sm: {
        padding: {
            top: 'calc(var(--padding-top-sm) * 0.25)',
            right: 'calc(var(--padding-right-sm) * 0.5)',
            bottom: 'calc(var(--padding-bottom-sm) * 0.25)',
            left: 'calc(var(--padding-left-sm) * 0.5)'
        },
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-sm)',
            topRight: 'var(--border-top-right-radius-sm)',
            bottomRight: 'var(--border-bottom-right-radius-sm)',
            bottomLeft: 'var(--border-bottom-left-radius-sm)'
        }
    },
    md: {
        padding: {
            top: 'calc(var(--padding-top-md) * 0.25)',
            right: 'calc(var(--padding-right-md) * 0.5)',
            bottom: 'calc(var(--padding-bottom-md) * 0.25)',
            left: 'calc(var(--padding-left-md) * 0.5)'
        },
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-md)',
            topRight: 'var(--border-top-right-radius-md)',
            bottomRight: 'var(--border-bottom-right-radius-md)',
            bottomLeft: 'var(--border-bottom-left-radius-md)'
        }
    },
    lg: {
        padding: {
            top: 'calc(var(--padding-top-lg) * 0.25)',
            right: 'calc(var(--padding-right-lg) * 0.5)',
            bottom: 'calc(var(--padding-bottom-lg) * 0.25)',
            left: 'calc(var(--padding-left-lg) * 0.5)'
        },
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-lg)',
            topRight: 'var(--border-top-right-radius-lg)',
            bottomRight: 'var(--border-bottom-right-radius-lg)',
            bottomLeft: 'var(--border-bottom-left-radius-lg)'
        }
    }
};
