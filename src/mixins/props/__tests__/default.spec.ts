import { defaultPropValue } from '@inkline/inkline/mixins';
import { inklineGlobals } from '@inkline/inkline/plugin';

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

            it('should return a function', () => {
                expect(defaultPropValue(componentName, propertyName, propertyValue)).toEqual(expect.any(Function));
            });

            it('should return fallback property value if inkline prototype not defined', () => {
                inklineGlobals.prototype = undefined;

                const defaultValue = defaultPropValue(componentName, propertyName, propertyValue)();
                expect(defaultValue).toEqual(propertyValue);
            });
        });
    });
});
