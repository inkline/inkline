import { shallowMount } from '@vue/test-utils';
import { IButtonGroup } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IButtonGroup, {
                methods: {
                    created: IButtonGroup.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(IButtonGroup.name).toEqual('IButtonGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('vertical', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.vertical).toBeDefined();
                    expect(wrapper.vm.vertical).toEqual(false);
                });
            });
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-vertical" class if "vertical" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-vertical': false }));
                wrapper.setProps({ vertical: true });
                expect(rule()).toEqual(expect.objectContaining({ '-vertical': true }));
            });
        });
    });
});
