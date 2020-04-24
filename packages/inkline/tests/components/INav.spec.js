import { shallowMount } from '@vue/test-utils';
import { INav } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('INav', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(INav, {
                methods: {
                    created: INav.created,
                    destroyed: INav.destroyed
                }
            });
        });

        it('should be named correctly', () => {
            expect(INav.name).toEqual('INav');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('tabs', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tabs).toBeDefined();
                    expect(wrapper.vm.tabs).toEqual(false);
                });
            });

            describe('vertical', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.vertical).toBeDefined();
                    expect(wrapper.vm.vertical).toEqual(false);
                });
            });
        });

        describe('methods', () => {
            describe('dispatchItemClick', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.dispatchItemClick).toBeDefined();
                });

                it('should dispatch item-click event to INavbar', () => {
                    const e = {};
                    const spy = jest.spyOn(wrapper.vm, 'dispatch');

                    wrapper.vm.dispatchItemClick(e);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('INavbar', 'item-click', e);
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(INav.created).toBeDefined();
            });

            it('should add class rules to classes provider', () => {
                const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1);
            });

            it('should add "-tabs" class if "tabs"', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-tabs': false
                }));

                wrapper.setProps({
                    tabs: true
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-tabs': true
                }));
            });

            it('should add "-vertical" class if "vertical"', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-vertical': false
                }));

                wrapper.setProps({
                    vertical: true
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-vertical': true
                }));
            });

            it('should listen to item-click event and dispatch it further', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('item-click', wrapper.vm.dispatchItemClick);
            });
        });

        describe('destroyed()', () => {
            it('should stop listening to item-click event', () => {
                const spy = jest.spyOn(wrapper.vm, '$off');

                wrapper.vm.destroyed();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('item-click', wrapper.vm.dispatchItemClick);
            });
        });
    });
});
