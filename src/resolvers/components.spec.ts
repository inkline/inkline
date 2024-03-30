import { RawThemeComponent } from '../types';
import { componentsResolver, resolveComponent, resolveComponentVariant } from './components';
import { createTestingResolverMeta } from '../__tests__/utils';

describe('resolveComponent', () => {
    const meta = createTestingResolverMeta({
        path: ['components', 'button']
    });

    it('should resolve a component correctly', () => {
        const rawComponent: RawThemeComponent = {
            color: 'white'
        };

        const resolvedComponent = {
            color: { h: 0, s: 0, l: 100, a: 1 }
        };

        expect(resolveComponent(rawComponent, meta)).toEqual(resolvedComponent);
    });
});

describe('resolveComponentVariant', () => {
    const meta = createTestingResolverMeta({
        path: ['components', 'button']
    });

    it('should resolve a variant correctly', () => {
        const rawVariant: RawThemeComponent = {
            color: 'white'
        };

        const resolvedComponent = {
            color: { h: 0, s: 0, l: 100, a: 1 }
        };

        expect(resolveComponentVariant(rawVariant, meta)).toEqual(resolvedComponent);
    });
});

describe('componentsResolver', () => {
    const meta = createTestingResolverMeta({ path: ['components'] });

    it('should resolve components without variants correctly', () => {
        const components = {
            button: {
                color: 'white'
            }
        };

        const resolvedComponents = componentsResolver.resolve(components, meta);

        expect(resolvedComponents).toEqual({
            button: {
                default: {
                    color: { h: 0, s: 0, l: 100, a: 1 } // Expected resolved color
                }
            }
        });
    });

    it('should resolve components with variants correctly', () => {
        const components = {
            button: {
                default: {
                    color: 'white'
                },
                primary: {
                    color: 'blue'
                }
            }
        };

        const resolvedComponents = componentsResolver.resolve(components, meta);

        expect(resolvedComponents).toEqual({
            button: {
                default: {
                    color: { h: 0, s: 0, l: 100, a: 1 }
                },
                primary: {
                    color: { h: 240, s: 100, l: 50, a: 1 }
                }
            }
        });
    });
});
