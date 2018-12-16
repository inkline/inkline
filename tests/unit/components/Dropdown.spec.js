import { shallowMount } from '@vue/test-utils';
import Dropdown from 'inkline/components/Dropdown';

describe('Components', () => {
    describe('Dropdown', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Dropdown, {
                propsData: {
                    id: 'dropdown'
                },
                methods: {
                    created: Dropdown.created,
                    mounted: Dropdown.mounted
                },
                slots: {
                    default: ['<button/>', '<div/>']
                }
            });
        });

        it('should be named correctly', () => {
            expect(Dropdown.name).toEqual('IDropdown');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('trigger', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.trigger).toBeDefined();
                    expect(wrapper.vm.trigger).toEqual('click');
                });
            });

            describe('hideOnClick', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.hideOnClick).toBeDefined();
                    expect(wrapper.vm.hideOnClick).toEqual(true);
                });
            });

            describe('placement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.placement).toBeDefined();
                    expect(wrapper.vm.placement).toEqual('bottom');
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
            describe('items', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.items).toBeDefined();
                    expect(wrapper.vm.items).toEqual([]);
                });
            });

            describe('timeout', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.timeout).toBeDefined();
                    expect(wrapper.vm.timeout).toEqual(null);
                });
            });

            describe('visible', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.visible).toBeDefined();
                    expect(wrapper.vm.visible).toEqual(false);
                });
            });

            describe('triggerElement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.triggerElement).toBeDefined();
                });
            });

            describe('dropdownElement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.dropdownElement).toBeDefined();
                });
            });

            describe('id', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.id).toBeDefined();
                    expect(wrapper.vm.id).toEqual('dropdown');
                });

                it('should be randomly generated if not defined', () => {
                    wrapper = shallowMount(Dropdown, {
                        slots: {
                            default: ['<button/>', '<div/>']
                        }
                    });

                    expect(wrapper.vm.id).toMatch(/^dropdown-\w+/);
                });
            });
        });

        describe('watch', () => {
            describe('visible', () => {
                it('should broadcast "visibility-change" to IDropdownMenu', () => {
                    const spy = jest.spyOn(wrapper.vm, 'broadcast');

                    wrapper.setData({
                        visible: true
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('IDropdownMenu', 'visibility-change', true);
                });

                it('should emit "visibility-change"', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setData({
                        visible: true
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('visibility-change', true);
                });
            });
        });

        describe('methods', () => {
            let e;
            const activeItem = {
                $el: {
                    focus: () => {},
                    click: () => {}
                },
                active: true
            };

            beforeEach(() => {
                wrapper = shallowMount(Dropdown, {
                    propsData: {
                        id: 'dropdown'
                    },
                    data() {
                        return {
                            items: [
                                { $el: { focus: () => {} } },
                                activeItem,
                                { $el: { focus: () => {} } },
                            ]
                        };
                    },
                    slots: {
                        default: ['<button/>', '<div/>']
                    }
                });

                e = {
                    target: activeItem.$el,
                    preventDefault: () => {},
                    stopPropagation: () => {}
                };
            });

            describe('onTriggerKeyDown()', () => {
                [
                    'ArrowUp',
                    'ArrowDown'
                ].forEach((key) => {
                    it('should call show() if "' + key + '" key pressed', () => {
                        const spy = jest.spyOn(wrapper.vm, 'show');
                        e.key = key;

                        wrapper.vm.onTriggerKeyDown(e);

                        expect(spy).toHaveBeenCalled();
                    });

                    it('should call focus() on item at initialIndex if "' + key + '" key pressed', (done) => {
                        const spy = jest.spyOn(wrapper.vm.items[1].$el, 'focus');

                        wrapper.vm.onTriggerKeyDown(e);

                        setTimeout(() => {
                            expect(spy).toHaveBeenCalled();
                            done();
                        }, 500);
                    });

                    it('should call event preventDefault() and stopPropagation() if "' + key + '" key pressed', () => {
                        const spy1 = jest.spyOn(e, 'preventDefault');
                        const spy2 = jest.spyOn(e, 'stopPropagation');
                        e.key = key;

                        wrapper.vm.onTriggerKeyDown(e);

                        expect(spy1).toHaveBeenCalled();
                        expect(spy2).toHaveBeenCalled();
                    });
                });

                [
                    'Enter',
                    'Space'
                ].forEach((key) => {
                    it('should call onClick() if "' + key + '" key pressed', () => {
                        const spy = jest.spyOn(wrapper.vm, 'onClick');
                        e.key = key;

                        wrapper.vm.onTriggerKeyDown(e);

                        expect(spy).toHaveBeenCalled();
                    });


                    it('should call focus() on item at initialIndex if "' + key + '" key pressed and not visible', (done) => {
                        const spy = jest.spyOn(wrapper.vm.items[1].$el, 'focus');
                        e.key = key;
                        wrapper.setData({ visible: false });

                        wrapper.vm.onTriggerKeyDown(e);

                        setTimeout(() => {
                            expect(spy).toHaveBeenCalled();
                            done();
                        }, 500);
                    });

                    it('should call event preventDefault() if "' + key + '" key pressed', () => {
                        const spy = jest.spyOn(e, 'preventDefault');
                        e.key = key;

                        wrapper.vm.onTriggerKeyDown(e);

                        expect(spy).toHaveBeenCalled();
                    });
                });

                [
                    'Tab',
                    'Escape'
                ].forEach((key) => {
                    it('should call hide() if "' + key + '" key pressed', () => {
                        const spy = jest.spyOn(wrapper.vm, 'hide');
                        e.key = key;

                        wrapper.vm.onTriggerKeyDown(e);

                        expect(spy).toHaveBeenCalled();
                    });
                });
            });

            describe('onItemKeyDown()', () => {
                [
                    'ArrowUp',
                    'ArrowDown'
                ].forEach((key) => {
                    it('should call event preventDefault() and stopPropagation() if "' + key + '" key pressed', () => {
                        const spy1 = jest.spyOn(e, 'preventDefault');
                        const spy2 = jest.spyOn(e, 'stopPropagation');
                        e.key = key;

                        wrapper.vm.onItemKeyDown(e);

                        expect(spy1).toHaveBeenCalled();
                        expect(spy2).toHaveBeenCalled();
                    });
                });

                it('should call focus() on item at previous index if "ArrowUp" key is pressed', () => {
                    const spy = jest.spyOn(wrapper.vm.items[0].$el, 'focus');
                    e.key = 'ArrowUp';

                    wrapper.vm.onItemKeyDown(e);

                    expect(spy).toHaveBeenCalled();
                });

                it('should call focus() on item at next index if "ArrowDown" key is pressed', () => {
                    const spy = jest.spyOn(wrapper.vm.items[2].$el, 'focus');
                    e.key = 'ArrowDown';

                    wrapper.vm.onItemKeyDown(e);

                    expect(spy).toHaveBeenCalled();
                });

                [
                    'Enter',
                    'Space'
                ].forEach((key) => {
                    it('should call click() on event target if "' + key + '" key pressed', () => {
                        const spy = jest.spyOn(e.target, 'click');
                        e.key = key;

                        wrapper.vm.onItemKeyDown(e);

                        expect(spy).toHaveBeenCalled();
                    });

                    it('should set visible to false if hideOnClick and "' + key + '" key pressed', () => {
                        e.key = key;
                        wrapper.setProps({ hideOnClick: true });

                        wrapper.vm.onItemKeyDown(e);

                        expect(wrapper.vm.visible).toEqual(false);
                    });

                    it('should call event preventDefault() if "' + key + '" key pressed', () => {
                        const spy = jest.spyOn(e, 'preventDefault');
                        e.key = key;

                        wrapper.vm.onItemKeyDown(e);

                        expect(spy).toHaveBeenCalled();
                    });
                });

                [
                    'Tab',
                    'Escape'
                ].forEach((key) => {
                    it('should call hide() if "' + key + '" key pressed', () => {
                        const spy = jest.spyOn(wrapper.vm, 'hide');
                        e.key = key;

                        wrapper.vm.onItemKeyDown(e);

                        expect(spy).toHaveBeenCalled();
                    });

                    it('should call focus() on triggerElement if "' + key + '" key pressed', () => {
                        const spy = jest.spyOn(wrapper.vm.triggerElement, 'focus');
                        e.key = key;

                        wrapper.vm.onItemKeyDown(e);

                        expect(spy).toHaveBeenCalled();
                    });
                });
            });

            describe('show()', () => {
                it('should set visible to true instantly if trigger is set to "click"', (done) => {
                    wrapper.setData({ visible: false });

                    wrapper.vm.show();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(true);
                        done();
                    }, 0);
                });

                it('should set visible to true after showTimeout if trigger is set to "hover"', (done) => {
                    wrapper.setData({ visible: false });
                    wrapper.setProps({ trigger: 'hover' });

                    wrapper.vm.show();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(true);
                        done();
                    }, 500);
                });

                it('should not set visible to true if disabled', (done) => {
                    wrapper.setData({ visible: false });
                    wrapper.setProps({ disabled: true });

                    wrapper.vm.show();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(false);
                        done();
                    }, 0);
                });
            });

            describe('hide()', () => {
                it('should set visible to false instantly if trigger is set to "click"', (done) => {
                    wrapper.setData({ visible: true });

                    wrapper.vm.hide();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(false);
                        done();
                    }, 0);
                });

                it('should set visible to false after showTimeout if trigger is set to "hover"', (done) => {
                    wrapper.setData({ visible: true });
                    wrapper.setProps({ trigger: 'hover' });

                    wrapper.vm.hide();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(false);
                        done();
                    }, 500);
                });

                it('should not set visible to false if disabled', (done) => {
                    wrapper.setData({ visible: true });
                    wrapper.setProps({ disabled: true });

                    wrapper.vm.hide();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(true);
                        done();
                    }, 0);
                });
            });

            describe('onClick()', () => {
                it('should call hide() if visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'hide');
                    wrapper.setData({ visible: true });

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                });

                it('should call show() if not visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'show');
                    wrapper.setData({ visible: false });

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                });

                it('should not execute if disabled', () => {
                    const spy = jest.spyOn(wrapper.vm, 'hide');
                    wrapper.setData({ visible: true });
                    wrapper.setProps({ disabled: true });

                    wrapper.vm.onClick();

                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe('initElements()', () => {
                it('should set triggerElement and dropdownElement', () => {
                    wrapper.setData({ triggerElement: null, dropdownElement: null });

                    wrapper.vm.initElements();

                    expect(wrapper.vm.triggerElement).not.toEqual(null);
                    expect(wrapper.vm.dropdownElement).not.toEqual(null);
                });
            });

            describe('initAriaAttributes()', () => {
                it('should set dropdownElement id', () => {
                    const spy = jest.spyOn(wrapper.vm.dropdownElement, 'setAttribute');

                    wrapper.vm.initAriaAttributes();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('id', 'dropdown');
                });

                it('should set triggerElement aria-haspopup and aria-controls', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'setAttribute');

                    wrapper.vm.initAriaAttributes();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenNthCalledWith(1, 'aria-haspopup', 'list');
                    expect(spy).toHaveBeenNthCalledWith(2, 'aria-controls', 'dropdown');
                });
            });

            describe('initEvents()', () => {
                it('should add keydown events to triggerElement and dropdownElement', () => {
                    const spy1 = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                    const spy2 = jest.spyOn(wrapper.vm.dropdownElement, 'addEventListener');

                    wrapper.vm.initEvents();

                    expect(spy1).toHaveBeenCalledWith('keydown', wrapper.vm.onTriggerKeyDown);
                    expect(spy2).toHaveBeenCalledWith('keydown', wrapper.vm.onItemKeyDown, true);
                });

                it('should add click event to triggerElement if trigger is "click"', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                    wrapper.setProps({ trigger: 'click' });

                    wrapper.vm.initEvents();

                    expect(spy).toHaveBeenNthCalledWith(2, 'click', wrapper.vm.onClick);
                });

                it('should add mouseenter and mouseleave events to trigger and dropdown elements if trigger is "hover"', () => {
                    const spy1 = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                    const spy2 = jest.spyOn(wrapper.vm.dropdownElement, 'addEventListener');

                    wrapper.setProps({ trigger: 'hover' });

                    wrapper.vm.initEvents();

                    expect(spy1).toHaveBeenNthCalledWith(2, 'mouseenter', wrapper.vm.show);
                    expect(spy1).toHaveBeenNthCalledWith(3, 'mouseleave', wrapper.vm.hide);
                    expect(spy2).toHaveBeenNthCalledWith(2, 'mouseenter', wrapper.vm.show);
                    expect(spy2).toHaveBeenNthCalledWith(3, 'mouseleave', wrapper.vm.hide);
                });
            });

            describe('handleMenuItemClick()', () => {
                it('should set visible to false if hideOnClick', () => {
                    wrapper.setProps({ hideOnClick: true });
                    wrapper.setData({ visible: true });

                    wrapper.vm.handleMenuItemClick(true, true);

                    expect(wrapper.vm.visible).toEqual(false);
                });

                it('should emit "action" event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.handleMenuItemClick(true, true);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('action', true, true);
                });
            });
        });

        describe('created()', () => {
            it('should listen to "dropdown-item-mounted" event', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('dropdown-item-mounted', expect.any(Function));
            });

            it('should push item to items on "dropdown-item-mounted" event', () => {
                wrapper.vm.$emit('dropdown-item-mounted', true);

                expect(wrapper.vm.items).toEqual([true]);
            });

            it('should listen to "dropdown-item-destroyed" event', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('dropdown-item-destroyed', expect.any(Function));
            });

            it('should remove item from items on "dropdown-item-destroyed" event', () => {
                wrapper.vm.$emit('dropdown-item-mounted', true);
                expect(wrapper.vm.items).toEqual([true]);
                wrapper.vm.$emit('dropdown-item-destroyed', true);
                expect(wrapper.vm.items).toEqual([]);
            });
        });

        describe('mounted()', () => {
            it('should listen to "menu-item-click" event', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('menu-item-click', expect.any(Function));
            });

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
        })
    });
});
