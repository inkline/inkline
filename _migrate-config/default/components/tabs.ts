import { defineComponent } from '../../../../../utils';

export const tabs = defineComponent(
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
            margin: {
                top: 0,
                right: 0,
                bottom: 'var(--margin-bottom)',
                left: 0
            }
        },
        title: {
            background: 'var(--color-white)',
            border: {
                top: {
                    width: 0,
                    style: 'var(--border-top-style)',
                    color: 'var(--border-top-color)'
                },
                right: {
                    width: 'var(--border-right-width)',
                    style: 'var(--border-right-style)',
                    color: 'var(--border-right-color)'
                },
                bottom: {
                    width: 0,
                    style: 'var(--border-bottom-style)',
                    color: 'var(--border-bottom-color)'
                },
                left: {
                    width: 0,
                    style: 'var(--border-left-style)',
                    color: 'var(--border-left-color)'
                }
            },
            hover: {
                background: 'var(--color-light-shade-50)'
            },
            focus: {
                background: 'var(--color-light-shade-50)'
            },
            active: {
                background: 'var(--color-light)',
                fontWeight: 'var(--font-weight-semibold)'
            }
        }
    },
    {
        light: {
            background: 'var(--color-white)',
            border: {
                color: 'var(--color-light-shade-50)'
            },
            color: 'var(--contrast-text-color-light)',
            title: {
                background: 'var(--color-white)',
                border: {
                    color: 'var(--color-light-shade-50)'
                },
                focus: {
                    background: 'var(--color-light)'
                },
                hover: {
                    background: 'var(--color-light)'
                },
                active: {
                    background: 'var(--color-light-shade-50)'
                }
            }
        },
        dark: {
            background: 'var(--color-dark)',
            border: {
                color: 'var(--color-dark-tint-50)'
            },
            color: 'var(--contrast-text-color-dark)',
            title: {
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
            }
        },
        sm: {
            borderRadius: {
                topLeft: 'calc(var(--tabs--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight: 'calc(var(--tabs--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight:
                    'calc(var(--tabs--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft:
                    'calc(var(--tabs--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            fontSize: 'calc(var(--tabs--font-size) * var(--size-multiplier-sm))',
            padding: {
                top: 'calc(var(--tabs--padding-top) * var(--size-multiplier-sm))',
                right: 'calc(var(--tabs--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--tabs--padding-bottom) * var(--size-multiplier-sm))',
                left: 'calc(var(--tabs--padding-left) * var(--size-multiplier-sm))'
            }
        },
        md: {
            borderRadius: {
                topLeft: 'calc(var(--tabs--border-top-left-radius) * var(--size-multiplier-md))',
                topRight: 'calc(var(--tabs--border-top-right-radius) * var(--size-multiplier-md))',
                bottomRight:
                    'calc(var(--tabs--border-bottom-right-radius) * var(--size-multiplier-md))',
                bottomLeft:
                    'calc(var(--tabs--border-bottom-left-radius) * var(--size-multiplier-md))'
            },
            fontSize: 'calc(var(--tabs--font-size) * var(--size-multiplier-md))',
            padding: {
                top: 'calc(var(--tabs--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--tabs--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--tabs--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--tabs--padding-left) * var(--size-multiplier-md))'
            }
        },
        lg: {
            borderRadius: {
                topLeft: 'calc(var(--tabs--border-top-left-radius) * var(--size-multiplier-lg))',
                topRight: 'calc(var(--tabs--border-top-right-radius) * var(--size-multiplier-lg))',
                bottomRight:
                    'calc(var(--tabs--border-bottom-right-radius) * var(--size-multiplier-lg))',
                bottomLeft:
                    'calc(var(--tabs--border-bottom-left-radius) * var(--size-multiplier-lg))'
            },
            fontSize: 'calc(var(--tabs--font-size) * var(--size-multiplier-lg))',
            padding: {
                top: 'calc(var(--tabs--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--tabs--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--tabs--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--tabs--padding-left) * var(--size-multiplier-lg))'
            }
        }
    }
);
