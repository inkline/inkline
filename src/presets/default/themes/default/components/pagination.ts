import type { RawTheme } from '../../../../../types';

export const pagination: RawTheme['components']['pagination'] = {
    default: {
        color: 'var(--contrast-text-color-light)',
        fontSize: 'var(--font-size)',
        transition: {
            property: 'background-color, color, border-color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        margin: {
            top: 'var(--margin-top-1-4)',
            right: 'var(--margin-right-1-4)',
            bottom: 'var(--margin-bottom-1-4)',
            left: 'var(--margin-left-1-4)'
        },
        item: {
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
            minWidth: '40px',
            padding: {
                top: 'var(--padding-top)',
                right: 'var(--padding-right)',
                bottom: 'var(--padding-bottom)',
                left: 'var(--padding-left)'
            },
            hover: {
                background: 'var(--color-light)'
            },
            active: {
                background: 'var(--color-primary)',
                color: 'var(--contrast-text-color-dark)',
                border: {
                    color: 'var(--color-primary-shade-50)'
                },
                fontWeight: 'var(--font-weight-semibold)',
                hover: {
                    background: 'var(--color-primary-shade-50)'
                }
            },
            disabled: {
                color: 'var(--text-color-weaker)',
                border: {
                    color: 'var(--color-light-shade-50)'
                },
                opacity: 0.75
            }
        }
    },
    light: {
        color: 'var(--contrast-text-color-light)',
        item: {
            background: 'var(--color-white)',
            border: {
                color: 'var(--color-light-shade-50)'
            },
            hover: {
                background: 'var(--color-light)'
            }
        }
    },
    dark: {
        color: 'var(--contrast-text-color-dark)',
        item: {
            background: 'var(--color-dark)',
            border: {
                color: 'var(--color-dark-shade-50)'
            },
            hover: {
                background: 'var(--color-dark-shade-50)'
            }
        }
    },
    sm: {
        fontSize: 'var(--font-size-sm)',
        item: {
            borderRadius: {
                topLeft: 'var(--border-top-left-radius-sm)',
                topRight: 'var(--border-top-right-radius-sm)',
                bottomRight: 'var(--border-bottom-right-radius-sm)',
                bottomLeft: 'var(--border-bottom-left-radius-sm)'
            },
            padding: {
                top: 'var(--padding-top-sm)',
                right: 'var(--padding-right-sm)',
                bottom: 'var(--padding-bottom-sm)',
                left: 'var(--padding-left-sm)'
            },
            minWidth: '32px'
        }
    },
    md: {
        fontSize: 'var(--font-size-md)',
        item: {
            borderRadius: {
                topLeft: 'var(--border-top-left-radius-md)',
                topRight: 'var(--border-top-right-radius-md)',
                bottomRight: 'var(--border-bottom-right-radius-md)',
                bottomLeft: 'var(--border-bottom-left-radius-md)'
            },
            padding: {
                top: 'var(--padding-top-md)',
                right: 'var(--padding-right-md)',
                bottom: 'var(--padding-bottom-md)',
                left: 'var(--padding-left-md)'
            },
            minWidth: '40px'
        }
    },
    lg: {
        fontSize: 'var(--font-size-lg)',
        item: {
            borderRadius: {
                topLeft: 'var(--border-top-left-radius-lg)',
                topRight: 'var(--border-top-right-radius-lg)',
                bottomRight: 'var(--border-bottom-right-radius-lg)',
                bottomLeft: 'var(--border-bottom-left-radius-lg)'
            },
            padding: {
                top: 'var(--padding-top-lg)',
                right: 'var(--padding-right-lg)',
                bottom: 'var(--padding-bottom-lg)',
                left: 'var(--padding-left-lg)'
            },
            minWidth: '48px'
        }
    }
};
