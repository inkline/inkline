import { shallowMount } from '@vue/test-utils';
import FormGroup from '@inkline/inkline/components/FormGroup';

describe('Components', () => {
    describe('FormGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(FormGroup, {
                methods: {
                    created: FormGroup.created
                }
            });
        });

        it('should be named correctly', () => {
            expect(FormGroup.name).toEqual('IFormGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-inline" class if "inline" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-inline': false }));
                wrapper.setProps({ inline: true });
                expect(rule()).toEqual(expect.objectContaining({ '-inline': true }));
            });
        });
    });
});
