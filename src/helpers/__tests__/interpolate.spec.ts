import { Configuration, UserConfiguration } from '../../types';
import { interpolate } from '../interpolate';

describe('helpers', () => {
    describe('interpolate', () => {
        it('should interpolate value in given context', () => {
            expect(interpolate('<% value %>', { value: 'abc' })).toEqual('abc');
        });
    });
});
