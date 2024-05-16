import type { RawTheme } from '../../../../../types';

export const button: RawTheme['components']['button'] = {
    default: {
        color: 'var(--contrast-text-color-light)',
        background: 'var(--color-light)',
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
        boxShadow: {
            offsetX: 'var(--box-shadow-offset-x)',
            offsetY: 'var(--box-shadow-offset-y)',
            blurRadius: 'var(--box-shadow-blur-radius)',
            spreadRadius: 'var(--box-shadow-spread-radius)',
            color: 'var(--box-shadow-color)'
        },
        borderRadius: {
            topLeft: 'var(--border-top-left-radius)',
            topRight: 'var(--border-top-right-radius)',
            bottomRight: 'var(--border-bottom-right-radius)',
            bottomLeft: 'var(--border-bottom-left-radius)'
        },
        fontSize: 'var(--font-size)',
        fontWeight: 'var(--font-weight-normal)',
        lineHeight: 'var(--line-height)',
        padding: {
            top: 'var(--padding-top)',
            right: 'var(--padding-right)',
            bottom: 'var(--padding-bottom)',
            left: 'var(--padding-left)'
        },
        transition: {
            property: 'background-color, color, border-color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        active: {
            background: 'var(--color-light-shade-100)'
        },
        disabled: {
            opacity: '0.8'
        },
        hover: {
            background: 'var(--color-light-shade-50)'
        },
        focus: {
            background: 'var(--color-light-shade-50)'
        },
        block: {
            margin: {
                top: 'var(--margin-top)',
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        loader: {
            width: '1rem',
            height: '1rem'
        },
        icon: {
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 'var(--margin-right-1-2)'
            }
        }
    },
    primary: {
        color: 'var(--contrast-text-color-dark)',
        background: 'var(--color-primary)',
        border: {
            color: 'var(--color-primary-shade-50)'
        },
        hover: {
            background: 'var(--color-primary-shade-50)'
        },
        focus: {
            background: 'var(--color-primary-shade-50)'
        },
        active: {
            background: 'var(--color-primary-shade-100)'
        }
    },
    secondary: {
        color: 'var(--contrast-text-color-dark)',
        background: 'var(--color-secondary)',
        border: {
            color: 'var(--color-secondary-shade-50)'
        },
        hover: {
            background: 'var(--color-secondary-shade-50)'
        },
        focus: {
            background: 'var(--color-secondary-shade-50)'
        },
        active: {
            background: 'var(--color-secondary-shade-100)'
        }
    },
    info: {
        color: 'var(--contrast-text-color-light)',
        background: 'var(--color-info)',
        border: {
            color: 'var(--color-info-shade-50)'
        },
        hover: {
            background: 'var(--color-info-shade-50)'
        },
        focus: {
            background: 'var(--color-info-shade-50)'
        },
        active: {
            background: 'var(--color-info-shade-100)'
        }
    },
    success: {
        color: 'var(--contrast-text-color-light)',
        background: 'var(--color-success)',
        border: {
            color: 'var(--color-success-shade-50)'
        },
        hover: {
            background: 'var(--color-success-shade-50)'
        },
        focus: {
            background: 'var(--color-success-shade-50)'
        },
        active: {
            background: 'var(--color-success-shade-100)'
        }
    },
    warning: {
        color: 'var(--contrast-text-color-light)',
        background: 'var(--color-warning)',
        border: {
            color: 'var(--color-warning-shade-50)'
        },
        hover: {
            background: 'var(--color-warning-shade-50)'
        },
        focus: {
            background: 'var(--color-warning-shade-50)'
        },
        active: {
            background: 'var(--color-warning-shade-100)'
        }
    },
    danger: {
        color: 'var(--contrast-text-color-light)',
        background: 'var(--color-danger)',
        border: {
            color: 'var(--color-danger-shade-50)'
        },
        hover: {
            background: 'var(--color-danger-shade-50)'
        },
        focus: {
            background: 'var(--color-danger-shade-50)'
        },
        active: {
            background: 'var(--color-danger-shade-100)'
        }
    },
    light: {
        color: 'var(--contrast-text-color-light)',
        background: 'var(--color-light)',
        border: {
            color: 'var(--color-light-shade-50)'
        },
        hover: {
            background: 'var(--color-light-shade-50)'
        },
        focus: {
            background: 'var(--color-light-shade-50)'
        },
        active: {
            background: 'var(--color-light-shade-100)'
        }
    },
    dark: {
        color: 'var(--contrast-text-color-dark)',
        background: 'var(--color-dark)',
        border: {
            color: 'var(--color-dark-tint-50)'
        },
        hover: {
            background: 'var(--color-dark-tint-50)'
        },
        focus: {
            background: 'var(--color-dark-tint-50)'
        },
        active: {
            background: 'var(--color-dark-tint-100)'
        }
    },
    sm: {
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
        },
        fontSize: 'var(--font-size-sm)',
        circle: {
            width: 'calc(50px * var(--size-multiplier-sm))',
            height: 'calc(50px * var(--size-multiplier-sm))'
        },
        square: {
            width: 'calc(50px * var(--size-multiplier-sm))',
            height: 'calc(50px * var(--size-multiplier-sm))'
        }
    },
    md: {
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
        },
        fontSize: 'var(--font-size-md)',
        circle: {
            width: 'calc(50px * var(--size-multiplier-md))',
            height: 'calc(50px * var(--size-multiplier-md))'
        },
        square: {
            width: 'calc(50px * var(--size-multiplier-md))',
            height: 'calc(50px * var(--size-multiplier-md))'
        }
    },
    lg: {
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
        },
        fontSize: 'var(--font-size-lg)',
        circle: {
            width: 'calc(50px * var(--size-multiplier-lg))',
            height: 'calc(50px * var(--size-multiplier-lg))'
        },
        square: {
            width: 'calc(50px * var(--size-multiplier-lg))',
            height: 'calc(50px * var(--size-multiplier-lg))'
        }
    }
};
