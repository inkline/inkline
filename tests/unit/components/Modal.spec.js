import { shallowMount } from '@vue/test-utils';
import Modal from 'inkline/components/Modal';

describe('Components', () => {
    describe('Modal', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Modal, {
                propsData: {
                    id: 'modal'
                },
                slots: {
                    default: ['<div/>']
                },
                methods: {
                    created: Modal.created
                }
            });
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('transition', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.transition).toBeDefined();
                    expect(wrapper.vm.transition).toEqual('zoom-in-center-transition');
                });
            });

            describe('fill', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.fill).toBeDefined();
                    expect(wrapper.vm.fill).toEqual(false);
                });
            });
        });

        describe('data', () => {
            describe('basename', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.basename).toBeDefined();
                    expect(wrapper.vm.basename).toEqual('modal');
                });
            });

            describe('id', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.id).toBeDefined();
                    expect(wrapper.vm.id).toEqual('modal');
                });

                it('should be randomly generated if not defined', () => {
                    wrapper = shallowMount(Modal, {
                        slots: {
                            default: ['<div/>']
                        }
                    });

                    expect(wrapper.vm.id).toMatch(/^modal-\w+/);
                });
            });
        });

        describe('methods', () => {
            describe('show()', () => {
                it('should set visible to true', () => {
                    wrapper.setData({ visible: false });

                    wrapper.vm.show();

                    expect(wrapper.vm.visible).toEqual(true);
                });

                it('should not set visible to true if disabled', () => {
                    wrapper.setData({ visible: false });
                    wrapper.setProps({ disabled: true });

                    wrapper.vm.show();

                    expect(wrapper.vm.visible).toEqual(false);
                });
            });

            describe('hide()', () => {
                it('should set visible to false', () => {
                    wrapper.setData({ visible: true });

                    wrapper.vm.hide();

                    expect(wrapper.vm.visible).toEqual(false);
                });

                it('should not set visible to false if disabled', () => {
                    wrapper.setData({ visible: true });
                    wrapper.setProps({ disabled: true });

                    wrapper.vm.hide();

                    expect(wrapper.vm.visible).toEqual(true);
                });
            });

            describe('initEvents()', () => {
                it('should add click event to triggerElement', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                    wrapper.setProps({ trigger: 'click' });

                    wrapper.vm.initEvents();

                    expect(spy).toHaveBeenNthCalledWith(1, 'click', wrapper.vm.onClick);
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(Modal.created).toBeDefined();
            });

            it('should add class rules to classes provider', () => {
                const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1);
            });

            it('should add "-fill" class if "fill"', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-fill': false
                }));

                wrapper.setProps({
                    fill: true
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-fill': true
                }));
            });
        });
    });
});
