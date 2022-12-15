import { eventValueMap } from '@inkline/inkline/src/constants/eventValueMap';

describe('Helpers', () => {
    describe('eventValueMap()', () => {
        describe('input', () => {
            it('should return event', () => {
                expect(eventValueMap['input']('abc')).toEqual('abc');
            });
        });

        for (let event of ['blur', 'focus', 'mouseenter', 'mouseleave']) {
            describe(event, () => {
                it('should return event.target.value', () => {
                    expect(eventValueMap[event]({target: {value: 'abc'}})).toEqual('abc');
                });
            });
        }
    });
});
