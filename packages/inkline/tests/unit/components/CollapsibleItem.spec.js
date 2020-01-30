import { shallowMount } from '@vue/test-utils';
import CollapsibleItem from '@inkline/inkline/src/components/CollapsibleItem';

describe('Components', () => {
    describe('CollapsibleItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(CollapsibleItem, {
                propsData: {
                    id: 'item'
                },
                provide: {
                    collapsible: {
                        activeItems: []
                    }
                }
            });
        });

        it('should be named correctly', () => {
            expect(CollapsibleItem.name).toEqual('ICollapsibleItem');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('title', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.title).toBeDefined();
                    expect(wrapper.vm.title).toEqual('');
                });
            });

            describe('id', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.id).toBeDefined();
                    expect(wrapper.vm.id).toEqual('item');
                });

                it('should be randomly generated if not defined', () => {
                    wrapper = shallowMount(CollapsibleItem, {
                        provide: {
                            collapsible: {
                                activeItems: []
                            }
                        }
                    });

                    expect(wrapper.vm.id).toMatch(/^collapsible-item-\w+/);
                });
            });
        });

        describe('computed', () => {
            describe('active()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.active).toBeDefined();
                });

                it('should return false if current item is not active', () => {
                    expect(wrapper.vm.active).toEqual(false);
                });

                it('should return true if current item is active', () => {
                    wrapper = shallowMount(CollapsibleItem, {
                        propsData: {
                            id: 'item1'
                        },
                        provide: {
                            collapsible: {
                                activeItems: ['item1', 'item2']
                            }
                        }
                    });

                    expect(wrapper.vm.active).toEqual(true);
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onClick).toBeDefined();
                });

                it('should dispatch "item-click" event to ICollapsible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'dispatch');

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('ICollapsible', 'item-click', wrapper.vm);
                });
            });
        });
    });
});
