import { createTestingGeneratorMeta, createTestingResolverMeta } from './__tests__/utils';
import { defineGenerator } from './utils';
import { GeneratorType, type RawTheme, type ResolvedTheme } from './types';
import { applyResolvers, applyChunkGenerators } from './apply';
import { defaultThemes } from './presets';

describe('applyResolvers', () => {
    const meta = createTestingResolverMeta({ path: [], theme: defaultThemes.default });

    it('should correctly apply the default resolvers to a the default themes object', () => {
        const rawTheme: RawTheme = defaultThemes.default;

        const { components, ...theme } = applyResolvers(rawTheme, meta);

        expect(theme).toEqual({
            animation: {
                default: {
                    duration: '300ms',
                    timingFunction: 'ease'
                }
            },
            boxShadow: {
                default: {
                    offsetX: '0',
                    offsetY: '0.5rem',
                    blurRadius: '1rem',
                    spreadRadius: '-0.75rem',
                    color: 'rgba(0, 0, 0, 0.15)'
                }
            },
            border: {
                default: {
                    top: {
                        width: '1px',
                        style: 'solid',
                        color: 'var(--color-gray-200)'
                    },
                    right: {
                        width: '1px',
                        style: 'solid',
                        color: 'var(--color-gray-200)'
                    },
                    bottom: {
                        width: '1px',
                        style: 'solid',
                        color: 'var(--color-gray-200)'
                    },
                    left: {
                        width: '1px',
                        style: 'solid',
                        color: 'var(--color-gray-200)'
                    }
                }
            },
            borderRadius: {
                xs: {
                    topLeft: 'calc(var(--border-top-left-radius) * var(--size-multiplier-xs))',
                    topRight: 'calc(var(--border-top-right-radius) * var(--size-multiplier-xs))',
                    bottomRight:
                        'calc(var(--border-bottom-right-radius) * var(--size-multiplier-xs))',
                    bottomLeft: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-xs))'
                },
                sm: {
                    topLeft: 'calc(var(--border-top-left-radius) * var(--size-multiplier-sm))',
                    topRight: 'calc(var(--border-top-right-radius) * var(--size-multiplier-sm))',
                    bottomRight:
                        'calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))',
                    bottomLeft: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))'
                },
                md: {
                    topLeft: 'calc(var(--border-top-left-radius) * var(--size-multiplier-md))',
                    topRight: 'calc(var(--border-top-right-radius) * var(--size-multiplier-md))',
                    bottomRight:
                        'calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))',
                    bottomLeft: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))'
                },
                lg: {
                    topLeft: 'calc(var(--border-top-left-radius) * var(--size-multiplier-lg))',
                    topRight: 'calc(var(--border-top-right-radius) * var(--size-multiplier-lg))',
                    bottomRight:
                        'calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))',
                    bottomLeft: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-lg))'
                },
                xl: {
                    topLeft: 'calc(var(--border-top-left-radius) * var(--size-multiplier-xl))',
                    topRight: 'calc(var(--border-top-right-radius) * var(--size-multiplier-xl))',
                    bottomRight:
                        'calc(var(--border-bottom-right-radius) * var(--size-multiplier-xl))',
                    bottomLeft: 'calc(var(--border-bottom-left-radius) * var(--size-multiplier-xl))'
                },
                default: {
                    topLeft: '4px',
                    topRight: '4px',
                    bottomRight: '4px',
                    bottomLeft: '4px'
                }
            },
            breakpoints: {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
                '2xl': 1400,
                default: ''
            },
            colors: {
                red: {
                    default: {
                        h: 1.3259668508287064,
                        s: 87.43961352657004,
                        l: 59.411764705882355,
                        a: 1
                    }
                },
                orange: {
                    default: {
                        h: 19.622641509433947,
                        s: 92.9824561403509,
                        l: 66.47058823529412,
                        a: 1
                    }
                },
                yellow: {
                    default: {
                        h: 43.676470588235304,
                        s: 100,
                        l: 73.33333333333334,
                        a: 1
                    }
                },
                green: {
                    default: {
                        h: 154.4186046511628,
                        s: 57.847533632286996,
                        l: 43.72549019607843,
                        a: 1
                    }
                },
                teal: {
                    default: {
                        h: 173.8888888888889,
                        s: 42.85714285714286,
                        l: 49.411764705882355,
                        a: 1
                    }
                },
                blue: {
                    default: {
                        h: 195.0967741935484,
                        s: 77.11442786069651,
                        l: 39.411764705882355,
                        a: 1
                    }
                },
                purple: {
                    default: {
                        h: 262.2857142857142,
                        s: 30.172413793103452,
                        l: 54.50980392156863,
                        a: 1
                    }
                },
                pink: {
                    default: {
                        h: 351.42857142857144,
                        s: 95.68345323741009,
                        l: 72.74509803921569,
                        a: 1
                    }
                },
                white: {
                    default: {
                        h: 0,
                        s: 0,
                        l: 100,
                        a: 1
                    }
                },
                black: {
                    default: {
                        h: 0,
                        s: 0,
                        l: 0,
                        a: 1
                    }
                },
                gray: {
                    '50': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 95,
                        a: 'var(--color-gray--a)'
                    },
                    '100': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 90,
                        a: 'var(--color-gray--a)'
                    },
                    '200': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 80,
                        a: 'var(--color-gray--a)'
                    },
                    '300': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 70,
                        a: 'var(--color-gray--a)'
                    },
                    '400': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 60,
                        a: 'var(--color-gray--a)'
                    },
                    '500': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 50,
                        a: 'var(--color-gray--a)'
                    },
                    '600': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 40,
                        a: 'var(--color-gray--a)'
                    },
                    '700': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 30,
                        a: 'var(--color-gray--a)'
                    },
                    '800': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 20,
                        a: 'var(--color-gray--a)'
                    },
                    '900': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 10,
                        a: 'var(--color-gray--a)'
                    },
                    'shade-150': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 'calc(var(--color-gray--l) - 15%)',
                        a: 'var(--color-gray--a)'
                    },
                    'shade-100': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 'calc(var(--color-gray--l) - 10%)',
                        a: 'var(--color-gray--a)'
                    },
                    'shade-50': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 'calc(var(--color-gray--l) - 5%)',
                        a: 'var(--color-gray--a)'
                    },
                    'tint-50': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 'calc(var(--color-gray--l) + 5%)',
                        a: 'var(--color-gray--a)'
                    },
                    'tint-100': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 'calc(var(--color-gray--l) + 10%)',
                        a: 'var(--color-gray--a)'
                    },
                    'tint-150': {
                        h: 'var(--color-gray--h)',
                        s: 'var(--color-gray--s)',
                        l: 'calc(var(--color-gray--l) + 15%)',
                        a: 'var(--color-gray--a)'
                    },
                    default: {
                        h: 193.63636363636363,
                        s: 10.784313725490199,
                        l: 60.00000000000001,
                        a: 1
                    }
                },
                light: {
                    'shade-150': {
                        h: 'var(--color-light--h)',
                        s: 'var(--color-light--s)',
                        l: 'calc(var(--color-light--l) - 15%)',
                        a: 'var(--color-light--a)'
                    },
                    'shade-100': {
                        h: 'var(--color-light--h)',
                        s: 'var(--color-light--s)',
                        l: 'calc(var(--color-light--l) - 10%)',
                        a: 'var(--color-light--a)'
                    },
                    'shade-50': {
                        h: 'var(--color-light--h)',
                        s: 'var(--color-light--s)',
                        l: 'calc(var(--color-light--l) - 5%)',
                        a: 'var(--color-light--a)'
                    },
                    'tint-50': {
                        h: 'var(--color-light--h)',
                        s: 'var(--color-light--s)',
                        l: 'calc(var(--color-light--l) + 5%)',
                        a: 'var(--color-light--a)'
                    },
                    'tint-100': {
                        h: 'var(--color-light--h)',
                        s: 'var(--color-light--s)',
                        l: 'calc(var(--color-light--l) + 10%)',
                        a: 'var(--color-light--a)'
                    },
                    'tint-150': {
                        h: 'var(--color-light--h)',
                        s: 'var(--color-light--s)',
                        l: 'calc(var(--color-light--l) + 15%)',
                        a: 'var(--color-light--a)'
                    },
                    default: {
                        h: 'var(--color-gray-100--h)',
                        s: 'var(--color-gray-100--s)',
                        l: 'var(--color-gray-100--l)',
                        a: 'var(--color-gray-100--a)'
                    }
                },
                dark: {
                    'shade-150': {
                        h: 'var(--color-dark--h)',
                        s: 'var(--color-dark--s)',
                        l: 'calc(var(--color-dark--l) - 15%)',
                        a: 'var(--color-dark--a)'
                    },
                    'shade-100': {
                        h: 'var(--color-dark--h)',
                        s: 'var(--color-dark--s)',
                        l: 'calc(var(--color-dark--l) - 10%)',
                        a: 'var(--color-dark--a)'
                    },
                    'shade-50': {
                        h: 'var(--color-dark--h)',
                        s: 'var(--color-dark--s)',
                        l: 'calc(var(--color-dark--l) - 5%)',
                        a: 'var(--color-dark--a)'
                    },
                    'tint-50': {
                        h: 'var(--color-dark--h)',
                        s: 'var(--color-dark--s)',
                        l: 'calc(var(--color-dark--l) + 5%)',
                        a: 'var(--color-dark--a)'
                    },
                    'tint-100': {
                        h: 'var(--color-dark--h)',
                        s: 'var(--color-dark--s)',
                        l: 'calc(var(--color-dark--l) + 10%)',
                        a: 'var(--color-dark--a)'
                    },
                    'tint-150': {
                        h: 'var(--color-dark--h)',
                        s: 'var(--color-dark--s)',
                        l: 'calc(var(--color-dark--l) + 15%)',
                        a: 'var(--color-dark--a)'
                    },
                    default: {
                        h: 'var(--color-gray-800--h)',
                        s: 'var(--color-gray-800--s)',
                        l: 'var(--color-gray-800--l)',
                        a: 'var(--color-gray-800--a)'
                    }
                },
                primary: {
                    '50': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 95,
                        a: 'var(--color-primary--a)'
                    },
                    '100': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 90,
                        a: 'var(--color-primary--a)'
                    },
                    '200': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 80,
                        a: 'var(--color-primary--a)'
                    },
                    '300': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 70,
                        a: 'var(--color-primary--a)'
                    },
                    '400': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 60,
                        a: 'var(--color-primary--a)'
                    },
                    '500': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 50,
                        a: 'var(--color-primary--a)'
                    },
                    '600': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 40,
                        a: 'var(--color-primary--a)'
                    },
                    '700': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 30,
                        a: 'var(--color-primary--a)'
                    },
                    '800': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 20,
                        a: 'var(--color-primary--a)'
                    },
                    '900': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 10,
                        a: 'var(--color-primary--a)'
                    },
                    'shade-150': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 'calc(var(--color-primary--l) - 15%)',
                        a: 'var(--color-primary--a)'
                    },
                    'shade-100': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 'calc(var(--color-primary--l) - 10%)',
                        a: 'var(--color-primary--a)'
                    },
                    'shade-50': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 'calc(var(--color-primary--l) - 5%)',
                        a: 'var(--color-primary--a)'
                    },
                    'tint-50': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 'calc(var(--color-primary--l) + 5%)',
                        a: 'var(--color-primary--a)'
                    },
                    'tint-100': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 'calc(var(--color-primary--l) + 10%)',
                        a: 'var(--color-primary--a)'
                    },
                    'tint-150': {
                        h: 'var(--color-primary--h)',
                        s: 'var(--color-primary--s)',
                        l: 'calc(var(--color-primary--l) + 15%)',
                        a: 'var(--color-primary--a)'
                    },
                    default: {
                        h: 'var(--color-blue--h)',
                        s: 'var(--color-blue--s)',
                        l: 'var(--color-blue--l)',
                        a: 'var(--color-blue--a)'
                    }
                },
                secondary: {
                    '50': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 95,
                        a: 'var(--color-secondary--a)'
                    },
                    '100': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 90,
                        a: 'var(--color-secondary--a)'
                    },
                    '200': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 80,
                        a: 'var(--color-secondary--a)'
                    },
                    '300': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 70,
                        a: 'var(--color-secondary--a)'
                    },
                    '400': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 60,
                        a: 'var(--color-secondary--a)'
                    },
                    '500': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 50,
                        a: 'var(--color-secondary--a)'
                    },
                    '600': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 40,
                        a: 'var(--color-secondary--a)'
                    },
                    '700': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 30,
                        a: 'var(--color-secondary--a)'
                    },
                    '800': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 20,
                        a: 'var(--color-secondary--a)'
                    },
                    '900': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 10,
                        a: 'var(--color-secondary--a)'
                    },
                    'shade-150': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 'calc(var(--color-secondary--l) - 15%)',
                        a: 'var(--color-secondary--a)'
                    },
                    'shade-100': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 'calc(var(--color-secondary--l) - 10%)',
                        a: 'var(--color-secondary--a)'
                    },
                    'shade-50': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 'calc(var(--color-secondary--l) - 5%)',
                        a: 'var(--color-secondary--a)'
                    },
                    'tint-50': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 'calc(var(--color-secondary--l) + 5%)',
                        a: 'var(--color-secondary--a)'
                    },
                    'tint-100': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 'calc(var(--color-secondary--l) + 10%)',
                        a: 'var(--color-secondary--a)'
                    },
                    'tint-150': {
                        h: 'var(--color-secondary--h)',
                        s: 'var(--color-secondary--s)',
                        l: 'calc(var(--color-secondary--l) + 15%)',
                        a: 'var(--color-secondary--a)'
                    },
                    default: {
                        h: 'var(--color-purple--h)',
                        s: 'var(--color-purple--s)',
                        l: 'var(--color-purple--l)',
                        a: 'var(--color-purple--a)'
                    }
                },
                info: {
                    '50': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 95,
                        a: 'var(--color-info--a)'
                    },
                    '100': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 90,
                        a: 'var(--color-info--a)'
                    },
                    '200': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 80,
                        a: 'var(--color-info--a)'
                    },
                    '300': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 70,
                        a: 'var(--color-info--a)'
                    },
                    '400': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 60,
                        a: 'var(--color-info--a)'
                    },
                    '500': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 50,
                        a: 'var(--color-info--a)'
                    },
                    '600': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 40,
                        a: 'var(--color-info--a)'
                    },
                    '700': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 30,
                        a: 'var(--color-info--a)'
                    },
                    '800': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 20,
                        a: 'var(--color-info--a)'
                    },
                    '900': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 10,
                        a: 'var(--color-info--a)'
                    },
                    'shade-150': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 'calc(var(--color-info--l) - 15%)',
                        a: 'var(--color-info--a)'
                    },
                    'shade-100': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 'calc(var(--color-info--l) - 10%)',
                        a: 'var(--color-info--a)'
                    },
                    'shade-50': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 'calc(var(--color-info--l) - 5%)',
                        a: 'var(--color-info--a)'
                    },
                    'tint-50': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 'calc(var(--color-info--l) + 5%)',
                        a: 'var(--color-info--a)'
                    },
                    'tint-100': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 'calc(var(--color-info--l) + 10%)',
                        a: 'var(--color-info--a)'
                    },
                    'tint-150': {
                        h: 'var(--color-info--h)',
                        s: 'var(--color-info--s)',
                        l: 'calc(var(--color-info--l) + 15%)',
                        a: 'var(--color-info--a)'
                    },
                    default: {
                        h: 'var(--color-teal--h)',
                        s: 'var(--color-teal--s)',
                        l: 'var(--color-teal--l)',
                        a: 'var(--color-teal--a)'
                    }
                },
                success: {
                    '50': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 95,
                        a: 'var(--color-success--a)'
                    },
                    '100': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 90,
                        a: 'var(--color-success--a)'
                    },
                    '200': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 80,
                        a: 'var(--color-success--a)'
                    },
                    '300': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 70,
                        a: 'var(--color-success--a)'
                    },
                    '400': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 60,
                        a: 'var(--color-success--a)'
                    },
                    '500': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 50,
                        a: 'var(--color-success--a)'
                    },
                    '600': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 40,
                        a: 'var(--color-success--a)'
                    },
                    '700': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 30,
                        a: 'var(--color-success--a)'
                    },
                    '800': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 20,
                        a: 'var(--color-success--a)'
                    },
                    '900': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 10,
                        a: 'var(--color-success--a)'
                    },
                    'shade-150': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 'calc(var(--color-success--l) - 15%)',
                        a: 'var(--color-success--a)'
                    },
                    'shade-100': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 'calc(var(--color-success--l) - 10%)',
                        a: 'var(--color-success--a)'
                    },
                    'shade-50': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 'calc(var(--color-success--l) - 5%)',
                        a: 'var(--color-success--a)'
                    },
                    'tint-50': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 'calc(var(--color-success--l) + 5%)',
                        a: 'var(--color-success--a)'
                    },
                    'tint-100': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 'calc(var(--color-success--l) + 10%)',
                        a: 'var(--color-success--a)'
                    },
                    'tint-150': {
                        h: 'var(--color-success--h)',
                        s: 'var(--color-success--s)',
                        l: 'calc(var(--color-success--l) + 15%)',
                        a: 'var(--color-success--a)'
                    },
                    default: {
                        h: 'var(--color-green--h)',
                        s: 'var(--color-green--s)',
                        l: 'var(--color-green--l)',
                        a: 'var(--color-green--a)'
                    }
                },
                warning: {
                    '50': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 95,
                        a: 'var(--color-warning--a)'
                    },
                    '100': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 90,
                        a: 'var(--color-warning--a)'
                    },
                    '200': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 80,
                        a: 'var(--color-warning--a)'
                    },
                    '300': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 70,
                        a: 'var(--color-warning--a)'
                    },
                    '400': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 60,
                        a: 'var(--color-warning--a)'
                    },
                    '500': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 50,
                        a: 'var(--color-warning--a)'
                    },
                    '600': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 40,
                        a: 'var(--color-warning--a)'
                    },
                    '700': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 30,
                        a: 'var(--color-warning--a)'
                    },
                    '800': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 20,
                        a: 'var(--color-warning--a)'
                    },
                    '900': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 10,
                        a: 'var(--color-warning--a)'
                    },
                    'shade-150': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 'calc(var(--color-warning--l) - 15%)',
                        a: 'var(--color-warning--a)'
                    },
                    'shade-100': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 'calc(var(--color-warning--l) - 10%)',
                        a: 'var(--color-warning--a)'
                    },
                    'shade-50': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 'calc(var(--color-warning--l) - 5%)',
                        a: 'var(--color-warning--a)'
                    },
                    'tint-50': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 'calc(var(--color-warning--l) + 5%)',
                        a: 'var(--color-warning--a)'
                    },
                    'tint-100': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 'calc(var(--color-warning--l) + 10%)',
                        a: 'var(--color-warning--a)'
                    },
                    'tint-150': {
                        h: 'var(--color-warning--h)',
                        s: 'var(--color-warning--s)',
                        l: 'calc(var(--color-warning--l) + 15%)',
                        a: 'var(--color-warning--a)'
                    },
                    default: {
                        h: 'var(--color-orange--h)',
                        s: 'var(--color-orange--s)',
                        l: 'var(--color-orange--l)',
                        a: 'var(--color-orange--a)'
                    }
                },
                danger: {
                    '50': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 95,
                        a: 'var(--color-danger--a)'
                    },
                    '100': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 90,
                        a: 'var(--color-danger--a)'
                    },
                    '200': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 80,
                        a: 'var(--color-danger--a)'
                    },
                    '300': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 70,
                        a: 'var(--color-danger--a)'
                    },
                    '400': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 60,
                        a: 'var(--color-danger--a)'
                    },
                    '500': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 50,
                        a: 'var(--color-danger--a)'
                    },
                    '600': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 40,
                        a: 'var(--color-danger--a)'
                    },
                    '700': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 30,
                        a: 'var(--color-danger--a)'
                    },
                    '800': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 20,
                        a: 'var(--color-danger--a)'
                    },
                    '900': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 10,
                        a: 'var(--color-danger--a)'
                    },
                    'shade-150': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 'calc(var(--color-danger--l) - 15%)',
                        a: 'var(--color-danger--a)'
                    },
                    'shade-100': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 'calc(var(--color-danger--l) - 10%)',
                        a: 'var(--color-danger--a)'
                    },
                    'shade-50': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 'calc(var(--color-danger--l) - 5%)',
                        a: 'var(--color-danger--a)'
                    },
                    'tint-50': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 'calc(var(--color-danger--l) + 5%)',
                        a: 'var(--color-danger--a)'
                    },
                    'tint-100': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 'calc(var(--color-danger--l) + 10%)',
                        a: 'var(--color-danger--a)'
                    },
                    'tint-150': {
                        h: 'var(--color-danger--h)',
                        s: 'var(--color-danger--s)',
                        l: 'calc(var(--color-danger--l) + 15%)',
                        a: 'var(--color-danger--a)'
                    },
                    default: {
                        h: 'var(--color-red--h)',
                        s: 'var(--color-red--s)',
                        l: 'var(--color-red--l)',
                        a: 'var(--color-red--a)'
                    }
                }
            },
            grid: {
                columns: 12,
                gutter: {
                    default: '28px',
                    xs: 'calc(var(--gutter) * var(--size-multiplier-xs))',
                    sm: 'calc(var(--gutter) * var(--size-multiplier-sm))',
                    md: 'calc(var(--gutter) * var(--size-multiplier-md))',
                    lg: 'calc(var(--gutter) * var(--size-multiplier-lg))',
                    xl: 'calc(var(--gutter) * var(--size-multiplier-xl))'
                },
                container: {
                    default: '100%',
                    xs: '100%',
                    sm: 'calc(var(--breakpoint-sm) - var(--grid-gutter-sm))',
                    md: 'calc(var(--breakpoint-md) - var(--grid-gutter-md))',
                    lg: 'calc(var(--breakpoint-lg) - var(--grid-gutter-lg))',
                    xl: 'calc(var(--breakpoint-xl) - var(--grid-gutter-xl))',
                    '2xl': 'calc(var(--breakpoint-2xl) - var(--grid-gutter-2xl))'
                }
            },
            scaleRatios: {
                minorSecond: 1.067,
                majorSecond: 1.125,
                minorThird: 1.2,
                majorThird: 1.25,
                perfectFourth: 1.333,
                augmentedFourth: 1.414,
                perfectFifth: 1.5,
                golden: 1.618,
                default: 'var(--scale-ratio-minor-third)'
            },
            size: {
                multiplier: {
                    default: 1,
                    '2xs': 'calc(var(--size-multiplier) / var(--scale-ratio-pow-3))',
                    xs: 'calc(var(--size-multiplier) / var(--scale-ratio-pow-2))',
                    sm: 'calc(var(--size-multiplier) / var(--scale-ratio-pow-1))',
                    md: 'var(--size-multiplier)',
                    lg: 'calc(var(--size-multiplier) * var(--scale-ratio-pow-1))',
                    xl: 'calc(var(--size-multiplier) * var(--scale-ratio-pow-2))',
                    '2xl': 'calc(var(--size-multiplier) * var(--scale-ratio-pow-3))'
                },
                percentages: {
                    default: '',
                    '0': '0%',
                    '25': '25%',
                    '50': '50%',
                    '75': '75%',
                    '100': '100%'
                }
            },
            spacing: {
                '2': {
                    top: 'calc(var(--spacing-top) * 2)',
                    right: 'calc(var(--spacing-right) * 2)',
                    bottom: 'calc(var(--spacing-bottom) * 2)',
                    left: 'calc(var(--spacing-left) * 2)'
                },
                '3': {
                    top: 'calc(var(--spacing-top) * 3)',
                    right: 'calc(var(--spacing-right) * 3)',
                    bottom: 'calc(var(--spacing-bottom) * 3)',
                    left: 'calc(var(--spacing-left) * 3)'
                },
                '4': {
                    top: 'calc(var(--spacing-top) * 4)',
                    right: 'calc(var(--spacing-right) * 4)',
                    bottom: 'calc(var(--spacing-bottom) * 4)',
                    left: 'calc(var(--spacing-left) * 4)'
                },
                '5': {
                    top: 'calc(var(--spacing-top) * 5)',
                    right: 'calc(var(--spacing-right) * 5)',
                    bottom: 'calc(var(--spacing-bottom) * 5)',
                    left: 'calc(var(--spacing-left) * 5)'
                },
                xs: {
                    top: 'calc(var(--spacing-top) * var(--size-multiplier-xs))',
                    right: 'calc(var(--spacing-right) * var(--size-multiplier-xs))',
                    bottom: 'calc(var(--spacing-bottom) * var(--size-multiplier-xs))',
                    left: 'calc(var(--spacing-left) * var(--size-multiplier-xs))'
                },
                sm: {
                    top: 'calc(var(--spacing-top) * var(--size-multiplier-sm))',
                    right: 'calc(var(--spacing-right) * var(--size-multiplier-sm))',
                    bottom: 'calc(var(--spacing-bottom) * var(--size-multiplier-sm))',
                    left: 'calc(var(--spacing-left) * var(--size-multiplier-sm))'
                },
                md: {
                    top: 'calc(var(--spacing-top) * var(--size-multiplier-md))',
                    right: 'calc(var(--spacing-right) * var(--size-multiplier-md))',
                    bottom: 'calc(var(--spacing-bottom) * var(--size-multiplier-md))',
                    left: 'calc(var(--spacing-left) * var(--size-multiplier-md))'
                },
                lg: {
                    top: 'calc(var(--spacing-top) * var(--size-multiplier-lg))',
                    right: 'calc(var(--spacing-right) * var(--size-multiplier-lg))',
                    bottom: 'calc(var(--spacing-bottom) * var(--size-multiplier-lg))',
                    left: 'calc(var(--spacing-left) * var(--size-multiplier-lg))'
                },
                xl: {
                    top: 'calc(var(--spacing-top) * var(--size-multiplier-xl))',
                    right: 'calc(var(--spacing-right) * var(--size-multiplier-xl))',
                    bottom: 'calc(var(--spacing-bottom) * var(--size-multiplier-xl))',
                    left: 'calc(var(--spacing-left) * var(--size-multiplier-xl))'
                },
                '1-5': {
                    top: 'calc(var(--spacing-top) / 5)',
                    right: 'calc(var(--spacing-right) / 5)',
                    bottom: 'calc(var(--spacing-bottom) / 5)',
                    left: 'calc(var(--spacing-left) / 5)'
                },
                '1-4': {
                    top: 'calc(var(--spacing-top) / 4)',
                    right: 'calc(var(--spacing-right) / 4)',
                    bottom: 'calc(var(--spacing-bottom) / 4)',
                    left: 'calc(var(--spacing-left) / 4)'
                },
                '3-4': {
                    top: 'calc(calc(var(--spacing-top) / 4) * 3)',
                    right: 'calc(calc(var(--spacing-right) / 4) * 3)',
                    bottom: 'calc(calc(var(--spacing-bottom) / 4) * 3)',
                    left: 'calc(calc(var(--spacing-left) / 4) * 3)'
                },
                '1-3': {
                    top: 'calc(var(--spacing-top) / 3)',
                    right: 'calc(var(--spacing-right) / 3)',
                    bottom: 'calc(var(--spacing-bottom) / 3)',
                    left: 'calc(var(--spacing-left) / 3)'
                },
                '2-3': {
                    top: 'calc(calc(var(--spacing-top) / 3) * 2)',
                    right: 'calc(calc(var(--spacing-right) / 3) * 2)',
                    bottom: 'calc(calc(var(--spacing-bottom) / 3) * 2)',
                    left: 'calc(calc(var(--spacing-left) / 3) * 2)'
                },
                '1-2': {
                    top: 'calc(var(--spacing-top) / 2)',
                    right: 'calc(var(--spacing-right) / 2)',
                    bottom: 'calc(var(--spacing-bottom) / 2)',
                    left: 'calc(var(--spacing-left) / 2)'
                },
                default: {
                    top: '1rem',
                    right: '1rem',
                    bottom: '1rem',
                    left: '1rem'
                }
            },
            typography: {
                fontFamily: {
                    default: {
                        base: 'var(--font-family-primary-base)',
                        monospace: 'var(--font-family-primary-monospace)',
                        print: 'var(--font-family-primary-print)'
                    },
                    primary: {
                        base: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                        monospace:
                            "'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        print: "'Georgia', 'Times New Roman', 'Times', serif"
                    },
                    secondary: {
                        base: 'var(--font-family-primary-base)',
                        monospace: 'var(--font-family-primary-monospace)',
                        print: 'var(--font-family-primary-print)'
                    }
                },
                fontWeight: {
                    extralight: 200,
                    light: 300,
                    normal: 'normal',
                    semibold: 600,
                    bold: 'bold',
                    black: 900,
                    lighter: 'lighter',
                    bolder: 'bolder',
                    default: 'var(--font-weight-normal)'
                },
                fontSize: {
                    xs: 'calc(var(--font-size) * var(--size-multiplier-xs))',
                    sm: 'calc(var(--font-size) * var(--size-multiplier-sm))',
                    md: 'calc(var(--font-size) * var(--size-multiplier-md))',
                    lg: 'calc(var(--font-size) * var(--size-multiplier-lg))',
                    xl: 'calc(var(--font-size) * var(--size-multiplier-xl))',
                    default: '1rem'
                },
                lineHeight: {
                    default: 1.5
                },
                letterSpacing: {
                    default: 0
                },
                color: {
                    dark: 'var(--color-dark)',
                    weak: 'var(--color-gray-700)',
                    weaker: 'var(--color-gray-500)',
                    weakest: 'var(--color-gray-300)',
                    light: 'var(--color-light)',
                    default: 'var(--color-gray-900)'
                },
                contrastColor: {
                    light: 'var(--color-gray-900)',
                    dark: 'var(--color-white)',
                    default: 'var(--color-white)'
                }
            }
        });

        expect(components).toEqual({
            badge: {
                default: {
                    background: {
                        h: 'var(--color-light--h)',
                        l: 'var(--color-light--l)',
                        s: 'var(--color-light--s)',
                        a: 'var(--color-light--a)'
                    },
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
                        topLeft: 'var(--border-radius-top-left)',
                        topRight: 'var(--border-radius-top-right)',
                        bottomRight: 'var(--border-radius-bottom-right)',
                        bottomLeft: 'var(--border-radius-bottom-left)'
                    },
                    color: {
                        a: 'var(--color-light-contrast-text--a)',
                        h: 'var(--color-light-contrast-text--h)',
                        l: 'var(--color-light-contrast-text--l)',
                        s: 'var(--color-light-contrast-text--s)'
                    },
                    fontSize: 'var(--font-size-md)',
                    padding: {
                        top: 'var(--padding-top)',
                        right: 'var(--padding-right)',
                        bottom: 'var(--padding-bottom)',
                        left: 'var(--padding-left)'
                    }
                },
                primary: {
                    background: {
                        h: 'var(--color-primary--h)',
                        l: 'var(--color-primary--l)',
                        s: 'var(--color-primary--s)',
                        a: 'var(--color-primary--a)'
                    },
                    color: {
                        a: 'var(--color-primary-contrast-text--a)',
                        h: 'var(--color-primary-contrast-text--h)',
                        l: 'var(--color-primary-contrast-text--l)',
                        s: 'var(--color-primary-contrast-text--s)'
                    }
                },
                secondary: {
                    background: {
                        h: 'var(--color-secondary--h)',
                        l: 'var(--color-secondary--l)',
                        s: 'var(--color-secondary--s)',
                        a: 'var(--color-secondary--a)'
                    },
                    color: {
                        a: 'var(--color-secondary-contrast-text--a)',
                        h: 'var(--color-secondary-contrast-text--h)',
                        l: 'var(--color-secondary-contrast-text--l)',
                        s: 'var(--color-secondary-contrast-text--s)'
                    }
                },
                info: {
                    background: {
                        h: 'var(--color-info--h)',
                        l: 'var(--color-info--l)',
                        s: 'var(--color-info--s)',
                        a: 'var(--color-info--a)'
                    },
                    color: {
                        a: 'var(--color-info-contrast-text--a)',
                        h: 'var(--color-info-contrast-text--h)',
                        l: 'var(--color-info-contrast-text--l)',
                        s: 'var(--color-info-contrast-text--s)'
                    }
                },
                success: {
                    background: {
                        h: 'var(--color-success--h)',
                        l: 'var(--color-success--l)',
                        s: 'var(--color-success--s)',
                        a: 'var(--color-success--a)'
                    },
                    color: {
                        a: 'var(--color-success-contrast-text--a)',
                        h: 'var(--color-success-contrast-text--h)',
                        l: 'var(--color-success-contrast-text--l)',
                        s: 'var(--color-success-contrast-text--s)'
                    }
                },
                warning: {
                    background: {
                        h: 'var(--color-warning--h)',
                        l: 'var(--color-warning--l)',
                        s: 'var(--color-warning--s)',
                        a: 'var(--color-warning--a)'
                    },
                    color: {
                        a: 'var(--color-warning-contrast-text--a)',
                        h: 'var(--color-warning-contrast-text--h)',
                        l: 'var(--color-warning-contrast-text--l)',
                        s: 'var(--color-warning-contrast-text--s)'
                    }
                },
                danger: {
                    background: {
                        h: 'var(--color-danger--h)',
                        l: 'var(--color-danger--l)',
                        s: 'var(--color-danger--s)',
                        a: 'var(--color-danger--a)'
                    },
                    color: {
                        a: 'var(--color-danger-contrast-text--a)',
                        h: 'var(--color-danger-contrast-text--h)',
                        l: 'var(--color-danger-contrast-text--l)',
                        s: 'var(--color-danger-contrast-text--s)'
                    }
                },
                light: {
                    background: {
                        h: 'var(--color-light--h)',
                        l: 'var(--color-light--l)',
                        s: 'var(--color-light--s)',
                        a: 'var(--color-light--a)'
                    },
                    color: {
                        h: 'var(--color-light-contrast-text--h)',
                        l: 'var(--color-light-contrast-text--l)',
                        s: 'var(--color-light-contrast-text--s)',
                        a: 'var(--color-light-contrast-text--a)'
                    }
                },
                dark: {
                    background: {
                        h: 'var(--color-dark--h)',
                        l: 'var(--color-dark--l)',
                        s: 'var(--color-dark--s)',
                        a: 'var(--color-dark--a)'
                    },
                    color: {
                        h: 'var(--color-dark-contrast-text--h)',
                        l: 'var(--color-dark-contrast-text--l)',
                        s: 'var(--color-dark-contrast-text--s)',
                        a: 'var(--color-dark-contrast-text--a)'
                    }
                },
                sm: {
                    fontSize: 'var(--font-size-sm)',
                    padding: {
                        top: 'var(--padding-top-sm)',
                        right: 'var(--padding-right-sm)',
                        bottom: 'var(--padding-bottom-sm)',
                        left: 'var(--padding-left-sm)'
                    }
                },
                md: {
                    fontSize: 'var(--font-size-md)',
                    padding: {
                        top: 'var(--padding-top-md)',
                        right: 'var(--padding-right-md)',
                        bottom: 'var(--padding-bottom-md)',
                        left: 'var(--padding-left-md)'
                    }
                },
                lg: {
                    fontSize: 'var(--font-size-lg)',
                    padding: {
                        top: 'var(--padding-top-lg)',
                        right: 'var(--padding-right-lg)',
                        bottom: 'var(--padding-bottom-lg)',
                        left: 'var(--padding-left-lg)'
                    }
                }
            }
        });
    });

    it('should apply the correct resolver based on key match', () => {
        const input = { key: 'Raw' };
        const meta = createTestingResolverMeta({
            path: [],
            resolvers: [
                {
                    key: 'key',
                    resolve: vi.fn(() => 'Resolved')
                }
            ]
        });

        const result = applyResolvers(input, meta);
        expect(result).toEqual({ key: 'Resolved' });
        expect(meta.resolvers[0].resolve).toHaveBeenCalledWith('Raw', {
            ...meta,
            path: ['key']
        });
    });

    it('should not modify values without a matching resolver', () => {
        const input = { key: 'Raw' };
        const meta = createTestingResolverMeta({
            path: [],
            resolvers: [
                {
                    key: 'otherKey',
                    resolve: vi.fn(() => 'Resolved')
                }
            ]
        });

        const result = applyResolvers(input, meta);
        expect(result).toEqual({ key: 'Raw' });
        expect(meta.resolvers[0].resolve).not.toHaveBeenCalled();
    });

    it('should handle nested objects by updating the path', () => {
        const input = { key: { nested: { deep: 'Raw' } } };
        const meta = createTestingResolverMeta({
            path: [],
            resolvers: [
                {
                    key: 'key.nested.deep',
                    resolve: vi.fn(() => 'Resolved')
                }
            ]
        });

        const result = applyResolvers(input, meta);
        expect(result).toEqual({ key: { nested: { deep: 'Resolved' } } });
        expect(meta.resolvers[0].resolve).toHaveBeenCalledWith('Raw', {
            ...meta,
            path: ['key', 'nested', 'deep']
        });
    });
});

describe('applyGenerators', () => {
    it('should generate correct output for default theme', () => {
        const theme = defaultThemes.default;
        const resolvedTheme = applyResolvers(theme, createTestingResolverMeta());
        const result = applyChunkGenerators(resolvedTheme, createTestingGeneratorMeta());

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
            name: GeneratorType.Default,
            files: [
                {
                    content: [
                        '@mixin breakpoint-xs-down {',
                        '@media screen and (max-width: 575.99px) { @content; }',
                        '}',
                        '@mixin breakpoint-xs-up {',
                        '@content;',
                        '}',
                        '@mixin breakpoint-xs { @media screen and (min-width: 0px) and (max-width: 575.99px) { @content; }}',
                        '@mixin breakpoint-sm-down {',
                        '@media screen and (max-width: 767.99px) { @content; }',
                        '}',
                        '@mixin breakpoint-sm-up {',
                        '@media screen and (min-width: 576px) { @content; }',
                        '}',
                        '@mixin breakpoint-sm { @media screen and (min-width: 576px) and (max-width: 767.99px) { @content; }}',
                        '@mixin breakpoint-md-down {',
                        '@media screen and (max-width: 991.99px) { @content; }',
                        '}',
                        '@mixin breakpoint-md-up {',
                        '@media screen and (min-width: 768px) { @content; }',
                        '}',
                        '@mixin breakpoint-md { @media screen and (min-width: 768px) and (max-width: 991.99px) { @content; }}',
                        '@mixin breakpoint-lg-down {',
                        '@media screen and (max-width: 1199.99px) { @content; }',
                        '}',
                        '@mixin breakpoint-lg-up {',
                        '@media screen and (min-width: 992px) { @content; }',
                        '}',
                        '@mixin breakpoint-lg { @media screen and (min-width: 992px) and (max-width: 1199.99px) { @content; }}',
                        '@mixin breakpoint-xl-down {',
                        '@media screen and (max-width: 1399.99px) { @content; }',
                        '}',
                        '@mixin breakpoint-xl-up {',
                        '@media screen and (min-width: 1200px) { @content; }',
                        '}',
                        '@mixin breakpoint-xl { @media screen and (min-width: 1200px) and (max-width: 1399.99px) { @content; }}',
                        '@mixin breakpoint-2xl-down {',
                        '@content;',
                        '}',
                        '@mixin breakpoint-2xl-up {',
                        '@media screen and (min-width: 1400px) { @content; }',
                        '}',
                        '@mixin breakpoint-2xl { @media screen and (min-width: 1400px) { @content; }}',
                        '$columns: 12 !default;',
                        "$breakpoint-keys: ('xs', 'sm', 'md', 'lg', 'xl', '2xl') !default;",
                        '@mixin breakpoint-down($key) {',
                        "@if $key == 'xs' { @include breakpoint-xs-down { @content; } }",
                        "@else if $key == 'sm' { @include breakpoint-sm-down { @content; } }",
                        "@else if $key == 'md' { @include breakpoint-md-down { @content; } }",
                        "@else if $key == 'lg' { @include breakpoint-lg-down { @content; } }",
                        "@else if $key == 'xl' { @include breakpoint-xl-down { @content; } }",
                        "@else if $key == '2xl' { @include breakpoint-2xl-down { @content; } }",
                        '@else { @content; }',
                        '}',
                        '@mixin breakpoint-up($key) {',
                        "@if $key == 'xs' { @include breakpoint-xs-up { @content; } }",
                        "@else if $key == 'sm' { @include breakpoint-sm-up { @content; } }",
                        "@else if $key == 'md' { @include breakpoint-md-up { @content; } }",
                        "@else if $key == 'lg' { @include breakpoint-lg-up { @content; } }",
                        "@else if $key == 'xl' { @include breakpoint-xl-up { @content; } }",
                        "@else if $key == '2xl' { @include breakpoint-2xl-up { @content; } }",
                        '@else { @content; }',
                        '}',
                        '@mixin breakpoint($key) {',
                        "@if $key == 'xs' { @include breakpoint-xs { @content; } }",
                        "@else if $key == 'sm' { @include breakpoint-sm { @content; } }",
                        "@else if $key == 'md' { @include breakpoint-md { @content; } }",
                        "@else if $key == 'lg' { @include breakpoint-lg { @content; } }",
                        "@else if $key == 'xl' { @include breakpoint-xl { @content; } }",
                        "@else if $key == '2xl' { @include breakpoint-2xl { @content; } }",
                        '@else { @content; }',
                        '}'
                    ],
                    path: ['breakpoints']
                }
            ]
        });

        expect(result[1]).toEqual({
            name: GeneratorType.CssVariables,
            files: [
                {
                    content: [
                        '--animation-duration: 300ms',
                        '--animation-timing-function: ease',
                        '--animation: var(--animation-duration) var(--animation-timing-function)'
                    ],
                    path: ['animation']
                },
                {
                    content: [
                        '--box-shadow-offset-x: 0',
                        '--box-shadow-offset-y: 0.5rem',
                        '--box-shadow-blur-radius: 1rem',
                        '--box-shadow-spread-radius: -0.75rem',
                        '--box-shadow-color: rgba(0, 0, 0, 0.15)',
                        '--box-shadow: var(--box-shadow-offset-x) var(--box-shadow-offset-y) var(--box-shadow-blur-radius) var(--box-shadow-spread-radius) var(--box-shadow-color)'
                    ],
                    path: ['boxShadow']
                },
                {
                    content: [
                        '--border-top-width: 1px',
                        '--border-top-style: solid',
                        '--border-top-color: var(--color-gray-200)',
                        '--border-top: var(--border-top-width) var(--border-top-style) var(--border-top-color)',
                        '--border-right-width: 1px',
                        '--border-right-style: solid',
                        '--border-right-color: var(--color-gray-200)',
                        '--border-right: var(--border-right-width) var(--border-right-style) var(--border-right-color)',
                        '--border-bottom-width: 1px',
                        '--border-bottom-style: solid',
                        '--border-bottom-color: var(--color-gray-200)',
                        '--border-bottom: var(--border-bottom-width) var(--border-bottom-style) var(--border-bottom-color)',
                        '--border-left-width: 1px',
                        '--border-left-style: solid',
                        '--border-left-color: var(--color-gray-200)',
                        '--border-left: var(--border-left-width) var(--border-left-style) var(--border-left-color)',
                        '--border-width: var(--border-top-width) var(--border-right-width) var(--border-bottom-width) var(--border-left-width)',
                        '--border-style: var(--border-top-style) var(--border-right-style) var(--border-bottom-style) var(--border-left-style)',
                        '--border-color: var(--border-top-color) var(--border-right-color) var(--border-bottom-color) var(--border-left-color)',
                        '--border: var(--border-top)'
                    ],
                    path: ['border']
                },
                {
                    content: [
                        '--border-top-left-radius-xs: calc(var(--border-top-left-radius) * var(--size-multiplier-xs))',
                        '--border-top-right-radius-xs: calc(var(--border-top-right-radius) * var(--size-multiplier-xs))',
                        '--border-bottom-right-radius-xs: calc(var(--border-bottom-right-radius) * var(--size-multiplier-xs))',
                        '--border-bottom-left-radius-xs: calc(var(--border-bottom-left-radius) * var(--size-multiplier-xs))',
                        '--border-radius-xs: var(--border-top-left-radius-xs) var(--border-top-right-radius-xs) var(--border-bottom-right-radius-xs) var(--border-bottom-left-radius-xs)',
                        '--border-top-left-radius-sm: calc(var(--border-top-left-radius) * var(--size-multiplier-sm))',
                        '--border-top-right-radius-sm: calc(var(--border-top-right-radius) * var(--size-multiplier-sm))',
                        '--border-bottom-right-radius-sm: calc(var(--border-bottom-right-radius) * var(--size-multiplier-sm))',
                        '--border-bottom-left-radius-sm: calc(var(--border-bottom-left-radius) * var(--size-multiplier-sm))',
                        '--border-radius-sm: var(--border-top-left-radius-sm) var(--border-top-right-radius-sm) var(--border-bottom-right-radius-sm) var(--border-bottom-left-radius-sm)',
                        '--border-top-left-radius-md: calc(var(--border-top-left-radius) * var(--size-multiplier-md))',
                        '--border-top-right-radius-md: calc(var(--border-top-right-radius) * var(--size-multiplier-md))',
                        '--border-bottom-right-radius-md: calc(var(--border-bottom-right-radius) * var(--size-multiplier-md))',
                        '--border-bottom-left-radius-md: calc(var(--border-bottom-left-radius) * var(--size-multiplier-md))',
                        '--border-radius-md: var(--border-top-left-radius-md) var(--border-top-right-radius-md) var(--border-bottom-right-radius-md) var(--border-bottom-left-radius-md)',
                        '--border-top-left-radius-lg: calc(var(--border-top-left-radius) * var(--size-multiplier-lg))',
                        '--border-top-right-radius-lg: calc(var(--border-top-right-radius) * var(--size-multiplier-lg))',
                        '--border-bottom-right-radius-lg: calc(var(--border-bottom-right-radius) * var(--size-multiplier-lg))',
                        '--border-bottom-left-radius-lg: calc(var(--border-bottom-left-radius) * var(--size-multiplier-lg))',
                        '--border-radius-lg: var(--border-top-left-radius-lg) var(--border-top-right-radius-lg) var(--border-bottom-right-radius-lg) var(--border-bottom-left-radius-lg)',
                        '--border-top-left-radius-xl: calc(var(--border-top-left-radius) * var(--size-multiplier-xl))',
                        '--border-top-right-radius-xl: calc(var(--border-top-right-radius) * var(--size-multiplier-xl))',
                        '--border-bottom-right-radius-xl: calc(var(--border-bottom-right-radius) * var(--size-multiplier-xl))',
                        '--border-bottom-left-radius-xl: calc(var(--border-bottom-left-radius) * var(--size-multiplier-xl))',
                        '--border-radius-xl: var(--border-top-left-radius-xl) var(--border-top-right-radius-xl) var(--border-bottom-right-radius-xl) var(--border-bottom-left-radius-xl)',
                        '--border-top-left-radius: 4px',
                        '--border-top-right-radius: 4px',
                        '--border-bottom-right-radius: 4px',
                        '--border-bottom-left-radius: 4px',
                        '--border-radius: var(--border-top-left-radius) var(--border-top-right-radius) var(--border-bottom-right-radius) var(--border-bottom-left-radius)'
                    ],
                    path: ['borderRadius']
                },
                {
                    content: [
                        '--breakpoint-xs: 0px',
                        '--breakpoint-sm: 576px',
                        '--breakpoint-md: 768px',
                        '--breakpoint-lg: 992px',
                        '--breakpoint-xl: 1200px',
                        '--breakpoint-2xl: 1400px'
                    ],
                    path: ['breakpoints']
                },
                {
                    content: [
                        '--color-red--h: 1.3259668508287064',
                        '--color-red--s: 87.43961352657004%',
                        '--color-red--l: 59.411764705882355%',
                        '--color-red--a: 1',
                        '--color-red: hsla(var(--color-red--h), var(--color-red--s), var(--color-red--l), var(--color-red--a))',
                        '--color-orange--h: 19.622641509433947',
                        '--color-orange--s: 92.9824561403509%',
                        '--color-orange--l: 66.47058823529412%',
                        '--color-orange--a: 1',
                        '--color-orange: hsla(var(--color-orange--h), var(--color-orange--s), var(--color-orange--l), var(--color-orange--a))',
                        '--color-yellow--h: 43.676470588235304',
                        '--color-yellow--s: 100%',
                        '--color-yellow--l: 73.33333333333334%',
                        '--color-yellow--a: 1',
                        '--color-yellow: hsla(var(--color-yellow--h), var(--color-yellow--s), var(--color-yellow--l), var(--color-yellow--a))',
                        '--color-green--h: 154.4186046511628',
                        '--color-green--s: 57.847533632286996%',
                        '--color-green--l: 43.72549019607843%',
                        '--color-green--a: 1',
                        '--color-green: hsla(var(--color-green--h), var(--color-green--s), var(--color-green--l), var(--color-green--a))',
                        '--color-teal--h: 173.8888888888889',
                        '--color-teal--s: 42.85714285714286%',
                        '--color-teal--l: 49.411764705882355%',
                        '--color-teal--a: 1',
                        '--color-teal: hsla(var(--color-teal--h), var(--color-teal--s), var(--color-teal--l), var(--color-teal--a))',
                        '--color-blue--h: 195.0967741935484',
                        '--color-blue--s: 77.11442786069651%',
                        '--color-blue--l: 39.411764705882355%',
                        '--color-blue--a: 1',
                        '--color-blue: hsla(var(--color-blue--h), var(--color-blue--s), var(--color-blue--l), var(--color-blue--a))',
                        '--color-purple--h: 262.2857142857142',
                        '--color-purple--s: 30.172413793103452%',
                        '--color-purple--l: 54.50980392156863%',
                        '--color-purple--a: 1',
                        '--color-purple: hsla(var(--color-purple--h), var(--color-purple--s), var(--color-purple--l), var(--color-purple--a))',
                        '--color-pink--h: 351.42857142857144',
                        '--color-pink--s: 95.68345323741009%',
                        '--color-pink--l: 72.74509803921569%',
                        '--color-pink--a: 1',
                        '--color-pink: hsla(var(--color-pink--h), var(--color-pink--s), var(--color-pink--l), var(--color-pink--a))',
                        '--color-white--h: 0',
                        '--color-white--s: 0%',
                        '--color-white--l: 100%',
                        '--color-white--a: 1',
                        '--color-white: hsla(var(--color-white--h), var(--color-white--s), var(--color-white--l), var(--color-white--a))',
                        '--color-black--h: 0',
                        '--color-black--s: 0%',
                        '--color-black--l: 0%',
                        '--color-black--a: 1',
                        '--color-black: hsla(var(--color-black--h), var(--color-black--s), var(--color-black--l), var(--color-black--a))',
                        '--color-gray-50--h: var(--color-gray--h)',
                        '--color-gray-50--s: var(--color-gray--s)',
                        '--color-gray-50--l: 95%',
                        '--color-gray-50--a: var(--color-gray--a)',
                        '--color-gray-50: hsla(var(--color-gray-50--h), var(--color-gray-50--s), var(--color-gray-50--l), var(--color-gray-50--a))',
                        '--color-gray-100--h: var(--color-gray--h)',
                        '--color-gray-100--s: var(--color-gray--s)',
                        '--color-gray-100--l: 90%',
                        '--color-gray-100--a: var(--color-gray--a)',
                        '--color-gray-100: hsla(var(--color-gray-100--h), var(--color-gray-100--s), var(--color-gray-100--l), var(--color-gray-100--a))',
                        '--color-gray-200--h: var(--color-gray--h)',
                        '--color-gray-200--s: var(--color-gray--s)',
                        '--color-gray-200--l: 80%',
                        '--color-gray-200--a: var(--color-gray--a)',
                        '--color-gray-200: hsla(var(--color-gray-200--h), var(--color-gray-200--s), var(--color-gray-200--l), var(--color-gray-200--a))',
                        '--color-gray-300--h: var(--color-gray--h)',
                        '--color-gray-300--s: var(--color-gray--s)',
                        '--color-gray-300--l: 70%',
                        '--color-gray-300--a: var(--color-gray--a)',
                        '--color-gray-300: hsla(var(--color-gray-300--h), var(--color-gray-300--s), var(--color-gray-300--l), var(--color-gray-300--a))',
                        '--color-gray-400--h: var(--color-gray--h)',
                        '--color-gray-400--s: var(--color-gray--s)',
                        '--color-gray-400--l: 60%',
                        '--color-gray-400--a: var(--color-gray--a)',
                        '--color-gray-400: hsla(var(--color-gray-400--h), var(--color-gray-400--s), var(--color-gray-400--l), var(--color-gray-400--a))',
                        '--color-gray-500--h: var(--color-gray--h)',
                        '--color-gray-500--s: var(--color-gray--s)',
                        '--color-gray-500--l: 50%',
                        '--color-gray-500--a: var(--color-gray--a)',
                        '--color-gray-500: hsla(var(--color-gray-500--h), var(--color-gray-500--s), var(--color-gray-500--l), var(--color-gray-500--a))',
                        '--color-gray-600--h: var(--color-gray--h)',
                        '--color-gray-600--s: var(--color-gray--s)',
                        '--color-gray-600--l: 40%',
                        '--color-gray-600--a: var(--color-gray--a)',
                        '--color-gray-600: hsla(var(--color-gray-600--h), var(--color-gray-600--s), var(--color-gray-600--l), var(--color-gray-600--a))',
                        '--color-gray-700--h: var(--color-gray--h)',
                        '--color-gray-700--s: var(--color-gray--s)',
                        '--color-gray-700--l: 30%',
                        '--color-gray-700--a: var(--color-gray--a)',
                        '--color-gray-700: hsla(var(--color-gray-700--h), var(--color-gray-700--s), var(--color-gray-700--l), var(--color-gray-700--a))',
                        '--color-gray-800--h: var(--color-gray--h)',
                        '--color-gray-800--s: var(--color-gray--s)',
                        '--color-gray-800--l: 20%',
                        '--color-gray-800--a: var(--color-gray--a)',
                        '--color-gray-800: hsla(var(--color-gray-800--h), var(--color-gray-800--s), var(--color-gray-800--l), var(--color-gray-800--a))',
                        '--color-gray-900--h: var(--color-gray--h)',
                        '--color-gray-900--s: var(--color-gray--s)',
                        '--color-gray-900--l: 10%',
                        '--color-gray-900--a: var(--color-gray--a)',
                        '--color-gray-900: hsla(var(--color-gray-900--h), var(--color-gray-900--s), var(--color-gray-900--l), var(--color-gray-900--a))',
                        '--color-gray-shade-150--h: var(--color-gray--h)',
                        '--color-gray-shade-150--s: var(--color-gray--s)',
                        '--color-gray-shade-150--l: calc(var(--color-gray--l) - 15%)',
                        '--color-gray-shade-150--a: var(--color-gray--a)',
                        '--color-gray-shade-150: hsla(var(--color-gray-shade-150--h), var(--color-gray-shade-150--s), var(--color-gray-shade-150--l), var(--color-gray-shade-150--a))',
                        '--color-gray-shade-100--h: var(--color-gray--h)',
                        '--color-gray-shade-100--s: var(--color-gray--s)',
                        '--color-gray-shade-100--l: calc(var(--color-gray--l) - 10%)',
                        '--color-gray-shade-100--a: var(--color-gray--a)',
                        '--color-gray-shade-100: hsla(var(--color-gray-shade-100--h), var(--color-gray-shade-100--s), var(--color-gray-shade-100--l), var(--color-gray-shade-100--a))',
                        '--color-gray-shade-50--h: var(--color-gray--h)',
                        '--color-gray-shade-50--s: var(--color-gray--s)',
                        '--color-gray-shade-50--l: calc(var(--color-gray--l) - 5%)',
                        '--color-gray-shade-50--a: var(--color-gray--a)',
                        '--color-gray-shade-50: hsla(var(--color-gray-shade-50--h), var(--color-gray-shade-50--s), var(--color-gray-shade-50--l), var(--color-gray-shade-50--a))',
                        '--color-gray-tint-50--h: var(--color-gray--h)',
                        '--color-gray-tint-50--s: var(--color-gray--s)',
                        '--color-gray-tint-50--l: calc(var(--color-gray--l) + 5%)',
                        '--color-gray-tint-50--a: var(--color-gray--a)',
                        '--color-gray-tint-50: hsla(var(--color-gray-tint-50--h), var(--color-gray-tint-50--s), var(--color-gray-tint-50--l), var(--color-gray-tint-50--a))',
                        '--color-gray-tint-100--h: var(--color-gray--h)',
                        '--color-gray-tint-100--s: var(--color-gray--s)',
                        '--color-gray-tint-100--l: calc(var(--color-gray--l) + 10%)',
                        '--color-gray-tint-100--a: var(--color-gray--a)',
                        '--color-gray-tint-100: hsla(var(--color-gray-tint-100--h), var(--color-gray-tint-100--s), var(--color-gray-tint-100--l), var(--color-gray-tint-100--a))',
                        '--color-gray-tint-150--h: var(--color-gray--h)',
                        '--color-gray-tint-150--s: var(--color-gray--s)',
                        '--color-gray-tint-150--l: calc(var(--color-gray--l) + 15%)',
                        '--color-gray-tint-150--a: var(--color-gray--a)',
                        '--color-gray-tint-150: hsla(var(--color-gray-tint-150--h), var(--color-gray-tint-150--s), var(--color-gray-tint-150--l), var(--color-gray-tint-150--a))',
                        '--color-gray--h: 193.63636363636363',
                        '--color-gray--s: 10.784313725490199%',
                        '--color-gray--l: 60.00000000000001%',
                        '--color-gray--a: 1',
                        '--color-gray: hsla(var(--color-gray--h), var(--color-gray--s), var(--color-gray--l), var(--color-gray--a))',
                        '--color-light-shade-150--h: var(--color-light--h)',
                        '--color-light-shade-150--s: var(--color-light--s)',
                        '--color-light-shade-150--l: calc(var(--color-light--l) - 15%)',
                        '--color-light-shade-150--a: var(--color-light--a)',
                        '--color-light-shade-150: hsla(var(--color-light-shade-150--h), var(--color-light-shade-150--s), var(--color-light-shade-150--l), var(--color-light-shade-150--a))',
                        '--color-light-shade-100--h: var(--color-light--h)',
                        '--color-light-shade-100--s: var(--color-light--s)',
                        '--color-light-shade-100--l: calc(var(--color-light--l) - 10%)',
                        '--color-light-shade-100--a: var(--color-light--a)',
                        '--color-light-shade-100: hsla(var(--color-light-shade-100--h), var(--color-light-shade-100--s), var(--color-light-shade-100--l), var(--color-light-shade-100--a))',
                        '--color-light-shade-50--h: var(--color-light--h)',
                        '--color-light-shade-50--s: var(--color-light--s)',
                        '--color-light-shade-50--l: calc(var(--color-light--l) - 5%)',
                        '--color-light-shade-50--a: var(--color-light--a)',
                        '--color-light-shade-50: hsla(var(--color-light-shade-50--h), var(--color-light-shade-50--s), var(--color-light-shade-50--l), var(--color-light-shade-50--a))',
                        '--color-light-tint-50--h: var(--color-light--h)',
                        '--color-light-tint-50--s: var(--color-light--s)',
                        '--color-light-tint-50--l: calc(var(--color-light--l) + 5%)',
                        '--color-light-tint-50--a: var(--color-light--a)',
                        '--color-light-tint-50: hsla(var(--color-light-tint-50--h), var(--color-light-tint-50--s), var(--color-light-tint-50--l), var(--color-light-tint-50--a))',
                        '--color-light-tint-100--h: var(--color-light--h)',
                        '--color-light-tint-100--s: var(--color-light--s)',
                        '--color-light-tint-100--l: calc(var(--color-light--l) + 10%)',
                        '--color-light-tint-100--a: var(--color-light--a)',
                        '--color-light-tint-100: hsla(var(--color-light-tint-100--h), var(--color-light-tint-100--s), var(--color-light-tint-100--l), var(--color-light-tint-100--a))',
                        '--color-light-tint-150--h: var(--color-light--h)',
                        '--color-light-tint-150--s: var(--color-light--s)',
                        '--color-light-tint-150--l: calc(var(--color-light--l) + 15%)',
                        '--color-light-tint-150--a: var(--color-light--a)',
                        '--color-light-tint-150: hsla(var(--color-light-tint-150--h), var(--color-light-tint-150--s), var(--color-light-tint-150--l), var(--color-light-tint-150--a))',
                        '--color-light--h: var(--color-gray-100--h)',
                        '--color-light--s: var(--color-gray-100--s)',
                        '--color-light--l: var(--color-gray-100--l)',
                        '--color-light--a: var(--color-gray-100--a)',
                        '--color-light: hsla(var(--color-light--h), var(--color-light--s), var(--color-light--l), var(--color-light--a))',
                        '--color-dark-shade-150--h: var(--color-dark--h)',
                        '--color-dark-shade-150--s: var(--color-dark--s)',
                        '--color-dark-shade-150--l: calc(var(--color-dark--l) - 15%)',
                        '--color-dark-shade-150--a: var(--color-dark--a)',
                        '--color-dark-shade-150: hsla(var(--color-dark-shade-150--h), var(--color-dark-shade-150--s), var(--color-dark-shade-150--l), var(--color-dark-shade-150--a))',
                        '--color-dark-shade-100--h: var(--color-dark--h)',
                        '--color-dark-shade-100--s: var(--color-dark--s)',
                        '--color-dark-shade-100--l: calc(var(--color-dark--l) - 10%)',
                        '--color-dark-shade-100--a: var(--color-dark--a)',
                        '--color-dark-shade-100: hsla(var(--color-dark-shade-100--h), var(--color-dark-shade-100--s), var(--color-dark-shade-100--l), var(--color-dark-shade-100--a))',
                        '--color-dark-shade-50--h: var(--color-dark--h)',
                        '--color-dark-shade-50--s: var(--color-dark--s)',
                        '--color-dark-shade-50--l: calc(var(--color-dark--l) - 5%)',
                        '--color-dark-shade-50--a: var(--color-dark--a)',
                        '--color-dark-shade-50: hsla(var(--color-dark-shade-50--h), var(--color-dark-shade-50--s), var(--color-dark-shade-50--l), var(--color-dark-shade-50--a))',
                        '--color-dark-tint-50--h: var(--color-dark--h)',
                        '--color-dark-tint-50--s: var(--color-dark--s)',
                        '--color-dark-tint-50--l: calc(var(--color-dark--l) + 5%)',
                        '--color-dark-tint-50--a: var(--color-dark--a)',
                        '--color-dark-tint-50: hsla(var(--color-dark-tint-50--h), var(--color-dark-tint-50--s), var(--color-dark-tint-50--l), var(--color-dark-tint-50--a))',
                        '--color-dark-tint-100--h: var(--color-dark--h)',
                        '--color-dark-tint-100--s: var(--color-dark--s)',
                        '--color-dark-tint-100--l: calc(var(--color-dark--l) + 10%)',
                        '--color-dark-tint-100--a: var(--color-dark--a)',
                        '--color-dark-tint-100: hsla(var(--color-dark-tint-100--h), var(--color-dark-tint-100--s), var(--color-dark-tint-100--l), var(--color-dark-tint-100--a))',
                        '--color-dark-tint-150--h: var(--color-dark--h)',
                        '--color-dark-tint-150--s: var(--color-dark--s)',
                        '--color-dark-tint-150--l: calc(var(--color-dark--l) + 15%)',
                        '--color-dark-tint-150--a: var(--color-dark--a)',
                        '--color-dark-tint-150: hsla(var(--color-dark-tint-150--h), var(--color-dark-tint-150--s), var(--color-dark-tint-150--l), var(--color-dark-tint-150--a))',
                        '--color-dark--h: var(--color-gray-800--h)',
                        '--color-dark--s: var(--color-gray-800--s)',
                        '--color-dark--l: var(--color-gray-800--l)',
                        '--color-dark--a: var(--color-gray-800--a)',
                        '--color-dark: hsla(var(--color-dark--h), var(--color-dark--s), var(--color-dark--l), var(--color-dark--a))',
                        '--color-primary-50--h: var(--color-primary--h)',
                        '--color-primary-50--s: var(--color-primary--s)',
                        '--color-primary-50--l: 95%',
                        '--color-primary-50--a: var(--color-primary--a)',
                        '--color-primary-50: hsla(var(--color-primary-50--h), var(--color-primary-50--s), var(--color-primary-50--l), var(--color-primary-50--a))',
                        '--color-primary-100--h: var(--color-primary--h)',
                        '--color-primary-100--s: var(--color-primary--s)',
                        '--color-primary-100--l: 90%',
                        '--color-primary-100--a: var(--color-primary--a)',
                        '--color-primary-100: hsla(var(--color-primary-100--h), var(--color-primary-100--s), var(--color-primary-100--l), var(--color-primary-100--a))',
                        '--color-primary-200--h: var(--color-primary--h)',
                        '--color-primary-200--s: var(--color-primary--s)',
                        '--color-primary-200--l: 80%',
                        '--color-primary-200--a: var(--color-primary--a)',
                        '--color-primary-200: hsla(var(--color-primary-200--h), var(--color-primary-200--s), var(--color-primary-200--l), var(--color-primary-200--a))',
                        '--color-primary-300--h: var(--color-primary--h)',
                        '--color-primary-300--s: var(--color-primary--s)',
                        '--color-primary-300--l: 70%',
                        '--color-primary-300--a: var(--color-primary--a)',
                        '--color-primary-300: hsla(var(--color-primary-300--h), var(--color-primary-300--s), var(--color-primary-300--l), var(--color-primary-300--a))',
                        '--color-primary-400--h: var(--color-primary--h)',
                        '--color-primary-400--s: var(--color-primary--s)',
                        '--color-primary-400--l: 60%',
                        '--color-primary-400--a: var(--color-primary--a)',
                        '--color-primary-400: hsla(var(--color-primary-400--h), var(--color-primary-400--s), var(--color-primary-400--l), var(--color-primary-400--a))',
                        '--color-primary-500--h: var(--color-primary--h)',
                        '--color-primary-500--s: var(--color-primary--s)',
                        '--color-primary-500--l: 50%',
                        '--color-primary-500--a: var(--color-primary--a)',
                        '--color-primary-500: hsla(var(--color-primary-500--h), var(--color-primary-500--s), var(--color-primary-500--l), var(--color-primary-500--a))',
                        '--color-primary-600--h: var(--color-primary--h)',
                        '--color-primary-600--s: var(--color-primary--s)',
                        '--color-primary-600--l: 40%',
                        '--color-primary-600--a: var(--color-primary--a)',
                        '--color-primary-600: hsla(var(--color-primary-600--h), var(--color-primary-600--s), var(--color-primary-600--l), var(--color-primary-600--a))',
                        '--color-primary-700--h: var(--color-primary--h)',
                        '--color-primary-700--s: var(--color-primary--s)',
                        '--color-primary-700--l: 30%',
                        '--color-primary-700--a: var(--color-primary--a)',
                        '--color-primary-700: hsla(var(--color-primary-700--h), var(--color-primary-700--s), var(--color-primary-700--l), var(--color-primary-700--a))',
                        '--color-primary-800--h: var(--color-primary--h)',
                        '--color-primary-800--s: var(--color-primary--s)',
                        '--color-primary-800--l: 20%',
                        '--color-primary-800--a: var(--color-primary--a)',
                        '--color-primary-800: hsla(var(--color-primary-800--h), var(--color-primary-800--s), var(--color-primary-800--l), var(--color-primary-800--a))',
                        '--color-primary-900--h: var(--color-primary--h)',
                        '--color-primary-900--s: var(--color-primary--s)',
                        '--color-primary-900--l: 10%',
                        '--color-primary-900--a: var(--color-primary--a)',
                        '--color-primary-900: hsla(var(--color-primary-900--h), var(--color-primary-900--s), var(--color-primary-900--l), var(--color-primary-900--a))',
                        '--color-primary-shade-150--h: var(--color-primary--h)',
                        '--color-primary-shade-150--s: var(--color-primary--s)',
                        '--color-primary-shade-150--l: calc(var(--color-primary--l) - 15%)',
                        '--color-primary-shade-150--a: var(--color-primary--a)',
                        '--color-primary-shade-150: hsla(var(--color-primary-shade-150--h), var(--color-primary-shade-150--s), var(--color-primary-shade-150--l), var(--color-primary-shade-150--a))',
                        '--color-primary-shade-100--h: var(--color-primary--h)',
                        '--color-primary-shade-100--s: var(--color-primary--s)',
                        '--color-primary-shade-100--l: calc(var(--color-primary--l) - 10%)',
                        '--color-primary-shade-100--a: var(--color-primary--a)',
                        '--color-primary-shade-100: hsla(var(--color-primary-shade-100--h), var(--color-primary-shade-100--s), var(--color-primary-shade-100--l), var(--color-primary-shade-100--a))',
                        '--color-primary-shade-50--h: var(--color-primary--h)',
                        '--color-primary-shade-50--s: var(--color-primary--s)',
                        '--color-primary-shade-50--l: calc(var(--color-primary--l) - 5%)',
                        '--color-primary-shade-50--a: var(--color-primary--a)',
                        '--color-primary-shade-50: hsla(var(--color-primary-shade-50--h), var(--color-primary-shade-50--s), var(--color-primary-shade-50--l), var(--color-primary-shade-50--a))',
                        '--color-primary-tint-50--h: var(--color-primary--h)',
                        '--color-primary-tint-50--s: var(--color-primary--s)',
                        '--color-primary-tint-50--l: calc(var(--color-primary--l) + 5%)',
                        '--color-primary-tint-50--a: var(--color-primary--a)',
                        '--color-primary-tint-50: hsla(var(--color-primary-tint-50--h), var(--color-primary-tint-50--s), var(--color-primary-tint-50--l), var(--color-primary-tint-50--a))',
                        '--color-primary-tint-100--h: var(--color-primary--h)',
                        '--color-primary-tint-100--s: var(--color-primary--s)',
                        '--color-primary-tint-100--l: calc(var(--color-primary--l) + 10%)',
                        '--color-primary-tint-100--a: var(--color-primary--a)',
                        '--color-primary-tint-100: hsla(var(--color-primary-tint-100--h), var(--color-primary-tint-100--s), var(--color-primary-tint-100--l), var(--color-primary-tint-100--a))',
                        '--color-primary-tint-150--h: var(--color-primary--h)',
                        '--color-primary-tint-150--s: var(--color-primary--s)',
                        '--color-primary-tint-150--l: calc(var(--color-primary--l) + 15%)',
                        '--color-primary-tint-150--a: var(--color-primary--a)',
                        '--color-primary-tint-150: hsla(var(--color-primary-tint-150--h), var(--color-primary-tint-150--s), var(--color-primary-tint-150--l), var(--color-primary-tint-150--a))',
                        '--color-primary--h: var(--color-blue--h)',
                        '--color-primary--s: var(--color-blue--s)',
                        '--color-primary--l: var(--color-blue--l)',
                        '--color-primary--a: var(--color-blue--a)',
                        '--color-primary: hsla(var(--color-primary--h), var(--color-primary--s), var(--color-primary--l), var(--color-primary--a))',
                        '--color-secondary-50--h: var(--color-secondary--h)',
                        '--color-secondary-50--s: var(--color-secondary--s)',
                        '--color-secondary-50--l: 95%',
                        '--color-secondary-50--a: var(--color-secondary--a)',
                        '--color-secondary-50: hsla(var(--color-secondary-50--h), var(--color-secondary-50--s), var(--color-secondary-50--l), var(--color-secondary-50--a))',
                        '--color-secondary-100--h: var(--color-secondary--h)',
                        '--color-secondary-100--s: var(--color-secondary--s)',
                        '--color-secondary-100--l: 90%',
                        '--color-secondary-100--a: var(--color-secondary--a)',
                        '--color-secondary-100: hsla(var(--color-secondary-100--h), var(--color-secondary-100--s), var(--color-secondary-100--l), var(--color-secondary-100--a))',
                        '--color-secondary-200--h: var(--color-secondary--h)',
                        '--color-secondary-200--s: var(--color-secondary--s)',
                        '--color-secondary-200--l: 80%',
                        '--color-secondary-200--a: var(--color-secondary--a)',
                        '--color-secondary-200: hsla(var(--color-secondary-200--h), var(--color-secondary-200--s), var(--color-secondary-200--l), var(--color-secondary-200--a))',
                        '--color-secondary-300--h: var(--color-secondary--h)',
                        '--color-secondary-300--s: var(--color-secondary--s)',
                        '--color-secondary-300--l: 70%',
                        '--color-secondary-300--a: var(--color-secondary--a)',
                        '--color-secondary-300: hsla(var(--color-secondary-300--h), var(--color-secondary-300--s), var(--color-secondary-300--l), var(--color-secondary-300--a))',
                        '--color-secondary-400--h: var(--color-secondary--h)',
                        '--color-secondary-400--s: var(--color-secondary--s)',
                        '--color-secondary-400--l: 60%',
                        '--color-secondary-400--a: var(--color-secondary--a)',
                        '--color-secondary-400: hsla(var(--color-secondary-400--h), var(--color-secondary-400--s), var(--color-secondary-400--l), var(--color-secondary-400--a))',
                        '--color-secondary-500--h: var(--color-secondary--h)',
                        '--color-secondary-500--s: var(--color-secondary--s)',
                        '--color-secondary-500--l: 50%',
                        '--color-secondary-500--a: var(--color-secondary--a)',
                        '--color-secondary-500: hsla(var(--color-secondary-500--h), var(--color-secondary-500--s), var(--color-secondary-500--l), var(--color-secondary-500--a))',
                        '--color-secondary-600--h: var(--color-secondary--h)',
                        '--color-secondary-600--s: var(--color-secondary--s)',
                        '--color-secondary-600--l: 40%',
                        '--color-secondary-600--a: var(--color-secondary--a)',
                        '--color-secondary-600: hsla(var(--color-secondary-600--h), var(--color-secondary-600--s), var(--color-secondary-600--l), var(--color-secondary-600--a))',
                        '--color-secondary-700--h: var(--color-secondary--h)',
                        '--color-secondary-700--s: var(--color-secondary--s)',
                        '--color-secondary-700--l: 30%',
                        '--color-secondary-700--a: var(--color-secondary--a)',
                        '--color-secondary-700: hsla(var(--color-secondary-700--h), var(--color-secondary-700--s), var(--color-secondary-700--l), var(--color-secondary-700--a))',
                        '--color-secondary-800--h: var(--color-secondary--h)',
                        '--color-secondary-800--s: var(--color-secondary--s)',
                        '--color-secondary-800--l: 20%',
                        '--color-secondary-800--a: var(--color-secondary--a)',
                        '--color-secondary-800: hsla(var(--color-secondary-800--h), var(--color-secondary-800--s), var(--color-secondary-800--l), var(--color-secondary-800--a))',
                        '--color-secondary-900--h: var(--color-secondary--h)',
                        '--color-secondary-900--s: var(--color-secondary--s)',
                        '--color-secondary-900--l: 10%',
                        '--color-secondary-900--a: var(--color-secondary--a)',
                        '--color-secondary-900: hsla(var(--color-secondary-900--h), var(--color-secondary-900--s), var(--color-secondary-900--l), var(--color-secondary-900--a))',
                        '--color-secondary-shade-150--h: var(--color-secondary--h)',
                        '--color-secondary-shade-150--s: var(--color-secondary--s)',
                        '--color-secondary-shade-150--l: calc(var(--color-secondary--l) - 15%)',
                        '--color-secondary-shade-150--a: var(--color-secondary--a)',
                        '--color-secondary-shade-150: hsla(var(--color-secondary-shade-150--h), var(--color-secondary-shade-150--s), var(--color-secondary-shade-150--l), var(--color-secondary-shade-150--a))',
                        '--color-secondary-shade-100--h: var(--color-secondary--h)',
                        '--color-secondary-shade-100--s: var(--color-secondary--s)',
                        '--color-secondary-shade-100--l: calc(var(--color-secondary--l) - 10%)',
                        '--color-secondary-shade-100--a: var(--color-secondary--a)',
                        '--color-secondary-shade-100: hsla(var(--color-secondary-shade-100--h), var(--color-secondary-shade-100--s), var(--color-secondary-shade-100--l), var(--color-secondary-shade-100--a))',
                        '--color-secondary-shade-50--h: var(--color-secondary--h)',
                        '--color-secondary-shade-50--s: var(--color-secondary--s)',
                        '--color-secondary-shade-50--l: calc(var(--color-secondary--l) - 5%)',
                        '--color-secondary-shade-50--a: var(--color-secondary--a)',
                        '--color-secondary-shade-50: hsla(var(--color-secondary-shade-50--h), var(--color-secondary-shade-50--s), var(--color-secondary-shade-50--l), var(--color-secondary-shade-50--a))',
                        '--color-secondary-tint-50--h: var(--color-secondary--h)',
                        '--color-secondary-tint-50--s: var(--color-secondary--s)',
                        '--color-secondary-tint-50--l: calc(var(--color-secondary--l) + 5%)',
                        '--color-secondary-tint-50--a: var(--color-secondary--a)',
                        '--color-secondary-tint-50: hsla(var(--color-secondary-tint-50--h), var(--color-secondary-tint-50--s), var(--color-secondary-tint-50--l), var(--color-secondary-tint-50--a))',
                        '--color-secondary-tint-100--h: var(--color-secondary--h)',
                        '--color-secondary-tint-100--s: var(--color-secondary--s)',
                        '--color-secondary-tint-100--l: calc(var(--color-secondary--l) + 10%)',
                        '--color-secondary-tint-100--a: var(--color-secondary--a)',
                        '--color-secondary-tint-100: hsla(var(--color-secondary-tint-100--h), var(--color-secondary-tint-100--s), var(--color-secondary-tint-100--l), var(--color-secondary-tint-100--a))',
                        '--color-secondary-tint-150--h: var(--color-secondary--h)',
                        '--color-secondary-tint-150--s: var(--color-secondary--s)',
                        '--color-secondary-tint-150--l: calc(var(--color-secondary--l) + 15%)',
                        '--color-secondary-tint-150--a: var(--color-secondary--a)',
                        '--color-secondary-tint-150: hsla(var(--color-secondary-tint-150--h), var(--color-secondary-tint-150--s), var(--color-secondary-tint-150--l), var(--color-secondary-tint-150--a))',
                        '--color-secondary--h: var(--color-purple--h)',
                        '--color-secondary--s: var(--color-purple--s)',
                        '--color-secondary--l: var(--color-purple--l)',
                        '--color-secondary--a: var(--color-purple--a)',
                        '--color-secondary: hsla(var(--color-secondary--h), var(--color-secondary--s), var(--color-secondary--l), var(--color-secondary--a))',
                        '--color-info-50--h: var(--color-info--h)',
                        '--color-info-50--s: var(--color-info--s)',
                        '--color-info-50--l: 95%',
                        '--color-info-50--a: var(--color-info--a)',
                        '--color-info-50: hsla(var(--color-info-50--h), var(--color-info-50--s), var(--color-info-50--l), var(--color-info-50--a))',
                        '--color-info-100--h: var(--color-info--h)',
                        '--color-info-100--s: var(--color-info--s)',
                        '--color-info-100--l: 90%',
                        '--color-info-100--a: var(--color-info--a)',
                        '--color-info-100: hsla(var(--color-info-100--h), var(--color-info-100--s), var(--color-info-100--l), var(--color-info-100--a))',
                        '--color-info-200--h: var(--color-info--h)',
                        '--color-info-200--s: var(--color-info--s)',
                        '--color-info-200--l: 80%',
                        '--color-info-200--a: var(--color-info--a)',
                        '--color-info-200: hsla(var(--color-info-200--h), var(--color-info-200--s), var(--color-info-200--l), var(--color-info-200--a))',
                        '--color-info-300--h: var(--color-info--h)',
                        '--color-info-300--s: var(--color-info--s)',
                        '--color-info-300--l: 70%',
                        '--color-info-300--a: var(--color-info--a)',
                        '--color-info-300: hsla(var(--color-info-300--h), var(--color-info-300--s), var(--color-info-300--l), var(--color-info-300--a))',
                        '--color-info-400--h: var(--color-info--h)',
                        '--color-info-400--s: var(--color-info--s)',
                        '--color-info-400--l: 60%',
                        '--color-info-400--a: var(--color-info--a)',
                        '--color-info-400: hsla(var(--color-info-400--h), var(--color-info-400--s), var(--color-info-400--l), var(--color-info-400--a))',
                        '--color-info-500--h: var(--color-info--h)',
                        '--color-info-500--s: var(--color-info--s)',
                        '--color-info-500--l: 50%',
                        '--color-info-500--a: var(--color-info--a)',
                        '--color-info-500: hsla(var(--color-info-500--h), var(--color-info-500--s), var(--color-info-500--l), var(--color-info-500--a))',
                        '--color-info-600--h: var(--color-info--h)',
                        '--color-info-600--s: var(--color-info--s)',
                        '--color-info-600--l: 40%',
                        '--color-info-600--a: var(--color-info--a)',
                        '--color-info-600: hsla(var(--color-info-600--h), var(--color-info-600--s), var(--color-info-600--l), var(--color-info-600--a))',
                        '--color-info-700--h: var(--color-info--h)',
                        '--color-info-700--s: var(--color-info--s)',
                        '--color-info-700--l: 30%',
                        '--color-info-700--a: var(--color-info--a)',
                        '--color-info-700: hsla(var(--color-info-700--h), var(--color-info-700--s), var(--color-info-700--l), var(--color-info-700--a))',
                        '--color-info-800--h: var(--color-info--h)',
                        '--color-info-800--s: var(--color-info--s)',
                        '--color-info-800--l: 20%',
                        '--color-info-800--a: var(--color-info--a)',
                        '--color-info-800: hsla(var(--color-info-800--h), var(--color-info-800--s), var(--color-info-800--l), var(--color-info-800--a))',
                        '--color-info-900--h: var(--color-info--h)',
                        '--color-info-900--s: var(--color-info--s)',
                        '--color-info-900--l: 10%',
                        '--color-info-900--a: var(--color-info--a)',
                        '--color-info-900: hsla(var(--color-info-900--h), var(--color-info-900--s), var(--color-info-900--l), var(--color-info-900--a))',
                        '--color-info-shade-150--h: var(--color-info--h)',
                        '--color-info-shade-150--s: var(--color-info--s)',
                        '--color-info-shade-150--l: calc(var(--color-info--l) - 15%)',
                        '--color-info-shade-150--a: var(--color-info--a)',
                        '--color-info-shade-150: hsla(var(--color-info-shade-150--h), var(--color-info-shade-150--s), var(--color-info-shade-150--l), var(--color-info-shade-150--a))',
                        '--color-info-shade-100--h: var(--color-info--h)',
                        '--color-info-shade-100--s: var(--color-info--s)',
                        '--color-info-shade-100--l: calc(var(--color-info--l) - 10%)',
                        '--color-info-shade-100--a: var(--color-info--a)',
                        '--color-info-shade-100: hsla(var(--color-info-shade-100--h), var(--color-info-shade-100--s), var(--color-info-shade-100--l), var(--color-info-shade-100--a))',
                        '--color-info-shade-50--h: var(--color-info--h)',
                        '--color-info-shade-50--s: var(--color-info--s)',
                        '--color-info-shade-50--l: calc(var(--color-info--l) - 5%)',
                        '--color-info-shade-50--a: var(--color-info--a)',
                        '--color-info-shade-50: hsla(var(--color-info-shade-50--h), var(--color-info-shade-50--s), var(--color-info-shade-50--l), var(--color-info-shade-50--a))',
                        '--color-info-tint-50--h: var(--color-info--h)',
                        '--color-info-tint-50--s: var(--color-info--s)',
                        '--color-info-tint-50--l: calc(var(--color-info--l) + 5%)',
                        '--color-info-tint-50--a: var(--color-info--a)',
                        '--color-info-tint-50: hsla(var(--color-info-tint-50--h), var(--color-info-tint-50--s), var(--color-info-tint-50--l), var(--color-info-tint-50--a))',
                        '--color-info-tint-100--h: var(--color-info--h)',
                        '--color-info-tint-100--s: var(--color-info--s)',
                        '--color-info-tint-100--l: calc(var(--color-info--l) + 10%)',
                        '--color-info-tint-100--a: var(--color-info--a)',
                        '--color-info-tint-100: hsla(var(--color-info-tint-100--h), var(--color-info-tint-100--s), var(--color-info-tint-100--l), var(--color-info-tint-100--a))',
                        '--color-info-tint-150--h: var(--color-info--h)',
                        '--color-info-tint-150--s: var(--color-info--s)',
                        '--color-info-tint-150--l: calc(var(--color-info--l) + 15%)',
                        '--color-info-tint-150--a: var(--color-info--a)',
                        '--color-info-tint-150: hsla(var(--color-info-tint-150--h), var(--color-info-tint-150--s), var(--color-info-tint-150--l), var(--color-info-tint-150--a))',
                        '--color-info--h: var(--color-teal--h)',
                        '--color-info--s: var(--color-teal--s)',
                        '--color-info--l: var(--color-teal--l)',
                        '--color-info--a: var(--color-teal--a)',
                        '--color-info: hsla(var(--color-info--h), var(--color-info--s), var(--color-info--l), var(--color-info--a))',
                        '--color-success-50--h: var(--color-success--h)',
                        '--color-success-50--s: var(--color-success--s)',
                        '--color-success-50--l: 95%',
                        '--color-success-50--a: var(--color-success--a)',
                        '--color-success-50: hsla(var(--color-success-50--h), var(--color-success-50--s), var(--color-success-50--l), var(--color-success-50--a))',
                        '--color-success-100--h: var(--color-success--h)',
                        '--color-success-100--s: var(--color-success--s)',
                        '--color-success-100--l: 90%',
                        '--color-success-100--a: var(--color-success--a)',
                        '--color-success-100: hsla(var(--color-success-100--h), var(--color-success-100--s), var(--color-success-100--l), var(--color-success-100--a))',
                        '--color-success-200--h: var(--color-success--h)',
                        '--color-success-200--s: var(--color-success--s)',
                        '--color-success-200--l: 80%',
                        '--color-success-200--a: var(--color-success--a)',
                        '--color-success-200: hsla(var(--color-success-200--h), var(--color-success-200--s), var(--color-success-200--l), var(--color-success-200--a))',
                        '--color-success-300--h: var(--color-success--h)',
                        '--color-success-300--s: var(--color-success--s)',
                        '--color-success-300--l: 70%',
                        '--color-success-300--a: var(--color-success--a)',
                        '--color-success-300: hsla(var(--color-success-300--h), var(--color-success-300--s), var(--color-success-300--l), var(--color-success-300--a))',
                        '--color-success-400--h: var(--color-success--h)',
                        '--color-success-400--s: var(--color-success--s)',
                        '--color-success-400--l: 60%',
                        '--color-success-400--a: var(--color-success--a)',
                        '--color-success-400: hsla(var(--color-success-400--h), var(--color-success-400--s), var(--color-success-400--l), var(--color-success-400--a))',
                        '--color-success-500--h: var(--color-success--h)',
                        '--color-success-500--s: var(--color-success--s)',
                        '--color-success-500--l: 50%',
                        '--color-success-500--a: var(--color-success--a)',
                        '--color-success-500: hsla(var(--color-success-500--h), var(--color-success-500--s), var(--color-success-500--l), var(--color-success-500--a))',
                        '--color-success-600--h: var(--color-success--h)',
                        '--color-success-600--s: var(--color-success--s)',
                        '--color-success-600--l: 40%',
                        '--color-success-600--a: var(--color-success--a)',
                        '--color-success-600: hsla(var(--color-success-600--h), var(--color-success-600--s), var(--color-success-600--l), var(--color-success-600--a))',
                        '--color-success-700--h: var(--color-success--h)',
                        '--color-success-700--s: var(--color-success--s)',
                        '--color-success-700--l: 30%',
                        '--color-success-700--a: var(--color-success--a)',
                        '--color-success-700: hsla(var(--color-success-700--h), var(--color-success-700--s), var(--color-success-700--l), var(--color-success-700--a))',
                        '--color-success-800--h: var(--color-success--h)',
                        '--color-success-800--s: var(--color-success--s)',
                        '--color-success-800--l: 20%',
                        '--color-success-800--a: var(--color-success--a)',
                        '--color-success-800: hsla(var(--color-success-800--h), var(--color-success-800--s), var(--color-success-800--l), var(--color-success-800--a))',
                        '--color-success-900--h: var(--color-success--h)',
                        '--color-success-900--s: var(--color-success--s)',
                        '--color-success-900--l: 10%',
                        '--color-success-900--a: var(--color-success--a)',
                        '--color-success-900: hsla(var(--color-success-900--h), var(--color-success-900--s), var(--color-success-900--l), var(--color-success-900--a))',
                        '--color-success-shade-150--h: var(--color-success--h)',
                        '--color-success-shade-150--s: var(--color-success--s)',
                        '--color-success-shade-150--l: calc(var(--color-success--l) - 15%)',
                        '--color-success-shade-150--a: var(--color-success--a)',
                        '--color-success-shade-150: hsla(var(--color-success-shade-150--h), var(--color-success-shade-150--s), var(--color-success-shade-150--l), var(--color-success-shade-150--a))',
                        '--color-success-shade-100--h: var(--color-success--h)',
                        '--color-success-shade-100--s: var(--color-success--s)',
                        '--color-success-shade-100--l: calc(var(--color-success--l) - 10%)',
                        '--color-success-shade-100--a: var(--color-success--a)',
                        '--color-success-shade-100: hsla(var(--color-success-shade-100--h), var(--color-success-shade-100--s), var(--color-success-shade-100--l), var(--color-success-shade-100--a))',
                        '--color-success-shade-50--h: var(--color-success--h)',
                        '--color-success-shade-50--s: var(--color-success--s)',
                        '--color-success-shade-50--l: calc(var(--color-success--l) - 5%)',
                        '--color-success-shade-50--a: var(--color-success--a)',
                        '--color-success-shade-50: hsla(var(--color-success-shade-50--h), var(--color-success-shade-50--s), var(--color-success-shade-50--l), var(--color-success-shade-50--a))',
                        '--color-success-tint-50--h: var(--color-success--h)',
                        '--color-success-tint-50--s: var(--color-success--s)',
                        '--color-success-tint-50--l: calc(var(--color-success--l) + 5%)',
                        '--color-success-tint-50--a: var(--color-success--a)',
                        '--color-success-tint-50: hsla(var(--color-success-tint-50--h), var(--color-success-tint-50--s), var(--color-success-tint-50--l), var(--color-success-tint-50--a))',
                        '--color-success-tint-100--h: var(--color-success--h)',
                        '--color-success-tint-100--s: var(--color-success--s)',
                        '--color-success-tint-100--l: calc(var(--color-success--l) + 10%)',
                        '--color-success-tint-100--a: var(--color-success--a)',
                        '--color-success-tint-100: hsla(var(--color-success-tint-100--h), var(--color-success-tint-100--s), var(--color-success-tint-100--l), var(--color-success-tint-100--a))',
                        '--color-success-tint-150--h: var(--color-success--h)',
                        '--color-success-tint-150--s: var(--color-success--s)',
                        '--color-success-tint-150--l: calc(var(--color-success--l) + 15%)',
                        '--color-success-tint-150--a: var(--color-success--a)',
                        '--color-success-tint-150: hsla(var(--color-success-tint-150--h), var(--color-success-tint-150--s), var(--color-success-tint-150--l), var(--color-success-tint-150--a))',
                        '--color-success--h: var(--color-green--h)',
                        '--color-success--s: var(--color-green--s)',
                        '--color-success--l: var(--color-green--l)',
                        '--color-success--a: var(--color-green--a)',
                        '--color-success: hsla(var(--color-success--h), var(--color-success--s), var(--color-success--l), var(--color-success--a))',
                        '--color-warning-50--h: var(--color-warning--h)',
                        '--color-warning-50--s: var(--color-warning--s)',
                        '--color-warning-50--l: 95%',
                        '--color-warning-50--a: var(--color-warning--a)',
                        '--color-warning-50: hsla(var(--color-warning-50--h), var(--color-warning-50--s), var(--color-warning-50--l), var(--color-warning-50--a))',
                        '--color-warning-100--h: var(--color-warning--h)',
                        '--color-warning-100--s: var(--color-warning--s)',
                        '--color-warning-100--l: 90%',
                        '--color-warning-100--a: var(--color-warning--a)',
                        '--color-warning-100: hsla(var(--color-warning-100--h), var(--color-warning-100--s), var(--color-warning-100--l), var(--color-warning-100--a))',
                        '--color-warning-200--h: var(--color-warning--h)',
                        '--color-warning-200--s: var(--color-warning--s)',
                        '--color-warning-200--l: 80%',
                        '--color-warning-200--a: var(--color-warning--a)',
                        '--color-warning-200: hsla(var(--color-warning-200--h), var(--color-warning-200--s), var(--color-warning-200--l), var(--color-warning-200--a))',
                        '--color-warning-300--h: var(--color-warning--h)',
                        '--color-warning-300--s: var(--color-warning--s)',
                        '--color-warning-300--l: 70%',
                        '--color-warning-300--a: var(--color-warning--a)',
                        '--color-warning-300: hsla(var(--color-warning-300--h), var(--color-warning-300--s), var(--color-warning-300--l), var(--color-warning-300--a))',
                        '--color-warning-400--h: var(--color-warning--h)',
                        '--color-warning-400--s: var(--color-warning--s)',
                        '--color-warning-400--l: 60%',
                        '--color-warning-400--a: var(--color-warning--a)',
                        '--color-warning-400: hsla(var(--color-warning-400--h), var(--color-warning-400--s), var(--color-warning-400--l), var(--color-warning-400--a))',
                        '--color-warning-500--h: var(--color-warning--h)',
                        '--color-warning-500--s: var(--color-warning--s)',
                        '--color-warning-500--l: 50%',
                        '--color-warning-500--a: var(--color-warning--a)',
                        '--color-warning-500: hsla(var(--color-warning-500--h), var(--color-warning-500--s), var(--color-warning-500--l), var(--color-warning-500--a))',
                        '--color-warning-600--h: var(--color-warning--h)',
                        '--color-warning-600--s: var(--color-warning--s)',
                        '--color-warning-600--l: 40%',
                        '--color-warning-600--a: var(--color-warning--a)',
                        '--color-warning-600: hsla(var(--color-warning-600--h), var(--color-warning-600--s), var(--color-warning-600--l), var(--color-warning-600--a))',
                        '--color-warning-700--h: var(--color-warning--h)',
                        '--color-warning-700--s: var(--color-warning--s)',
                        '--color-warning-700--l: 30%',
                        '--color-warning-700--a: var(--color-warning--a)',
                        '--color-warning-700: hsla(var(--color-warning-700--h), var(--color-warning-700--s), var(--color-warning-700--l), var(--color-warning-700--a))',
                        '--color-warning-800--h: var(--color-warning--h)',
                        '--color-warning-800--s: var(--color-warning--s)',
                        '--color-warning-800--l: 20%',
                        '--color-warning-800--a: var(--color-warning--a)',
                        '--color-warning-800: hsla(var(--color-warning-800--h), var(--color-warning-800--s), var(--color-warning-800--l), var(--color-warning-800--a))',
                        '--color-warning-900--h: var(--color-warning--h)',
                        '--color-warning-900--s: var(--color-warning--s)',
                        '--color-warning-900--l: 10%',
                        '--color-warning-900--a: var(--color-warning--a)',
                        '--color-warning-900: hsla(var(--color-warning-900--h), var(--color-warning-900--s), var(--color-warning-900--l), var(--color-warning-900--a))',
                        '--color-warning-shade-150--h: var(--color-warning--h)',
                        '--color-warning-shade-150--s: var(--color-warning--s)',
                        '--color-warning-shade-150--l: calc(var(--color-warning--l) - 15%)',
                        '--color-warning-shade-150--a: var(--color-warning--a)',
                        '--color-warning-shade-150: hsla(var(--color-warning-shade-150--h), var(--color-warning-shade-150--s), var(--color-warning-shade-150--l), var(--color-warning-shade-150--a))',
                        '--color-warning-shade-100--h: var(--color-warning--h)',
                        '--color-warning-shade-100--s: var(--color-warning--s)',
                        '--color-warning-shade-100--l: calc(var(--color-warning--l) - 10%)',
                        '--color-warning-shade-100--a: var(--color-warning--a)',
                        '--color-warning-shade-100: hsla(var(--color-warning-shade-100--h), var(--color-warning-shade-100--s), var(--color-warning-shade-100--l), var(--color-warning-shade-100--a))',
                        '--color-warning-shade-50--h: var(--color-warning--h)',
                        '--color-warning-shade-50--s: var(--color-warning--s)',
                        '--color-warning-shade-50--l: calc(var(--color-warning--l) - 5%)',
                        '--color-warning-shade-50--a: var(--color-warning--a)',
                        '--color-warning-shade-50: hsla(var(--color-warning-shade-50--h), var(--color-warning-shade-50--s), var(--color-warning-shade-50--l), var(--color-warning-shade-50--a))',
                        '--color-warning-tint-50--h: var(--color-warning--h)',
                        '--color-warning-tint-50--s: var(--color-warning--s)',
                        '--color-warning-tint-50--l: calc(var(--color-warning--l) + 5%)',
                        '--color-warning-tint-50--a: var(--color-warning--a)',
                        '--color-warning-tint-50: hsla(var(--color-warning-tint-50--h), var(--color-warning-tint-50--s), var(--color-warning-tint-50--l), var(--color-warning-tint-50--a))',
                        '--color-warning-tint-100--h: var(--color-warning--h)',
                        '--color-warning-tint-100--s: var(--color-warning--s)',
                        '--color-warning-tint-100--l: calc(var(--color-warning--l) + 10%)',
                        '--color-warning-tint-100--a: var(--color-warning--a)',
                        '--color-warning-tint-100: hsla(var(--color-warning-tint-100--h), var(--color-warning-tint-100--s), var(--color-warning-tint-100--l), var(--color-warning-tint-100--a))',
                        '--color-warning-tint-150--h: var(--color-warning--h)',
                        '--color-warning-tint-150--s: var(--color-warning--s)',
                        '--color-warning-tint-150--l: calc(var(--color-warning--l) + 15%)',
                        '--color-warning-tint-150--a: var(--color-warning--a)',
                        '--color-warning-tint-150: hsla(var(--color-warning-tint-150--h), var(--color-warning-tint-150--s), var(--color-warning-tint-150--l), var(--color-warning-tint-150--a))',
                        '--color-warning--h: var(--color-orange--h)',
                        '--color-warning--s: var(--color-orange--s)',
                        '--color-warning--l: var(--color-orange--l)',
                        '--color-warning--a: var(--color-orange--a)',
                        '--color-warning: hsla(var(--color-warning--h), var(--color-warning--s), var(--color-warning--l), var(--color-warning--a))',
                        '--color-danger-50--h: var(--color-danger--h)',
                        '--color-danger-50--s: var(--color-danger--s)',
                        '--color-danger-50--l: 95%',
                        '--color-danger-50--a: var(--color-danger--a)',
                        '--color-danger-50: hsla(var(--color-danger-50--h), var(--color-danger-50--s), var(--color-danger-50--l), var(--color-danger-50--a))',
                        '--color-danger-100--h: var(--color-danger--h)',
                        '--color-danger-100--s: var(--color-danger--s)',
                        '--color-danger-100--l: 90%',
                        '--color-danger-100--a: var(--color-danger--a)',
                        '--color-danger-100: hsla(var(--color-danger-100--h), var(--color-danger-100--s), var(--color-danger-100--l), var(--color-danger-100--a))',
                        '--color-danger-200--h: var(--color-danger--h)',
                        '--color-danger-200--s: var(--color-danger--s)',
                        '--color-danger-200--l: 80%',
                        '--color-danger-200--a: var(--color-danger--a)',
                        '--color-danger-200: hsla(var(--color-danger-200--h), var(--color-danger-200--s), var(--color-danger-200--l), var(--color-danger-200--a))',
                        '--color-danger-300--h: var(--color-danger--h)',
                        '--color-danger-300--s: var(--color-danger--s)',
                        '--color-danger-300--l: 70%',
                        '--color-danger-300--a: var(--color-danger--a)',
                        '--color-danger-300: hsla(var(--color-danger-300--h), var(--color-danger-300--s), var(--color-danger-300--l), var(--color-danger-300--a))',
                        '--color-danger-400--h: var(--color-danger--h)',
                        '--color-danger-400--s: var(--color-danger--s)',
                        '--color-danger-400--l: 60%',
                        '--color-danger-400--a: var(--color-danger--a)',
                        '--color-danger-400: hsla(var(--color-danger-400--h), var(--color-danger-400--s), var(--color-danger-400--l), var(--color-danger-400--a))',
                        '--color-danger-500--h: var(--color-danger--h)',
                        '--color-danger-500--s: var(--color-danger--s)',
                        '--color-danger-500--l: 50%',
                        '--color-danger-500--a: var(--color-danger--a)',
                        '--color-danger-500: hsla(var(--color-danger-500--h), var(--color-danger-500--s), var(--color-danger-500--l), var(--color-danger-500--a))',
                        '--color-danger-600--h: var(--color-danger--h)',
                        '--color-danger-600--s: var(--color-danger--s)',
                        '--color-danger-600--l: 40%',
                        '--color-danger-600--a: var(--color-danger--a)',
                        '--color-danger-600: hsla(var(--color-danger-600--h), var(--color-danger-600--s), var(--color-danger-600--l), var(--color-danger-600--a))',
                        '--color-danger-700--h: var(--color-danger--h)',
                        '--color-danger-700--s: var(--color-danger--s)',
                        '--color-danger-700--l: 30%',
                        '--color-danger-700--a: var(--color-danger--a)',
                        '--color-danger-700: hsla(var(--color-danger-700--h), var(--color-danger-700--s), var(--color-danger-700--l), var(--color-danger-700--a))',
                        '--color-danger-800--h: var(--color-danger--h)',
                        '--color-danger-800--s: var(--color-danger--s)',
                        '--color-danger-800--l: 20%',
                        '--color-danger-800--a: var(--color-danger--a)',
                        '--color-danger-800: hsla(var(--color-danger-800--h), var(--color-danger-800--s), var(--color-danger-800--l), var(--color-danger-800--a))',
                        '--color-danger-900--h: var(--color-danger--h)',
                        '--color-danger-900--s: var(--color-danger--s)',
                        '--color-danger-900--l: 10%',
                        '--color-danger-900--a: var(--color-danger--a)',
                        '--color-danger-900: hsla(var(--color-danger-900--h), var(--color-danger-900--s), var(--color-danger-900--l), var(--color-danger-900--a))',
                        '--color-danger-shade-150--h: var(--color-danger--h)',
                        '--color-danger-shade-150--s: var(--color-danger--s)',
                        '--color-danger-shade-150--l: calc(var(--color-danger--l) - 15%)',
                        '--color-danger-shade-150--a: var(--color-danger--a)',
                        '--color-danger-shade-150: hsla(var(--color-danger-shade-150--h), var(--color-danger-shade-150--s), var(--color-danger-shade-150--l), var(--color-danger-shade-150--a))',
                        '--color-danger-shade-100--h: var(--color-danger--h)',
                        '--color-danger-shade-100--s: var(--color-danger--s)',
                        '--color-danger-shade-100--l: calc(var(--color-danger--l) - 10%)',
                        '--color-danger-shade-100--a: var(--color-danger--a)',
                        '--color-danger-shade-100: hsla(var(--color-danger-shade-100--h), var(--color-danger-shade-100--s), var(--color-danger-shade-100--l), var(--color-danger-shade-100--a))',
                        '--color-danger-shade-50--h: var(--color-danger--h)',
                        '--color-danger-shade-50--s: var(--color-danger--s)',
                        '--color-danger-shade-50--l: calc(var(--color-danger--l) - 5%)',
                        '--color-danger-shade-50--a: var(--color-danger--a)',
                        '--color-danger-shade-50: hsla(var(--color-danger-shade-50--h), var(--color-danger-shade-50--s), var(--color-danger-shade-50--l), var(--color-danger-shade-50--a))',
                        '--color-danger-tint-50--h: var(--color-danger--h)',
                        '--color-danger-tint-50--s: var(--color-danger--s)',
                        '--color-danger-tint-50--l: calc(var(--color-danger--l) + 5%)',
                        '--color-danger-tint-50--a: var(--color-danger--a)',
                        '--color-danger-tint-50: hsla(var(--color-danger-tint-50--h), var(--color-danger-tint-50--s), var(--color-danger-tint-50--l), var(--color-danger-tint-50--a))',
                        '--color-danger-tint-100--h: var(--color-danger--h)',
                        '--color-danger-tint-100--s: var(--color-danger--s)',
                        '--color-danger-tint-100--l: calc(var(--color-danger--l) + 10%)',
                        '--color-danger-tint-100--a: var(--color-danger--a)',
                        '--color-danger-tint-100: hsla(var(--color-danger-tint-100--h), var(--color-danger-tint-100--s), var(--color-danger-tint-100--l), var(--color-danger-tint-100--a))',
                        '--color-danger-tint-150--h: var(--color-danger--h)',
                        '--color-danger-tint-150--s: var(--color-danger--s)',
                        '--color-danger-tint-150--l: calc(var(--color-danger--l) + 15%)',
                        '--color-danger-tint-150--a: var(--color-danger--a)',
                        '--color-danger-tint-150: hsla(var(--color-danger-tint-150--h), var(--color-danger-tint-150--s), var(--color-danger-tint-150--l), var(--color-danger-tint-150--a))',
                        '--color-danger--h: var(--color-red--h)',
                        '--color-danger--s: var(--color-red--s)',
                        '--color-danger--l: var(--color-red--l)',
                        '--color-danger--a: var(--color-red--a)',
                        '--color-danger: hsla(var(--color-danger--h), var(--color-danger--s), var(--color-danger--l), var(--color-danger--a))'
                    ],
                    path: ['colors']
                },
                {
                    content: [
                        '--badge--primary--background--h: var(--color-primary--h)',
                        '--badge--primary--background--s: var(--color-primary--s)',
                        '--badge--primary--background--l: var(--color-primary--l)',
                        '--badge--primary--background--a: var(--color-primary--a)',
                        '--badge--primary--background: hsla(var(--badge--primary--background--h), var(--badge--primary--background--s), var(--badge--primary--background--l), var(--badge--primary--background--a))',
                        '--badge--primary--color--h: var(--color-primary-contrast-text--h)',
                        '--badge--primary--color--s: var(--color-primary-contrast-text--s)',
                        '--badge--primary--color--l: var(--color-primary-contrast-text--l)',
                        '--badge--primary--color--a: var(--color-primary-contrast-text--a)',
                        '--badge--primary--color: hsla(var(--badge--primary--color--h), var(--badge--primary--color--s), var(--badge--primary--color--l), var(--badge--primary--color--a))',
                        '--badge--secondary--background--h: var(--color-secondary--h)',
                        '--badge--secondary--background--s: var(--color-secondary--s)',
                        '--badge--secondary--background--l: var(--color-secondary--l)',
                        '--badge--secondary--background--a: var(--color-secondary--a)',
                        '--badge--secondary--background: hsla(var(--badge--secondary--background--h), var(--badge--secondary--background--s), var(--badge--secondary--background--l), var(--badge--secondary--background--a))',
                        '--badge--secondary--color--h: var(--color-secondary-contrast-text--h)',
                        '--badge--secondary--color--s: var(--color-secondary-contrast-text--s)',
                        '--badge--secondary--color--l: var(--color-secondary-contrast-text--l)',
                        '--badge--secondary--color--a: var(--color-secondary-contrast-text--a)',
                        '--badge--secondary--color: hsla(var(--badge--secondary--color--h), var(--badge--secondary--color--s), var(--badge--secondary--color--l), var(--badge--secondary--color--a))',
                        '--badge--info--background--h: var(--color-info--h)',
                        '--badge--info--background--s: var(--color-info--s)',
                        '--badge--info--background--l: var(--color-info--l)',
                        '--badge--info--background--a: var(--color-info--a)',
                        '--badge--info--background: hsla(var(--badge--info--background--h), var(--badge--info--background--s), var(--badge--info--background--l), var(--badge--info--background--a))',
                        '--badge--info--color--h: var(--color-info-contrast-text--h)',
                        '--badge--info--color--s: var(--color-info-contrast-text--s)',
                        '--badge--info--color--l: var(--color-info-contrast-text--l)',
                        '--badge--info--color--a: var(--color-info-contrast-text--a)',
                        '--badge--info--color: hsla(var(--badge--info--color--h), var(--badge--info--color--s), var(--badge--info--color--l), var(--badge--info--color--a))',
                        '--badge--success--background--h: var(--color-success--h)',
                        '--badge--success--background--s: var(--color-success--s)',
                        '--badge--success--background--l: var(--color-success--l)',
                        '--badge--success--background--a: var(--color-success--a)',
                        '--badge--success--background: hsla(var(--badge--success--background--h), var(--badge--success--background--s), var(--badge--success--background--l), var(--badge--success--background--a))',
                        '--badge--success--color--h: var(--color-success-contrast-text--h)',
                        '--badge--success--color--s: var(--color-success-contrast-text--s)',
                        '--badge--success--color--l: var(--color-success-contrast-text--l)',
                        '--badge--success--color--a: var(--color-success-contrast-text--a)',
                        '--badge--success--color: hsla(var(--badge--success--color--h), var(--badge--success--color--s), var(--badge--success--color--l), var(--badge--success--color--a))',
                        '--badge--warning--background--h: var(--color-warning--h)',
                        '--badge--warning--background--s: var(--color-warning--s)',
                        '--badge--warning--background--l: var(--color-warning--l)',
                        '--badge--warning--background--a: var(--color-warning--a)',
                        '--badge--warning--background: hsla(var(--badge--warning--background--h), var(--badge--warning--background--s), var(--badge--warning--background--l), var(--badge--warning--background--a))',
                        '--badge--warning--color--h: var(--color-warning-contrast-text--h)',
                        '--badge--warning--color--s: var(--color-warning-contrast-text--s)',
                        '--badge--warning--color--l: var(--color-warning-contrast-text--l)',
                        '--badge--warning--color--a: var(--color-warning-contrast-text--a)',
                        '--badge--warning--color: hsla(var(--badge--warning--color--h), var(--badge--warning--color--s), var(--badge--warning--color--l), var(--badge--warning--color--a))',
                        '--badge--danger--background--h: var(--color-danger--h)',
                        '--badge--danger--background--s: var(--color-danger--s)',
                        '--badge--danger--background--l: var(--color-danger--l)',
                        '--badge--danger--background--a: var(--color-danger--a)',
                        '--badge--danger--background: hsla(var(--badge--danger--background--h), var(--badge--danger--background--s), var(--badge--danger--background--l), var(--badge--danger--background--a))',
                        '--badge--danger--color--h: var(--color-danger-contrast-text--h)',
                        '--badge--danger--color--s: var(--color-danger-contrast-text--s)',
                        '--badge--danger--color--l: var(--color-danger-contrast-text--l)',
                        '--badge--danger--color--a: var(--color-danger-contrast-text--a)',
                        '--badge--danger--color: hsla(var(--badge--danger--color--h), var(--badge--danger--color--s), var(--badge--danger--color--l), var(--badge--danger--color--a))',
                        '--badge--light--background--h: var(--color-light--h)',
                        '--badge--light--background--s: var(--color-light--s)',
                        '--badge--light--background--l: var(--color-light--l)',
                        '--badge--light--background--a: var(--color-light--a)',
                        '--badge--light--background: hsla(var(--badge--light--background--h), var(--badge--light--background--s), var(--badge--light--background--l), var(--badge--light--background--a))',
                        '--badge--light--color--h: var(--color-light-contrast-text--h)',
                        '--badge--light--color--s: var(--color-light-contrast-text--s)',
                        '--badge--light--color--l: var(--color-light-contrast-text--l)',
                        '--badge--light--color--a: var(--color-light-contrast-text--a)',
                        '--badge--light--color: hsla(var(--badge--light--color--h), var(--badge--light--color--s), var(--badge--light--color--l), var(--badge--light--color--a))',
                        '--badge--dark--background--h: var(--color-dark--h)',
                        '--badge--dark--background--s: var(--color-dark--s)',
                        '--badge--dark--background--l: var(--color-dark--l)',
                        '--badge--dark--background--a: var(--color-dark--a)',
                        '--badge--dark--background: hsla(var(--badge--dark--background--h), var(--badge--dark--background--s), var(--badge--dark--background--l), var(--badge--dark--background--a))',
                        '--badge--dark--color--h: var(--color-dark-contrast-text--h)',
                        '--badge--dark--color--s: var(--color-dark-contrast-text--s)',
                        '--badge--dark--color--l: var(--color-dark-contrast-text--l)',
                        '--badge--dark--color--a: var(--color-dark-contrast-text--a)',
                        '--badge--dark--color: hsla(var(--badge--dark--color--h), var(--badge--dark--color--s), var(--badge--dark--color--l), var(--badge--dark--color--a))',
                        '--badge--sm--font-size: var(--font-size-sm)',
                        '--badge--sm--padding-top: var(--padding-top-sm)',
                        '--badge--sm--padding-right: var(--padding-right-sm)',
                        '--badge--sm--padding-bottom: var(--padding-bottom-sm)',
                        '--badge--sm--padding-left: var(--padding-left-sm)',
                        '--badge--sm--padding: var(--badge--sm--padding-top) var(--badge--sm--padding-right) var(--badge--sm--padding-bottom) var(--badge--sm--padding-left)',
                        '--badge--md--font-size: var(--font-size-md)',
                        '--badge--md--padding-top: var(--padding-top-md)',
                        '--badge--md--padding-right: var(--padding-right-md)',
                        '--badge--md--padding-bottom: var(--padding-bottom-md)',
                        '--badge--md--padding-left: var(--padding-left-md)',
                        '--badge--md--padding: var(--badge--md--padding-top) var(--badge--md--padding-right) var(--badge--md--padding-bottom) var(--badge--md--padding-left)',
                        '--badge--lg--font-size: var(--font-size-lg)',
                        '--badge--lg--padding-top: var(--padding-top-lg)',
                        '--badge--lg--padding-right: var(--padding-right-lg)',
                        '--badge--lg--padding-bottom: var(--padding-bottom-lg)',
                        '--badge--lg--padding-left: var(--padding-left-lg)',
                        '--badge--lg--padding: var(--badge--lg--padding-top) var(--badge--lg--padding-right) var(--badge--lg--padding-bottom) var(--badge--lg--padding-left)',
                        '--badge--background--h: var(--color-light--h)',
                        '--badge--background--s: var(--color-light--s)',
                        '--badge--background--l: var(--color-light--l)',
                        '--badge--background--a: var(--color-light--a)',
                        '--badge--background: hsla(var(--badge--background--h), var(--badge--background--s), var(--badge--background--l), var(--badge--background--a))',
                        '--badge--box-shadow-offset-x: var(--box-shadow-offset-x)',
                        '--badge--box-shadow-offset-y: var(--box-shadow-offset-y)',
                        '--badge--box-shadow-blur-radius: var(--box-shadow-blur-radius)',
                        '--badge--box-shadow-spread-radius: var(--box-shadow-spread-radius)',
                        '--badge--box-shadow-color: var(--box-shadow-color)',
                        '--badge--box-shadow: var(--badge--box-shadow-offset-x) var(--badge--box-shadow-offset-y) var(--badge--box-shadow-blur-radius) var(--badge--box-shadow-spread-radius) var(--badge--box-shadow-color)',
                        '--badge--border-top-width: var(--border-top-width)',
                        '--badge--border-top-style: var(--border-top-style)',
                        '--badge--border-top-color: var(--border-top-color)',
                        '--badge--border-top: var(--badge--border-top-width) var(--badge--border-top-style) var(--badge--border-top-color)',
                        '--badge--border-right-width: var(--border-right-width)',
                        '--badge--border-right-style: var(--border-right-style)',
                        '--badge--border-right-color: var(--border-right-color)',
                        '--badge--border-right: var(--badge--border-right-width) var(--badge--border-right-style) var(--badge--border-right-color)',
                        '--badge--border-bottom-width: var(--border-bottom-width)',
                        '--badge--border-bottom-style: var(--border-bottom-style)',
                        '--badge--border-bottom-color: var(--border-bottom-color)',
                        '--badge--border-bottom: var(--badge--border-bottom-width) var(--badge--border-bottom-style) var(--badge--border-bottom-color)',
                        '--badge--border-left-width: var(--border-left-width)',
                        '--badge--border-left-style: var(--border-left-style)',
                        '--badge--border-left-color: var(--border-left-color)',
                        '--badge--border-left: var(--badge--border-left-width) var(--badge--border-left-style) var(--badge--border-left-color)',
                        '--badge--border-width: var(--badge--border-top-width) var(--badge--border-right-width) var(--badge--border-bottom-width) var(--badge--border-left-width)',
                        '--badge--border-style: var(--badge--border-top-style) var(--badge--border-right-style) var(--badge--border-bottom-style) var(--badge--border-left-style)',
                        '--badge--border-color: var(--badge--border-top-color) var(--badge--border-right-color) var(--badge--border-bottom-color) var(--badge--border-left-color)',
                        '--badge--border-top-left-radius: var(--border-radius-top-left)',
                        '--badge--border-top-right-radius: var(--border-radius-top-right)',
                        '--badge--border-bottom-right-radius: var(--border-radius-bottom-right)',
                        '--badge--border-bottom-left-radius: var(--border-radius-bottom-left)',
                        '--badge--border-radius: var(--badge--border-top-left-radius) var(--badge--border-top-right-radius) var(--badge--border-bottom-right-radius) var(--badge--border-bottom-left-radius)',
                        '--badge--color--h: var(--color-light-contrast-text--h)',
                        '--badge--color--s: var(--color-light-contrast-text--s)',
                        '--badge--color--l: var(--color-light-contrast-text--l)',
                        '--badge--color--a: var(--color-light-contrast-text--a)',
                        '--badge--color: hsla(var(--badge--color--h), var(--badge--color--s), var(--badge--color--l), var(--badge--color--a))',
                        '--badge--font-size: var(--font-size-md)',
                        '--badge--padding-top: var(--padding-top)',
                        '--badge--padding-right: var(--padding-right)',
                        '--badge--padding-bottom: var(--padding-bottom)',
                        '--badge--padding-left: var(--padding-left)',
                        '--badge--padding: var(--badge--padding-top) var(--badge--padding-right) var(--badge--padding-bottom) var(--badge--padding-left)'
                    ],
                    path: ['components', 'badge']
                },
                {
                    content: [
                        '--scale-ratio-minor-second: 1.067',
                        '--scale-ratio-major-second: 1.125',
                        '--scale-ratio-minor-third: 1.2',
                        '--scale-ratio-major-third: 1.25',
                        '--scale-ratio-perfect-fourth: 1.333',
                        '--scale-ratio-augmented-fourth: 1.414',
                        '--scale-ratio-perfect-fifth: 1.5',
                        '--scale-ratio-golden: 1.618',
                        '--scale-ratio: var(--scale-ratio-minor-third)',
                        '--scale-ratio-pow-1: calc(var(--scale-ratio))',
                        '--scale-ratio-pow-2: calc(var(--scale-ratio) * var(--scale-ratio))',
                        '--scale-ratio-pow-3: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
                        '--scale-ratio-pow-4: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
                        '--scale-ratio-pow-5: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))',
                        '--scale-ratio-pow-6: calc(var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio))'
                    ],
                    path: ['scaleRatios']
                },
                {
                    content: [
                        '--size--2xs-multiplier: calc(var(--size-multiplier) / var(--scale-ratio-pow-3))',
                        '--size-xs-multiplier: calc(var(--size-multiplier) / var(--scale-ratio-pow-2))',
                        '--size-sm-multiplier: calc(var(--size-multiplier) / var(--scale-ratio-pow-1))',
                        '--size-md-multiplier: var(--size-multiplier)',
                        '--size-lg-multiplier: calc(var(--size-multiplier) * var(--scale-ratio-pow-1))',
                        '--size-xl-multiplier: calc(var(--size-multiplier) * var(--scale-ratio-pow-2))',
                        '--size--2xl-multiplier: calc(var(--size-multiplier) * var(--scale-ratio-pow-3))',
                        '--size-default-multiplier: 1'
                    ],
                    path: ['size', 'multiplier']
                },
                {
                    content: [
                        '--size-percentage-0: 0%',
                        '--size-percentage-25: 25%',
                        '--size-percentage-50: 50%',
                        '--size-percentage-75: 75%',
                        '--size-percentage-100: 100%',
                        '--size-percentage-default: '
                    ],
                    path: ['size', 'percentages']
                },
                {
                    content: [
                        '--spacing-top-2: calc(var(--spacing-top) * 2)',
                        '--spacing-right-2: calc(var(--spacing-right) * 2)',
                        '--spacing-bottom-2: calc(var(--spacing-bottom) * 2)',
                        '--spacing-left-2: calc(var(--spacing-left) * 2)',
                        '--spacing-2: var(--spacing-top-2) var(--spacing-right-2) var(--spacing-bottom-2) var(--spacing-left-2)',
                        '--margin-top-2: var(--spacing-top-2)',
                        '--margin-right-2: var(--spacing-right-2)',
                        '--margin-bottom-2: var(--spacing-bottom-2)',
                        '--margin-left-2: var(--spacing-left-2)',
                        '--margin-2: var(--margin-top-2) var(--margin-right-2) var(--margin-bottom-2) var(--margin-left-2)',
                        '--padding-top-2: var(--spacing-top-2)',
                        '--padding-right-2: var(--spacing-right-2)',
                        '--padding-bottom-2: var(--spacing-bottom-2)',
                        '--padding-left-2: var(--spacing-left-2)',
                        '--padding-2: var(--padding-top-2) var(--padding-right-2) var(--padding-bottom-2) var(--padding-left-2)',
                        '--spacing-top-3: calc(var(--spacing-top) * 3)',
                        '--spacing-right-3: calc(var(--spacing-right) * 3)',
                        '--spacing-bottom-3: calc(var(--spacing-bottom) * 3)',
                        '--spacing-left-3: calc(var(--spacing-left) * 3)',
                        '--spacing-3: var(--spacing-top-3) var(--spacing-right-3) var(--spacing-bottom-3) var(--spacing-left-3)',
                        '--margin-top-3: var(--spacing-top-3)',
                        '--margin-right-3: var(--spacing-right-3)',
                        '--margin-bottom-3: var(--spacing-bottom-3)',
                        '--margin-left-3: var(--spacing-left-3)',
                        '--margin-3: var(--margin-top-3) var(--margin-right-3) var(--margin-bottom-3) var(--margin-left-3)',
                        '--padding-top-3: var(--spacing-top-3)',
                        '--padding-right-3: var(--spacing-right-3)',
                        '--padding-bottom-3: var(--spacing-bottom-3)',
                        '--padding-left-3: var(--spacing-left-3)',
                        '--padding-3: var(--padding-top-3) var(--padding-right-3) var(--padding-bottom-3) var(--padding-left-3)',
                        '--spacing-top-4: calc(var(--spacing-top) * 4)',
                        '--spacing-right-4: calc(var(--spacing-right) * 4)',
                        '--spacing-bottom-4: calc(var(--spacing-bottom) * 4)',
                        '--spacing-left-4: calc(var(--spacing-left) * 4)',
                        '--spacing-4: var(--spacing-top-4) var(--spacing-right-4) var(--spacing-bottom-4) var(--spacing-left-4)',
                        '--margin-top-4: var(--spacing-top-4)',
                        '--margin-right-4: var(--spacing-right-4)',
                        '--margin-bottom-4: var(--spacing-bottom-4)',
                        '--margin-left-4: var(--spacing-left-4)',
                        '--margin-4: var(--margin-top-4) var(--margin-right-4) var(--margin-bottom-4) var(--margin-left-4)',
                        '--padding-top-4: var(--spacing-top-4)',
                        '--padding-right-4: var(--spacing-right-4)',
                        '--padding-bottom-4: var(--spacing-bottom-4)',
                        '--padding-left-4: var(--spacing-left-4)',
                        '--padding-4: var(--padding-top-4) var(--padding-right-4) var(--padding-bottom-4) var(--padding-left-4)',
                        '--spacing-top-5: calc(var(--spacing-top) * 5)',
                        '--spacing-right-5: calc(var(--spacing-right) * 5)',
                        '--spacing-bottom-5: calc(var(--spacing-bottom) * 5)',
                        '--spacing-left-5: calc(var(--spacing-left) * 5)',
                        '--spacing-5: var(--spacing-top-5) var(--spacing-right-5) var(--spacing-bottom-5) var(--spacing-left-5)',
                        '--margin-top-5: var(--spacing-top-5)',
                        '--margin-right-5: var(--spacing-right-5)',
                        '--margin-bottom-5: var(--spacing-bottom-5)',
                        '--margin-left-5: var(--spacing-left-5)',
                        '--margin-5: var(--margin-top-5) var(--margin-right-5) var(--margin-bottom-5) var(--margin-left-5)',
                        '--padding-top-5: var(--spacing-top-5)',
                        '--padding-right-5: var(--spacing-right-5)',
                        '--padding-bottom-5: var(--spacing-bottom-5)',
                        '--padding-left-5: var(--spacing-left-5)',
                        '--padding-5: var(--padding-top-5) var(--padding-right-5) var(--padding-bottom-5) var(--padding-left-5)',
                        '--spacing-top-xs: calc(var(--spacing-top) * var(--size-multiplier-xs))',
                        '--spacing-right-xs: calc(var(--spacing-right) * var(--size-multiplier-xs))',
                        '--spacing-bottom-xs: calc(var(--spacing-bottom) * var(--size-multiplier-xs))',
                        '--spacing-left-xs: calc(var(--spacing-left) * var(--size-multiplier-xs))',
                        '--spacing-xs: var(--spacing-top-xs) var(--spacing-right-xs) var(--spacing-bottom-xs) var(--spacing-left-xs)',
                        '--margin-top-xs: var(--spacing-top-xs)',
                        '--margin-right-xs: var(--spacing-right-xs)',
                        '--margin-bottom-xs: var(--spacing-bottom-xs)',
                        '--margin-left-xs: var(--spacing-left-xs)',
                        '--margin-xs: var(--margin-top-xs) var(--margin-right-xs) var(--margin-bottom-xs) var(--margin-left-xs)',
                        '--padding-top-xs: var(--spacing-top-xs)',
                        '--padding-right-xs: var(--spacing-right-xs)',
                        '--padding-bottom-xs: var(--spacing-bottom-xs)',
                        '--padding-left-xs: var(--spacing-left-xs)',
                        '--padding-xs: var(--padding-top-xs) var(--padding-right-xs) var(--padding-bottom-xs) var(--padding-left-xs)',
                        '--spacing-top-sm: calc(var(--spacing-top) * var(--size-multiplier-sm))',
                        '--spacing-right-sm: calc(var(--spacing-right) * var(--size-multiplier-sm))',
                        '--spacing-bottom-sm: calc(var(--spacing-bottom) * var(--size-multiplier-sm))',
                        '--spacing-left-sm: calc(var(--spacing-left) * var(--size-multiplier-sm))',
                        '--spacing-sm: var(--spacing-top-sm) var(--spacing-right-sm) var(--spacing-bottom-sm) var(--spacing-left-sm)',
                        '--margin-top-sm: var(--spacing-top-sm)',
                        '--margin-right-sm: var(--spacing-right-sm)',
                        '--margin-bottom-sm: var(--spacing-bottom-sm)',
                        '--margin-left-sm: var(--spacing-left-sm)',
                        '--margin-sm: var(--margin-top-sm) var(--margin-right-sm) var(--margin-bottom-sm) var(--margin-left-sm)',
                        '--padding-top-sm: var(--spacing-top-sm)',
                        '--padding-right-sm: var(--spacing-right-sm)',
                        '--padding-bottom-sm: var(--spacing-bottom-sm)',
                        '--padding-left-sm: var(--spacing-left-sm)',
                        '--padding-sm: var(--padding-top-sm) var(--padding-right-sm) var(--padding-bottom-sm) var(--padding-left-sm)',
                        '--spacing-top-md: calc(var(--spacing-top) * var(--size-multiplier-md))',
                        '--spacing-right-md: calc(var(--spacing-right) * var(--size-multiplier-md))',
                        '--spacing-bottom-md: calc(var(--spacing-bottom) * var(--size-multiplier-md))',
                        '--spacing-left-md: calc(var(--spacing-left) * var(--size-multiplier-md))',
                        '--spacing-md: var(--spacing-top-md) var(--spacing-right-md) var(--spacing-bottom-md) var(--spacing-left-md)',
                        '--margin-top-md: var(--spacing-top-md)',
                        '--margin-right-md: var(--spacing-right-md)',
                        '--margin-bottom-md: var(--spacing-bottom-md)',
                        '--margin-left-md: var(--spacing-left-md)',
                        '--margin-md: var(--margin-top-md) var(--margin-right-md) var(--margin-bottom-md) var(--margin-left-md)',
                        '--padding-top-md: var(--spacing-top-md)',
                        '--padding-right-md: var(--spacing-right-md)',
                        '--padding-bottom-md: var(--spacing-bottom-md)',
                        '--padding-left-md: var(--spacing-left-md)',
                        '--padding-md: var(--padding-top-md) var(--padding-right-md) var(--padding-bottom-md) var(--padding-left-md)',
                        '--spacing-top-lg: calc(var(--spacing-top) * var(--size-multiplier-lg))',
                        '--spacing-right-lg: calc(var(--spacing-right) * var(--size-multiplier-lg))',
                        '--spacing-bottom-lg: calc(var(--spacing-bottom) * var(--size-multiplier-lg))',
                        '--spacing-left-lg: calc(var(--spacing-left) * var(--size-multiplier-lg))',
                        '--spacing-lg: var(--spacing-top-lg) var(--spacing-right-lg) var(--spacing-bottom-lg) var(--spacing-left-lg)',
                        '--margin-top-lg: var(--spacing-top-lg)',
                        '--margin-right-lg: var(--spacing-right-lg)',
                        '--margin-bottom-lg: var(--spacing-bottom-lg)',
                        '--margin-left-lg: var(--spacing-left-lg)',
                        '--margin-lg: var(--margin-top-lg) var(--margin-right-lg) var(--margin-bottom-lg) var(--margin-left-lg)',
                        '--padding-top-lg: var(--spacing-top-lg)',
                        '--padding-right-lg: var(--spacing-right-lg)',
                        '--padding-bottom-lg: var(--spacing-bottom-lg)',
                        '--padding-left-lg: var(--spacing-left-lg)',
                        '--padding-lg: var(--padding-top-lg) var(--padding-right-lg) var(--padding-bottom-lg) var(--padding-left-lg)',
                        '--spacing-top-xl: calc(var(--spacing-top) * var(--size-multiplier-xl))',
                        '--spacing-right-xl: calc(var(--spacing-right) * var(--size-multiplier-xl))',
                        '--spacing-bottom-xl: calc(var(--spacing-bottom) * var(--size-multiplier-xl))',
                        '--spacing-left-xl: calc(var(--spacing-left) * var(--size-multiplier-xl))',
                        '--spacing-xl: var(--spacing-top-xl) var(--spacing-right-xl) var(--spacing-bottom-xl) var(--spacing-left-xl)',
                        '--margin-top-xl: var(--spacing-top-xl)',
                        '--margin-right-xl: var(--spacing-right-xl)',
                        '--margin-bottom-xl: var(--spacing-bottom-xl)',
                        '--margin-left-xl: var(--spacing-left-xl)',
                        '--margin-xl: var(--margin-top-xl) var(--margin-right-xl) var(--margin-bottom-xl) var(--margin-left-xl)',
                        '--padding-top-xl: var(--spacing-top-xl)',
                        '--padding-right-xl: var(--spacing-right-xl)',
                        '--padding-bottom-xl: var(--spacing-bottom-xl)',
                        '--padding-left-xl: var(--spacing-left-xl)',
                        '--padding-xl: var(--padding-top-xl) var(--padding-right-xl) var(--padding-bottom-xl) var(--padding-left-xl)',
                        '--spacing-top-1-5: calc(var(--spacing-top) / 5)',
                        '--spacing-right-1-5: calc(var(--spacing-right) / 5)',
                        '--spacing-bottom-1-5: calc(var(--spacing-bottom) / 5)',
                        '--spacing-left-1-5: calc(var(--spacing-left) / 5)',
                        '--spacing-1-5: var(--spacing-top-1-5) var(--spacing-right-1-5) var(--spacing-bottom-1-5) var(--spacing-left-1-5)',
                        '--margin-top-1-5: var(--spacing-top-1-5)',
                        '--margin-right-1-5: var(--spacing-right-1-5)',
                        '--margin-bottom-1-5: var(--spacing-bottom-1-5)',
                        '--margin-left-1-5: var(--spacing-left-1-5)',
                        '--margin-1-5: var(--margin-top-1-5) var(--margin-right-1-5) var(--margin-bottom-1-5) var(--margin-left-1-5)',
                        '--padding-top-1-5: var(--spacing-top-1-5)',
                        '--padding-right-1-5: var(--spacing-right-1-5)',
                        '--padding-bottom-1-5: var(--spacing-bottom-1-5)',
                        '--padding-left-1-5: var(--spacing-left-1-5)',
                        '--padding-1-5: var(--padding-top-1-5) var(--padding-right-1-5) var(--padding-bottom-1-5) var(--padding-left-1-5)',
                        '--spacing-top-1-4: calc(var(--spacing-top) / 4)',
                        '--spacing-right-1-4: calc(var(--spacing-right) / 4)',
                        '--spacing-bottom-1-4: calc(var(--spacing-bottom) / 4)',
                        '--spacing-left-1-4: calc(var(--spacing-left) / 4)',
                        '--spacing-1-4: var(--spacing-top-1-4) var(--spacing-right-1-4) var(--spacing-bottom-1-4) var(--spacing-left-1-4)',
                        '--margin-top-1-4: var(--spacing-top-1-4)',
                        '--margin-right-1-4: var(--spacing-right-1-4)',
                        '--margin-bottom-1-4: var(--spacing-bottom-1-4)',
                        '--margin-left-1-4: var(--spacing-left-1-4)',
                        '--margin-1-4: var(--margin-top-1-4) var(--margin-right-1-4) var(--margin-bottom-1-4) var(--margin-left-1-4)',
                        '--padding-top-1-4: var(--spacing-top-1-4)',
                        '--padding-right-1-4: var(--spacing-right-1-4)',
                        '--padding-bottom-1-4: var(--spacing-bottom-1-4)',
                        '--padding-left-1-4: var(--spacing-left-1-4)',
                        '--padding-1-4: var(--padding-top-1-4) var(--padding-right-1-4) var(--padding-bottom-1-4) var(--padding-left-1-4)',
                        '--spacing-top-3-4: calc(calc(var(--spacing-top) / 4) * 3)',
                        '--spacing-right-3-4: calc(calc(var(--spacing-right) / 4) * 3)',
                        '--spacing-bottom-3-4: calc(calc(var(--spacing-bottom) / 4) * 3)',
                        '--spacing-left-3-4: calc(calc(var(--spacing-left) / 4) * 3)',
                        '--spacing-3-4: var(--spacing-top-3-4) var(--spacing-right-3-4) var(--spacing-bottom-3-4) var(--spacing-left-3-4)',
                        '--margin-top-3-4: var(--spacing-top-3-4)',
                        '--margin-right-3-4: var(--spacing-right-3-4)',
                        '--margin-bottom-3-4: var(--spacing-bottom-3-4)',
                        '--margin-left-3-4: var(--spacing-left-3-4)',
                        '--margin-3-4: var(--margin-top-3-4) var(--margin-right-3-4) var(--margin-bottom-3-4) var(--margin-left-3-4)',
                        '--padding-top-3-4: var(--spacing-top-3-4)',
                        '--padding-right-3-4: var(--spacing-right-3-4)',
                        '--padding-bottom-3-4: var(--spacing-bottom-3-4)',
                        '--padding-left-3-4: var(--spacing-left-3-4)',
                        '--padding-3-4: var(--padding-top-3-4) var(--padding-right-3-4) var(--padding-bottom-3-4) var(--padding-left-3-4)',
                        '--spacing-top-1-3: calc(var(--spacing-top) / 3)',
                        '--spacing-right-1-3: calc(var(--spacing-right) / 3)',
                        '--spacing-bottom-1-3: calc(var(--spacing-bottom) / 3)',
                        '--spacing-left-1-3: calc(var(--spacing-left) / 3)',
                        '--spacing-1-3: var(--spacing-top-1-3) var(--spacing-right-1-3) var(--spacing-bottom-1-3) var(--spacing-left-1-3)',
                        '--margin-top-1-3: var(--spacing-top-1-3)',
                        '--margin-right-1-3: var(--spacing-right-1-3)',
                        '--margin-bottom-1-3: var(--spacing-bottom-1-3)',
                        '--margin-left-1-3: var(--spacing-left-1-3)',
                        '--margin-1-3: var(--margin-top-1-3) var(--margin-right-1-3) var(--margin-bottom-1-3) var(--margin-left-1-3)',
                        '--padding-top-1-3: var(--spacing-top-1-3)',
                        '--padding-right-1-3: var(--spacing-right-1-3)',
                        '--padding-bottom-1-3: var(--spacing-bottom-1-3)',
                        '--padding-left-1-3: var(--spacing-left-1-3)',
                        '--padding-1-3: var(--padding-top-1-3) var(--padding-right-1-3) var(--padding-bottom-1-3) var(--padding-left-1-3)',
                        '--spacing-top-2-3: calc(calc(var(--spacing-top) / 3) * 2)',
                        '--spacing-right-2-3: calc(calc(var(--spacing-right) / 3) * 2)',
                        '--spacing-bottom-2-3: calc(calc(var(--spacing-bottom) / 3) * 2)',
                        '--spacing-left-2-3: calc(calc(var(--spacing-left) / 3) * 2)',
                        '--spacing-2-3: var(--spacing-top-2-3) var(--spacing-right-2-3) var(--spacing-bottom-2-3) var(--spacing-left-2-3)',
                        '--margin-top-2-3: var(--spacing-top-2-3)',
                        '--margin-right-2-3: var(--spacing-right-2-3)',
                        '--margin-bottom-2-3: var(--spacing-bottom-2-3)',
                        '--margin-left-2-3: var(--spacing-left-2-3)',
                        '--margin-2-3: var(--margin-top-2-3) var(--margin-right-2-3) var(--margin-bottom-2-3) var(--margin-left-2-3)',
                        '--padding-top-2-3: var(--spacing-top-2-3)',
                        '--padding-right-2-3: var(--spacing-right-2-3)',
                        '--padding-bottom-2-3: var(--spacing-bottom-2-3)',
                        '--padding-left-2-3: var(--spacing-left-2-3)',
                        '--padding-2-3: var(--padding-top-2-3) var(--padding-right-2-3) var(--padding-bottom-2-3) var(--padding-left-2-3)',
                        '--spacing-top-1-2: calc(var(--spacing-top) / 2)',
                        '--spacing-right-1-2: calc(var(--spacing-right) / 2)',
                        '--spacing-bottom-1-2: calc(var(--spacing-bottom) / 2)',
                        '--spacing-left-1-2: calc(var(--spacing-left) / 2)',
                        '--spacing-1-2: var(--spacing-top-1-2) var(--spacing-right-1-2) var(--spacing-bottom-1-2) var(--spacing-left-1-2)',
                        '--margin-top-1-2: var(--spacing-top-1-2)',
                        '--margin-right-1-2: var(--spacing-right-1-2)',
                        '--margin-bottom-1-2: var(--spacing-bottom-1-2)',
                        '--margin-left-1-2: var(--spacing-left-1-2)',
                        '--margin-1-2: var(--margin-top-1-2) var(--margin-right-1-2) var(--margin-bottom-1-2) var(--margin-left-1-2)',
                        '--padding-top-1-2: var(--spacing-top-1-2)',
                        '--padding-right-1-2: var(--spacing-right-1-2)',
                        '--padding-bottom-1-2: var(--spacing-bottom-1-2)',
                        '--padding-left-1-2: var(--spacing-left-1-2)',
                        '--padding-1-2: var(--padding-top-1-2) var(--padding-right-1-2) var(--padding-bottom-1-2) var(--padding-left-1-2)',
                        '--spacing-top: 1rem',
                        '--spacing-right: 1rem',
                        '--spacing-bottom: 1rem',
                        '--spacing-left: 1rem',
                        '--spacing: var(--spacing-top) var(--spacing-right) var(--spacing-bottom) var(--spacing-left)',
                        '--margin-top: var(--spacing-top)',
                        '--margin-right: var(--spacing-right)',
                        '--margin-bottom: var(--spacing-bottom)',
                        '--margin-left: var(--spacing-left)',
                        '--margin: var(--margin-top) var(--margin-right) var(--margin-bottom) var(--margin-left)',
                        '--padding-top: var(--spacing-top)',
                        '--padding-right: var(--spacing-right)',
                        '--padding-bottom: var(--spacing-bottom)',
                        '--padding-left: var(--spacing-left)',
                        '--padding: var(--padding-top) var(--padding-right) var(--padding-bottom) var(--padding-left)'
                    ],
                    path: ['spacing']
                },
                {
                    content: [
                        "--font-family-base-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                        "--font-family-monospace-primary: 'SFMono-Regular', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        "--font-family-print-primary: 'Georgia', 'Times New Roman', 'Times', serif",
                        '--font-family-primary: var(--font-family-base-primary)',
                        '--font-family-base-secondary: var(--font-family-primary-base)',
                        '--font-family-monospace-secondary: var(--font-family-primary-monospace)',
                        '--font-family-print-secondary: var(--font-family-primary-print)',
                        '--font-family-secondary: var(--font-family-base-secondary)',
                        '--font-family-base: var(--font-family-primary-base)',
                        '--font-family-monospace: var(--font-family-primary-monospace)',
                        '--font-family-print: var(--font-family-primary-print)',
                        '--font-family: var(--font-family-base)'
                    ],
                    path: ['typography', 'fontFamily']
                },
                {
                    content: [
                        '--font-weight-extralight: 200',
                        '--font-weight-light: 300',
                        '--font-weight-normal: normal',
                        '--font-weight-semibold: 600',
                        '--font-weight-bold: bold',
                        '--font-weight-black: 900',
                        '--font-weight-lighter: lighter',
                        '--font-weight-bolder: bolder',
                        '--font-weight: var(--font-weight-normal)'
                    ],
                    path: ['typography', 'fontWeight']
                },
                {
                    content: [
                        '--font-size-xs: calc(var(--font-size) * var(--size-multiplier-xs))',
                        '--font-size-sm: calc(var(--font-size) * var(--size-multiplier-sm))',
                        '--font-size-md: calc(var(--font-size) * var(--size-multiplier-md))',
                        '--font-size-lg: calc(var(--font-size) * var(--size-multiplier-lg))',
                        '--font-size-xl: calc(var(--font-size) * var(--size-multiplier-xl))',
                        '--font-size: 1rem'
                    ],
                    path: ['typography', 'fontSize']
                },
                {
                    content: ['--line-height: 1.5'],
                    path: ['typography', 'lineHeight']
                },
                {
                    content: ['--letter-spacing: 0'],
                    path: ['typography', 'letterSpacing']
                },
                {
                    content: [
                        '--color-dark: var(--color-dark)',
                        '--color-weak: var(--color-gray-700)',
                        '--color-weaker: var(--color-gray-500)',
                        '--color-weakest: var(--color-gray-300)',
                        '--color-light: var(--color-light)',
                        '--color: var(--color-gray-900)'
                    ],
                    path: ['typography', 'color']
                },
                {
                    content: [
                        '--contrast-color-light: var(--color-gray-900)',
                        '--contrast-color-dark: var(--color-white)',
                        '--contrast-color: var(--color-white)'
                    ],
                    path: ['typography', 'contrastColor']
                }
            ]
        });
    });

    it('should apply generator types to object fields', () => {
        const object = { field1: 'value1', field2: 'value2' };
        const meta = createTestingGeneratorMeta({
            path: ['root'],
            generators: [
                defineGenerator<string>({
                    key: 'root.field1',
                    type: GeneratorType.Default,
                    generate: () => ['test1']
                }),
                defineGenerator<string>({
                    key: 'root.field2',
                    type: GeneratorType.CssVariables,
                    generate: () => ['test2']
                })
            ]
        });

        const result = applyChunkGenerators(object, meta);
        expect(result).toEqual([
            {
                name: GeneratorType.Default,
                files: [{ path: ['root', 'field1'], content: ['test1'] }]
            },
            {
                name: GeneratorType.CssVariables,
                files: [{ path: ['root', 'field2'], content: ['test2'] }]
            }
        ]);
    });
});
