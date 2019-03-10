import { shallowMount } from '@vue/test-utils';
import Dropdown from '@inkline/inkline/src/components/Dropdown';
import DropdownMenu from '@inkline/inkline/src/components/DropdownMenu';
import DropdownItem from '@inkline/inkline/src/components/DropdownItem';
import {isVisible} from "@/helpers";

describe('Components', () => {
    describe('Dropdown', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Dropdown, {
                propsData: {
                    id: 'dropdown'
                },
                methods: {
                    mounted: Dropdown.mounted
                },
                slots: {
                    default: [
                        '<button />',
                        DropdownMenu
                    ]
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

            describe('keymap', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.keymap).toBeDefined();
                    expect(wrapper.vm.keymap).toEqual({});
                });
            });
        });

        describe('computed', () => {
            describe('actionKeymap()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.actionKeymap).toBeDefined();
                    expect(wrapper.vm.actionKeymap).toEqual({
                        navigate: ['up', 'down'],
                        select: ['enter', 'space'],
                        show: ['enter', 'space'],
                        hide: ['esc', 'tab']
                    });
                });

                it('should be extended by keymap prop', () => {
                    wrapper.setProps({ keymap: { show: ['enter'] } });

                    expect(wrapper.vm.actionKeymap).toEqual({
                        navigate: ['up', 'down'],
                        select: ['enter', 'space'],
                        show: ['enter'],
                        hide: ['esc', 'tab']
                    });
                });
            });

            describe('focusableItems()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.focusableItems).toBeDefined();
                    expect(wrapper.vm.focusableItems).toEqual([]);
                });

                it('should filter out disabled items', () => {
                    wrapper.setData({
                        items: [
                            { disabled: true },
                            { componentInstance: { disabled: true }}
                        ]
                    });

                    expect(wrapper.vm.focusableItems).toEqual([]);
                });

                it('should include only visible items', () => {
                    wrapper.setData({
                        items: [
                            {},
                            { elm: { offsetWidth: true } },
                            { elm: { offsetHeight: true } },
                            { elm: { getClientRects: () => ({ length: true }) }},
                            { elm: { getClientRects: () => ({ length: false }) }},
                            { $el: { offsetWidth: true } },
                            { $el: { offsetHeight: true } },
                            { $el: { getClientRects: () => ({ length: true }) }},
                            { $el: { getClientRects: () => ({ length: false }) }},
                        ]
                    });

                    expect(wrapper.vm.focusableItems)
                        .toEqual(wrapper.vm.items.filter((item) => isVisible(item.elm || item.$el)));
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

            describe('id', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.id).toBeDefined();
                    expect(wrapper.vm.id).toEqual('dropdown');
                });

                it('should be randomly generated if not defined', () => {
                    wrapper = shallowMount(Dropdown, {
                        slots: {
                            default: ['<button/>', DropdownMenu]
                        }
                    });

                    expect(wrapper.vm.id).toMatch(/^dropdown-menu-\w+/);
                });
            });

            describe('basename', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.basename).toBeDefined();
                    expect(wrapper.vm.basename).toEqual('dropdown');
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

                it('should emit "change" event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setData({
                        visible: true
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('change', true);
                });
            });
        });

        describe('methods', () => {
            let e;

            const activeItem = {
                $el: {
                    focus: () => {},
                    hasAttribute: () => false,
                    click: () => {}
                },
                active: true
            };

            const items = [
                { $el: { focus: () => {}, hasAttribute: () => false } },
                activeItem,
                { $el: { focus: () => {}, hasAttribute: () => false } },
            ];

            beforeEach(() => {
                wrapper = shallowMount(Dropdown, {
                    propsData: {
                        id: 'dropdown'
                    },
                    data() {
                        return { items };
                    },
                    computed: {
                        focusableItems() {
                            return items;
                        }
                    },
                    slots: {
                        default: ['<button/>', DropdownMenu]
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
                        const spy = jest.spyOn(wrapper.vm.focusableItems[1].$el, 'focus');

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
                        const spy = jest.spyOn(wrapper.vm.focusableItems[1].$el, 'focus');
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
                    const spy = jest.spyOn(wrapper.vm.focusableItems[0].$el, 'focus');
                    e.key = 'ArrowUp';

                    wrapper.vm.onItemKeyDown(e);

                    expect(spy).toHaveBeenCalled();
                });

                it('should call focus() on item at next index if "ArrowDown" key is pressed', () => {
                    const spy = jest.spyOn(wrapper.vm.focusableItems[2].$el, 'focus');
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

                    it('should call initItems() if "' + key + '" key pressed and item has aria-haspopup', () => {
                        const spy = jest.spyOn(wrapper.vm, 'initItems');
                        e.key = key;
                        e.target.hasAttribute = () => true;

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

            describe('initElements()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.initElements).toBeDefined();
                });

                it('should throw error if trigger or dropdown menu not provided', () => {
                    wrapper.vm.$slots.default = [];

                    expect(() => wrapper.vm.initElements())
                        .toThrowError('IDropdown component requires two child elements');
                });

                it('should throw error if dropdown menu not provided', () => {
                    wrapper.vm.$slots.default[1] = wrapper.vm.$slots.default[0];

                    expect(() => wrapper.vm.initElements())
                        .toThrowError('Could not find child IDropdownMenu in IDropdown');
                });

                it('should set triggerElement and popupElement', () => {
                    wrapper.setData({ triggerElement: null, popupElement: null });

                    wrapper.vm.initElements();

                    expect(wrapper.vm.triggerElement).not.toEqual(null);
                    expect(wrapper.vm.popupElement).not.toEqual(null);
                });

                it('should init items', () => {
                    const spy = jest.spyOn(wrapper.vm, 'initItems')

                    wrapper.vm.initElements();

                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('initItems()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.initItems).toBeDefined();
                });

                it('should update items', () => {
                    const dropdownItem = shallowMount(DropdownItem).vm;

                    wrapper.vm.menu.componentInstance.$slots.default = [dropdownItem.$vnode, dropdownItem.$vnode];
                    wrapper.vm.initItems();

                    expect(wrapper.vm.items.length).toEqual(2);
                });
            });

            describe('onItemClick()', () => {
                it('should set visible to false if hideOnClick', () => {
                    wrapper.setProps({ hideOnClick: true });
                    wrapper.setData({ visible: true });

                    wrapper.vm.onItemClick(true, true);

                    expect(wrapper.vm.visible).toEqual(false);
                });

                it('should emit "action" event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.onItemClick(true, true);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('action', true, true);
                });
            });
        });

        describe('mounted()', () => {
            it('should listen to "item-click" event', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('item-click', expect.any(Function));
            });

            it('should add keydown event to triggerElement and popupElement', () => {
                const spy1 = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                const spy2 = jest.spyOn(wrapper.vm.popupElement, 'addEventListener');

                wrapper.vm.mounted();

                expect(spy1).toHaveBeenCalledWith('keydown', wrapper.vm.onTriggerKeyDown);
                expect(spy2).toHaveBeenCalledWith('keydown', wrapper.vm.onItemKeyDown, true);
            });

            it('should not add mouseenter and mouseleave events to popupElement if trigger is not hover', () => {
                const spy = jest.spyOn(wrapper.vm.popupElement, 'addEventListener');

                wrapper.setProps({ trigger: 'click' });
                wrapper.vm.mounted();

                expect(spy).not.toHaveBeenNthCalledWith(2, 'mouseenter', wrapper.vm.show);
                expect(spy).not.toHaveBeenNthCalledWith(3, 'mouseleave', wrapper.vm.hide);
            });

            it('should add mouseenter and mouseleave events to popupElement if trigger is hover', () => {
                const spy = jest.spyOn(wrapper.vm.popupElement, 'addEventListener');

                wrapper.setProps({ trigger: 'hover' });
                wrapper.vm.mounted();

                expect(spy).toHaveBeenNthCalledWith(2, 'mouseenter', wrapper.vm.show);
                expect(spy).toHaveBeenNthCalledWith(3, 'mouseleave', wrapper.vm.hide);
            });
        });
    });
});
