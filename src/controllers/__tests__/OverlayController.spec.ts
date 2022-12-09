import { OverlayController } from '@inkline/inkline/controllers';
import { fireEvent } from '@testing-library/vue';
import { keymap } from '@inkline/inkline/constants';
import { ref } from 'vue';

describe('Controllers', () => {
    describe('OverlayController', () => {
        let modalElement: any;

        beforeEach(() => {
            modalElement = {
                style: {
                    zIndex: 0
                }
            };

            OverlayController.instances = {};
            OverlayController.stack = [];
        });

        describe('props', () => {
            describe('instances', () => {
                it('should be defined', () => {
                    expect(OverlayController.instances).toBeDefined();
                    expect(OverlayController.instances).toEqual({});
                });
            });

            describe('stack', () => {
                it('should be defined', () => {
                    expect(OverlayController.stack).toBeDefined();
                    expect(OverlayController.stack).toEqual([]);
                });
            });

            describe('zIndex', () => {
                it('should be defined', () => {
                    expect(OverlayController.zIndex).toBeDefined();
                    expect(OverlayController.zIndex).toEqual(1050);
                });
            });
        });

        describe('constructor()', () => {
            it('should close topmost modal on pressing Escape', async () => {
                const instance = {
                    name: ref('abc'),
                    closeOnPressEscape: ref(true),
                    elementRef: ref(modalElement),
                    hide: () => OverlayController.close('abc')
                };
                const spy = vi.spyOn(instance, 'hide');

                OverlayController.register(instance);
                OverlayController.open('abc');

                expect(OverlayController.stack).toEqual(['abc']);

                OverlayController.onPressEscape();

                expect(spy).toHaveBeenCalled();
                expect(OverlayController.stack).toEqual([]);
                expect(instance.elementRef.value.style.zIndex).toEqual(1050);
            });

            it('should not react to other key other than Escape', async () => {
                const instance = {
                    name: ref('abc'),
                    closeOnPressEscape: ref(true),
                    elementRef: ref(modalElement),
                    hide: () => {}
                };
                const spy = vi.spyOn(instance, 'hide');

                OverlayController.register(instance);
                OverlayController.open('abc');

                await fireEvent.keyDown(window, { key: keymap.enter[0] });

                expect(spy).not.toHaveBeenCalled();
            });

            it('should not close topmost modal on pressing Escape if closeOnPressEscape is false', async () => {
                const instance = {
                    name: ref('abc'),
                    closeOnPressEscape: ref(false),
                    elementRef: ref(modalElement),
                    hide: () => {}
                };
                const spy = vi.spyOn(instance, 'hide');

                OverlayController.register(instance);
                OverlayController.open('abc');

                await fireEvent.keyDown(window, { key: keymap.enter[0] });

                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe('register()', () => {
            it('should register modal instance', () => {
                const instance = {
                    name: ref('abc'),
                    closeOnPressEscape: ref(true),
                    elementRef: ref(modalElement),
                    hide: () => {}
                };

                OverlayController.register(instance);

                expect(OverlayController.instances).toHaveProperty(instance.name.value);
                expect(OverlayController.instances[instance.name.value]).toEqual(instance);
            });

            it('should not register modal instance if id not present', () => {
                const instance = {
                    name: ref(),
                    closeOnPressEscape: ref(true),
                    elementRef: ref(modalElement),
                    hide: () => {}
                };

                OverlayController.register(instance);

                expect(Object.keys(OverlayController.instances).length).toEqual(0);
            });
        });

        // describe('unregister()', () => {
        //     it('should unregister modal instance', () => {
        //         const instance = { name: 'abc' };
        //
        //         OverlayController.register(instance);
        //         OverlayController.unregister(instance);
        //
        //         expect(OverlayController.instances).not.toHaveProperty(instance.name);
        //         expect(OverlayController.instances[instance.name]).not.toBeDefined();
        //     });
        //
        //     it('should not unregister modal instance if id not present', () => {
        //         const instance = { name: 'abc' };
        //
        //         OverlayController.register(instance);
        //         OverlayController.unregister({});
        //
        //         expect(Object.keys(OverlayController.instances).length).toEqual(1);
        //     });
        //
        //     it('should not unregister modal instance if id not present', () => {
        //         const instance = { name: 'abc' };
        //
        //         OverlayController.register(instance);
        //         OverlayController.unregister(null);
        //
        //         expect(Object.keys(OverlayController.instances).length).toEqual(1);
        //     });
        // });
        //
        // describe('nextZIndex()', () => {
        //     it('should return incremented zIndex', () => {
        //         const zIndex = OverlayController.zIndex;
        //
        //         expect(OverlayController.nextZIndex()).toEqual(zIndex);
        //         expect(OverlayController.nextZIndex()).toEqual(zIndex + 1);
        //         expect(OverlayController.nextZIndex()).toEqual(zIndex + 2);
        //     });
        // });
        //
        // describe('open()', () => {
        //     it('should return if Vue.$isServer', () => {
        //         isServer(true);
        //
        //         OverlayController.open('abc');
        //
        //         expect(OverlayController.modalStack.length).toEqual(0);
        //
        //         isServer(false);
        //     });
        //
        //     it('should add modal to modal stack if not already open', () => {
        //         OverlayController.open('abc');
        //
        //         expect(OverlayController.modalStack.length).toEqual(1);
        //         expect(OverlayController.modalStack[0]).toEqual({ name: 'abc' });
        //     });
        //
        //     it('should set modal zIndex if already open', () => {
        //         OverlayController.modalStack.push({
        //             name: 'abc',
        //             $el: {
        //                 style: {}
        //             }
        //         });
        //
        //         OverlayController.open('abc');
        //
        //         expect(OverlayController.modalStack.length).toEqual(1);
        //         expect(OverlayController.modalStack[0].$el.style.zIndex).toEqual(1000);
        //     });
        //
        //     it('should add ".-modal" modifier class to document body', () => {
        //         OverlayController.open('abc');
        //
        //         expect(window.document.body.classList.contains('-modal')).toEqual(true);
        //     });
        // });
        //
        // describe('close()', () => {
        //     it('should return if Vue.$isServer', () => {
        //         isServer(true);
        //
        //         OverlayController.open('abc');
        //         OverlayController.close('abc');
        //
        //         expect(OverlayController.modalStack.length).toEqual(0);
        //
        //         isServer(false);
        //     });
        //
        //     it('should remove modal from modal stack', () => {
        //         OverlayController.open('abc');
        //         OverlayController.close('abc');
        //
        //         expect(OverlayController.modalStack.length).toEqual(0);
        //     });
        //
        //     it('should remove ".-modal" modifier class from document body', () => {
        //         OverlayController.open('abc');
        //         OverlayController.close('abc');
        //
        //         expect(window.document.body.classList.contains('-modal')).toEqual(false);
        //     });
        // });
        //
        // describe('getTopPopup()', () => {
        //     it('should return instance of topmost open modal', () => {
        //         OverlayController.register({ name: 'abc' });
        //         OverlayController.register({ name: 'def' });
        //         OverlayController.open('abc');
        //         OverlayController.open('def');
        //
        //         expect(OverlayController.getTopPopup()).toEqual({ name: 'def' });
        //     });
        //
        //     it('should return undefined if instance is undefined', () => {
        //         OverlayController.register({ name: 'abc' });
        //         OverlayController.open('abc');
        //
        //         OverlayController.modalStack.push(undefined);
        //
        //         expect(OverlayController.getTopPopup()).not.toBeDefined();
        //     });
        //
        //     it('should return undefined if no open modals', () => {
        //         OverlayController.register({ name: 'abc' });
        //
        //         expect(OverlayController.getTopPopup()).not.toBeDefined();
        //     });
        // });
    });
});
