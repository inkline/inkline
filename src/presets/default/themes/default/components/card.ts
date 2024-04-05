import type { RawTheme } from '../../../../../types';

export const card: RawTheme['components']['card'] = {
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
        header: {
            color: 'var(--card--color)'
        },
        footer: {
            color: 'var(--card--color)'
        }
    },
    primary: {
        background: 'var(--color-primary)',
        border: {
            color: 'var(--color-primary-shade-50)'
        },
        color: 'var(--contrast-text-color-dark)',
        header: {
            background: 'var(--color-primary-shade-50)',
            color: 'var(--contrast-text-color-dark)'
        },
        footer: {
            background: 'var(--color-primary-shade-50)',
            color: 'var(--contrast-text-color-dark)'
        }
    },
    secondary: {
        background: 'var(--color-secondary)',
        border: {
            color: 'var(--color-secondary-shade-50)'
        },
        color: 'var(--contrast-text-color-dark)',
        header: {
            background: 'var(--color-secondary-shade-50)'
        },
        footer: {
            background: 'var(--color-secondary-shade-50)'
        }
    },
    info: {
        background: 'var(--color-info)',
        border: {
            color: 'var(--color-info-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        header: {
            background: 'var(--color-info-shade-50)'
        },
        footer: {
            background: 'var(--color-info-shade-50)'
        }
    },
    success: {
        background: 'var(--color-success)',
        border: {
            color: 'var(--color-success-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        header: {
            background: 'var(--color-success-shade-50)'
        },
        footer: {
            background: 'var(--color-success-shade-50)'
        }
    },
    warning: {
        background: 'var(--color-warning)',
        border: {
            color: 'var(--color-warning-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        header: {
            background: 'var(--color-warning-shade-50)'
        },
        footer: {
            background: 'var(--color-warning-shade-50)'
        }
    },
    danger: {
        background: 'var(--color-danger)',
        border: {
            color: 'var(--color-danger-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        header: {
            background: 'var(--color-danger-shade-50)'
        },
        footer: {
            background: 'var(--color-danger-shade-50)'
        }
    },
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
            color: 'var(--color-dark-shade-50)'
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
        }
    }
};
