import { shallowMount } from '@vue/test-utils';
import Table from '@inkline/inkline/src/components/Table';

describe('Components', () => {
    describe('Table', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Table, {
                methods: {
                    created: Table.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(Table.name).toEqual('ITable');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('bordered', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.bordered).toBeDefined();
                    expect(wrapper.vm.bordered).toEqual(false);
                });
            });

            describe('striped', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.striped).toBeDefined();
                    expect(wrapper.vm.striped).toEqual(false);
                });
            });

            describe('hover', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.hover).toBeDefined();
                    expect(wrapper.vm.hover).toEqual(false);
                });
            });

            describe('responsive', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.responsive).toBeDefined();
                    expect(wrapper.vm.responsive).toEqual(false);
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(Table.created).toBeDefined();
            });

            it('should add class rules to classes provider', () => {
                const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 2);
            });

            it('should add root classes if props are set to true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 2];

                expect(rule()).toEqual(expect.objectContaining({
                    '-bordered': false,
                    '-striped': false,
                    '-hover': false
                }));

                wrapper.setProps({
                    bordered: true,
                    striped: true,
                    hover: true
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-bordered': true,
                    '-striped': true,
                    '-hover': true
                }));
            });

            it('should add responsive wrapper class if prop is set to true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-responsive': false,
                }));

                wrapper.setProps({
                    responsive: true,
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-responsive': true,
                }));
            });

            it('should add responsive wrapper class if prop is set to responsive breakpoint', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-responsive': false,
                }));

                wrapper.setProps({
                    responsive: 'xs',
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-responsive-xs': true,
                }));
            });
        });
    });
});
