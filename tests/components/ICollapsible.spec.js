import { shallowMount } from '@vue/test-utils';
import { ICollapsible } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ICollapsible', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ICollapsible, {
                methods: {
                    created: ICollapsible.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(ICollapsible.name).toEqual('ICollapsible');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('accordion', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.accordion).toBeDefined();
                    expect(wrapper.vm.accordion).toEqual(false);
                });
            });

            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual([]);
                });
            });
        });

        describe('data', () => {
            describe('activeItems', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.activeItems).toBeDefined();
                    expect(wrapper.vm.activeItems).toEqual([]);
                });

                it('should be concatenated with active prop', () => {
                    wrapper = shallowMount(ICollapsible, {
                        propsData: {
                            value: ['active']
                        }
                    });

                    expect(wrapper.vm.activeItems).toEqual(['active']);
                });
            });
        });

        describe('watch', () => {
            describe('value', () => {
                it('should update active items on change', (done) => {
                    expect(wrapper.vm.activeItems).toEqual([]);

                    wrapper.setProps({ value: ['active'] });

                    wrapper.vm.$nextTick(() => {
                        expect(wrapper.vm.activeItems).toEqual(['active']);
                        done();
                    });
                });
            });
        });

        describe('methods', () => {
            describe('onItemClick()', () => {
                it('should add item to active items if not already active', () => {
                    expect(wrapper.vm.activeItems).toEqual([]);

                    wrapper.vm.onItemClick({ id: 'active' });

                    expect(wrapper.vm.activeItems).toEqual(['active']);
                });

                it('should remove item from active items if already active', () => {
                    expect(wrapper.vm.activeItems).toEqual([]);
                    wrapper.vm.onItemClick({ id: 'active' });
                    expect(wrapper.vm.activeItems).toEqual(['active']);
                    wrapper.vm.onItemClick({ id: 'active' });
                    expect(wrapper.vm.activeItems).toEqual([]);
                });

                it('should set active items to contain current item only if accordion', () => {
                    wrapper.setProps({ accordion: true });
                    expect(wrapper.vm.activeItems).toEqual([]);
                    wrapper.vm.onItemClick({ id: 'active1' });
                    expect(wrapper.vm.activeItems).toEqual(['active1']);
                    wrapper.vm.onItemClick({ id: 'active2' });
                    expect(wrapper.vm.activeItems).toEqual(['active2']);
                    wrapper.vm.onItemClick({ id: 'active2' });
                    expect(wrapper.vm.activeItems).toEqual([]);
                });

                it('should emit input event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.onItemClick({ id: 'active1' });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', ['active1']);
                });
            });
        });

        describe('created()', () => {
            it('should add item-click listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('item-click', wrapper.vm.onItemClick);
            });
        });
    });
});
