import { defineTransition } from '../../../../utils';

export const transition = defineTransition(
    {
        property: 'color, background-color, border-color',
        duration: '300ms',
        timingFunction: 'ease'
    },
    {
        expand: {
            property: 'height',
            duration: 'var(--transition-duration)',
            timingFunction: 'var(--transition-timing-function)'
        },
        fadeIn: {
            property: 'opacity',
            duration: 'var(--transition-duration)',
            timingFunction: 'cubic-bezier(0.55, 0, 0.1, 1)'
        },
        fadeInLinear: {
            property: 'opacity',
            duration: 'var(--transition-duration)',
            timingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        },
        slideInRight: {
            property: 'transform',
            duration: 'var(--transition-duration)',
            timingFunction: 'ease'
        },
        zoomInCenter: {
            property: 'transform, opacity',
            duration: 'var(--transition-duration)',
            timingFunction: 'cubic-bezier(0.55, 0, 0.1, 1)'
        },
        zoomInTop: {
            property: 'transform, opacity',
            duration: 'var(--transition-duration)',
            timingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        },
        zoomInRight: {
            property: 'transform, opacity',
            duration: 'var(--transition-duration)',
            timingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        },
        zoomInBottom: {
            property: 'transform, opacity',
            duration: 'var(--transition-duration)',
            timingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        },
        zoomInLeft: {
            property: 'transform, opacity',
            duration: 'var(--transition-duration)',
            timingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)'
        }
    }
);
