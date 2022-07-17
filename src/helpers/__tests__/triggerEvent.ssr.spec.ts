/**
 * @jest-environment node
 */

import { triggerEvent } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('triggerEvent()', () => {
        it('should return if isServer', () => {
            expect(triggerEvent({} as any, 'eventName')).not.toBeDefined();
        });
    });
});
