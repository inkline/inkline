import { shallowMount } from '@vue/test-utils';
import Popover from 'inkline/components/Popover';

describe('Components', () => {
    describe('Popover', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Popover, {
                propsData: {
                    id: 'popover'
                },
                slots: {
                    default: ['<div/>']
                }
            });
        });

        it('should be named correctly', () => {
            expect(Popover.name).toEqual('IPopover');
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
                    wrapper = shallowMount(Popover, {
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
