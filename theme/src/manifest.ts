import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = [
    {
        css: {
            namespace: 'a',
            variables: [
                {
                    name: '--a--color',
                    value: 'var(--color-primary-500)'
                },
                {
                    name: '--a--text-decoration',
                    value: 'none'
                },
                {
                    name: '--a--hover--color',
                    value: 'var(--color-primary-600)'
                },
                {
                    name: '--a--hover--text-decoration',
                    value: 'underline'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'address',
            variables: [
                {
                    name: '--address--margin-top',
                    value: '0'
                },
                {
                    name: '--address--margin-right',
                    value: '0'
                },
                {
                    name: '--address--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--address--margin-left',
                    value: '0'
                },
                {
                    name: '--address--margin',
                    value: 'var(--address--margin-top) var(--address--margin-right) var(--address--margin-bottom) var(--address--margin-left)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'body',
            variables: [
                {
                    name: '--body--color',
                    value: 'var(--text-color)'
                },
                {
                    name: '--body--font-size',
                    value: 'var(--font-size)'
                },
                {
                    name: '--body--font-family',
                    value: 'var(--font-family-base)'
                },
                {
                    name: '--body--line-height',
                    value: 'var(--line-height)'
                },
                {
                    name: '--body--letter-spacing',
                    value: 'var(--letter-spacing)'
                },
                {
                    name: '--body--text-align',
                    value: 'var(--text-align-left)'
                },
                {
                    name: '--body--transition-property',
                    value: 'var(--transition-property)'
                },
                {
                    name: '--body--transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--body--transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--body--transition',
                    value: 'var(--body--transition-property) var(--body--transition-duration) var(--body--transition-timing-function)'
                },
                {
                    name: '--body--background',
                    value: 'var(--color-white)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'caption',
            variables: [
                {
                    name: '--caption--color',
                    value: 'var(--text-color-weaker)'
                },
                {
                    name: '--caption--padding-top',
                    value: 'var(--spacing)'
                },
                {
                    name: '--caption--padding-right',
                    value: '0'
                },
                {
                    name: '--caption--padding-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--caption--padding-left',
                    value: '0'
                },
                {
                    name: '--caption--padding',
                    value: 'var(--caption--padding-top) var(--caption--padding-right) var(--caption--padding-bottom) var(--caption--padding-left)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'code',
            variables: [
                {
                    name: '--code--color',
                    value: 'var(--color-pink)'
                },
                {
                    name: '--code--font-size',
                    value: 'inherit'
                },
                {
                    name: '--code--font-family',
                    value: 'var(--font-family-monospace)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'dl',
            variables: [
                {
                    name: '--dl--margin-top',
                    value: '0'
                },
                {
                    name: '--dl--margin-right',
                    value: '0'
                },
                {
                    name: '--dl--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--dl--margin-left',
                    value: '0'
                },
                {
                    name: '--dl--margin',
                    value: 'var(--dl--margin-top) var(--dl--margin-right) var(--dl--margin-bottom) var(--dl--margin-left)'
                },
                {
                    name: '--dl--dt--font-weight',
                    value: 'var(--font-weight-bold)'
                },
                {
                    name: '--dl--dd--margin-top',
                    value: '0'
                },
                {
                    name: '--dl--dd--margin-right',
                    value: '0'
                },
                {
                    name: '--dl--dd--margin-bottom',
                    value: 'var(--spacing-xs)'
                },
                {
                    name: '--dl--dd--margin-left',
                    value: '0'
                },
                {
                    name: '--dl--dd--margin',
                    value: 'var(--dl--dd--margin-top) var(--dl--dd--margin-right) var(--dl--dd--margin-bottom) var(--dl--dd--margin-left)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'heading',
            variables: [
                {
                    name: '--heading--margin-top',
                    value: '0'
                },
                {
                    name: '--heading--margin-right',
                    value: '0'
                },
                {
                    name: '--heading--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--heading--margin-left',
                    value: '0'
                },
                {
                    name: '--heading--margin',
                    value: 'var(--heading--margin-top) var(--heading--margin-right) var(--heading--margin-bottom) var(--heading--margin-left)'
                },
                {
                    name: '--heading--font-family',
                    value: 'var(--font-family-base-secondary)'
                },
                {
                    name: '--heading--font-style',
                    value: 'var(--font-style-normal)'
                },
                {
                    name: '--heading--font-weight',
                    value: 'var(--font-weight-bold)'
                },
                {
                    name: '--heading--line-height',
                    value: '1.2'
                },
                {
                    name: '--h1--font-size',
                    value: 'var(--font-size-4xl)'
                },
                {
                    name: '--h2--font-size',
                    value: 'var(--font-size-3xl)'
                },
                {
                    name: '--h3--font-size',
                    value: 'var(--font-size-2xl)'
                },
                {
                    name: '--h4--font-size',
                    value: 'var(--font-size-xl)'
                },
                {
                    name: '--h5--font-size',
                    value: 'var(--font-size-lg)'
                },
                {
                    name: '--h6--font-size',
                    value: 'var(--font-size-md)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'hr',
            variables: [
                {
                    name: '--hr--border-top-width',
                    value: 'var(--border-top-width)'
                },
                {
                    name: '--hr--border-top-style',
                    value: 'var(--border-top-style)'
                },
                {
                    name: '--hr--border-top-color',
                    value: 'var(--border-top-color)'
                },
                {
                    name: '--hr--border-right-width',
                    value: '0'
                },
                {
                    name: '--hr--border-right-style',
                    value: 'none'
                },
                {
                    name: '--hr--border-right-color',
                    value: 'currentColor'
                },
                {
                    name: '--hr--border-bottom-width',
                    value: '0'
                },
                {
                    name: '--hr--border-bottom-style',
                    value: 'none'
                },
                {
                    name: '--hr--border-bottom-color',
                    value: 'currentColor'
                },
                {
                    name: '--hr--border-left-width',
                    value: '0'
                },
                {
                    name: '--hr--border-left-style',
                    value: 'none'
                },
                {
                    name: '--hr--border-left-color',
                    value: 'currentColor'
                },
                {
                    name: '--hr--border-width',
                    value: 'var(--hr--border-top-width) var(--hr--border-right-width) var(--hr--border-bottom-width) var(--hr--border-left-width)'
                },
                {
                    name: '--hr--border-style',
                    value: 'var(--hr--border-top-style) var(--hr--border-right-style) var(--hr--border-bottom-style) var(--hr--border-left-style)'
                },
                {
                    name: '--hr--border-color',
                    value: 'var(--hr--border-top-color) var(--hr--border-right-color) var(--hr--border-bottom-color) var(--hr--border-left-color)'
                },
                {
                    name: '--hr--border-top',
                    value: 'var(--hr--border-top-width) var(--hr--border-top-style) var(--hr--border-top-color)'
                },
                {
                    name: '--hr--border-right',
                    value: 'var(--hr--border-right-width) var(--hr--border-right-style) var(--hr--border-right-color)'
                },
                {
                    name: '--hr--border-bottom',
                    value: 'var(--hr--border-bottom-width) var(--hr--border-bottom-style) var(--hr--border-bottom-color)'
                },
                {
                    name: '--hr--border-left',
                    value: 'var(--hr--border-left-width) var(--hr--border-left-style) var(--hr--border-left-color)'
                },
                {
                    name: '--hr--border',
                    value: 'var(--hr--border-top-width) var(--hr--border-top-style) var(--hr--border-top-color)'
                },
                {
                    name: '--hr--margin-top',
                    value: 'var(--spacing)'
                },
                {
                    name: '--hr--margin-right',
                    value: '0'
                },
                {
                    name: '--hr--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--hr--margin-left',
                    value: '0'
                },
                {
                    name: '--hr--margin',
                    value: 'var(--hr--margin-top) var(--hr--margin-right) var(--hr--margin-bottom) var(--hr--margin-left)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'kbd',
            variables: [
                {
                    name: '--kbd--background',
                    value: 'var(--color-dark)'
                },
                {
                    name: '--kbd--border-top-left-radius',
                    value: 'var(--border-top-left-radius)'
                },
                {
                    name: '--kbd--border-top-right-radius',
                    value: 'var(--border-top-right-radius)'
                },
                {
                    name: '--kbd--border-bottom-right-radius',
                    value: 'var(--border-bottom-right-radius)'
                },
                {
                    name: '--kbd--border-bottom-left-radius',
                    value: 'var(--border-bottom-left-radius)'
                },
                {
                    name: '--kbd--border-radius',
                    value: 'var(--kbd--border-top-left-radius) var(--kbd--border-top-right-radius) var(--kbd--border-bottom-right-radius) var(--kbd--border-bottom-left-radius)'
                },
                {
                    name: '--kbd--color',
                    value: 'var(--contrast-text-color-dark)'
                },
                {
                    name: '--kbd--font-family',
                    value: 'var(--font-family-monospace)'
                },
                {
                    name: '--kbd--font-size',
                    value: 'var(--font-size-sm)'
                },
                {
                    name: '--kbd--padding-top',
                    value: 'calc(var(--spacing) * 0.1875)'
                },
                {
                    name: '--kbd--padding-right',
                    value: 'calc(var(--spacing) * 0.375)'
                },
                {
                    name: '--kbd--padding-bottom',
                    value: 'calc(var(--spacing) * 0.1875)'
                },
                {
                    name: '--kbd--padding-left',
                    value: 'calc(var(--spacing) * 0.375)'
                },
                {
                    name: '--kbd--padding',
                    value: 'var(--kbd--padding-top) var(--kbd--padding-right) var(--kbd--padding-bottom) var(--kbd--padding-left)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'legend',
            variables: [
                {
                    name: '--legend--margin-top',
                    value: '0'
                },
                {
                    name: '--legend--margin-right',
                    value: '0'
                },
                {
                    name: '--legend--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--legend--margin-left',
                    value: '0'
                },
                {
                    name: '--legend--margin',
                    value: 'var(--legend--margin-top) var(--legend--margin-right) var(--legend--margin-bottom) var(--legend--margin-left)'
                },
                {
                    name: '--legend--font-size',
                    value: 'var(--font-size-lg)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'mark',
            variables: [
                {
                    name: '--mark--background',
                    value: 'var(--color-yellow)'
                },
                {
                    name: '--mark--padding-top',
                    value: 'calc(var(--spacing) * 0.1875)'
                },
                {
                    name: '--mark--padding-right',
                    value: 'calc(var(--spacing) * 0.375)'
                },
                {
                    name: '--mark--padding-bottom',
                    value: 'calc(var(--spacing) * 0.1875)'
                },
                {
                    name: '--mark--padding-left',
                    value: 'calc(var(--spacing) * 0.375)'
                },
                {
                    name: '--mark--padding',
                    value: 'var(--mark--padding-top) var(--mark--padding-right) var(--mark--padding-bottom) var(--mark--padding-left)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'ol',
            variables: [
                {
                    name: '--ol--margin-top',
                    value: '0'
                },
                {
                    name: '--ol--margin-right',
                    value: '0'
                },
                {
                    name: '--ol--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--ol--margin-left',
                    value: '0'
                },
                {
                    name: '--ol--margin',
                    value: 'var(--ol--margin-top) var(--ol--margin-right) var(--ol--margin-bottom) var(--ol--margin-left)'
                },
                {
                    name: '--ol--padding-top',
                    value: '0'
                },
                {
                    name: '--ol--padding-right',
                    value: '0'
                },
                {
                    name: '--ol--padding-bottom',
                    value: '0'
                },
                {
                    name: '--ol--padding-left',
                    value: 'var(--spacing-xl)'
                },
                {
                    name: '--ol--padding',
                    value: 'var(--ol--padding-top) var(--ol--padding-right) var(--ol--padding-bottom) var(--ol--padding-left)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'p',
            variables: [
                {
                    name: '--p--margin-top',
                    value: '0'
                },
                {
                    name: '--p--margin-right',
                    value: '0'
                },
                {
                    name: '--p--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--p--margin-left',
                    value: '0'
                },
                {
                    name: '--p--margin',
                    value: 'var(--p--margin-top) var(--p--margin-right) var(--p--margin-bottom) var(--p--margin-left)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'pre',
            variables: [
                {
                    name: '--pre--font-size',
                    value: 'var(--font-size-sm)'
                },
                {
                    name: '--pre--font-family',
                    value: 'var(--font-family-monospace)'
                },
                {
                    name: '--pre--margin-top',
                    value: '0'
                },
                {
                    name: '--pre--margin-right',
                    value: '0'
                },
                {
                    name: '--pre--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--pre--margin-left',
                    value: '0'
                },
                {
                    name: '--pre--margin',
                    value: 'var(--pre--margin-top) var(--pre--margin-right) var(--pre--margin-bottom) var(--pre--margin-left)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'samp',
            variables: [
                {
                    name: '--samp--font-family',
                    value: 'var(--font-family-monospace)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'transition',
            variables: [
                {
                    name: '--expand-transition-property',
                    value: 'height'
                },
                {
                    name: '--expand-transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--expand-transition-timing-function',
                    value: 'var(--transition-timing-function)'
                },
                {
                    name: '--expand-transition',
                    value: 'var(--expand-transition-property) var(--expand-transition-duration) var(--expand-transition-timing-function)'
                },
                {
                    name: '--fade-in-linear-transition-property',
                    value: 'opacity'
                },
                {
                    name: '--fade-in-linear-transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--fade-in-linear-transition-timing-function',
                    value: 'cubic-bezier(0.23, 1, 0.32, 1)'
                },
                {
                    name: '--fade-in-linear-transition',
                    value: 'var(--fade-in-linear-transition-property) var(--fade-in-linear-transition-duration) var(--fade-in-linear-transition-timing-function)'
                },
                {
                    name: '--fade-in-transition-property',
                    value: 'opacity'
                },
                {
                    name: '--fade-in-transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--fade-in-transition-timing-function',
                    value: 'cubic-bezier(0.55, 0, 0.1, 1)'
                },
                {
                    name: '--fade-in-transition',
                    value: 'var(--fade-in-transition-property) var(--fade-in-transition-duration) var(--fade-in-transition-timing-function)'
                },
                {
                    name: '--slide-in-right-transition-property',
                    value: 'transform'
                },
                {
                    name: '--slide-in-right-transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--slide-in-right-transition-timing-function',
                    value: 'ease'
                },
                {
                    name: '--slide-in-right-transition',
                    value: 'var(--slide-in-right-transition-property) var(--slide-in-right-transition-duration) var(--slide-in-right-transition-timing-function)'
                },
                {
                    name: '--zoom-in-bottom-transition-property',
                    value: 'transform, opacity'
                },
                {
                    name: '--zoom-in-bottom-transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--zoom-in-bottom-transition-timing-function',
                    value: 'cubic-bezier(0.23, 1, 0.32, 1)'
                },
                {
                    name: '--zoom-in-bottom-transition',
                    value: 'var(--zoom-in-bottom-transition-property) var(--zoom-in-bottom-transition-duration) var(--zoom-in-bottom-transition-timing-function)'
                },
                {
                    name: '--zoom-in-center-transition-property',
                    value: 'transform, opacity'
                },
                {
                    name: '--zoom-in-center-transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--zoom-in-center-transition-timing-function',
                    value: 'cubic-bezier(0.55, 0, 0.1, 1)'
                },
                {
                    name: '--zoom-in-center-transition',
                    value: 'var(--zoom-in-center-transition-property) var(--zoom-in-center-transition-duration) var(--zoom-in-center-transition-timing-function)'
                },
                {
                    name: '--zoom-in-left-transition-property',
                    value: 'transform, opacity'
                },
                {
                    name: '--zoom-in-left-transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--zoom-in-left-transition-timing-function',
                    value: 'cubic-bezier(0.23, 1, 0.32, 1)'
                },
                {
                    name: '--zoom-in-left-transition',
                    value: 'var(--zoom-in-left-transition-property) var(--zoom-in-left-transition-duration) var(--zoom-in-left-transition-timing-function)'
                },
                {
                    name: '--zoom-in-right-transition-property',
                    value: 'transform, opacity'
                },
                {
                    name: '--zoom-in-right-transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--zoom-in-right-transition-timing-function',
                    value: 'cubic-bezier(0.23, 1, 0.32, 1)'
                },
                {
                    name: '--zoom-in-right-transition',
                    value: 'var(--zoom-in-right-transition-property) var(--zoom-in-right-transition-duration) var(--zoom-in-right-transition-timing-function)'
                },
                {
                    name: '--zoom-in-top-transition-property',
                    value: 'transform, opacity'
                },
                {
                    name: '--zoom-in-top-transition-duration',
                    value: 'var(--transition-duration)'
                },
                {
                    name: '--zoom-in-top-transition-timing-function',
                    value: 'cubic-bezier(0.23, 1, 0.32, 1)'
                },
                {
                    name: '--zoom-in-top-transition',
                    value: 'var(--zoom-in-top-transition-property) var(--zoom-in-top-transition-duration) var(--zoom-in-top-transition-timing-function)'
                }
            ]
        }
    },
    {
        css: {
            namespace: 'ul',
            variables: [
                {
                    name: '--ul--margin-top',
                    value: '0'
                },
                {
                    name: '--ul--margin-right',
                    value: '0'
                },
                {
                    name: '--ul--margin-bottom',
                    value: 'var(--spacing)'
                },
                {
                    name: '--ul--margin-left',
                    value: '0'
                },
                {
                    name: '--ul--margin',
                    value: 'var(--ul--margin-top) var(--ul--margin-right) var(--ul--margin-bottom) var(--ul--margin-left)'
                },
                {
                    name: '--ul--padding-top',
                    value: '0'
                },
                {
                    name: '--ul--padding-right',
                    value: '0'
                },
                {
                    name: '--ul--padding-bottom',
                    value: '0'
                },
                {
                    name: '--ul--padding-left',
                    value: 'var(--spacing-xl)'
                },
                {
                    name: '--ul--padding',
                    value: 'var(--ul--padding-top) var(--ul--padding-right) var(--ul--padding-bottom) var(--ul--padding-left)'
                }
            ]
        }
    }
];

export default manifest;
