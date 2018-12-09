import { mount } from '@vue/test-utils'

import PopupProviderMixin from 'inkline/mixins/components/providers/PopupProviderMixin';

describe('Mixins', () => {
    describe('PopupProviderMixin', () => {
        let wrapper;

        beforeEach(() => {
            const Component = {
                props: {
                    disabled: false
                },
                mixins: [
                    PopupProviderMixin
                ],
                render () {}
            };

            wrapper = mount(Component);
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
                it('should emit "visibilityChange" on change', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setData({
                        visible: true
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('visibilityChange', true);
                });

                it('should call "updatePopper()" if visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'updatePopper');

                    wrapper.setData({
                        visible: true
                    });

                    expect(spy).toHaveBeenCalled();
                });

                it('should call "destroyPopper()" if not visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'destroyPopper');

                    wrapper.setData({
                        visible: true
                    });

                    wrapper.setData({
                        visible: false
                    });

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
    });
});
