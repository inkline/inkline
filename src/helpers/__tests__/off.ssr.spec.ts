/**
 * @jest-environment node
 */

import { off, removeEventListenerBinding, detachEventBinding, _off } from '@inkline/inkline/helpers';

describe('Helpers', () => {
    describe('off()', () => {
        let element: any;
        const event = 'event';
        const handler = () => {};

        beforeEach(() => {
            element = {
                removeEventListener () {},
                detachEvent () {}
            };
        });

        it('should be void function if window is not defined', () => {
            const offFn = _off();

            const spy = vi.spyOn(element, 'removeEventListener');
            const fn = () => {};

            offFn(element, 'eventName', fn);

            expect(spy).not.toHaveBeenCalled();
        });
    });
});
