import { mount } from '@vue/test-utils'
import { isServer } from '@inkline/inkline/tests/utilities/isServer';
import PopupProviderMixin from '@inkline/inkline/src/mixins/providers/PopupProviderMixin';

describe('Mixins', () => {
    describe('PopupProviderMixin', () => {
        let wrapper;
        let wrapperWithoutPopup;
        let wrapperWithoutReference;

        beforeEach(() => {
            const Component = {
                props: {
                    disabled: false
                },
                mixins: [
                    PopupProviderMixin,
                ],
                template: `<div>
                        <slot name="reference"></slot>
                        <div ref="popup"></div>
                    </div>`
            };

            wrapper = mount(Component, {
                data() {
                    return {
                        popupElement: null,
                        triggerElement: null
                    };
                },
                methods: {
                    beforeDestroy: PopupProviderMixin.beforeDestroy,
                    deactivated: PopupProviderMixin.deactivated
                },
                slots: {
                    reference: ['<div/>'],
                    popup: ['<div/>']
                }
            });

            wrapperWithoutPopup = mount(Component, {
                slots: {
                    reference: ['<div/>']
                }
            });

            wrapperWithoutReference = mount(Component, {
                slots: {
                    popup: ['<div/>']
                }
            });
        });

        describe('props', () => {
            describe('transformOrigin', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.transformOrigin).toBeDefined();
                    expect(wrapper.vm.transformOrigin).toEqual(true);
                });
            });

            describe('placement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.placement).toBeDefined();
                    expect(wrapper.vm.placement).toEqual('bottom');
                });
            });

            describe('offset', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.offset).toBeDefined();
                    expect(wrapper.vm.offset).toEqual(null);
                });
            });

            describe('arrow', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.arrow).toBeDefined();
                    expect(wrapper.vm.arrow).toEqual(true);
                });
            });

            describe('arrowOffset', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.arrowOffset).toBeDefined();
                    expect(wrapper.vm.arrowOffset).toEqual(10);
                });
            });

            describe('appendToBody', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.appendToBody).toBeDefined();
                    expect(wrapper.vm.appendToBody).toEqual(false);
                });
            });

            describe('appendToBody', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.appendToBody).toBeDefined();
                    expect(wrapper.vm.appendToBody).toEqual(false);
                });
            });

            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual(false);
                });
            });
        });

        describe('data', () => {
            describe('visible', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.visible).toBeDefined();
                    expect(wrapper.vm.visible).toEqual(false);
                });
            });


            describe('currentPlacement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.currentPlacement).toBeDefined();
                    expect(wrapper.vm.currentPlacement).toEqual('');
                });
            });
        });

        describe('watch', () => {
            describe('value', () => {
                beforeEach(() => {
                    wrapper.vm.createPopper();
                });

                it('should set visible to equal value', (done) => {
                    wrapper.setProps({ value: true });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.visible).toEqual(true);
                        done();
                    });
                });
            });

            describe('visible', () => {
                beforeEach(() => {
                    wrapper.vm.createPopper();
                });

                it('should emit "change" on change', (done) => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setData({ visible: true });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenCalledWith('change', true);
                        done();
                    });
                });

                it('should call "updatePopper()" if visible', (done) => {
                    const spy = jest.spyOn(wrapper.vm, 'updatePopper');

                    wrapper.setData({ visible: true });

                    wrapper.vm.$nextTick(() => {
                        expect(spy).toHaveBeenCalled();
                        done();
                    });
                });

                it('should not make changes if disabled', (done) => {
                    const emitSpy = jest.spyOn(wrapper.vm, '$emit');
                    const updateSpy = jest.spyOn(wrapper.vm, 'updatePopper');

                    wrapper.setProps({
                        disabled: true
                    });

                    wrapper.vm.$nextTick(() => {
                        wrapper.setData({ visible: true });

                        wrapper.vm.$nextTick(() => {
                            expect(emitSpy).not.toHaveBeenCalled();
                            expect(updateSpy).not.toHaveBeenCalled();
                            done();
                        });
                    });
                });
            });
        });

        describe('methods', () => {
            describe('createPopper()', () => {
                it('should return if Vue.$isServer', () => {
                    isServer(true, wrapper.vm);

                    expect(wrapper.vm.createPopper()).toEqual(undefined);

                    isServer(false, wrapper.vm);
                });

                it('should return if currentPlacement is invalid', () => {
                    wrapper.setProps({ placement: 'any' });

                    expect(wrapper.vm.createPopper()).toEqual(undefined);
                });

                it('should return if popupElement not set', () => {
                    expect(wrapperWithoutPopup.vm.createPopper()).toEqual(undefined);
                });

                it('should return if popupElement not set', () => {
                    expect(wrapperWithoutReference.vm.createPopper()).toEqual(undefined);
                });

                it('should append to document body if appendToBody is set', () => {
                    const spy = jest.spyOn(document.body, 'appendChild');
                    wrapper.setProps({ appendToBody: true });

                    wrapper.vm.createPopper();

                    expect(spy).toHaveBeenCalled();
                });

                // it('should call popperOptions.onFirstUpdate if defined', () => {
                //     wrapper.vm.popperInstance = { onFirstUpdate: () => {} };
                //     wrapper.setProps({ popperOptions: { onFirstUpdate: () => {} }});
                //     const spy = jest.spyOn(wrapper.vm.popperInstance, 'onFirstUpdate');

                //     wrapper.vm.createPopper();

                //     expect(spy).toHaveBeenCalled();
                // });

                it('should call popperInstance.destroy if defined', () => {
                    wrapper.vm.popperInstance = { destroy: () => {} };
                    const spy = jest.spyOn(wrapper.vm.popperInstance, 'destroy');

                    wrapper.vm.createPopper();

                    expect(spy).toHaveBeenCalled();
                });

                it('should have reference and popup elements defined', () => {
                    wrapper.vm.createPopper();

                    expect(wrapper.vm.popupElement).toBeDefined();
                    expect(wrapper.vm.referenceElement).toBeDefined();
                });

                it('should have popperInstance defined', () => {
                    wrapper.vm.createPopper();

                    expect(wrapper.vm.popperInstance).toBeDefined();
                });

                it('should set onFirstUpdate callback that emits created event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setData({ visible: true });
                    wrapper.vm.createPopper();

                    wrapper.vm.$nextTick().then(() => {
                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenCalledWith('created', wrapper.vm);
                    })
                });

                it('should set onFirstUpdate callback', () => {
                    const spy = jest.spyOn(wrapper.vm, '$nextTick');

                    wrapper.vm.createPopper();
                    wrapper.vm.popperOptions.onFirstUpdate();

                    expect(spy).toEqual(expect.any(Function));
                });
            });

            describe('updatePopper()', () => {
                it('should createPopper if popperInstance not available', () => {
                    const spy = jest.spyOn(wrapper.vm, 'createPopper');

                    wrapper.vm.updatePopper();

                    expect(spy).toHaveBeenCalled();
                });

                it('should skip zIndex assignment if not popper set', () => {
                    wrapper.vm.createPopper();
                    // wrapper.vm.popperInstance.update = () => {};
                    wrapper.vm.popperInstance.state.styles.popper = undefined;

                    const spy = jest.spyOn(wrapper.vm.popperInstance, 'forceUpdate');

                    wrapper.vm.updatePopper();

                    expect(spy).toHaveBeenCalled();
                });

                it('should update popperInstance element', () => {
                    wrapper.vm.createPopper();
                    wrapper.vm.popperInstance.state.styles.popper = {};

                    const spy = jest.spyOn(wrapper.vm.popperInstance, 'forceUpdate');

                    wrapper.vm.updatePopper();

                    expect(spy).toHaveBeenCalled();

                    expect(wrapper.vm.popperInstance.state.styles.popper.zIndex).toBeGreaterThanOrEqual(1000);
                });
            });

            describe('destroyPopper()', () => {
                it('should destroy popperInstance element', () => {
                    wrapper.vm.createPopper();
                    wrapper.vm.popperInstance.destroy = () => {};

                    const spy = jest.spyOn(wrapper.vm.popperInstance, 'destroy');

                    wrapper.vm.destroyPopper();

                    expect(spy).toHaveBeenCalled();
                    expect(wrapper.vm.popperInstance).toEqual(null);
                });

                it('should not destroy popperInstance element if visible', () => {
                    wrapper.vm.createPopper();
                    wrapper.vm.popperInstance.destroy = () => {};
                    wrapper.vm.popperInstance.update = () => {};

                    wrapper.setData({ visible: true });

                    const spy = jest.spyOn(wrapper.vm.popperInstance, 'destroy');

                    wrapper.vm.destroyPopper();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should destroy popperInstance element if visible and forceDestroy', () => {
                    wrapper.vm.createPopper();
                    wrapper.vm.popperInstance.destroy = () => {};
                    wrapper.vm.popperInstance.update = () => {};

                    wrapper.setData({ visible: true });

                    const spy = jest.spyOn(wrapper.vm.popperInstance, 'destroy');

                    wrapper.vm.destroyPopper(true);

                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('onClickOutside()', () => {
                it('should call hide() if popperInstance value is false', () => {
                    wrapper.vm.hide = jest.fn(() => {});
                    const spy = jest.spyOn(wrapper.vm, 'hide');

                    wrapper.vm.createPopper();
                    wrapper.vm.onClickOutside();

                    expect(spy).toHaveBeenCalled();
                });

                it('should not call hide() if popperInstance value is true', () => {
                    wrapper.vm.hide = jest.fn(() => {});
                    const spy = jest.spyOn(wrapper.vm, 'hide');

                    wrapper.setProps({ value: true });
                    wrapper.vm.createPopper();
                    wrapper.vm.onClickOutside();

                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe('stopOnClickPropagation()', () => {
                it('should call event.stopPropagation()', () => {
                    const e = { stopPropagation: () => {} };
                    const spy = jest.spyOn(e, 'stopPropagation');

                    wrapper.vm.stopOnClickPropagation(e);

                    expect(spy).toHaveBeenCalled();
                });
            });
        });

        describe('beforeDestroy()', () => {
            it('should call destroyPopper with forceDestroy set to true', () => {
                const spy = jest.spyOn(wrapper.vm, 'destroyPopper');

                wrapper.vm.beforeDestroy();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(true);
            });

            it('should remove popup element from document body', () => {
                const spy = jest.spyOn(document.body, 'removeChild');

                wrapper.setData({ popupElement: document.createElement('div') });
                document.body.appendChild(wrapper.vm.popupElement);

                wrapper.vm.beforeDestroy();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(wrapper.vm.popupElement);
            });

            it('should remove popup element event listener', () => {
                wrapper.setData({ popupElement: document.createElement('div') });
                document.body.appendChild(wrapper.vm.popupElement);

                const spy = jest.spyOn(wrapper.vm.popupElement, 'removeEventListener');

                wrapper.vm.beforeDestroy();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('click', expect.any(Function));
            });
        });


        describe('deactivated()', () => {
            it('should call beforeDestroy()', () => {
                const spy = jest.spyOn(wrapper.vm.$options.beforeDestroy, '0');

                wrapper.vm.deactivated();

                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
