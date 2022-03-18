import { defaultPropValue } from '@inkline/inkline/mixins';
import { $inkline } from '@inkline/inkline/plugin';

jest.mock('@inkline/inkline/plugin', () => ({
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
                expect(defaultPropValue(componentName, propertyName, propertyValue)).toEqual(expect.any(Function));
            });

            it('should return fallback property value if inkline prototype not defined', () => {
                $inkline.prototype = undefined;

                const defaultValue = defaultPropValue(componentName, propertyName, propertyValue)();
                expect(defaultValue).toEqual(propertyValue);
            });

            it('should return property value if inkline prototype options.propertyName', () => {
                $inkline.prototype = {
                    options: {
                        [propertyName]: propertyValueOption,
                        componentOptions: {}
                    }
                } as any;

                const defaultValue = defaultPropValue(componentName, propertyName, propertyValue)();
                expect(defaultValue).toEqual(propertyValueOption);
            });

            it('should return property value if inkline prototype options.componentOptions.propertyName', () => {
                $inkline.prototype = {
                    options: {
                        componentOptions: {
                            [componentName]: {
                                [propertyName]: propertyValueOption
                            }
                        }
                    }
                } as any;

                const defaultValue = defaultPropValue(componentName, propertyName, propertyValue)();
                expect(defaultValue).toEqual(propertyValueOption);
            });
        });
    });
});
