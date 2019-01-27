import { shallowMount } from '@vue/test-utils';
import Nav from '@inkline/inkline/components/Nav';

describe('Components', () => {
    describe('Nav', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Nav, {
                methods: {
                    created: Nav.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(Nav.name).toEqual('INav');
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

        describe('created()', () => {
            it('should be defined', () => {
                expect(Nav.created).toBeDefined();
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
        });
    });
});
