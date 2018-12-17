import { shallowMount } from '@vue/test-utils'

import PopupControlsProviderMixin from 'inkline/mixins/components/providers/PopupControlsProviderMixin';

describe('Mixins', () => {
    describe('PopupControlsProviderMixin', () => {
        let wrapper;

        beforeEach(() => {
            const Component = {
                name: 'Popup',
                props: {
                    disabled: { type: Boolean, default: false },
                    basename: { type: String, default: '' },
                    id: { type: String, default: '' },
                },
                mixins: [
                    PopupControlsProviderMixin
                ],
                template: '<div ref="popup"><slot></slot></div>'
            };

            wrapper = shallowMount(Component, {
                propsData: {
                    basename: 'popup',
                    id: 'popup'
                },
                methods: {
                    mounted: PopupControlsProviderMixin.mounted
                },
                slots: {
                    default: ['<div/>']
                }
            });
        });

        describe('props', () => {
            describe('trigger', () => {
               it('should be defined', () => {
                  expect(wrapper.vm.trigger).toBeDefined();
                  expect(wrapper.vm.trigger).toEqual('click');
               });
            });

            describe('showTimeout', () => {
               it('should be defined', () => {
                  expect(wrapper.vm.showTimeout).toBeDefined();
                  expect(wrapper.vm.showTimeout).toEqual(250);
               });
            });

            describe('hideTimeout', () => {
               it('should be defined', () => {
                  expect(wrapper.vm.hideTimeout).toBeDefined();
                  expect(wrapper.vm.hideTimeout).toEqual(150);
               });
            });
        });

        describe('data', () => {
            describe('timeout', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.timeout).toBeDefined();
                    expect(wrapper.vm.timeout).toEqual(null);
                });
            });

            describe('popupElement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.popupElement).toBeDefined();
                });
            });

            describe('triggerElement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.triggerElement).toBeDefined();
                });
            });

            describe('visible', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.visible).toBeDefined();
                    expect(wrapper.vm.visible).toEqual(false);
                });
            });
        });

        describe('methods', () => {
            describe('initElements()', () => {
                it('should throw error if trigger element not provided', () => {
                    wrapper.vm.$slots.default = [];

                    expect(() => wrapper.vm.initElements())
                        .toThrowError('Popup component requires one child element');
                });

                it('should set triggerElement and dropdownElement', () => {
                    wrapper.setData({ triggerElement: null, dropdownElement: null });

                    wrapper.vm.initElements();

                    expect(wrapper.vm.triggerElement).not.toEqual(null);
                    expect(wrapper.vm.dropdownElement).not.toEqual(null);
                });
            });

            describe('initAriaAttributes()', () => {
                it('should set popupElement id', () => {
                    const spy = jest.spyOn(wrapper.vm.popupElement, 'setAttribute');

                    wrapper.vm.initAriaAttributes();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('id', wrapper.vm.id);
                });

                it('should set triggerElement aria-haspopup and aria-controls', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'setAttribute');

                    wrapper.vm.initAriaAttributes();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenNthCalledWith(1, 'aria-haspopup', wrapper.vm.basename);
                    expect(spy).toHaveBeenNthCalledWith(2, 'aria-controls', wrapper.vm.id);
                });
            });

            describe('initEvents()', () => {
                it('should add click event to triggerElement if trigger is "click"', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                    wrapper.setProps({ trigger: 'click' });

                    wrapper.vm.initEvents();

                    expect(spy).toHaveBeenNthCalledWith(1, 'click', wrapper.vm.onClick);
                });

                it('should add mouseenter and mouseleave events to trigger element if trigger is "hover"', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                    wrapper.setProps({ trigger: 'hover' });

                    wrapper.vm.initEvents();

                    expect(spy).toHaveBeenNthCalledWith(1, 'mouseenter', wrapper.vm.show);
                    expect(spy).toHaveBeenNthCalledWith(2, 'mouseleave', wrapper.vm.hide);
                });
            });
        });

        describe('mounted()', () => {
            it('should initialize elements', () => {
                const spy = jest.spyOn(wrapper.vm, 'initElements');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
            });

            it('should initialize events', () => {
                const spy = jest.spyOn(wrapper.vm, 'initEvents');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
            });

            it('should initialize aria attributes', () => {
                const spy = jest.spyOn(wrapper.vm, 'initAriaAttributes');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
