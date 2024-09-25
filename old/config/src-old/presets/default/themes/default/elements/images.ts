import { defineElement } from '../../../../../utils';

export const figure = defineElement(
    {
        margin: {
            top: 0,
            right: 0,
            bottom: 'var(--margin-bottom)',
            left: 0
        },
        caption: {
            color: 'var(--text-color-weak)',
            fontSize: 'var(--font-size-sm)'
        },
        image: {
            margin: {
                top: 0,
                right: 0,
                bottom: 'var(--margin-bottom)',
                left: 0
            }
        }
    },
    {},
    { name: 'figure' }
);

export const thumbnail = defineElement({
    padding: {
        top: 'var(--padding-top)',
        right: 'var(--padding-right)',
        bottom: 'var(--padding-bottom)',
        left: 'var(--padding-left)'
    },
    background: 'var(--color-white)',
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
    transition: {
        property: 'var(--transition-property)',
        duration: 'var(--transition-duration)',
        timingFunction: 'var(--transition-timing-function)'
    },
    boxShadow: {
        offsetX: 'var(--box-shadow-offset-x)',
        offsetY: 'var(--box-shadow-offset-y)',
        blurRadius: 'var(--box-shadow-blur-radius)',
        spreadRadius: 'var(--box-shadow-spread-radius)',
        color: 'var(--box-shadow-color)'
    }
});
