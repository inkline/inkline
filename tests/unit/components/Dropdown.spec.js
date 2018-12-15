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
            describe('onTriggerKeyDown()', () => {
                [
                    'ArrowUp',
                    'ArrowDown'
                ].forEach((key) => {
                    const e = {
                        key,
                        preventDefault: () => {},
                        stopPropagation: () => {}
                    };

                    it.only('should call show() if "' + key + '" key pressed', () => {
                        const spy = jest.spyOn(wrapper.vm, 'show');

                        wrapper.vm.onTriggerKeyDown(e);

                        expect(spy).toHaveBeenCalled();
                    });

                    it('should call focus() on item at 0 index if "' + key + '" key pressed', (done) => {
                        wrapper = shallowMount(Dropdown, {
                            propsData: {
                                id: 'dropdown'
                            },
                            data() {
                                return {
                                    items: [
                                        {
                                            $el: { focus: () => {} }
                                        }
                                    ]
                                };
                            },
                            slots: {
                                default: ['<button/>', '<div/>']
                            }
                        });

                        const spy = jest.spyOn(wrapper.vm.items[0].$el, 'focus');

                        wrapper.vm.onTriggerKeyDown(e);

                        setTimeout(() => {
                            expect(spy).toHaveBeenCalled();
                            done();
                        }, 500);
                    });

                    it('should call focus() on item at initialIndex if "' + key + '" key pressed', (done) => {
                        wrapper = shallowMount(Dropdown, {
                            propsData: {
                                id: 'dropdown'
                            },
                            data() {
                                return {
                                    items: [
                                        {
                                            $el: { focus: () => {} }
                                        },
                                        {
                                            active: true,
                                            $el: { focus: () => {} }
                                        }
                                    ]
                                };
                            },
                            slots: {
                                default: ['<button/>', '<div/>']
                            }
                        });

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

                        wrapper.vm.onTriggerKeyDown(e);

                        expect(spy1).toHaveBeenCalled();
                        expect(spy2).toHaveBeenCalled();
                    });
                });
            });
        });
    });
});
