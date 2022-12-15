import { shallowMount } from '@vue/test-utils';
import { IListGroup } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IListGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IListGroup, {
                methods: {
                    created: IListGroup.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(IListGroup.name).toEqual('IListGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('bordered', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.bordered).toBeDefined();
                    expect(wrapper.vm.bordered).toEqual(true);
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(IListGroup.created).toBeDefined();
            });

            it('should add class rules to classes provider', () => {
                const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1);
            });
        });
    });
});
