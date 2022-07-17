/**
 * @jest-environment node
 */

import { on, addEventListenerBinding, attachEventBinding, _on } from '@inkline/inkline/helpers';

describe('SSR', () => {
    describe('Helpers', () => {
        describe('on()', () => {
            let element: any;
            const event = 'event';
            const handler = () => {};

            beforeEach(() => {
                element = {
                    addEventListener: vi.fn(),
                    attachEvent: vi.fn()
                };
            });

            it('should not call attachEvent binding if event not specified', () => {
                const fn = () => {};

                (_on as any)()(element as any, undefined, fn);

                expect(element.addEventListener).not.toHaveBeenCalled();
            });
        });
    });
});
