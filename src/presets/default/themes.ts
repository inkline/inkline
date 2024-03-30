import { defineThemes } from '../../utils';

const colorShadeAndTintVariants = {
    'shade-150': { darken: 15 },
    'shade-100': { darken: 10 },
    'shade-50': { darken: 5 },
    'tint-50': { lighten: 5 },
    'tint-100': { lighten: 10 },
    'tint-150': { lighten: 15 }
};

const colorLightnessVariants = {
    50: { lightness: 95 },
    100: { lightness: 90 },
    200: { lightness: 80 },
    300: { lightness: 70 },
    400: { lightness: 60 },
    500: { lightness: 50 },
    600: { lightness: 40 },
    700: { lightness: 30 },
    800: { lightness: 20 },
    900: { lightness: 10 }
};

const sizeMultiplierVariants = {
    xs: { multiply: 'var(--size-multiplier-xs)' },
    sm: { multiply: 'var(--size-multiplier-sm)' },
    md: { multiply: 'var(--size-multiplier-md)' },
    lg: { multiply: 'var(--size-multiplier-lg)' },
    xl: { multiply: 'var(--size-multiplier-xl)' }
};

const spacingVariants = {
    ...sizeMultiplierVariants,
    '1-5': { divide: 5 },
    '1-4': { divide: 4 },
    '3-4': { divide: 4, multiply: 3 },
    '1-3': { divide: 3 },
    '2-3': { divide: 3, multiply: 2 },
    '1-2': { divide: 2 },
    2: { multiply: 2 },
    3: { multiply: 3 },
    4: { multiply: 4 },
    5: { multiply: 5 }
};

export const defaultThemes = defineThemes({
    default: {
        boxShadow: {
            offsetX: 0,
            offsetY: '0.5rem',
            blurRadius: '1rem',
            spreadRadius: '-0.75rem',
            color: 'rgba(0, 0, 0, 0.15)'
        },
        border: {
            width: '1px',
            style: 'solid',
            color: 'var(--color-gray-200)'
        },
        borderRadius: {
            default: '4px',
            ...sizeMultiplierVariants
        },
        breakpoints: {
            default: '',
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
            '2xl': 1400
        },
        colors: {
            red: '#f2413d',
            orange: '#f98e5a',
            yellow: '#ffda77',
            green: '#2fb079',
            teal: '#48b4a9',
            blue: '#178bb2',
            purple: '#8268ae',
            pink: '#fc778a',
            white: '#ffffff',
            black: '#000000',
            gray: {
                default: '#8e9fa4',
                ...colorShadeAndTintVariants,
                ...colorLightnessVariants
            },
            light: {
                default: 'var(--color-gray-100)',
                ...colorShadeAndTintVariants
            },
            dark: {
                default: 'var(--color-gray-800)',
                ...colorShadeAndTintVariants
            },
            primary: {
                default: 'var(--color-blue)',
                ...colorLightnessVariants,
                ...colorShadeAndTintVariants
            },
            secondary: {
                default: 'var(--color-purple)',
                ...colorLightnessVariants,
                ...colorShadeAndTintVariants
            },
            info: {
                default: 'var(--color-teal)',
                ...colorLightnessVariants,
                ...colorShadeAndTintVariants
            },
            success: {
                default: 'var(--color-green)',
                ...colorLightnessVariants,
                ...colorShadeAndTintVariants
            },
            warning: {
                default: 'var(--color-yellow)',
                ...colorLightnessVariants,
                ...colorShadeAndTintVariants
            },
            danger: {
                default: 'var(--color-red)',
                ...colorLightnessVariants,
                ...colorShadeAndTintVariants
            }
        },
        components: {
            alert: {
                default: {
                    background: 'var(--color-info-100)',
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
                    color: 'var(--color-info-800)',
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
                        default: {
                            color: 'var(--alert--color)',
                            fontWeight: 'var(--font-weight-semibold)',
                            transition: {
                                property: 'color',
                                duration: 'var(--transition-duration)',
                                timingFunction: 'var(--transition-timing-function)'
                            }
                        },
                        hover: {
                            color: 'var(--alert--link--color)'
                        }
                    },
                    code: {
                        background: 'hsla(0, 0%, 0%, 0.05)',
                        color: 'var(--alert--color)'
                    },
                    icon: {
                        margin: {
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 'var(--alert--padding-left)'
                        }
                    },
                    dismiss: {
                        margin: {
                            top: 0,
                            right: 'var(--alert--padding-left)',
                            bottom: 0,
                            left: 0
                        }
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
            },
            badge: {
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
            },
            breadcrumb: {
                default: {
                    color: 'var(--text-color-dark)',
                    fontSize: 'var(--font-size)',
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 'var(--margin-bottom)',
                        left: 0
                    },
                    padding: {
                        top: 0,
                        right: 'var(--padding-right)',
                        bottom: 0,
                        left: 'var(--padding-left)'
                    },
                    separator: '"/"',
                    link: {
                        color: 'var(--color-primary)'
                    },
                    active: {
                        color: 'var(--color-gray-500)'
                    }
                },
                light: {
                    color: 'var(--contrast-text-color-light)'
                },
                dark: {
                    color: 'var(--contrast-text-color-dark)'
                },
                sm: {
                    fontSize: 'var(--font-size-sm)',
                    padding: {
                        top: 0,
                        right: 'var(--padding-right-sm)',
                        bottom: 0,
                        left: 'var(--padding-left-sm)'
                    }
                },
                md: {
                    fontSize: 'var(--font-size-md)',
                    padding: {
                        top: 0,
                        right: 'var(--padding-right-md)',
                        bottom: 0,
                        left: 'var(--padding-left-md)'
                    }
                },
                lg: {
                    fontSize: 'var(--font-size-lg)',
                    padding: {
                        top: 0,
                        right: 'var(--padding-right-lg)',
                        bottom: 0,
                        left: 'var(--padding-left-lg)'
                    }
                }
            },
            button: {
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
                    block: {
                        margin: {
                            top: 'var(--margin-top)',
                            right: 0,
                            bottom: 0,
                            left: 0
                        }
                    },
                    link: {
                        color: 'var(--color-primary)',
                        active: {
                            color: 'var(--color-primary-shade-100)'
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
                    active: {
                        background: 'var(--color-primary-shade-100)'
                    },
                    link: {
                        color: 'var(--color-primary)',
                        active: {
                            color: 'var(--color-primary-shade-100)'
                        }
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
                    active: {
                        background: 'var(--color-secondary-shade-100)'
                    },
                    link: {
                        color: 'var(--color-secondary)',
                        active: {
                            color: 'var(--color-secondary-shade-100)'
                        }
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
                    active: {
                        background: 'var(--color-info-shade-100)'
                    },
                    link: {
                        color: 'var(--color-info)',
                        active: {
                            color: 'var(--color-info-shade-100)'
                        }
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
                    active: {
                        background: 'var(--color-success-shade-100)'
                    },
                    link: {
                        color: 'var(--color-success)',
                        active: {
                            color: 'var(--color-success-shade-100)'
                        }
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
                    active: {
                        background: 'var(--color-warning-shade-100)'
                    },
                    link: {
                        color: 'var(--color-warning)',
                        active: {
                            color: 'var(--color-warning-shade-100)'
                        }
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
                    active: {
                        background: 'var(--color-danger-shade-100)'
                    },
                    link: {
                        color: 'var(--color-danger)',
                        active: {
                            color: 'var(--color-danger-shade-100)'
                        }
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
                    active: {
                        background: 'var(--color-light-shade-100)'
                    },
                    link: {
                        color: 'var(--color-light)',
                        active: {
                            color: 'var(--color-light-shade-100)'
                        }
                    }
                },
                dark: {
                    color: 'var(--contrast-text-color-dark)',
                    background: 'var(--color-dark)',
                    border: {
                        color: 'var(--color-dark-shade-50)'
                    },
                    hover: {
                        background: 'var(--color-dark-shade-50)'
                    },
                    active: {
                        background: 'var(--color-dark-shade-100)'
                    },
                    link: {
                        color: 'var(--color-dark)',
                        active: {
                            color: 'var(--color-dark-shade-100)'
                        }
                    }
                },
                sm: {
                    padding: {
                        top: 'calc(var(--padding-top-sm) * 3 / 4)',
                        right: 'var(--padding-right-sm)',
                        bottom: 'calc(var(--padding-bottom-sm) * 3 / 4)',
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
                        width: 'calc(34px * var(--size-multiplier-sm))',
                        height: 'calc(34px * var(--size-multiplier-sm))'
                    }
                },
                md: {
                    padding: {
                        top: 'calc(var(--padding-top-md) * 3 / 4)',
                        right: 'var(--padding-right-md)',
                        bottom: 'calc(var(--padding-bottom-md) * 3 / 4)',
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
                        width: 'calc(40px * var(--size-multiplier-md))',
                        height: 'calc(40px * var(--size-multiplier-md))'
                    }
                },
                lg: {
                    padding: {
                        top: 'calc(var(--padding-top-lg) * 3 / 4)',
                        right: 'var(--padding-right-lg)',
                        bottom: 'calc(var(--padding-bottom-lg) * 3 / 4)',
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
                    }
                }
            }
        },
        elements: {
            body: {
                background: 'var(--color-white)',
                color: 'var(--text-color-dark)',
                fontSize: 'var(--font-size)',
                fontFamily: 'var(--font-family)',
                fontWeight: 'var(--font-weight)',
                lineHeight: 'var(--line-height)',
                textAlign: 'var(--text-align)',
                transition: {
                    property: 'background-color, color',
                    duration: 'var(--transition-duration)',
                    timingFunction: 'var(--transition-timing-function)'
                }
            },
            code: {
                color: 'var(--color-pink)',
                background: 'var(--color-gray-50)',
                borderRadius: {
                    topLeft: 'var(--border-top-left-radius)',
                    topRight: 'var(--border-top-right-radius)',
                    bottomRight: 'var(--border-bottom-right-radius)',
                    bottomLeft: 'var(--border-bottom-left-radius)'
                },
                fontFamily: 'var(--font-family-monospace)',
                fontSize: 'var(--font-size)',
                padding: {
                    top: '0.15rem',
                    right: '0.45rem',
                    bottom: '0.15rem',
                    left: '0.45rem'
                }
            },
            pre: {
                fontFamily: 'var(--font-family-monospace)',
                fontSize: 'var(--font-size)',
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 'var(--margin-bottom)',
                    left: 0
                }
            },
            kbd: {
                background: 'var(--color-dark)',
                borderRadius: {
                    topLeft: 'var(--border-top-left-radius)',
                    topRight: 'var(--border-top-right-radius)',
                    bottomRight: 'var(--border-bottom-right-radius)',
                    bottomLeft: 'var(--border-bottom-left-radius)'
                },
                color: 'var(--contrast-text-color-dark)',
                fontFamily: 'var(--font-family-monospace)',
                fontSize: 'var(--font-size-sm)',
                padding: {
                    top: '0.1875rem',
                    right: '0.375rem',
                    bottom: '0.1875rem',
                    left: '0.375rem'
                }
            },
            samp: {
                fontFamily: 'var(--font-family-monospace)'
            },
            d1: {
                fontSize:
                    'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-5))'
            },
            d2: {
                fontSize:
                    'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-4))'
            },
            d3: {
                fontSize:
                    'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-3))'
            },
            d4: {
                fontSize:
                    'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-2))'
            },
            d5: {
                fontSize:
                    'calc(var(--font-size) * var(--scale-ratio-pow-5) * var(--scale-ratio-pow-1))'
            },
            d6: {
                fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5))'
            },
            h1: {
                fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-5))'
            },
            h2: {
                fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-4))'
            },
            h3: {
                fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-3))'
            },
            h4: {
                fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-2))'
            },
            h5: {
                fontSize: 'calc(var(--font-size) * var(--scale-ratio-pow-1))'
            },
            h6: {
                fontSize: 'var(--font-size)'
            }
        },
        grid: {
            columns: 12,
            gutter: {
                default: '28px',
                ...sizeMultiplierVariants
            },
            container: {
                default: '100%',
                xs: '100%',
                sm: 'calc(var(--breakpoint-sm) - var(--grid-gutter-sm))',
                md: 'calc(var(--breakpoint-md) - var(--grid-gutter-md))',
                lg: 'calc(var(--breakpoint-lg) - var(--grid-gutter-lg))',
                xl: 'calc(var(--breakpoint-xl) - var(--grid-gutter-xl))',
                '2xl': 'calc(var(--breakpoint-2xl) - var(--grid-gutter-2xl))'
            }
        },
        scaleRatios: {
            minorSecond: 1.067,
            majorSecond: 1.125,
            minorThird: 1.2,
            majorThird: 1.25,
            perfectFourth: 1.333,
            augmentedFourth: 1.414,
            perfectFifth: 1.5,
            golden: 1.618,
            default: 'var(--scale-ratio-minor-third)'
        },
        size: {
            multiplier: {
                default: 1,
                '2xs': { divide: 'var(--scale-ratio-pow-3)' },
                xs: { divide: 'var(--scale-ratio-pow-2)' },
                sm: { divide: 'var(--scale-ratio-pow-1)' },
                md: 'var(--size-multiplier)',
                lg: { multiply: 'var(--scale-ratio-pow-1)' },
                xl: { multiply: 'var(--scale-ratio-pow-2)' },
                '2xl': { multiply: 'var(--scale-ratio-pow-3)' }
            },
            percentages: {
                default: '',
                0: '0%',
                25: '25%',
                50: '50%',
                75: '75%',
                100: '100%'
            }
        },
        spacing: {
            default: '1rem',
            ...spacingVariants
        },
        margin: {
            default: 'var(--spacing)',
            ...spacingVariants
        },
        padding: {
            default: 'var(--spacing)',
            ...spacingVariants
        },
        transition: {
            duration: '300ms',
            timingFunction: 'ease'
        },
        typography: {
            color: {
                dark: 'var(--color-dark)',
                weak: 'var(--color-gray-700)',
                weaker: 'var(--color-gray-500)',
                weakest: 'var(--color-gray-300)',
                light: 'var(--color-light)'
            },
            contrastColor: {
                light: 'var(--color-gray-900)',
                dark: 'var(--color-white)'
            },
            fontFamily: {
                default: {
                    base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                    monospace:
                        "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    print: "'Georgia', 'Times New Roman', 'Times', serif"
                },
                secondary: {
                    base: 'var(--font-family-base)',
                    monospace: 'var(--font-family-monospace)',
                    print: 'var(--font-family-print)'
                }
            },
            fontSize: {
                default: '1rem',
                ...sizeMultiplierVariants
            },
            fontWeight: {
                default: 'var(--font-weight-normal)',
                extralight: 200,
                light: 300,
                normal: 'normal',
                semibold: 600,
                bold: 'bold',
                black: 900,
                lighter: 'lighter',
                bolder: 'bolder'
            },
            lineHeight: 1.5,
            letterSpacing: 0,
            textAlign: 'left'
        }
    },
    dark: {
        border: {
            color: 'var(--color-gray-700)'
        },
        typography: {
            color: {
                weak: 'var(--color-gray-300)',
                weaker: 'var(--color-gray-500)',
                weakest: 'var(--color-gray-700)'
            }
        },
        elements: {
            body: {
                background: 'var(--color-dark-shade-50)',
                color: 'var(--text-color-light)'
            },
            code: {
                background: 'var(--color-gray-900)'
            },
            kbd: {
                background: 'var(--color-light)',
                color: 'var(--contrast-text-color-light)'
            }
        }
    }
});
