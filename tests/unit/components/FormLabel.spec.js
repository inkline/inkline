import { shallowMount } from '@vue/test-utils';
import FormLabel from '@inkline/inkline/components/FormLabel';

describe('Components', () => {
    describe('FormLabel', () => {
        let wrapper;
        let parentWrapper;
        let inverseOrderParentWrapper;

        const ParentComponent = {
            template: '<div><slot></slot></div>'
        };

        const InputComponent = {
            methods: {
                focusInputRef: () => {}
            },
            render () {}
        };

        beforeEach(() => {
            wrapper = shallowMount(FormLabel, {
                methods: {
                    created: FormLabel.created
                }
            });

            parentWrapper = shallowMount(ParentComponent, {
                slots: {
                    default: [FormLabel, InputComponent]
                }
            });

            inverseOrderParentWrapper = shallowMount(ParentComponent, {
                slots: {
                    default: [InputComponent, FormLabel]
                }
            });
        });

        it('should be named correctly', () => {
            expect(FormLabel.name).toEqual('IFormLabel');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('methods', () => {
            describe('focusInput()', () => {
                it('should focus immediate sibling input', () => {
                    const label = parentWrapper.vm.$children[0];
                    const input = parentWrapper.vm.$children[1];
                    const spy = jest.spyOn(input, 'focusInputRef');

                    label.focusInput();

                    expect(spy).toHaveBeenCalled();
                });

                it('should not focus previous sibling input', () => {
                    const label = inverseOrderParentWrapper.vm.$children[1];
                    const input = inverseOrderParentWrapper.vm.$children[0];
                    const spy = jest.spyOn(input, 'focusInputRef');

                    label.focusInput();

                    expect(spy).not.toHaveBeenCalled();
                });
            });
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-{placement}" class if "placement" property is not default', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-default': false }));
                wrapper.setProps({ placement: 'left' });
                expect(rule()).toEqual(expect.objectContaining({ '-left': true }));
            });
        });
    });
});
