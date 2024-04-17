import type { RawTheme } from '../../../../../types';

export const dropdown: RawTheme['components']['dropdown'] = {
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
        minWidth: '240px',
        maxWidth: '90vw',
        header: {
            color: 'var(--dropdown--color)'
        },
        footer: {
            color: 'var(--dropdown--color)'
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

export const dropdownItem: RawTheme['components']['dropdownItem'] = {
    default: {
        background: 'transparent',
        border: {
            top: {
                style: 'var(--border-top-style)',
                width: 0,
                color: 'var(--border-top-color)'
            },
            right: {
                style: 'var(--border-right-style)',
                width: 0,
                color: 'var(--border-right-color)'
            },
            bottom: {
                style: 'var(--border-bottom-style)',
                width: 0,
                color: 'var(--border-bottom-color)'
            },
            left: {
                style: 'var(--border-left-style)',
                width: 0,
                color: 'var(--border-left-color)'
            }
        },
        color: 'inherit',
        margin: {
            top: 0,
            right: 'calc(var(--padding-right) * -1)',
            bottom: 0,
            left: 'calc(var(--padding-left) * -1)'
        },
        padding: {
            top: 'calc(var(--padding-top) * 0.5)',
            right: 'var(--padding-right)',
            bottom: 'calc(var(--padding-bottom) * 0.5)',
            left: 'var(--padding-left)'
        },
        transition: {
            property: 'background-color, color, border-color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        active: {
            fontWeight: 'var(--font-weight-semibold)'
        },
        disabled: {
            color: 'var(--text-color-weaker)'
        },
        hover: {
            background: 'var(--color-light)'
        },
        focus: {
            background: 'var(--color-light)'
        }
    },
    light: {
        hover: {
            background: 'var(--color-light)'
        },
        focus: {
            background: 'var(--color-light)'
        },
        active: {
            background: 'var(--color-light-shade-50)'
        }
    },
    dark: {
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
        fontSize: 'var(--font-size-sm)',
        margin: {
            right: 'calc(var(--padding-right-sm) * -1)',
            left: 'calc(var(--padding-left-sm) * -1)'
        },
        padding: {
            top: 'calc(var(--padding-top-sm) * 0.5)',
            right: 'var(--padding-right-sm)',
            bottom: 'calc(var(--padding-bottom-sm) * 0.5)',
            left: 'var(--padding-left-sm)'
        }
    },
    md: {
        fontSize: 'var(--font-size-md)',
        margin: {
            right: 'calc(var(--padding-right-md) * -1)',
            left: 'calc(var(--padding-left-md) * -1)'
        },
        padding: {
            top: 'calc(var(--padding-top-md) * 0.5)',
            right: 'var(--padding-right-md)',
            bottom: 'calc(var(--padding-bottom-md) * 0.5)',
            left: 'var(--padding-left-md)'
        }
    },
    lg: {
        fontSize: 'var(--font-size-lg)',
        margin: {
            right: 'calc(var(--padding-right-lg) * -1)',
            left: 'calc(var(--padding-left-lg) * -1)'
        },
        padding: {
            top: 'calc(var(--padding-top-lg) * 0.5)',
            right: 'var(--padding-right-lg)',
            bottom: 'calc(var(--padding-bottom-lg) * 0.5)',
            left: 'var(--padding-left-lg)'
        }
    }
};
