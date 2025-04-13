import { fireEvent } from '@testing-library/vue';
import { ref } from 'vue';
import { createOverlayService } from '../createOverlayService';

const overlayService = createOverlayService();

describe('overlayService', () => {
    let modalElement: HTMLElement;

    beforeEach(() => {
        modalElement = {
            style: {
                zIndex: '0'
            }
        } as HTMLElement;

        overlayService.instances = {};
        overlayService.stack = [];
    });

    describe('props', () => {
        describe('instances', () => {
            it('should be defined', () => {
                expect(overlayService.instances).toBeDefined();
                expect(overlayService.instances).toEqual({});
            });
        });

        describe('stack', () => {
            it('should be defined', () => {
                expect(overlayService.stack).toBeDefined();
                expect(overlayService.stack).toEqual([]);
            });
        });

        describe('zIndex', () => {
            it('should be defined', () => {
                expect(overlayService.zIndex).toBeDefined();
                expect(overlayService.zIndex).toEqual(1050);
            });
        });
    });

    describe('constructor()', () => {
        it('should close topmost modal on pressing Escape', () => {
            const instance = {
                name: ref('abc'),
                closeOnPressEscape: ref(true),
                elementRef: ref(modalElement),
                hide: () => overlayService.close('abc')
            };
            const spy = vi.spyOn(instance, 'hide');

            overlayService.register(instance);
            overlayService.open('abc');

            expect(overlayService.stack).toEqual(['abc']);

            overlayService.onPressEscape();

            expect(spy).toHaveBeenCalled();
            expect(overlayService.stack).toEqual([]);
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

            overlayService.register(instance);
            overlayService.open('abc');

            await fireEvent.keyDown(window, { key: 'Enter' });

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

            overlayService.register(instance);
            overlayService.open('abc');

            await fireEvent.keyDown(window, { key: 'Enter' });

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

            overlayService.register(instance);

            expect(overlayService.instances).toHaveProperty(instance.name.value);
            expect(overlayService.instances[instance.name.value]).toEqual(instance);
        });

        it('should not register modal instance if id not present', () => {
            const instance = {
                name: ref(),
                closeOnPressEscape: ref(true),
                elementRef: ref(modalElement),
                hide: () => {}
            };

            overlayService.register(instance);

            expect(Object.keys(overlayService.instances).length).toEqual(0);
        });
    });

    // describe('unregister()', () => {
    //     it('should unregister modal instance', () => {
    //         const instance = { name: 'abc' };
    //
    //         overlayService.register(instance);
    //         overlayService.unregister(instance);
    //
    //         expect(overlayService.instances).not.toHaveProperty(instance.name);
    //         expect(overlayService.instances[instance.name]).not.toBeDefined();
    //     });
    //
    //     it('should not unregister modal instance if id not present', () => {
    //         const instance = { name: 'abc' };
    //
    //         overlayService.register(instance);
    //         overlayService.unregister({});
    //
    //         expect(Object.keys(overlayService.instances).length).toEqual(1);
    //     });
    //
    //     it('should not unregister modal instance if id not present', () => {
    //         const instance = { name: 'abc' };
    //
    //         overlayService.register(instance);
    //         overlayService.unregister(null);
    //
    //         expect(Object.keys(overlayService.instances).length).toEqual(1);
    //     });
    // });
    //
    // describe('nextZIndex()', () => {
    //     it('should return incremented zIndex', () => {
    //         const zIndex = overlayService.zIndex;
    //
    //         expect(overlayService.nextZIndex()).toEqual(zIndex);
    //         expect(overlayService.nextZIndex()).toEqual(zIndex + 1);
    //         expect(overlayService.nextZIndex()).toEqual(zIndex + 2);
    //     });
    // });
    //
    // describe('open()', () => {
    //     it('should return if Vue.$isServer', () => {
    //         isServer(true);
    //
    //         overlayService.open('abc');
    //
    //         expect(overlayService.modalStack.length).toEqual(0);
    //
    //         isServer(false);
    //     });
    //
    //     it('should add modal to modal stack if not already open', () => {
    //         overlayService.open('abc');
    //
    //         expect(overlayService.modalStack.length).toEqual(1);
    //         expect(overlayService.modalStack[0]).toEqual({ name: 'abc' });
    //     });
    //
    //     it('should set modal zIndex if already open', () => {
    //         overlayService.modalStack.push({
    //             name: 'abc',
    //             $el: {
    //                 style: {}
    //             }
    //         });
    //
    //         overlayService.open('abc');
    //
    //         expect(overlayService.modalStack.length).toEqual(1);
    //         expect(overlayService.modalStack[0].$el.style.zIndex).toEqual(1000);
    //     });
    //
    //     it('should add ".-modal" modifier class to document body', () => {
    //         overlayService.open('abc');
    //
    //         expect(window.document.body.classList.contains('-modal')).toEqual(true);
    //     });
    // });
    //
    // describe('close()', () => {
    //     it('should return if Vue.$isServer', () => {
    //         isServer(true);
    //
    //         overlayService.open('abc');
    //         overlayService.close('abc');
    //
    //         expect(overlayService.modalStack.length).toEqual(0);
    //
    //         isServer(false);
    //     });
    //
    //     it('should remove modal from modal stack', () => {
    //         overlayService.open('abc');
    //         overlayService.close('abc');
    //
    //         expect(overlayService.modalStack.length).toEqual(0);
    //     });
    //
    //     it('should remove ".-modal" modifier class from document body', () => {
    //         overlayService.open('abc');
    //         overlayService.close('abc');
    //
    //         expect(window.document.body.classList.contains('-modal')).toEqual(false);
    //     });
    // });
    //
    // describe('getTopPopup()', () => {
    //     it('should return instance of topmost open modal', () => {
    //         overlayService.register({ name: 'abc' });
    //         overlayService.register({ name: 'def' });
    //         overlayService.open('abc');
    //         overlayService.open('def');
    //
    //         expect(overlayService.getTopPopup()).toEqual({ name: 'def' });
    //     });
    //
    //     it('should return undefined if instance is undefined', () => {
    //         overlayService.register({ name: 'abc' });
    //         overlayService.open('abc');
    //
    //         overlayService.modalStack.push(undefined);
    //
    //         expect(overlayService.getTopPopup()).not.toBeDefined();
    //     });
    //
    //     it('should return undefined if no open modals', () => {
    //         overlayService.register({ name: 'abc' });
    //
    //         expect(overlayService.getTopPopup()).not.toBeDefined();
    //     });
    // });
});
