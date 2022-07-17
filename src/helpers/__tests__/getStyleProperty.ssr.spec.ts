/**
 * @jest-environment node
 */

import { getStyleProperty } from '@inkline/inkline/helpers';

describe('SSR', () => {
    describe('Helpers', () => {
        describe('getStyleProperty()', () => {
            it('should return if isServer', () => {
                expect(getStyleProperty({} as any, 'property')).toEqual(undefined);
            });
        });
    });
});
