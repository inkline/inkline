import { breakpointClass } from 'inkline/helpers/breakpointClass';

describe('Helpers', () => {
    describe('breakpointClass()', () => {
        it('should convert className to dash case if breakpoint not specified', () => {
            expect(breakpointClass('aB', '')).toEqual('a-b');
        });

        it('should convert className to dash case and append breakpoint at the end if breakpoint is string', () => {
            expect(breakpointClass('class', 'xs')).toEqual('class-xs');
        });

        it('should convert className to dash case and append breakpoint at the end if breakpoint is number', () => {
            expect(breakpointClass('class', 5)).toEqual('class-5');
        });
    });
});
