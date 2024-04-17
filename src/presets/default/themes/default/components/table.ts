import type { RawTheme } from '../../../../../types';

export const table: RawTheme['components']['table'] = {
    default: {
        background: 'var(--color-white)',
        border: {
            top: {
                width: 0,
                style: 'var(--border-top-style)',
                color: 'var(--border-top-color)'
            },
            right: {
                width: 0,
                style: 'var(--border-right-style)',
                color: 'var(--border-right-color)'
            },
            bottom: {
                width: 'var(--border-bottom-width)',
                style: 'var(--border-bottom-style)',
                color: 'var(--border-bottom-color)'
            },
            left: {
                width: 0,
                style: 'var(--border-left-style)',
                color: 'var(--border-left-color)'
            }
        },
        color: 'var(--contrast-text-color-light)',
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
        margin: {
            top: 0,
            right: 0,
            bottom: 'var(--margin-bottom)',
            left: 0
        },
        adjacent: {
            border: {
                top: {
                    color: 'transparent'
                }
            }
        },
        striped: {
            background: 'var(--color-gray-100)'
        },
        hover: {
            background: 'var(--color-light)'
        }
    },
    bordered: {
        border: {
            top: {
                width: 'var(--border-top-width)'
            },
            right: {
                width: 'var(--border-right-width)'
            },
            bottom: {
                width: 'var(--border-bottom-width)'
            },
            left: {
                width: 'var(--border-left-width)'
            }
        }
    },
    condensed: {
        padding: {
            top: 'var(--padding-top-1-2)',
            right: 'var(--padding-right-1-2)',
            bottom: 'var(--padding-bottom-1-2)',
            left: 'var(--padding-left-1-2)'
        }
    },
    primary: {
        background: 'var(--color-primary)',
        border: {
            color: 'var(--color-primary-shade-50)'
        },
        color: 'var(--contrast-text-color-dark)',
        striped: {
            background: 'var(--color-primary-shade-50)'
        },
        hover: {
            background: 'var(--color-primary-shade-100)'
        }
    },
    secondary: {
        background: 'var(--color-secondary)',
        border: {
            color: 'var(--color-secondary-shade-50)'
        },
        color: 'var(--contrast-text-color-dark)',
        striped: {
            background: 'var(--color-secondary-shade-50)'
        },
        hover: {
            background: 'var(--color-secondary-shade-100)'
        }
    },
    info: {
        background: 'var(--color-info)',
        border: {
            color: 'var(--color-info-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        striped: {
            background: 'var(--color-info-shade-50)'
        },
        hover: {
            background: 'var(--color-info-shade-100)'
        }
    },
    success: {
        background: 'var(--color-success)',
        border: {
            color: 'var(--color-success-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        striped: {
            background: 'var(--color-success-shade-50)'
        },
        hover: {
            background: 'var(--color-success-shade-100)'
        }
    },
    warning: {
        background: 'var(--color-warning)',
        border: {
            color: 'var(--color-warning-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        striped: {
            background: 'var(--color-warning-shade-50)'
        },
        hover: {
            background: 'var(--color-warning-shade-100)'
        }
    },
    danger: {
        background: 'var(--color-danger)',
        border: {
            color: 'var(--color-danger-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        striped: {
            background: 'var(--color-danger-shade-50)'
        },
        hover: {
            background: 'var(--color-danger-shade-100)'
        }
    },
    light: {
        background: 'var(--color-white)',
        border: {
            color: 'var(--color-light-shade-50)'
        },
        color: 'var(--contrast-text-color-light)',
        striped: {
            background: 'var(--color-gray-50)'
        },
        hover: {
            background: 'var(--color-light)'
        }
    },
    dark: {
        background: 'var(--color-dark)',
        border: {
            color: 'var(--color-dark-tint-50)'
        },
        color: 'var(--contrast-text-color-dark)',
        striped: {
            background: 'var(--color-dark-shade-50)'
        },
        hover: {
            background: 'var(--color-dark-shade-100)'
        }
    }
};
