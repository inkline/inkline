import type { RawTheme } from '../../../../../types';

export const toast: RawTheme['components']['toast'] = {
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
        color: 'var(--text-contrast-color-light)',
        fontSize: 'var(--font-size)',
        fontWeight: 'var(--font-weight-normal)',
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
        title: {
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--alert--font-size)'
        },
        link: {
            color: 'var(--toast--color)',
            fontWeight: 'var(--font-weight-semibold)',
            transition: {
                property: 'color',
                duration: 'var(--transition-duration)',
                timingFunction: 'var(--transition-timing-function)'
            },
            hover: {
                color: 'var(--toast--link--color)'
            }
        },
        code: {
            background: 'hsla(0, 0%, 0%, 0.05)',
            color: 'var(--toast--color)'
        },
        icon: {
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 'var(--toast--padding-left)'
            }
        },
        dismiss: {
            margin: {
                top: 0,
                right: 'var(--toast--padding-left)',
                bottom: 0,
                left: 0
            }
        },
        progress: {
            height: '0.25rem',
            background: 'rgba(0, 0, 0, 0.05)'
        },
        progressBar: {
            background: 'rgba(0, 0, 0, 0.15)'
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
        progress: {
            background: 'rgba(255, 255, 255, 0.05)'
        },
        progressBar: {
            background: 'rgba(255, 255, 255, 0.15)'
        }
    },
    info: {
        background: 'var(--color-info-100)',
        border: {
            color: 'var(--color-info-shade-50)'
        },
        color: 'var(--color-info-800)'
    },
    success: {
        background: 'var(--color-success-100)',
        border: {
            color: 'var(--color-success-shade-50)'
        },
        color: 'var(--color-success-800)'
    },
    warning: {
        background: 'var(--color-warning-100)',
        border: {
            color: 'var(--color-warning-shade-50)'
        },
        color: 'var(--color-warning-800)'
    },
    danger: {
        background: 'var(--color-danger-100)',
        border: {
            color: 'var(--color-danger-shade-50)'
        },
        color: 'var(--color-danger-800)'
    },
    sm: {
        fontSize: 'var(--font-size-sm)',
        padding: {
            top: 'var(--padding-top-sm)',
            right: 'var(--padding-right-sm)',
            bottom: 'var(--padding-bottom-sm)',
            left: 'var(--padding-left-sm)'
        },
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-sm)',
            topRight: 'var(--border-top-right-radius-sm)',
            bottomRight: 'var(--border-bottom-right-radius-sm)',
            bottomLeft: 'var(--border-bottom-left-radius-sm)'
        }
    },
    md: {
        fontSize: 'var(--font-size-md)',
        padding: {
            top: 'var(--padding-top-md)',
            right: 'var(--padding-right-md)',
            bottom: 'var(--padding-bottom-md)',
            left: 'var(--padding-left-md)'
        },
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-md)',
            topRight: 'var(--border-top-right-radius-md)',
            bottomRight: 'var(--border-bottom-right-radius-md)',
            bottomLeft: 'var(--border-bottom-left-radius-md)'
        }
    },
    lg: {
        fontSize: 'var(--font-size-lg)',
        padding: {
            top: 'var(--padding-top-lg)',
            right: 'var(--padding-right-lg)',
            bottom: 'var(--padding-bottom-lg)',
            left: 'var(--padding-left-lg)'
        },
        borderRadius: {
            topLeft: 'var(--border-top-left-radius-lg)',
            topRight: 'var(--border-top-right-radius-lg)',
            bottomRight: 'var(--border-bottom-right-radius-lg)',
            bottomLeft: 'var(--border-bottom-left-radius-lg)'
        }
    }
};
