import { defineComponent } from '../../../../../utils';

export const navbar = defineComponent(
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
        item: {
            background: 'var(--color-white)',
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
        brand: {
            margin: {
                right: 'var(--margin-right)'
            }
        },
        collapsible: {
            transition: {
                property: 'height, background-color, color, border-color'
            }
        },
        collapsed: {
            margin: {
                top: 'var(--margin-top)'
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
            item: {
                background: 'var(--color-white)',
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
            collapsed: {
                background: 'var(--color-white)',
                item: {
                    background: 'var(--color-white)',
                    hover: {
                        background: 'var(--color-light)'
                    },
                    focus: {
                        background: 'var(--color-light)'
                    },
                    active: {
                        background: 'var(--color-light-shade-50)'
                    }
                }
            }
        },
        dark: {
            background: 'var(--color-dark)',
            border: {
                color: 'var(--color-dark-tint-50)'
            },
            color: 'var(--contrast-text-color-dark)',
            item: {
                background: 'var(--color-dark)',
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
            collapsed: {
                background: 'var(--color-dark)',
                item: {
                    background: 'var(--color-dark)',
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
            }
        },
        sm: {
            borderRadius: {
                topLeft: 'calc(var(--navbar--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight:
                    'calc(var(--navbar--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight:
                    'calc(var(--navbar--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft:
                    'calc(var(--navbar--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            fontSize: 'calc(var(--navbar--font-size) * var(--size-multiplier-sm))',
            padding: {
                top: 'calc(var(--navbar--padding-top) * var(--size-multiplier-sm))',
                right: 'calc(var(--navbar--padding-right) * var(--size-multiplier-sm))',
                bottom: 'calc(var(--navbar--padding-bottom) * var(--size-multiplier-sm))',
                left: 'calc(var(--navbar--padding-left) * var(--size-multiplier-sm))'
            },
            brand: {
                padding: {
                    top: 'calc(var(--navbar--padding-top) * var(--size-multiplier-sm) * 0.5)',
                    right: 'calc(var(--navbar--padding-right) * var(--size-multiplier-sm))',
                    bottom: 'calc(var(--navbar--padding-bottom) * var(--size-multiplier-sm) * 0.5)',
                    left: 'calc(var(--navbar--padding-left) * var(--size-multiplier-sm))'
                }
            },
            item: {
                padding: {
                    top: 'calc(var(--navbar--padding-top) * var(--size-multiplier-sm) * 0.5)',
                    right: 'calc(var(--navbar--padding-right) * var(--size-multiplier-sm))',
                    bottom: 'calc(var(--navbar--padding-bottom) * var(--size-multiplier-sm) * 0.5)',
                    left: 'calc(var(--navbar--padding-left) * var(--size-multiplier-sm))'
                }
            }
        },
        md: {
            borderRadius: {
                topLeft: 'calc(var(--navbar--border-top-left-radius) * var(--size-multiplier-md))',
                topRight:
                    'calc(var(--navbar--border-top-right-radius) * var(--size-multiplier-md))',
                bottomRight:
                    'calc(var(--navbar--border-bottom-right-radius) * var(--size-multiplier-md))',
                bottomLeft:
                    'calc(var(--navbar--border-bottom-left-radius) * var(--size-multiplier-md))'
            },
            fontSize: 'calc(var(--navbar--font-size) * var(--size-multiplier-md))',
            padding: {
                top: 'calc(var(--navbar--padding-top) * var(--size-multiplier-md))',
                right: 'calc(var(--navbar--padding-right) * var(--size-multiplier-md))',
                bottom: 'calc(var(--navbar--padding-bottom) * var(--size-multiplier-md))',
                left: 'calc(var(--navbar--padding-left) * var(--size-multiplier-md))'
            },
            brand: {
                padding: {
                    top: 'calc(var(--navbar--padding-top) * var(--size-multiplier-md) * 0.5)',
                    right: 'calc(var(--navbar--padding-right) * var(--size-multiplier-md))',
                    bottom: 'calc(var(--navbar--padding-bottom) * var(--size-multiplier-md) * 0.5)',
                    left: 'calc(var(--navbar--padding-left) * var(--size-multiplier-md))'
                }
            },
            item: {
                padding: {
                    top: 'calc(var(--navbar--padding-top) * var(--size-multiplier-md) * 0.5)',
                    right: 'calc(var(--navbar--padding-right) * var(--size-multiplier-md))',
                    bottom: 'calc(var(--navbar--padding-bottom) * var(--size-multiplier-md) * 0.5)',
                    left: 'calc(var(--navbar--padding-left) * var(--size-multiplier-md))'
                }
            }
        },
        lg: {
            borderRadius: {
                topLeft: 'calc(var(--navbar--border-top-left-radius) * var(--size-multiplier-lg))',
                topRight:
                    'calc(var(--navbar--border-top-right-radius) * var(--size-multiplier-lg))',
                bottomRight:
                    'calc(var(--navbar--border-bottom-right-radius) * var(--size-multiplier-lg))',
                bottomLeft:
                    'calc(var(--navbar--border-bottom-left-radius) * var(--size-multiplier-lg))'
            },
            fontSize: 'calc(var(--navbar--font-size) * var(--size-multiplier-lg))',
            padding: {
                top: 'calc(var(--navbar--padding-top) * var(--size-multiplier-lg))',
                right: 'calc(var(--navbar--padding-right) * var(--size-multiplier-lg))',
                bottom: 'calc(var(--navbar--padding-bottom) * var(--size-multiplier-lg))',
                left: 'calc(var(--navbar--padding-left) * var(--size-multiplier-lg))'
            },
            brand: {
                padding: {
                    top: 'calc(var(--navbar--padding-top) * var(--size-multiplier-lg) * 0.5)',
                    right: 'calc(var(--navbar--padding-right) * var(--size-multiplier-lg))',
                    bottom: 'calc(var(--navbar--padding-bottom) * var(--size-multiplier-lg) * 0.5)',
                    left: 'calc(var(--navbar--padding-left) * var(--size-multiplier-lg))'
                }
            },
            item: {
                padding: {
                    top: 'calc(var(--navbar--padding-top) * var(--size-multiplier-lg) * 0.5)',
                    right: 'calc(var(--navbar--padding-right) * var(--size-multiplier-lg))',
                    bottom: 'calc(var(--navbar--padding-bottom) * var(--size-multiplier-lg) * 0.5)',
                    left: 'calc(var(--navbar--padding-left) * var(--size-multiplier-lg))'
                }
            }
        }
    }
);
