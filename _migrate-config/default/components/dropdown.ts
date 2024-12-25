import { defineComponent } from '../../../../../utils';

export const dropdown = defineComponent(
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
        },
        divider: {
            margin: {
                top: 'calc(var(--margin-top) * 1 / 2)',
                right: 'calc(var(--padding-right) * -1)',
                bottom: 'calc(var(--margin-bottom) * 1 / 2)',
                left: 'calc(var(--padding-left) * -1)'
            },
            background: 'var(--text-color-weaker)'
        }
    },
    {
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
                topLeft:
                    'calc(var(--dropdown--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight:
                    'calc(var(--dropdown--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight:
                    'calc(var(--dropdown--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft:
                    'calc(var(--dropdown--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            fontSize: 'calc(var(--dropdown--font-size) * var(--size-multiplier-sm))',
            padding: {
                top: 'calc(var(--dropdown--padding-top) * var(--size-multiplier-sm))',
                right: 'calc(var(--dropdown--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--dropdown--padding-bottom) * var(--size-multiplier-sm))',
                left: 'calc(var(--dropdown--padding-left) * var(--size-multiplier-sm))'
            }
        },
        md: {
            borderRadius: {
                topLeft:
                    'calc(var(--dropdown--border-top-left-radius) * var(--size-multiplier-md))',
                topRight:
                    'calc(var(--dropdown--border-top-right-radius) * var(--size-multiplier-md))',
                bottomRight:
                    'calc(var(--dropdown--border-bottom-right-radius) * var(--size-multiplier-md))',
                bottomLeft:
                    'calc(var(--dropdown--border-bottom-left-radius) * var(--size-multiplier-md))'
            },
            fontSize: 'calc(var(--dropdown--font-size) * var(--size-multiplier-md))',
            padding: {
                top: 'calc(var(--dropdown--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--dropdown--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--dropdown--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--dropdown--padding-left) * var(--size-multiplier-md))'
            }
        },
        lg: {
            borderRadius: {
                topLeft:
                    'calc(var(--dropdown--border-top-left-radius) * var(--size-multiplier-lg))',
                topRight:
                    'calc(var(--dropdown--border-top-right-radius) * var(--size-multiplier-lg))',
                bottomRight:
                    'calc(var(--dropdown--border-bottom-right-radius) * var(--size-multiplier-lg))',
                bottomLeft:
                    'calc(var(--dropdown--border-bottom-left-radius) * var(--size-multiplier-lg))'
            },
            fontSize: 'calc(var(--dropdown--font-size) * var(--size-multiplier-lg))',
            padding: {
                top: 'calc(var(--dropdown--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--dropdown--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--dropdown--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--dropdown--padding-left) * var(--size-multiplier-lg))'
            }
        }
    }
);

export const dropdownItem = defineComponent(
    {
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
    {
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
            fontSize: 'calc(var(--dropdown-item--font-size) * var(--size-multiplier-sm))',
            margin: {
                right: 'calc(var(--dropdown-item--padding-right) * var(--size-multiplier-sm))',
                left: 'calc(var(--dropdown-item--padding-left) * var(--size-multiplier-sm))'
            },
            padding: {
                top: 'calc(var(--dropdown-item--padding-top) * var(--size-multiplier-sm))',
                right: 'calc(var(--dropdown-item--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--dropdown-item--padding-bottom) * var(--size-multiplier-sm))',
                left: 'calc(var(--dropdown-item--padding-left) * var(--size-multiplier-sm))'
            }
        },
        md: {
            fontSize: 'calc(var(--dropdown-item--font-size) * var(--size-multiplier-md))',
            margin: {
                right: 'calc(var(--dropdown-item--padding-right) * var(--size-multiplier-md))',
                left: 'calc(var(--dropdown-item--padding-left) * var(--size-multiplier-md))'
            },
            padding: {
                top: 'calc(var(--dropdown-item--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--dropdown-item--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--dropdown-item--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--dropdown-item--padding-left) * var(--size-multiplier-md))'
            }
        },
        lg: {
            fontSize: 'calc(var(--dropdown-item--font-size) * var(--size-multiplier-lg))',
            margin: {
                right: 'calc(var(--dropdown-item--padding-right) * var(--size-multiplier-lg))',
                left: 'calc(var(--dropdown-item--padding-left) * var(--size-multiplier-lg))'
            },
            padding: {
                top: 'calc(var(--dropdown-item--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--dropdown-item--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--dropdown-item--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--dropdown-item--padding-left) * var(--size-multiplier-lg))'
            }
        }
    }
);
