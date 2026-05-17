import { eventValueMap } from '@inkline/inkline/constants';

describe('Helpers', () => {
    describe('eventValueMap()', () => {
        describe('input', () => {
            it('should return event', () => {
                expect(eventValueMap.input('abc')).toEqual('abc');
            });
        });

        for (const event of ['blur', 'focus', 'mouseenter', 'mouseleave']) {
            describe(event, () => {
                it('should return event.target.value', () => {
                    expect((eventValueMap as any)[event]({ target: { value: 'abc' } })).toEqual(
                        'abc'
                    );
                });
            });
        }
    });
});
