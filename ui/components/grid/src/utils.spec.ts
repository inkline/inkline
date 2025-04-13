import { isBreakpointObject, toBreakpointClasses } from './utils';

describe('isBreakpointObject', () => {
    it('should return true for a valid BreakpointObject', () => {
        const property = { xs: 'value', sm: 'value' };
        expect(isBreakpointObject(property)).toBe(true);
    });

    it('should return false for a non-object value', () => {
        const property = 'string';
        expect(isBreakpointObject(property)).toBe(false);
    });

    it('should return false for a null value', () => {
        const property = null;
        expect(isBreakpointObject(property)).toBe(false);
    });

    it('should return false for an object without breakpoint keys', () => {
        const property = { notABreakpoint: 'value' };
        expect(isBreakpointObject(property)).toBe(false);
    });

    it('should return true for an object with at least one breakpoint key', () => {
        const property = { xs: 'value' };
        expect(isBreakpointObject(property)).toBe(true);
    });

    it('should return false for an empty object', () => {
        const property = {};
        expect(isBreakpointObject(property)).toBe(false);
    });
});

describe('toBreakpointClasses', () => {
    it('should return classes for string value', () => {
        const result = toBreakpointClasses('margin', 'auto');
        expect(result).toEqual({
            '-margin-auto': true
        });
    });

    it('should return classes for BreakpointObject value', () => {
        const value = { xs: '1', sm: '2', md: '3', lg: '4', xl: '5' };
        const result = toBreakpointClasses('padding', value);
        expect(result).toEqual({
            '-xs:padding-1': true,
            '-sm:padding-2': true,
            '-md:padding-3': true,
            '-lg:padding-4': true,
            '-xl:padding-5': true
        });
    });

    it('should return classes for BreakpointObject value with non-overlapping override', () => {
        const value = { xs: '1', sm: '2' };
        const override = { md: '3', lg: '4', xl: '5' };
        const result = toBreakpointClasses('padding', value, override);
        expect(result).toEqual({
            '-xs:padding-1': true,
            '-sm:padding-2': true,
            '-md:padding-3': true,
            '-lg:padding-4': true,
            '-xl:padding-5': true
        });
    });

    it('should return classes for BreakpointObject value with overlapping override', () => {
        const value = { xs: '1', sm: '2', md: '3' };
        const override = { md: '4' };
        const result = toBreakpointClasses('padding', value, override);
        expect(result).toEqual({
            '-xs:padding-1': true,
            '-sm:padding-2': true,
            '-md:padding-3': true
        });
    });

    it('should return empty object for empty BreakpointObject value', () => {
        const value = {};
        const result = toBreakpointClasses('padding', value);
        expect(result).toEqual({});
    });

    it('should return empty object for empty value', () => {
        const result = toBreakpointClasses('padding', '');
        expect(result).toEqual({});
    });
});
