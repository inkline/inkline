import { computedPropValue } from '@inkline/inkline/mixins';
import { inklineGlobals } from '@inkline/inkline/plugin';

vi.mock('@inkline/inkline/plugin', () => ({
    inklineGlobals: {
        prototype: {
            options: {}
        }
    }
}));

describe('mixins', () => {
    describe('default', () => {
        describe('defaultPropValue()', () => {
            const componentName = 'IButton';
            const propertyName = 'size';
            const propertyValue = 'md';
            const propertyValueOption = 'lg';

            it('should return a function', () => {
                expect(computedPropValue(componentName, propertyName, propertyValue)).toEqual(expect.any(Function));
            });

            it('should return fallback property value if inkline prototype not defined', () => {
                inklineGlobals.prototype = undefined;

                const defaultValue = computedPropValue(componentName, propertyName, propertyValue)();
                expect(defaultValue).toEqual(propertyValue);
            });

            it('should return property value if inkline prototype options.propertyName', () => {
                inklineGlobals.prototype = {
                    options: {
                        [propertyName]: propertyValueOption,
                        componentOptions: {}
                    }
                } as any;

                const defaultValue = computedPropValue(componentName, propertyName, propertyValue)();
                expect(defaultValue).toEqual(propertyValueOption);
            });

            it('should return property value if inkline prototype options.componentOptions.propertyName', () => {
                inklineGlobals.prototype = {
                    options: {
                        componentOptions: {
                            [componentName]: {
                                [propertyName]: propertyValueOption
                            }
                        }
                    }
                } as any;

                const defaultValue = computedPropValue(componentName, propertyName, propertyValue)();
                expect(defaultValue).toEqual(propertyValueOption);
            });
        });
    });
});
