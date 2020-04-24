import { shallowMount } from '@vue/test-utils';
import { IContainer } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IContainer', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IContainer, {
                methods: {
                    created: IContainer.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(IContainer.name).toEqual('IContainer');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('fluid', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.fluid).toBeDefined();
                    expect(wrapper.vm.fluid).toEqual(false);
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(IContainer.created).toBeDefined();
            });

            it('should add class rules to classes provider', () => {
                const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1);
            });

            it('should add "-fluid" class if "fluid"', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-fluid': false
                }));

                wrapper.setProps({
                    fluid: true
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-fluid': true
                }));
            });
        });
    });
});
