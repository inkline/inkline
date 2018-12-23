import { mount } from '@vue/test-utils'

import PopupProviderMixin from 'inkline/mixins/components/providers/PopupProviderMixin';

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
                    PopupProviderMixin
                ],
                template: `<div>
                        <slot name="reference"></slot>
                        <div ref="popup"></div>
                    </div>`
            };

            wrapper = mount(Component, {
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
                  expect(wrapper.vm.offset).toEqual(0);
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
                  expect(wrapper.vm.arrowOffset).toEqual(35);
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
            describe('visible', () => {
                beforeEach(() => {
                    wrapper.vm.createPopper();
                });

                it('should emit "visibilityChange" on change', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setData({ visible: true });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('visibilityChange', true);
                });

                it('should call "updatePopper()" if visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'updatePopper');

                    wrapper.setData({ visible: true });

                    expect(spy).toHaveBeenCalled();
                });

                it('should call "destroyPopper()" if not visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'destroyPopper');

                    wrapper.setData({ visible: true });

                    wrapper.setData({ visible: false });

                    expect(spy).toHaveBeenCalled();
                });

                it('should not make changes if disabled', () => {
                    const emitSpy = jest.spyOn(wrapper.vm, '$emit');
                    const updateSpy = jest.spyOn(wrapper.vm, 'updatePopper');

                    wrapper.setProps({
                        disabled: true
                    });

                    wrapper.setData({
                        visible: true
                    });

                    expect(emitSpy).not.toHaveBeenCalled();
                    expect(updateSpy).not.toHaveBeenCalled();
                });
            });
        });

        describe('methods', () => {
            describe('createPopper()', () => {
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

                it('should apend to document body if appendToBody is set', () => {
                    const spy = jest.spyOn(document.body, 'appendChild');
                    wrapper.setProps({ appendToBody: true });

                    wrapper.vm.createPopper();

                    expect(spy).toHaveBeenCalled();
                });

                it('should have reference and popup elements defined', () => {
                    wrapper.vm.createPopper();

                    expect(wrapper.vm.popupElement).toBeDefined();
                    expect(wrapper.vm.referenceElement).toBeDefined();
                });

                it('should have popperJS defined', () => {
                    wrapper.vm.createPopper();

                    expect(wrapper.vm.popperJS).toBeDefined();
                });
            });

            describe('updatePopper()', () => {
                it('should createPopper if popperJS not available', () => {
                    const spy = jest.spyOn(wrapper.vm, 'createPopper');

                    wrapper.vm.updatePopper();

                    expect(spy).toHaveBeenCalled();
                });

                it('should update popperJS element', () => {
                    wrapper.vm.createPopper();
                    wrapper.vm.popperJS.update = () => {};

                    const spy = jest.spyOn(wrapper.vm.popperJS, 'update');

                    wrapper.vm.updatePopper();

                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('doDestroy()', () => {
                it('should destroy popperJS element', () => {
                    wrapper.vm.createPopper();
                    wrapper.vm.popperJS.destroy = () => {};

                    const spy = jest.spyOn(wrapper.vm.popperJS, 'destroy');

                    wrapper.vm.doDestroy();

                    expect(spy).toHaveBeenCalled();
                    expect(wrapper.vm.popperJS).toEqual(null);
                });

                it('should not destroy popperJS element if visible', () => {
                    wrapper.vm.createPopper();
                    wrapper.vm.popperJS.destroy = () => {};
                    wrapper.vm.popperJS.update = () => {};

                    wrapper.setData({ visible: true });

                    const spy = jest.spyOn(wrapper.vm.popperJS, 'destroy');

                    wrapper.vm.doDestroy();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should destroy popperJS element if visible and forceDestroy', () => {
                    wrapper.vm.createPopper();
                    wrapper.vm.popperJS.destroy = () => {};
                    wrapper.vm.popperJS.update = () => {};

                    wrapper.setData({ visible: true });

                    const spy = jest.spyOn(wrapper.vm.popperJS, 'destroy');

                    wrapper.vm.doDestroy(true);

                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('destroyPopper()', () => {
                it('should call resetTransformOrigin() if popperJS', () => {
                    const spy = jest.spyOn(wrapper.vm, 'resetTransformOrigin');

                    wrapper.vm.createPopper();
                    wrapper.vm.destroyPopper();

                    expect(spy).toHaveBeenCalled();
                });

                it('should not call resetTransformOrigin() if not popperJS', () => {
                    const spy = jest.spyOn(wrapper.vm, 'resetTransformOrigin');

                    wrapper.vm.popperJS = null;
                    wrapper.vm.destroyPopper();

                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe('resetTransformOrigin()', () => {
                it('should return if transformOrigin not set', () => {
                    wrapper.setProps({ transformOrigin: false });

                    expect(wrapper.vm.resetTransformOrigin()).toEqual(undefined);
                });

                it('should set popper style to transform origin if string', () => {
                    wrapper.setProps({ transformOrigin: 'origin' });

                    wrapper.vm.createPopper();
                    wrapper.vm.resetTransformOrigin();

                    expect(wrapper.vm.popperJS.popper.style.transformOrigin).toEqual('origin');
                });

                it('should set popper style to transform origin if boolean', () => {
                    wrapper.setProps({ transformOrigin: true });

                    wrapper.vm.createPopper();
                    wrapper.vm.resetTransformOrigin();

                    expect(wrapper.vm.popperJS.popper.style.transformOrigin).toEqual('center bottom');
                });
            });
        });
    });
});
