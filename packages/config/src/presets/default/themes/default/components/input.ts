import { defineComponent } from '../../../../../utils';

export const input = defineComponent(
    {
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
        lineHeight: 'var(--line-height)',
        transition: {
            property: 'background-color, color, border-color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        padding: {
            top: 'calc(var(--padding-top) * 3 / 4)',
            right: 'var(--padding-right)',
            bottom: 'calc(var(--padding-bottom) * 3 / 4)',
            left: 'var(--padding-left)'
        },
        placeholder: {
            color: 'var(--text-color-weaker)'
        },
        icon: {
            width: 'auto',
            height: '1rem',
            color: 'var(--text-color-weak)'
        },
        error: {
            border: {
                color: 'var(--color-danger)'
            }
        },
        disabled: {
            background: 'var(--color-light)'
        },
        focus: {
            border: {
                color: 'var(--color-primary)'
            }
        },
        prefix: {
            color: 'var(--text-color-weaker)'
        },
        suffix: {
            color: 'var(--text-color-weaker)'
        }
    },
    {
        light: {
            background: 'var(--color-white)',
            border: {
                color: 'var(--color-light-shade-50)'
            },
            color: 'var(--contrast-text-color-light)',
            disabled: {
                background: 'var(--color-light)'
            },
            hover: {
                border: {
                    color: 'var(--color-light-shade-100)'
                }
            },
            prepend: {
                background: 'var(--color-light)'
            },
            append: {
                background: 'var(--color-light)'
            }
        },
        dark: {
            background: 'var(--color-dark)',
            border: {
                color: 'var(--color-dark-tint-50)'
            },
            color: 'var(--contrast-text-color-dark)',
            disabled: {
                background: 'var(--color-dark-tint-100)'
            },
            hover: {
                border: {
                    color: 'var(--color-dark-tint-100)'
                }
            },
            prepend: {
                background: 'var(--color-dark-shade-50)'
            },
            append: {
                background: 'var(--color-dark-shade-50)'
            }
        },
        sm: {
            borderRadius: {
                topLeft: 'calc(var(--input--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight: 'calc(var(--input--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight:
                    'calc(var(--input--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft:
                    'calc(var(--input--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            fontSize: 'calc(var(--input--font-size) * var(--size-multiplier-sm))',
            padding: {
                top: 'calc(var(--input--padding-top) * var(--size-multiplier-sm))',
                right: 'calc(var(--input--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--input--padding-bottom) * var(--size-multiplier-sm))',
                left: 'calc(var(--input--padding-left) * var(--size-multiplier-sm))'
            },
            icon: {
                height: 'calc(1rem * var(--size-multiplier-sm))'
            }
        },
        md: {
            borderRadius: {
                topLeft: 'calc(var(--input--border-top-left-radius) * var(--size-multiplier-md))',
                topRight: 'calc(var(--input--border-top-right-radius) * var(--size-multiplier-md))',
                bottomRight:
                    'calc(var(--input--border-bottom-right-radius) * var(--size-multiplier-md))',
                bottomLeft:
                    'calc(var(--input--border-bottom-left-radius) * var(--size-multiplier-md))'
            },
            fontSize: 'calc(var(--input--font-size) * var(--size-multiplier-md))',
            padding: {
                top: 'calc(var(--input--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--input--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--input--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--input--padding-left) * var(--size-multiplier-md))'
            },
            icon: {
                height: 'calc(1rem * var(--size-multiplier-md))'
            }
        },
        lg: {
            borderRadius: {
                topLeft: 'calc(var(--input--border-top-left-radius) * var(--size-multiplier-lg))',
                topRight: 'calc(var(--input--border-top-right-radius) * var(--size-multiplier-lg))',
                bottomRight:
                    'calc(var(--input--border-bottom-right-radius) * var(--size-multiplier-lg))',
                bottomLeft:
                    'calc(var(--input--border-bottom-left-radius) * var(--size-multiplier-lg))'
            },
            fontSize: 'calc(var(--input--font-size) * var(--size-multiplier-lg))',
            padding: {
                top: 'calc(var(--input--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--input--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--input--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--input--padding-left) * var(--size-multiplier-lg))'
            },
            icon: {
                height: 'calc(1rem * var(--size-multiplier-lg))'
            }
        }
    }
);
