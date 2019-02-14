import { shallowMount } from '@vue/test-utils';
import ButtonGroup from '@inkline/inkline/components/ButtonGroup';

describe('Components', () => {
    describe('ButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ButtonGroup, {
                methods: {
                    created: ButtonGroup.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(ButtonGroup.name).toEqual('IButtonGroup');
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
