import { shallowMount } from '@vue/test-utils';
import { IPopover } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IPopover', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IPopover, {
                propsData: {
                    id: 'popover'
                },
                slots: {
                    default: ['<div/>']
                }
            });
        });

        it('should be named correctly', () => {
            expect(IPopover.name).toEqual('IPopover');
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
        });

        describe('data', () => {
            describe('basename', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.basename).toBeDefined();
                    expect(wrapper.vm.basename).toEqual('popover');
                });
            });

            describe('id', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.id).toBeDefined();
                    expect(wrapper.vm.id).toEqual('popover');
                });

                it('should be randomly generated if not defined', () => {
                    wrapper = shallowMount(IPopover, {
                        slots: {
                            default: ['<div/>']
                        }
                    });

                    expect(wrapper.vm.id).toMatch(/^popover-\w+/);
                });
            });
        });

    });
});
