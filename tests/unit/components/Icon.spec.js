import { shallowMount } from '@vue/test-utils';
import Icon from '@inkline/inkline/src/components/Icon';

describe('Components', () => {
    describe('Icon', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Icon, {
                methods: {
                    created: Icon.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(Icon.name).toEqual('IIcon');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('icon', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.icon).toBeDefined();
                    expect(wrapper.vm.icon).toEqual('');
                });
            });

            describe('size', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.size).toBeDefined();
                    expect(wrapper.vm.size).toEqual('');
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(Icon.created).toBeDefined();
            });

            it('should add class rules to classes provider', () => {
                const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1);
            });

            it('should add "-icon" class if "icon"', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-': false
                }));

                wrapper.setProps({ icon: 'icon' });

                expect(rule()).toEqual(expect.objectContaining({
                    '-icon': true
                }));
            });

            it('should add "-size" class if "size"', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length  - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-': false
                }));

                wrapper.setProps({ size: 'sm' });

                expect(rule()).toEqual(expect.objectContaining({
                    '-sm': true
                }));
            });
        });
    });
});
