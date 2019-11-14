import Vue from 'vue';

import { PopupManager } from '@inkline/inkline/src/factories/PopupManager';

describe('Factories', () => {
    describe('PopupManager', () => {
        let popupManager;

        beforeEach(() => {
            popupManager = new PopupManager();
        });

        describe('props', () => {
            describe('instances', () => {
                it('should be defined', () => {
                    expect(popupManager.instances).toBeDefined();
                    expect(popupManager.instances).toEqual({});
                });
            });

            describe('modalStack', () => {
                it('should be defined', () => {
                    expect(popupManager.modalStack).toBeDefined();
                    expect(popupManager.modalStack).toEqual([]);
                });
            });

            describe('zIndex', () => {
                it('should be defined', () => {
                    expect(popupManager.zIndex).toBeDefined();
                    expect(popupManager.zIndex).toEqual(1000);
                });
            });
        });

        describe('constructor()', () => {
            it('should add keydown event listener', () => {
                const spy = jest.spyOn(window, 'addEventListener');

                popupManager = new PopupManager();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('keydown', expect.any(Function));
            });

            it('should not add keydown event listener if Vue.$isServer', () => {
                Vue.$isServer = true;

                const spy = jest.spyOn(window, 'addEventListener');

                popupManager = new PopupManager();

                expect(spy).not.toHaveBeenCalledTimes(4);

                Vue.$isServer = false;
            });

            it('should close topmost modal on pressing Escape', () => {
                const instance = { id: 'abc', hide: () => {}, closeOnPressEscape: true };
                const spy = jest.spyOn(instance, 'hide');

                popupManager.register(instance);
                popupManager.openModal('abc');

                const event = new KeyboardEvent('keydown', {
                    key: 'Escape'
                });
                window.dispatchEvent(event);

                expect(spy).toHaveBeenCalled();
            });

            it('should not react to other key other than Escape', () => {
                const instance = { id: 'abc', hide: () => {}, closeOnPressEscape: true };
                const spy = jest.spyOn(instance, 'hide');

                popupManager.register(instance);
                popupManager.openModal('abc');

                const event = new KeyboardEvent('keydown', {
                    key: 'None'
                });
                window.dispatchEvent(event);

                expect(spy).not.toHaveBeenCalled();
            });

            it('should not close topmost modal on pressing Escape if closeOnPressEscape is false', () => {
                const instance = { id: 'abc', close: () => {}, closeOnPressEscape: false };
                const spy = jest.spyOn(instance, 'close');

                popupManager.register(instance);
                popupManager.openModal('abc');

                const event = new KeyboardEvent('keydown', {
                    key: 'Escape'
                });
                window.dispatchEvent(event);

                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe('register()', () => {
            it('should register modal instance', () => {
                const instance = { id: 'abc' };

                popupManager.register(instance);

                expect(popupManager.instances).toHaveProperty(instance.id);
                expect(popupManager.instances[instance.id]).toEqual(instance);
            });

            it('should not register modal instance if instance not defined', () => {
                popupManager.register(null);

                expect(Object.keys(popupManager.instances).length).toEqual(0);
            });

            it('should not register modal instance if id not present', () => {
                const instance = {};

                popupManager.register(instance);

                expect(Object.keys(popupManager.instances).length).toEqual(0);
            });
        });

        describe('unregister()', () => {
            it('should unregister modal instance', () => {
                const instance = { id: 'abc' };

                popupManager.register(instance);
                popupManager.unregister(instance);

                expect(popupManager.instances).not.toHaveProperty(instance.id);
                expect(popupManager.instances[instance.id]).not.toBeDefined();
            });

            it('should not unregister modal instance if id not present', () => {
                const instance = { id: 'abc' };

                popupManager.register(instance);
                popupManager.unregister({});

                expect(Object.keys(popupManager.instances).length).toEqual(1);
            });

            it('should not unregister modal instance if id not present', () => {
                const instance = { id: 'abc' };

                popupManager.register(instance);
                popupManager.unregister(null);

                expect(Object.keys(popupManager.instances).length).toEqual(1);
            });
        });

        describe('nextZIndex()', () => {
            it('should return incremented zIndex', () => {
                const zIndex = popupManager.zIndex;

                expect(popupManager.nextZIndex()).toEqual(zIndex);
                expect(popupManager.nextZIndex()).toEqual(zIndex + 1);
                expect(popupManager.nextZIndex()).toEqual(zIndex + 2);
            });
        });

        describe('openModal()', () => {
            // it('should return if Vue.$isServer', () => {
            //     Vue.prototype.$isServer = true;
            //
            //     popupManager.openModal('abc');
            //
            //     expect(popupManager.modalStack.length).toEqual(0);
            //
            //     Vue.prototype.$isServer = false;
            // });

            it('should add modal to modal stack if not already open', () => {
                popupManager.openModal('abc');

                expect(popupManager.modalStack.length).toEqual(1);
                expect(popupManager.modalStack[0]).toEqual({ id: 'abc' });
            });

            it('should set modal zIndex if already open', () => {
                popupManager.modalStack.push({
                    id: 'abc',
                    $el: {
                        style: {}
                    }
                });

                popupManager.openModal('abc');

                expect(popupManager.modalStack.length).toEqual(1);
                expect(popupManager.modalStack[0].$el.style.zIndex).toEqual(1000);
            });

            it('should add ".-modal" modifier class to document body', () => {
                popupManager.openModal('abc');

                expect(window.document.body.classList.contains('-modal')).toEqual(true);
            });
        });

        describe('closeModal()', () => {
            // it('should return if Vue.$isServer', () => {
            //     Vue.$isServer = true;
            //
            //     popupManager.openModal('abc');
            //     popupManager.closeModal('abc');
            //
            //     expect(popupManager.modalStack.length).toEqual(0);
            //
            //     Vue.$isServer = false;
            // });

            it('should remove modal from modal stack', () => {
                popupManager.openModal('abc');
                popupManager.closeModal('abc');

                expect(popupManager.modalStack.length).toEqual(0);
            });

            it('should remove ".-modal" modifier class from document body', () => {
                popupManager.openModal('abc');
                popupManager.closeModal('abc');

                expect(window.document.body.classList.contains('-modal')).toEqual(false);
            });
        });

        describe('getTopPopup()', () => {
            it('should return instance of topmost open modal', () => {
                popupManager.register({ id: 'abc' });
                popupManager.register({ id: 'def' });
                popupManager.openModal('abc');
                popupManager.openModal('def');

                expect(popupManager.getTopPopup()).toEqual({ id: 'def' });
            });

            it('should return undefined if instance is undefined', () => {
                popupManager.register({ id: 'abc' });
                popupManager.openModal('abc');

                popupManager.modalStack.push(undefined);

                expect(popupManager.getTopPopup()).not.toBeDefined();
            });

            it('should return undefined if no open modals', () => {
                popupManager.register({ id: 'abc' });

                expect(popupManager.getTopPopup()).not.toBeDefined();
            });
        });
    });
});
