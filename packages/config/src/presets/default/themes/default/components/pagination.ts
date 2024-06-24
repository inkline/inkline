import { defineComponent } from '../../../../../utils';

export const pagination = defineComponent(
    {
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
                fontWeight: 'var(--font-weight-semibold)'
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
    {
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
                    color: 'var(--color-dark-tint-50)'
                },
                hover: {
                    background: 'var(--color-dark-tint-50)'
                }
            }
        },
        sm: {
            fontSize: 'calc(var(--pagination--font-size) * var(--size-multiplier-sm))',
            item: {
                borderRadius: {
                    topLeft:
                        'calc(var(--pagination--item--border-top-left-radius) * var(--size-multiplier-sm))',
                    topRight:
                        'calc(var(--pagination--item--border-top-right-radius) * var(--size-multiplier-sm))',
                    bottomRight:
                        'calc(var(--pagination--item--border-bottom-right-radius) * var(--size-multiplier-sm))',
                    bottomLeft:
                        'calc(var(--pagination--item--border-bottom-left-radius) * var(--size-multiplier-sm))'
                },
                padding: {
                    top: 'calc(var(--pagination--item--padding-top) * var(--size-multiplier-sm))',
                    right: 'calc(var(--pagination--item--padding-right) * var(--size-multiplier-sm))',
                    bottom: 'calc(var(--pagination--item--padding-bottom) * var(--size-multiplier-sm))',
                    left: 'calc(var(--pagination--item--padding-left) * var(--size-multiplier-sm))'
                },
                minWidth: '32px'
            }
        },
        md: {
            fontSize: 'calc(var(--pagination--font-size) * var(--size-multiplier-md))',
            item: {
                borderRadius: {
                    topLeft:
                        'calc(var(--pagination--item--border-top-left-radius) * var(--size-multiplier-md))',
                    topRight:
                        'calc(var(--pagination--item--border-top-right-radius) * var(--size-multiplier-md))',
                    bottomRight:
                        'calc(var(--pagination--item--border-bottom-right-radius) * var(--size-multiplier-md))',
                    bottomLeft:
                        'calc(var(--pagination--item--border-bottom-left-radius) * var(--size-multiplier-md))'
                },
                padding: {
                    top: 'calc(var(--pagination--item--padding-top) * var(--size-multiplier-md))',
                    right: 'calc(var(--pagination--item--padding-right) * var(--size-multiplier-md))',
                    bottom: 'calc(var(--pagination--item--padding-bottom) * var(--size-multiplier-md))',
                    left: 'calc(var(--pagination--item--padding-left) * var(--size-multiplier-md))'
                },
                minWidth: '40px'
            }
        },
        lg: {
            fontSize: 'calc(var(--pagination--font-size) * var(--size-multiplier-lg))',
            item: {
                borderRadius: {
                    topLeft:
                        'calc(var(--pagination--item--border-top-left-radius) * var(--size-multiplier-lg))',
                    topRight:
                        'calc(var(--pagination--item--border-top-right-radius) * var(--size-multiplier-lg))',
                    bottomRight:
                        'calc(var(--pagination--item--border-bottom-right-radius) * var(--size-multiplier-lg))',
                    bottomLeft:
                        'calc(var(--pagination--item--border-bottom-left-radius) * var(--size-multiplier-lg))'
                },
                padding: {
                    top: 'calc(var(--pagination--item--padding-top) * var(--size-multiplier-lg))',
                    right: 'calc(var(--pagination--item--padding-right) * var(--size-multiplier-lg))',
                    bottom: 'calc(var(--pagination--item--padding-bottom) * var(--size-multiplier-lg))',
                    left: 'calc(var(--pagination--item--padding-left) * var(--size-multiplier-lg))'
                },
                minWidth: '48px'
            }
        }
    }
);
