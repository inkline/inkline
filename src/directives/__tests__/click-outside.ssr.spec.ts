/**
 * @jest-environment node
 */

import { ClickOutsideDirective } from '@inkline/inkline/directives/click-outside';

vi.mock('@grozav/utils', async () => {
    const { isVisible } = await vi.importActual('@grozav/utils');

    return {
        on: vi.fn(),
        isVisible
    };
});

const helpersModule: {
    on: () => void;
    isVisible: () => boolean;
} = await vi.importMock('@grozav/utils');

describe('Directives', () => {
    describe('v-click-outside', () => {
        describe('beforeMount()', () => {
            it('should not attach window.document mouseup event if isServer', () => {
                const binding = vi.fn();

                (ClickOutsideDirective as any).beforeMount({} as any, binding);

                expect(helpersModule.on).not.toHaveBeenCalled();
            });
        });
    });
});
