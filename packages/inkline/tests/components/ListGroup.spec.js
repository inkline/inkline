import { shallowMount } from '@vue/test-utils';
import ListGroup from '@inkline/inkline/src/components/ListGroup';

describe('Components', () => {
    describe('ListGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ListGroup, {
                methods: {
                    created: ListGroup.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(ListGroup.name).toEqual('IListGroup');
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
                expect(ListGroup.created).toBeDefined();
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
