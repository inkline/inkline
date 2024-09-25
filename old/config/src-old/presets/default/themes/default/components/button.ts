import { defineComponent } from '../../../../../utils';

export const button = defineComponent(
    {
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
    {
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
                top: 'calc(var(--button--padding-top) * var(--size-multiplier-sm))',
                right: 'calc(var(--button--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--button--padding-bottom) * var(--size-multiplier-sm))',
                left: 'calc(var(--button--padding-left) * var(--size-multiplier-sm))'
            },
            borderRadius: {
                topLeft: 'calc(var(--button--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight:
                    'calc(var(--button--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight:
                    'calc(var(--button--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft:
                    'calc(var(--button--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            fontSize: 'calc(var(--button--font-size) * var(--size-multiplier-sm))',
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
                top: 'calc(var(--button--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--button--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--button--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--button--padding-left) * var(--size-multiplier-md))'
            },
            borderRadius: {
                topLeft: 'calc(var(--button--border-top-left-radius) * var(--size-multiplier-md))',
                topRight:
                    'calc(var(--button--border-top-right-radius) * var(--size-multiplier-md))',
                bottomRight:
                    'calc(var(--button--border-bottom-right-radius) * var(--size-multiplier-md))',
                bottomLeft:
                    'calc(var(--button--border-bottom-left-radius) * var(--size-multiplier-md))'
            },
            fontSize: 'calc(var(--button--font-size) * var(--size-multiplier-md))',
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
                top: 'calc(var(--button--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--button--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--button--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--button--padding-left) * var(--size-multiplier-lg))'
            },
            borderRadius: {
                topLeft: 'calc(var(--button--border-top-left-radius) * var(--size-multiplier-lg))',
                topRight:
                    'calc(var(--button--border-top-right-radius) * var(--size-multiplier-lg))',
                bottomRight:
                    'calc(var(--button--border-bottom-right-radius) * var(--size-multiplier-lg))',
                bottomLeft:
                    'calc(var(--button--border-bottom-left-radius) * var(--size-multiplier-lg))'
            },
            fontSize: 'calc(var(--button--font-size) * var(--size-multiplier-lg))',
            circle: {
                width: 'calc(50px * var(--size-multiplier-lg))',
                height: 'calc(50px * var(--size-multiplier-lg))'
            },
            square: {
                width: 'calc(50px * var(--size-multiplier-lg))',
                height: 'calc(50px * var(--size-multiplier-lg))'
            }
        }
    }
);
