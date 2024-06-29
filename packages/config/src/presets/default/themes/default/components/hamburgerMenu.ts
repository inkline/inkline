import { defineComponent } from '../../../../../utils';

export const hamburgerMenu = defineComponent(
    {
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        transition: {
            property: 'background-color, color, border-color',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        opacity: 0.75,
        hover: {
            opacity: 1
        },
        width: 'var(--hamburger-menu--bar--width)',
        height: 'calc(var(--hamburger-menu--bar--height) * 3 + var(--hamburger-menu--bar--spacing) * 2)',
        bar: {
            borderRadius: {
                topLeft: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))',
                topRight: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))',
                bottomRight: 'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))',
                bottomLeft: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
            },
            height: '2px',
            spacing: '4px',
            transition: {
                property: 'background, transform',
                duration: '175ms',
                timingFunction: 'var(--transition-timing-function)'
            }
        }
    },
    {
        light: {
            background: 'var(--color-dark)'
        },
        dark: {
            background: 'var(--color-light)'
        },
        sm: {
            width: 'var(--hamburger-menu--sm--bar--width)',
            height: 'calc(var(--hamburger-menu--sm--bar--height) * 3 + var(--hamburger-menu--sm--bar--spacing) * 2)',
            bar: {
                width: 'calc(30px * var(--size-multiplier-sm))',
                height: '2px',
                spacing: '4px',
                borderRadius: {
                    topLeft: '1px',
                    topRight: '1px',
                    bottomRight: '1px',
                    bottomLeft: '1px'
                }
            }
        },
        md: {
            width: 'var(--hamburger-menu--md--bar--width)',
            height: 'calc(var(--hamburger-menu--md--bar--height) * 3 + var(--hamburger-menu--md--bar--spacing) * 2)',
            bar: {
                width: 'calc(30px * var(--size-multiplier-md))',
                height: '3px',
                spacing: '5px',
                borderRadius: {
                    topLeft: '2px',
                    topRight: '2px',
                    bottomRight: '2px',
                    bottomLeft: '2px'
                }
            }
        },
        lg: {
            width: 'var(--hamburger-menu--lg--bar--width)',
            height: 'calc(var(--hamburger-menu--lg--bar--height) * 3 + var(--hamburger-menu--lg--bar--spacing) * 2)',
            bar: {
                width: 'calc(30px * var(--size-multiplier-lg))',
                height: '4px',
                spacing: '6px',
                borderRadius: {
                    topLeft: '3px',
                    topRight: '3px',
                    bottomRight: '3px',
                    bottomLeft: '3px'
                }
            }
        }
    }
);
