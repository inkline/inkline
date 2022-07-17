/**
 * @jest-environment node
 */

import { ClickOutsideDirective, onClickOutside } from '@inkline/inkline/directives/click-outside';

vi.mock('@inkline/inkline/helpers', async () => {
    const { isVisible } = await vi.importActual('@inkline/inkline/helpers');

    return {
        on: vi.fn(),
        isVisible
    };
});

const helpersModule: {
    on: () => void;
    isVisible: () => boolean;
} = await vi.importMock('@inkline/inkline/helpers');

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
