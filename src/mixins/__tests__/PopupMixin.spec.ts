import { PopupMixin } from '@inkline/inkline/mixins';
import { createMockInstance } from '@inkline/inkline/__mocks__/createMockInstance';
import * as PopupMixinModule from '@inkline/inkline/mixins/PopupMixin';

describe('mixins', () => {
    describe('PopupMixin', () => {
        describe('methods', () => {
            describe('createPopper()', () => {
                it('should create popper instance using base modifiers', async () => {
                    const wrapper = createMockInstance(PopupMixin, {
                        $refs: {
                            wrapper: document.createElement('div'),
                            popup: document.createElement('div')
                        }
                    });

                    wrapper.createPopper();

                    expect(wrapper.popperInstance).toBeDefined();
                });

                it('should not create popper instance if window is undefined', () => {
                    const windowSpy = vi.spyOn(global as any, 'window', 'get');
                    windowSpy.mockImplementation(() => undefined);

                    const wrapper = createMockInstance(PopupMixin);

                    wrapper.createPopper();

                    expect(wrapper.popperInstance).not.toBeDefined();

                    windowSpy.mockRestore();
                });
            });

            describe('destroyPopper()', () => {
                it('should destroy popper instance', async () => {
                    const wrapper = createMockInstance(PopupMixin, {
                        $refs: {
                            wrapper: document.createElement('div'),
                            popup: document.createElement('div')
                        }
                    });

                    wrapper.createPopper();
                    wrapper.destroyPopper();

                    expect(wrapper.popperInstance).not.toBeDefined();
                });
            });
        });
    });
});
