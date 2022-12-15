import { shallowMount } from '@vue/test-utils';
import { IInput } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IInput', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IInput, {
                methods: {
                    created: IInput.created
                },
                parentComponent: {
                    name: 'IFormGroup'
                }
            });
        });

        it('should be named correctly', () => {
            expect(IInput.name).toEqual('IInput');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 2)
            });

            it('should add "-prepended" class if "prepend" slot provided', () => {
                wrapper = shallowMount(IInput, {
                    slots: {
                        prepend: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 2];

                expect(rule()).toEqual(expect.objectContaining({ '-prepended': true }));
            });

            it('should add "-appended" class if "append" slot provided', () => {
                wrapper = shallowMount(IInput, {
                    slots: {
                        append: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 2];

                expect(rule()).toEqual(expect.objectContaining({ '-appended': true }));
            });

            it('should add "-prefixed" class if "prefix" slot provided', () => {
                wrapper = shallowMount(IInput, {
                    slots: {
                        prefix: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-prefixed': true }));
            });

            it('should add "-suffixed" class if "suffix" slot provided', () => {
                wrapper = shallowMount(IInput, {
                    slots: {
                        suffix: ['<div />']
                    }
                });

                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-suffixed': true }));
            });
        });
    });
});
