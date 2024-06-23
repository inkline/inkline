import { defineComponent } from '../../../../../utils';

export const select = defineComponent(
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
            top: 'var(--padding-top)',
            right: 'var(--padding-right)',
            bottom: 'var(--padding-bottom)',
            left: 'var(--padding-left)'
        },
        minWidth: '240px',
        maxWidth: '90vw',
        maxHeight: '300px',
        zIndex: 2000,
        arrow: {
            size: '6px'
        },
        caret: {
            width: '1rem',
            height: '1rem',
            color: 'var(--text-color-weak)',
            spacing: 'var(--margin-right)'
        },
        error: {
            border: {
                color: 'var(--color-danger)'
            }
        },
        header: {
            border: {
                bottom: {
                    width: 0
                }
            }
        },
        body: {
            padding: {
                left: 0,
                right: 0
            }
        },
        footer: {
            border: {
                top: {
                    width: 0
                }
            }
        },
        divider: {
            background: 'var(--text-color-weaker)'
        },
        option: {}
    },
    {
        light: {
            background: 'var(--color-white)',
            border: {
                color: 'var(--color-light-shade-50)'
            },
            color: 'var(--contrast-text-color-light)',
            option: {
                disabled: {
                    color: 'var(--text-color-weaker)'
                },
                hover: {
                    background: 'var(--color-light)'
                },
                active: {
                    background: 'var(--color-light-shade-50)'
                }
            },
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
            option: {
                disabled: {
                    color: 'var(--text-color-weaker)'
                },
                hover: {
                    background: 'var(--color-dark-tint-50)'
                },
                active: {
                    background: 'var(--color-dark-tint-100)'
                }
            },
            header: {
                background: 'var(--color-dark-shade-50)'
            },
            footer: {
                background: 'var(--color-dark-shade-50)'
            }
        },
        sm: {
            borderRadius: {
                topLeft: 'calc(var(--select--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight:
                    'calc(var(--select--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight:
                    'calc(var(--select--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft:
                    'calc(var(--select--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            fontSize: 'calc(var(--select--font-size) * var(--size-multiplier-sm))',
            padding: {
                top: 'calc(var(--select--padding-top) * var(--size-multiplier-sm) * 3 / 4)',
                right: 'calc(var(--select--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-sm) * 3 / 4)',
                left: 'calc(var(--select--padding-left) * var(--size-multiplier-sm))'
            },
            caret: {
                spacing: 'calc(var(--select--margin-right) * var(--size-multiplier-sm))'
            },
            header: {
                padding: {
                    top: 'calc(var(--select--padding-top) * var(--size-multiplier-sm) * 3 / 4)',
                    bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-sm) * 3 / 4)'
                }
            },
            option: {
                padding: {
                    top: 'calc(var(--select--padding-top) * var(--size-multiplier-sm) * 0.5)',
                    bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-sm) * 0.5)'
                }
            },
            footer: {
                padding: {
                    top: 'calc(var(--select--padding-top) * var(--size-multiplier-sm) * 3 / 4)',
                    bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-sm) * 3 / 4)'
                }
            }
        },
        md: {
            borderRadius: {
                topLeft: 'calc(var(--select--border-top-left-radius) * var(--size-multiplier-md))',
                topRight:
                    'calc(var(--select--border-top-right-radius) * var(--size-multiplier-md))',
                bottomRight:
                    'calc(var(--select--border-bottom-right-radius) * var(--size-multiplier-md))',
                bottomLeft:
                    'calc(var(--select--border-bottom-left-radius) * var(--size-multiplier-md))'
            },
            fontSize: 'calc(var(--select--font-size) * var(--size-multiplier-md))',
            padding: {
                top: 'calc(var(--select--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--select--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--select--padding-left) * var(--size-multiplier-md))'
            },
            caret: {
                spacing: 'calc(var(--select--margin-right) * var(--size-multiplier-md))'
            },
            header: {
                padding: {
                    top: 'calc(var(--select--padding-top) * var(--size-multiplier-md))',
                    bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-md))'
                }
            },
            option: {
                padding: {
                    top: 'calc(var(--select--padding-top) * var(--size-multiplier-md) * 0.5)',
                    bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-md) * 0.5)'
                }
            },
            footer: {
                padding: {
                    top: 'calc(var(--select--padding-top) * var(--size-multiplier-md))',
                    bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-md))'
                }
            }
        },
        lg: {
            borderRadius: {
                topLeft: 'calc(var(--select--border-top-left-radius) * var(--size-multiplier-lg))',
                topRight:
                    'calc(var(--select--border-top-right-radius) * var(--size-multiplier-lg))',
                bottomRight:
                    'calc(var(--select--border-bottom-right-radius) * var(--size-multiplier-lg))',
                bottomLeft:
                    'calc(var(--select--border-bottom-left-radius) * var(--size-multiplier-lg))'
            },
            fontSize: 'calc(var(--select--font-size) * var(--size-multiplier-lg))',
            padding: {
                top: 'calc(var(--select--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--select--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--select--padding-left) * var(--size-multiplier-lg))'
            },
            caret: {
                spacing: 'calc(var(--select--margin-right) * var(--size-multiplier-lg))'
            },
            header: {
                padding: {
                    top: 'calc(var(--select--padding-top) * var(--size-multiplier-lg))',
                    bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-lg))'
                }
            },
            option: {
                padding: {
                    top: 'calc(var(--select--padding-top) * var(--size-multiplier-lg) * 0.5)',
                    bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-lg) * 0.5)'
                }
            },
            footer: {
                padding: {
                    top: 'calc(var(--select--padding-top) * var(--size-multiplier-lg))',
                    bottom: 'calc(var(--select--padding-bottom) * var(--size-multiplier-lg))'
                }
            }
        }
    }
);
